/**
 * DOM event wiring for the chart engine using unified Pointer Events.
 * Translates mouse, touch, and pen events into canvas-relative coordinates and
 * forwards them to the engine, avoiding double-handling issues.
 *
 * During active drags, window-level listeners ensure interactions remain active
 * even if the pointer leaves the canvas boundary.
 */
export interface InteractionHandlers {
  pointerDown(x: number, y: number, ev: MouseEvent): void
  pointerMove(x: number, y: number, ev: MouseEvent): void
  pointerUp(x: number, y: number, ev: MouseEvent): void
  pointerLeave(): void
  wheel(x: number, y: number, ev: WheelEvent): void
  /** Pinch-zoom (touch): scale the time range around `centerX` by `scale` (>1 = zoom in). */
  pinch(centerX: number, scale: number): void
  doubleClick(x: number, y: number, ev: MouseEvent): void
  /** Right-click. The engine calls preventDefault and positions a host menu at (x, y). */
  contextMenu(x: number, y: number, ev: MouseEvent): void
  keyDown(ev: KeyboardEvent): void
}

/** Attach all unified pointer listeners; returns a dispose function. */
export function attachInteractions(
  canvas: HTMLCanvasElement,
  handlers: InteractionHandlers,
): () => void {
  const activePointers = new Map<number, { clientX: number; clientY: number }>()
  let dragging = false
  let dragRect: DOMRect | null = null
  let lastPinchDist = 0

  const getRel = (clientX: number, clientY: number): { x: number; y: number } => {
    const r = dragRect || canvas.getBoundingClientRect()
    return { x: clientX - r.left, y: clientY - r.top }
  }

  const onPointerDown = (ev: PointerEvent): void => {
    if (ev.pointerType === 'mouse' && ev.button !== 0 && ev.button !== 2) return
    if (ev.button === 2) return

    if (ev.pointerType !== 'mouse') {
      try {
        canvas.setPointerCapture(ev.pointerId)
      } catch (e) {}
    }

    activePointers.set(ev.pointerId, { clientX: ev.clientX, clientY: ev.clientY })

    if (activePointers.size === 1) {
      dragging = true
      dragRect = canvas.getBoundingClientRect()
      const { x, y } = getRel(ev.clientX, ev.clientY)
      handlers.pointerDown(x, y, ev)
      
      window.addEventListener('pointermove', onWindowMove)
      window.addEventListener('pointerup', onWindowUp)
      window.addEventListener('pointercancel', onWindowUp)
    } else if (activePointers.size === 2) {
      if (dragging) {
        handlers.pointerUp(0, 0, ev)
        dragging = false
      }
      const pts = Array.from(activePointers.values())
      const dx = pts[0].clientX - pts[1].clientX
      const dy = pts[0].clientY - pts[1].clientY
      lastPinchDist = Math.hypot(dx, dy)
    }
  }

  const onPointerMove = (ev: PointerEvent): void => {
    if (!activePointers.has(ev.pointerId)) {
      if (activePointers.size === 0) {
        const { x, y } = getRel(ev.clientX, ev.clientY)
        handlers.pointerMove(x, y, ev)
      }
      return
    }

    activePointers.set(ev.pointerId, { clientX: ev.clientX, clientY: ev.clientY })

    if (activePointers.size === 1 && dragging) {
      const { x, y } = getRel(ev.clientX, ev.clientY)
      handlers.pointerMove(x, y, ev)
    } else if (activePointers.size === 2) {
      const pts = Array.from(activePointers.values())
      const dx = pts[0].clientX - pts[1].clientX
      const dy = pts[0].clientY - pts[1].clientY
      const dist = Math.hypot(dx, dy)
      
      if (lastPinchDist > 0 && dist > 0) {
        const midX = (pts[0].clientX + pts[1].clientX) / 2
        const midY = (pts[0].clientY + pts[1].clientY) / 2
        const { x: centerX } = getRel(midX, midY)
        handlers.pinch(centerX, dist / lastPinchDist)
      }
      lastPinchDist = dist
    }
  }

  const onPointerUp = (ev: PointerEvent): void => {
    if (!activePointers.has(ev.pointerId)) return

    if (ev.pointerType !== 'mouse') {
      try {
        canvas.releasePointerCapture(ev.pointerId)
      } catch (e) {}
    }

    if (activePointers.size === 1 && dragging) {
      const { x, y } = getRel(ev.clientX, ev.clientY)
      handlers.pointerUp(x, y, ev)
      dragging = false
      dragRect = null
    }

    activePointers.delete(ev.pointerId)

    if (activePointers.size < 2) {
      lastPinchDist = 0
    }
  }

  const onWindowMove = (ev: PointerEvent): void => {
    onPointerMove(ev)
  }

  const onWindowUp = (ev: PointerEvent): void => {
    onPointerUp(ev)
    if (activePointers.size === 0) {
      window.removeEventListener('pointermove', onWindowMove)
      window.removeEventListener('pointerup', onWindowUp)
      window.removeEventListener('pointercancel', onWindowUp)
    }
  }

  const onWheel = (ev: WheelEvent): void => {
    ev.preventDefault()
    const r = canvas.getBoundingClientRect()
    const x = ev.clientX - r.left
    const y = ev.clientY - r.top
    handlers.wheel(x, y, ev)
  }

  const onDblClick = (ev: MouseEvent): void => {
    const r = canvas.getBoundingClientRect()
    const x = ev.clientX - r.left
    const y = ev.clientY - r.top
    handlers.doubleClick(x, y, ev)
  }

  const onContextMenu = (ev: MouseEvent): void => {
    ev.preventDefault()
    const r = canvas.getBoundingClientRect()
    const x = ev.clientX - r.left
    const y = ev.clientY - r.top
    handlers.contextMenu(x, y, ev)
  }

  const onPointerLeave = (ev: PointerEvent): void => {
    if (activePointers.size === 0) {
      handlers.pointerLeave()
    }
  }

  const onKeyDown = (ev: KeyboardEvent): void => {
    handlers.keyDown(ev)
  }

  canvas.addEventListener('pointerdown', onPointerDown)
  canvas.addEventListener('pointermove', onPointerMove)
  canvas.addEventListener('pointerleave', onPointerLeave)
  canvas.addEventListener('wheel', onWheel, { passive: false })
  canvas.addEventListener('dblclick', onDblClick)
  canvas.addEventListener('contextmenu', onContextMenu)
  window.addEventListener('keydown', onKeyDown)

  return () => {
    canvas.removeEventListener('pointerdown', onPointerDown)
    canvas.removeEventListener('pointermove', onPointerMove)
    canvas.removeEventListener('pointerleave', onPointerLeave)
    canvas.removeEventListener('wheel', onWheel)
    canvas.removeEventListener('dblclick', onDblClick)
    canvas.removeEventListener('contextmenu', onContextMenu)
    window.removeEventListener('pointermove', onWindowMove)
    window.removeEventListener('pointerup', onWindowUp)
    window.removeEventListener('pointercancel', onWindowUp)
    window.removeEventListener('keydown', onKeyDown)
  }
}
