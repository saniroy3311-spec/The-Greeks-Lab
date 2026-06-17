var $s = Object.defineProperty;
var Ys = (t, e, o) => e in t ? $s(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[e] = o;
var nt = (t, e, o) => Ys(t, typeof e != "symbol" ? e + "" : e, o);
import "react/jsx-runtime";
const Os = 6, xe = 8, be = 7, zn = '-apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', et = `10px ${zn}`, di = `11px ${zn}`, fe = `12px ${zn}`;
function G(t) {
  return Math.max(Os, t.width / 2 + 3);
}
function M(t, e) {
  return { x: t.timeToX(e.time), y: t.priceToY(e.price) };
}
function gt(t, e) {
  return t.points.map((o) => M(e, o));
}
function st(t) {
  const e = t.getTransform(), o = e.a !== 0 ? Math.abs(e.a) : 1, i = e.d !== 0 ? Math.abs(e.d) : 1;
  return { w: t.canvas.width / o, h: t.canvas.height / i };
}
const Xe = /* @__PURE__ */ new Map();
function Ti(t, e) {
  const o = Xe.get(e);
  if (o) return o;
  const i = t.fillStyle;
  t.fillStyle = e;
  const n = t.fillStyle;
  t.fillStyle = i;
  let s = { r: 0, g: 0, b: 0, a: 1 };
  if (typeof n == "string")
    if (n.charAt(0) === "#" && n.length >= 7)
      s = {
        r: parseInt(n.slice(1, 3), 16),
        g: parseInt(n.slice(3, 5), 16),
        b: parseInt(n.slice(5, 7), 16),
        a: 1
      };
    else {
      const r = /rgba?\(([^)]+)\)/.exec(n);
      if (r && r[1]) {
        const l = r[1].split(",").map((a) => parseFloat(a));
        s = { r: l[0] ?? 0, g: l[1] ?? 0, b: l[2] ?? 0, a: l[3] ?? 1 };
      }
    }
  return Xe.size > 256 && Xe.clear(), Xe.set(e, s), s;
}
function _(t, e, o) {
  const i = Ti(t, e);
  return `rgba(${i.r}, ${i.g}, ${i.b}, ${(i.a * o).toFixed(3)})`;
}
function Ce(t, e) {
  const o = Ti(t, e);
  return 0.2126 * o.r + 0.7152 * o.g + 0.0722 * o.b > 145 ? "#0f0f0f" : "#ffffff";
}
function vt(t, e) {
  if (!isFinite(t)) return "—";
  const o = Math.max(0, Math.min(8, Math.round(e)));
  return t.toLocaleString("en-US", {
    minimumFractionDigits: o,
    maximumFractionDigits: o
  });
}
function Le(t, e) {
  const o = vt(t, e);
  return t >= 0 ? `+${o}` : o;
}
function Fe(t) {
  return isFinite(t) ? `${t >= 0 ? "+" : ""}${t.toFixed(2)}%` : "—";
}
const Bs = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function bn(t) {
  return t < 10 ? "0" + t : String(t);
}
function xn(t, e) {
  const o = new Date(t), i = `${o.getDate()} ${Bs[o.getMonth()]} '${bn(o.getFullYear() % 100)}`;
  return e >= 864e5 ? i : `${i} ${bn(o.getHours())}:${bn(o.getMinutes())}`;
}
function Mi(t) {
  const e = Math.abs(t), o = Math.floor(e / 6e4);
  if (o < 1) return `${Math.round(e / 1e3)}s`;
  const i = Math.floor(o / 1440), n = Math.floor(o % 1440 / 60), s = o % 60;
  return i > 0 ? n > 0 ? `${i}d ${n}h` : `${i}d` : n > 0 ? s > 0 ? `${n}h ${s}m` : `${n}h` : `${s}m`;
}
function Hs(t) {
  const e = Math.abs(t) % 100;
  if (e >= 11 && e <= 13) return `${t}th`;
  switch (Math.abs(t) % 10) {
    case 1:
      return `${t}st`;
    case 2:
      return `${t}nd`;
    case 3:
      return `${t}rd`;
    default:
      return `${t}th`;
  }
}
function wi(t, e, o) {
  const i = t.split(/\s+/).filter((l) => l.length > 0), n = [];
  let s = "";
  const r = () => {
    s.length > 0 && (n.push(s), s = "");
  };
  for (const l of i) {
    let a = l;
    if (s.length > 0 && s.length + 1 + a.length <= e) {
      s += " " + a;
      continue;
    }
    for (r(); a.length > e; )
      n.push(a.slice(0, e)), a = a.slice(e);
    s = a;
  }
  if (r(), n.length === 0 && n.push(""), n.length > o) {
    const l = n.slice(0, o), a = l[o - 1];
    return l[o - 1] = (a.length >= e ? a.slice(0, e - 1) : a) + "…", l;
  }
  return n;
}
function Pt(t, e, o, i, n, s) {
  const r = Math.min(s, i / 2, n / 2);
  t.beginPath(), t.moveTo(e + r, o), t.arcTo(e + i, o, e + i, o + n, r), t.arcTo(e + i, o + n, e, o + n, r), t.arcTo(e, o + n, e, o, r), t.arcTo(e, o, e + i, o, r), t.closePath();
}
function yt(t, e) {
  return Math.round(e) % 2 === 1 ? Math.round(t) + 0.5 : Math.round(t);
}
function $(t, e, o, i, n) {
  t.beginPath(), t.moveTo(e, o), t.lineTo(i, n), t.stroke();
}
function q(t, e, o, i) {
  t.beginPath(), t.arc(e, o, Math.max(1, i), 0, Math.PI * 2), t.fill();
}
function tn(t, e, o, i, n) {
  t.beginPath(), t.moveTo(e, o), t.lineTo(e - n * Math.cos(i - 0.42), o - n * Math.sin(i - 0.42)), t.lineTo(e - n * Math.cos(i + 0.42), o - n * Math.sin(i + 0.42)), t.closePath(), t.fill();
}
function to(t, e, o, i, n, s, r) {
  const l = i - e, a = n - o, c = Math.hypot(l, a);
  if (c < 1) return;
  const f = Math.atan2(a, l), h = Math.min(s * 0.8, c / 2), u = l / c, p = a / c, g = r ? e + u * h : e, b = r ? o + p * h : o;
  $(t, g, b, i - u * h, n - p * h), tn(t, i, n, f, s), r && tn(t, e, o, f + Math.PI, s);
}
function At(t, e, o, i, n, s = fe) {
  if (i.length === 0) return;
  t.font = s;
  const r = 8, l = 4, c = (parseInt(s, 10) || 12) + 4;
  let f = 0;
  for (const b of i) f = Math.max(f, t.measureText(b).width);
  const h = f + r * 2, u = i.length * c + l * 2, p = e - h / 2, g = o - u / 2;
  Pt(t, p, g, h, u, 4), t.fillStyle = n, t.fill(), t.fillStyle = Ce(t, n), t.textAlign = "center", t.textBaseline = "middle";
  for (let b = 0; b < i.length; b++)
    t.fillText(i[b], e, g + l + c * (b + 0.5));
}
function I(t, e, o, i) {
  const n = be / 2;
  t.lineWidth = 1, t.setLineDash([]);
  const s = i ?? e.points.map((r, l) => l);
  for (const r of s) {
    const l = e.points[r];
    if (!l) continue;
    const a = o.timeToX(l.time), c = o.priceToY(l.price);
    t.fillStyle = "#ffffff", t.fillRect(a - n, c - n, be, be), t.strokeStyle = e.color, t.strokeRect(a - n, c - n, be, be);
  }
}
function rt(t, e, o, i, n, s, r, l) {
  const a = n - o, c = s - i, f = a * a + c * c;
  let h = f === 0 ? 0 : ((t - o) * a + (e - i) * c) / f;
  return h = Math.max(r, Math.min(l, h)), Math.hypot(t - (o + h * a), e - (i + h * c));
}
function Q(t, e, o, i) {
  return rt(t, e, o.x, o.y, i.x, i.y, 0, 1);
}
function Jt(t, e, o) {
  let i = !1;
  for (let n = 0, s = o.length - 1; n < o.length; s = n++) {
    const r = o[n].x, l = o[n].y, a = o[s].x, c = o[s].y;
    l > e != c > e && t < (a - r) * (e - l) / (c - l) + r && (i = !i);
  }
  return i;
}
function Dt(t, e, o, i, n) {
  return t >= Math.min(o.x, i.x) - n && t <= Math.max(o.x, i.x) + n && e >= Math.min(o.y, i.y) - n && e <= Math.max(o.y, i.y) + n;
}
function ln(t, e, o, i, n, s, r, l) {
  const a = o - t, c = i - e, f = Math.hypot(a, c);
  if (f < 1e-6) return null;
  const h = 1e6 / f;
  let u = 0, p = 1;
  const g = [];
  if (a !== 0 && g.push((0 - t) / a, (n - t) / a), c !== 0 && g.push((0 - e) / c, (s - e) / c), g.length > 0) {
    let b = g[0], P = g[0];
    for (const w of g)
      b = Math.min(b, w), P = Math.max(P, w);
    r && (u = Math.max(Math.min(0, b), -h)), p = Math.min(Math.max(1, P), h);
  }
  return [t + a * u, e + c * u, t + a * p, e + c * p];
}
function Xs(t, e, o = 14) {
  if (t.length < o + 1) return null;
  let i = t.length - 1;
  for (; i > 0 && t[i].time > e; ) i--;
  if (i < o) return null;
  let n = 0;
  for (let s = i - o + 1; s <= i; s++) {
    const r = t[s], l = t[s - 1].close;
    n += Math.max(r.high - r.low, Math.abs(r.high - l), Math.abs(r.low - l));
  }
  return n / o;
}
function Vs(t, e, o) {
  const i = t.length;
  if (e < 1 || i - e < 30) return null;
  let n = 0, s = 0;
  for (let r = 0; r + e < i; r++) {
    const l = t[r].close;
    l > 0 && (n++, Math.abs((t[r + e].close / l - 1) * 100) <= o && s++);
  }
  return n < 30 ? null : Math.round(100 * s / n);
}
function eo(t, e, o, i, n) {
  t.font = et;
  const s = 4, r = t.measureText(i).width + s * 2, l = 15;
  Pt(t, e, o - l / 2, r, l, 3), t.fillStyle = n, t.fill(), t.fillStyle = Ce(t, n), t.textAlign = "left", t.textBaseline = "middle", t.fillText(i, e + s, o + 0.5);
}
function Si(t, e) {
  return t.font = et, t.measureText(e).width + 8;
}
const Gs = {
  id: "trendline",
  label: "Trend Line",
  group: "lines",
  pointsNeeded: 2,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1] ? M(o, e.points[1]) : n;
    $(t, n.x, n.y, s.x, s.y), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = M(i, t.points[0]), s = M(i, t.points[1]);
    return rt(e, o, n.x, n.y, s.x, s.y, 0, 1) <= G(t);
  }
}, qs = {
  id: "ray",
  label: "Ray",
  group: "lines",
  pointsNeeded: 2,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1] ? M(o, e.points[1]) : n, { w: r, h: l } = st(t), a = ln(n.x, n.y, s.x, s.y, r, l, !1);
    a ? $(t, a[0], a[1], a[2], a[3]) : q(t, n.x, n.y, e.width), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = M(i, t.points[0]), s = M(i, t.points[1]);
    return rt(e, o, n.x, n.y, s.x, s.y, 0, Number.POSITIVE_INFINITY) <= G(t);
  }
}, Us = {
  id: "xline",
  label: "Extended Line",
  group: "lines",
  pointsNeeded: 2,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1] ? M(o, e.points[1]) : n, { w: r, h: l } = st(t), a = ln(n.x, n.y, s.x, s.y, r, l, !0);
    a ? $(t, a[0], a[1], a[2], a[3]) : q(t, n.x, n.y, e.width), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = M(i, t.points[0]), s = M(i, t.points[1]);
    return rt(e, o, n.x, n.y, s.x, s.y, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY) <= G(t);
  }
}, js = {
  id: "hray",
  label: "Horizontal Ray",
  group: "lines",
  pointsNeeded: 1,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]), { w: r } = st(t), l = yt(s.y, t.lineWidth);
    if (s.x < r) {
      $(t, s.x, l, r, l);
      const a = vt(e.points[0].price, n.pricePrecision);
      eo(t, Math.max(s.x, r - Si(t, a) - 2), l, a, e.color);
    }
    i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = M(i, t.points[0]), s = G(t);
    return Math.abs(o - n.y) <= s && e >= n.x - s;
  }
}, Js = {
  id: "hline",
  label: "Horizontal Line",
  group: "lines",
  pointsNeeded: 1,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]), { w: r } = st(t), l = yt(s.y, t.lineWidth);
    $(t, 0, l, r, l), eo(t, 2, l, vt(e.points[0].price, n.pricePrecision), e.color), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    return Math.abs(o - i.priceToY(t.points[0].price)) <= G(t);
  }
}, Ks = {
  id: "vline",
  label: "Vertical Line",
  group: "lines",
  pointsNeeded: 1,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]), { w: r, h: l } = st(t), a = yt(s.x, t.lineWidth);
    $(t, a, 0, a, l);
    const c = xn(e.points[0].time, n.barMs), f = Si(t, c), h = Math.max(2, Math.min(r - f - 2, a - f / 2));
    eo(t, h, l - 10, c, e.color), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    return Math.abs(e - i.timeToX(t.points[0].time)) <= G(t);
  }
}, Zs = [Gs, qs, Us, js, Js, Ks], Qs = 0.08, zs = 0.06;
function Fo(t, e, o) {
  if (Math.abs(e.x - t.x) > 1e-9) {
    const i = (o.x - t.x) / (e.x - t.x), n = t.y + i * (e.y - t.y);
    return { x: 0, y: o.y - n };
  }
  return { x: o.x - t.x, y: 0 };
}
const xs = {
  id: "channel",
  label: "Parallel Channel",
  group: "channels",
  pointsNeeded: 3,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1], r = e.points[2];
    if (!s) {
      q(t, n.x, n.y, e.width), i && I(t, e, o);
      return;
    }
    const l = M(o, s);
    if (r) {
      const a = Fo(n, l, M(o, r)), c = { x: n.x + a.x, y: n.y + a.y }, f = { x: l.x + a.x, y: l.y + a.y };
      t.fillStyle = _(t, e.color, Qs), t.beginPath(), t.moveTo(n.x, n.y), t.lineTo(l.x, l.y), t.lineTo(f.x, f.y), t.lineTo(c.x, c.y), t.closePath(), t.fill(), $(t, c.x, c.y, f.x, f.y), t.save(), t.setLineDash([4, 4]), t.strokeStyle = _(t, e.color, 0.45), t.lineWidth = 1, $(t, n.x + a.x / 2, n.y + a.y / 2, l.x + a.x / 2, l.y + a.y / 2), t.restore();
    }
    $(t, n.x, n.y, l.x, l.y), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = M(i, t.points[0]), s = M(i, t.points[1]), r = Fo(n, s, M(i, t.points[2])), l = { x: n.x + r.x, y: n.y + r.y }, a = { x: s.x + r.x, y: s.y + r.y }, c = G(t);
    return Q(e, o, n, s) <= c || Q(e, o, l, a) <= c ? !0 : Jt(e, o, [n, s, a, l]);
  }
};
function dn(t, e, o, i, n, s, r) {
  let l = 1;
  return o !== 0 && (l = Math.max(l, (0 - t) / o, (n - t) / o)), i !== 0 && (l = Math.max(l, (0 - e) / i, (s - e) / i)), Math.min(l, 1e6 / r);
}
function Ro(t, e) {
  if (!t.points[1] || !t.points[2]) return null;
  const o = M(e, t.points[0]), i = M(e, t.points[1]), n = M(e, t.points[2]), s = { x: (i.x + n.x) / 2, y: (i.y + n.y) / 2 }, r = s.x - o.x, l = s.y - o.y;
  return { a: o, b: i, c: n, mid: s, dx: r, dy: l, len: Math.hypot(r, l) };
}
const tr = {
  id: "pitchfork",
  label: "Pitchfork",
  group: "channels",
  pointsNeeded: 3,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1];
    if (!s) {
      q(t, n.x, n.y, e.width), i && I(t, e, o);
      return;
    }
    const r = Ro(e, o);
    if (!r) {
      const L = M(o, s);
      $(t, n.x, n.y, L.x, L.y), i && I(t, e, o);
      return;
    }
    const { b: l, c: a, mid: c, dx: f, dy: h, len: u } = r, { w: p, h: g } = st(t);
    if (u < 1e-6) {
      $(t, l.x, l.y, a.x, a.y), i && I(t, e, o);
      return;
    }
    const b = dn(l.x, l.y, f, h, p, g, u), P = dn(a.x, a.y, f, h, p, g, u), w = dn(n.x, n.y, f, h, p, g, u), k = { x: l.x + f * b, y: l.y + h * b }, R = { x: a.x + f * P, y: a.y + h * P };
    t.fillStyle = _(t, e.color, zs), t.beginPath(), t.moveTo(l.x, l.y), t.lineTo(k.x, k.y), t.lineTo(R.x, R.y), t.lineTo(a.x, a.y), t.closePath(), t.fill(), t.strokeStyle = _(t, e.color, 0.85), $(t, l.x, l.y, k.x, k.y), $(t, a.x, a.y, R.x, R.y), t.save(), t.setLineDash([4, 4]), t.strokeStyle = _(t, e.color, 0.5), t.lineWidth = 1, $(t, l.x, l.y, a.x, a.y), t.restore(), t.strokeStyle = e.color, $(t, n.x, n.y, n.x + f * w, n.y + h * w), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = Ro(t, i);
    if (!n) return !1;
    const { a: s, b: r, c: l, dx: a, dy: c, len: f } = n, h = G(t);
    if (f < 1e-6) return Q(e, o, r, l) <= h;
    const u = Number.POSITIVE_INFINITY;
    return rt(e, o, s.x, s.y, s.x + a, s.y + c, 0, u) <= h || rt(e, o, r.x, r.y, r.x + a, r.y + c, 0, u) <= h || rt(e, o, l.x, l.y, l.x + a, l.y + c, 0, u) <= h || Q(e, o, r, l) <= h;
  }
}, er = [xs, tr], nr = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144], or = [0, 0.382, 0.618, 1, 1.618, 2.618, 4.236], ir = [0.236, 0.382, 0.5, 0.618, 0.786, 1];
function Bt(t, e) {
  return t.map((o, i) => {
    const n = { ratio: o, visible: !0 };
    return e && e[i] && (n.color = e[i]), n;
  });
}
function sr(t) {
  switch (t) {
    case "fib":
      return Bt(Tn, Pi);
    case "fibext":
      return Bt(ar, Ai);
    case "fibchannel":
    case "fibcircle":
      return Bt(Tn);
    case "fibtimezone":
      return Bt(nr);
    case "fibtimeext":
      return Bt(or);
    case "fibfan":
    case "fibwedge":
      return Bt(ir);
    default:
      return Bt(Tn);
  }
}
function rr(t) {
  if (typeof t != "string") return null;
  let e;
  try {
    e = JSON.parse(t);
  } catch {
    return null;
  }
  if (!Array.isArray(e)) return null;
  const o = [];
  for (const i of e) {
    if (typeof i != "object" || i === null) continue;
    const n = i;
    if (typeof n.ratio != "number" || !Number.isFinite(n.ratio)) continue;
    const s = { ratio: n.ratio, visible: n.visible !== !1 };
    typeof n.color == "string" && n.color && (s.color = n.color), typeof n.label == "string" && n.label && (s.label = n.label.slice(0, 24)), o.push(s);
  }
  return o.length ? o : null;
}
function tt(t, e) {
  var o;
  return rr((o = t.props) == null ? void 0 : o.levels) ?? sr(e);
}
const lr = 0.08, Tn = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1], Pi = [
  "#787b86",
  // 0
  "#f23645",
  // 0.236
  "#ff9800",
  // 0.382
  "#4caf50",
  // 0.5
  "#089981",
  // 0.618
  "#00bcd4",
  // 0.786
  "#787b86"
  // 1
], ar = [0, 0.382, 0.618, 1, 1.272, 1.618, 2], Ai = [
  "#787b86",
  // 0 (at C)
  "#ff9800",
  // 0.382
  "#089981",
  // 0.618
  "#787b86",
  // 1
  "#00bcd4",
  // 1.272
  "#f23645",
  // 1.618
  "#9c27b0"
  // 2
];
function vo(t, e) {
  const o = t.points[0], i = t.points[1] ?? o;
  return i.price + (o.price - i.price) * e;
}
function Eo(t, e) {
  const o = t.points[0], i = t.points[1] ?? o;
  return (t.points[2] ?? i).price + (i.price - o.price) * e;
}
function ki(t, e, o, i, n, s, r, l, a) {
  const c = (h) => s[h].color ?? r(h);
  for (let h = 0; h < s.length - 1; h++) {
    if (!s[h].visible || !s[h + 1].visible) continue;
    const u = o.priceToY(l(s[h].ratio)), p = o.priceToY(l(s[h + 1].ratio));
    t.fillStyle = _(t, c(h + 1), lr), t.fillRect(i, Math.min(u, p), n, Math.abs(p - u));
  }
  const f = Math.max(1, e.width);
  t.font = et, t.textAlign = "left", t.textBaseline = "bottom", t.lineWidth = f;
  for (let h = 0; h < s.length; h++) {
    const u = s[h];
    if (!u.visible) continue;
    const p = l(u.ratio), g = yt(o.priceToY(p), f), b = c(h);
    t.strokeStyle = b, $(t, i, g, i + n, g), t.fillStyle = b, t.fillText(`${u.label ?? u.ratio} — ${vt(p, a)}`, i + 4, g - 2);
  }
}
function Xn(t, e, o, i, n, s) {
  t.save(), t.setLineDash([4, 4]), t.strokeStyle = _(t, e, 0.55), t.lineWidth = 1, $(t, o, i, n, s), t.restore();
}
const cr = {
  id: "fib",
  label: "Fib Retracement",
  group: "fib",
  pointsNeeded: 2,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]), r = e.points[1] ? M(o, e.points[1]) : s, l = Math.min(s.x, r.x), a = Math.abs(r.x - s.x);
    ki(
      t,
      e,
      o,
      l,
      a,
      tt(e, "fib"),
      (c) => Pi[c] ?? e.color,
      (c) => vo(e, c),
      n.pricePrecision
    ), Xn(t, e.color, s.x, s.y, r.x, r.y), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = G(t), s = i.timeToX(t.points[0].time), r = i.timeToX(t.points[1].time);
    if (e < Math.min(s, r) - n || e > Math.max(s, r) + n) return !1;
    for (const l of tt(t, "fib"))
      if (l.visible && Math.abs(o - i.priceToY(vo(t, l.ratio))) <= n)
        return !0;
    return !1;
  }
};
function _o(t, e) {
  const o = e.timeToX(t.points[0].time), i = e.timeToX(t.points[1].time), n = e.timeToX(t.points[2].time);
  return { left: n, width: Math.max(Math.abs(i - o), Math.abs(n - i), 60) };
}
const fr = {
  id: "fibext",
  label: "Fib Extension",
  group: "fib",
  pointsNeeded: 3,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]);
    if (!e.points[1]) {
      q(t, s.x, s.y, e.width), i && I(t, e, o);
      return;
    }
    const r = M(o, e.points[1]);
    if (Xn(t, e.color, s.x, s.y, r.x, r.y), e.points[2]) {
      const l = M(o, e.points[2]);
      Xn(t, e.color, r.x, r.y, l.x, l.y);
      const { left: a, width: c } = _o(e, o);
      ki(
        t,
        e,
        o,
        a,
        c,
        tt(e, "fibext"),
        (f) => Ai[f] ?? e.color,
        (f) => Eo(e, f),
        n.pricePrecision
      );
    }
    i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = G(t), { left: s, width: r } = _o(t, i);
    if (e < s - n || e > s + r + n) return !1;
    for (const l of tt(t, "fibext"))
      if (l.visible && Math.abs(o - i.priceToY(Eo(t, l.ratio))) <= n)
        return !0;
    return !1;
  }
}, hr = [cr, fr], no = 0.12, ur = {
  id: "rect",
  label: "Rectangle",
  group: "shapes",
  pointsNeeded: 2,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1] ? M(o, e.points[1]) : n, r = Math.min(n.x, s.x), l = Math.min(n.y, s.y), a = Math.abs(s.x - n.x), c = Math.abs(s.y - n.y);
    t.fillStyle = _(t, e.color, no), t.fillRect(r, l, a, c), t.strokeRect(r, l, a, c), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    return Dt(e, o, M(i, t.points[0]), M(i, t.points[1]), G(t));
  }
}, pr = {
  id: "ellipse",
  label: "Ellipse",
  group: "shapes",
  pointsNeeded: 2,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1] ? M(o, e.points[1]) : n, r = (n.x + s.x) / 2, l = (n.y + s.y) / 2, a = Math.max(Math.abs(s.x - n.x) / 2, 0.5), c = Math.max(Math.abs(s.y - n.y) / 2, 0.5);
    t.beginPath(), t.ellipse(r, l, a, c, 0, 0, Math.PI * 2), t.fillStyle = _(t, e.color, no), t.fill(), t.stroke(), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = M(i, t.points[0]), s = M(i, t.points[1]), r = (n.x + s.x) / 2, l = (n.y + s.y) / 2, a = Math.max(Math.abs(s.x - n.x) / 2, 1), c = Math.max(Math.abs(s.y - n.y) / 2, 1);
    return Math.hypot((e - r) / a, (o - l) / c) <= 1 + G(t) / Math.min(a, c);
  }
}, mr = {
  id: "triangle",
  label: "Triangle",
  group: "shapes",
  pointsNeeded: 3,
  render(t, e, o, i) {
    const n = gt(e, o);
    n.length === 1 ? q(t, n[0].x, n[0].y, e.width) : n.length === 2 ? $(t, n[0].x, n[0].y, n[1].x, n[1].y) : (t.beginPath(), t.moveTo(n[0].x, n[0].y), t.lineTo(n[1].x, n[1].y), t.lineTo(n[2].x, n[2].y), t.closePath(), t.fillStyle = _(t, e.color, no), t.fill(), t.lineJoin = "round", t.stroke()), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = gt(t, i);
    if (Jt(e, o, n)) return !0;
    const s = G(t);
    return Q(e, o, n[0], n[1]) <= s || Q(e, o, n[1], n[2]) <= s || Q(e, o, n[2], n[0]) <= s;
  }
}, gr = {
  id: "arrow",
  label: "Arrow",
  group: "shapes",
  pointsNeeded: 2,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1] ? M(o, e.points[1]) : n, r = Math.max(1, e.width), l = 6 + r * 3, a = s.x - n.x, c = s.y - n.y, f = Math.hypot(a, c);
    if (f < 1)
      q(t, n.x, n.y, r);
    else {
      const h = Math.atan2(c, a), u = a / f, p = c / f, g = Math.min(l * 0.7, f);
      t.lineCap = "round", $(t, n.x, n.y, s.x - u * g, s.y - p * g), tn(t, s.x, s.y, h, l);
    }
    i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = M(i, t.points[0]), s = M(i, t.points[1]);
    return Q(e, o, n, s) <= Math.max(G(t), 3 + t.width * 1.5);
  }
}, yr = {
  id: "brush",
  label: "Brush",
  group: "shapes",
  pointsNeeded: -1,
  // freehand: the engine streams points while dragging
  render(t, e, o, i) {
    const n = gt(e, o);
    if (n.length !== 0) {
      if (n.length === 1)
        q(t, n[0].x, n[0].y, Math.max(1.5, e.width));
      else {
        t.lineJoin = "round", t.lineCap = "round", t.beginPath(), t.moveTo(n[0].x, n[0].y);
        for (let s = 1; s < n.length; s++) t.lineTo(n[s].x, n[s].y);
        t.stroke();
      }
      i && I(t, e, o, n.length > 1 ? [0, n.length - 1] : [0]);
    }
  },
  hitTest(t, e, o, i) {
    const n = gt(t, i), s = G(t);
    if (n.length === 1) return Math.hypot(e - n[0].x, o - n[0].y) <= s;
    for (let r = 0; r < n.length - 1; r++)
      if (Q(e, o, n[r], n[r + 1]) <= s) return !0;
    return !1;
  },
  handleAt(t, e, o, i) {
    const n = t.points.length > 1 ? [t.points.length - 1, 0] : [0];
    for (const s of n) {
      const r = t.points[s];
      if (Math.abs(e - i.timeToX(r.time)) <= xe && Math.abs(o - i.priceToY(r.price)) <= xe)
        return s;
    }
    return -1;
  }
}, br = [ur, pr, mr, gr, yr], dr = 24, Tr = 3, Vn = 15, Gn = 8, qn = 6, Li = 12, oe = 6.5, Un = 15, Ve = /* @__PURE__ */ new Map();
function Ii(t) {
  var s;
  const e = (t.text ?? "").trim(), o = e.length === 0, i = wi(o ? "Note" : e, dr, Tr), n = typeof ((s = t.props) == null ? void 0 : s.emoji) == "string" ? t.props.emoji.trim() : "";
  return n.length > 0 && (i[0] = `${n} ${i[0]}`), { lines: i, placeholder: o };
}
function Mr(t, e, o) {
  const { lines: i } = Ii(t);
  let n = 0;
  for (const l of i) n = Math.max(n, l.length);
  const s = n * 6.5 + Gn * 2, r = i.length * Vn + qn * 2;
  return { x: e + Li, y: o - Un - r / 2, w: s, h: r };
}
const wr = {
  id: "note",
  label: "Note",
  group: "annotate",
  pointsNeeded: 1,
  defaultProps: { emoji: "" },
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = n.y - Un;
    t.beginPath(), t.moveTo(n.x, n.y), t.quadraticCurveTo(n.x - oe, n.y - 9, n.x - oe, s), t.arc(n.x, s, oe, Math.PI, 0, !1), t.quadraticCurveTo(n.x + oe, n.y - 9, n.x, n.y), t.closePath(), t.fillStyle = e.color, t.fill(), t.beginPath(), t.arc(n.x, s, 2.4, 0, Math.PI * 2), t.fillStyle = "#ffffff", t.fill();
    const { lines: r, placeholder: l } = Ii(e);
    t.font = di;
    let a = 0;
    for (const p of r) a = Math.max(a, t.measureText(p).width);
    const c = a + Gn * 2, f = r.length * Vn + qn * 2, h = n.x + Li, u = s - f / 2;
    Ve.size > 512 && Ve.clear(), Ve.set(e.id, { x: h, y: u, w: c, h: f }), Pt(t, h, u, c, f, 6), t.fillStyle = _(t, e.color, 0.14), t.fill(), t.lineWidth = 1, t.strokeStyle = i ? e.color : _(t, e.color, 0.35), t.stroke(), t.fillStyle = l ? _(t, e.color, 0.55) : e.color, t.textAlign = "left", t.textBaseline = "middle";
    for (let p = 0; p < r.length; p++)
      t.fillText(r[p], h + Gn, u + qn + Vn * (p + 0.5));
  },
  hitTest(t, e, o, i) {
    const n = M(i, t.points[0]);
    if (Math.abs(e - n.x) <= oe + 3 && o >= n.y - Un - oe - 3 && o <= n.y + 3)
      return !0;
    const s = Ve.get(t.id) ?? Mr(t, n.x, n.y);
    return e >= s.x - 2 && e <= s.x + s.w + 2 && o >= s.y - 2 && o <= s.y + s.h + 2;
  }
}, Sr = [wr], Pr = 0.08, Ar = 0.35, kr = "#089981", Lr = "#f23645";
function Ni(t) {
  var e;
  return (((e = t.points[1]) == null ? void 0 : e.price) ?? t.points[0].price) >= t.points[0].price ? kr : Lr;
}
function oo(t, e, o, i) {
  const n = Math.min(e.x, o.x), s = Math.min(e.y, o.y), r = Math.abs(o.x - e.x), l = Math.abs(o.y - e.y);
  t.fillStyle = _(t, i, Pr), t.fillRect(n, s, r, l), t.save(), t.setLineDash([4, 4]), t.lineWidth = 1, t.strokeStyle = _(t, i, Ar), t.strokeRect(n, s, r, l), t.restore();
}
function Ci(t) {
  const e = t.points[0].price, o = t.points[1].price;
  if (!(Math.abs(e) > 0)) return null;
  const i = (o - e) / Math.abs(e) * 100;
  return isFinite(i) ? i : null;
}
function Fi(t, e) {
  return e > 0 ? Math.round(Math.abs(t.points[1].time - t.points[0].time) / e) : 0;
}
function jn(t) {
  return t === 1 ? "1 bar" : `${t} bars`;
}
const Ir = {
  id: "pricerange",
  label: "Price Range",
  group: "measure",
  pointsNeeded: 2,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]);
    if (!e.points[1]) {
      q(t, s.x, s.y, e.width), i && I(t, e, o);
      return;
    }
    const r = M(o, e.points[1]), l = Ni(e);
    oo(t, s, r, l);
    const a = (s.x + r.x) / 2;
    t.strokeStyle = l, t.fillStyle = l, t.lineWidth = Math.max(1, e.width), to(t, a, s.y, a, r.y, 7, !0);
    const c = e.points[1].price - e.points[0].price, f = Ci(e), h = Le(c, n.pricePrecision), u = f === null ? `Δ ${h}` : `Δ ${h}  (${Fe(f)})`;
    At(t, a, (s.y + r.y) / 2, [u], l), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    return Dt(e, o, M(i, t.points[0]), M(i, t.points[1]), 6);
  }
}, Nr = {
  id: "daterange",
  label: "Date Range",
  group: "measure",
  pointsNeeded: 2,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]);
    if (!e.points[1]) {
      q(t, s.x, s.y, e.width), i && I(t, e, o);
      return;
    }
    const r = M(o, e.points[1]);
    oo(t, s, r, e.color);
    const l = (s.y + r.y) / 2;
    t.strokeStyle = e.color, t.fillStyle = e.color, t.lineWidth = Math.max(1, e.width), to(t, s.x, l, r.x, l, 7, !1);
    const a = Math.abs(e.points[1].time - e.points[0].time), c = `${jn(Fi(e, n.barMs))} · ${Mi(a)}`;
    At(t, (s.x + r.x) / 2, l, [c], e.color), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    return Dt(e, o, M(i, t.points[0]), M(i, t.points[1]), 6);
  }
}, Cr = {
  id: "sigmatape",
  label: "Sigma Tape",
  group: "measure",
  pointsNeeded: 2,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]);
    if (!e.points[1]) {
      q(t, s.x, s.y, e.width), i && I(t, e, o);
      return;
    }
    const r = M(o, e.points[1]), l = Ni(e);
    oo(t, s, r, l), t.strokeStyle = l, t.fillStyle = l, t.lineWidth = Math.max(1, e.width), to(t, s.x, s.y, r.x, r.y, 7, !1);
    const a = Ci(e), c = Fi(e, n.barMs), f = a === null ? jn(c) : `${Fe(a)} · ${jn(c)}`, h = [], u = Xs(n.candles, Math.max(e.points[0].time, e.points[1].time), 14), p = Math.abs(e.points[1].price - e.points[0].price);
    if (u !== null && u > 0 && h.push(`${(p / u).toFixed(1)}× ATR`), a !== null) {
      const b = Vs(n.candles, c, Math.abs(a));
      b !== null && h.push(`${Hs(b)} %ile`);
    }
    const g = h.length > 0 ? [f, h.join(" · ")] : [f];
    At(t, (s.x + r.x) / 2, (s.y + r.y) / 2, g, l), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    return Dt(e, o, M(i, t.points[0]), M(i, t.points[1]), 6);
  }
}, Fr = [Ir, Nr, Cr], Tt = 6, Xt = 8, de = 7, Rr = '500 11px -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', Mn = 17, Do = 5, vr = 3, Ri = "rgba(24, 28, 38, 0.92)";
function Er(t) {
  const e = t.getTransform(), o = e.a !== 0 ? Math.abs(e.a) : 1, i = e.d !== 0 ? Math.abs(e.d) : 1;
  return { w: t.canvas.width / o, h: t.canvas.height / i };
}
const Ge = /* @__PURE__ */ new Map();
function vi(t, e) {
  const o = Ge.get(e);
  if (o) return o;
  const i = t.fillStyle;
  t.fillStyle = e;
  const n = t.fillStyle;
  t.fillStyle = i;
  let s = { r: 0, g: 0, b: 0, a: 1 };
  if (typeof n == "string")
    if (n.charAt(0) === "#" && n.length >= 7)
      s = {
        r: parseInt(n.slice(1, 3), 16),
        g: parseInt(n.slice(3, 5), 16),
        b: parseInt(n.slice(5, 7), 16),
        a: 1
      };
    else {
      const r = /rgba?\(([^)]+)\)/.exec(n);
      if (r && r[1]) {
        const l = r[1].split(",").map((a) => parseFloat(a));
        s = { r: l[0] ?? 0, g: l[1] ?? 0, b: l[2] ?? 0, a: l[3] ?? 1 };
      }
    }
  return Ge.size > 256 && Ge.clear(), Ge.set(e, s), s;
}
function qt(t, e, o) {
  const i = vi(t, e);
  return `rgba(${i.r}, ${i.g}, ${i.b}, ${(i.a * o).toFixed(3)})`;
}
function _r(t, e) {
  const o = vi(t, e);
  return 0.2126 * o.r + 0.7152 * o.g + 0.0722 * o.b > 145 ? "#0f0f0f" : "#ffffff";
}
function Dr(t, e, o, i, n, s) {
  const r = Math.min(s, i / 2, n / 2);
  t.beginPath(), t.moveTo(e + r, o), t.arcTo(e + i, o, e + i, o + n, r), t.arcTo(e + i, o + n, e, o + n, r), t.arcTo(e, o + n, e, o, r), t.arcTo(e, o, e + i, o, r), t.closePath();
}
function ht(t, e) {
  return Math.round(e) % 2 === 1 ? Math.round(t) + 0.5 : Math.round(t);
}
function Vt(t, e, o, i, n) {
  t.beginPath(), t.moveTo(e, o), t.lineTo(i, n), t.stroke();
}
function wt(t, e, o, i, n, s = "left") {
  t.font = Rr;
  const r = Math.ceil(t.measureText(i).width) + Do * 2, l = s === "left" ? e : s === "right" ? e - r : e - r / 2, a = o - Mn / 2;
  return Dr(t, l, a, r, Mn, vr), t.fillStyle = n, t.fill(), t.fillStyle = _r(t, n), t.textAlign = "left", t.textBaseline = "middle", t.fillText(i, l + Do, o + 0.5), { x: l, y: a, w: r, h: Mn };
}
function le(t, e, o, i) {
  const n = de / 2;
  t.lineWidth = 1, t.fillStyle = "#ffffff", t.fillRect(e - n, o - n, de, de), t.strokeStyle = i, t.strokeRect(e - n, o - n, de, de);
}
function Gt(t, e) {
  if (!Number.isFinite(t)) return String(t);
  const o = Math.max(0, Math.min(8, Math.round(e))), i = t < 0, n = Math.abs(t).toFixed(o), s = n.indexOf("."), r = s === -1 ? n : n.slice(0, s), l = s === -1 ? "" : n.slice(s);
  let a = "";
  for (let c = 0; c < r.length; c++)
    c > 0 && (r.length - c) % 3 === 0 && (a += ","), a += r.charAt(c);
  return (i ? "-" : "") + a + l;
}
function Ei(t) {
  if (!Number.isFinite(t)) return String(t);
  const e = t < 0 ? "-" : "";
  let o = Math.abs(t);
  const i = ["", "K", "M", "B", "T"];
  let n = 0;
  for (; o >= 999.95 && n < i.length - 1; )
    o /= 1e3, n++;
  const s = o >= 99.95 ? o.toFixed(0) : o.toFixed(1).replace(/\.0$/, "");
  return e + s + i[n];
}
function Wo(t) {
  return Number.isFinite(t) ? `${t >= 0 ? "+" : ""}${t.toFixed(2)}%` : "0.00%";
}
function $o(t) {
  if (!Number.isFinite(t)) return "0";
  const e = Math.abs(t);
  return e >= 1e3 ? Ei(t) : e >= 100 ? t.toFixed(0) : e >= 10 ? t.toFixed(1) : t.toFixed(2);
}
function en(t, e, o) {
  const i = t.props ? t.props[e] : void 0;
  return typeof i == "number" && Number.isFinite(i) ? i : o;
}
function nn(t, e) {
  let o = 0, i = t.length;
  for (; o < i; ) {
    const n = o + i >> 1;
    t[n].time < e ? o = n + 1 : i = n;
  }
  return o;
}
function _i(t, e) {
  const o = t.length;
  if (o === 0) return -1;
  const i = nn(t, e);
  return i <= 0 ? 0 : i >= o ? o - 1 : e - t[i - 1].time <= t[i].time - e ? i - 1 : i;
}
function Yo(t, e) {
  return Math.max(t.high - t.low, Math.abs(t.high - e.close), Math.abs(t.low - e.close));
}
function Wr(t, e, o = 14) {
  const i = Math.min(e, t.length - 1);
  if (o < 1 || i < o) return;
  let n = 0;
  for (let s = 1; s <= o; s++) n += Yo(t[s], t[s - 1]);
  n /= o;
  for (let s = o + 1; s <= i; s++)
    n = (n * (o - 1) + Yo(t[s], t[s - 1])) / o;
  return n;
}
function $r(t, e, o, i, n, s) {
  const r = n - o, l = s - i, a = r * r + l * l;
  let c = a === 0 ? 0 : ((t - o) * r + (e - i) * l) / a;
  return c = Math.max(0, Math.min(1, c)), Math.hypot(t - (o + c * r), e - (i + c * l));
}
const qe = "#ef5350", Ue = "#26a69a", Yr = 12, Or = 14, Br = 1.5, Hr = 0.02, Oo = 0.12;
function Bo(t) {
  const e = Math.abs(t) * 1e-5;
  return e > 0 ? e : 1e-8;
}
function wn(t, e, o) {
  const i = t.points[0], n = t.points[1], s = t.points[2];
  if (!i || !n || !s) return null;
  const r = e.timeToX(i.time);
  let l = e.timeToX(i.time + Yr * o.barMs);
  return (!Number.isFinite(l) || l - r < 8) && (l = r + 120), {
    entry: i,
    stop: n,
    target: s,
    x0: r,
    x1: l,
    yEntry: e.priceToY(i.price),
    yStop: e.priceToY(n.price),
    yTarget: e.priceToY(s.price)
  };
}
function Ho(t) {
  const e = t === "long" ? 1 : -1;
  return {
    id: t === "long" ? "longpos" : "shortpos",
    label: t === "long" ? "Long Position" : "Short Position",
    group: "smart",
    pointsNeeded: 1,
    defaultProps: { stake: 1e3, riskR: 2 },
    expandOnCommit(o, i) {
      const n = o.points[0];
      if (!n) return o;
      const s = Math.max(en(o, "riskR", 2), 0.1), r = nn(i.candles, n.time + 1) - 1;
      let l = r >= 0 ? Wr(i.candles, r, Or) : void 0;
      (l === void 0 || !(l > 0)) && (l = Math.max(Math.abs(n.price) * Hr, Bo(n.price)));
      const a = n.price - e * Br * l, c = n.price + e * s * Math.abs(n.price - a);
      return {
        ...o,
        points: [
          { time: n.time, price: n.price },
          { time: n.time, price: a },
          { time: n.time, price: c }
        ]
      };
    },
    render(o, i, n, s, r) {
      const l = i.points[0];
      if (!l) return;
      o.save();
      const a = r.pricePrecision, c = wn(i, n, r);
      if (!c) {
        const K = n.timeToX(l.time), J = ht(n.priceToY(l.price), 1);
        o.lineWidth = 1, o.strokeStyle = i.color, o.setLineDash([4, 3]), Vt(o, K, J, K + 120, J), o.setLineDash([]), wt(o, K + 126, J, `Entry ${Gt(l.price, a)}`, i.color, "left"), o.restore();
        return;
      }
      const { x0: f, x1: h, yEntry: u, yStop: p, yTarget: g } = c, b = h - f;
      o.fillStyle = qt(o, qe, Oo), o.fillRect(f, Math.min(u, p), b, Math.abs(p - u)), o.fillStyle = qt(o, Ue, Oo), o.fillRect(f, Math.min(u, g), b, Math.abs(g - u));
      const P = Math.max(1, i.width);
      o.lineWidth = P, o.strokeStyle = qe, Vt(o, f, ht(p, P), h, ht(p, P)), o.strokeStyle = Ue, Vt(o, f, ht(g, P), h, ht(g, P)), o.strokeStyle = i.color, Vt(o, f, ht(u, P), h, ht(u, P));
      const w = l.price !== 0 ? l.price : 1, k = (c.stop.price - l.price) / w * 100, R = (c.target.price - l.price) / w * 100;
      wt(o, h + 6, u, `Entry ${Gt(l.price, a)}`, i.color, "left"), wt(
        o,
        h + 6,
        p,
        `Stop ${Gt(c.stop.price, a)} · ${Wo(k)}`,
        qe,
        "left"
      ), wt(
        o,
        h + 6,
        g,
        `Target ${Gt(c.target.price, a)} · ${Wo(R)}`,
        Ue,
        "left"
      );
      const L = en(i, "stake", 1e3), E = Math.abs(k), C = Math.abs(R), Y = E > 0 ? C / E : 0, H = L * E / 100, j = L * C / 100;
      wt(
        o,
        (f + h) / 2,
        u,
        `R:R 1:${Y.toFixed(1)} · risk $${$o(H)} · reward $${$o(j)}`,
        Ri,
        "center"
      ), s && (le(o, h, u, i.color), le(o, h, p, qe), le(o, h, g, Ue)), o.restore();
    },
    hitTest(o, i, n, s, r) {
      const l = wn(o, s, r);
      if (!l || i < l.x0 - Tt || i > l.x1 + Tt) return !1;
      const a = n >= Math.min(l.yEntry, l.yStop) - Tt && n <= Math.max(l.yEntry, l.yStop) + Tt, c = n >= Math.min(l.yEntry, l.yTarget) - Tt && n <= Math.max(l.yEntry, l.yTarget) + Tt;
      return a || c;
    },
    handleAt(o, i, n, s, r) {
      const l = wn(o, s, r);
      if (!l) return -1;
      const a = (c, f) => Math.abs(i - c) <= Xt && Math.abs(n - f) <= Xt;
      return a(l.x1, l.yStop) ? 1 : a(l.x1, l.yTarget) ? 2 : a(l.x1, l.yEntry) || i >= l.x0 - Xt && i <= l.x1 + Xt && Math.abs(n - l.yEntry) <= Xt ? 0 : -1;
    },
    moveHandle(o, i, n) {
      const s = o.points[0], r = o.points[1], l = o.points[2];
      if (!s || !r || !l)
        return {
          ...o,
          points: o.points.map((c, f) => f === i ? { time: n.time, price: n.price } : c)
        };
      if (i === 0) {
        const c = n.time - s.time, f = n.price - s.price;
        return { ...o, points: o.points.map((h) => ({ time: h.time + c, price: h.price + f })) };
      }
      const a = Bo(s.price);
      if (i === 1) {
        const c = e === 1 ? Math.min(n.price, s.price - a) : Math.max(n.price, s.price + a);
        return { ...o, points: [s, { time: s.time, price: c }, l] };
      }
      if (i === 2) {
        const c = e === 1 ? Math.max(n.price, s.price + a) : Math.min(n.price, s.price - a);
        return { ...o, points: [s, r, { time: s.time, price: c }] };
      }
      return o;
    }
  };
}
const Xr = [Ho("long"), Ho("short")], Sn = 0.4, Vr = 0.1, Gr = 0.25, Xo = 12, qr = 5, Vo = 3;
function Go(t, e) {
  const o = Math.abs(t) * e / 200;
  return [t - o, t + o];
}
function Ur(t, e, o) {
  let i = 0, n = -1 - Vo;
  for (let s = 0; s < t.length; s++) {
    const r = t[s];
    r.low <= o && r.high >= e && (s - n - 1 >= Vo && i++, n = s);
  }
  return i;
}
const jr = {
  id: "smartlevel",
  label: "Smart Level",
  group: "smart",
  pointsNeeded: 1,
  defaultProps: { heightPct: Sn },
  render(t, e, o, i, n) {
    const s = e.points[0];
    if (!s) return;
    t.save();
    const { w: r } = Er(t), l = Math.max(en(e, "heightPct", Sn), 1e-4), [a, c] = Go(s.price, l), f = o.priceToY(c), h = o.priceToY(a), u = Math.min(f, h), p = Math.max(Math.abs(h - f), 1), g = Ur(n.candles, a, c), b = Vr + Math.min(g, Xo) / Xo * Gr;
    t.fillStyle = qt(t, e.color, b), t.fillRect(0, u, r, p), t.lineWidth = 1, t.strokeStyle = qt(t, e.color, 0.85), Vt(t, 0, ht(u, 1), r, ht(u, 1)), Vt(t, 0, ht(u + p, 1), r, ht(u + p, 1));
    const P = u + p / 2, w = `${g >= qr ? "★ " : ""}${g} ${g === 1 ? "touch" : "touches"}`;
    wt(t, 6, P, w, e.color, "left"), wt(t, r - 4, P, Gt(s.price, n.pricePrecision), e.color, "right"), i && le(t, o.timeToX(s.time), o.priceToY(s.price), e.color), t.restore();
  },
  hitTest(t, e, o, i) {
    const n = t.points[0];
    if (!n) return !1;
    const s = Math.max(en(t, "heightPct", Sn), 1e-4), [r, l] = Go(n.price, s), a = i.priceToY(l), c = i.priceToY(r);
    return o >= Math.min(a, c) - Tt && o <= Math.max(a, c) + Tt;
  }
}, It = 24, Jr = 0.35, Kr = 0.8;
function qo(t, e) {
  const o = t.points[0];
  if (!o) return null;
  const i = t.points[1] ?? o, n = e.timeToX(o.time), s = e.timeToX(i.time), r = e.priceToY(o.price), l = e.priceToY(i.price);
  return {
    left: Math.min(n, s),
    right: Math.max(n, s),
    top: Math.min(r, l),
    bottom: Math.max(r, l),
    tLo: Math.min(o.time, i.time),
    tHi: Math.max(o.time, i.time),
    pLo: Math.min(o.price, i.price),
    pHi: Math.max(o.price, i.price)
  };
}
function Pn(t) {
  return t < 0 ? 0 : t >= It ? It - 1 : t;
}
function Uo(t, e, o, i, n) {
  const s = new Float64Array(It);
  let r = 0;
  if (t.length > 0 && n > i) {
    const c = (n - i) / It, f = nn(t, e), h = nn(t, o + 1) - 1;
    for (let u = f; u <= h; u++) {
      const p = t[u];
      if (!(p.volume > 0)) continue;
      const g = Math.max(p.low, i), b = Math.min(p.high, n);
      if (b < g) continue;
      const P = p.high - p.low;
      if (P <= 0) {
        const R = Pn(Math.floor((p.close - i) / c));
        s[R] += p.volume, r += p.volume;
        continue;
      }
      const w = Pn(Math.floor((g - i) / c)), k = Pn(Math.ceil((b - i) / c) - 1);
      for (let R = w; R <= k; R++) {
        const L = i + R * c, E = Math.min(b, L + c) - Math.max(g, L);
        if (E > 0) {
          const C = p.volume * (E / P);
          s[R] += C, r += C;
        }
      }
    }
  }
  let l = 0, a = -1;
  for (let c = 0; c < It; c++)
    s[c] > l && (l = s[c], a = c);
  return { rows: s, max: l, pocIndex: a, total: r };
}
const Zr = {
  id: "volxray",
  label: "Volume X-Ray",
  group: "smart",
  pointsNeeded: 2,
  render(t, e, o, i, n) {
    const s = qo(e, o);
    if (!s) return;
    t.save();
    const r = s.right - s.left, l = s.bottom - s.top, a = Math.max(1, e.width);
    if (t.lineWidth = a, t.strokeStyle = e.color, t.strokeRect(s.left, s.top, r, l), !e.points[1]) {
      t.restore();
      return;
    }
    const c = Uo(n.candles, s.tLo, s.tHi, s.pLo, s.pHi);
    if (c.max > 0 && s.pHi > s.pLo) {
      const f = (s.pHi - s.pLo) / It;
      for (let p = 0; p < It; p++) {
        const g = c.rows[p];
        if (g <= 0) continue;
        const b = o.priceToY(s.pLo + (p + 1) * f), P = o.priceToY(s.pLo + p * f), w = Math.min(b, P), k = Math.max(Math.abs(P - b) - 1, 1), R = g / c.max * r;
        t.fillStyle = qt(t, e.color, p === c.pocIndex ? Kr : Jr), t.fillRect(s.left, w + 0.5, R, k);
      }
      const h = s.pLo + (c.pocIndex + 0.5) * f, u = ht(o.priceToY(h), 1);
      t.lineWidth = 1, t.strokeStyle = e.color, t.setLineDash([4, 3]), Vt(t, s.left, u, s.right, u), t.setLineDash([]), wt(t, s.right + 6, u, `POC ${Gt(h, n.pricePrecision)}`, e.color, "left");
    }
    if (c.total > 0 && wt(t, s.left + 4, s.bottom - 11, `Σ ${Ei(c.total)}`, Ri, "left"), i)
      for (const f of e.points)
        le(t, o.timeToX(f.time), o.priceToY(f.price), e.color);
    t.restore();
  },
  hitTest(t, e, o, i, n) {
    if (!t.points[0] || !t.points[1]) return !1;
    const s = qo(t, i);
    if (!s) return !1;
    const r = Math.max(Tt, t.width / 2 + 3);
    if (!(e >= s.left - r && e <= s.right + r && o >= s.top - r && o <= s.bottom + r)) return !1;
    if (!(e > s.left + r && e < s.right - r && o > s.top + r && o < s.bottom - r)) return !0;
    if (s.pHi <= s.pLo) return !1;
    const c = Uo(n.candles, s.tLo, s.tHi, s.pLo, s.pHi);
    if (c.max <= 0) return !1;
    const f = (s.pHi - s.pLo) / It, h = Math.floor((i.yToPrice(o) - s.pLo) / f);
    if (h < 0 || h >= It) return !1;
    const u = c.rows[h] / c.max * (s.right - s.left);
    return e <= s.left + u + r;
  }
}, Qr = 0.5, zr = 0.08;
function An(t, e) {
  const o = _i(t, e);
  if (o < 0) return null;
  const i = t.length - o, n = new Float64Array(i), s = new Float64Array(i);
  let r = 0, l = 0, a = 0, c = 0;
  for (let f = 0; f < i; f++) {
    const h = t[o + f], u = (h.high + h.low + h.close) / 3, p = h.volume > 0 ? h.volume : 0;
    if (r += u * p, l += u * u * p, a += p, c += u, a > 0) {
      const g = r / a;
      n[f] = g, s[f] = Math.sqrt(Math.max(0, l / a - g * g));
    } else
      n[f] = c / (f + 1), s[f] = 0;
  }
  return { start: o, n: i, vwap: n, sd: s };
}
function kn(t, e, o, i, n) {
  t.beginPath();
  for (let s = 0; s < i.n; s++) {
    const r = e.priceToY(i.vwap[s] + n * i.sd[s]);
    s === 0 ? t.moveTo(o[s], r) : t.lineTo(o[s], r);
  }
  t.stroke();
}
function xr(t, e, o, i) {
  t.strokeStyle = i, t.lineWidth = 1.5, t.beginPath(), t.moveTo(e + 0.5, o - 3), t.lineTo(e + 0.5, o - 16), t.stroke(), t.fillStyle = i, t.beginPath(), t.moveTo(e + 0.5, o - 16), t.lineTo(e + 10, o - 13), t.lineTo(e + 0.5, o - 10), t.closePath(), t.fill(), t.beginPath(), t.arc(e, o, 2.5, 0, Math.PI * 2), t.fill();
}
const tl = {
  id: "avwap",
  label: "Anchored VWAP",
  group: "smart",
  pointsNeeded: 1,
  render(t, e, o, i, n) {
    const s = e.points[0];
    if (!s || n.candles.length === 0) return;
    const r = An(n.candles, s.time);
    if (!r) return;
    t.save();
    const l = new Float64Array(r.n);
    for (let c = 0; c < r.n; c++) l[c] = o.timeToX(n.candles[r.start + c].time);
    if (r.n > 1) {
      t.beginPath();
      for (let c = 0; c < r.n; c++) {
        const f = o.priceToY(r.vwap[c] + r.sd[c]);
        c === 0 ? t.moveTo(l[c], f) : t.lineTo(l[c], f);
      }
      for (let c = r.n - 1; c >= 0; c--)
        t.lineTo(l[c], o.priceToY(r.vwap[c] - r.sd[c]));
      t.closePath(), t.fillStyle = qt(t, e.color, zr), t.fill(), t.lineJoin = "round", t.lineCap = "round", t.lineWidth = 1, t.strokeStyle = qt(t, e.color, Qr), kn(t, o, l, r, 1), kn(t, o, l, r, -1), t.lineWidth = Math.max(1, e.width) + 1, t.strokeStyle = e.color, kn(t, o, l, r, 0);
    } else
      t.fillStyle = e.color, t.beginPath(), t.arc(l[0], o.priceToY(r.vwap[0]), Math.max(1, e.width) + 1, 0, Math.PI * 2), t.fill();
    xr(t, l[0], o.priceToY(r.vwap[0]), e.color);
    const a = o.priceToY(r.vwap[r.n - 1]);
    wt(
      t,
      l[r.n - 1] + 8,
      a,
      `AVWAP ${Gt(r.vwap[r.n - 1], n.pricePrecision)}`,
      e.color,
      "left"
    ), i && le(t, l[0], o.priceToY(r.vwap[0]), e.color), t.restore();
  },
  hitTest(t, e, o, i, n) {
    const s = t.points[0];
    if (!s || n.candles.length === 0) return !1;
    const r = An(n.candles, s.time);
    if (!r) return !1;
    const l = n.candles, a = Tt + (Math.max(1, t.width) + 1) / 2, c = i.timeToX(l[r.start].time), f = i.timeToX(l[l.length - 1].time);
    if (e < c - a || e > f + a) return !1;
    if (r.n === 1) return Math.hypot(e - c, o - i.priceToY(r.vwap[0])) <= a;
    let h = _i(l, i.xToTime(e)) - r.start;
    h < 0 && (h = 0), h > r.n - 1 && (h = r.n - 1);
    const u = Math.max(0, h - 2), p = Math.min(r.n - 2, h + 1);
    for (let g = u; g <= p; g++) {
      const b = i.timeToX(l[r.start + g].time), P = i.timeToX(l[r.start + g + 1].time), w = i.priceToY(r.vwap[g]), k = i.priceToY(r.vwap[g + 1]);
      if ($r(e, o, b, w, P, k) <= a) return !0;
    }
    return !1;
  },
  handleAt(t, e, o, i, n) {
    const s = t.points[0];
    if (!s || n.candles.length === 0) return -1;
    const r = An(n.candles, s.time);
    if (!r) return -1;
    const l = i.timeToX(n.candles[r.start].time), a = i.priceToY(r.vwap[0]);
    return Math.abs(e - l) <= Xt && Math.abs(o - a) <= Xt ? 0 : -1;
  },
  moveHandle(t, e, o) {
    return e !== 0 ? t : { ...t, points: [{ time: o.time, price: o.price }] };
  }
}, el = [
  ...Xr,
  jr,
  Zr,
  tl
], nl = "#089981", ol = "#f23645", Di = 0.08, il = 0.06, sl = 0.07, rl = 0.05;
function ll(t, e) {
  const o = t.points[1];
  return !o || !(e > 0) ? 0 : Math.round(Math.abs(o.time - t.points[0].time) / e);
}
function al(t) {
  return t === 1 ? "1 bar" : `${t} bars`;
}
function cl(t, e) {
  if (!(Math.abs(t) > 0)) return null;
  const o = (e - t) / Math.abs(t) * 100;
  return isFinite(o) ? o : null;
}
function Wi(t, e) {
  return Math.atan2(-(e.y - t.y), e.x - t.x) * 180 / Math.PI;
}
function io(t, e, o, i, n, s, r = 0.5) {
  t.save(), t.setLineDash([4, 4]), t.strokeStyle = _(t, e, r), t.lineWidth = 1, $(t, o, i, n, s), t.restore();
}
function Ze(t, e, o, i, n, s, r) {
  let l = 1;
  return o !== 0 && (l = Math.max(l, (0 - t) / o, (n - t) / o)), i !== 0 && (l = Math.max(l, (0 - e) / i, (s - e) / i)), Math.min(l, r > 0 ? 1e6 / r : 1);
}
const fl = {
  id: "infoline",
  label: "Info Line",
  group: "lines",
  pointsNeeded: 2,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]), r = e.points[1];
    if (!r) {
      q(t, s.x, s.y, e.width), i && I(t, e, o);
      return;
    }
    const l = M(o, r), c = r.price >= e.points[0].price ? nl : ol;
    t.strokeStyle = c, t.lineWidth = Math.max(1, e.width), $(t, s.x, s.y, l.x, l.y);
    const f = r.price - e.points[0].price, h = cl(e.points[0].price, r.price), u = ll(e, n.barMs), p = Wi(s, l), b = `${h === null ? `Δ ${Le(f, n.pricePrecision)}` : `Δ ${Le(f, n.pricePrecision)}  ${Fe(h)}`}  ·  ${al(u)}  ·  ${p.toFixed(0)}°`;
    At(t, (s.x + l.x) / 2, (s.y + l.y) / 2, [b], c), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    if (!t.points[1]) return !1;
    const n = M(i, t.points[0]), s = M(i, t.points[1]);
    return rt(e, o, n.x, n.y, s.x, s.y, 0, 1) <= G(t);
  }
}, hl = {
  id: "crossline",
  label: "Cross Line",
  group: "lines",
  pointsNeeded: 1,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]), { w: r, h: l } = st(t), a = yt(s.x, t.lineWidth), c = yt(s.y, t.lineWidth);
    $(t, 0, c, r, c), $(t, a, 0, a, l);
    const f = vt(e.points[0].price, n.pricePrecision);
    Zo(t, Math.max(2, r - Qo(t, f) - 2), c, f, e.color);
    const h = xn(e.points[0].time, n.barMs), u = Qo(t, h);
    Zo(t, Math.max(2, Math.min(r - u - 2, a - u / 2)), l - 10, h, e.color), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = M(i, t.points[0]), s = G(t);
    return Math.abs(e - n.x) <= s || Math.abs(o - n.y) <= s;
  }
}, ul = {
  id: "trendangle",
  label: "Trend Angle",
  group: "lines",
  pointsNeeded: 2,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1];
    if (!s) {
      q(t, n.x, n.y, e.width), i && I(t, e, o);
      return;
    }
    const r = M(o, s);
    $(t, n.x, n.y, r.x, r.y);
    const l = r.x >= n.x ? 1 : -1, a = Math.min(34, Math.max(16, Math.hypot(r.x - n.x, r.y - n.y) * 0.45));
    io(t, e.color, n.x, n.y, n.x + l * a, n.y, 0.5);
    const c = Math.atan2(r.y - n.y, r.x - n.x), f = l > 0 ? 0 : Math.PI;
    t.save(), t.beginPath(), t.strokeStyle = _(t, e.color, 0.7), t.lineWidth = 1, t.setLineDash([]);
    const h = l > 0 ? c < f : c > f;
    t.arc(n.x, n.y, a, f, c, h), t.stroke(), t.restore();
    const u = Wi(n, r), p = (f + c) / 2, g = n.x + Math.cos(p) * (a + 12), b = n.y + Math.sin(p) * (a + 12);
    At(t, g, b, [`${u.toFixed(0)}°`], e.color, di), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    if (!t.points[1]) return !1;
    const n = M(i, t.points[0]), s = M(i, t.points[1]);
    return rt(e, o, n.x, n.y, s.x, s.y, 0, 1) <= G(t);
  }
}, pl = {
  id: "channeldisjoint",
  label: "Disjoint Channel",
  group: "channels",
  pointsNeeded: 4,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1];
    if (!s) {
      q(t, n.x, n.y, e.width), i && I(t, e, o);
      return;
    }
    const r = M(o, s), l = e.points[2], a = e.points[3];
    if (l && a) {
      const c = M(o, l), f = M(o, a);
      t.fillStyle = _(t, e.color, Di), t.beginPath(), t.moveTo(n.x, n.y), t.lineTo(r.x, r.y), t.lineTo(f.x, f.y), t.lineTo(c.x, c.y), t.closePath(), t.fill(), $(t, c.x, c.y, f.x, f.y);
    } else if (l) {
      const c = M(o, l);
      q(t, c.x, c.y, e.width);
    }
    $(t, n.x, n.y, r.x, r.y), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    if (!t.points[3]) return !1;
    const n = M(i, t.points[0]), s = M(i, t.points[1]), r = M(i, t.points[2]), l = M(i, t.points[3]), a = G(t);
    return Q(e, o, n, s) <= a || Q(e, o, r, l) <= a ? !0 : Jt(e, o, [n, s, l, r]);
  }
}, ml = {
  id: "channelflat",
  label: "Flat Channel",
  group: "channels",
  pointsNeeded: 3,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1];
    if (!s) {
      q(t, n.x, n.y, e.width), i && I(t, e, o);
      return;
    }
    const r = M(o, s), l = e.points[2];
    if (l) {
      const a = o.priceToY(l.price), c = { x: n.x, y: a }, f = { x: r.x, y: a };
      t.fillStyle = _(t, e.color, Di), t.beginPath(), t.moveTo(n.x, n.y), t.lineTo(r.x, r.y), t.lineTo(f.x, f.y), t.lineTo(c.x, c.y), t.closePath(), t.fill(), $(t, c.x, c.y, f.x, f.y);
    }
    $(t, n.x, n.y, r.x, r.y), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    if (!t.points[2]) return !1;
    const n = M(i, t.points[0]), s = M(i, t.points[1]), r = i.priceToY(t.points[2].price), l = { x: n.x, y: r }, a = { x: s.x, y: r }, c = G(t);
    return Q(e, o, n, s) <= c || Q(e, o, l, a) <= c ? !0 : Jt(e, o, [n, s, a, l]);
  }
};
function jo(t, e) {
  let o = 0, i = t.length;
  for (; o < i; ) {
    const n = o + i >> 1;
    t[n].time < e ? o = n + 1 : i = n;
  }
  return o;
}
function Jo(t, e) {
  const { candles: o } = e;
  if (o.length < 2 || !t.points[1]) return null;
  const i = Math.min(t.points[0].time, t.points[1].time), n = Math.max(t.points[0].time, t.points[1].time);
  let s = jo(o, i), r = jo(o, n);
  r >= o.length && (r = o.length - 1), s > r && (s = r);
  const l = r - s + 1;
  if (l < 2) return null;
  let a = 0, c = 0, f = 0, h = 0;
  for (let w = s; w <= r; w++) {
    const k = w - s, R = o[w].close;
    a += k, c += R, f += k * k, h += k * R;
  }
  const u = l * f - a * a;
  if (Math.abs(u) < 1e-12) return null;
  const p = (l * h - a * c) / u, g = (c - p * a) / l;
  let b = 0;
  for (let w = s; w <= r; w++) {
    const k = w - s, R = o[w].close - (g + p * k);
    b += R * R;
  }
  const P = Math.sqrt(b / l);
  return { i0: s, i1: r, slope: p, intercept: g, sigma: P };
}
const gl = {
  id: "regression",
  label: "Regression Channel",
  group: "channels",
  pointsNeeded: 2,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]), r = e.points[1];
    if (!r) {
      q(t, s.x, s.y, e.width), i && I(t, e, o);
      return;
    }
    const l = M(o, r), a = Jo(e, n);
    if (!a) {
      io(t, e.color, s.x, s.y, l.x, l.y, 0.6), i && I(t, e, o);
      return;
    }
    const { candles: c } = n, { i0: f, i1: h, slope: u, intercept: p, sigma: g } = a, b = (J) => p + u * J, P = o.timeToX(c[f].time), w = o.timeToX(c[h].time), k = h - f, R = o.priceToY(b(0)), L = o.priceToY(b(k)), E = 2 * g, C = o.priceToY(b(0) + E), Y = o.priceToY(b(k) + E), H = o.priceToY(b(0) - E), j = o.priceToY(b(k) - E);
    t.fillStyle = _(t, e.color, sl), t.beginPath(), t.moveTo(P, C), t.lineTo(w, Y), t.lineTo(w, j), t.lineTo(P, H), t.closePath(), t.fill(), t.save(), t.strokeStyle = _(t, e.color, 0.6), t.lineWidth = 1, $(t, P, C, w, Y), $(t, P, H, w, j), t.restore(), t.strokeStyle = e.color, t.lineWidth = Math.max(1, e.width), $(t, P, R, w, L);
    const K = `${Le(u, n.pricePrecision)}/bar`;
    At(t, w + 4 + yl(t, K), L, [K], e.color, et), i && I(t, e, o);
  },
  hitTest(t, e, o, i, n) {
    if (!t.points[1]) return !1;
    const s = Jo(t, n);
    if (!s) return !1;
    const { candles: r } = n, { i0: l, i1: a, slope: c, intercept: f, sigma: h } = s, u = (L) => f + c * L, p = i.timeToX(r[l].time), g = i.timeToX(r[a].time), b = a - l, P = G(t);
    if (e < Math.min(p, g) - P || e > Math.max(p, g) + P) return !1;
    const w = [
      { x: p, y: i.priceToY(u(0) + 2 * h) },
      { x: g, y: i.priceToY(u(b) + 2 * h) }
    ], k = [
      { x: p, y: i.priceToY(u(0) - 2 * h) },
      { x: g, y: i.priceToY(u(b) - 2 * h) }
    ], R = [
      { x: p, y: i.priceToY(u(0)) },
      { x: g, y: i.priceToY(u(b)) }
    ];
    return Q(e, o, w[0], w[1]) <= P || Q(e, o, k[0], k[1]) <= P || Q(e, o, R[0], R[1]) <= P ? !0 : Jt(e, o, [w[0], w[1], k[1], k[0]]);
  }
};
function yl(t, e) {
  return t.font = et, (t.measureText(e).width + 16) / 2;
}
function so(t, e, o, i, n) {
  const { origin: s, b: r, c: l, target: a } = i, c = a.x - s.x, f = a.y - s.y, h = Math.hypot(c, f), { w: u, h: p } = st(t);
  if (h < 1e-6) {
    $(t, r.x, r.y, l.x, l.y), n && I(t, e, o);
    return;
  }
  const g = Ze(s.x, s.y, c, f, u, p, h), b = Ze(r.x, r.y, c, f, u, p, h), P = Ze(l.x, l.y, c, f, u, p, h), w = { x: r.x + c * b, y: r.y + f * b }, k = { x: l.x + c * P, y: l.y + f * P };
  t.fillStyle = _(t, e.color, il), t.beginPath(), t.moveTo(r.x, r.y), t.lineTo(w.x, w.y), t.lineTo(k.x, k.y), t.lineTo(l.x, l.y), t.closePath(), t.fill(), t.save(), t.strokeStyle = _(t, e.color, 0.85), t.lineWidth = Math.max(1, e.width), $(t, r.x, r.y, w.x, w.y), $(t, l.x, l.y, k.x, k.y), t.restore(), io(t, e.color, r.x, r.y, l.x, l.y, 0.5), t.strokeStyle = e.color, t.lineWidth = Math.max(1, e.width), $(t, s.x, s.y, s.x + c * g, s.y + f * g), n && I(t, e, o);
}
function ro(t, e, o, i, n) {
  const { origin: s, b: r, c: l, target: a } = n, c = a.x - s.x, f = a.y - s.y, h = G(t);
  if (Math.hypot(c, f) < 1e-6) return Q(e, o, r, l) <= h;
  const u = Number.POSITIVE_INFINITY;
  return rt(e, o, s.x, s.y, s.x + c, s.y + f, 0, u) <= h || rt(e, o, r.x, r.y, r.x + c, r.y + f, 0, u) <= h || rt(e, o, l.x, l.y, l.x + c, l.y + f, 0, u) <= h || Q(e, o, r, l) <= h;
}
function St(t, e) {
  return { x: (t.x + e.x) / 2, y: (t.y + e.y) / 2 };
}
function je(t, e, o) {
  return { x: t.x + (e.x - t.x) * o, y: t.y + (e.y - t.y) * o };
}
function he(t, e) {
  return !t.points[1] || !t.points[2] ? null : { a: M(e, t.points[0]), b: M(e, t.points[1]), c: M(e, t.points[2]) };
}
function lo(t, e, o, i) {
  const n = M(o, e.points[0]), s = e.points[1];
  if (!s)
    return q(t, n.x, n.y, e.width), i && I(t, e, o), !0;
  if (!e.points[2]) {
    const r = M(o, s);
    return $(t, n.x, n.y, r.x, r.y), i && I(t, e, o), !0;
  }
  return !1;
}
const bl = {
  id: "pitchforkschiff",
  label: "Schiff Pitchfork",
  group: "channels",
  pointsNeeded: 3,
  render(t, e, o, i) {
    if (lo(t, e, o, i)) return;
    const { a: n, b: s, c: r } = he(e, o);
    so(t, e, o, { origin: St(n, s), b: s, c: r, target: St(s, r) }, i);
  },
  hitTest(t, e, o, i) {
    const n = he(t, i);
    return n ? ro(t, e, o, i, {
      origin: St(n.a, n.b),
      b: n.b,
      c: n.c,
      target: St(n.b, n.c)
    }) : !1;
  }
}, dl = {
  id: "pitchforkmod",
  label: "Modified Schiff Pitchfork",
  group: "channels",
  pointsNeeded: 3,
  render(t, e, o, i) {
    if (lo(t, e, o, i)) return;
    const { a: n, b: s, c: r } = he(e, o), l = St(s, r);
    so(t, e, o, { origin: St(n, l), b: s, c: r, target: l }, i);
  },
  hitTest(t, e, o, i) {
    const n = he(t, i);
    if (!n) return !1;
    const s = St(n.b, n.c);
    return ro(t, e, o, i, { origin: St(n.a, s), b: n.b, c: n.c, target: s });
  }
}, Tl = {
  id: "pitchforkinside",
  label: "Inside Pitchfork",
  group: "channels",
  pointsNeeded: 3,
  render(t, e, o, i) {
    if (lo(t, e, o, i)) return;
    const { a: n, b: s, c: r } = he(e, o);
    so(
      t,
      e,
      o,
      { origin: n, b: je(s, r, 0.25), c: je(s, r, 0.75), target: St(s, r) },
      i
    );
  },
  hitTest(t, e, o, i) {
    const n = he(t, i);
    return n ? ro(t, e, o, i, {
      origin: n.a,
      b: je(n.b, n.c, 0.25),
      c: je(n.b, n.c, 0.75),
      target: St(n.b, n.c)
    }) : !1;
  }
}, Ln = [
  { label: "8x1", mult: 8 },
  { label: "4x1", mult: 4 },
  { label: "2x1", mult: 2 },
  { label: "1x1", mult: 1 },
  { label: "1x2", mult: 1 / 2 },
  { label: "1x4", mult: 1 / 4 },
  { label: "1x8", mult: 1 / 8 }
], Ko = [
  "#9c27b0",
  "#f23645",
  "#ff9800",
  "#089981",
  "#00bcd4",
  "#3f7bd8",
  "#787b86"
], Ml = {
  id: "gannfan",
  label: "Gann Fan",
  group: "channels",
  pointsNeeded: 2,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1];
    if (!s) {
      q(t, n.x, n.y, e.width), i && I(t, e, o);
      return;
    }
    const r = M(o, s), { w: l, h: a } = st(t), c = r.x - n.x, f = r.y - n.y;
    if (Math.abs(c) < 1e-6 && Math.abs(f) < 1e-6) {
      q(t, n.x, n.y, e.width), i && I(t, e, o);
      return;
    }
    t.save(), t.lineWidth = 1, t.font = et, t.textBaseline = "middle";
    for (let h = 0; h < Ln.length; h++) {
      const u = Ln[h], p = c, g = f * u.mult, b = Math.hypot(p, g);
      if (b < 1e-6) continue;
      const P = Ze(n.x, n.y, p, g, l, a, b), w = n.x + p * P, k = n.y + g * P, R = u.mult === 1;
      t.strokeStyle = R ? e.color : _(t, Ko[h], 0.85), $(t, n.x, n.y, w, k);
      const L = Math.min(P, 0.42 * Math.min(l, a) / b), E = n.x + p * L, C = n.y + g * L;
      E > 2 && E < l - 24 && C > 8 && C < a - 8 && (t.fillStyle = _(t, R ? e.color : Ko[h], 0.8), t.textAlign = p >= 0 ? "left" : "right", t.fillText(u.label, E + (p >= 0 ? 3 : -3), C - 6));
    }
    t.restore(), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    if (!t.points[1]) return !1;
    const n = M(i, t.points[0]), s = M(i, t.points[1]), r = s.x - n.x, l = s.y - n.y, a = G(t), c = Number.POSITIVE_INFINITY;
    for (const f of Ln) {
      const h = r, u = l * f.mult;
      if (!(Math.hypot(h, u) < 1e-6) && rt(e, o, n.x, n.y, n.x + h, n.y + u, 0, c) <= a)
        return !0;
    }
    return !1;
  }
}, wl = [0, 0.25, 0.382, 0.5, 0.618, 0.75, 1], Sl = {
  id: "gannbox",
  label: "Gann Box",
  group: "channels",
  pointsNeeded: 2,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1];
    if (!s) {
      q(t, n.x, n.y, e.width), i && I(t, e, o);
      return;
    }
    const r = M(o, s), l = Math.min(n.x, r.x), a = Math.max(n.x, r.x), c = Math.min(n.y, r.y), f = Math.max(n.y, r.y), h = a - l, u = f - c;
    t.fillStyle = _(t, e.color, rl), t.fillRect(l, c, h, u), t.save(), t.lineWidth = 1, t.strokeStyle = _(t, e.color, 0.4), t.font = et, t.fillStyle = _(t, e.color, 0.7), t.textBaseline = "top";
    for (const p of wl) {
      if (p === 0 || p === 1) continue;
      const g = l + h * p, b = c + u * p;
      $(t, g, c, g, f), $(t, l, b, a, b);
    }
    t.strokeStyle = _(t, e.color, 0.55), $(t, l, c, a, f), $(t, l, f, a, c), t.restore(), t.strokeStyle = e.color, t.lineWidth = Math.max(1, e.width), t.strokeRect(l, c, h, u), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    return t.points[1] ? Dt(e, o, M(i, t.points[0]), M(i, t.points[1]), G(t)) : !1;
  }
};
function Zo(t, e, o, i, n) {
  t.font = et;
  const s = 4, r = t.measureText(i).width + s * 2, l = 15;
  Pt(t, e, o - l / 2, r, l, 3), t.fillStyle = n, t.fill(), t.fillStyle = Ce(t, n), t.textAlign = "left", t.textBaseline = "middle", t.fillText(i, e + s, o + 0.5);
}
function Qo(t, e) {
  return t.font = et, t.measureText(e).width + 8;
}
const Pl = [
  // LINES group
  fl,
  hl,
  ul,
  // CHANNELS group
  pl,
  ml,
  gl,
  bl,
  dl,
  Tl,
  Ml,
  Sl
], $i = 0.07, pe = 0.85, Al = 0.55, Yi = /* @__PURE__ */ new Set([0.382, 0.5, 0.618]);
function ae(t, e, o, i) {
  t.save(), t.setLineDash([4, 4]), t.strokeStyle = _(t, e, Al), t.lineWidth = 1, $(t, o.x, o.y, i.x, i.y), t.restore();
}
const kl = {
  id: "fibtimezone",
  label: "Fib Time Zone",
  group: "fib",
  pointsNeeded: 2,
  render(t, e, o, i) {
    const n = M(o, e.points[0]);
    if (!e.points[1]) {
      q(t, n.x, n.y, e.width), i && I(t, e, o);
      return;
    }
    const r = e.points[1].time - e.points[0].time, { w: l, h: a } = st(t), c = Math.max(1, e.width);
    t.lineWidth = c, t.font = et, t.textAlign = "center", t.textBaseline = "bottom";
    for (const f of tt(e, "fibtimezone")) {
      if (!f.visible) continue;
      const h = f.ratio, u = yt(o.timeToX(e.points[0].time + r * h), c);
      if (u < -2 || u > l + 2) continue;
      const p = h === 0 || h === 1;
      t.strokeStyle = _(t, f.color ?? e.color, p ? pe : 0.6), $(t, u, 0, u, a), t.fillStyle = _(t, f.color ?? e.color, 0.95), t.fillText(f.label ?? String(h), u, a - 4);
    }
    i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    if (!t.points[1]) return !1;
    const n = t.points[1].time - t.points[0].time, s = G(t);
    for (const r of tt(t, "fibtimezone"))
      if (r.visible && Math.abs(e - i.timeToX(t.points[0].time + n * r.ratio)) <= s)
        return !0;
    return !1;
  }
}, Ll = {
  id: "fibfan",
  label: "Fib Speed Fan",
  group: "fib",
  pointsNeeded: 2,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1];
    if (!s) {
      q(t, n.x, n.y, e.width), i && I(t, e, o);
      return;
    }
    const r = M(o, s), { w: l, h: a } = st(t), c = r.x - n.x, f = r.y - n.y;
    t.font = et, t.textAlign = "left", t.textBaseline = "middle", t.lineWidth = Math.max(1, e.width);
    for (const h of tt(e, "fibfan")) {
      if (!h.visible) continue;
      const u = h.ratio, p = n.y + f * u, g = n.x + c, b = ln(n.x, n.y, g, p, l, a, !1);
      b && (t.strokeStyle = _(t, h.color ?? e.color, pe), $(t, b[0], b[1], b[2], b[3]), (h.label ?? Yi.has(u)) && (t.fillStyle = _(t, h.color ?? e.color, 0.95), t.fillText(h.label ?? String(u), g + 4, p)));
    }
    ae(t, e.color, n, r), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    if (!t.points[1]) return !1;
    const n = M(i, t.points[0]), s = M(i, t.points[1]), r = s.x - n.x, l = s.y - n.y, a = G(t), c = Number.POSITIVE_INFINITY;
    for (const f of tt(t, "fibfan")) {
      if (!f.visible) continue;
      const h = n.y + l * f.ratio, u = n.x + r;
      if (Il(e, o, n.x, n.y, u, h, a, c)) return !0;
    }
    return !1;
  }
};
function Il(t, e, o, i, n, s, r, l) {
  const a = n - o, c = s - i, f = a * a + c * c;
  let h = f === 0 ? 0 : ((t - o) * a + (e - i) * c) / f;
  return h = Math.max(0, Math.min(l, h)), Math.hypot(t - (o + h * a), e - (i + h * c)) <= r;
}
function zo(t, e, o) {
  if (Math.abs(e.x - t.x) > 1e-9) {
    const i = (o.x - t.x) / (e.x - t.x), n = t.y + i * (e.y - t.y);
    return { x: 0, y: o.y - n };
  }
  return { x: o.x - t.x, y: 0 };
}
const Nl = {
  id: "fibchannel",
  label: "Fib Channel",
  group: "fib",
  pointsNeeded: 3,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]), r = e.points[1];
    if (!r) {
      q(t, s.x, s.y, e.width), i && I(t, e, o);
      return;
    }
    const l = M(o, r), a = e.points[2];
    if (!a) {
      $(t, s.x, s.y, l.x, l.y), i && I(t, e, o);
      return;
    }
    const c = zo(s, l, M(o, a)), f = Math.max(1, e.width), h = tt(e, "fibchannel");
    for (let u = 0; u < h.length - 1; u++) {
      if (!h[u].visible || !h[u + 1].visible) continue;
      const p = h[u].ratio, g = h[u + 1].ratio;
      t.fillStyle = _(t, h[u + 1].color ?? e.color, $i), t.beginPath(), t.moveTo(s.x + c.x * p, s.y + c.y * p), t.lineTo(l.x + c.x * p, l.y + c.y * p), t.lineTo(l.x + c.x * g, l.y + c.y * g), t.lineTo(s.x + c.x * g, s.y + c.y * g), t.closePath(), t.fill();
    }
    t.font = et, t.textAlign = "left", t.textBaseline = "bottom", t.lineWidth = f;
    for (const u of h) {
      if (!u.visible) continue;
      const p = u.ratio, g = { x: s.x + c.x * p, y: s.y + c.y * p }, b = { x: l.x + c.x * p, y: l.y + c.y * p }, P = p === 0 || p === 1;
      t.strokeStyle = _(t, u.color ?? e.color, P ? pe : 0.6), $(t, g.x, g.y, b.x, b.y);
      const w = e.points[0].price + (e.points[2].price - e.points[0].price) * p;
      t.fillStyle = _(t, u.color ?? e.color, 0.95), t.fillText(`${u.label ?? p} — ${vt(w, n.pricePrecision)}`, b.x + 4, b.y - 2);
    }
    i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    if (!t.points[1] || !t.points[2]) return !1;
    const n = M(i, t.points[0]), s = M(i, t.points[1]), r = zo(n, s, M(i, t.points[2])), l = G(t);
    for (const a of tt(t, "fibchannel")) {
      if (!a.visible) continue;
      const c = { x: n.x + r.x * a.ratio, y: n.y + r.y * a.ratio }, f = { x: s.x + r.x * a.ratio, y: s.y + r.y * a.ratio };
      if (Cl(e, o, c, f) <= l) return !0;
    }
    return !1;
  }
};
function Cl(t, e, o, i) {
  const n = i.x - o.x, s = i.y - o.y, r = n * n + s * s;
  let l = r === 0 ? 0 : ((t - o.x) * n + (e - o.y) * s) / r;
  return l = Math.max(0, Math.min(1, l)), Math.hypot(t - (o.x + l * n), e - (o.y + l * s));
}
const Fl = {
  id: "fibcircle",
  label: "Fib Circle",
  group: "fib",
  pointsNeeded: 2,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]), r = e.points[1];
    if (!r) {
      q(t, s.x, s.y, e.width), i && I(t, e, o);
      return;
    }
    const l = M(o, r), a = Math.hypot(l.x - s.x, l.y - s.y), c = Math.max(1, e.width);
    t.lineWidth = c, t.font = et, t.textAlign = "center", t.textBaseline = "bottom";
    const f = tt(e, "fibcircle");
    for (let h = f.length - 1; h >= 0; h--) {
      const u = f[h];
      if (!u.visible || u.ratio <= 0) continue;
      const p = a * u.ratio;
      p < 0.5 || (t.beginPath(), t.ellipse(s.x, s.y, p, p, 0, 0, Math.PI * 2), t.fillStyle = _(t, u.color ?? e.color, $i), t.fill());
    }
    for (const h of f) {
      if (!h.visible || h.ratio <= 0) continue;
      const u = a * h.ratio;
      u < 0.5 || (t.beginPath(), t.ellipse(s.x, s.y, u, u, 0, 0, Math.PI * 2), t.strokeStyle = _(t, h.color ?? e.color, h.ratio === 1 ? pe : 0.6), t.stroke(), t.fillStyle = _(t, h.color ?? e.color, 0.95), t.fillText(h.label ?? String(h.ratio), s.x, s.y - u - 2));
    }
    ae(t, e.color, s, l), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    if (!t.points[1]) return !1;
    const n = M(i, t.points[0]), s = M(i, t.points[1]), r = Math.hypot(s.x - n.x, s.y - n.y), l = Math.hypot(e - n.x, o - n.y), a = G(t);
    for (const c of tt(t, "fibcircle"))
      if (!(!c.visible || c.ratio <= 0) && Math.abs(l - r * c.ratio) <= a)
        return !0;
    return !1;
  }
}, Rl = {
  id: "fibtimeext",
  label: "Fib Time Extension",
  group: "fib",
  pointsNeeded: 3,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1];
    if (!s) {
      q(t, n.x, n.y, e.width), i && I(t, e, o);
      return;
    }
    const r = M(o, s), l = e.points[2];
    if (!l) {
      ae(t, e.color, n, r), i && I(t, e, o);
      return;
    }
    const a = M(o, l), c = e.points[1].time - e.points[0].time, { w: f, h } = st(t), u = Math.max(1, e.width);
    ae(t, e.color, n, r), ae(t, e.color, r, a), t.lineWidth = u, t.font = et, t.textAlign = "center", t.textBaseline = "bottom";
    for (const p of tt(e, "fibtimeext")) {
      if (!p.visible) continue;
      const g = p.ratio, b = yt(o.timeToX(e.points[2].time + c * g), u);
      b < -2 || b > f + 2 || (t.strokeStyle = _(t, p.color ?? e.color, g === 0 || g === 1 ? pe : 0.6), $(t, b, 0, b, h), t.fillStyle = _(t, p.color ?? e.color, 0.95), t.fillText(p.label ?? String(g), b, h - 4));
    }
    i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    if (!t.points[1] || !t.points[2]) return !1;
    const n = t.points[1].time - t.points[0].time, s = G(t);
    for (const r of tt(t, "fibtimeext"))
      if (r.visible && Math.abs(e - i.timeToX(t.points[2].time + n * r.ratio)) <= s)
        return !0;
    return !1;
  }
}, vl = {
  id: "fibwedge",
  label: "Fib Wedge",
  group: "fib",
  pointsNeeded: 2,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1];
    if (!s) {
      q(t, n.x, n.y, e.width), i && I(t, e, o);
      return;
    }
    const r = M(o, s), l = Math.hypot(r.x - n.x, r.y - n.y), a = Math.atan2(r.y - n.y, r.x - n.x), c = a - Math.PI / 2, f = a + Math.PI / 2, h = Math.max(1, e.width);
    t.lineWidth = h, t.font = et, t.textAlign = "center", t.textBaseline = "middle";
    for (const u of tt(e, "fibwedge")) {
      if (!u.visible) continue;
      const p = u.ratio, g = l * p;
      if (!(g < 0.5) && (t.beginPath(), t.ellipse(n.x, n.y, g, g, 0, c, f), t.strokeStyle = _(t, u.color ?? e.color, p === 1 ? pe : 0.6), t.stroke(), u.label ?? Yi.has(p))) {
        const b = n.x + Math.cos(a) * g, P = n.y + Math.sin(a) * g;
        t.fillStyle = _(t, u.color ?? e.color, 0.95), t.fillText(u.label ?? String(p), b, P);
      }
    }
    ae(t, e.color, n, r), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    if (!t.points[1]) return !1;
    const n = M(i, t.points[0]), s = M(i, t.points[1]), r = Math.hypot(s.x - n.x, s.y - n.y), l = Math.atan2(s.y - n.y, s.x - n.x), a = Math.atan2(o - n.y, e - n.x);
    let c = Math.abs(a - l);
    if (c > Math.PI && (c = Math.PI * 2 - c), c > Math.PI / 2) return !1;
    const f = Math.hypot(e - n.x, o - n.y), h = G(t);
    for (const u of tt(t, "fibwedge"))
      if (u.visible && Math.abs(f - r * u.ratio) <= h)
        return !0;
    return !1;
  }
}, El = [
  kl,
  Ll,
  Nl,
  Fl,
  Rl,
  vl
], Oi = 0.08, xo = 14;
function Bi(t, e) {
  if (!(e.length < 2)) {
    t.lineJoin = "round", t.lineCap = "round", t.beginPath(), t.moveTo(e[0].x, e[0].y);
    for (let o = 1; o < e.length; o++) t.lineTo(e[o].x, e[o].y);
    t.stroke();
  }
}
function on(t, e, o) {
  t.fillStyle = e.color;
  for (const i of o) t.fillRect(i.x - 2.5, i.y - 2.5, 5, 5);
}
function Hi(t, e, o, i, n) {
  t.font = et;
  const r = t.measureText(i).width + 4 * 2, l = 14;
  Pt(t, e - r / 2, o - l / 2, r, l, 3), t.fillStyle = n, t.fill(), t.fillStyle = Ce(t, n), t.textAlign = "center", t.textBaseline = "middle", t.fillText(i, e, o + 0.5);
}
function Et(t, e, o, i, n) {
  const s = Math.hypot(o.x, o.y) || 1;
  Hi(t, e.x + o.x / s * xo, e.y + o.y / s * xo, i, n);
}
function me(t) {
  let e = 0, o = 0;
  for (const i of t)
    e += i.x, o += i.y;
  return { x: e / t.length, y: o / t.length };
}
function _t(t, e) {
  const o = t.x - e.x, i = t.y - e.y;
  return Math.hypot(o, i) < 1 ? { x: 0, y: -1 } : { x: o, y: i };
}
function In(t, e, o, i, n) {
  t.fillStyle = _(t, n, Oi), t.beginPath(), t.moveTo(e.x, e.y), t.lineTo(o.x, o.y), t.lineTo(i.x, i.y), t.closePath(), t.fill();
}
function Pe(t, e, o, i, n) {
  Hi(t, (e.x + o.x) / 2, (e.y + o.y) / 2, i, n);
}
function Mt(t, e, o) {
  const i = t.points[e], n = t.points[o];
  return !i || !n ? 0 : Math.abs(n.price - i.price);
}
function Ae(t, e) {
  return e > 1e-12 ? (t / e).toFixed(3) : "—";
}
function Kt(t, e, o, i) {
  if (t.points.length < 2) return !1;
  const n = gt(t, i), s = G(t);
  for (let r = 0; r < n.length - 1; r++)
    if (Q(e, o, n[r], n[r + 1]) <= s) return !0;
  return !1;
}
function Re(t, e, o, i = !0) {
  const n = gt(e, o);
  return n.length === 1 ? (q(t, n[0].x, n[0].y, e.width), n) : (i && Bi(t, n), on(t, e, n), n);
}
function Xi(t, e, o) {
  var n;
  const i = (n = t.props) == null ? void 0 : n[e];
  return typeof i == "boolean" ? i : o;
}
function Vi(t, e) {
  var i;
  const o = (i = t.props) == null ? void 0 : i[e];
  return typeof o == "string" ? o : "";
}
const _l = {
  id: "abcd",
  label: "ABCD Pattern",
  group: "patterns",
  pointsNeeded: 4,
  render(t, e, o, i) {
    const n = Re(t, e, o), s = ["A", "B", "C", "D"], r = me(n);
    for (let l = 0; l < n.length; l++)
      Et(t, n[l], _t(n[l], r), s[l], e.color);
    n.length >= 3 && Pe(t, n[1], n[2], Ae(Mt(e, 1, 2), Mt(e, 0, 1)), e.color), n.length >= 4 && Pe(t, n[2], n[3], `CD ${Ae(Mt(e, 2, 3), Mt(e, 0, 1))}`, e.color), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    return t.points.length < 4 ? !1 : Kt(t, e, o, i);
  }
};
function Gi(t, e, o, i, n) {
  const s = gt(e, o);
  if (s.length === 1) {
    q(t, s[0].x, s[0].y, e.width), i && I(t, e, o);
    return;
  }
  s.length >= 4 && In(t, s[1], s[2], s[3], e.color), s.length >= 3 && In(t, s[0], s[1], s[2], e.color), s.length >= 5 && In(t, s[2], s[3], s[4], e.color), Bi(t, s), on(t, e, s);
  const r = ["X", "A", "B", "C", "D"], l = me(s);
  for (let a = 0; a < s.length; a++)
    Et(t, s[a], _t(s[a], l), r[a], e.color);
  if (s.length >= 3 && Pe(t, s[1], s[2], Ae(Mt(e, 1, 2), Mt(e, 0, 1)), e.color), s.length >= 4 && Pe(t, s[2], s[3], Ae(Mt(e, 2, 3), Mt(e, 1, 2)), e.color), s.length >= 5) {
    const a = Ae(Mt(e, 3, 4), Mt(e, 2, 3));
    Pe(t, s[3], s[4], n ? `${a} ${n}` : a, e.color);
  }
  i && I(t, e, o);
}
const Dl = {
  id: "xabcd",
  label: "XABCD Pattern",
  group: "patterns",
  pointsNeeded: 5,
  render(t, e, o, i) {
    Gi(t, e, o, i, "");
  },
  hitTest(t, e, o, i) {
    return t.points.length < 5 ? !1 : Kt(t, e, o, i);
  }
}, Wl = {
  id: "cypher",
  label: "Cypher Pattern",
  group: "patterns",
  pointsNeeded: 5,
  render(t, e, o, i) {
    Gi(t, e, o, i, "Cypher 0.786");
  },
  hitTest(t, e, o, i) {
    return t.points.length < 5 ? !1 : Kt(t, e, o, i);
  }
}, $l = {
  id: "headshoulders",
  label: "Head & Shoulders",
  group: "patterns",
  pointsNeeded: 7,
  render(t, e, o, i) {
    const n = Re(t, e, o);
    if (n.length >= 5) {
      const l = n[2], a = n[4], { w: c, h: f } = st(t), h = ln(l.x, l.y, a.x, a.y, c, f, !0);
      h && (t.save(), t.setLineDash([5, 4]), t.strokeStyle = _(t, e.color, 0.6), t.lineWidth = Math.max(1, e.width), $(t, h[0], h[1], h[2], h[3]), t.restore());
    }
    const s = me(n), r = [
      [1, "LS"],
      [3, "H"],
      [5, "RS"]
    ];
    for (const [l, a] of r) {
      const c = n[l];
      if (c) {
        const f = _t(c, s);
        Et(t, c, { x: f.x, y: -Math.abs(f.y) - 0.5 }, a, e.color);
      }
    }
    i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    return t.points.length < 7 ? !1 : Kt(t, e, o, i);
  }
}, Yl = {
  id: "threedrives",
  label: "Three Drives",
  group: "patterns",
  pointsNeeded: 7,
  render(t, e, o, i) {
    const n = Re(t, e, o), s = me(n), r = {
      1: "1",
      2: "A",
      3: "2",
      4: "B",
      5: "3"
    };
    for (let l = 0; l < n.length; l++) {
      const a = r[l];
      a && Et(t, n[l], _t(n[l], s), a, e.color);
    }
    i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    return t.points.length < 7 ? !1 : Kt(t, e, o, i);
  }
}, Ol = {
  id: "elliottimpulse",
  label: "Elliott Impulse",
  group: "patterns",
  pointsNeeded: 6,
  defaultProps: { showConnector: !0, waveDegree: "" },
  render(t, e, o, i) {
    const n = Re(t, e, o, Xi(e, "showConnector", !0)), s = me(n);
    for (let l = 1; l < n.length; l++)
      Et(t, n[l], _t(n[l], s), String(l), e.color);
    const r = Vi(e, "waveDegree");
    r && n.length >= 1 && Et(t, n[0], _t(n[0], s), r, e.color), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    return t.points.length < 6 ? !1 : Kt(t, e, o, i);
  }
}, Bl = {
  id: "elliottcorrection",
  label: "Elliott Correction",
  group: "patterns",
  pointsNeeded: 4,
  defaultProps: { showConnector: !0, waveDegree: "" },
  render(t, e, o, i) {
    const n = Re(t, e, o, Xi(e, "showConnector", !0)), s = ["", "A", "B", "C"], r = me(n);
    for (let a = 1; a < n.length; a++)
      Et(t, n[a], _t(n[a], r), s[a], e.color);
    const l = Vi(e, "waveDegree");
    l && n.length >= 1 && Et(t, n[0], _t(n[0], r), l, e.color), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    return t.points.length < 4 ? !1 : Kt(t, e, o, i);
  }
};
function Hl(t, e, o, i) {
  const n = { x: e.x - t.x, y: e.y - t.y }, s = { x: i.x - o.x, y: i.y - o.y }, r = n.x * s.y - n.y * s.x;
  if (Math.abs(r) < 1e-9) return null;
  const l = ((o.x - t.x) * s.y - (o.y - t.y) * s.x) / r;
  return { x: t.x + l * n.x, y: t.y + l * n.y };
}
const Xl = {
  id: "trianglepattern",
  label: "Triangle Pattern",
  group: "patterns",
  pointsNeeded: 4,
  render(t, e, o, i) {
    const n = gt(e, o);
    if (n.length === 1) {
      q(t, n[0].x, n[0].y, e.width), i && I(t, e, o);
      return;
    }
    if (n.length === 2) {
      $(t, n[0].x, n[0].y, n[1].x, n[1].y), on(t, e, n), i && I(t, e, o);
      return;
    }
    if (n.length >= 4) {
      const s = Hl(n[0], n[2], n[1], n[3]);
      t.fillStyle = _(t, e.color, Oi), t.beginPath(), t.moveTo(n[0].x, n[0].y), t.lineTo(n[1].x, n[1].y), t.lineTo(n[3].x, n[3].y), t.lineTo(n[2].x, n[2].y), t.closePath(), t.fill(), t.strokeStyle = e.color, t.lineWidth = Math.max(1, e.width);
      const r = s ?? n[2], l = s ?? n[3];
      $(t, n[0].x, n[0].y, r.x, r.y), $(t, n[1].x, n[1].y, l.x, l.y);
    } else
      $(t, n[0].x, n[0].y, n[2].x, n[2].y), $(t, n[0].x, n[0].y, n[1].x, n[1].y);
    on(t, e, n), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    if (t.points.length < 4) return !1;
    const n = gt(t, i), s = G(t);
    return Q(e, o, n[0], n[2]) <= s || Q(e, o, n[1], n[3]) <= s;
  }
}, Vl = [
  _l,
  Dl,
  Wl,
  $l,
  Yl,
  Ol,
  Bl,
  Xl
], qi = 0.12, Ui = 0.1, an = 0.4, Gl = 0.45, ql = 0.12;
function ti(t, e) {
  const o = t.points[0], i = t.points[1], n = t.points[2];
  if (!o || !i || !n) return null;
  const s = M(e, o), r = M(e, i), l = M(e, n), a = r.x - s.x, c = r.y - s.y, f = Math.hypot(a, c);
  if (f < 1e-6) return null;
  const h = -c / f, u = a / f, p = (l.x - s.x) * h + (l.y - s.y) * u, g = h * p, b = u * p;
  return [
    s,
    r,
    { x: r.x + g, y: r.y + b },
    { x: s.x + g, y: s.y + b }
  ];
}
function ei(t, e) {
  let o = 0, i = t.length;
  for (; o < i; ) {
    const n = o + i >> 1;
    t[n].time < e ? o = n + 1 : i = n;
  }
  return o;
}
function ji(t, e, o, i, n, s, r, l, a) {
  const c = l.priceToY(i), f = l.priceToY(n), h = l.priceToY(s), u = l.priceToY(r);
  t.strokeStyle = _(t, a, Gl), t.lineWidth = 1, $(t, e, f, e, h);
  const p = Math.min(c, u), g = Math.max(c, u), b = Math.max(g - p, 1);
  t.fillStyle = _(t, a, ql), t.fillRect(e - o, p, o * 2, b), t.strokeRect(e - o, p, o * 2, b);
}
const Ul = {
  id: "rotrect",
  label: "Rotated Rectangle",
  group: "shapes",
  pointsNeeded: 3,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1];
    if (!s) {
      q(t, n.x, n.y, e.width), i && I(t, e, o);
      return;
    }
    const r = M(o, s);
    if (!e.points[2]) {
      $(t, n.x, n.y, r.x, r.y), i && I(t, e, o);
      return;
    }
    const l = ti(e, o);
    if (!l) {
      $(t, n.x, n.y, r.x, r.y), i && I(t, e, o);
      return;
    }
    t.beginPath(), t.moveTo(l[0].x, l[0].y);
    for (let a = 1; a < l.length; a++) t.lineTo(l[a].x, l[a].y);
    t.closePath(), t.fillStyle = _(t, e.color, qi), t.fill(), t.lineJoin = "round", t.stroke(), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = ti(t, i);
    if (!n) return !1;
    if (Jt(e, o, n)) return !0;
    const s = G(t);
    for (let r = 0; r < n.length; r++)
      if (Q(e, o, n[r], n[(r + 1) % n.length]) <= s) return !0;
    return !1;
  }
}, jl = {
  id: "circle",
  label: "Circle",
  group: "shapes",
  pointsNeeded: 2,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1];
    if (!s) {
      q(t, n.x, n.y, e.width), i && I(t, e, o);
      return;
    }
    const r = M(o, s), l = Math.max(Math.hypot(r.x - n.x, r.y - n.y), 0.5);
    t.beginPath(), t.arc(n.x, n.y, l, 0, Math.PI * 2), t.fillStyle = _(t, e.color, qi), t.fill(), t.stroke(), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    if (!t.points[1]) return !1;
    const n = M(i, t.points[0]), s = M(i, t.points[1]), r = Math.hypot(s.x - n.x, s.y - n.y);
    return Math.hypot(e - n.x, o - n.y) <= r + G(t);
  }
}, Jl = {
  id: "arc",
  label: "Arc",
  group: "shapes",
  pointsNeeded: 3,
  render(t, e, o, i) {
    const n = e.points[0], s = e.points[1], r = e.points[2], l = M(o, n);
    if (!s) {
      q(t, l.x, l.y, e.width), i && I(t, e, o);
      return;
    }
    const a = M(o, s);
    if (!r) {
      $(t, a.x, a.y, l.x, l.y), i && I(t, e, o);
      return;
    }
    const c = M(o, r), f = Math.max(Math.hypot(l.x - a.x, l.y - a.y), 0.5), h = Math.atan2(l.y - a.y, l.x - a.x), u = Math.atan2(c.y - a.y, c.x - a.x);
    t.beginPath(), t.arc(a.x, a.y, f, h, u), t.lineCap = "round", t.stroke(), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    if (!t.points[2]) return !1;
    const n = M(i, t.points[1]), s = M(i, t.points[0]), r = M(i, t.points[2]), l = Math.hypot(s.x - n.x, s.y - n.y);
    if (Math.abs(Math.hypot(e - n.x, o - n.y) - l) > G(t)) return !1;
    let c = Math.atan2(s.y - n.y, s.x - n.x), f = Math.atan2(r.y - n.y, r.x - n.x), h = Math.atan2(o - n.y, e - n.x);
    const u = (b) => b < 0 ? b + Math.PI * 2 : b;
    c = u(c), f = u(f), h = u(h);
    const p = u(f - c);
    return u(h - c) <= p;
  }
}, Kl = {
  id: "curve",
  label: "Curve",
  group: "shapes",
  pointsNeeded: 3,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1];
    if (!s) {
      q(t, n.x, n.y, e.width), i && I(t, e, o);
      return;
    }
    const r = M(o, s), l = e.points[2];
    if (!l) {
      $(t, n.x, n.y, r.x, r.y), i && I(t, e, o);
      return;
    }
    const a = M(o, l);
    t.beginPath(), t.moveTo(n.x, n.y), t.quadraticCurveTo(r.x, r.y, a.x, a.y), t.lineCap = "round", t.stroke(), i && (t.save(), t.setLineDash([3, 3]), t.lineWidth = 1, t.strokeStyle = _(t, e.color, 0.5), $(t, n.x, n.y, r.x, r.y), $(t, a.x, a.y, r.x, r.y), t.restore(), I(t, e, o));
  },
  hitTest(t, e, o, i) {
    if (!t.points[2]) return !1;
    const n = M(i, t.points[0]), s = M(i, t.points[1]), r = M(i, t.points[2]), l = G(t), a = 24;
    let c = n.x, f = n.y;
    for (let h = 1; h <= a; h++) {
      const u = h / a, p = 1 - u, g = p * p * n.x + 2 * p * u * s.x + u * u * r.x, b = p * p * n.y + 2 * p * u * s.y + u * u * r.y;
      if (Q(e, o, { x: c, y: f }, { x: g, y: b }) <= l) return !0;
      c = g, f = b;
    }
    return !1;
  }
}, Zl = {
  id: "polyline",
  label: "Polyline",
  group: "shapes",
  // NOTE: a true click-to-extend polyline needs variable point capture the
  // generic placement engine does not provide for non-freehand tools, so this
  // is a fixed 4-vertex open polyline. See file notes.
  pointsNeeded: 4,
  render(t, e, o, i) {
    const n = gt(e, o);
    if (n.length !== 0) {
      if (n.length === 1)
        q(t, n[0].x, n[0].y, e.width);
      else {
        t.lineJoin = "round", t.lineCap = "round", t.beginPath(), t.moveTo(n[0].x, n[0].y);
        for (let s = 1; s < n.length; s++) t.lineTo(n[s].x, n[s].y);
        t.stroke();
      }
      i && I(t, e, o);
    }
  },
  hitTest(t, e, o, i) {
    if (t.points.length < 4) return !1;
    const n = gt(t, i), s = G(t);
    for (let r = 0; r < n.length - 1; r++)
      if (Q(e, o, n[r], n[r + 1]) <= s) return !0;
    return !1;
  }
};
function Ji(t) {
  const e = t.points[0].price, o = t.points[1].price;
  if (!(Math.abs(e) > 0)) return null;
  const i = (o - e) / Math.abs(e) * 100;
  return isFinite(i) ? i : null;
}
function Ki(t, e) {
  return e > 0 ? Math.round(Math.abs(t.points[1].time - t.points[0].time) / e) : 0;
}
const Ql = {
  id: "forecast",
  label: "Forecast",
  group: "projection",
  pointsNeeded: 2,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]);
    if (!e.points[1]) {
      q(t, s.x, s.y, e.width), i && I(t, e, o);
      return;
    }
    const r = M(o, e.points[1]), l = e.points[1].price - e.points[0].price, a = e.points[1].price + Math.abs(l) * 0.25, c = e.points[1].price - Math.abs(l) * 0.25, f = o.priceToY(a), h = o.priceToY(c);
    t.beginPath(), t.moveTo(s.x, s.y), t.lineTo(r.x, f), t.lineTo(r.x, h), t.closePath(), t.fillStyle = _(t, e.color, Ui), t.fill(), t.save(), t.setLineDash([2, 3]), t.lineWidth = 1, t.strokeStyle = _(t, e.color, an), $(t, s.x, s.y, r.x, f), $(t, s.x, s.y, r.x, h), t.restore(), t.save(), t.setLineDash([5, 4]), t.lineWidth = Math.max(1, e.width), t.strokeStyle = e.color, $(t, s.x, s.y, r.x, r.y), t.restore();
    const u = Ji(e), p = Ki(e, n.barMs), g = u === null ? `${p} bars` : `${Fe(u)} · ${p} bars`;
    At(t, r.x, r.y, [g], e.color), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    if (!t.points[1]) return !1;
    const n = M(i, t.points[0]), s = M(i, t.points[1]), r = t.points[1].price - t.points[0].price, l = i.priceToY(t.points[1].price + Math.abs(r) * 0.25), a = i.priceToY(t.points[1].price - Math.abs(r) * 0.25), c = [n, { x: s.x, y: l }, { x: s.x, y: a }];
    return Jt(e, o, c) ? !0 : Q(e, o, n, s) <= G(t);
  }
}, zl = {
  id: "barspattern",
  label: "Bars Pattern",
  group: "projection",
  pointsNeeded: 2,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]);
    if (!e.points[1]) {
      q(t, s.x, s.y, e.width), i && I(t, e, o);
      return;
    }
    const r = M(o, e.points[1]), l = n.candles;
    if (t.save(), t.setLineDash([4, 4]), t.lineWidth = 1, t.strokeStyle = _(t, e.color, an), t.strokeRect(
      Math.min(s.x, r.x),
      Math.min(s.y, r.y),
      Math.abs(r.x - s.x),
      Math.abs(r.y - s.y)
    ), t.restore(), l.length > 0 && n.barMs > 0) {
      const a = Math.min(e.points[0].time, e.points[1].time), c = Math.max(e.points[0].time, e.points[1].time), f = ei(l, a), h = ei(l, c + 1), u = l.slice(f, h);
      if (u.length > 0) {
        const p = l[l.length - 1], g = p.time + n.barMs, b = p.close - u[0].open, P = o.timeToX(g), w = o.timeToX(g + n.barMs), k = Math.max(1, Math.abs(w - P) * 0.32);
        for (let R = 0; R < u.length; R++) {
          const L = u[R], E = o.timeToX(g + R * n.barMs);
          ji(
            t,
            E,
            k,
            L.open + b,
            L.high + b,
            L.low + b,
            L.close + b,
            o,
            e.color
          );
        }
        At(
          t,
          o.timeToX(g + (u.length - 1) * n.barMs),
          o.priceToY(u[u.length - 1].close + b),
          [`${u.length} bars →`],
          e.color
        );
      }
    }
    i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    return t.points[1] ? Dt(e, o, M(i, t.points[0]), M(i, t.points[1]), G(t)) : !1;
  }
}, xl = {
  id: "ghostfeed",
  label: "Ghost Feed",
  group: "projection",
  pointsNeeded: 2,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]);
    if (!e.points[1]) {
      q(t, s.x, s.y, e.width), i && I(t, e, o);
      return;
    }
    const r = M(o, e.points[1]);
    t.save(), t.setLineDash([2, 3]), t.lineWidth = 1, t.strokeStyle = _(t, e.color, an), $(t, s.x, s.y, r.x, r.y), t.restore();
    const l = n.barMs;
    if (l > 0) {
      const a = e.points[0].time, c = e.points[1].time, f = e.points[0].price, h = e.points[1].price, u = Math.max(1, Math.round(Math.abs(c - a) / l)), p = c >= a ? 1 : -1, g = o.timeToX(a), b = o.timeToX(a + p * l), P = Math.max(1, Math.abs(b - g) * 0.32);
      let w = f;
      for (let k = 1; k <= u; k++) {
        const R = k / u, L = f + (h - f) * R, E = w, Y = Math.abs(L - E) * 0.6 + Math.abs(h - f) / u / 4, H = (k % 2 === 0 ? 1 : -1) * Y, j = Math.max(E, L) + Math.abs(H) * 0.5 + Y * 0.3, K = Math.min(E, L) - Math.abs(H) * 0.5 - Y * 0.3, J = o.timeToX(a + p * k * l);
        ji(t, J, P, E, j, K, L, o, e.color), w = L;
      }
      At(t, r.x, r.y, [`ghost ×${u}`], e.color);
    }
    i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    return t.points[1] ? Dt(e, o, M(i, t.points[0]), M(i, t.points[1]), G(t)) : !1;
  }
}, ta = {
  id: "dprange",
  label: "Date & Price Range",
  group: "projection",
  pointsNeeded: 2,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]);
    if (!e.points[1]) {
      q(t, s.x, s.y, e.width), i && I(t, e, o);
      return;
    }
    const r = M(o, e.points[1]), l = Math.min(s.x, r.x), a = Math.min(s.y, r.y), c = Math.abs(r.x - s.x), f = Math.abs(r.y - s.y);
    t.fillStyle = _(t, e.color, Ui), t.fillRect(l, a, c, f), t.save(), t.setLineDash([4, 4]), t.lineWidth = 1, t.strokeStyle = _(t, e.color, an), t.strokeRect(l, a, c, f), t.restore();
    const h = e.points[1].price - e.points[0].price, u = Ji(e), p = Ki(e, n.barMs), g = Math.abs(e.points[1].time - e.points[0].time), b = Le(h, n.pricePrecision), P = u === null ? "" : ` (${Fe(u)})`, w = p === 1 ? "1 bar" : `${p} bars`, k = `Δ ${b}${P} · ${w} · ${Mi(g)}`;
    At(t, (s.x + r.x) / 2, (s.y + r.y) / 2, [k], e.color), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    return t.points[1] ? Dt(e, o, M(i, t.points[0]), M(i, t.points[1]), G(t)) : !1;
  }
}, ea = [
  Ul,
  jl,
  Jl,
  Kl,
  Zl,
  Ql,
  zl,
  xl,
  ta
], na = 26, oa = 3, ce = 16, ao = 8, co = 6, ia = "#089981", sa = "#f23645", ra = new Set(
  ["#2962ff", "#787b86", "#5d606b", "#b2b5be", "#ffffff", "#000000"].map((t) => t.toLowerCase())
);
function la(t) {
  return ra.has(t.trim().toLowerCase());
}
const Rt = /* @__PURE__ */ new Map();
function ve(t, e) {
  return Rt.size > 512 && Rt.clear(), Rt.set(t, e), e;
}
function Ut(t, e) {
  var r;
  const o = (t.text ?? "").trim(), i = o.length === 0, n = wi(i ? e : o, na, oa), s = typeof ((r = t.props) == null ? void 0 : r.emoji) == "string" ? t.props.emoji.trim() : "";
  return s.length > 0 && n.length > 0 && (n[0] = `${s} ${n[0]}`), { lines: n, isPlaceholder: i };
}
function fo(t, e) {
  t.font = fe;
  let o = 0;
  for (const i of e) o = Math.max(o, t.measureText(i).width);
  return { w: o + ao * 2, h: e.length * ce + co * 2 };
}
function ho(t) {
  let e = 0;
  for (const o of t) e = Math.max(e, o.length);
  return { w: e * 7 + ao * 2, h: t.length * ce + co * 2 };
}
function uo(t, e, o, i, n, s) {
  t.font = fe, t.fillStyle = s ? _(t, n, 0.55) : n, t.textAlign = "left", t.textBaseline = "middle";
  for (let r = 0; r < e.length; r++)
    t.fillText(e[r], o + ao, i + co + ce * (r + 0.5));
}
function ue(t, e, o, i) {
  return t >= o.x - i && t <= o.x + o.w + i && e >= o.y - i && e <= o.y + o.h + i;
}
const aa = {
  id: "text",
  label: "Text",
  group: "annotate",
  pointsNeeded: 1,
  defaultProps: { emoji: "" },
  render(t, e, o, i) {
    const n = M(o, e.points[0]), { lines: s, isPlaceholder: r } = Ut(e, "Text"), { w: l, h: a } = fo(t, s), c = n.x, f = n.y, h = ve(e.id, { x: c, y: f, w: l, h: a });
    Pt(t, h.x, h.y, h.w, h.h, 4), t.fillStyle = _(t, e.color, 0.08), t.fill(), i && (t.lineWidth = 1, t.strokeStyle = _(t, e.color, 0.6), t.stroke()), uo(t, s, h.x, h.y, e.color, r), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = M(i, t.points[0]), s = Rt.get(t.id);
    if (s) return ue(e, o, s, 2);
    const { lines: r } = Ut(t, "Text"), { w: l, h: a } = ho(r);
    return ue(e, o, { x: n.x, y: n.y, w: l, h: a }, 2);
  }
}, ca = {
  id: "callout",
  label: "Callout",
  group: "annotate",
  pointsNeeded: 2,
  defaultProps: { emoji: "" },
  render(t, e, o, i) {
    const n = M(o, e.points[0]);
    if (!e.points[1]) {
      t.fillStyle = e.color, t.beginPath(), t.arc(n.x, n.y, Math.max(2, e.width + 1), 0, Math.PI * 2), t.fill(), i && I(t, e, o);
      return;
    }
    const s = M(o, e.points[1]), { lines: r, isPlaceholder: l } = Ut(e, "Callout"), { w: a, h: c } = fo(t, r), f = s.x - a / 2, h = s.y - c / 2, u = ve(e.id, { x: f, y: h, w: a, h: c }), p = ni(u, n.x, n.y);
    t.lineWidth = Math.max(1, e.width), t.strokeStyle = e.color, t.fillStyle = e.color;
    const g = Math.hypot(n.x - p.x, n.y - p.y);
    if (g > 1) {
      const b = Math.atan2(n.y - p.y, n.x - p.x), P = 7, w = (n.x - p.x) / g, k = (n.y - p.y) / g;
      $(t, p.x, p.y, n.x - w * Math.min(P * 0.7, g), n.y - k * Math.min(P * 0.7, g)), tn(t, n.x, n.y, b, P);
    }
    Pt(t, u.x, u.y, u.w, u.h, 6), t.fillStyle = _(t, e.color, 0.14), t.fill(), t.lineWidth = 1, t.strokeStyle = i ? e.color : _(t, e.color, 0.5), t.stroke(), uo(t, r, u.x, u.y, e.color, l), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = M(i, t.points[0]), s = M(i, t.points[1]);
    let r = Rt.get(t.id);
    if (!r) {
      const { lines: a } = Ut(t, "Callout"), { w: c, h: f } = ho(a);
      r = { x: s.x - c / 2, y: s.y - f / 2, w: c, h: f };
    }
    if (ue(e, o, r, 2)) return !0;
    const l = ni(r, n.x, n.y);
    return fa(e, o, l, n) <= Math.max(6, t.width / 2 + 3);
  }
};
function ni(t, e, o) {
  const i = t.x + t.w / 2, n = t.y + t.h / 2, s = e - i, r = o - n;
  if (s === 0 && r === 0) return { x: i, y: n };
  const l = t.w / 2, a = t.h / 2, c = s !== 0 ? l / Math.abs(s) : 1 / 0, f = r !== 0 ? a / Math.abs(r) : 1 / 0, h = Math.min(c, f);
  return { x: i + s * h, y: n + r * h };
}
function fa(t, e, o, i) {
  const n = i.x - o.x, s = i.y - o.y, r = n * n + s * s;
  let l = r === 0 ? 0 : ((t - o.x) * n + (e - o.y) * s) / r;
  return l = Math.max(0, Math.min(1, l)), Math.hypot(t - (o.x + l * n), e - (o.y + l * s));
}
const Te = 9, oi = 12, ha = {
  id: "comment",
  label: "Comment",
  group: "annotate",
  pointsNeeded: 1,
  defaultProps: { emoji: "" },
  render(t, e, o, i) {
    const n = M(o, e.points[0]), { lines: s, isPlaceholder: r } = Ut(e, "Comment"), { w: l, h: a } = fo(t, s), c = n.x - l / 2, f = n.y - oi - a, h = ve(e.id, { x: c, y: f, w: l, h: a });
    Pt(t, h.x, h.y, h.w, h.h, 7), t.fillStyle = _(t, e.color, 0.14), t.fill(), t.lineWidth = 1, t.strokeStyle = i ? e.color : _(t, e.color, 0.5), t.stroke();
    const u = Math.min(Math.max(n.x, h.x + 8), h.x + h.w - 8);
    t.beginPath(), t.moveTo(u - Te / 2, h.y + h.h - 0.5), t.lineTo(u + Te / 2, h.y + h.h - 0.5), t.lineTo(n.x, n.y), t.closePath(), t.fillStyle = _(t, e.color, 0.14), t.fill(), t.strokeStyle = i ? e.color : _(t, e.color, 0.5), t.beginPath(), t.moveTo(u - Te / 2, h.y + h.h - 0.5), t.lineTo(n.x, n.y), t.lineTo(u + Te / 2, h.y + h.h - 0.5), t.stroke(), uo(t, s, h.x, h.y, e.color, r), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = M(i, t.points[0]);
    let s = Rt.get(t.id);
    if (!s) {
      const { lines: r } = Ut(t, "Comment"), { w: l, h: a } = ho(r);
      s = { x: n.x - l / 2, y: n.y - oi - a, w: l, h: a };
    }
    return ue(e, o, s, 2) ? !0 : Math.abs(e - n.x) <= Te && o >= s.y + s.h - 2 && o <= n.y + 2;
  }
}, Ht = 14, ua = {
  id: "pricelabel",
  label: "Price Label",
  group: "annotate",
  pointsNeeded: 1,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]), r = yt(s.y, t.lineWidth), l = vt(e.points[0].price, n.pricePrecision);
    t.lineWidth = Math.max(1, e.width), t.strokeStyle = e.color, $(t, s.x - Ht / 2, r, s.x + Ht / 2, r), t.font = fe;
    const a = 6, c = t.measureText(l).width + a * 2, f = 18, h = s.x + Ht / 2 + 4, u = r - f / 2;
    ve(e.id, { x: s.x - Ht / 2, y: u, w: Ht / 2 + 4 + c, h: f }), Pt(t, h, u, c, f, 3), t.fillStyle = e.color, t.fill(), t.fillStyle = Ce(t, e.color), t.textAlign = "left", t.textBaseline = "middle", t.fillText(l, h + a, r + 0.5), i && I(t, e, o);
  },
  hitTest(t, e, o, i, n) {
    const s = M(i, t.points[0]), r = Rt.get(t.id);
    if (r) return ue(e, o, r, 2);
    const l = vt(t.points[0].price, n.pricePrecision).length * 7 + 12 + Ht;
    return e >= s.x - Ht / 2 - 2 && e <= s.x + l && Math.abs(o - s.y) <= 11;
  }
}, Nn = 8, Cn = 5, pa = {
  id: "signpost",
  label: "Signpost",
  group: "annotate",
  pointsNeeded: 1,
  defaultProps: { emoji: "" },
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]), { h: r } = st(t), l = yt(s.x, t.lineWidth);
    t.lineWidth = Math.max(1, e.width), t.strokeStyle = e.color, $(t, l, r, l, s.y);
    const { lines: a, isPlaceholder: c } = Ut(e, "Signpost"), f = xn(e.points[0].time, n.barMs);
    t.font = fe;
    let h = t.measureText(f).width;
    for (const k of a) h = Math.max(h, t.measureText(k).width);
    const u = h + Nn * 2, g = (a.length + 1) * ce + Cn * 2, b = l, P = s.y - g, w = ve(e.id, { x: b, y: P, w: u, h: g });
    Pt(t, w.x, w.y, w.w, w.h, 4), t.fillStyle = _(t, e.color, 0.16), t.fill(), t.lineWidth = 1, t.strokeStyle = i ? e.color : _(t, e.color, 0.55), t.stroke(), t.font = fe, t.textAlign = "left", t.textBaseline = "middle";
    for (let k = 0; k < a.length; k++)
      t.fillStyle = c ? _(t, e.color, 0.55) : e.color, t.fillText(a[k], w.x + Nn, w.y + Cn + ce * (k + 0.5));
    t.fillStyle = _(t, e.color, 0.7), t.fillText(f, w.x + Nn, w.y + Cn + ce * (a.length + 0.5)), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = M(i, t.points[0]), s = Rt.get(t.id);
    return s && ue(e, o, s, 2) ? !0 : Math.abs(e - n.x) <= Math.max(6, t.width / 2 + 3) && o >= n.y - 2;
  }
}, Ie = 13;
function Zi(t, e) {
  return la(t.color) ? e ? ia : sa : t.color;
}
function Qi(t, e, o, i, n) {
  const s = Ie, r = i ? 1 : -1, l = s * 0.62, a = s * 0.26, c = o, f = o + r * s * 0.7, h = o + r * s * 1.6;
  t.beginPath(), t.moveTo(e, c), t.lineTo(e - l, f), t.lineTo(e - a, f), t.lineTo(e - a, h), t.lineTo(e + a, h), t.lineTo(e + a, f), t.lineTo(e + l, f), t.closePath(), t.fillStyle = n, t.fill(), t.lineWidth = 1, t.lineJoin = "round", t.strokeStyle = _(t, n, 0.9), t.stroke();
}
const ma = {
  id: "arrowup",
  label: "Arrow Up",
  group: "annotate",
  pointsNeeded: 1,
  render(t, e, o, i) {
    const n = M(o, e.points[0]);
    Qi(t, n.x, n.y, !0, Zi(e, !0)), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = M(i, t.points[0]);
    return Math.abs(e - n.x) <= Ie * 0.7 + 3 && o >= n.y - 3 && o <= n.y + Ie * 1.6 + 3;
  }
}, ga = {
  id: "arrowdown",
  label: "Arrow Down",
  group: "annotate",
  pointsNeeded: 1,
  render(t, e, o, i) {
    const n = M(o, e.points[0]);
    Qi(t, n.x, n.y, !1, Zi(e, !1)), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = M(i, t.points[0]);
    return Math.abs(e - n.x) <= Ie * 0.7 + 3 && o <= n.y + 3 && o >= n.y - Ie * 1.6 - 3;
  }
}, ii = 22, si = 14, Fn = 10, ya = {
  id: "flag",
  label: "Flag",
  group: "annotate",
  pointsNeeded: 1,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = yt(n.x, t.lineWidth), r = n.y - ii;
    t.lineWidth = Math.max(1.5, e.width), t.strokeStyle = e.color, t.lineCap = "round", $(t, s, n.y, s, r), t.beginPath(), t.moveTo(s, r), t.lineTo(s + si, r + Fn / 2), t.lineTo(s, r + Fn), t.closePath(), t.fillStyle = e.color, t.fill(), i && I(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = M(i, t.points[0]), s = n.y - ii, r = Math.abs(e - n.x) <= Math.max(6, t.width / 2 + 3) && o >= s - 2 && o <= n.y + 2, l = e >= n.x - 2 && e <= n.x + si + 2 && o >= s - 2 && o <= s + Fn + 2;
    return r || l;
  }
}, ba = [
  aa,
  ca,
  ha,
  ua,
  pa,
  ma,
  ga,
  ya
], da = [
  ...Zs,
  ...er,
  ...hr,
  ...br,
  ...Sr,
  ...Fr,
  ...el,
  ...Pl,
  ...El,
  ...Vl,
  ...ea,
  ...ba
], jt = da.reduce(
  (t, e) => (t[e.id] = e, t),
  {}
), Ta = [
  "trendline",
  "ray",
  "xline",
  "hray",
  "hline",
  "vline",
  "channel",
  "pitchfork",
  "fib",
  "fibext",
  "rect",
  "ellipse",
  "triangle",
  "arrow",
  "brush",
  "note",
  "pricerange",
  "daterange",
  "sigmatape",
  "longpos",
  "shortpos",
  "smartlevel",
  "volxray",
  "avwap",
  // --- expanded set (professional-grade) ---
  // more lines
  "infoline",
  "crossline",
  "trendangle",
  // more channels & forks
  "channeldisjoint",
  "channelflat",
  "regression",
  "pitchforkschiff",
  "pitchforkmod",
  "pitchforkinside",
  "gannfan",
  "gannbox",
  // full Fibonacci family
  "fibtimezone",
  "fibfan",
  "fibchannel",
  "fibcircle",
  "fibtimeext",
  "fibwedge",
  // harmonic & wave patterns
  "xabcd",
  "cypher",
  "abcd",
  "headshoulders",
  "threedrives",
  "elliottimpulse",
  "elliottcorrection",
  "trianglepattern",
  // more shapes
  "rotrect",
  "circle",
  "arc",
  "curve",
  "polyline",
  // more annotation
  "text",
  "callout",
  "comment",
  "pricelabel",
  "signpost",
  "arrowup",
  "arrowdown",
  "flag",
  // projection / forecast
  "forecast",
  "barspattern",
  "ghostfeed",
  "dprange"
], Ma = [
  "lines",
  "channels",
  "fib",
  "patterns",
  "shapes",
  "annotate",
  "measure",
  "projection",
  "smart"
], wa = {
  lines: "Lines",
  channels: "Channels",
  fib: "Fibonacci",
  patterns: "Patterns",
  shapes: "Shapes",
  annotate: "Annotate",
  measure: "Measure",
  projection: "Projection",
  smart: "Smart"
}, Sa = Ma.map((t) => ({
  group: t,
  label: wa[t],
  tools: Ta.filter((e) => {
    var o;
    return ((o = jt[e]) == null ? void 0 : o.group) === t;
  }).map((e) => ({
    id: e,
    label: jt[e].label
  }))
})), Tf = Sa.flatMap(
  (t) => t.tools
);
function po(t) {
  const e = jt[t];
  if (!e) throw new Error(`drawings: no ToolImpl registered for tool "${t}"`);
  return e;
}
function Je(t) {
  return po(t).pointsNeeded;
}
const Pa = "#2962ff";
function Rn(t, e) {
  const o = po(t), i = {
    id: `d_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`,
    tool: t,
    points: [{ time: e.time, price: e.price }],
    color: Pa,
    width: 1
  };
  return o.defaultProps && (i.props = { ...o.defaultProps }), i;
}
function vn(t, e, o, i, n) {
  if (e.points.length === 0) return;
  const s = jt[e.tool];
  s && (t.save(), t.lineWidth = Math.max(1, e.width), t.strokeStyle = e.color, t.fillStyle = e.color, t.setLineDash([]), t.lineCap = "butt", t.lineJoin = "miter", s.render(t, e, o, i, n), t.restore());
}
function ri(t, e, o, i, n) {
  const s = jt[t.tool];
  return !s || !(s.pointsNeeded >= 0 ? t.points.length >= s.pointsNeeded : t.points.length >= 2) ? !1 : s.hitTest(t, e, o, i, n);
}
function li(t, e, o, i, n) {
  const s = jt[t.tool];
  if (s != null && s.handleAt) return s.handleAt(t, e, o, i, n);
  for (let r = t.points.length - 1; r >= 0; r--) {
    const l = t.points[r];
    if (Math.abs(e - i.timeToX(l.time)) <= xe && Math.abs(o - i.priceToY(l.price)) <= xe)
      return r;
  }
  return -1;
}
function Aa(t, e, o) {
  return {
    ...t,
    points: t.points.map((i) => ({ time: i.time + e, price: i.price + o }))
  };
}
function ka(t, e, o, i) {
  if (e < 0 || e >= t.points.length) return t;
  const n = jt[t.tool];
  return n != null && n.moveHandle ? n.moveHandle(t, e, o, i) : {
    ...t,
    points: t.points.map((s, r) => r === e ? { time: o.time, price: o.price } : s)
  };
}
const La = /* @__PURE__ */ new Set([
  "renko",
  "kagi",
  "linebreak",
  "pnf",
  "range"
]);
function ie(t) {
  return La.has(t);
}
function Ia(t) {
  const e = t.length;
  if (e === 0) return [];
  const o = new Array(e);
  let i = (t[0].open + t[0].close) / 2, n = t[0].close;
  for (let s = 0; s < e; s++) {
    const r = t[s], l = (r.open + r.high + r.low + r.close) / 4, a = s === 0 ? (r.open + r.close) / 2 : (i + n) / 2, c = Math.max(r.high, a, l), f = Math.min(r.low, a, l);
    o[s] = { time: r.time, open: a, high: c, low: f, close: l, volume: r.volume }, i = a, n = l;
  }
  return o;
}
function Na(t, e) {
  const o = t.length;
  if (o === 0) return 0;
  let i = 0, n = 0;
  for (let l = 1; l < o; l++) {
    const a = t[l], c = t[l - 1].close, f = Math.max(a.high - a.low, Math.abs(a.high - c), Math.abs(a.low - c));
    isFinite(f) && (i += f, n++);
  }
  if (n === 0) return 0;
  let s = 0, r = 0;
  for (let l = o - 1; l >= 1 && r < e; l--) {
    const a = t[l], c = t[l - 1].close, f = Math.max(a.high - a.low, Math.abs(a.high - c), Math.abs(a.low - c));
    isFinite(f) && (s += f, r++);
  }
  return r > 0 ? s / r : i / n;
}
function mo(t) {
  const e = t.length;
  if (e === 0) return 1;
  const o = t[e - 1].close, i = Math.abs(o) * 5e-3 || 1, n = Na(t, 14) * 0.5, s = n > 0 ? n : i;
  return s > 0 ? s : i;
}
function Ca(t, e) {
  const o = t.length;
  if (o === 0 || !(e > 0) || !isFinite(e)) return [];
  const i = [];
  let n = t[0].close, s = 0;
  for (let r = 0; r < o; r++) {
    const l = t[r], a = l.close;
    if (s >= 0)
      for (; a >= n + e; )
        i.push({ time: l.time, open: n, high: n + e, low: n, close: n + e, volume: l.volume }), n += e, s = 1;
    if (s <= 0)
      for (; a <= n - e; )
        i.push({ time: l.time, open: n, high: n, low: n - e, close: n - e, volume: l.volume }), n -= e, s = -1;
    if (s === 1)
      for (; a <= n - 2 * e; ) {
        const c = n - e;
        i.push({ time: l.time, open: c, high: c, low: c - e, close: c - e, volume: l.volume }), n = c - e, s = -1;
      }
    else if (s === -1)
      for (; a >= n + 2 * e; ) {
        const c = n + e;
        i.push({ time: l.time, open: c, high: c + e, low: c, close: c + e, volume: l.volume }), n = c + e, s = 1;
      }
  }
  return i;
}
function Fa(t, e = 3) {
  const o = t.length;
  if (o === 0) return [];
  const i = [];
  for (let n = 0; n < o; n++) {
    const s = t[n], r = s.close;
    if (i.length === 0) {
      const g = s.close >= s.open, b = Math.min(s.open, s.close), P = Math.max(s.open, s.close);
      i.push({ time: s.time, open: g ? b : P, high: P, low: b, close: g ? P : b, volume: s.volume });
      continue;
    }
    const l = i[i.length - 1], a = l.close >= l.open;
    let c = -1 / 0, f = 1 / 0;
    const h = Math.max(0, i.length - e);
    for (let g = h; g < i.length; g++)
      c = Math.max(c, i[g].high), f = Math.min(f, i[g].low);
    const u = Math.max(l.open, l.close), p = Math.min(l.open, l.close);
    r > u ? i.push({ time: s.time, open: u, high: r, low: u, close: r, volume: s.volume }) : r < p ? i.push({ time: s.time, open: p, high: p, low: r, close: r, volume: s.volume }) : a && r < f ? i.push({ time: s.time, open: p, high: p, low: r, close: r, volume: s.volume }) : !a && r > c && i.push({ time: s.time, open: u, high: r, low: u, close: r, volume: s.volume });
  }
  return i;
}
function Ra(t) {
  return mo(t);
}
function va(t, e, o = 3) {
  const i = t.length;
  if (i === 0 || !(e > 0) || !isFinite(e)) return [];
  const n = o >= 1 ? Math.floor(o) : 3, s = t[0].close, r = (u) => Math.floor((u - s) / e), l = [];
  let a = 0, c = r(t[0].close), f = c, h = t[0].time;
  for (let u = 0; u < i; u++) {
    const p = t[u], g = r(p.high), b = r(p.low);
    if (a === 0) {
      g > c ? (a = 1, c = g, h = p.time) : b < f && (a = -1, f = b, h = p.time);
      continue;
    }
    a === 1 ? g > c ? (c = g, h = p.time) : b <= c - n && (l.push({ dir: 1, top: c, bottom: f, time: h }), a = -1, f = b, c = c - 1, h = p.time) : b < f ? (f = b, h = p.time) : g >= f + n && (l.push({ dir: -1, top: c, bottom: f, time: h }), a = 1, c = g, f = f + 1, h = p.time);
  }
  return a !== 0 && l.push({ dir: a, top: c, bottom: f, time: h }), l.map((u) => {
    const p = s + u.bottom * e, g = s + (u.top + 1) * e, b = u.dir === 1 ? p : g, P = u.dir === 1 ? g : p;
    return { time: u.time, open: b, high: g, low: p, close: P, volume: 0 };
  });
}
function Ea(t) {
  return mo(t);
}
function _a(t, e) {
  const o = t.length;
  if (o === 0 || !(e > 0) || !isFinite(e)) return [];
  const i = [];
  let n = t[0].open, s = n, r = n, l = t[0].time;
  const a = (c, f, h) => {
    for (c > r && (r = c), c < s && (s = c); c - s >= e; ) {
      const u = s + e;
      i.push({ time: f, open: s, high: u, low: s, close: u, volume: h }), n = u, s = u, r = c > u ? c : u;
    }
    for (; r - c >= e; ) {
      const u = r - e;
      i.push({ time: f, open: r, high: r, low: u, close: u, volume: h }), n = u, r = u, s = c < u ? c : u;
    }
  };
  for (let c = 0; c < o; c++) {
    const f = t[c];
    l = f.time;
    const h = f.close >= f.open;
    a(f.open, f.time, f.volume), a(h ? f.low : f.high, f.time, f.volume), a(h ? f.high : f.low, f.time, f.volume), a(f.close, f.time, f.volume);
  }
  if (r > s || i.length === 0) {
    const c = t[o - 1].close >= n;
    i.push({ time: l, open: n, high: r, low: s, close: c ? r : s, volume: t[o - 1].volume });
  }
  return i;
}
function Da(t, e) {
  const o = t.length;
  if (o === 0) return [];
  const i = isFinite(e) ? e : 0.04, n = [];
  let s = 0, r = t[0].close, l = 1 / 0, a = -1 / 0, c = !0;
  n.push({ time: t[0].time, price: t[0].close, thick: c });
  const f = (h) => {
    r >= l ? c = !0 : r <= a && (c = !1), n[n.length - 1] = { time: h, price: r, thick: c };
  };
  for (let h = 1; h < o; h++) {
    const u = t[h], p = u.close;
    if (s === 0) {
      if (p >= r * (1 + i))
        s = 1, r = p;
      else if (p <= r * (1 - i))
        s = -1, r = p;
      else
        continue;
      n.push({ time: u.time, price: r, thick: c }), f(u.time);
    } else s === 1 ? p > r ? (r = p, f(u.time)) : p <= r * (1 - i) && (l = r, r = p, s = -1, n.push({ time: u.time, price: r, thick: c }), f(u.time)) : p < r ? (r = p, f(u.time)) : p >= r * (1 + i) && (a = r, r = p, s = 1, n.push({ time: u.time, price: r, thick: c }), f(u.time));
  }
  return n;
}
const Wa = {
  dark: {
    bg: "#0e1117",
    text: "#d1d4dc",
    mutedText: "#787b86",
    grid: "rgba(255, 255, 255, 0.06)",
    separator: "rgba(255, 255, 255, 0.14)",
    axisLine: "rgba(255, 255, 255, 0.14)",
    up: "#26a69a",
    down: "#ef5350",
    accent: "#4361ee",
    crosshair: "rgba(149, 152, 161, 0.9)",
    crosshairTagBg: "#4c525e",
    crosshairTagText: "#ffffff",
    guide: "rgba(120, 123, 134, 0.5)"
  },
  light: {
    bg: "#ffffff",
    text: "#131722",
    mutedText: "#6a6d78",
    grid: "rgba(0, 0, 0, 0.06)",
    separator: "rgba(0, 0, 0, 0.14)",
    axisLine: "rgba(0, 0, 0, 0.14)",
    up: "#26a69a",
    down: "#ef5350",
    accent: "#4361ee",
    crosshair: "rgba(105, 109, 120, 0.9)",
    crosshairTagBg: "#5d606b",
    crosshairTagText: "#ffffff",
    guide: "rgba(120, 123, 134, 0.5)"
  }
}, Wt = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', $a = '10px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
class Ya {
  constructor() {
    /** Candle open times, ascending (epoch ms). */
    nt(this, "times", []);
    /** Estimated uniform bar interval (ms), used to extrapolate beyond the data. */
    nt(this, "intervalMs", 6e4);
    /** Plot-area width in CSS px (excludes the price axis column). */
    nt(this, "plotWidth", 0);
    nt(this, "view", { start: -80, end: 80 });
  }
  setTimes(e) {
    if (this.times = e, e.length >= 2) {
      let o = 1 / 0;
      for (let i = 1; i < e.length; i++) {
        const n = e[i] - e[i - 1];
        n > 0 && n < o && (o = n);
      }
      isFinite(o) && (this.intervalMs = o);
    }
  }
  get count() {
    return this.times.length;
  }
  get range() {
    return this.view.end - this.view.start;
  }
  /** Width of one bar slot in CSS px. */
  barSpacing() {
    return this.range > 0 ? this.plotWidth / this.range : 0;
  }
  /** Fractional bar index -> x (left-edge convention). */
  indexToX(e) {
    return (e - this.view.start) / (this.range || 1) * this.plotWidth;
  }
  /** x -> fractional bar index. */
  xToIndex(e) {
    return this.view.start + e / (this.plotWidth || 1) * this.range;
  }
  /** x of the center of bar `index`. */
  centerX(e) {
    return this.indexToX(e + 0.5);
  }
  /**
   * time -> fractional bar index. Binary search inside the loaded range,
   * uniform-interval extrapolation outside of it.
   */
  timeToIndex(e) {
    const o = this.times, i = o.length;
    if (i === 0) return e / this.intervalMs;
    if (e <= o[0]) return (e - o[0]) / this.intervalMs;
    if (e >= o[i - 1]) return i - 1 + (e - o[i - 1]) / this.intervalMs;
    let n = 0, s = i - 1;
    for (; s - n > 1; ) {
      const l = n + s >> 1;
      o[l] <= e ? n = l : s = l;
    }
    const r = o[s] - o[n];
    return n + (r > 0 ? (e - o[n]) / r : 0);
  }
  /** Fractional bar index -> time. Inverse of timeToIndex (same extrapolation). */
  indexToTime(e) {
    const o = this.times, i = o.length;
    if (i === 0) return Math.round(e * this.intervalMs);
    if (e <= 0) return Math.round(o[0] + e * this.intervalMs);
    if (e >= i - 1) return Math.round(o[i - 1] + (e - (i - 1)) * this.intervalMs);
    const n = Math.floor(e);
    return Math.round(o[n] + (o[n + 1] - o[n]) * (e - n));
  }
  /** time -> x, anchored at bar centers (a drawing at a candle's time sits on that candle). */
  timeToX(e) {
    return this.indexToX(this.timeToIndex(e) + 0.5);
  }
  /** x -> time. Inverse of timeToX. */
  xToTime(e) {
    return this.indexToTime(this.xToIndex(e) - 0.5);
  }
  /** Inclusive [from, to] integer bar range intersecting the viewport (clamped to data). */
  visibleRange() {
    const e = Math.max(0, Math.floor(this.view.start)), o = Math.min(this.count - 1, Math.ceil(this.view.end));
    return { from: e, to: o };
  }
}
class Me {
  constructor(e, o, i, n, s = !1) {
    this.top = e, this.height = o, this.min = i, this.max = n, this.log = s;
  }
  get bottom() {
    return this.top + this.height;
  }
  priceToY(e) {
    if (this.log) {
      const i = Math.log(this.min), n = Math.log(this.max) - i || 1;
      return this.top + (Math.log(this.max) - Math.log(Math.max(e, 1e-12))) / n * this.height;
    }
    const o = this.max - this.min;
    return this.top + (this.max - e) / (o || 1) * this.height;
  }
  yToPrice(e) {
    if (this.log) {
      const i = Math.log(this.max), n = i - Math.log(this.min) || 1;
      return Math.exp(i - (e - this.top) / (this.height || 1) * n);
    }
    const o = this.max - this.min;
    return this.max - (e - this.top) / (this.height || 1) * o;
  }
  /**
   * Nice round tick values inside the scale, skipping ones whose label would
   * be clipped at the pane edges. `minStep` lets the caller forbid steps finer
   * than the display precision (e.g. 10^-pricePrecision). In log mode, a range
   * spanning multiple decades uses 1/2/5×10^k decade ticks; a narrower range
   * (e.g. crypto within one decade) falls back to nice linear values, which read
   * cleanly and are positioned via the log priceToY anyway.
   */
  ticks(e = 0) {
    if (this.height <= 0) return [];
    if (this.log && this.min > 0 && this.max > this.min) {
      const o = this.logDecadeTicks();
      if (o.length >= 3) return o;
    }
    return this.linearTicks(e);
  }
  linearTicks(e) {
    const o = this.max - this.min;
    if (!(o > 0)) return [];
    const i = Math.max(2, Math.floor(this.height / 45));
    let n = Jn(o / i);
    e > 0 && n < e && (n = e);
    const s = [], r = Math.ceil(this.min / n);
    for (let l = r; l * n <= this.max + n * 0.5; l++) {
      const a = l * n, c = this.priceToY(a);
      c >= this.top + 8 && c <= this.bottom - 8 && s.push(a);
    }
    return s;
  }
  logDecadeTicks() {
    const e = [], o = Math.floor(Math.log10(this.min)), i = Math.ceil(Math.log10(this.max));
    for (let n = o; n <= i; n++) {
      const s = Math.pow(10, n);
      for (const r of [1, 2, 5]) {
        const l = r * s;
        if (l < this.min || l > this.max) continue;
        const a = this.priceToY(l);
        a >= this.top + 8 && a <= this.bottom - 8 && e.push(l);
      }
    }
    return e;
  }
}
function Jn(t) {
  if (!(t > 0) || !isFinite(t)) return 1;
  const e = Math.pow(10, Math.floor(Math.log10(t)));
  for (const o of [1, 2, 5, 10])
    if (o * e >= t) return o * e;
  return 10 * e;
}
function ai(t) {
  return !(t > 0) || !isFinite(t) ? 2 : Math.max(0, Math.min(8, -Math.floor(Math.log10(t) + 1e-9)));
}
function we(t, e) {
  return isFinite(t) ? t.toLocaleString("en-US", {
    minimumFractionDigits: e,
    maximumFractionDigits: e
  }) : "—";
}
function Oa(t) {
  if (!isFinite(t)) return "—";
  const e = Math.abs(t);
  return e >= 1e12 ? (t / 1e12).toFixed(2) + "T" : e >= 1e9 ? (t / 1e9).toFixed(2) + "B" : e >= 1e6 ? (t / 1e6).toFixed(2) + "M" : e >= 1e3 ? (t / 1e3).toFixed(2) + "K" : e >= 100 ? t.toFixed(0) : e >= 1 ? t.toFixed(2) : t.toFixed(4);
}
function Ba(t) {
  let e = 1;
  for (; ; ) {
    for (const o of [1, 2, 5]) {
      const i = o * e;
      if (i >= t) return i;
    }
    e *= 10;
  }
}
function Ha(t) {
  const e = t.barSpacing();
  if (!(e > 0) || t.plotWidth <= 0) return [];
  const o = Ba(Math.max(1, Math.ceil(90 / e))), i = [], n = Math.ceil(t.view.start / o) * o;
  for (let s = n; s < t.view.end; s += o) {
    const r = t.centerX(s);
    r < -1 || r > t.plotWidth + 1 || i.push({ index: s, x: r, time: t.indexToTime(s) });
  }
  return i;
}
const Kn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function ke(t) {
  return t < 10 ? "0" + t : String(t);
}
function Xa(t, e, o) {
  const i = new Date(t), n = e !== null ? new Date(e) : null;
  return o >= 864e5 ? n && i.getFullYear() !== n.getFullYear() ? String(i.getFullYear()) : !n || i.getMonth() !== n.getMonth() ? Kn[i.getMonth()] : String(i.getDate()) : !n || i.getDate() !== n.getDate() || i.getMonth() !== n.getMonth() || i.getFullYear() !== n.getFullYear() ? `${i.getDate()} ${Kn[i.getMonth()]}` : `${ke(i.getHours())}:${ke(i.getMinutes())}`;
}
function Va(t, e) {
  const o = new Date(t), i = `${o.getDate()} ${Kn[o.getMonth()]} '${ke(o.getFullYear() % 100)}`;
  return e >= 864e5 ? i : `${i}  ${ke(o.getHours())}:${ke(o.getMinutes())}`;
}
function $t(t) {
  const e = Math.floor(t) - 1;
  return Math.max(1, Math.min(Math.floor(t * 0.8), e > 0 ? e : 1));
}
function Ne(t, e) {
  const o = /^#([0-9a-f]{6})$/i.exec(t);
  if (!o) return t;
  const i = parseInt(o[1], 16);
  return `rgba(${i >> 16 & 255}, ${i >> 8 & 255}, ${i & 255}, ${e})`;
}
function Ga(t, e, o, i) {
  t.fillStyle = e.grid;
  for (const n of o)
    t.fillRect(Math.round(n.x), 0, 1, i);
}
function ci(t, e, o, i, n) {
  t.fillStyle = e.grid;
  for (const s of n)
    t.fillRect(0, Math.round(i.priceToY(s)), o, 1);
}
function qa(t, e, o, i) {
  t.fillStyle = e.separator, t.fillRect(0, o, i, 1);
}
function Ua(t, e, o, i, n, s) {
  t.fillStyle = e.axisLine, t.fillRect(o, 0, 1, s), t.fillRect(0, i, n, 1);
}
function En(t, e, o, i, n, s, r) {
  const l = n.barSpacing(), a = $t(l);
  for (let c = o; c <= i; c++) {
    const f = e[c], h = f.close >= f.open ? r.up : r.down, u = n.centerX(c), p = Math.round(u), g = Math.round(s.priceToY(f.high)), b = Math.round(s.priceToY(f.low));
    t.fillStyle = h, t.fillRect(p, g, 1, Math.max(1, b - g));
    const P = Math.round(s.priceToY(f.open)), w = Math.round(s.priceToY(f.close));
    t.fillRect(Math.round(u - a / 2), Math.min(P, w), a, Math.max(1, Math.abs(w - P)));
  }
}
function ja(t, e, o, i, n, s, r) {
  const l = n.barSpacing(), a = $t(l);
  let c = 0;
  for (let f = o; f <= i; f++)
    e[f].volume > c && (c = e[f].volume);
  for (let f = o; f <= i; f++) {
    const h = e[f], u = h.close >= h.open ? r.up : r.down, p = n.centerX(f), g = Math.round(p), b = Math.round(s.priceToY(h.high)), P = Math.round(s.priceToY(h.low));
    t.fillStyle = u, t.fillRect(g, b, 1, Math.max(1, P - b));
    const w = c > 0 ? h.volume / c : 1, k = Math.max(1, Math.round(a * w)), R = Math.round(s.priceToY(h.open)), L = Math.round(s.priceToY(h.close));
    t.fillRect(Math.round(p - k / 2), Math.min(R, L), k, Math.max(1, Math.abs(L - R)));
  }
}
function Ja(t, e, o, i, n, s, r) {
  const l = n.barSpacing(), a = Math.max(1, Math.floor($t(l) / 2));
  for (let c = o; c <= i; c++) {
    const f = e[c], h = f.close >= f.open ? r.up : r.down, u = Math.round(n.centerX(c)), p = Math.round(s.priceToY(f.high)), g = Math.round(s.priceToY(f.low));
    t.fillStyle = h, t.fillRect(u, p, 1, Math.max(1, g - p)), t.fillRect(u - a, Math.round(s.priceToY(f.open)), a, 1), t.fillRect(u + 1, Math.round(s.priceToY(f.close)), a, 1);
  }
}
function sn(t, e, o, i, n, s) {
  const r = Math.max(0, o - 1), l = Math.min(e.length - 1, i + 1);
  t.beginPath();
  for (let a = r; a <= l; a++) {
    const c = n.centerX(a), f = s.priceToY(e[a].close);
    a === r ? t.moveTo(c, f) : t.lineTo(c, f);
  }
}
function Ka(t, e, o, i, n, s, r) {
  o > i || (sn(t, e, o, i, n, s), t.strokeStyle = r.accent, t.lineWidth = 2, t.lineJoin = "round", t.lineCap = "round", t.stroke());
}
function Za(t, e, o, i, n, s, r) {
  if (o > i) return;
  const l = Math.max(0, o - 1), a = Math.min(e.length - 1, i + 1), c = t.createLinearGradient(0, s.top, 0, s.bottom);
  c.addColorStop(0, Ne(r.accent, 0.28)), c.addColorStop(1, Ne(r.accent, 0.02)), sn(t, e, o, i, n, s), t.lineTo(n.centerX(a), s.bottom), t.lineTo(n.centerX(l), s.bottom), t.closePath(), t.fillStyle = c, t.fill(), sn(t, e, o, i, n, s), t.strokeStyle = r.accent, t.lineWidth = 2, t.lineJoin = "round", t.lineCap = "round", t.stroke();
}
function Qa(t, e, o, i, n, s, r) {
  if (o > i) return;
  const l = Math.max(0, o - 1), a = Math.min(e.length - 1, i + 1), c = Math.min(i, e.length - 1), f = c > 0 ? e[c - 1].close : e[c].open, u = e[c].close >= f ? r.up : r.down;
  t.beginPath();
  for (let p = l; p <= a; p++) {
    const g = n.centerX(p), b = s.priceToY(e[p].high);
    p === l ? t.moveTo(g, b) : t.lineTo(g, b);
  }
  for (let p = a; p >= l; p--)
    t.lineTo(n.centerX(p), s.priceToY(e[p].low));
  t.closePath(), t.fillStyle = Ne(u, 0.16), t.fill(), t.beginPath();
  for (let p = l; p <= a; p++) {
    const g = n.centerX(p), b = s.priceToY(e[p].close);
    p === l ? t.moveTo(g, b) : t.lineTo(g, b);
  }
  t.strokeStyle = u, t.lineWidth = 2, t.lineJoin = "round", t.lineCap = "round", t.stroke();
}
function za(t, e, o, i, n, s, r) {
  const l = n.barSpacing(), a = $t(l);
  for (let c = o; c <= i; c++) {
    const f = e[c], h = f.close >= f.open, u = h ? r.up : r.down, p = n.centerX(c), g = Math.round(p), b = Math.round(s.priceToY(f.high)), P = Math.round(s.priceToY(f.low));
    t.fillStyle = u, t.fillRect(g, b, 1, Math.max(1, P - b));
    const w = Math.round(s.priceToY(f.open)), k = Math.round(s.priceToY(f.close)), R = Math.round(p - a / 2), L = Math.min(w, k), E = Math.max(1, Math.abs(k - w));
    h ? (t.strokeStyle = u, t.lineWidth = 1, t.strokeRect(R + 0.5, L + 0.5, Math.max(1, a - 1), Math.max(1, E - 1))) : t.fillRect(R, L, a, E);
  }
}
function xa(t, e, o, i, n, s, r) {
  const l = n.barSpacing(), a = Math.max(1, Math.floor($t(l) / 2));
  for (let c = o; c <= i; c++) {
    const f = e[c], h = f.close >= f.open ? r.up : r.down, u = Math.round(n.centerX(c)), p = Math.round(s.priceToY(f.high)), g = Math.round(s.priceToY(f.low));
    t.fillStyle = h, t.fillRect(u, p, 1, Math.max(1, g - p)), t.fillRect(u + 1, Math.round(s.priceToY(f.close)), a, 1);
  }
}
function tc(t, e, o, i, n, s, r) {
  if (!(o > i)) {
    sn(t, e, o, i, n, s), t.strokeStyle = r.accent, t.lineWidth = 2, t.lineJoin = "round", t.lineCap = "round", t.stroke(), t.fillStyle = r.accent;
    for (let l = o; l <= i; l++) {
      const a = n.centerX(l), c = s.priceToY(e[l].close);
      t.beginPath(), t.arc(a, c, 2.5, 0, Math.PI * 2), t.fill();
    }
  }
}
function ec(t, e, o, i, n, s, r) {
  if (o > i) return;
  const l = Math.max(0, o - 1), a = Math.min(e.length - 1, i + 1);
  t.beginPath();
  let c = s.priceToY(e[l].close);
  t.moveTo(n.centerX(l), c);
  for (let f = l + 1; f <= a; f++) {
    const h = n.centerX(f), u = s.priceToY(e[f].close);
    t.lineTo(h, c), t.lineTo(h, u), c = u;
  }
  t.strokeStyle = r.accent, t.lineWidth = 2, t.lineJoin = "miter", t.lineCap = "butt", t.stroke();
}
function nc(t, e, o, i, n, s, r, l) {
  if (o > i) return;
  const a = Math.max(0, o - 1), c = Math.min(e.length - 1, i + 1), f = s.priceToY(l), h = () => {
    t.beginPath();
    for (let g = a; g <= c; g++) {
      const b = n.centerX(g), P = s.priceToY(e[g].close);
      g === a ? t.moveTo(b, P) : t.lineTo(b, P);
    }
  }, u = n.centerX(a), p = n.centerX(c);
  t.save(), t.beginPath(), t.rect(0, s.top, n.plotWidth, Math.max(0, f - s.top)), t.clip(), h(), t.lineTo(p, f), t.lineTo(u, f), t.closePath(), t.fillStyle = Ne(r.up, 0.2), t.fill(), t.restore(), t.save(), t.beginPath(), t.rect(0, f, n.plotWidth, Math.max(0, s.bottom - f)), t.clip(), h(), t.lineTo(p, f), t.lineTo(u, f), t.closePath(), t.fillStyle = Ne(r.down, 0.2), t.fill(), t.restore(), t.lineWidth = 2, t.lineJoin = "round", t.lineCap = "round", t.save(), t.beginPath(), t.rect(0, s.top, n.plotWidth, Math.max(0, f - s.top)), t.clip(), h(), t.strokeStyle = r.up, t.stroke(), t.restore(), t.save(), t.beginPath(), t.rect(0, f, n.plotWidth, Math.max(0, s.bottom - f)), t.clip(), h(), t.strokeStyle = r.down, t.stroke(), t.restore();
}
function oc(t, e, o, i, n, s, r) {
  const l = n.barSpacing(), a = $t(l), c = s.bottom;
  for (let f = o; f <= i; f++) {
    const h = e[f], u = f > 0 ? e[f - 1].close : h.open;
    t.fillStyle = h.close >= u ? r.up : r.down;
    const p = Math.round(s.priceToY(h.close)), g = Math.min(p, c);
    t.fillRect(Math.round(n.centerX(f) - a / 2), g, a, Math.max(1, Math.round(c - g)));
  }
}
function ic(t, e, o, i, n, s, r) {
  for (let l = o; l <= i; l++) {
    const a = e[l];
    t.fillStyle = a.close >= a.open ? r.up : r.down;
    const c = Math.round(n.centerX(l)), f = Math.round(s.priceToY(a.high)), h = Math.round(s.priceToY(a.low));
    t.fillRect(c, f, 1, Math.max(1, h - f));
  }
}
function sc(t, e, o, i, n, s, r) {
  const l = n.barSpacing(), a = $t(l);
  for (let c = o; c <= i; c++) {
    const f = e[c], h = f.close >= f.open;
    t.fillStyle = h ? r.up : r.down;
    const u = Math.round(s.priceToY(Math.max(f.open, f.close))), p = Math.round(s.priceToY(Math.min(f.open, f.close)));
    t.fillRect(Math.round(n.centerX(c) - a / 2), u, a, Math.max(1, p - u));
  }
}
function rc(t, e, o, i, n, s, r, l) {
  if (!(l > 0) || !isFinite(l)) return;
  const a = n.barSpacing(), c = $t(a), f = Math.max(1.5, c / 2 - 1);
  t.save(), t.lineWidth = Math.max(1.5, Math.min(2.5, c / 6)), t.lineCap = "round";
  for (let h = o; h <= i; h++) {
    const u = e[h], p = u.close >= u.open;
    t.strokeStyle = p ? r.up : r.down;
    const g = n.centerX(h), b = Math.max(1, Math.round((u.high - u.low) / l));
    for (let P = 0; P < b; P++) {
      const w = s.priceToY(u.low + (P + 1) * l), k = s.priceToY(u.low + P * l), R = (w + k) / 2, L = Math.min(f, Math.abs(k - w) / 2 - 0.5);
      L <= 0.5 || (t.beginPath(), p ? (t.moveTo(g - L, R - L), t.lineTo(g + L, R + L), t.moveTo(g + L, R - L), t.lineTo(g - L, R + L), t.stroke()) : (t.arc(g, R, L, 0, Math.PI * 2), t.stroke()));
    }
  }
  t.restore();
}
function lc(t, e, o, i, n) {
  if (!(e.length < 2)) {
    t.save(), t.strokeStyle = n.accent, t.lineJoin = "round", t.lineCap = "butt";
    for (let s = 1; s < e.length; s++) {
      const r = e[s - 1], l = e[s];
      t.lineWidth = l.thick ? 3 : 1, t.beginPath(), t.moveTo(o.centerX(s - 1), i.priceToY(r.price)), t.lineTo(o.centerX(s - 1), i.priceToY(l.price)), t.lineTo(o.centerX(s), i.priceToY(l.price)), t.stroke();
    }
    t.restore();
  }
}
function fi(t, e, o, i, n, s) {
  const r = e.style ?? "line", l = Math.min(i, e.values.length - 1);
  if (r === "histogram") {
    const h = n.barSpacing(), u = Math.max(1, Math.floor(h * 0.6) || 1), p = Math.min(Math.max(s.priceToY(0), s.top), s.bottom);
    t.fillStyle = e.color;
    for (let g = Math.max(0, o); g <= l; g++) {
      const b = e.values[g];
      if (b == null || !isFinite(b)) continue;
      const P = s.priceToY(b);
      t.fillRect(
        Math.round(n.centerX(g) - u / 2),
        Math.round(Math.min(P, p)),
        u,
        Math.max(1, Math.round(Math.abs(p - P)))
      );
    }
    return;
  }
  const a = Math.max(0, o - 1), c = Math.min(e.values.length - 1, i + 1);
  t.beginPath();
  let f = !1;
  for (let h = a; h <= c; h++) {
    const u = e.values[h];
    if (u == null || !isFinite(u)) {
      f = !1;
      continue;
    }
    const p = n.centerX(h), g = s.priceToY(u);
    f ? t.lineTo(p, g) : (t.moveTo(p, g), f = !0);
  }
  t.strokeStyle = e.color, t.lineWidth = 1.5, t.lineJoin = "round", t.stroke();
}
function ac(t, e, o, i, n, s) {
  const r = (l) => n.centerX(i + l);
  if (t.save(), t.lineJoin = "round", t.lineCap = "round", o && o.upper.length >= 2 && o.lower.length >= 2) {
    t.beginPath();
    for (let l = 0; l < o.upper.length; l++) {
      const a = o.upper[l], c = r(a.barOffset), f = s.priceToY(a.price);
      l === 0 ? t.moveTo(c, f) : t.lineTo(c, f);
    }
    for (let l = o.lower.length - 1; l >= 0; l--) {
      const a = o.lower[l];
      t.lineTo(r(a.barOffset), s.priceToY(a.price));
    }
    t.closePath(), t.globalAlpha = Math.min(1, Math.max(0, o.opacity)), t.fillStyle = o.color, t.fill(), t.globalAlpha = 1;
  }
  for (const l of e)
    if (!(l.points.length < 2)) {
      t.beginPath();
      for (let a = 0; a < l.points.length; a++) {
        const c = l.points[a], f = r(c.barOffset), h = s.priceToY(c.price);
        a === 0 ? t.moveTo(f, h) : t.lineTo(f, h);
      }
      t.globalAlpha = Math.min(1, Math.max(0, l.opacity)), t.strokeStyle = l.color, t.lineWidth = l.width, t.setLineDash(l.dashed ? [4, 3] : []), t.stroke();
    }
  t.restore();
}
function cc(t, e, o, i, n, s, r, l, a) {
  const c = o ? 0.4 : 1;
  if (t.save(), t.globalAlpha = c, r) {
    const b = Math.round(n) + 0.5;
    t.strokeStyle = e, t.lineWidth = 1, t.setLineDash([5, 4]), t.beginPath(), t.moveTo(0, b), t.lineTo(l, b), t.stroke(), t.setLineDash([]);
  }
  const f = 18, h = Math.round(s), u = 14, p = l + 1, g = a - 1;
  return t.fillStyle = e, t.fillRect(p, h - f / 2, g, f), fc(t, p + u / 2 + 2, h, "#ffffff"), t.font = Wt, t.fillStyle = "#ffffff", t.textAlign = "left", t.textBaseline = "middle", t.fillText(i, p + u + 4, h + 0.5), t.restore(), { x: p, y: h - f / 2, width: g, height: f };
}
function fc(t, e, o, i) {
  t.save(), t.fillStyle = i, t.strokeStyle = i, t.lineWidth = 1, t.lineJoin = "round", t.beginPath(), t.moveTo(e, o - 5), t.lineTo(e, o - 4), t.moveTo(e - 3.5, o + 2), t.quadraticCurveTo(e - 3.5, o - 4, e, o - 4), t.quadraticCurveTo(e + 3.5, o - 4, e + 3.5, o + 2), t.lineTo(e - 3.5, o + 2), t.closePath(), t.fill(), t.beginPath(), t.arc(e, o + 3.2, 1, 0, Math.PI * 2), t.fill(), t.restore();
}
function hc(t, e, o, i, n) {
  t.save(), t.strokeStyle = e.guide, t.lineWidth = 1, t.setLineDash([4, 4]);
  for (const s of n) {
    const r = Math.round(i.priceToY(s)) + 0.5;
    t.beginPath(), t.moveTo(0, r), t.lineTo(o, r), t.stroke();
  }
  t.restore();
}
function hi(t, e, o, i, n, s, r = "A") {
  t.save();
  const l = 3, a = () => {
    t.beginPath(), t.moveTo(o + l, i), t.arcTo(o + n, i, o + n, i + n, l), t.arcTo(o + n, i + n, o, i + n, l), t.arcTo(o, i + n, o, i, l), t.arcTo(o, i, o + n, i, l), t.closePath();
  };
  s ? (a(), t.fillStyle = e.accent, t.fill(), t.fillStyle = "#ffffff") : (a(), t.fillStyle = e.bg, t.fill(), t.strokeStyle = e.accent, t.lineWidth = 1, t.save(), t.beginPath(), t.rect(o + 0.5, i + 0.5, n - 1, n - 1), t.strokeStyle = e.accent, t.stroke(), t.restore(), t.fillStyle = e.accent), t.font = Wt, t.textAlign = "center", t.textBaseline = "middle", t.fillText(r, o + n / 2, i + n / 2 + 0.5), t.restore();
}
function ui(t, e, o, i) {
  t.font = Wt, t.fillStyle = e.mutedText, t.textAlign = "left", t.textBaseline = "middle";
  for (const n of i)
    t.fillText(n.label, o + 7, n.y);
}
function uc(t, e, o, i) {
  t.font = Wt, t.fillStyle = e.mutedText, t.textAlign = "center", t.textBaseline = "middle";
  for (const n of o)
    t.fillText(n.label, n.x, i);
}
function pi(t, e, o, i, n, s, r) {
  const a = Math.round(o);
  t.fillStyle = s, t.fillRect(i + 1, a - 18 / 2, n - 1, 18), t.font = Wt, t.fillStyle = r, t.textAlign = "left", t.textBaseline = "middle", t.fillText(e, i + 7, a + 0.5);
}
function pc(t, e, o, i, n, s) {
  const l = Math.round(o);
  t.fillStyle = s.crosshairTagBg, t.fillRect(i + 1, l - 15 / 2, n - 1, 15), t.font = $a, t.fillStyle = s.crosshairTagText, t.textAlign = "center", t.textBaseline = "middle", t.fillText(e, i + 1 + (n - 1) / 2, l + 0.5);
}
function mc(t, e, o, i, n, s, r) {
  t.font = Wt;
  const l = t.measureText(o).width + 14, a = Math.min(Math.max(i - l / 2, 0), Math.max(0, n - l)), c = 18, f = s + (r - c) / 2 + 1;
  t.fillStyle = e.crosshairTagBg, t.fillRect(a, f, l, c), t.fillStyle = e.crosshairTagText, t.textAlign = "center", t.textBaseline = "middle", t.fillText(o, a + l / 2, f + c / 2 + 0.5);
}
function gc(t, e, o, i) {
  t.save(), t.strokeStyle = e, t.lineWidth = 1, t.setLineDash([1.5, 3]), t.beginPath(), t.moveTo(0, o), t.lineTo(i, o), t.stroke(), t.restore();
}
function yc(t, e, o, i) {
  t.save(), t.strokeStyle = e.crosshair, t.lineWidth = 1, t.setLineDash([3, 3]), t.beginPath(), t.moveTo(o, 0), t.lineTo(o, i), t.stroke(), t.restore();
}
function bc(t, e, o, i) {
  t.save(), t.strokeStyle = e.crosshair, t.lineWidth = 1, t.setLineDash([3, 3]), t.beginPath(), t.moveTo(0, o), t.lineTo(i, o), t.stroke(), t.restore();
}
function dc(t, e, o, i) {
  t.save(), t.strokeStyle = i, t.lineWidth = 1.5, t.beginPath(), t.arc(e, o, 5, 0, Math.PI * 2), t.stroke(), t.restore();
}
function _n(t, e, o, i) {
  t.font = Wt, t.textAlign = "left", t.textBaseline = "middle";
  let n = o;
  for (const s of e)
    t.fillStyle = s.color, t.fillText(s.text, n, i), n += t.measureText(s.text).width + 8;
  return n;
}
function Tc(t, e) {
  let o = !1, i = null;
  const n = (C) => {
    const Y = i || t.getBoundingClientRect();
    return { x: C.clientX - Y.left, y: C.clientY - Y.top };
  }, s = (C) => {
    const { x: Y, y: H } = n(C);
    e.pointerMove(Y, H, C);
  }, r = (C) => {
    o = !1, window.removeEventListener("mousemove", s), window.removeEventListener("mouseup", r);
    const { x: Y, y: H } = n(C);
    e.pointerUp(Y, H, C), i = null;
  }, l = (C) => {
    if (C.button !== 0) return;
    C.preventDefault(), o = !0, i = t.getBoundingClientRect();
    const { x: Y, y: H } = n(C);
    e.pointerDown(Y, H, C), window.addEventListener("mousemove", s), window.addEventListener("mouseup", r);
  }, a = (C) => {
    if (o) return;
    const { x: Y, y: H } = n(C);
    e.pointerMove(Y, H, C);
  }, c = () => {
    o || e.pointerLeave();
  }, f = (C) => {
    C.preventDefault();
    const { x: Y, y: H } = n(C);
    e.wheel(Y, H, C);
  }, h = (C) => {
    const { x: Y, y: H } = n(C);
    e.doubleClick(Y, H, C);
  }, u = (C) => {
    const { x: Y, y: H } = n(C);
    e.contextMenu(Y, H, C);
  }, p = (C) => {
    e.keyDown(C);
  };
  let g = "none", b = 0;
  const P = { button: 0, preventDefault: () => {
  } }, w = (C) => {
    const Y = i || t.getBoundingClientRect();
    return { x: C.clientX - Y.left, y: C.clientY - Y.top };
  }, k = (C) => {
    const Y = w(C.touches[0]), H = w(C.touches[1]);
    return Math.hypot(Y.x - H.x, Y.y - H.y);
  }, R = (C) => {
    if (i = t.getBoundingClientRect(), C.touches.length >= 2)
      C.preventDefault(), g === "pan" && e.pointerUp(0, 0, P), g = "pinch", b = k(C);
    else if (C.touches.length === 1) {
      C.preventDefault(), g = "pan";
      const { x: Y, y: H } = w(C.touches[0]);
      e.pointerDown(Y, H, P);
    }
  }, L = (C) => {
    if (g === "pinch" && C.touches.length >= 2) {
      C.preventDefault();
      const Y = k(C);
      if (b > 0 && Y > 0) {
        const H = w(C.touches[0]), j = w(C.touches[1]);
        e.pinch((H.x + j.x) / 2, Y / b);
      }
      b = Y;
    } else if (g === "pan" && C.touches.length === 1) {
      C.preventDefault();
      const { x: Y, y: H } = w(C.touches[0]);
      e.pointerMove(Y, H, P);
    }
  }, E = (C) => {
    if (g === "pan") {
      const Y = C.changedTouches[0];
      if (Y) {
        const { x: H, y: j } = w(Y);
        e.pointerUp(H, j, P);
      } else e.pointerUp(0, 0, P);
      g = "none";
    } else g === "pinch" && C.touches.length < 2 && (g = "none", b = 0);
    C.touches.length === 0 && (i = null);
  };
  return t.addEventListener("mousedown", l), t.addEventListener("mousemove", a), t.addEventListener("mouseleave", c), t.addEventListener("wheel", f, { passive: !1 }), t.addEventListener("dblclick", h), t.addEventListener("contextmenu", u), t.addEventListener("touchstart", R, { passive: !1 }), t.addEventListener("touchmove", L, { passive: !1 }), t.addEventListener("touchend", E), t.addEventListener("touchcancel", E), window.addEventListener("keydown", p), () => {
    t.removeEventListener("mousedown", l), t.removeEventListener("mousemove", a), t.removeEventListener("mouseleave", c), t.removeEventListener("wheel", f), t.removeEventListener("dblclick", h), t.removeEventListener("contextmenu", u), t.removeEventListener("touchstart", R), t.removeEventListener("touchmove", L), t.removeEventListener("touchend", E), t.removeEventListener("touchcancel", E), window.removeEventListener("keydown", p), window.removeEventListener("mousemove", s), window.removeEventListener("mouseup", r);
  };
}
const Mc = 64, Dn = 26, wc = 110, Wn = 1, $n = 3, Yn = 160, Ke = 5, Sc = 10, Pc = 50, dt = 18, On = 4, Ac = 180, mi = 3, kc = 400, gi = 5;
function ft(t, e, o) {
  return Math.min(Math.max(t, e), o);
}
function Lc(t) {
  let e = Math.floor(t / 1e3);
  const o = Math.floor(e / 86400);
  e -= o * 86400;
  const i = Math.floor(e / 3600);
  e -= i * 3600;
  const n = Math.floor(e / 60), s = e - n * 60, r = (l) => String(l).padStart(2, "0");
  return o > 0 ? `${o}d ${r(i)}:${r(n)}` : i > 0 ? `${i}:${r(n)}:${r(s)}` : `${r(n)}:${r(s)}`;
}
function Ic(t) {
  if (!(t instanceof HTMLElement)) return !1;
  const e = t.tagName;
  return e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || t.isContentEditable;
}
function Mf(t, e) {
  const o = document.createElement("canvas");
  o.style.display = "block", o.style.touchAction = "none";
  const i = o.getContext("2d");
  if (!i) throw new Error("CandL chart: 2d canvas context unavailable");
  const n = i;
  t.appendChild(o);
  let s = e.theme, r = e.pricePrecision, l = e.chartType, a = [], c = [], f = null, h = 0, u = [], p = null, g = !1, b = [], P = null, w = [], k = [], R = null, L = [], E = null, C = null, Y = [], H = !1, j = 6e4, K = "auto", J = null, Yt = !1, cn = null, _e = null, D = null, Z = null, fn = !0, De = !1, Zt = 0, Qt = 1;
  const it = { width: 0, height: 0 }, N = new Ya();
  function We() {
    const m = t.clientWidth, y = t.clientHeight;
    Qt = Math.max(1, window.devicePixelRatio || 1), it.width = m, it.height = y, o.width = Math.max(1, Math.round(m * Qt)), o.height = Math.max(1, Math.round(y * Qt)), o.style.width = `${m}px`, o.style.height = `${y}px`, n.setTransform(Qt, 0, 0, Qt, 0, 0);
  }
  function X() {
    De || Zt !== 0 || (Zt = requestAnimationFrame(() => {
      Zt = 0, Ws();
    }));
  }
  const os = setInterval(X, 1e3);
  function lt() {
    const m = it.width, y = it.height, d = Math.max(0, m - Mc), T = u.filter((V) => V.placement === "pane"), S = T.length, A = Math.max(0, y - Dn), v = Math.max(0, A - S * Wn);
    let F = S > 0 ? wc : 0, W = v - S * F;
    S > 0 && W < 120 && (F = Math.max(40, Math.floor((v - 120) / S)), W = Math.max(0, v - S * F));
    const O = [{ kind: "main", top: 0, height: W }];
    let B = W;
    for (const V of T)
      B += Wn, O.push({ kind: "indicator", top: B, height: F, indicator: V }), B += F;
    return N.plotWidth = d, { width: m, height: y, plotWidth: d, timeAxisTop: A, panes: O };
  }
  function is(m, y) {
    for (let d = 0; d < y.panes.length; d++) {
      const T = y.panes[d];
      if (m >= T.top && m < T.top + T.height) return d;
    }
    return -1;
  }
  function at(m) {
    if (K === "manual" && J !== null)
      return new Me(
        m.top,
        m.height,
        J.min,
        J.max,
        Yt && J.min > 0
      );
    const y = N.visibleRange(), d = y.from, T = Math.min(y.to, pt() - 1);
    let S = 1 / 0, A = -1 / 0;
    if (c.length > 0 && d <= T) {
      const F = l === "line" || l === "area" || l === "linemarkers" || l === "step" || l === "baseline" || l === "columns" || l === "kagi";
      for (let W = d; W <= T; W++) {
        const O = c[W];
        F ? (O.close < S && (S = O.close), O.close > A && (A = O.close)) : (O.low < S && (S = O.low), O.high > A && (A = O.high));
      }
      if (!ie(l)) {
        for (const W of u)
          if (W.placement === "overlay")
            for (const O of W.outputs) {
              const B = Math.min(T, O.values.length - 1);
              for (let V = d; V <= B; V++) {
                const z = O.values[V];
                z == null || !isFinite(z) || (z < S && (S = z), z > A && (A = z));
              }
            }
      }
    }
    if (c.length > 0 && (b.length > 0 || P !== null)) {
      const F = c.length - 1, W = (O) => {
        for (const B of O) {
          const V = F + B.barOffset + 0.5;
          V < N.view.start - 1 || V > N.view.end + 1 || isFinite(B.price) && (B.price < S && (S = B.price), B.price > A && (A = B.price));
        }
      };
      for (const O of b) W(O.points);
      P && (W(P.upper), W(P.lower));
    }
    if ((!isFinite(S) || !isFinite(A)) && (S = 0, A = 1), S === A) {
      const F = Math.abs(S) * 0.01 || 1;
      S -= F, A += F;
    }
    if (Yt && S > 0) {
      const F = Math.log(S), W = Math.log(A), O = (W - F) * 0.08;
      return new Me(m.top, m.height, Math.exp(F - O), Math.exp(W + O), !0);
    }
    const v = (A - S) * 0.08;
    return new Me(m.top, m.height, S - v, A + v);
  }
  function ss(m) {
    const y = m.indicator;
    if (y.range)
      return new Me(m.top, m.height, y.range[0], y.range[1]);
    const d = N.visibleRange(), T = d.from, S = Math.min(d.to, pt() - 1);
    let A = 1 / 0, v = -1 / 0, F = !1;
    for (const O of y.outputs) {
      (O.style ?? "line") === "histogram" && (F = !0);
      const B = Math.min(S, O.values.length - 1);
      for (let V = Math.max(0, T); V <= B; V++) {
        const z = O.values[V];
        z == null || !isFinite(z) || (z < A && (A = z), z > v && (v = z));
      }
    }
    if (F && (A > 0 && (A = 0), v < 0 && (v = 0)), (!isFinite(A) || !isFinite(v)) && (A = 0, v = 1), A === v) {
      const O = Math.abs(A) * 0.01 || 1;
      A -= O, v += O;
    }
    const W = (v - A) * 0.08;
    return new Me(m.top, m.height, A - W, v + W);
  }
  function zt(m) {
    return {
      timeToX: (y) => N.timeToX(y),
      xToTime: (y) => N.xToTime(y),
      priceToY: (y) => m.priceToY(y),
      yToPrice: (y) => m.yToPrice(y)
    };
  }
  let go = null;
  function yo() {
    const m = c.length, y = m > 0 ? c[m - 1] : null, d = go;
    if (d !== null && d.mode === K && d.log === Yt && d.manualMin === (J !== null ? J.min : NaN) && d.manualMax === (J !== null ? J.max : NaN) && d.viewStart === N.view.start && d.viewEnd === N.view.end && d.width === it.width && d.height === it.height && d.seriesRef === c && d.seriesCount === m && d.indicatorsRef === u && d.projLinesRef === b && d.projBandRef === P && d.type === l && (y === null || d.lastHigh === y.high && d.lastLow === y.low && d.lastClose === y.close))
      return d.scale;
    const T = at(lt().panes[0]);
    return go = {
      scale: T,
      viewStart: N.view.start,
      viewEnd: N.view.end,
      width: it.width,
      height: it.height,
      seriesRef: c,
      seriesCount: m,
      lastHigh: y !== null ? y.high : NaN,
      lastLow: y !== null ? y.low : NaN,
      lastClose: y !== null ? y.close : NaN,
      indicatorsRef: u,
      projLinesRef: b,
      projBandRef: P,
      type: l,
      mode: K,
      log: Yt,
      manualMin: J !== null ? J.min : NaN,
      manualMax: J !== null ? J.max : NaN
    }, T;
  }
  const rs = {
    timeToX: (m) => N.timeToX(m),
    xToTime: (m) => N.xToTime(m),
    priceToY: (m) => yo().priceToY(m),
    yToPrice: (m) => yo().yToPrice(m)
  };
  function ls() {
    const m = a.length;
    if (m < 2) {
      j = N.intervalMs || 6e4;
      return;
    }
    const y = [];
    for (let d = 1; d < m; d++) {
      const T = a[d].time - a[d - 1].time;
      T > 0 && y.push(T);
    }
    if (y.length === 0) {
      j = N.intervalMs || 6e4;
      return;
    }
    y.sort((d, T) => d - T), j = y[y.length >> 1];
  }
  function $e() {
    switch (h = 0, l) {
      case "heikin":
        c = Ia(a), f = null;
        break;
      case "renko":
        c = Ca(a, mo(a)), f = null;
        break;
      case "linebreak":
        c = Fa(a, 3), f = null;
        break;
      case "pnf": {
        const m = Ra(a);
        h = m, c = va(a, m, 3), f = null;
        break;
      }
      case "range":
        c = _a(a, Ea(a)), f = null;
        break;
      case "kagi": {
        const m = Da(a, 0.04);
        f = m, c = m.map((y) => ({
          time: y.time,
          open: y.price,
          high: y.price,
          low: y.price,
          close: y.price,
          volume: 0
        }));
        break;
      }
      default:
        c = a, f = null;
        break;
    }
    N.setTimes(c.map((m) => m.time));
  }
  function pt() {
    const m = c.length;
    return p === null ? m : Math.min(p + 1, m);
  }
  function bo() {
    if (p === null) return;
    const m = c.length;
    if (m === 0) {
      p = null;
      return;
    }
    p = ft(p, 0, m - 1);
  }
  function ge() {
    return { candles: a, pricePrecision: r, barMs: j };
  }
  function Ye(m) {
    return R ? R.upColor : m.up;
  }
  function Oe(m) {
    return R ? R.downColor : m.down;
  }
  function as(m) {
    return R ? { ...m, up: R.upColor, down: R.downColor, accent: R.upColor } : m;
  }
  function cs() {
    return R ? R.gridVisible : !0;
  }
  function fs() {
    return R ? R.crosshairVisible : !0;
  }
  function Be(m, y, d) {
    const T = d.xToTime(m), S = d.yToPrice(y);
    if (!H || a.length === 0) return { time: T, price: S, snapped: !1 };
    const A = Math.floor(N.xToIndex(m));
    if (A < 0 || A >= a.length) return { time: T, price: S, snapped: !1 };
    const v = a[A];
    let F = S, W = 1 / 0;
    for (const O of [v.open, v.high, v.low, v.close]) {
      const B = Math.abs(d.priceToY(O) - y);
      B < W && (W = B, F = O);
    }
    return W <= Pc ? { time: T, price: F, snapped: !0 } : { time: T, price: S, snapped: !1 };
  }
  function To() {
    return Math.max(60, Math.round(pt() * 1.2) + Ke * 2);
  }
  function Nt() {
    const m = pt();
    if (m === 0) return;
    let { start: y, end: d } = N.view;
    const T = d - y, S = Math.min(m, 2);
    d < S && (d = S, y = d - T);
    const A = m - 2;
    y > A && (y = A, d = y + T), N.view = { start: y, end: d };
  }
  function hn(m) {
    return Math.min(Ke, Math.max(0, Math.floor(m / 3)));
  }
  function Mo(m) {
    if (p === null || !g || !(p >= m.start && p <= m.end - hn(m.end - m.start))) return;
    let { start: d, end: T } = N.view;
    const S = T - d, A = hn(S);
    p >= d && p <= T - A || (p < d ? (d = p, T = d + S) : (T = p + 1 + A, d = T - S), N.view = { start: d, end: T });
  }
  function xt() {
    var m;
    fn && N.count > 0 && N.view.start <= Sc && (fn = !1, (m = e.onRequestHistory) == null || m.call(e));
  }
  function hs(m) {
    N.view = { start: N.view.start + m, end: N.view.end + m }, Nt(), xt(), X();
  }
  function te() {
    un();
    const m = pt();
    if (m === 0) {
      N.view = { start: -Yn / 2, end: Yn / 2 };
      return;
    }
    const y = m + Ke, d = Math.min(Yn, Math.max($n, m) + Ke);
    N.view = { start: y - d, end: y };
  }
  function us() {
    return at(lt().panes[0]);
  }
  function ps() {
    const m = us();
    J = { min: m.min, max: m.max }, K = "manual";
  }
  function un() {
    K = "auto", J = null;
  }
  function ye() {
    var m;
    (m = e.onDrawingsChange) == null || m.call(e, w.slice());
  }
  function wo(m, y) {
    const d = w.findIndex((T) => T.id === m);
    d >= 0 && (w[d] = y);
  }
  function Ot(m) {
    var d;
    if (E === m) return;
    E = m;
    const y = m !== null ? w.find((T) => T.id === m) ?? null : null;
    (d = e.onSelectionChange) == null || d.call(e, y);
  }
  function ms() {
    var y;
    const m = E !== null ? w.find((d) => d.id === E) ?? null : null;
    (y = e.onSelectionChange) == null || y.call(e, m);
  }
  function So() {
    var m;
    Y = [], C !== null && (C = null, (m = e.onActiveToolChange) == null || m.call(e, null)), X();
  }
  function Po(m) {
    var y, d;
    w.push(m), E = m.id, Y = [], C = null, ye(), (y = e.onActiveToolChange) == null || y.call(e, null), (d = e.onSelectionChange) == null || d.call(e, m);
  }
  function gs(m, y, d) {
    const T = C;
    if (!T) return;
    const S = Je(T);
    if (S < 1) return;
    const A = at(d.panes[0]), v = zt(A), F = Be(m, y, v);
    if (Y.push({ time: F.time, price: F.price }), Y.length >= S) {
      const W = ge();
      let O = Rn(T, Y[0]);
      O.points = Y.slice(0, S);
      const B = po(T);
      B.expandOnCommit && (O = B.expandOnCommit(O, W)), Po(O);
    }
    X();
  }
  function ys(m, y, d) {
    const T = C;
    if (!T) return;
    const S = zt(at(d.panes[0]));
    D = { mode: "freehand", drawing: Rn(T, { time: S.xToTime(m), price: S.yToPrice(y) }), lastPx: m, lastPy: y }, X();
  }
  function bs(m, y) {
    const d = C;
    if (!d) return null;
    const T = Je(d);
    if (T < 1) return null;
    const S = Z !== null && Z.x >= 0 && Z.x <= N.plotWidth && Z.y >= y.top && Z.y < y.top + y.height, A = Y.slice();
    if (S && Z && A.length < T) {
      const F = Be(Z.x, Z.y, m);
      A.push({ time: F.time, price: F.price });
    }
    if (A.length === 0) return null;
    const v = Rn(d, A[0]);
    return v.id = "__preview__", v.points = A, v;
  }
  function He(m, y) {
    for (const d of L)
      if (m >= d.x && m <= d.x + d.width && y >= d.y && y <= d.y + d.height)
        return k.find((T) => T.id === d.id) ?? null;
    return null;
  }
  function Ao(m, y, d, T) {
    if (m < 0 || m > d.plotWidth) return null;
    let S = null, A = gi + 1;
    for (const v of k) {
      const F = T.priceToY(v.price);
      if (F < T.top || F > T.bottom) continue;
      const W = Math.abs(F - y);
      W <= gi && W < A && (S = v, A = W);
    }
    return S;
  }
  function pn(m, y, d) {
    const T = d.panes[0];
    return m > d.plotWidth && m <= d.width && y >= T.top && y < T.top + T.height;
  }
  function mn(m, y) {
    const d = cn;
    return d !== null && m >= d.x && m <= d.x + d.width && y >= d.y && y <= d.y + d.height;
  }
  function ko(m, y) {
    const d = _e;
    return d !== null && m >= d.x && m <= d.x + d.width && y >= d.y && y <= d.y + d.height;
  }
  function Lo(m, y) {
    if (D) return;
    const d = lt();
    if (!C) {
      if (mn(m, y) || ko(m, y)) {
        o.style.cursor = "pointer";
        return;
      }
      if (pn(m, y, d) && He(m, y) === null) {
        o.style.cursor = "ns-resize";
        return;
      }
    }
    if (!(m >= 0 && m <= d.plotWidth && y >= 0 && y < d.timeAxisTop)) {
      o.style.cursor = "default";
      return;
    }
    if (C) {
      o.style.cursor = "crosshair";
      return;
    }
    const S = d.panes[0];
    if (w.length > 0 && y >= S.top && y < S.top + S.height) {
      const A = zt(at(S)), v = ge(), F = E ? w.find((W) => W.id === E) : void 0;
      if (F && li(F, m, y, A, v) >= 0) {
        o.style.cursor = "pointer";
        return;
      }
      for (let W = w.length - 1; W >= 0; W--)
        if (ri(w[W], m, y, A, v)) {
          o.style.cursor = "pointer";
          return;
        }
    }
    if (k.length > 0) {
      if (He(m, y) !== null) {
        o.style.cursor = "pointer";
        return;
      }
      const A = at(S);
      if (Ao(m, y, d, A) !== null) {
        o.style.cursor = "grab";
        return;
      }
    }
    o.style.cursor = "crosshair";
  }
  function ds(m, y, d) {
    var v;
    if (d.button !== 0) return;
    const T = lt(), S = T.panes[0], A = m >= 0 && m <= T.plotWidth && y >= S.top && y < S.top + S.height;
    if (C) {
      A && (Je(C) === -1 ? ys(m, y, T) : gs(m, y, T));
      return;
    }
    if (mn(m, y)) {
      K === "manual" ? un() : ps(), X();
      return;
    }
    if (ko(m, y)) {
      Yt = !Yt, X();
      return;
    }
    if (pn(m, y, T) && He(m, y) === null) {
      const F = at(S), W = F.yToPrice(ft(y, F.top, F.bottom));
      D = { mode: "scale-axis", startMin: F.min, startMax: F.max, anchorPrice: W, startY: y }, J = { min: F.min, max: F.max }, K = "manual", o.style.cursor = "ns-resize", X();
      return;
    }
    if (k.length > 0) {
      const F = He(m, y);
      if (F) {
        (v = e.onAlertRemove) == null || v.call(e, F.id);
        return;
      }
    }
    if (A && w.length > 0) {
      const F = zt(at(S)), W = ge(), O = E ? w.find((B) => B.id === E) : void 0;
      if (O) {
        const B = li(O, m, y, F, W);
        if (B >= 0) {
          D = { mode: "move-handle", id: O.id, original: O, handleIndex: B, moved: !1 }, X();
          return;
        }
      }
      for (let B = w.length - 1; B >= 0; B--) {
        const V = w[B];
        if (ri(V, m, y, F, W)) {
          Ot(V.id), D = {
            mode: "move-drawing",
            id: V.id,
            original: V,
            startTime: F.xToTime(m),
            startPrice: F.yToPrice(y),
            moved: !1
          }, X();
          return;
        }
      }
    }
    if (A && k.length > 0) {
      const F = at(S), W = Ao(m, y, T, F);
      if (W) {
        D = { mode: "move-alert", id: W.id, price: W.price, moved: !1 }, o.style.cursor = "grabbing", X();
        return;
      }
    }
    A && w.length > 0 && E && (Ot(null), X()), D = { mode: "pan", lastX: m, lastY: y }, o.style.cursor = "grabbing";
  }
  function Ts(m, y, d) {
    if (Z = { x: m, y }, D)
      if (D.mode === "pan") {
        const T = N.barSpacing();
        if (T > 0) {
          const S = (m - D.lastX) / T;
          D.lastX = m, S !== 0 && hs(-S);
        }
        if (K === "manual" && J !== null) {
          const S = y - D.lastY;
          if (S !== 0) {
            const A = lt().panes[0], v = J.max - J.min, F = S / Math.max(1, A.height) * v;
            J = { min: J.min + F, max: J.max + F };
          }
        }
        D.lastY = y;
      } else if (D.mode === "scale-axis") {
        const T = y - D.startY, S = Math.exp(T / Ac), A = D.anchorPrice - (D.anchorPrice - D.startMin) * S, v = D.anchorPrice + (D.startMax - D.anchorPrice) * S;
        v - A > 1e-12 && isFinite(A) && isFinite(v) && (J = { min: A, max: v });
      } else {
        const T = lt(), S = at(T.panes[0]), A = zt(S);
        if (D.mode === "freehand") {
          const v = m - D.lastPx, F = y - D.lastPy;
          D.drawing.points.length < kc && v * v + F * F >= mi * mi && (D.drawing.points.push({ time: A.xToTime(m), price: A.yToPrice(y) }), D.lastPx = m, D.lastPy = y);
        } else if (D.mode === "move-drawing") {
          const v = A.xToTime(m), F = A.yToPrice(y);
          wo(D.id, Aa(D.original, v - D.startTime, F - D.startPrice)), D.moved = !0;
        } else if (D.mode === "move-alert") {
          const v = ft(y, S.top, S.bottom);
          D.price = S.yToPrice(v), D.moved = !0, o.style.cursor = "grabbing";
        } else {
          const v = Be(m, y, A);
          wo(
            D.id,
            ka(D.original, D.handleIndex, { time: v.time, price: v.price }, ge())
          ), D.moved = !0;
        }
      }
    else
      Lo(m, y);
    X();
  }
  function Ms(m, y, d) {
    var T;
    D && (D.mode === "freehand" ? D.drawing.points.length >= 2 && Po(D.drawing) : D.mode === "move-alert" ? D.moved && ((T = e.onAlertMove) == null || T.call(e, D.id, D.price)) : (D.mode === "move-drawing" || D.mode === "move-handle") && D.moved && (ye(), ms())), D = null, Z && Lo(Z.x, Z.y), X();
  }
  function ws() {
    Z = null, X();
  }
  function Ss(m, y, d) {
    const T = lt();
    if (T.plotWidth <= 0) return;
    if (Math.abs(d.deltaX) > Math.abs(d.deltaY) && !d.ctrlKey) {
      const z = N.range / T.plotWidth, mt = d.deltaX * z;
      N.view = { start: N.view.start + mt, end: N.view.end + mt }, Nt(), xt(), X();
      return;
    }
    const S = N.range, A = Math.exp(-d.deltaY * 12e-4), v = ft(S / A, $n, To());
    if (v === S) return;
    const F = ft(m, 0, T.plotWidth), W = N.xToIndex(F), O = F / T.plotWidth, B = W - O * v, V = N.view;
    N.view = { start: B, end: B + v }, Mo(V), Nt(), xt(), X();
  }
  function Ps(m, y) {
    const d = lt();
    if (d.plotWidth <= 0 || !(y > 0)) return;
    const T = N.range, S = ft(T / y, $n, To());
    if (S === T) return;
    const A = ft(m, 0, d.plotWidth), v = N.xToIndex(A), F = A / d.plotWidth, W = v - F * S, O = N.view;
    N.view = { start: W, end: W + S }, Mo(O), Nt(), xt(), X();
  }
  function As(m, y, d) {
    const T = lt();
    if (!C && (mn(m, y) || pn(m, y, T))) {
      un(), X();
      return;
    }
    te(), X();
  }
  function ks(m, y, d) {
    if (d.preventDefault(), !e.onContextMenu) return;
    const T = lt(), A = at(T.panes[0]).yToPrice(y), v = N.xToTime(m);
    e.onContextMenu({ x: m, y, price: A, time: v });
  }
  function Ls(m) {
    Ic(m.target) || (m.key === "Escape" ? D !== null && D.mode === "freehand" ? (D = null, So()) : C !== null || Y.length > 0 ? So() : E && (Ot(null), X()) : (m.key === "Delete" || m.key === "Backspace") && E && (w = w.filter((y) => y.id !== E), Ot(null), ye(), X(), m.preventDefault()));
  }
  const Is = Tc(o, {
    pointerDown: ds,
    pointerMove: Ts,
    pointerUp: Ms,
    pointerLeave: ws,
    wheel: Ss,
    pinch: Ps,
    doubleClick: As,
    contextMenu: ks,
    keyDown: Ls
  }), Io = new ResizeObserver(() => {
    We(), X();
  });
  Io.observe(t);
  function Ns(m) {
    const y = Math.abs(m) >= 1 ? 2 : 4;
    return m.toLocaleString("en-US", { minimumFractionDigits: y, maximumFractionDigits: y });
  }
  function Cs(m, y) {
    const d = y.length >= 2 ? y[1] - y[0] : Jn((m.max - m.min) / 8 || 1), T = ai(d);
    return y.map((S) => ({
      y: Math.round(m.priceToY(S)),
      label: S.toLocaleString("en-US", { minimumFractionDigits: T, maximumFractionDigits: T })
    }));
  }
  function Fs(m, y) {
    const d = ai(Jn((y.max - y.min) / 8 || 1));
    return m.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
  }
  function gn(m, y) {
    n.beginPath(), n.rect(0, m.top, y.plotWidth, m.height), n.clip();
  }
  function Rs(m, y, d, T) {
    const S = c;
    switch (l) {
      case "candles":
        En(n, S, d, T, N, m, y);
        break;
      case "volcandles":
        ja(n, S, d, T, N, m, y);
        break;
      case "hlcarea":
        Qa(n, S, d, T, N, m, y);
        break;
      case "hollow":
        za(n, S, d, T, N, m, y);
        break;
      case "heikin":
        En(n, S, d, T, N, m, y);
        break;
      case "bars":
        Ja(n, S, d, T, N, m, y);
        break;
      case "hlcbars":
        xa(n, S, d, T, N, m, y);
        break;
      case "line":
        Ka(n, S, d, T, N, m, y);
        break;
      case "linemarkers":
        tc(n, S, d, T, N, m, y);
        break;
      case "step":
        ec(n, S, d, T, N, m, y);
        break;
      case "area":
        Za(n, S, d, T, N, m, y);
        break;
      case "baseline": {
        const A = S[d].close;
        nc(n, S, d, T, N, m, y, A);
        break;
      }
      case "columns":
        oc(n, S, d, T, N, m, y);
        break;
      case "highlow":
        ic(n, S, d, T, N, m, y);
        break;
      case "renko":
      case "linebreak":
        sc(n, S, d, T, N, m, y);
        break;
      case "range":
        En(n, S, d, T, N, m, y);
        break;
      case "pnf":
        rc(n, S, d, T, N, m, y, h);
        break;
      case "kagi":
        if (f) {
          const A = T >= f.length - 1 ? f : f.slice(0, T + 1);
          lc(n, A, N, m, y);
        }
        break;
    }
  }
  function vs(m, y, d) {
    const T = pt();
    if (T === 0) return;
    const S = c[T - 1], A = T > 1 ? c[T - 2].close : S.open, v = S.close >= A ? Ye(d) : Oe(d), F = y.priceToY(S.close);
    F >= y.top && F <= y.bottom && gc(n, v, Math.round(F) + 0.5, m.plotWidth);
    const W = ft(F, y.top + 9, y.bottom - 9);
    if (pi(
      n,
      we(S.close, r),
      W,
      m.plotWidth,
      m.width - m.plotWidth,
      v,
      "#ffffff"
    ), p === null && !ie(l) && a.length > 0 && N.intervalMs > 0) {
      const O = a[a.length - 1].time + N.intervalMs - Date.now();
      if (O > 0 && O <= N.intervalMs + 6e4) {
        let B = W + 9 + 8;
        B + 8 > y.bottom && (B = W - 9 - 8), pc(
          n,
          Lc(O),
          B,
          m.plotWidth,
          m.width - m.plotWidth,
          d
        );
      }
    }
  }
  function Es(m, y, d) {
    if (L = [], k.length === 0) return;
    const T = m.width - m.plotWidth, S = D !== null && D.mode === "move-alert" ? D : null;
    for (const A of k) {
      const v = S !== null && S.id === A.id ? S.price : A.price, F = y.priceToY(v), W = ft(F, y.top + 9, y.bottom - 9), O = A.condition === "above" ? Ye(d) : Oe(d), B = F >= y.top && F <= y.bottom, V = cc(
        n,
        O,
        A.triggered,
        we(v, r),
        F,
        W,
        B,
        m.plotWidth,
        T
      );
      L.push({ id: A.id, x: V.x, y: V.y, width: V.width, height: V.height });
    }
  }
  function _s(m, y, d) {
    const T = pt();
    if (T === 0) return;
    const S = d ?? T - 1, A = c[S], v = 10, F = 16;
    let W = m.panes[0].top + 12;
    const O = A.close >= A.open ? Ye(y) : Oe(y), B = S > 0 ? c[S - 1].close : A.open, V = B !== 0 ? (A.close - B) / B * 100 : 0, z = V >= 0 ? Ye(y) : Oe(y), mt = (bt) => we(bt, r);
    if (_n(
      n,
      [
        { text: "O", color: y.mutedText },
        { text: mt(A.open), color: O },
        { text: "H", color: y.mutedText },
        { text: mt(A.high), color: O },
        { text: "L", color: y.mutedText },
        { text: mt(A.low), color: O },
        { text: "C", color: y.mutedText },
        { text: mt(A.close), color: O },
        { text: `${V >= 0 ? "+" : ""}${V.toFixed(2)}%`, color: z },
        { text: "Vol", color: y.mutedText },
        { text: Oa(A.volume), color: O }
      ],
      v,
      W
    ), W += F, !ie(l)) {
      for (const bt of u) {
        if (bt.placement !== "overlay") continue;
        const Ct = [{ text: bt.label, color: y.mutedText }];
        for (const Ft of bt.outputs) {
          const kt = S < Ft.values.length ? Ft.values[S] : null;
          Ct.push({ text: kt == null || !isFinite(kt) ? "—" : mt(kt), color: Ft.color });
        }
        _n(n, Ct, v, W), W += F;
      }
      for (let bt = 1; bt < m.panes.length; bt++) {
        const Ct = m.panes[bt], Ft = Ct.indicator, kt = [{ text: Ft.label, color: y.mutedText }];
        for (const U of Ft.outputs) {
          const x = S < U.values.length ? U.values[S] : null;
          kt.push({ text: x == null || !isFinite(x) ? "—" : Ns(x), color: U.color });
        }
        _n(n, kt, v, Ct.top + 12);
      }
    }
  }
  function Ds(m, y, d) {
    if (!Z) return;
    const { x: T, y: S } = Z;
    if (T < 0 || T > m.plotWidth || S < 0 || S >= m.timeAxisTop) return;
    const A = Math.floor(N.xToIndex(T)), v = Math.round(N.centerX(A)) + 0.5;
    yc(n, d, v, m.timeAxisTop), N.count > 0 && mc(
      n,
      d,
      Va(N.indexToTime(A), N.intervalMs),
      Math.round(N.centerX(A)),
      m.plotWidth,
      m.timeAxisTop,
      Dn
    );
    const F = is(S, m);
    if (F >= 0 && F < y.length) {
      bc(n, d, Math.round(S) + 0.5, m.plotWidth);
      const W = y[F], O = W.yToPrice(S), B = F === 0 ? we(O, r) : Fs(O, W);
      pi(
        n,
        B,
        S,
        m.plotWidth,
        m.width - m.plotWidth,
        d.crosshairTagBg,
        d.crosshairTagText
      );
    }
  }
  function Ws() {
    var kt;
    if (De || ((window.devicePixelRatio || 1) !== Qt && We(), it.width <= 0 || it.height <= 0)) return;
    const m = Wa[s], y = as(m), d = cs(), T = lt();
    n.save(), n.font = Wt, n.fillStyle = m.bg, n.fillRect(0, 0, T.width, T.height);
    const S = Ha(N);
    d && Ga(n, m, S, T.timeAxisTop);
    const { from: A, to: v } = N.visibleRange(), F = Math.min(v, pt() - 1), W = pt() > 0 && A <= F, O = ie(l), B = T.panes[0], V = at(B), z = [V], mt = V.ticks(Math.pow(10, -r));
    if (d && ci(n, m, T.plotWidth, V, mt), W && B.height > 0 && T.plotWidth > 0) {
      if (n.save(), gn(B, T), Rs(V, y, A, F), !O) {
        for (const U of u)
          if (U.placement === "overlay")
            for (const x of U.outputs)
              fi(n, x, A, F, N, V);
      }
      (b.length > 0 || P !== null) && ac(n, b, P, pt() - 1, N, V), n.restore();
    }
    for (let U = 1; U < T.panes.length; U++) {
      const x = T.panes[U], ct = ss(x);
      z.push(ct);
      const ee = ct.ticks();
      d && ci(n, m, T.plotWidth, ct, ee);
      const ne = x.indicator;
      if (ne.range && ne.range[0] === 0 && ne.range[1] === 100 && hc(n, m, T.plotWidth, ct, [30, 70]), !O && x.height > 0 && T.plotWidth > 0) {
        n.save(), gn(x, T);
        for (const yn of ne.outputs)
          fi(n, yn, A, F, N, ct);
        n.restore();
      }
      qa(n, m, x.top - Wn, T.width);
    }
    Ua(n, m, T.plotWidth, T.timeAxisTop, T.width, T.height), ui(
      n,
      m,
      T.plotWidth,
      mt.map((U) => ({ y: Math.round(V.priceToY(U)), label: we(U, r) }))
    );
    for (let U = 1; U < T.panes.length; U++)
      ui(n, m, T.plotWidth, Cs(z[U], z[U].ticks()));
    if (T.width - T.plotWidth > dt + On && B.height > dt) {
      const U = T.plotWidth + On + 1, x = B.top + On;
      hi(n, m, U, x, dt, K === "auto"), cn = { x: U, y: x, width: dt, height: dt };
      const ct = x + dt + 4;
      B.top + B.height > ct + dt ? (hi(n, m, U, ct, dt, Yt, "L"), _e = { x: U, y: ct, width: dt, height: dt }) : _e = null;
    } else
      cn = null, _e = null;
    const Ct = [];
    for (let U = 0; U < S.length; U++)
      Ct.push({
        x: S[U].x,
        label: Xa(S[U].time, U > 0 ? S[U - 1].time : null, N.intervalMs)
      });
    if (uc(n, m, Ct, T.timeAxisTop + Dn / 2 + 1), W && vs(T, V, m), Es(T, V, m), B.height > 0 && T.plotWidth > 0) {
      const U = zt(V), x = ge();
      n.save(), gn(B, T);
      for (const ee of w)
        vn(n, ee, U, ee.id === E, x);
      const ct = bs(U, B);
      if (ct && vn(n, ct, U, !1, x), D !== null && D.mode === "freehand" && vn(n, D.drawing, U, !1, x), H && Z) {
        const ee = C !== null && Je(C) >= 1, ne = D !== null && D.mode === "move-handle", yn = Z.x >= 0 && Z.x <= T.plotWidth && Z.y >= B.top && Z.y < B.top + B.height;
        if (ee && yn || ne) {
          const Co = Be(Z.x, Z.y, U);
          Co.snapped && dc(n, Z.x, U.priceToY(Co.price), y.accent);
        }
      }
      n.restore();
    }
    const Ft = Z && W && Z.x >= 0 && Z.x <= T.plotWidth && Z.y < T.timeAxisTop ? ft(Math.floor(N.xToIndex(Z.x)), 0, pt() - 1) : null;
    fs() && Ds(T, z, m), _s(T, m, Ft), n.restore(), (kt = e.onRender) == null || kt.call(e);
  }
  const No = {
    setData(m) {
      const y = c, d = y.length, T = { ...N.view };
      a = m.slice(), ls(), $e();
      const S = c.length;
      if (d === 0 || S === 0)
        te();
      else {
        const A = c[S - 1].time === y[d - 1].time, v = S - d;
        A ? N.view = { start: T.start + v, end: T.end + v } : c[0].time === y[0].time ? N.view = T : te();
      }
      fn = !0, bo(), X();
    },
    updateLast(m) {
      const y = a.length;
      if (y === 0) {
        No.setData([m]);
        return;
      }
      const d = c.length, T = N.view.end >= d - 0.5, S = a[y - 1];
      if (m.time === S.time)
        a[y - 1] = m;
      else if (m.time > S.time)
        a.push(m);
      else
        return;
      $e();
      const A = c.length - d;
      T && A > 0 && (N.view = { start: N.view.start + A, end: N.view.end + A }), bo(), X();
    },
    setIndicators(m) {
      u = m.slice(), X();
    },
    setChartType(m) {
      if (m === l) {
        X();
        return;
      }
      const y = c.length, d = ie(m) !== ie(l);
      l = m, $e(), d || c.length !== y ? te() : Nt(), X();
    },
    setTheme(m) {
      s = m, X();
    },
    setPricePrecision(m) {
      r = m, X();
    },
    setActiveTool(m) {
      C = m, Y = [], D !== null && D.mode === "freehand" && (D = null), m !== null && Ot(null), X();
    },
    setDrawings(m) {
      w = m.slice(), E && !w.some((y) => y.id === E) && Ot(null), X();
    },
    updateDrawing(m) {
      const y = w.findIndex((d) => d.id === m.id);
      y < 0 || (w[y] = m, ye(), X());
    },
    setMagnet(m) {
      H = m, X();
    },
    setAlerts(m) {
      if (D !== null && D.mode === "move-alert") {
        const y = D.id;
        m.some((d) => d.id === y) || (D = null);
      }
      k = m.slice(), X();
    },
    setSettings(m) {
      R = { ...m }, X();
    },
    clearDrawings() {
      w.length !== 0 && (w = [], Ot(null), ye(), X());
    },
    resetView() {
      te(), X();
    },
    resize() {
      We(), X();
    },
    destroy() {
      De || (De = !0, clearInterval(os), Zt !== 0 && cancelAnimationFrame(Zt), Zt = 0, Is(), Io.disconnect(), o.remove());
    },
    setProjections(m, y) {
      b = m.slice(), P = y ?? null;
      const d = N.count;
      if (b.length > 0 && d > 0 && N.view.end >= d - 0.5) {
        let T = 0;
        for (const A of b)
          for (const v of A.points) v.barOffset > T && (T = v.barOffset);
        if (P) {
          for (const A of P.upper) A.barOffset > T && (T = A.barOffset);
          for (const A of P.lower) A.barOffset > T && (T = A.barOffset);
        }
        const S = d + T + 3;
        if (N.view.end < S) {
          const A = N.range;
          N.view = { start: S - A, end: S }, Nt();
        }
      }
      X();
    },
    scrollToTime(m) {
      const y = c.length;
      if (y === 0) return;
      const d = ft(Math.round(N.timeToIndex(m)), 0, y - 1), T = N.range, S = d + 0.5;
      N.view = { start: S - T / 2, end: S + T / 2 }, Nt(), xt(), X();
    },
    setReplayCursor(m) {
      if (m === null) {
        if (p === null) return;
        p = null, X();
        return;
      }
      const y = c.length, d = y === 0 ? 0 : ft(Math.round(m), 0, y - 1), T = p === null;
      if (!(!T && d === p)) {
        if (p = d, y > 0) {
          const S = N.view.end - N.view.start, A = hn(S), v = d >= N.view.start && d <= N.view.end - A;
          if (T || !v) {
            const F = d + 1 + A;
            N.view = { start: F - S, end: F }, Nt(), xt();
          }
        }
        X();
      }
    },
    setReplayPlaying(m) {
      g = m;
    },
    getMainConverters() {
      return it.width <= 0 || it.height <= 0 ? null : rs;
    },
    getMainPaneRect() {
      if (it.width <= 0 || it.height <= 0) return null;
      const m = lt().panes[0];
      return { x: 0, y: m.top, width: N.plotWidth, height: m.height };
    }
  };
  return We(), $e(), te(), X(), No;
}
function ut(t, e, o, i = 1) {
  const n = t[e], s = typeof n == "number" && Number.isFinite(n) ? Math.floor(n) : o;
  return Math.max(i, s);
}
function Nc(t, e, o, i = 0) {
  const n = t[e], s = typeof n == "number" && Number.isFinite(n) ? n : o;
  return Math.max(i, s);
}
function Ee(t) {
  return t.map((e) => e.close);
}
function rn(t, e) {
  const o = new Array(t.length).fill(null);
  if (e <= 0) return o;
  let i = 0, n = 0;
  for (let s = 0; s < t.length; s++) {
    const r = t[s];
    if (r == null ? n++ : i += r, s >= e) {
      const l = t[s - e];
      l == null ? n-- : i -= l;
    }
    s >= e - 1 && n === 0 && (o[s] = i / e);
  }
  return o;
}
function Qe(t, e) {
  const o = new Array(t.length).fill(null);
  if (e <= 0) return o;
  const i = 2 / (e + 1);
  let n = null, s = 0, r = 0;
  for (let l = 0; l < t.length; l++) {
    const a = t[l];
    if (a == null) {
      n = null, s = 0, r = 0;
      continue;
    }
    n !== null ? (n = (a - n) * i + n, o[l] = n) : (s += a, r++, r === e && (n = s / e, o[l] = n));
  }
  return o;
}
function Zn(t, e) {
  const o = new Array(t.length).fill(null);
  if (e <= 0) return o;
  let i = null, n = 0, s = 0;
  for (let r = 0; r < t.length; r++) {
    const l = t[r];
    if (l == null) {
      i = null, n = 0, s = 0;
      continue;
    }
    i !== null ? (i = (i * (e - 1) + l) / e, o[r] = i) : (n += l, s++, s === e && (i = n / e, o[r] = i));
  }
  return o;
}
const Cc = {
  id: "sma",
  label: "Simple Moving Average",
  shortLabel: "SMA",
  placement: "overlay",
  params: [{ key: "period", label: "Period", default: 20, min: 1, max: 500, step: 1 }],
  compute(t, e) {
    const o = ut(e, "period", 20);
    return [
      {
        name: "sma",
        values: rn(Ee(t), o),
        color: "#2962FF"
      }
    ];
  }
}, Fc = {
  id: "ema",
  label: "Exponential Moving Average",
  shortLabel: "EMA",
  placement: "overlay",
  params: [{ key: "period", label: "Period", default: 20, min: 1, max: 500, step: 1 }],
  compute(t, e) {
    const o = ut(e, "period", 20);
    return [
      {
        name: "ema",
        values: Qe(Ee(t), o),
        color: "#FF6D00"
      }
    ];
  }
}, Rc = {
  id: "wma",
  label: "Weighted Moving Average",
  shortLabel: "WMA",
  placement: "overlay",
  params: [{ key: "period", label: "Period", default: 20, min: 1, max: 500, step: 1 }],
  compute(t, e) {
    const o = ut(e, "period", 20), i = Ee(t), n = new Array(i.length).fill(null), s = o * (o + 1) / 2;
    for (let r = o - 1; r < i.length; r++) {
      let l = 0;
      for (let a = 0; a < o; a++)
        l += i[r - o + 1 + a] * (a + 1);
      n[r] = l / s;
    }
    return [
      {
        name: "wma",
        values: n,
        color: "#9C27B0"
      }
    ];
  }
}, vc = {
  id: "bollinger",
  label: "Bollinger Bands",
  shortLabel: "BB",
  placement: "overlay",
  params: [
    { key: "period", label: "Period", default: 20, min: 1, max: 500, step: 1 },
    { key: "stdDev", label: "StdDev", default: 2, min: 0.1, max: 10, step: 0.1 }
  ],
  compute(t, e) {
    const o = ut(e, "period", 20), i = Nc(e, "stdDev", 2, 0), n = Ee(t), s = rn(n, o), r = new Array(n.length).fill(null), l = new Array(n.length).fill(null);
    for (let a = o - 1; a < n.length; a++) {
      const c = s[a];
      if (c === null) continue;
      let f = 0;
      for (let u = a - o + 1; u <= a; u++) {
        const p = n[u] - c;
        f += p * p;
      }
      const h = Math.sqrt(f / o);
      r[a] = c + i * h, l[a] = c - i * h;
    }
    return [
      { name: "basis", values: s, color: "#FF9800" },
      { name: "upper", values: r, color: "#26A69A" },
      { name: "lower", values: l, color: "#EF5350" }
    ];
  }
}, Ec = {
  id: "vwap",
  label: "Volume Weighted Average Price",
  shortLabel: "VWAP",
  placement: "overlay",
  params: [],
  compute(t, e) {
    const o = new Array(t.length).fill(null);
    let i = 0, n = 0;
    for (let s = 0; s < t.length; s++) {
      const r = t[s], l = (r.high + r.low + r.close) / 3;
      i += l * r.volume, n += r.volume, o[s] = n > 0 ? i / n : null;
    }
    return [{ name: "vwap", values: o, color: "#E91E63" }];
  }
}, _c = {
  id: "rsi",
  label: "Relative Strength Index",
  shortLabel: "RSI",
  placement: "pane",
  params: [{ key: "period", label: "Period", default: 14, min: 1, max: 500, step: 1 }],
  range: [0, 100],
  compute(t, e) {
    const o = ut(e, "period", 14), i = t.length, n = new Array(i).fill(null), s = new Array(i).fill(null);
    for (let c = 1; c < i; c++) {
      const f = t[c].close - t[c - 1].close;
      n[c] = f > 0 ? f : 0, s[c] = f < 0 ? -f : 0;
    }
    const r = Zn(n, o), l = Zn(s, o), a = new Array(i).fill(null);
    for (let c = 0; c < i; c++) {
      const f = r[c], h = l[c];
      f === null || h === null || (h === 0 ? a[c] = f === 0 ? 50 : 100 : a[c] = 100 - 100 / (1 + f / h));
    }
    return [{ name: "rsi", values: a, color: "#7E57C2" }];
  }
}, Dc = {
  id: "macd",
  label: "MACD",
  shortLabel: "MACD",
  placement: "pane",
  params: [
    { key: "fast", label: "Fast", default: 12, min: 1, max: 500, step: 1 },
    { key: "slow", label: "Slow", default: 26, min: 1, max: 500, step: 1 },
    { key: "signal", label: "Signal", default: 9, min: 1, max: 500, step: 1 }
  ],
  compute(t, e) {
    const o = ut(e, "fast", 12), i = ut(e, "slow", 26), n = ut(e, "signal", 9), s = Ee(t), r = s.length, l = Qe(s, o), a = Qe(s, i), c = new Array(r).fill(null);
    for (let u = 0; u < r; u++) {
      const p = l[u], g = a[u];
      p !== null && g !== null && (c[u] = p - g);
    }
    const f = Qe(c, n), h = new Array(r).fill(null);
    for (let u = 0; u < r; u++) {
      const p = c[u], g = f[u];
      p !== null && g !== null && (h[u] = p - g);
    }
    return [
      { name: "histogram", values: h, color: "#26A69A", style: "histogram" },
      { name: "macd", values: c, color: "#2962FF" },
      { name: "signal", values: f, color: "#FF6D00" }
    ];
  }
}, Wc = {
  id: "stochastic",
  label: "Stochastic Oscillator",
  shortLabel: "Stoch",
  placement: "pane",
  params: [
    { key: "kPeriod", label: "%K Period", default: 14, min: 1, max: 500, step: 1 },
    { key: "dPeriod", label: "%D Period", default: 3, min: 1, max: 500, step: 1 },
    { key: "smooth", label: "Smooth", default: 3, min: 1, max: 500, step: 1 }
  ],
  range: [0, 100],
  compute(t, e) {
    const o = ut(e, "kPeriod", 14), i = ut(e, "dPeriod", 3), n = ut(e, "smooth", 3), s = t.length, r = new Array(s).fill(null);
    for (let c = o - 1; c < s; c++) {
      let f = -1 / 0, h = 1 / 0;
      for (let p = c - o + 1; p <= c; p++) {
        const g = t[p];
        g.high > f && (f = g.high), g.low < h && (h = g.low);
      }
      const u = f - h;
      r[c] = u > 0 ? 100 * (t[c].close - h) / u : 50;
    }
    const l = rn(r, n), a = rn(l, i);
    return [
      { name: "k", values: l, color: "#2962FF" },
      { name: "d", values: a, color: "#FF6D00" }
    ];
  }
}, $c = {
  id: "atr",
  label: "Average True Range",
  shortLabel: "ATR",
  placement: "pane",
  params: [{ key: "period", label: "Period", default: 14, min: 1, max: 500, step: 1 }],
  compute(t, e) {
    const o = ut(e, "period", 14), i = t.length, n = new Array(i).fill(null);
    for (let s = 0; s < i; s++) {
      const r = t[s];
      if (s === 0)
        n[s] = r.high - r.low;
      else {
        const l = t[s - 1].close;
        n[s] = Math.max(
          r.high - r.low,
          Math.abs(r.high - l),
          Math.abs(r.low - l)
        );
      }
    }
    return [{ name: "atr", values: Zn(n, o), color: "#EF5350" }];
  }
}, Yc = {
  id: "obv",
  label: "On-Balance Volume",
  shortLabel: "OBV",
  placement: "pane",
  params: [],
  compute(t, e) {
    const o = t.length, i = new Array(o).fill(null);
    let n = 0;
    for (let s = 0; s < o; s++) {
      if (s > 0) {
        const r = t[s].close - t[s - 1].close;
        r > 0 ? n += t[s].volume : r < 0 && (n -= t[s].volume);
      }
      i[s] = n;
    }
    return [{ name: "obv", values: i, color: "#26A69A" }];
  }
}, Oc = {
  id: "volume",
  label: "Volume",
  shortLabel: "Vol",
  placement: "pane",
  params: [],
  compute(t, e) {
    const o = t.length, i = new Array(o).fill(null), n = new Array(o).fill(null);
    for (let s = 0; s < o; s++) {
      const r = t[s];
      r.close >= r.open ? i[s] = r.volume : n[s] = r.volume;
    }
    return [
      { name: "up", values: i, color: "#26a69a", style: "histogram" },
      { name: "down", values: n, color: "#ef5350", style: "histogram" }
    ];
  }
}, Bc = {
  id: "cvd",
  label: "Cumulative Volume Delta",
  shortLabel: "CVD",
  placement: "pane",
  params: [],
  compute(t, e) {
    const o = t.length, i = new Array(o).fill(null);
    let n = 0;
    for (let s = 0; s < o; s++) {
      const r = t[s], l = r.high - r.low, a = l > 0 ? Hc(2 * (r.close - r.low) / l - 1, -1, 1) : 0;
      n += r.volume * a, i[s] = n;
    }
    return [{ name: "cvd", values: i, color: "#2962ff", style: "line" }];
  }
};
function Hc(t, e, o) {
  return t < e ? e : t > o ? o : t;
}
const Xc = [
  Oc,
  Cc,
  Fc,
  Rc,
  vc,
  Ec,
  _c,
  Dc,
  Wc,
  $c,
  Yc,
  Bc
], Vc = new Map(Xc.map((t) => [t.id, t]));
function wf(t) {
  return Vc.get(t);
}
function zi(t) {
  const e = t.length, o = new Array(e);
  if (e === 0) return o;
  let i = 0;
  for (let a = 0; a < e; a++) i += t[a];
  const n = i / e;
  let s = 0;
  for (let a = 0; a < e; a++) {
    const c = t[a] - n;
    s += c * c;
  }
  const r = Math.sqrt(s / e);
  if (!(r > 0) || !Number.isFinite(r) || !Number.isFinite(n)) {
    for (let a = 0; a < e; a++) o[a] = 0;
    return o;
  }
  const l = 1 / r;
  for (let a = 0; a < e; a++) o[a] = (t[a] - n) * l;
  return o;
}
function xi(t, e, o) {
  const i = e.length, n = t.length, s = Math.floor(o.k), r = Math.max(1, Math.floor(o.minGap ?? i)), l = Math.max(0, Math.floor(o.excludeTail ?? 0));
  if (s < 1 || i < 2) return [];
  const a = n - l - i;
  if (a < 0) return [];
  const c = a + 1, f = zi(e);
  for (let L = 0; L < i; L++)
    if (!Number.isFinite(f[L])) return [];
  const h = new Float64Array(n), u = new Int32Array(n + 1);
  for (let L = 0; L < n; L++) {
    const E = t[L];
    Number.isFinite(E) ? (h[L] = E, u[L + 1] = u[L]) : (h[L] = 0, u[L + 1] = u[L] + 1);
  }
  const p = new Float64Array(c), g = 1024;
  let b = 0, P = 0;
  for (let L = 0; L < i; L++) {
    const E = h[L];
    b += E, P += E * E;
  }
  for (let L = 0; L < c; L++) {
    if (L > 0)
      if (L % g === 0) {
        b = 0, P = 0;
        for (let j = 0; j < i; j++) {
          const K = h[L + j];
          b += K, P += K * K;
        }
      } else {
        const j = h[L - 1], K = h[L + i - 1];
        b += K - j, P += K * K - j * j;
      }
    if (u[L + i] - u[L] > 0) {
      p[L] = 1 / 0;
      continue;
    }
    const E = b / i;
    let C = P / i - E * E;
    C < 0 && (C = 0);
    const Y = Math.sqrt(C);
    let H = 0;
    if (Y > 0) {
      const j = 1 / Y;
      for (let K = 0; K < i; K++) {
        const J = (h[L + K] - E) * j - f[K];
        H += J * J;
      }
    } else
      for (let j = 0; j < i; j++) H += f[j] * f[j];
    p[L] = Number.isFinite(H) ? Math.sqrt(H) : 1 / 0;
  }
  const w = new Array(c);
  for (let L = 0; L < c; L++) w[L] = L;
  w.sort((L, E) => {
    const C = p[L], Y = p[E];
    return C === Y ? 0 : C < Y ? -1 : 1;
  });
  const k = [], R = [];
  for (let L = 0; L < c && k.length < s; L++) {
    const E = w[L], C = p[E];
    if (!Number.isFinite(C)) break;
    let Y = !0;
    for (let H = 0; H < R.length; H++)
      if (Math.abs(E - R[H]) < r) {
        Y = !1;
        break;
      }
    Y && (R.push(E), k.push({ startIndex: E, endIndex: E + i - 1, distance: C }));
  }
  return k;
}
function Gc(t, e, o, i) {
  if (e < 2 || o < 1 || i < 1) return null;
  const n = t.length;
  if (n < e * 3) return null;
  const s = new Array(n);
  for (let w = 0; w < n; w++) s[w] = t[w].close;
  const r = s.slice(n - e), l = xi(s, r, {
    k: i,
    minGap: e,
    excludeTail: e + o
  }), a = [];
  for (let w = 0; w < l.length; w++) {
    const k = l[w], R = k.endIndex, L = s[R];
    let E = null;
    if (R + o < n && Number.isFinite(L) && L !== 0) {
      const C = new Array(o);
      let Y = !0;
      for (let H = 1; H <= o; H++) {
        const j = (s[R + H] / L - 1) * 100;
        if (!Number.isFinite(j)) {
          Y = !1;
          break;
        }
        C[H - 1] = j;
      }
      Y && (E = C);
    }
    a.push({ match: k, matchTime: t[R].time, aftermathPct: E });
  }
  const c = [];
  let f = 0;
  for (let w = 0; w < a.length; w++) {
    const k = a[w].aftermathPct;
    if (k === null) continue;
    const R = k[o - 1];
    c.push(R), R > 0 && f++;
  }
  c.sort((w, k) => w - k);
  const h = c.length;
  let u = 0;
  if (h > 0) {
    const w = h >> 1;
    u = h % 2 === 1 ? c[w] : (c[w - 1] + c[w]) / 2;
  }
  const p = {
    count: h,
    upCount: f,
    medianEndPct: u,
    bestEndPct: h > 0 ? c[h - 1] : 0,
    worstEndPct: h > 0 ? c[0] : 0,
    horizon: o
  }, g = r[0], b = new Array(e), P = Number.isFinite(g) && g !== 0;
  for (let w = 0; w < e; w++)
    if (P) {
      const k = (r[w] / g - 1) * 100;
      b[w] = Number.isFinite(k) ? k : 0;
    } else
      b[w] = 0;
  return { windowLen: e, horizon: o, results: a, stats: p, queryClosePct: b };
}
function qc(t, e) {
  if (!Number.isInteger(e) || e < 2)
    throw new Error(`resampleStroke: n must be an integer >= 2 (got ${e})`);
  const o = /* @__PURE__ */ new Map();
  for (let u = 0; u < t.length; u++) {
    const p = t[u];
    Number.isFinite(p.x) && Number.isFinite(p.y) && o.set(p.x, p.y);
  }
  if (o.size < 2)
    throw new Error("resampleStroke: need at least 2 points with distinct x");
  const i = o.size, n = new Float64Array(i);
  let s = 0;
  for (const u of o.keys()) n[s++] = u;
  n.sort();
  const r = new Float64Array(i);
  for (let u = 0; u < i; u++) r[u] = o.get(n[u]);
  const l = n[0], c = n[i - 1] - l, f = new Array(e);
  let h = 0;
  for (let u = 0; u < e; u++) {
    const p = l + c * u / (e - 1);
    for (; h < i - 2 && n[h + 1] < p; ) h++;
    const g = n[h], b = n[h + 1];
    let P = (p - g) / (b - g);
    P < 0 && (P = 0), P > 1 && (P = 1);
    const w = r[h] + P * (r[h + 1] - r[h]);
    f[u] = -w;
  }
  return f;
}
const Uc = 200, yi = 120;
function Se(t, e) {
  const o = t.length;
  if (o === 1) return t[0];
  const i = e * (o - 1), n = Math.floor(i), s = n + 1 < o ? n + 1 : n, r = i - n;
  return t[n] + r * (t[s] - t[n]);
}
function jc(t, e, o, i = 12) {
  if (e = Math.floor(e), o = Math.floor(o), i = Math.floor(i), e < 1 || o < 1 || i < 1 || t.length < Uc) return null;
  const n = new Float64Array(t.length - 1);
  let s = 0, r = NaN;
  for (let g = 0; g < t.length; g++) {
    const b = t[g].close;
    if (!(!Number.isFinite(b) || b <= 0)) {
      if (r === r) {
        const P = Math.log(b / r);
        Number.isFinite(P) && (n[s++] = P);
      }
      r = b;
    }
  }
  if (s < i) return null;
  const l = s - i, a = new Float32Array(o * e);
  for (let g = 0; g < o; g++) {
    const b = g * e;
    let P = 0, w = 0;
    for (; w < e; ) {
      const k = Math.floor(Math.random() * (l + 1)), R = e - w, L = i < R ? i : R;
      for (let E = 0; E < L; E++)
        P += n[k + E], a[b + w] = (Math.exp(P) - 1) * 100, w++;
    }
  }
  const c = new Float32Array(o), f = new Array(e);
  for (let g = 0; g < e; g++) {
    for (let b = 0; b < o; b++) c[b] = a[b * e + g];
    c.sort(), f[g] = {
      p5: Se(c, 0.05),
      p25: Se(c, 0.25),
      p50: Se(c, 0.5),
      p75: Se(c, 0.75),
      p95: Se(c, 0.95)
    };
  }
  const h = f[e - 1].p50, u = o < yi ? o : yi, p = new Array(u);
  for (let g = 0; g < u; g++) {
    const P = Math.floor(g * o / u) * e, w = new Array(e);
    for (let k = 0; k < e; k++) w[k] = a[P + k];
    p[g] = w;
  }
  return { horizon: e, nPaths: o, pathsPct: a, bandsPct: f, medianEndPct: h, samplePathsPct: p };
}
function Jc(t, e) {
  const { horizon: o, nPaths: i, pathsPct: n } = t;
  if (i < 1 || o < 1) return { endAbovePct: 0, touchPct: 0 };
  const s = e >= 0;
  let r = 0, l = 0;
  for (let a = 0; a < i; a++) {
    const c = a * o;
    if (n[c + o - 1] > e && r++, s) {
      for (let f = 0; f < o; f++)
        if (n[c + f] >= e) {
          l++;
          break;
        }
    } else
      for (let f = 0; f < o; f++)
        if (n[c + f] <= e) {
          l++;
          break;
        }
  }
  return {
    endAbovePct: r / i * 100,
    touchPct: l / i * 100
  };
}
function Kc(t, e) {
  const { horizon: o, nPaths: i, pathsPct: n } = t;
  if (i < 1 || o < 1 || !Number.isFinite(e)) return 0;
  const s = o - 1;
  let r = 0;
  if (e >= 0)
    for (let l = 0; l < i; l++)
      n[l * o + s] >= e && r++;
  else
    for (let l = 0; l < i; l++)
      n[l * o + s] <= e && r++;
  return r / i * 100;
}
const se = 24, re = 7;
function Zc(t) {
  const e = new Float64Array(se), o = new Float64Array(se), i = new Float64Array(se), n = new Int32Array(se), s = new Float64Array(re), r = new Float64Array(re), l = new Float64Array(re), a = new Int32Array(re);
  let c = 1 / 0, f = -1 / 0;
  for (let g = 0; g < t.length; g++) {
    const b = t[g];
    if (!Number.isFinite(b.time) || !Number.isFinite(b.open) || !Number.isFinite(b.close) || !Number.isFinite(b.volume) || b.open === 0)
      continue;
    b.time < c && (c = b.time), b.time > f && (f = b.time);
    const P = new Date(b.time), w = P.getUTCHours(), k = P.getUTCDay(), R = (b.close / b.open - 1) * 100, L = Math.abs(R);
    e[w] += L, o[w] += R, i[w] += b.volume, n[w]++, s[k] += L, r[k] += R, l[k] += b.volume, a[k]++;
  }
  const h = (g, b, P, w) => w > 0 ? {
    meanAbsReturnPct: g / w,
    meanReturnPct: b / w,
    meanVolume: P / w,
    samples: w
  } : { meanAbsReturnPct: 0, meanReturnPct: 0, meanVolume: 0, samples: 0 }, u = new Array(se);
  for (let g = 0; g < se; g++)
    u[g] = h(e[g], o[g], i[g], n[g]);
  const p = new Array(re);
  for (let g = 0; g < re; g++)
    p[g] = h(s[g], r[g], l[g], a[g]);
  return {
    byHourUtc: u,
    byWeekdayUtc: p,
    candleCount: t.length,
    fromTime: Number.isFinite(c) ? c : 0,
    toTime: Number.isFinite(f) ? f : 0
  };
}
const Qc = 55, Bn = 256, zc = 0.12, Hn = 5e-3, xc = 0.3, tf = 0.5, ef = 0.28, nf = 0.35, of = 0.25, bi = 0.28, sf = [0, 3, 5, 7, 10], rf = 3, lf = 220, ze = [];
for (let t = 0; t < rf; t++)
  for (const e of sf)
    ze.push(lf * Math.pow(2, t + e / 12));
