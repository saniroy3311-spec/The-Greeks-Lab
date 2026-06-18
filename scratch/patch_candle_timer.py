import os

def main():
    file_path = 'templates/dashboard.html'
    if not os.path.exists(file_path):
        print("Error: templates/dashboard.html not found.")
        return
        
    with open(file_path, 'r', encoding='utf-8') as f:
        html = f.read()

    # 1. Update CSS style of the countdown overlay to align with y-axis price scale
    old_css = """  #countdown-overlay-live, #countdown-overlay-scalper {
    position: absolute;
    right: 16px;
    top: 8px;
    z-index: 10;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid var(--border);
    color: var(--text);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: bold;
    pointer-events: none;
    box-shadow: var(--shadow);
    display: none;
  }
  body.dark-theme #countdown-overlay-live,
  body.dark-theme #countdown-overlay-scalper {
    background: rgba(19, 26, 46, 0.9);
  }"""

    new_css = """  #countdown-overlay-live, #countdown-overlay-scalper {
    position: absolute;
    right: 4px;
    z-index: 10;
    background: #475569;
    color: #ffffff;
    padding: 1px 4px;
    border-radius: 2px;
    font-size: 9px;
    font-weight: bold;
    pointer-events: none;
    box-shadow: 0 1px 3px rgba(0,0,0,0.2);
    display: none;
  }"""

    if old_css in html:
        html = html.replace(old_css, new_css)
        print("Updated countdown overlay CSS styling.")
    else:
        # Alt spacing check
        old_css_alt = """  #countdown-overlay-live, #countdown-overlay-scalper {
    position: absolute;
    right: 16px;
    top: 8px;
    z-index: 10;
    background: rgba(255, 255, 255, 0.9);
    border: 1px solid var(--border);
    color: var(--text);
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 11px;
    font-weight: bold;
    pointer-events: none;
    box-shadow: var(--shadow);
    display: none;
  }
  body.dark-theme #countdown-overlay-live,
  body.dark-theme #countdown-overlay-scalper {
    background: rgba(19, 26, 46, 0.9);
  }"""
        # Let's replace the properties directly if the full block matches differently
        html = html.replace("background: rgba(255, 255, 255, 0.9);", "background: #475569;")
        html = html.replace("color: var(--text);", "color: #ffffff;")
        html = html.replace("font-size: 11px;", "font-size: 9px;")
        html = html.replace("padding: 2px 6px;", "padding: 1px 4px;")
        html = html.replace("border-radius: 4px;", "border-radius: 2px;")
        print("Updated countdown overlay CSS properties.")

    # 2. Fix the invalid color token '#pred' to '#ef9f27'
    html = html.replace("color: '#pred',", "color: '#ef9f27',")
    print("Fixed AI forecast projection line color token (#pred -> #ef9f27).")

    # 3. Add updateCandleTimerPosition function inside script block
    js_loop_func = """function startShadedBoxesLoop() {
  function tick() {
    updateShadedBoxes();
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}"""

    js_loop_func_updated = """function updateCandleTimerPosition() {
  // Live Tab Timer next to current price tag on y-axis
  const timerLive = $('countdown-overlay-live');
  if (timerLive && liveChartEngine && liveCandles.length > 0) {
    const lastCandle = liveCandles[liveCandles.length - 1];
    const conv = liveChartEngine.getMainConverters();
    const rect = liveChartEngine.getMainPaneRect();
    if (conv && rect) {
      const y = conv.priceToY(lastCandle.close);
      if (y !== null) {
        timerLive.style.top = (rect.y + y - 7) + 'px';
        timerLive.style.right = '4px';
      }
    }
  }
  
  // Scalper Tab Timer next to current price tag on y-axis
  const timerScalper = $('countdown-overlay-scalper');
  if (timerScalper && scalperChartEngine && scalperCandles.length > 0) {
    const lastCandle = scalperCandles[scalperCandles.length - 1];
    const conv = scalperChartEngine.getMainConverters();
    const rect = scalperChartEngine.getMainPaneRect();
    if (conv && rect) {
      const y = conv.priceToY(lastCandle.close);
      if (y !== null) {
        timerScalper.style.top = (rect.y + y - 7) + 'px';
        timerScalper.style.right = '4px';
      }
    }
  }
}

function startShadedBoxesLoop() {
  function tick() {
    updateShadedBoxes();
    updateCandleTimerPosition();
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}"""

    if js_loop_func in html:
        html = html.replace(js_loop_func, js_loop_func_updated)
        print("Injected updateCandleTimerPosition into 60fps frame loop.")
    else:
        print("Warning: Could not locate startShadedBoxesLoop function block.")

    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(html)
        
    print("Patches completed successfully.")

if __name__ == '__main__':
    main()