class ts {
  constructor() {
    nt(this, "ctx", null);
    nt(this, "masterGain", null);
    nt(this, "delay", null);
    nt(this, "_running", !1);
    // Rolling window of log(1+qty) values, as a ring buffer.
    nt(this, "sizes", new Float64Array(Bn));
    nt(this, "sizeCount", 0);
    nt(this, "sizeIdx", 0);
    // Rate limiting: at most one note per TICK_MS, coalescing same-side trades.
    nt(this, "pending", { buy: null, sell: null });
    nt(this, "tickTimer", null);
    nt(this, "suspendTimer", null);
  }
  get running() {
    return this._running;
  }
  /**
   * Create (lazily) and resume the audio graph. MUST be called from a user
   * gesture call stack so the browser allows the context to run. Resolves
   * silently (without starting) if Web Audio is unavailable.
   */
  async start() {
    if (this._running || !this.ensureGraph()) return;
    const e = this.ctx, o = this.masterGain;
    if (!e || !o) return;
    this.suspendTimer !== null && (clearTimeout(this.suspendTimer), this.suspendTimer = null), e.state !== "running" && await e.resume();
    const i = e.currentTime, n = o.gain;
    n.cancelScheduledValues(i), n.setValueAtTime(Math.max(n.value, 1e-4), i), n.exponentialRampToValueAtTime(zc, i + 0.08), this._running = !0;
  }
  /** Fade out, then suspend the context. Restartable via start(). */
  stop() {
    this._running = !1, this.tickTimer !== null && (clearTimeout(this.tickTimer), this.tickTimer = null), this.pending.buy = null, this.pending.sell = null;
    const e = this.ctx, o = this.masterGain;
    if (!e || !o) return;
    const i = e.currentTime, n = o.gain;
    n.cancelScheduledValues(i), n.setValueAtTime(Math.max(n.value, 1e-4), i), n.exponentialRampToValueAtTime(1e-4, i + 0.12), this.suspendTimer !== null && clearTimeout(this.suspendTimer), this.suspendTimer = setTimeout(() => {
      this.suspendTimer = null, !this._running && this.ctx && this.ctx.state === "running" && this.ctx.suspend().catch(() => {
      });
    }, 180);
  }
  /** Feed one live trade. Cheap no-op while stopped. */
  onTrade(e) {
    if (!this._running || !this.ctx || !(e.qty > 0)) return;
    this.pushSize(Math.log1p(e.qty));
    const o = this.pending[e.side];
    o ? o.qty += e.qty : this.pending[e.side] = { qty: e.qty, firstAt: performance.now() }, this.tickTimer === null && (this.flushOne(), this.scheduleTick());
  }
  // ----- internals -----
  /** Lazily build the node graph. Returns false if Web Audio is unavailable. */
  ensureGraph() {
    if (this.ctx) return !0;
    const e = globalThis, o = e.AudioContext ?? e.webkitAudioContext;
    if (!o) return !1;
    const i = new o(), n = i.createGain();
    n.gain.value = 1e-4;
    const s = i.createDynamicsCompressor();
    s.threshold.value = -22, s.knee.value = 18, s.ratio.value = 5, s.attack.value = 4e-3, s.release.value = 0.22, n.connect(s), s.connect(i.destination);
    const r = i.createDelay(1);
    r.delayTime.value = ef;
    const l = i.createGain();
    l.gain.value = nf;
    const a = i.createGain();
    return a.gain.value = of, r.connect(l), l.connect(r), r.connect(a), a.connect(n), this.ctx = i, this.masterGain = n, this.delay = r, !0;
  }
  /** One rate-limit tick: keep ticking only while there is something pending. */
  scheduleTick() {
    this.tickTimer = setTimeout(() => {
      this.tickTimer = null, this._running && (this.pending.buy || this.pending.sell) && (this.flushOne(), this.scheduleTick());
    }, Qc);
  }
  /**
   * Play at most ONE pending note (strict ≤ ~18 notes/sec). If both sides are
   * waiting, the side whose first trade arrived earlier goes first; the other
   * keeps accumulating until the next tick.
   */
  flushOne() {
    const { buy: e, sell: o } = this.pending;
    let i;
    if (e && o) i = e.firstAt <= o.firstAt ? "buy" : "sell";
    else if (e) i = "buy";
    else if (o) i = "sell";
    else return;
    const n = this.pending[i];
    this.pending[i] = null, n && this.playNote(i, n.qty);
  }
  playNote(e, o) {
    const i = this.ctx, n = this.masterGain, s = this.delay;
    if (!i || !n || !s || i.state !== "running") return;
    const r = Math.log1p(Math.max(0, o)), l = this.percentile(r), a = this.velocity(r), c = Math.min(ze.length - 1, Math.max(0, Math.floor(l * ze.length)));
    let f = ze[c];
    e === "sell" && (f /= 2);
    const h = i.currentTime + 1e-3, u = xc + tf * a, p = 0.18 + 0.82 * a, g = i.createOscillator();
    g.type = e === "buy" ? "sine" : "triangle", g.frequency.value = f;
    const b = i.createGain();
    b.gain.setValueAtTime(1e-4, h), b.gain.linearRampToValueAtTime(p, h + Hn), b.gain.exponentialRampToValueAtTime(1e-4, h + Hn + u), g.connect(b);
    let P = b;
    if (typeof i.createStereoPanner == "function") {
      const w = i.createStereoPanner();
      w.pan.value = e === "buy" ? bi : -bi, b.connect(w), P = w;
    }
    P.connect(n), P.connect(s), g.start(h), g.stop(h + Hn + u + 0.05), g.onended = () => {
      g.disconnect(), b.disconnect(), P !== b && P.disconnect();
    };
  }
  pushSize(e) {
    this.sizes[this.sizeIdx] = e, this.sizeIdx = (this.sizeIdx + 1) % Bn, this.sizeCount < Bn && this.sizeCount++;
  }
  /** Fraction of the rolling window at or below x. */
  percentile(e) {
    const o = this.sizeCount;
    if (o === 0) return 0.5;
    let i = 0;
    for (let n = 0; n < o; n++)
      this.sizes[n] <= e && i++;
    return i / o;
  }
  /** Loudness 0..1: log(1+qty) normalized by the rolling-window max, clamped. */
  velocity(e) {
    const o = this.sizeCount;
    if (o === 0) return 0.5;
    let i = 0;
    for (let n = 0; n < o; n++)
      this.sizes[n] > i && (i = this.sizes[n]);
    return i <= 0 ? 0.5 : Math.min(1, Math.max(0.05, e / i));
  }
}
const af = new ts(), Sf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TradeSonifier: ts,
  buildEchoScan: Gc,
  buildOracle: jc,
  computeMarketClock: Zc,
  findSimilar: xi,
  probabilityAtLeast: Kc,
  resampleStroke: qc,
  sonifier: af,
  targetOdds: Jc,
  zNormalize: zi
}, Symbol.toStringTag, { value: "Module" })), cf = 10, ff = 1, hf = 10, es = {
  upColor: "#26a69a",
  downColor: "#ef5350",
  gridVisible: !1,
  crosshairVisible: !0,
  alertSound: !0,
  alertTune: 0,
  alertDuration: 2
};
function Pf(t) {
  return typeof t == "number" && Number.isInteger(t) && t >= 0 && t < cf ? t : es.alertTune;
}
function uf(t) {
  return typeof t != "number" || !Number.isFinite(t) ? es.alertDuration : Math.min(hf, Math.max(ff, Math.round(t)));
}
function ot(t, e, o) {
  const { type: i = "sine", freq: n, freqTo: s, start: r, dur: l, peak: a = 0.2 } = o, c = t.createGain();
  c.connect(e);
  const f = Math.min(0.012, l * 0.25);
  c.gain.setValueAtTime(1e-4, r), c.gain.exponentialRampToValueAtTime(a, r + f), c.gain.exponentialRampToValueAtTime(1e-4, r + l);
  const h = t.createOscillator();
  h.type = i, h.frequency.setValueAtTime(n, r), s !== void 0 && h.frequency.exponentialRampToValueAtTime(Math.max(1, s), r + l), h.connect(c), h.start(r), h.stop(r + l + 0.03);
}
function Lt(t, e, o, i) {
  const n = Math.max(1, Math.ceil(e / o));
  for (let s = 0; s < n; s++) {
    const r = t + s * o;
    if (r >= t + e - 1e-3) break;
    i(r, s);
  }
}
const Qn = [
  {
    name: "Classic beep",
    render: (t, e, o, i) => Lt(o, i, 0.5, (n) => {
      ot(t, e, { freq: 880, start: n, dur: 0.15 }), ot(t, e, { freq: 1320, start: n + 0.17, dur: 0.15 });
    })
  },
  {
    name: "Chime",
    render: (t, e, o, i) => Lt(o, i, 0.95, (n) => {
      ot(t, e, { type: "triangle", freq: 1318, start: n, dur: 0.85, peak: 0.18 }), ot(t, e, { type: "triangle", freq: 1047, start: n + 0.12, dur: 0.8, peak: 0.14 });
    })
  },
  {
    name: "Ping",
    render: (t, e, o, i) => Lt(o, i, 0.6, (n) => ot(t, e, { freq: 1568, start: n, dur: 0.35, peak: 0.22 }))
  },
  {
    name: "Rising alert",
    render: (t, e, o, i) => Lt(
      o,
      i,
      0.7,
      (n) => ot(t, e, { type: "sawtooth", freq: 440, freqTo: 1760, start: n, dur: 0.5, peak: 0.14 })
    )
  },
  {
    name: "Falling alert",
    render: (t, e, o, i) => Lt(
      o,
      i,
      0.7,
      (n) => ot(t, e, { type: "sawtooth", freq: 1760, freqTo: 440, start: n, dur: 0.5, peak: 0.14 })
    )
  },
  {
    name: "Pulse",
    render: (t, e, o, i) => Lt(o, i, 0.2, (n) => ot(t, e, { type: "square", freq: 1100, start: n, dur: 0.09, peak: 0.12 }))
  },
  {
    name: "Marimba",
    render: (t, e, o, i) => Lt(o, i, 0.62, (n) => {
      ot(t, e, { type: "triangle", freq: 523, start: n, dur: 0.2, peak: 0.18 }), ot(t, e, { type: "triangle", freq: 659, start: n + 0.12, dur: 0.2, peak: 0.16 }), ot(t, e, { type: "triangle", freq: 784, start: n + 0.24, dur: 0.22, peak: 0.16 });
    })
  },
  {
    name: "Siren",
    render: (t, e, o, i) => {
      const n = t.createGain();
      n.connect(e), n.gain.setValueAtTime(1e-4, o), n.gain.exponentialRampToValueAtTime(0.16, o + 0.05), n.gain.setValueAtTime(0.16, Math.max(o + 0.06, o + i - 0.08)), n.gain.exponentialRampToValueAtTime(1e-4, o + i);
      const s = t.createOscillator();
      s.type = "sine", s.frequency.setValueAtTime(620, o);
      const r = 0.4;
      let l = 0;
      for (let a = o; a < o + i; l++, a += r)
        s.frequency.linearRampToValueAtTime(l % 2 === 0 ? 980 : 620, Math.min(o + i, a + r));
      s.connect(n), s.start(o), s.stop(o + i + 0.03);
    }
  },
  {
    name: "Arpeggio",
    render: (t, e, o, i) => Lt(
      o,
      i,
      1,
      (n) => [440, 554, 659, 880].forEach(
        (s, r) => ot(t, e, { freq: s, start: n + r * 0.18, dur: 0.24, peak: 0.16 })
      )
    )
  },
  {
    name: "Digital",
    render: (t, e, o, i) => Lt(o, i, 0.5, (n) => {
      ot(t, e, { type: "square", freq: 1047, start: n, dur: 0.1, peak: 0.1 }), ot(t, e, { type: "square", freq: 1568, start: n + 0.12, dur: 0.1, peak: 0.1 }), ot(t, e, { type: "square", freq: 1319, start: n + 0.26, dur: 0.12, peak: 0.1 });
    })
  }
], Af = Qn.map((t, e) => ({
  id: e,
  name: t.name
}));
function pf(t, e) {
  const o = window, i = o.AudioContext ?? o.webkitAudioContext;
  if (!i) return () => {
  };
  let n;
  try {
    n = new i();
  } catch {
    return () => {
    };
  }
  n.resume().catch(() => {
  });
  const s = uf(e), r = Qn[t] ?? Qn[0], l = n.createGain();
  l.gain.value = 0.85, l.connect(n.destination);
  const a = n.currentTime + 0.03;
  try {
    r.render(n, l, a, s);
  } catch {
  }
  let c = !1;
  const f = () => {
    c || (c = !0, n.close().catch(() => {
    }));
  }, h = window.setTimeout(f, (s + 0.5) * 1e3);
  return () => {
    window.clearTimeout(h), f();
  };
}
function mf(t) {
  if (!Number.isFinite(t)) return "—";
  const e = Math.abs(t);
  if (e >= 1e3)
    return t.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (e >= 1) return t.toFixed(2);
  if (e === 0) return "0.00";
  const o = t.toPrecision(4);
  return o.includes("e") ? t.toFixed(8) : String(parseFloat(o));
}
async function kf() {
  if (typeof Notification > "u") return !1;
  if (Notification.permission === "granted") return !0;
  if (Notification.permission === "denied") return !1;
  try {
    return await Notification.requestPermission() === "granted";
  } catch {
    return !1;
  }
}
function ns(t) {
  const e = `${t.symbol} crossed ${t.condition} ${mf(t.price)}`;
  return t.message && t.message.trim() !== "" ? `${e} — ${t.message.trim()}` : e;
}
function gf(t) {
  if (typeof Notification > "u" || Notification.permission !== "granted") return !1;
  try {
    return new Notification("CandL price alert", { body: ns(t), tag: t.id }), !0;
  } catch {
    return !1;
  }
}
function yf(t) {
  if (typeof document > "u") return;
  const e = document.createElement("div");
  e.className = "alert-toast", e.setAttribute("role", "status"), e.textContent = ns(t), document.body.appendChild(e), requestAnimationFrame(() => e.classList.add("show"));
  const o = () => {
    e.classList.remove("show"), window.setTimeout(() => e.remove(), 250);
  };
  window.setTimeout(o, 6e3), e.addEventListener("click", o);
}
function Lf(t) {
  const { symbol: e, price: o, prevPrice: i, alerts: n, soundOn: s, tune: r, tuneDurationSec: l, onTriggered: a } = t;
  if (Number.isFinite(o))
    for (const c of n) {
      if (c.symbol !== e || c.triggered) continue;
      let f;
      c.condition === "above" ? f = (i === null || i < c.price) && o >= c.price : f = (i === null || i > c.price) && o <= c.price, f && (gf(c) || yf(c), s && pf(r, l), a(c.id, Date.now()));
    }
}
const If = ["1s", "15s", "30s", "1m", "5m", "15m", "30m", "1h", "4h", "1d", "1w"], Nf = {
  "1s": 1e3,
  "15s": 15e3,
  "30s": 3e4,
  "1m": 6e4,
  "5m": 3e5,
  "15m": 9e5,
  "30m": 18e5,
  "1h": 36e5,
  "4h": 144e5,
  "1d": 864e5,
  "1w": 6048e5
}, Cf = {
  "1s": "1 second",
  "15s": "15 seconds",
  "30s": "30 seconds",
  "1m": "1 minute",
  "5m": "5 minutes",
  "15m": "15 minutes",
  "30m": "30 minutes",
  "1h": "1 hour",
  "4h": "4 hours",
  "1d": "1 day",
  "1w": "1 week"
};
export {
  hf as ALERT_DURATION_MAX,
  ff as ALERT_DURATION_MIN,
  Af as ALERT_TUNES,
  cf as ALERT_TUNE_COUNT,
  Pa as DEFAULT_DRAWING_COLOR,
  es as DEFAULT_SETTINGS,
  Tf as DRAWING_TOOLS,
  ar as FIBEXT_LEVELS,
  Ai as FIBEXT_LEVEL_COLORS,
  Tn as FIB_LEVELS,
  Pi as FIB_LEVEL_COLORS,
  xe as HANDLE_TOLERANCE,
  Os as HIT_TOLERANCE,
  Xc as INDICATORS,
  If as INTERVALS,
  Cf as INTERVAL_LABELS,
  Nf as INTERVAL_MS,
  Sa as TOOL_GROUPS,
  jt as TOOL_IMPLS,
  Lf as checkAndFireAlerts,
  uf as clampAlertDuration,
  Pf as clampAlertTune,
  Mf as createChartEngine,
  Rn as defaultDrawing,
  kf as ensureNotificationPermission,
  Eo as fibExtLevelPrice,
  vo as fibLevelPrice,
  vt as formatPrice,
  wf as getIndicator,
  ri as hitTestDrawing,
  li as hitTestHandle,
  Sf as lab,
  ka as movePoint,
  pf as playTune,
  Je as pointsNeeded,
  vn as renderDrawing,
  po as toolImpl,
  Aa as translateDrawing
};
//# sourceMappingURL=candl-charts.js.map
