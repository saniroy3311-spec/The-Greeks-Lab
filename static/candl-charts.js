var Ws = Object.defineProperty;
var $s = (t, e, o) => e in t ? Ws(t, e, { enumerable: !0, configurable: !0, writable: !0, value: o }) : t[e] = o;
var ot = (t, e, o) => $s(t, typeof e != "symbol" ? e + "" : e, o);
import "react/jsx-runtime";
const Ys = 6, ze = 8, ye = 7, Qn = '-apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', nt = `10px ${Qn}`, bi = `11px ${Qn}`, ce = `12px ${Qn}`;
function V(t) {
  return Math.max(Ys, t.width / 2 + 3);
}
function M(t, e) {
  return { x: t.timeToX(e.time), y: t.priceToY(e.price) };
}
function gt(t, e) {
  return t.points.map((o) => M(e, o));
}
function rt(t) {
  const e = t.getTransform(), o = e.a !== 0 ? Math.abs(e.a) : 1, i = e.d !== 0 ? Math.abs(e.d) : 1;
  return { w: t.canvas.width / o, h: t.canvas.height / i };
}
const He = /* @__PURE__ */ new Map();
function di(t, e) {
  const o = He.get(e);
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
  return He.size > 256 && He.clear(), He.set(e, s), s;
}
function _(t, e, o) {
  const i = di(t, e);
  return `rgba(${i.r}, ${i.g}, ${i.b}, ${(i.a * o).toFixed(3)})`;
}
function Ne(t, e) {
  const o = di(t, e);
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
function ke(t, e) {
  const o = vt(t, e);
  return t >= 0 ? `+${o}` : o;
}
function Ce(t) {
  return isFinite(t) ? `${t >= 0 ? "+" : ""}${t.toFixed(2)}%` : "—";
}
const Os = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function yn(t) {
  return t < 10 ? "0" + t : String(t);
}
function zn(t, e) {
  const o = new Date(t), i = `${o.getDate()} ${Os[o.getMonth()]} '${yn(o.getFullYear() % 100)}`;
  return e >= 864e5 ? i : `${i} ${yn(o.getHours())}:${yn(o.getMinutes())}`;
}
function Ti(t) {
  const e = Math.abs(t), o = Math.floor(e / 6e4);
  if (o < 1) return `${Math.round(e / 1e3)}s`;
  const i = Math.floor(o / 1440), n = Math.floor(o % 1440 / 60), s = o % 60;
  return i > 0 ? n > 0 ? `${i}d ${n}h` : `${i}d` : n > 0 ? s > 0 ? `${n}h ${s}m` : `${n}h` : `${s}m`;
}
function Bs(t) {
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
function Mi(t, e, o) {
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
function xe(t, e, o, i, n) {
  t.beginPath(), t.moveTo(e, o), t.lineTo(e - n * Math.cos(i - 0.42), o - n * Math.sin(i - 0.42)), t.lineTo(e - n * Math.cos(i + 0.42), o - n * Math.sin(i + 0.42)), t.closePath(), t.fill();
}
function xn(t, e, o, i, n, s, r) {
  const l = i - e, a = n - o, c = Math.hypot(l, a);
  if (c < 1) return;
  const f = Math.atan2(a, l), h = Math.min(s * 0.8, c / 2), u = l / c, p = a / c, g = r ? e + u * h : e, b = r ? o + p * h : o;
  $(t, g, b, i - u * h, n - p * h), xe(t, i, n, f, s), r && xe(t, e, o, f + Math.PI, s);
}
function At(t, e, o, i, n, s = ce) {
  if (i.length === 0) return;
  t.font = s;
  const r = 8, l = 4, c = (parseInt(s, 10) || 12) + 4;
  let f = 0;
  for (const b of i) f = Math.max(f, t.measureText(b).width);
  const h = f + r * 2, u = i.length * c + l * 2, p = e - h / 2, g = o - u / 2;
  Pt(t, p, g, h, u, 4), t.fillStyle = n, t.fill(), t.fillStyle = Ne(t, n), t.textAlign = "center", t.textBaseline = "middle";
  for (let b = 0; b < i.length; b++)
    t.fillText(i[b], e, g + l + c * (b + 0.5));
}
function N(t, e, o, i) {
  const n = ye / 2;
  t.lineWidth = 1, t.setLineDash([]);
  const s = i ?? e.points.map((r, l) => l);
  for (const r of s) {
    const l = e.points[r];
    if (!l) continue;
    const a = o.timeToX(l.time), c = o.priceToY(l.price);
    t.fillStyle = "#ffffff", t.fillRect(a - n, c - n, ye, ye), t.strokeStyle = e.color, t.strokeRect(a - n, c - n, ye, ye);
  }
}
function lt(t, e, o, i, n, s, r, l) {
  const a = n - o, c = s - i, f = a * a + c * c;
  let h = f === 0 ? 0 : ((t - o) * a + (e - i) * c) / f;
  return h = Math.max(r, Math.min(l, h)), Math.hypot(t - (o + h * a), e - (i + h * c));
}
function Q(t, e, o, i) {
  return lt(t, e, o.x, o.y, i.x, i.y, 0, 1);
}
function jt(t, e, o) {
  let i = !1;
  for (let n = 0, s = o.length - 1; n < o.length; s = n++) {
    const r = o[n].x, l = o[n].y, a = o[s].x, c = o[s].y;
    l > e != c > e && t < (a - r) * (e - l) / (c - l) + r && (i = !i);
  }
  return i;
}
function _t(t, e, o, i, n) {
  return t >= Math.min(o.x, i.x) - n && t <= Math.max(o.x, i.x) + n && e >= Math.min(o.y, i.y) - n && e <= Math.max(o.y, i.y) + n;
}
function rn(t, e, o, i, n, s, r, l) {
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
function Hs(t, e, o = 14) {
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
function Xs(t, e, o) {
  const i = t.length;
  if (e < 1 || i - e < 30) return null;
  let n = 0, s = 0;
  for (let r = 0; r + e < i; r++) {
    const l = t[r].close;
    l > 0 && (n++, Math.abs((t[r + e].close / l - 1) * 100) <= o && s++);
  }
  return n < 30 ? null : Math.round(100 * s / n);
}
function to(t, e, o, i, n) {
  t.font = nt;
  const s = 4, r = t.measureText(i).width + s * 2, l = 15;
  Pt(t, e, o - l / 2, r, l, 3), t.fillStyle = n, t.fill(), t.fillStyle = Ne(t, n), t.textAlign = "left", t.textBaseline = "middle", t.fillText(i, e + s, o + 0.5);
}
function wi(t, e) {
  return t.font = nt, t.measureText(e).width + 8;
}
const Vs = {
  id: "trendline",
  label: "Trend Line",
  group: "lines",
  pointsNeeded: 2,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1] ? M(o, e.points[1]) : n;
    $(t, n.x, n.y, s.x, s.y), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = M(i, t.points[0]), s = M(i, t.points[1]);
    return lt(e, o, n.x, n.y, s.x, s.y, 0, 1) <= V(t);
  }
}, Gs = {
  id: "ray",
  label: "Ray",
  group: "lines",
  pointsNeeded: 2,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1] ? M(o, e.points[1]) : n, { w: r, h: l } = rt(t), a = rn(n.x, n.y, s.x, s.y, r, l, !1);
    a ? $(t, a[0], a[1], a[2], a[3]) : q(t, n.x, n.y, e.width), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = M(i, t.points[0]), s = M(i, t.points[1]);
    return lt(e, o, n.x, n.y, s.x, s.y, 0, Number.POSITIVE_INFINITY) <= V(t);
  }
}, qs = {
  id: "xline",
  label: "Extended Line",
  group: "lines",
  pointsNeeded: 2,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1] ? M(o, e.points[1]) : n, { w: r, h: l } = rt(t), a = rn(n.x, n.y, s.x, s.y, r, l, !0);
    a ? $(t, a[0], a[1], a[2], a[3]) : q(t, n.x, n.y, e.width), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = M(i, t.points[0]), s = M(i, t.points[1]);
    return lt(e, o, n.x, n.y, s.x, s.y, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY) <= V(t);
  }
}, Us = {
  id: "hray",
  label: "Horizontal Ray",
  group: "lines",
  pointsNeeded: 1,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]), { w: r } = rt(t), l = yt(s.y, t.lineWidth);
    if (s.x < r) {
      $(t, s.x, l, r, l);
      const a = vt(e.points[0].price, n.pricePrecision);
      to(t, Math.max(s.x, r - wi(t, a) - 2), l, a, e.color);
    }
    i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = M(i, t.points[0]), s = V(t);
    return Math.abs(o - n.y) <= s && e >= n.x - s;
  }
}, js = {
  id: "hline",
  label: "Horizontal Line",
  group: "lines",
  pointsNeeded: 1,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]), { w: r } = rt(t), l = yt(s.y, t.lineWidth);
    $(t, 0, l, r, l), to(t, 2, l, vt(e.points[0].price, n.pricePrecision), e.color), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    return Math.abs(o - i.priceToY(t.points[0].price)) <= V(t);
  }
}, Js = {
  id: "vline",
  label: "Vertical Line",
  group: "lines",
  pointsNeeded: 1,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]), { w: r, h: l } = rt(t), a = yt(s.x, t.lineWidth);
    $(t, a, 0, a, l);
    const c = zn(e.points[0].time, n.barMs), f = wi(t, c), h = Math.max(2, Math.min(r - f - 2, a - f / 2));
    to(t, h, l - 10, c, e.color), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    return Math.abs(e - i.timeToX(t.points[0].time)) <= V(t);
  }
}, Ks = [Vs, Gs, qs, Us, js, Js], Zs = 0.08, Qs = 0.06;
function Co(t, e, o) {
  if (Math.abs(e.x - t.x) > 1e-9) {
    const i = (o.x - t.x) / (e.x - t.x), n = t.y + i * (e.y - t.y);
    return { x: 0, y: o.y - n };
  }
  return { x: o.x - t.x, y: 0 };
}
const zs = {
  id: "channel",
  label: "Parallel Channel",
  group: "channels",
  pointsNeeded: 3,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1], r = e.points[2];
    if (!s) {
      q(t, n.x, n.y, e.width), i && N(t, e, o);
      return;
    }
    const l = M(o, s);
    if (r) {
      const a = Co(n, l, M(o, r)), c = { x: n.x + a.x, y: n.y + a.y }, f = { x: l.x + a.x, y: l.y + a.y };
      t.fillStyle = _(t, e.color, Zs), t.beginPath(), t.moveTo(n.x, n.y), t.lineTo(l.x, l.y), t.lineTo(f.x, f.y), t.lineTo(c.x, c.y), t.closePath(), t.fill(), $(t, c.x, c.y, f.x, f.y), t.save(), t.setLineDash([4, 4]), t.strokeStyle = _(t, e.color, 0.45), t.lineWidth = 1, $(t, n.x + a.x / 2, n.y + a.y / 2, l.x + a.x / 2, l.y + a.y / 2), t.restore();
    }
    $(t, n.x, n.y, l.x, l.y), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = M(i, t.points[0]), s = M(i, t.points[1]), r = Co(n, s, M(i, t.points[2])), l = { x: n.x + r.x, y: n.y + r.y }, a = { x: s.x + r.x, y: s.y + r.y }, c = V(t);
    return Q(e, o, n, s) <= c || Q(e, o, l, a) <= c ? !0 : jt(e, o, [n, s, a, l]);
  }
};
function bn(t, e, o, i, n, s, r) {
  let l = 1;
  return o !== 0 && (l = Math.max(l, (0 - t) / o, (n - t) / o)), i !== 0 && (l = Math.max(l, (0 - e) / i, (s - e) / i)), Math.min(l, 1e6 / r);
}
function Fo(t, e) {
  if (!t.points[1] || !t.points[2]) return null;
  const o = M(e, t.points[0]), i = M(e, t.points[1]), n = M(e, t.points[2]), s = { x: (i.x + n.x) / 2, y: (i.y + n.y) / 2 }, r = s.x - o.x, l = s.y - o.y;
  return { a: o, b: i, c: n, mid: s, dx: r, dy: l, len: Math.hypot(r, l) };
}
const xs = {
  id: "pitchfork",
  label: "Pitchfork",
  group: "channels",
  pointsNeeded: 3,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1];
    if (!s) {
      q(t, n.x, n.y, e.width), i && N(t, e, o);
      return;
    }
    const r = Fo(e, o);
    if (!r) {
      const L = M(o, s);
      $(t, n.x, n.y, L.x, L.y), i && N(t, e, o);
      return;
    }
    const { b: l, c: a, mid: c, dx: f, dy: h, len: u } = r, { w: p, h: g } = rt(t);
    if (u < 1e-6) {
      $(t, l.x, l.y, a.x, a.y), i && N(t, e, o);
      return;
    }
    const b = bn(l.x, l.y, f, h, p, g, u), P = bn(a.x, a.y, f, h, p, g, u), w = bn(n.x, n.y, f, h, p, g, u), I = { x: l.x + f * b, y: l.y + h * b }, v = { x: a.x + f * P, y: a.y + h * P };
    t.fillStyle = _(t, e.color, Qs), t.beginPath(), t.moveTo(l.x, l.y), t.lineTo(I.x, I.y), t.lineTo(v.x, v.y), t.lineTo(a.x, a.y), t.closePath(), t.fill(), t.strokeStyle = _(t, e.color, 0.85), $(t, l.x, l.y, I.x, I.y), $(t, a.x, a.y, v.x, v.y), t.save(), t.setLineDash([4, 4]), t.strokeStyle = _(t, e.color, 0.5), t.lineWidth = 1, $(t, l.x, l.y, a.x, a.y), t.restore(), t.strokeStyle = e.color, $(t, n.x, n.y, n.x + f * w, n.y + h * w), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = Fo(t, i);
    if (!n) return !1;
    const { a: s, b: r, c: l, dx: a, dy: c, len: f } = n, h = V(t);
    if (f < 1e-6) return Q(e, o, r, l) <= h;
    const u = Number.POSITIVE_INFINITY;
    return lt(e, o, s.x, s.y, s.x + a, s.y + c, 0, u) <= h || lt(e, o, r.x, r.y, r.x + a, r.y + c, 0, u) <= h || lt(e, o, l.x, l.y, l.x + a, l.y + c, 0, u) <= h || Q(e, o, r, l) <= h;
  }
}, tr = [zs, xs], er = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144], nr = [0, 0.382, 0.618, 1, 1.618, 2.618, 4.236], or = [0.236, 0.382, 0.5, 0.618, 0.786, 1];
function Ot(t, e) {
  return t.map((o, i) => {
    const n = { ratio: o, visible: !0 };
    return e && e[i] && (n.color = e[i]), n;
  });
}
function ir(t) {
  switch (t) {
    case "fib":
      return Ot(dn, Si);
    case "fibext":
      return Ot(lr, Pi);
    case "fibchannel":
    case "fibcircle":
      return Ot(dn);
    case "fibtimezone":
      return Ot(er);
    case "fibtimeext":
      return Ot(nr);
    case "fibfan":
    case "fibwedge":
      return Ot(or);
    default:
      return Ot(dn);
  }
}
function sr(t) {
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
function et(t, e) {
  var o;
  return sr((o = t.props) == null ? void 0 : o.levels) ?? ir(e);
}
const rr = 0.08, dn = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1], Si = [
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
], lr = [0, 0.382, 0.618, 1, 1.272, 1.618, 2], Pi = [
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
function Ro(t, e) {
  const o = t.points[0], i = t.points[1] ?? o;
  return (t.points[2] ?? i).price + (i.price - o.price) * e;
}
function Ai(t, e, o, i, n, s, r, l, a) {
  const c = (h) => s[h].color ?? r(h);
  for (let h = 0; h < s.length - 1; h++) {
    if (!s[h].visible || !s[h + 1].visible) continue;
    const u = o.priceToY(l(s[h].ratio)), p = o.priceToY(l(s[h + 1].ratio));
    t.fillStyle = _(t, c(h + 1), rr), t.fillRect(i, Math.min(u, p), n, Math.abs(p - u));
  }
  const f = Math.max(1, e.width);
  t.font = nt, t.textAlign = "left", t.textBaseline = "bottom", t.lineWidth = f;
  for (let h = 0; h < s.length; h++) {
    const u = s[h];
    if (!u.visible) continue;
    const p = l(u.ratio), g = yt(o.priceToY(p), f), b = c(h);
    t.strokeStyle = b, $(t, i, g, i + n, g), t.fillStyle = b, t.fillText(`${u.label ?? u.ratio} — ${vt(p, a)}`, i + 4, g - 2);
  }
}
function Hn(t, e, o, i, n, s) {
  t.save(), t.setLineDash([4, 4]), t.strokeStyle = _(t, e, 0.55), t.lineWidth = 1, $(t, o, i, n, s), t.restore();
}
const ar = {
  id: "fib",
  label: "Fib Retracement",
  group: "fib",
  pointsNeeded: 2,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]), r = e.points[1] ? M(o, e.points[1]) : s, l = Math.min(s.x, r.x), a = Math.abs(r.x - s.x);
    Ai(
      t,
      e,
      o,
      l,
      a,
      et(e, "fib"),
      (c) => Si[c] ?? e.color,
      (c) => vo(e, c),
      n.pricePrecision
    ), Hn(t, e.color, s.x, s.y, r.x, r.y), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = V(t), s = i.timeToX(t.points[0].time), r = i.timeToX(t.points[1].time);
    if (e < Math.min(s, r) - n || e > Math.max(s, r) + n) return !1;
    for (const l of et(t, "fib"))
      if (l.visible && Math.abs(o - i.priceToY(vo(t, l.ratio))) <= n)
        return !0;
    return !1;
  }
};
function Eo(t, e) {
  const o = e.timeToX(t.points[0].time), i = e.timeToX(t.points[1].time), n = e.timeToX(t.points[2].time);
  return { left: n, width: Math.max(Math.abs(i - o), Math.abs(n - i), 60) };
}
const cr = {
  id: "fibext",
  label: "Fib Extension",
  group: "fib",
  pointsNeeded: 3,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]);
    if (!e.points[1]) {
      q(t, s.x, s.y, e.width), i && N(t, e, o);
      return;
    }
    const r = M(o, e.points[1]);
    if (Hn(t, e.color, s.x, s.y, r.x, r.y), e.points[2]) {
      const l = M(o, e.points[2]);
      Hn(t, e.color, r.x, r.y, l.x, l.y);
      const { left: a, width: c } = Eo(e, o);
      Ai(
        t,
        e,
        o,
        a,
        c,
        et(e, "fibext"),
        (f) => Pi[f] ?? e.color,
        (f) => Ro(e, f),
        n.pricePrecision
      );
    }
    i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = V(t), { left: s, width: r } = Eo(t, i);
    if (e < s - n || e > s + r + n) return !1;
    for (const l of et(t, "fibext"))
      if (l.visible && Math.abs(o - i.priceToY(Ro(t, l.ratio))) <= n)
        return !0;
    return !1;
  }
}, fr = [ar, cr], eo = 0.12, hr = {
  id: "rect",
  label: "Rectangle",
  group: "shapes",
  pointsNeeded: 2,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1] ? M(o, e.points[1]) : n, r = Math.min(n.x, s.x), l = Math.min(n.y, s.y), a = Math.abs(s.x - n.x), c = Math.abs(s.y - n.y);
    t.fillStyle = _(t, e.color, eo), t.fillRect(r, l, a, c), t.strokeRect(r, l, a, c), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    return _t(e, o, M(i, t.points[0]), M(i, t.points[1]), V(t));
  }
}, ur = {
  id: "ellipse",
  label: "Ellipse",
  group: "shapes",
  pointsNeeded: 2,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1] ? M(o, e.points[1]) : n, r = (n.x + s.x) / 2, l = (n.y + s.y) / 2, a = Math.max(Math.abs(s.x - n.x) / 2, 0.5), c = Math.max(Math.abs(s.y - n.y) / 2, 0.5);
    t.beginPath(), t.ellipse(r, l, a, c, 0, 0, Math.PI * 2), t.fillStyle = _(t, e.color, eo), t.fill(), t.stroke(), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = M(i, t.points[0]), s = M(i, t.points[1]), r = (n.x + s.x) / 2, l = (n.y + s.y) / 2, a = Math.max(Math.abs(s.x - n.x) / 2, 1), c = Math.max(Math.abs(s.y - n.y) / 2, 1);
    return Math.hypot((e - r) / a, (o - l) / c) <= 1 + V(t) / Math.min(a, c);
  }
}, pr = {
  id: "triangle",
  label: "Triangle",
  group: "shapes",
  pointsNeeded: 3,
  render(t, e, o, i) {
    const n = gt(e, o);
    n.length === 1 ? q(t, n[0].x, n[0].y, e.width) : n.length === 2 ? $(t, n[0].x, n[0].y, n[1].x, n[1].y) : (t.beginPath(), t.moveTo(n[0].x, n[0].y), t.lineTo(n[1].x, n[1].y), t.lineTo(n[2].x, n[2].y), t.closePath(), t.fillStyle = _(t, e.color, eo), t.fill(), t.lineJoin = "round", t.stroke()), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = gt(t, i);
    if (jt(e, o, n)) return !0;
    const s = V(t);
    return Q(e, o, n[0], n[1]) <= s || Q(e, o, n[1], n[2]) <= s || Q(e, o, n[2], n[0]) <= s;
  }
}, mr = {
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
      t.lineCap = "round", $(t, n.x, n.y, s.x - u * g, s.y - p * g), xe(t, s.x, s.y, h, l);
    }
    i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = M(i, t.points[0]), s = M(i, t.points[1]);
    return Q(e, o, n, s) <= Math.max(V(t), 3 + t.width * 1.5);
  }
}, gr = {
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
      i && N(t, e, o, n.length > 1 ? [0, n.length - 1] : [0]);
    }
  },
  hitTest(t, e, o, i) {
    const n = gt(t, i), s = V(t);
    if (n.length === 1) return Math.hypot(e - n[0].x, o - n[0].y) <= s;
    for (let r = 0; r < n.length - 1; r++)
      if (Q(e, o, n[r], n[r + 1]) <= s) return !0;
    return !1;
  },
  handleAt(t, e, o, i) {
    const n = t.points.length > 1 ? [t.points.length - 1, 0] : [0];
    for (const s of n) {
      const r = t.points[s];
      if (Math.abs(e - i.timeToX(r.time)) <= ze && Math.abs(o - i.priceToY(r.price)) <= ze)
        return s;
    }
    return -1;
  }
}, yr = [hr, ur, pr, mr, gr], br = 24, dr = 3, Xn = 15, Vn = 8, Gn = 6, ki = 12, ne = 6.5, qn = 15, Xe = /* @__PURE__ */ new Map();
function Li(t) {
  var s;
  const e = (t.text ?? "").trim(), o = e.length === 0, i = Mi(o ? "Note" : e, br, dr), n = typeof ((s = t.props) == null ? void 0 : s.emoji) == "string" ? t.props.emoji.trim() : "";
  return n.length > 0 && (i[0] = `${n} ${i[0]}`), { lines: i, placeholder: o };
}
function Tr(t, e, o) {
  const { lines: i } = Li(t);
  let n = 0;
  for (const l of i) n = Math.max(n, l.length);
  const s = n * 6.5 + Vn * 2, r = i.length * Xn + Gn * 2;
  return { x: e + ki, y: o - qn - r / 2, w: s, h: r };
}
const Mr = {
  id: "note",
  label: "Note",
  group: "annotate",
  pointsNeeded: 1,
  defaultProps: { emoji: "" },
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = n.y - qn;
    t.beginPath(), t.moveTo(n.x, n.y), t.quadraticCurveTo(n.x - ne, n.y - 9, n.x - ne, s), t.arc(n.x, s, ne, Math.PI, 0, !1), t.quadraticCurveTo(n.x + ne, n.y - 9, n.x, n.y), t.closePath(), t.fillStyle = e.color, t.fill(), t.beginPath(), t.arc(n.x, s, 2.4, 0, Math.PI * 2), t.fillStyle = "#ffffff", t.fill();
    const { lines: r, placeholder: l } = Li(e);
    t.font = bi;
    let a = 0;
    for (const p of r) a = Math.max(a, t.measureText(p).width);
    const c = a + Vn * 2, f = r.length * Xn + Gn * 2, h = n.x + ki, u = s - f / 2;
    Xe.size > 512 && Xe.clear(), Xe.set(e.id, { x: h, y: u, w: c, h: f }), Pt(t, h, u, c, f, 6), t.fillStyle = _(t, e.color, 0.14), t.fill(), t.lineWidth = 1, t.strokeStyle = i ? e.color : _(t, e.color, 0.35), t.stroke(), t.fillStyle = l ? _(t, e.color, 0.55) : e.color, t.textAlign = "left", t.textBaseline = "middle";
    for (let p = 0; p < r.length; p++)
      t.fillText(r[p], h + Vn, u + Gn + Xn * (p + 0.5));
  },
  hitTest(t, e, o, i) {
    const n = M(i, t.points[0]);
    if (Math.abs(e - n.x) <= ne + 3 && o >= n.y - qn - ne - 3 && o <= n.y + 3)
      return !0;
    const s = Xe.get(t.id) ?? Tr(t, n.x, n.y);
    return e >= s.x - 2 && e <= s.x + s.w + 2 && o >= s.y - 2 && o <= s.y + s.h + 2;
  }
}, wr = [Mr], Sr = 0.08, Pr = 0.35, Ar = "#089981", kr = "#f23645";
function Ii(t) {
  var e;
  return (((e = t.points[1]) == null ? void 0 : e.price) ?? t.points[0].price) >= t.points[0].price ? Ar : kr;
}
function no(t, e, o, i) {
  const n = Math.min(e.x, o.x), s = Math.min(e.y, o.y), r = Math.abs(o.x - e.x), l = Math.abs(o.y - e.y);
  t.fillStyle = _(t, i, Sr), t.fillRect(n, s, r, l), t.save(), t.setLineDash([4, 4]), t.lineWidth = 1, t.strokeStyle = _(t, i, Pr), t.strokeRect(n, s, r, l), t.restore();
}
function Ni(t) {
  const e = t.points[0].price, o = t.points[1].price;
  if (!(Math.abs(e) > 0)) return null;
  const i = (o - e) / Math.abs(e) * 100;
  return isFinite(i) ? i : null;
}
function Ci(t, e) {
  return e > 0 ? Math.round(Math.abs(t.points[1].time - t.points[0].time) / e) : 0;
}
function Un(t) {
  return t === 1 ? "1 bar" : `${t} bars`;
}
const Lr = {
  id: "pricerange",
  label: "Price Range",
  group: "measure",
  pointsNeeded: 2,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]);
    if (!e.points[1]) {
      q(t, s.x, s.y, e.width), i && N(t, e, o);
      return;
    }
    const r = M(o, e.points[1]), l = Ii(e);
    no(t, s, r, l);
    const a = (s.x + r.x) / 2;
    t.strokeStyle = l, t.fillStyle = l, t.lineWidth = Math.max(1, e.width), xn(t, a, s.y, a, r.y, 7, !0);
    const c = e.points[1].price - e.points[0].price, f = Ni(e), h = ke(c, n.pricePrecision), u = f === null ? `Δ ${h}` : `Δ ${h}  (${Ce(f)})`;
    At(t, a, (s.y + r.y) / 2, [u], l), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    return _t(e, o, M(i, t.points[0]), M(i, t.points[1]), 6);
  }
}, Ir = {
  id: "daterange",
  label: "Date Range",
  group: "measure",
  pointsNeeded: 2,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]);
    if (!e.points[1]) {
      q(t, s.x, s.y, e.width), i && N(t, e, o);
      return;
    }
    const r = M(o, e.points[1]);
    no(t, s, r, e.color);
    const l = (s.y + r.y) / 2;
    t.strokeStyle = e.color, t.fillStyle = e.color, t.lineWidth = Math.max(1, e.width), xn(t, s.x, l, r.x, l, 7, !1);
    const a = Math.abs(e.points[1].time - e.points[0].time), c = `${Un(Ci(e, n.barMs))} · ${Ti(a)}`;
    At(t, (s.x + r.x) / 2, l, [c], e.color), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    return _t(e, o, M(i, t.points[0]), M(i, t.points[1]), 6);
  }
}, Nr = {
  id: "sigmatape",
  label: "Sigma Tape",
  group: "measure",
  pointsNeeded: 2,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]);
    if (!e.points[1]) {
      q(t, s.x, s.y, e.width), i && N(t, e, o);
      return;
    }
    const r = M(o, e.points[1]), l = Ii(e);
    no(t, s, r, l), t.strokeStyle = l, t.fillStyle = l, t.lineWidth = Math.max(1, e.width), xn(t, s.x, s.y, r.x, r.y, 7, !1);
    const a = Ni(e), c = Ci(e, n.barMs), f = a === null ? Un(c) : `${Ce(a)} · ${Un(c)}`, h = [], u = Hs(n.candles, Math.max(e.points[0].time, e.points[1].time), 14), p = Math.abs(e.points[1].price - e.points[0].price);
    if (u !== null && u > 0 && h.push(`${(p / u).toFixed(1)}× ATR`), a !== null) {
      const b = Xs(n.candles, c, Math.abs(a));
      b !== null && h.push(`${Bs(b)} %ile`);
    }
    const g = h.length > 0 ? [f, h.join(" · ")] : [f];
    At(t, (s.x + r.x) / 2, (s.y + r.y) / 2, g, l), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    return _t(e, o, M(i, t.points[0]), M(i, t.points[1]), 6);
  }
}, Cr = [Lr, Ir, Nr], Tt = 6, Ht = 8, be = 7, Fr = '500 11px -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', Tn = 17, _o = 5, vr = 3, Fi = "rgba(24, 28, 38, 0.92)";
function Rr(t) {
  const e = t.getTransform(), o = e.a !== 0 ? Math.abs(e.a) : 1, i = e.d !== 0 ? Math.abs(e.d) : 1;
  return { w: t.canvas.width / o, h: t.canvas.height / i };
}
const Ve = /* @__PURE__ */ new Map();
function vi(t, e) {
  const o = Ve.get(e);
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
  return Ve.size > 256 && Ve.clear(), Ve.set(e, s), s;
}
function Gt(t, e, o) {
  const i = vi(t, e);
  return `rgba(${i.r}, ${i.g}, ${i.b}, ${(i.a * o).toFixed(3)})`;
}
function Er(t, e) {
  const o = vi(t, e);
  return 0.2126 * o.r + 0.7152 * o.g + 0.0722 * o.b > 145 ? "#0f0f0f" : "#ffffff";
}
function _r(t, e, o, i, n, s) {
  const r = Math.min(s, i / 2, n / 2);
  t.beginPath(), t.moveTo(e + r, o), t.arcTo(e + i, o, e + i, o + n, r), t.arcTo(e + i, o + n, e, o + n, r), t.arcTo(e, o + n, e, o, r), t.arcTo(e, o, e + i, o, r), t.closePath();
}
function ht(t, e) {
  return Math.round(e) % 2 === 1 ? Math.round(t) + 0.5 : Math.round(t);
}
function Xt(t, e, o, i, n) {
  t.beginPath(), t.moveTo(e, o), t.lineTo(i, n), t.stroke();
}
function wt(t, e, o, i, n, s = "left") {
  t.font = Fr;
  const r = Math.ceil(t.measureText(i).width) + _o * 2, l = s === "left" ? e : s === "right" ? e - r : e - r / 2, a = o - Tn / 2;
  return _r(t, l, a, r, Tn, vr), t.fillStyle = n, t.fill(), t.fillStyle = Er(t, n), t.textAlign = "left", t.textBaseline = "middle", t.fillText(i, l + _o, o + 0.5), { x: l, y: a, w: r, h: Tn };
}
function re(t, e, o, i) {
  const n = be / 2;
  t.lineWidth = 1, t.fillStyle = "#ffffff", t.fillRect(e - n, o - n, be, be), t.strokeStyle = i, t.strokeRect(e - n, o - n, be, be);
}
function Vt(t, e) {
  if (!Number.isFinite(t)) return String(t);
  const o = Math.max(0, Math.min(8, Math.round(e))), i = t < 0, n = Math.abs(t).toFixed(o), s = n.indexOf("."), r = s === -1 ? n : n.slice(0, s), l = s === -1 ? "" : n.slice(s);
  let a = "";
  for (let c = 0; c < r.length; c++)
    c > 0 && (r.length - c) % 3 === 0 && (a += ","), a += r.charAt(c);
  return (i ? "-" : "") + a + l;
}
function Ri(t) {
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
function Do(t) {
  return Number.isFinite(t) ? `${t >= 0 ? "+" : ""}${t.toFixed(2)}%` : "0.00%";
}
function Wo(t) {
  if (!Number.isFinite(t)) return "0";
  const e = Math.abs(t);
  return e >= 1e3 ? Ri(t) : e >= 100 ? t.toFixed(0) : e >= 10 ? t.toFixed(1) : t.toFixed(2);
}
function tn(t, e, o) {
  const i = t.props ? t.props[e] : void 0;
  return typeof i == "number" && Number.isFinite(i) ? i : o;
}
function en(t, e) {
  let o = 0, i = t.length;
  for (; o < i; ) {
    const n = o + i >> 1;
    t[n].time < e ? o = n + 1 : i = n;
  }
  return o;
}
function Ei(t, e) {
  const o = t.length;
  if (o === 0) return -1;
  const i = en(t, e);
  return i <= 0 ? 0 : i >= o ? o - 1 : e - t[i - 1].time <= t[i].time - e ? i - 1 : i;
}
function $o(t, e) {
  return Math.max(t.high - t.low, Math.abs(t.high - e.close), Math.abs(t.low - e.close));
}
function Dr(t, e, o = 14) {
  const i = Math.min(e, t.length - 1);
  if (o < 1 || i < o) return;
  let n = 0;
  for (let s = 1; s <= o; s++) n += $o(t[s], t[s - 1]);
  n /= o;
  for (let s = o + 1; s <= i; s++)
    n = (n * (o - 1) + $o(t[s], t[s - 1])) / o;
  return n;
}
function Wr(t, e, o, i, n, s) {
  const r = n - o, l = s - i, a = r * r + l * l;
  let c = a === 0 ? 0 : ((t - o) * r + (e - i) * l) / a;
  return c = Math.max(0, Math.min(1, c)), Math.hypot(t - (o + c * r), e - (i + c * l));
}
const Ge = "#ef5350", qe = "#26a69a", $r = 12, Yr = 14, Or = 1.5, Br = 0.02, Yo = 0.12;
function Oo(t) {
  const e = Math.abs(t) * 1e-5;
  return e > 0 ? e : 1e-8;
}
function Mn(t, e, o) {
  const i = t.points[0], n = t.points[1], s = t.points[2];
  if (!i || !n || !s) return null;
  const r = e.timeToX(i.time);
  let l = e.timeToX(i.time + $r * o.barMs);
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
function Bo(t) {
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
      const s = Math.max(tn(o, "riskR", 2), 0.1), r = en(i.candles, n.time + 1) - 1;
      let l = r >= 0 ? Dr(i.candles, r, Yr) : void 0;
      (l === void 0 || !(l > 0)) && (l = Math.max(Math.abs(n.price) * Br, Oo(n.price)));
      const a = n.price - e * Or * l, c = n.price + e * s * Math.abs(n.price - a);
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
      const a = r.pricePrecision, c = Mn(i, n, r);
      if (!c) {
        const j = n.timeToX(l.time), U = ht(n.priceToY(l.price), 1);
        o.lineWidth = 1, o.strokeStyle = i.color, o.setLineDash([4, 3]), Xt(o, j, U, j + 120, U), o.setLineDash([]), wt(o, j + 126, U, `Entry ${Vt(l.price, a)}`, i.color, "left"), o.restore();
        return;
      }
      const { x0: f, x1: h, yEntry: u, yStop: p, yTarget: g } = c, b = h - f;
      o.fillStyle = Gt(o, Ge, Yo), o.fillRect(f, Math.min(u, p), b, Math.abs(p - u)), o.fillStyle = Gt(o, qe, Yo), o.fillRect(f, Math.min(u, g), b, Math.abs(g - u));
      const P = Math.max(1, i.width);
      o.lineWidth = P, o.strokeStyle = Ge, Xt(o, f, ht(p, P), h, ht(p, P)), o.strokeStyle = qe, Xt(o, f, ht(g, P), h, ht(g, P)), o.strokeStyle = i.color, Xt(o, f, ht(u, P), h, ht(u, P));
      const w = l.price !== 0 ? l.price : 1, I = (c.stop.price - l.price) / w * 100, v = (c.target.price - l.price) / w * 100;
      wt(o, h + 6, u, `Entry ${Vt(l.price, a)}`, i.color, "left"), wt(
        o,
        h + 6,
        p,
        `Stop ${Vt(c.stop.price, a)} · ${Do(I)}`,
        Ge,
        "left"
      ), wt(
        o,
        h + 6,
        g,
        `Target ${Vt(c.target.price, a)} · ${Do(v)}`,
        qe,
        "left"
      );
      const L = tn(i, "stake", 1e3), k = Math.abs(I), E = Math.abs(v), B = k > 0 ? E / k : 0, J = L * k / 100, K = L * E / 100;
      wt(
        o,
        (f + h) / 2,
        u,
        `R:R 1:${B.toFixed(1)} · risk $${Wo(J)} · reward $${Wo(K)}`,
        Fi,
        "center"
      ), s && (re(o, h, u, i.color), re(o, h, p, Ge), re(o, h, g, qe)), o.restore();
    },
    hitTest(o, i, n, s, r) {
      const l = Mn(o, s, r);
      if (!l || i < l.x0 - Tt || i > l.x1 + Tt) return !1;
      const a = n >= Math.min(l.yEntry, l.yStop) - Tt && n <= Math.max(l.yEntry, l.yStop) + Tt, c = n >= Math.min(l.yEntry, l.yTarget) - Tt && n <= Math.max(l.yEntry, l.yTarget) + Tt;
      return a || c;
    },
    handleAt(o, i, n, s, r) {
      const l = Mn(o, s, r);
      if (!l) return -1;
      const a = (c, f) => Math.abs(i - c) <= Ht && Math.abs(n - f) <= Ht;
      return a(l.x1, l.yStop) ? 1 : a(l.x1, l.yTarget) ? 2 : a(l.x1, l.yEntry) || i >= l.x0 - Ht && i <= l.x1 + Ht && Math.abs(n - l.yEntry) <= Ht ? 0 : -1;
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
      const a = Oo(s.price);
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
const Hr = [Bo("long"), Bo("short")], wn = 0.4, Xr = 0.1, Vr = 0.25, Ho = 12, Gr = 5, Xo = 3;
function Vo(t, e) {
  const o = Math.abs(t) * e / 200;
  return [t - o, t + o];
}
function qr(t, e, o) {
  let i = 0, n = -1 - Xo;
  for (let s = 0; s < t.length; s++) {
    const r = t[s];
    r.low <= o && r.high >= e && (s - n - 1 >= Xo && i++, n = s);
  }
  return i;
}
const Ur = {
  id: "smartlevel",
  label: "Smart Level",
  group: "smart",
  pointsNeeded: 1,
  defaultProps: { heightPct: wn },
  render(t, e, o, i, n) {
    const s = e.points[0];
    if (!s) return;
    t.save();
    const { w: r } = Rr(t), l = Math.max(tn(e, "heightPct", wn), 1e-4), [a, c] = Vo(s.price, l), f = o.priceToY(c), h = o.priceToY(a), u = Math.min(f, h), p = Math.max(Math.abs(h - f), 1), g = qr(n.candles, a, c), b = Xr + Math.min(g, Ho) / Ho * Vr;
    t.fillStyle = Gt(t, e.color, b), t.fillRect(0, u, r, p), t.lineWidth = 1, t.strokeStyle = Gt(t, e.color, 0.85), Xt(t, 0, ht(u, 1), r, ht(u, 1)), Xt(t, 0, ht(u + p, 1), r, ht(u + p, 1));
    const P = u + p / 2, w = `${g >= Gr ? "★ " : ""}${g} ${g === 1 ? "touch" : "touches"}`;
    wt(t, 6, P, w, e.color, "left"), wt(t, r - 4, P, Vt(s.price, n.pricePrecision), e.color, "right"), i && re(t, o.timeToX(s.time), o.priceToY(s.price), e.color), t.restore();
  },
  hitTest(t, e, o, i) {
    const n = t.points[0];
    if (!n) return !1;
    const s = Math.max(tn(t, "heightPct", wn), 1e-4), [r, l] = Vo(n.price, s), a = i.priceToY(l), c = i.priceToY(r);
    return o >= Math.min(a, c) - Tt && o <= Math.max(a, c) + Tt;
  }
}, Lt = 24, jr = 0.35, Jr = 0.8;
function Go(t, e) {
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
function Sn(t) {
  return t < 0 ? 0 : t >= Lt ? Lt - 1 : t;
}
function qo(t, e, o, i, n) {
  const s = new Float64Array(Lt);
  let r = 0;
  if (t.length > 0 && n > i) {
    const c = (n - i) / Lt, f = en(t, e), h = en(t, o + 1) - 1;
    for (let u = f; u <= h; u++) {
      const p = t[u];
      if (!(p.volume > 0)) continue;
      const g = Math.max(p.low, i), b = Math.min(p.high, n);
      if (b < g) continue;
      const P = p.high - p.low;
      if (P <= 0) {
        const v = Sn(Math.floor((p.close - i) / c));
        s[v] += p.volume, r += p.volume;
        continue;
      }
      const w = Sn(Math.floor((g - i) / c)), I = Sn(Math.ceil((b - i) / c) - 1);
      for (let v = w; v <= I; v++) {
        const L = i + v * c, k = Math.min(b, L + c) - Math.max(g, L);
        if (k > 0) {
          const E = p.volume * (k / P);
          s[v] += E, r += E;
        }
      }
    }
  }
  let l = 0, a = -1;
  for (let c = 0; c < Lt; c++)
    s[c] > l && (l = s[c], a = c);
  return { rows: s, max: l, pocIndex: a, total: r };
}
const Kr = {
  id: "volxray",
  label: "Volume X-Ray",
  group: "smart",
  pointsNeeded: 2,
  render(t, e, o, i, n) {
    const s = Go(e, o);
    if (!s) return;
    t.save();
    const r = s.right - s.left, l = s.bottom - s.top, a = Math.max(1, e.width);
    if (t.lineWidth = a, t.strokeStyle = e.color, t.strokeRect(s.left, s.top, r, l), !e.points[1]) {
      t.restore();
      return;
    }
    const c = qo(n.candles, s.tLo, s.tHi, s.pLo, s.pHi);
    if (c.max > 0 && s.pHi > s.pLo) {
      const f = (s.pHi - s.pLo) / Lt;
      for (let p = 0; p < Lt; p++) {
        const g = c.rows[p];
        if (g <= 0) continue;
        const b = o.priceToY(s.pLo + (p + 1) * f), P = o.priceToY(s.pLo + p * f), w = Math.min(b, P), I = Math.max(Math.abs(P - b) - 1, 1), v = g / c.max * r;
        t.fillStyle = Gt(t, e.color, p === c.pocIndex ? Jr : jr), t.fillRect(s.left, w + 0.5, v, I);
      }
      const h = s.pLo + (c.pocIndex + 0.5) * f, u = ht(o.priceToY(h), 1);
      t.lineWidth = 1, t.strokeStyle = e.color, t.setLineDash([4, 3]), Xt(t, s.left, u, s.right, u), t.setLineDash([]), wt(t, s.right + 6, u, `POC ${Vt(h, n.pricePrecision)}`, e.color, "left");
    }
    if (c.total > 0 && wt(t, s.left + 4, s.bottom - 11, `Σ ${Ri(c.total)}`, Fi, "left"), i)
      for (const f of e.points)
        re(t, o.timeToX(f.time), o.priceToY(f.price), e.color);
    t.restore();
  },
  hitTest(t, e, o, i, n) {
    if (!t.points[0] || !t.points[1]) return !1;
    const s = Go(t, i);
    if (!s) return !1;
    const r = Math.max(Tt, t.width / 2 + 3);
    if (!(e >= s.left - r && e <= s.right + r && o >= s.top - r && o <= s.bottom + r)) return !1;
    if (!(e > s.left + r && e < s.right - r && o > s.top + r && o < s.bottom - r)) return !0;
    if (s.pHi <= s.pLo) return !1;
    const c = qo(n.candles, s.tLo, s.tHi, s.pLo, s.pHi);
    if (c.max <= 0) return !1;
    const f = (s.pHi - s.pLo) / Lt, h = Math.floor((i.yToPrice(o) - s.pLo) / f);
    if (h < 0 || h >= Lt) return !1;
    const u = c.rows[h] / c.max * (s.right - s.left);
    return e <= s.left + u + r;
  }
}, Zr = 0.5, Qr = 0.08;
function Pn(t, e) {
  const o = Ei(t, e);
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
function An(t, e, o, i, n) {
  t.beginPath();
  for (let s = 0; s < i.n; s++) {
    const r = e.priceToY(i.vwap[s] + n * i.sd[s]);
    s === 0 ? t.moveTo(o[s], r) : t.lineTo(o[s], r);
  }
  t.stroke();
}
function zr(t, e, o, i) {
  t.strokeStyle = i, t.lineWidth = 1.5, t.beginPath(), t.moveTo(e + 0.5, o - 3), t.lineTo(e + 0.5, o - 16), t.stroke(), t.fillStyle = i, t.beginPath(), t.moveTo(e + 0.5, o - 16), t.lineTo(e + 10, o - 13), t.lineTo(e + 0.5, o - 10), t.closePath(), t.fill(), t.beginPath(), t.arc(e, o, 2.5, 0, Math.PI * 2), t.fill();
}
const xr = {
  id: "avwap",
  label: "Anchored VWAP",
  group: "smart",
  pointsNeeded: 1,
  render(t, e, o, i, n) {
    const s = e.points[0];
    if (!s || n.candles.length === 0) return;
    const r = Pn(n.candles, s.time);
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
      t.closePath(), t.fillStyle = Gt(t, e.color, Qr), t.fill(), t.lineJoin = "round", t.lineCap = "round", t.lineWidth = 1, t.strokeStyle = Gt(t, e.color, Zr), An(t, o, l, r, 1), An(t, o, l, r, -1), t.lineWidth = Math.max(1, e.width) + 1, t.strokeStyle = e.color, An(t, o, l, r, 0);
    } else
      t.fillStyle = e.color, t.beginPath(), t.arc(l[0], o.priceToY(r.vwap[0]), Math.max(1, e.width) + 1, 0, Math.PI * 2), t.fill();
    zr(t, l[0], o.priceToY(r.vwap[0]), e.color);
    const a = o.priceToY(r.vwap[r.n - 1]);
    wt(
      t,
      l[r.n - 1] + 8,
      a,
      `AVWAP ${Vt(r.vwap[r.n - 1], n.pricePrecision)}`,
      e.color,
      "left"
    ), i && re(t, l[0], o.priceToY(r.vwap[0]), e.color), t.restore();
  },
  hitTest(t, e, o, i, n) {
    const s = t.points[0];
    if (!s || n.candles.length === 0) return !1;
    const r = Pn(n.candles, s.time);
    if (!r) return !1;
    const l = n.candles, a = Tt + (Math.max(1, t.width) + 1) / 2, c = i.timeToX(l[r.start].time), f = i.timeToX(l[l.length - 1].time);
    if (e < c - a || e > f + a) return !1;
    if (r.n === 1) return Math.hypot(e - c, o - i.priceToY(r.vwap[0])) <= a;
    let h = Ei(l, i.xToTime(e)) - r.start;
    h < 0 && (h = 0), h > r.n - 1 && (h = r.n - 1);
    const u = Math.max(0, h - 2), p = Math.min(r.n - 2, h + 1);
    for (let g = u; g <= p; g++) {
      const b = i.timeToX(l[r.start + g].time), P = i.timeToX(l[r.start + g + 1].time), w = i.priceToY(r.vwap[g]), I = i.priceToY(r.vwap[g + 1]);
      if (Wr(e, o, b, w, P, I) <= a) return !0;
    }
    return !1;
  },
  handleAt(t, e, o, i, n) {
    const s = t.points[0];
    if (!s || n.candles.length === 0) return -1;
    const r = Pn(n.candles, s.time);
    if (!r) return -1;
    const l = i.timeToX(n.candles[r.start].time), a = i.priceToY(r.vwap[0]);
    return Math.abs(e - l) <= Ht && Math.abs(o - a) <= Ht ? 0 : -1;
  },
  moveHandle(t, e, o) {
    return e !== 0 ? t : { ...t, points: [{ time: o.time, price: o.price }] };
  }
}, tl = [
  ...Hr,
  Ur,
  Kr,
  xr
], el = "#089981", nl = "#f23645", _i = 0.08, ol = 0.06, il = 0.07, sl = 0.05;
function rl(t, e) {
  const o = t.points[1];
  return !o || !(e > 0) ? 0 : Math.round(Math.abs(o.time - t.points[0].time) / e);
}
function ll(t) {
  return t === 1 ? "1 bar" : `${t} bars`;
}
function al(t, e) {
  if (!(Math.abs(t) > 0)) return null;
  const o = (e - t) / Math.abs(t) * 100;
  return isFinite(o) ? o : null;
}
function Di(t, e) {
  return Math.atan2(-(e.y - t.y), e.x - t.x) * 180 / Math.PI;
}
function oo(t, e, o, i, n, s, r = 0.5) {
  t.save(), t.setLineDash([4, 4]), t.strokeStyle = _(t, e, r), t.lineWidth = 1, $(t, o, i, n, s), t.restore();
}
function Ke(t, e, o, i, n, s, r) {
  let l = 1;
  return o !== 0 && (l = Math.max(l, (0 - t) / o, (n - t) / o)), i !== 0 && (l = Math.max(l, (0 - e) / i, (s - e) / i)), Math.min(l, r > 0 ? 1e6 / r : 1);
}
const cl = {
  id: "infoline",
  label: "Info Line",
  group: "lines",
  pointsNeeded: 2,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]), r = e.points[1];
    if (!r) {
      q(t, s.x, s.y, e.width), i && N(t, e, o);
      return;
    }
    const l = M(o, r), c = r.price >= e.points[0].price ? el : nl;
    t.strokeStyle = c, t.lineWidth = Math.max(1, e.width), $(t, s.x, s.y, l.x, l.y);
    const f = r.price - e.points[0].price, h = al(e.points[0].price, r.price), u = rl(e, n.barMs), p = Di(s, l), b = `${h === null ? `Δ ${ke(f, n.pricePrecision)}` : `Δ ${ke(f, n.pricePrecision)}  ${Ce(h)}`}  ·  ${ll(u)}  ·  ${p.toFixed(0)}°`;
    At(t, (s.x + l.x) / 2, (s.y + l.y) / 2, [b], c), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    if (!t.points[1]) return !1;
    const n = M(i, t.points[0]), s = M(i, t.points[1]);
    return lt(e, o, n.x, n.y, s.x, s.y, 0, 1) <= V(t);
  }
}, fl = {
  id: "crossline",
  label: "Cross Line",
  group: "lines",
  pointsNeeded: 1,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]), { w: r, h: l } = rt(t), a = yt(s.x, t.lineWidth), c = yt(s.y, t.lineWidth);
    $(t, 0, c, r, c), $(t, a, 0, a, l);
    const f = vt(e.points[0].price, n.pricePrecision);
    Ko(t, Math.max(2, r - Zo(t, f) - 2), c, f, e.color);
    const h = zn(e.points[0].time, n.barMs), u = Zo(t, h);
    Ko(t, Math.max(2, Math.min(r - u - 2, a - u / 2)), l - 10, h, e.color), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = M(i, t.points[0]), s = V(t);
    return Math.abs(e - n.x) <= s || Math.abs(o - n.y) <= s;
  }
}, hl = {
  id: "trendangle",
  label: "Trend Angle",
  group: "lines",
  pointsNeeded: 2,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1];
    if (!s) {
      q(t, n.x, n.y, e.width), i && N(t, e, o);
      return;
    }
    const r = M(o, s);
    $(t, n.x, n.y, r.x, r.y);
    const l = r.x >= n.x ? 1 : -1, a = Math.min(34, Math.max(16, Math.hypot(r.x - n.x, r.y - n.y) * 0.45));
    oo(t, e.color, n.x, n.y, n.x + l * a, n.y, 0.5);
    const c = Math.atan2(r.y - n.y, r.x - n.x), f = l > 0 ? 0 : Math.PI;
    t.save(), t.beginPath(), t.strokeStyle = _(t, e.color, 0.7), t.lineWidth = 1, t.setLineDash([]);
    const h = l > 0 ? c < f : c > f;
    t.arc(n.x, n.y, a, f, c, h), t.stroke(), t.restore();
    const u = Di(n, r), p = (f + c) / 2, g = n.x + Math.cos(p) * (a + 12), b = n.y + Math.sin(p) * (a + 12);
    At(t, g, b, [`${u.toFixed(0)}°`], e.color, bi), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    if (!t.points[1]) return !1;
    const n = M(i, t.points[0]), s = M(i, t.points[1]);
    return lt(e, o, n.x, n.y, s.x, s.y, 0, 1) <= V(t);
  }
}, ul = {
  id: "channeldisjoint",
  label: "Disjoint Channel",
  group: "channels",
  pointsNeeded: 4,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1];
    if (!s) {
      q(t, n.x, n.y, e.width), i && N(t, e, o);
      return;
    }
    const r = M(o, s), l = e.points[2], a = e.points[3];
    if (l && a) {
      const c = M(o, l), f = M(o, a);
      t.fillStyle = _(t, e.color, _i), t.beginPath(), t.moveTo(n.x, n.y), t.lineTo(r.x, r.y), t.lineTo(f.x, f.y), t.lineTo(c.x, c.y), t.closePath(), t.fill(), $(t, c.x, c.y, f.x, f.y);
    } else if (l) {
      const c = M(o, l);
      q(t, c.x, c.y, e.width);
    }
    $(t, n.x, n.y, r.x, r.y), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    if (!t.points[3]) return !1;
    const n = M(i, t.points[0]), s = M(i, t.points[1]), r = M(i, t.points[2]), l = M(i, t.points[3]), a = V(t);
    return Q(e, o, n, s) <= a || Q(e, o, r, l) <= a ? !0 : jt(e, o, [n, s, l, r]);
  }
}, pl = {
  id: "channelflat",
  label: "Flat Channel",
  group: "channels",
  pointsNeeded: 3,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1];
    if (!s) {
      q(t, n.x, n.y, e.width), i && N(t, e, o);
      return;
    }
    const r = M(o, s), l = e.points[2];
    if (l) {
      const a = o.priceToY(l.price), c = { x: n.x, y: a }, f = { x: r.x, y: a };
      t.fillStyle = _(t, e.color, _i), t.beginPath(), t.moveTo(n.x, n.y), t.lineTo(r.x, r.y), t.lineTo(f.x, f.y), t.lineTo(c.x, c.y), t.closePath(), t.fill(), $(t, c.x, c.y, f.x, f.y);
    }
    $(t, n.x, n.y, r.x, r.y), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    if (!t.points[2]) return !1;
    const n = M(i, t.points[0]), s = M(i, t.points[1]), r = i.priceToY(t.points[2].price), l = { x: n.x, y: r }, a = { x: s.x, y: r }, c = V(t);
    return Q(e, o, n, s) <= c || Q(e, o, l, a) <= c ? !0 : jt(e, o, [n, s, a, l]);
  }
};
function Uo(t, e) {
  let o = 0, i = t.length;
  for (; o < i; ) {
    const n = o + i >> 1;
    t[n].time < e ? o = n + 1 : i = n;
  }
  return o;
}
function jo(t, e) {
  const { candles: o } = e;
  if (o.length < 2 || !t.points[1]) return null;
  const i = Math.min(t.points[0].time, t.points[1].time), n = Math.max(t.points[0].time, t.points[1].time);
  let s = Uo(o, i), r = Uo(o, n);
  r >= o.length && (r = o.length - 1), s > r && (s = r);
  const l = r - s + 1;
  if (l < 2) return null;
  let a = 0, c = 0, f = 0, h = 0;
  for (let w = s; w <= r; w++) {
    const I = w - s, v = o[w].close;
    a += I, c += v, f += I * I, h += I * v;
  }
  const u = l * f - a * a;
  if (Math.abs(u) < 1e-12) return null;
  const p = (l * h - a * c) / u, g = (c - p * a) / l;
  let b = 0;
  for (let w = s; w <= r; w++) {
    const I = w - s, v = o[w].close - (g + p * I);
    b += v * v;
  }
  const P = Math.sqrt(b / l);
  return { i0: s, i1: r, slope: p, intercept: g, sigma: P };
}
const ml = {
  id: "regression",
  label: "Regression Channel",
  group: "channels",
  pointsNeeded: 2,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]), r = e.points[1];
    if (!r) {
      q(t, s.x, s.y, e.width), i && N(t, e, o);
      return;
    }
    const l = M(o, r), a = jo(e, n);
    if (!a) {
      oo(t, e.color, s.x, s.y, l.x, l.y, 0.6), i && N(t, e, o);
      return;
    }
    const { candles: c } = n, { i0: f, i1: h, slope: u, intercept: p, sigma: g } = a, b = (U) => p + u * U, P = o.timeToX(c[f].time), w = o.timeToX(c[h].time), I = h - f, v = o.priceToY(b(0)), L = o.priceToY(b(I)), k = 2 * g, E = o.priceToY(b(0) + k), B = o.priceToY(b(I) + k), J = o.priceToY(b(0) - k), K = o.priceToY(b(I) - k);
    t.fillStyle = _(t, e.color, il), t.beginPath(), t.moveTo(P, E), t.lineTo(w, B), t.lineTo(w, K), t.lineTo(P, J), t.closePath(), t.fill(), t.save(), t.strokeStyle = _(t, e.color, 0.6), t.lineWidth = 1, $(t, P, E, w, B), $(t, P, J, w, K), t.restore(), t.strokeStyle = e.color, t.lineWidth = Math.max(1, e.width), $(t, P, v, w, L);
    const j = `${ke(u, n.pricePrecision)}/bar`;
    At(t, w + 4 + gl(t, j), L, [j], e.color, nt), i && N(t, e, o);
  },
  hitTest(t, e, o, i, n) {
    if (!t.points[1]) return !1;
    const s = jo(t, n);
    if (!s) return !1;
    const { candles: r } = n, { i0: l, i1: a, slope: c, intercept: f, sigma: h } = s, u = (L) => f + c * L, p = i.timeToX(r[l].time), g = i.timeToX(r[a].time), b = a - l, P = V(t);
    if (e < Math.min(p, g) - P || e > Math.max(p, g) + P) return !1;
    const w = [
      { x: p, y: i.priceToY(u(0) + 2 * h) },
      { x: g, y: i.priceToY(u(b) + 2 * h) }
    ], I = [
      { x: p, y: i.priceToY(u(0) - 2 * h) },
      { x: g, y: i.priceToY(u(b) - 2 * h) }
    ], v = [
      { x: p, y: i.priceToY(u(0)) },
      { x: g, y: i.priceToY(u(b)) }
    ];
    return Q(e, o, w[0], w[1]) <= P || Q(e, o, I[0], I[1]) <= P || Q(e, o, v[0], v[1]) <= P ? !0 : jt(e, o, [w[0], w[1], I[1], I[0]]);
  }
};
function gl(t, e) {
  return t.font = nt, (t.measureText(e).width + 16) / 2;
}
function io(t, e, o, i, n) {
  const { origin: s, b: r, c: l, target: a } = i, c = a.x - s.x, f = a.y - s.y, h = Math.hypot(c, f), { w: u, h: p } = rt(t);
  if (h < 1e-6) {
    $(t, r.x, r.y, l.x, l.y), n && N(t, e, o);
    return;
  }
  const g = Ke(s.x, s.y, c, f, u, p, h), b = Ke(r.x, r.y, c, f, u, p, h), P = Ke(l.x, l.y, c, f, u, p, h), w = { x: r.x + c * b, y: r.y + f * b }, I = { x: l.x + c * P, y: l.y + f * P };
  t.fillStyle = _(t, e.color, ol), t.beginPath(), t.moveTo(r.x, r.y), t.lineTo(w.x, w.y), t.lineTo(I.x, I.y), t.lineTo(l.x, l.y), t.closePath(), t.fill(), t.save(), t.strokeStyle = _(t, e.color, 0.85), t.lineWidth = Math.max(1, e.width), $(t, r.x, r.y, w.x, w.y), $(t, l.x, l.y, I.x, I.y), t.restore(), oo(t, e.color, r.x, r.y, l.x, l.y, 0.5), t.strokeStyle = e.color, t.lineWidth = Math.max(1, e.width), $(t, s.x, s.y, s.x + c * g, s.y + f * g), n && N(t, e, o);
}
function so(t, e, o, i, n) {
  const { origin: s, b: r, c: l, target: a } = n, c = a.x - s.x, f = a.y - s.y, h = V(t);
  if (Math.hypot(c, f) < 1e-6) return Q(e, o, r, l) <= h;
  const u = Number.POSITIVE_INFINITY;
  return lt(e, o, s.x, s.y, s.x + c, s.y + f, 0, u) <= h || lt(e, o, r.x, r.y, r.x + c, r.y + f, 0, u) <= h || lt(e, o, l.x, l.y, l.x + c, l.y + f, 0, u) <= h || Q(e, o, r, l) <= h;
}
function St(t, e) {
  return { x: (t.x + e.x) / 2, y: (t.y + e.y) / 2 };
}
function Ue(t, e, o) {
  return { x: t.x + (e.x - t.x) * o, y: t.y + (e.y - t.y) * o };
}
function fe(t, e) {
  return !t.points[1] || !t.points[2] ? null : { a: M(e, t.points[0]), b: M(e, t.points[1]), c: M(e, t.points[2]) };
}
function ro(t, e, o, i) {
  const n = M(o, e.points[0]), s = e.points[1];
  if (!s)
    return q(t, n.x, n.y, e.width), i && N(t, e, o), !0;
  if (!e.points[2]) {
    const r = M(o, s);
    return $(t, n.x, n.y, r.x, r.y), i && N(t, e, o), !0;
  }
  return !1;
}
const yl = {
  id: "pitchforkschiff",
  label: "Schiff Pitchfork",
  group: "channels",
  pointsNeeded: 3,
  render(t, e, o, i) {
    if (ro(t, e, o, i)) return;
    const { a: n, b: s, c: r } = fe(e, o);
    io(t, e, o, { origin: St(n, s), b: s, c: r, target: St(s, r) }, i);
  },
  hitTest(t, e, o, i) {
    const n = fe(t, i);
    return n ? so(t, e, o, i, {
      origin: St(n.a, n.b),
      b: n.b,
      c: n.c,
      target: St(n.b, n.c)
    }) : !1;
  }
}, bl = {
  id: "pitchforkmod",
  label: "Modified Schiff Pitchfork",
  group: "channels",
  pointsNeeded: 3,
  render(t, e, o, i) {
    if (ro(t, e, o, i)) return;
    const { a: n, b: s, c: r } = fe(e, o), l = St(s, r);
    io(t, e, o, { origin: St(n, l), b: s, c: r, target: l }, i);
  },
  hitTest(t, e, o, i) {
    const n = fe(t, i);
    if (!n) return !1;
    const s = St(n.b, n.c);
    return so(t, e, o, i, { origin: St(n.a, s), b: n.b, c: n.c, target: s });
  }
}, dl = {
  id: "pitchforkinside",
  label: "Inside Pitchfork",
  group: "channels",
  pointsNeeded: 3,
  render(t, e, o, i) {
    if (ro(t, e, o, i)) return;
    const { a: n, b: s, c: r } = fe(e, o);
    io(
      t,
      e,
      o,
      { origin: n, b: Ue(s, r, 0.25), c: Ue(s, r, 0.75), target: St(s, r) },
      i
    );
  },
  hitTest(t, e, o, i) {
    const n = fe(t, i);
    return n ? so(t, e, o, i, {
      origin: n.a,
      b: Ue(n.b, n.c, 0.25),
      c: Ue(n.b, n.c, 0.75),
      target: St(n.b, n.c)
    }) : !1;
  }
}, kn = [
  { label: "8x1", mult: 8 },
  { label: "4x1", mult: 4 },
  { label: "2x1", mult: 2 },
  { label: "1x1", mult: 1 },
  { label: "1x2", mult: 1 / 2 },
  { label: "1x4", mult: 1 / 4 },
  { label: "1x8", mult: 1 / 8 }
], Jo = [
  "#9c27b0",
  "#f23645",
  "#ff9800",
  "#089981",
  "#00bcd4",
  "#3f7bd8",
  "#787b86"
], Tl = {
  id: "gannfan",
  label: "Gann Fan",
  group: "channels",
  pointsNeeded: 2,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1];
    if (!s) {
      q(t, n.x, n.y, e.width), i && N(t, e, o);
      return;
    }
    const r = M(o, s), { w: l, h: a } = rt(t), c = r.x - n.x, f = r.y - n.y;
    if (Math.abs(c) < 1e-6 && Math.abs(f) < 1e-6) {
      q(t, n.x, n.y, e.width), i && N(t, e, o);
      return;
    }
    t.save(), t.lineWidth = 1, t.font = nt, t.textBaseline = "middle";
    for (let h = 0; h < kn.length; h++) {
      const u = kn[h], p = c, g = f * u.mult, b = Math.hypot(p, g);
      if (b < 1e-6) continue;
      const P = Ke(n.x, n.y, p, g, l, a, b), w = n.x + p * P, I = n.y + g * P, v = u.mult === 1;
      t.strokeStyle = v ? e.color : _(t, Jo[h], 0.85), $(t, n.x, n.y, w, I);
      const L = Math.min(P, 0.42 * Math.min(l, a) / b), k = n.x + p * L, E = n.y + g * L;
      k > 2 && k < l - 24 && E > 8 && E < a - 8 && (t.fillStyle = _(t, v ? e.color : Jo[h], 0.8), t.textAlign = p >= 0 ? "left" : "right", t.fillText(u.label, k + (p >= 0 ? 3 : -3), E - 6));
    }
    t.restore(), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    if (!t.points[1]) return !1;
    const n = M(i, t.points[0]), s = M(i, t.points[1]), r = s.x - n.x, l = s.y - n.y, a = V(t), c = Number.POSITIVE_INFINITY;
    for (const f of kn) {
      const h = r, u = l * f.mult;
      if (!(Math.hypot(h, u) < 1e-6) && lt(e, o, n.x, n.y, n.x + h, n.y + u, 0, c) <= a)
        return !0;
    }
    return !1;
  }
}, Ml = [0, 0.25, 0.382, 0.5, 0.618, 0.75, 1], wl = {
  id: "gannbox",
  label: "Gann Box",
  group: "channels",
  pointsNeeded: 2,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1];
    if (!s) {
      q(t, n.x, n.y, e.width), i && N(t, e, o);
      return;
    }
    const r = M(o, s), l = Math.min(n.x, r.x), a = Math.max(n.x, r.x), c = Math.min(n.y, r.y), f = Math.max(n.y, r.y), h = a - l, u = f - c;
    t.fillStyle = _(t, e.color, sl), t.fillRect(l, c, h, u), t.save(), t.lineWidth = 1, t.strokeStyle = _(t, e.color, 0.4), t.font = nt, t.fillStyle = _(t, e.color, 0.7), t.textBaseline = "top";
    for (const p of Ml) {
      if (p === 0 || p === 1) continue;
      const g = l + h * p, b = c + u * p;
      $(t, g, c, g, f), $(t, l, b, a, b);
    }
    t.strokeStyle = _(t, e.color, 0.55), $(t, l, c, a, f), $(t, l, f, a, c), t.restore(), t.strokeStyle = e.color, t.lineWidth = Math.max(1, e.width), t.strokeRect(l, c, h, u), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    return t.points[1] ? _t(e, o, M(i, t.points[0]), M(i, t.points[1]), V(t)) : !1;
  }
};
function Ko(t, e, o, i, n) {
  t.font = nt;
  const s = 4, r = t.measureText(i).width + s * 2, l = 15;
  Pt(t, e, o - l / 2, r, l, 3), t.fillStyle = n, t.fill(), t.fillStyle = Ne(t, n), t.textAlign = "left", t.textBaseline = "middle", t.fillText(i, e + s, o + 0.5);
}
function Zo(t, e) {
  return t.font = nt, t.measureText(e).width + 8;
}
const Sl = [
  // LINES group
  cl,
  fl,
  hl,
  // CHANNELS group
  ul,
  pl,
  ml,
  yl,
  bl,
  dl,
  Tl,
  wl
], Wi = 0.07, ue = 0.85, Pl = 0.55, $i = /* @__PURE__ */ new Set([0.382, 0.5, 0.618]);
function le(t, e, o, i) {
  t.save(), t.setLineDash([4, 4]), t.strokeStyle = _(t, e, Pl), t.lineWidth = 1, $(t, o.x, o.y, i.x, i.y), t.restore();
}
const Al = {
  id: "fibtimezone",
  label: "Fib Time Zone",
  group: "fib",
  pointsNeeded: 2,
  render(t, e, o, i) {
    const n = M(o, e.points[0]);
    if (!e.points[1]) {
      q(t, n.x, n.y, e.width), i && N(t, e, o);
      return;
    }
    const r = e.points[1].time - e.points[0].time, { w: l, h: a } = rt(t), c = Math.max(1, e.width);
    t.lineWidth = c, t.font = nt, t.textAlign = "center", t.textBaseline = "bottom";
    for (const f of et(e, "fibtimezone")) {
      if (!f.visible) continue;
      const h = f.ratio, u = yt(o.timeToX(e.points[0].time + r * h), c);
      if (u < -2 || u > l + 2) continue;
      const p = h === 0 || h === 1;
      t.strokeStyle = _(t, f.color ?? e.color, p ? ue : 0.6), $(t, u, 0, u, a), t.fillStyle = _(t, f.color ?? e.color, 0.95), t.fillText(f.label ?? String(h), u, a - 4);
    }
    i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    if (!t.points[1]) return !1;
    const n = t.points[1].time - t.points[0].time, s = V(t);
    for (const r of et(t, "fibtimezone"))
      if (r.visible && Math.abs(e - i.timeToX(t.points[0].time + n * r.ratio)) <= s)
        return !0;
    return !1;
  }
}, kl = {
  id: "fibfan",
  label: "Fib Speed Fan",
  group: "fib",
  pointsNeeded: 2,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1];
    if (!s) {
      q(t, n.x, n.y, e.width), i && N(t, e, o);
      return;
    }
    const r = M(o, s), { w: l, h: a } = rt(t), c = r.x - n.x, f = r.y - n.y;
    t.font = nt, t.textAlign = "left", t.textBaseline = "middle", t.lineWidth = Math.max(1, e.width);
    for (const h of et(e, "fibfan")) {
      if (!h.visible) continue;
      const u = h.ratio, p = n.y + f * u, g = n.x + c, b = rn(n.x, n.y, g, p, l, a, !1);
      b && (t.strokeStyle = _(t, h.color ?? e.color, ue), $(t, b[0], b[1], b[2], b[3]), (h.label ?? $i.has(u)) && (t.fillStyle = _(t, h.color ?? e.color, 0.95), t.fillText(h.label ?? String(u), g + 4, p)));
    }
    le(t, e.color, n, r), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    if (!t.points[1]) return !1;
    const n = M(i, t.points[0]), s = M(i, t.points[1]), r = s.x - n.x, l = s.y - n.y, a = V(t), c = Number.POSITIVE_INFINITY;
    for (const f of et(t, "fibfan")) {
      if (!f.visible) continue;
      const h = n.y + l * f.ratio, u = n.x + r;
      if (Ll(e, o, n.x, n.y, u, h, a, c)) return !0;
    }
    return !1;
  }
};
function Ll(t, e, o, i, n, s, r, l) {
  const a = n - o, c = s - i, f = a * a + c * c;
  let h = f === 0 ? 0 : ((t - o) * a + (e - i) * c) / f;
  return h = Math.max(0, Math.min(l, h)), Math.hypot(t - (o + h * a), e - (i + h * c)) <= r;
}
function Qo(t, e, o) {
  if (Math.abs(e.x - t.x) > 1e-9) {
    const i = (o.x - t.x) / (e.x - t.x), n = t.y + i * (e.y - t.y);
    return { x: 0, y: o.y - n };
  }
  return { x: o.x - t.x, y: 0 };
}
const Il = {
  id: "fibchannel",
  label: "Fib Channel",
  group: "fib",
  pointsNeeded: 3,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]), r = e.points[1];
    if (!r) {
      q(t, s.x, s.y, e.width), i && N(t, e, o);
      return;
    }
    const l = M(o, r), a = e.points[2];
    if (!a) {
      $(t, s.x, s.y, l.x, l.y), i && N(t, e, o);
      return;
    }
    const c = Qo(s, l, M(o, a)), f = Math.max(1, e.width), h = et(e, "fibchannel");
    for (let u = 0; u < h.length - 1; u++) {
      if (!h[u].visible || !h[u + 1].visible) continue;
      const p = h[u].ratio, g = h[u + 1].ratio;
      t.fillStyle = _(t, h[u + 1].color ?? e.color, Wi), t.beginPath(), t.moveTo(s.x + c.x * p, s.y + c.y * p), t.lineTo(l.x + c.x * p, l.y + c.y * p), t.lineTo(l.x + c.x * g, l.y + c.y * g), t.lineTo(s.x + c.x * g, s.y + c.y * g), t.closePath(), t.fill();
    }
    t.font = nt, t.textAlign = "left", t.textBaseline = "bottom", t.lineWidth = f;
    for (const u of h) {
      if (!u.visible) continue;
      const p = u.ratio, g = { x: s.x + c.x * p, y: s.y + c.y * p }, b = { x: l.x + c.x * p, y: l.y + c.y * p }, P = p === 0 || p === 1;
      t.strokeStyle = _(t, u.color ?? e.color, P ? ue : 0.6), $(t, g.x, g.y, b.x, b.y);
      const w = e.points[0].price + (e.points[2].price - e.points[0].price) * p;
      t.fillStyle = _(t, u.color ?? e.color, 0.95), t.fillText(`${u.label ?? p} — ${vt(w, n.pricePrecision)}`, b.x + 4, b.y - 2);
    }
    i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    if (!t.points[1] || !t.points[2]) return !1;
    const n = M(i, t.points[0]), s = M(i, t.points[1]), r = Qo(n, s, M(i, t.points[2])), l = V(t);
    for (const a of et(t, "fibchannel")) {
      if (!a.visible) continue;
      const c = { x: n.x + r.x * a.ratio, y: n.y + r.y * a.ratio }, f = { x: s.x + r.x * a.ratio, y: s.y + r.y * a.ratio };
      if (Nl(e, o, c, f) <= l) return !0;
    }
    return !1;
  }
};
function Nl(t, e, o, i) {
  const n = i.x - o.x, s = i.y - o.y, r = n * n + s * s;
  let l = r === 0 ? 0 : ((t - o.x) * n + (e - o.y) * s) / r;
  return l = Math.max(0, Math.min(1, l)), Math.hypot(t - (o.x + l * n), e - (o.y + l * s));
}
const Cl = {
  id: "fibcircle",
  label: "Fib Circle",
  group: "fib",
  pointsNeeded: 2,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]), r = e.points[1];
    if (!r) {
      q(t, s.x, s.y, e.width), i && N(t, e, o);
      return;
    }
    const l = M(o, r), a = Math.hypot(l.x - s.x, l.y - s.y), c = Math.max(1, e.width);
    t.lineWidth = c, t.font = nt, t.textAlign = "center", t.textBaseline = "bottom";
    const f = et(e, "fibcircle");
    for (let h = f.length - 1; h >= 0; h--) {
      const u = f[h];
      if (!u.visible || u.ratio <= 0) continue;
      const p = a * u.ratio;
      p < 0.5 || (t.beginPath(), t.ellipse(s.x, s.y, p, p, 0, 0, Math.PI * 2), t.fillStyle = _(t, u.color ?? e.color, Wi), t.fill());
    }
    for (const h of f) {
      if (!h.visible || h.ratio <= 0) continue;
      const u = a * h.ratio;
      u < 0.5 || (t.beginPath(), t.ellipse(s.x, s.y, u, u, 0, 0, Math.PI * 2), t.strokeStyle = _(t, h.color ?? e.color, h.ratio === 1 ? ue : 0.6), t.stroke(), t.fillStyle = _(t, h.color ?? e.color, 0.95), t.fillText(h.label ?? String(h.ratio), s.x, s.y - u - 2));
    }
    le(t, e.color, s, l), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    if (!t.points[1]) return !1;
    const n = M(i, t.points[0]), s = M(i, t.points[1]), r = Math.hypot(s.x - n.x, s.y - n.y), l = Math.hypot(e - n.x, o - n.y), a = V(t);
    for (const c of et(t, "fibcircle"))
      if (!(!c.visible || c.ratio <= 0) && Math.abs(l - r * c.ratio) <= a)
        return !0;
    return !1;
  }
}, Fl = {
  id: "fibtimeext",
  label: "Fib Time Extension",
  group: "fib",
  pointsNeeded: 3,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1];
    if (!s) {
      q(t, n.x, n.y, e.width), i && N(t, e, o);
      return;
    }
    const r = M(o, s), l = e.points[2];
    if (!l) {
      le(t, e.color, n, r), i && N(t, e, o);
      return;
    }
    const a = M(o, l), c = e.points[1].time - e.points[0].time, { w: f, h } = rt(t), u = Math.max(1, e.width);
    le(t, e.color, n, r), le(t, e.color, r, a), t.lineWidth = u, t.font = nt, t.textAlign = "center", t.textBaseline = "bottom";
    for (const p of et(e, "fibtimeext")) {
      if (!p.visible) continue;
      const g = p.ratio, b = yt(o.timeToX(e.points[2].time + c * g), u);
      b < -2 || b > f + 2 || (t.strokeStyle = _(t, p.color ?? e.color, g === 0 || g === 1 ? ue : 0.6), $(t, b, 0, b, h), t.fillStyle = _(t, p.color ?? e.color, 0.95), t.fillText(p.label ?? String(g), b, h - 4));
    }
    i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    if (!t.points[1] || !t.points[2]) return !1;
    const n = t.points[1].time - t.points[0].time, s = V(t);
    for (const r of et(t, "fibtimeext"))
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
      q(t, n.x, n.y, e.width), i && N(t, e, o);
      return;
    }
    const r = M(o, s), l = Math.hypot(r.x - n.x, r.y - n.y), a = Math.atan2(r.y - n.y, r.x - n.x), c = a - Math.PI / 2, f = a + Math.PI / 2, h = Math.max(1, e.width);
    t.lineWidth = h, t.font = nt, t.textAlign = "center", t.textBaseline = "middle";
    for (const u of et(e, "fibwedge")) {
      if (!u.visible) continue;
      const p = u.ratio, g = l * p;
      if (!(g < 0.5) && (t.beginPath(), t.ellipse(n.x, n.y, g, g, 0, c, f), t.strokeStyle = _(t, u.color ?? e.color, p === 1 ? ue : 0.6), t.stroke(), u.label ?? $i.has(p))) {
        const b = n.x + Math.cos(a) * g, P = n.y + Math.sin(a) * g;
        t.fillStyle = _(t, u.color ?? e.color, 0.95), t.fillText(u.label ?? String(p), b, P);
      }
    }
    le(t, e.color, n, r), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    if (!t.points[1]) return !1;
    const n = M(i, t.points[0]), s = M(i, t.points[1]), r = Math.hypot(s.x - n.x, s.y - n.y), l = Math.atan2(s.y - n.y, s.x - n.x), a = Math.atan2(o - n.y, e - n.x);
    let c = Math.abs(a - l);
    if (c > Math.PI && (c = Math.PI * 2 - c), c > Math.PI / 2) return !1;
    const f = Math.hypot(e - n.x, o - n.y), h = V(t);
    for (const u of et(t, "fibwedge"))
      if (u.visible && Math.abs(f - r * u.ratio) <= h)
        return !0;
    return !1;
  }
}, Rl = [
  Al,
  kl,
  Il,
  Cl,
  Fl,
  vl
], Yi = 0.08, zo = 14;
function Oi(t, e) {
  if (!(e.length < 2)) {
    t.lineJoin = "round", t.lineCap = "round", t.beginPath(), t.moveTo(e[0].x, e[0].y);
    for (let o = 1; o < e.length; o++) t.lineTo(e[o].x, e[o].y);
    t.stroke();
  }
}
function nn(t, e, o) {
  t.fillStyle = e.color;
  for (const i of o) t.fillRect(i.x - 2.5, i.y - 2.5, 5, 5);
}
function Bi(t, e, o, i, n) {
  t.font = nt;
  const r = t.measureText(i).width + 4 * 2, l = 14;
  Pt(t, e - r / 2, o - l / 2, r, l, 3), t.fillStyle = n, t.fill(), t.fillStyle = Ne(t, n), t.textAlign = "center", t.textBaseline = "middle", t.fillText(i, e, o + 0.5);
}
function Rt(t, e, o, i, n) {
  const s = Math.hypot(o.x, o.y) || 1;
  Bi(t, e.x + o.x / s * zo, e.y + o.y / s * zo, i, n);
}
function pe(t) {
  let e = 0, o = 0;
  for (const i of t)
    e += i.x, o += i.y;
  return { x: e / t.length, y: o / t.length };
}
function Et(t, e) {
  const o = t.x - e.x, i = t.y - e.y;
  return Math.hypot(o, i) < 1 ? { x: 0, y: -1 } : { x: o, y: i };
}
function Ln(t, e, o, i, n) {
  t.fillStyle = _(t, n, Yi), t.beginPath(), t.moveTo(e.x, e.y), t.lineTo(o.x, o.y), t.lineTo(i.x, i.y), t.closePath(), t.fill();
}
function Se(t, e, o, i, n) {
  Bi(t, (e.x + o.x) / 2, (e.y + o.y) / 2, i, n);
}
function Mt(t, e, o) {
  const i = t.points[e], n = t.points[o];
  return !i || !n ? 0 : Math.abs(n.price - i.price);
}
function Pe(t, e) {
  return e > 1e-12 ? (t / e).toFixed(3) : "—";
}
function Jt(t, e, o, i) {
  if (t.points.length < 2) return !1;
  const n = gt(t, i), s = V(t);
  for (let r = 0; r < n.length - 1; r++)
    if (Q(e, o, n[r], n[r + 1]) <= s) return !0;
  return !1;
}
function Fe(t, e, o, i = !0) {
  const n = gt(e, o);
  return n.length === 1 ? (q(t, n[0].x, n[0].y, e.width), n) : (i && Oi(t, n), nn(t, e, n), n);
}
function Hi(t, e, o) {
  var n;
  const i = (n = t.props) == null ? void 0 : n[e];
  return typeof i == "boolean" ? i : o;
}
function Xi(t, e) {
  var i;
  const o = (i = t.props) == null ? void 0 : i[e];
  return typeof o == "string" ? o : "";
}
const El = {
  id: "abcd",
  label: "ABCD Pattern",
  group: "patterns",
  pointsNeeded: 4,
  render(t, e, o, i) {
    const n = Fe(t, e, o), s = ["A", "B", "C", "D"], r = pe(n);
    for (let l = 0; l < n.length; l++)
      Rt(t, n[l], Et(n[l], r), s[l], e.color);
    n.length >= 3 && Se(t, n[1], n[2], Pe(Mt(e, 1, 2), Mt(e, 0, 1)), e.color), n.length >= 4 && Se(t, n[2], n[3], `CD ${Pe(Mt(e, 2, 3), Mt(e, 0, 1))}`, e.color), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    return t.points.length < 4 ? !1 : Jt(t, e, o, i);
  }
};
function Vi(t, e, o, i, n) {
  const s = gt(e, o);
  if (s.length === 1) {
    q(t, s[0].x, s[0].y, e.width), i && N(t, e, o);
    return;
  }
  s.length >= 4 && Ln(t, s[1], s[2], s[3], e.color), s.length >= 3 && Ln(t, s[0], s[1], s[2], e.color), s.length >= 5 && Ln(t, s[2], s[3], s[4], e.color), Oi(t, s), nn(t, e, s);
  const r = ["X", "A", "B", "C", "D"], l = pe(s);
  for (let a = 0; a < s.length; a++)
    Rt(t, s[a], Et(s[a], l), r[a], e.color);
  if (s.length >= 3 && Se(t, s[1], s[2], Pe(Mt(e, 1, 2), Mt(e, 0, 1)), e.color), s.length >= 4 && Se(t, s[2], s[3], Pe(Mt(e, 2, 3), Mt(e, 1, 2)), e.color), s.length >= 5) {
    const a = Pe(Mt(e, 3, 4), Mt(e, 2, 3));
    Se(t, s[3], s[4], n ? `${a} ${n}` : a, e.color);
  }
  i && N(t, e, o);
}
const _l = {
  id: "xabcd",
  label: "XABCD Pattern",
  group: "patterns",
  pointsNeeded: 5,
  render(t, e, o, i) {
    Vi(t, e, o, i, "");
  },
  hitTest(t, e, o, i) {
    return t.points.length < 5 ? !1 : Jt(t, e, o, i);
  }
}, Dl = {
  id: "cypher",
  label: "Cypher Pattern",
  group: "patterns",
  pointsNeeded: 5,
  render(t, e, o, i) {
    Vi(t, e, o, i, "Cypher 0.786");
  },
  hitTest(t, e, o, i) {
    return t.points.length < 5 ? !1 : Jt(t, e, o, i);
  }
}, Wl = {
  id: "headshoulders",
  label: "Head & Shoulders",
  group: "patterns",
  pointsNeeded: 7,
  render(t, e, o, i) {
    const n = Fe(t, e, o);
    if (n.length >= 5) {
      const l = n[2], a = n[4], { w: c, h: f } = rt(t), h = rn(l.x, l.y, a.x, a.y, c, f, !0);
      h && (t.save(), t.setLineDash([5, 4]), t.strokeStyle = _(t, e.color, 0.6), t.lineWidth = Math.max(1, e.width), $(t, h[0], h[1], h[2], h[3]), t.restore());
    }
    const s = pe(n), r = [
      [1, "LS"],
      [3, "H"],
      [5, "RS"]
    ];
    for (const [l, a] of r) {
      const c = n[l];
      if (c) {
        const f = Et(c, s);
        Rt(t, c, { x: f.x, y: -Math.abs(f.y) - 0.5 }, a, e.color);
      }
    }
    i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    return t.points.length < 7 ? !1 : Jt(t, e, o, i);
  }
}, $l = {
  id: "threedrives",
  label: "Three Drives",
  group: "patterns",
  pointsNeeded: 7,
  render(t, e, o, i) {
    const n = Fe(t, e, o), s = pe(n), r = {
      1: "1",
      2: "A",
      3: "2",
      4: "B",
      5: "3"
    };
    for (let l = 0; l < n.length; l++) {
      const a = r[l];
      a && Rt(t, n[l], Et(n[l], s), a, e.color);
    }
    i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    return t.points.length < 7 ? !1 : Jt(t, e, o, i);
  }
}, Yl = {
  id: "elliottimpulse",
  label: "Elliott Impulse",
  group: "patterns",
  pointsNeeded: 6,
  defaultProps: { showConnector: !0, waveDegree: "" },
  render(t, e, o, i) {
    const n = Fe(t, e, o, Hi(e, "showConnector", !0)), s = pe(n);
    for (let l = 1; l < n.length; l++)
      Rt(t, n[l], Et(n[l], s), String(l), e.color);
    const r = Xi(e, "waveDegree");
    r && n.length >= 1 && Rt(t, n[0], Et(n[0], s), r, e.color), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    return t.points.length < 6 ? !1 : Jt(t, e, o, i);
  }
}, Ol = {
  id: "elliottcorrection",
  label: "Elliott Correction",
  group: "patterns",
  pointsNeeded: 4,
  defaultProps: { showConnector: !0, waveDegree: "" },
  render(t, e, o, i) {
    const n = Fe(t, e, o, Hi(e, "showConnector", !0)), s = ["", "A", "B", "C"], r = pe(n);
    for (let a = 1; a < n.length; a++)
      Rt(t, n[a], Et(n[a], r), s[a], e.color);
    const l = Xi(e, "waveDegree");
    l && n.length >= 1 && Rt(t, n[0], Et(n[0], r), l, e.color), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    return t.points.length < 4 ? !1 : Jt(t, e, o, i);
  }
};
function Bl(t, e, o, i) {
  const n = { x: e.x - t.x, y: e.y - t.y }, s = { x: i.x - o.x, y: i.y - o.y }, r = n.x * s.y - n.y * s.x;
  if (Math.abs(r) < 1e-9) return null;
  const l = ((o.x - t.x) * s.y - (o.y - t.y) * s.x) / r;
  return { x: t.x + l * n.x, y: t.y + l * n.y };
}
const Hl = {
  id: "trianglepattern",
  label: "Triangle Pattern",
  group: "patterns",
  pointsNeeded: 4,
  render(t, e, o, i) {
    const n = gt(e, o);
    if (n.length === 1) {
      q(t, n[0].x, n[0].y, e.width), i && N(t, e, o);
      return;
    }
    if (n.length === 2) {
      $(t, n[0].x, n[0].y, n[1].x, n[1].y), nn(t, e, n), i && N(t, e, o);
      return;
    }
    if (n.length >= 4) {
      const s = Bl(n[0], n[2], n[1], n[3]);
      t.fillStyle = _(t, e.color, Yi), t.beginPath(), t.moveTo(n[0].x, n[0].y), t.lineTo(n[1].x, n[1].y), t.lineTo(n[3].x, n[3].y), t.lineTo(n[2].x, n[2].y), t.closePath(), t.fill(), t.strokeStyle = e.color, t.lineWidth = Math.max(1, e.width);
      const r = s ?? n[2], l = s ?? n[3];
      $(t, n[0].x, n[0].y, r.x, r.y), $(t, n[1].x, n[1].y, l.x, l.y);
    } else
      $(t, n[0].x, n[0].y, n[2].x, n[2].y), $(t, n[0].x, n[0].y, n[1].x, n[1].y);
    nn(t, e, n), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    if (t.points.length < 4) return !1;
    const n = gt(t, i), s = V(t);
    return Q(e, o, n[0], n[2]) <= s || Q(e, o, n[1], n[3]) <= s;
  }
}, Xl = [
  El,
  _l,
  Dl,
  Wl,
  $l,
  Yl,
  Ol,
  Hl
], Gi = 0.12, qi = 0.1, ln = 0.4, Vl = 0.45, Gl = 0.12;
function xo(t, e) {
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
function ti(t, e) {
  let o = 0, i = t.length;
  for (; o < i; ) {
    const n = o + i >> 1;
    t[n].time < e ? o = n + 1 : i = n;
  }
  return o;
}
function Ui(t, e, o, i, n, s, r, l, a) {
  const c = l.priceToY(i), f = l.priceToY(n), h = l.priceToY(s), u = l.priceToY(r);
  t.strokeStyle = _(t, a, Vl), t.lineWidth = 1, $(t, e, f, e, h);
  const p = Math.min(c, u), g = Math.max(c, u), b = Math.max(g - p, 1);
  t.fillStyle = _(t, a, Gl), t.fillRect(e - o, p, o * 2, b), t.strokeRect(e - o, p, o * 2, b);
}
const ql = {
  id: "rotrect",
  label: "Rotated Rectangle",
  group: "shapes",
  pointsNeeded: 3,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1];
    if (!s) {
      q(t, n.x, n.y, e.width), i && N(t, e, o);
      return;
    }
    const r = M(o, s);
    if (!e.points[2]) {
      $(t, n.x, n.y, r.x, r.y), i && N(t, e, o);
      return;
    }
    const l = xo(e, o);
    if (!l) {
      $(t, n.x, n.y, r.x, r.y), i && N(t, e, o);
      return;
    }
    t.beginPath(), t.moveTo(l[0].x, l[0].y);
    for (let a = 1; a < l.length; a++) t.lineTo(l[a].x, l[a].y);
    t.closePath(), t.fillStyle = _(t, e.color, Gi), t.fill(), t.lineJoin = "round", t.stroke(), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = xo(t, i);
    if (!n) return !1;
    if (jt(e, o, n)) return !0;
    const s = V(t);
    for (let r = 0; r < n.length; r++)
      if (Q(e, o, n[r], n[(r + 1) % n.length]) <= s) return !0;
    return !1;
  }
}, Ul = {
  id: "circle",
  label: "Circle",
  group: "shapes",
  pointsNeeded: 2,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1];
    if (!s) {
      q(t, n.x, n.y, e.width), i && N(t, e, o);
      return;
    }
    const r = M(o, s), l = Math.max(Math.hypot(r.x - n.x, r.y - n.y), 0.5);
    t.beginPath(), t.arc(n.x, n.y, l, 0, Math.PI * 2), t.fillStyle = _(t, e.color, Gi), t.fill(), t.stroke(), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    if (!t.points[1]) return !1;
    const n = M(i, t.points[0]), s = M(i, t.points[1]), r = Math.hypot(s.x - n.x, s.y - n.y);
    return Math.hypot(e - n.x, o - n.y) <= r + V(t);
  }
}, jl = {
  id: "arc",
  label: "Arc",
  group: "shapes",
  pointsNeeded: 3,
  render(t, e, o, i) {
    const n = e.points[0], s = e.points[1], r = e.points[2], l = M(o, n);
    if (!s) {
      q(t, l.x, l.y, e.width), i && N(t, e, o);
      return;
    }
    const a = M(o, s);
    if (!r) {
      $(t, a.x, a.y, l.x, l.y), i && N(t, e, o);
      return;
    }
    const c = M(o, r), f = Math.max(Math.hypot(l.x - a.x, l.y - a.y), 0.5), h = Math.atan2(l.y - a.y, l.x - a.x), u = Math.atan2(c.y - a.y, c.x - a.x);
    t.beginPath(), t.arc(a.x, a.y, f, h, u), t.lineCap = "round", t.stroke(), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    if (!t.points[2]) return !1;
    const n = M(i, t.points[1]), s = M(i, t.points[0]), r = M(i, t.points[2]), l = Math.hypot(s.x - n.x, s.y - n.y);
    if (Math.abs(Math.hypot(e - n.x, o - n.y) - l) > V(t)) return !1;
    let c = Math.atan2(s.y - n.y, s.x - n.x), f = Math.atan2(r.y - n.y, r.x - n.x), h = Math.atan2(o - n.y, e - n.x);
    const u = (b) => b < 0 ? b + Math.PI * 2 : b;
    c = u(c), f = u(f), h = u(h);
    const p = u(f - c);
    return u(h - c) <= p;
  }
}, Jl = {
  id: "curve",
  label: "Curve",
  group: "shapes",
  pointsNeeded: 3,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = e.points[1];
    if (!s) {
      q(t, n.x, n.y, e.width), i && N(t, e, o);
      return;
    }
    const r = M(o, s), l = e.points[2];
    if (!l) {
      $(t, n.x, n.y, r.x, r.y), i && N(t, e, o);
      return;
    }
    const a = M(o, l);
    t.beginPath(), t.moveTo(n.x, n.y), t.quadraticCurveTo(r.x, r.y, a.x, a.y), t.lineCap = "round", t.stroke(), i && (t.save(), t.setLineDash([3, 3]), t.lineWidth = 1, t.strokeStyle = _(t, e.color, 0.5), $(t, n.x, n.y, r.x, r.y), $(t, a.x, a.y, r.x, r.y), t.restore(), N(t, e, o));
  },
  hitTest(t, e, o, i) {
    if (!t.points[2]) return !1;
    const n = M(i, t.points[0]), s = M(i, t.points[1]), r = M(i, t.points[2]), l = V(t), a = 24;
    let c = n.x, f = n.y;
    for (let h = 1; h <= a; h++) {
      const u = h / a, p = 1 - u, g = p * p * n.x + 2 * p * u * s.x + u * u * r.x, b = p * p * n.y + 2 * p * u * s.y + u * u * r.y;
      if (Q(e, o, { x: c, y: f }, { x: g, y: b }) <= l) return !0;
      c = g, f = b;
    }
    return !1;
  }
}, Kl = {
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
      i && N(t, e, o);
    }
  },
  hitTest(t, e, o, i) {
    if (t.points.length < 4) return !1;
    const n = gt(t, i), s = V(t);
    for (let r = 0; r < n.length - 1; r++)
      if (Q(e, o, n[r], n[r + 1]) <= s) return !0;
    return !1;
  }
};
function ji(t) {
  const e = t.points[0].price, o = t.points[1].price;
  if (!(Math.abs(e) > 0)) return null;
  const i = (o - e) / Math.abs(e) * 100;
  return isFinite(i) ? i : null;
}
function Ji(t, e) {
  return e > 0 ? Math.round(Math.abs(t.points[1].time - t.points[0].time) / e) : 0;
}
const Zl = {
  id: "forecast",
  label: "Forecast",
  group: "projection",
  pointsNeeded: 2,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]);
    if (!e.points[1]) {
      q(t, s.x, s.y, e.width), i && N(t, e, o);
      return;
    }
    const r = M(o, e.points[1]), l = e.points[1].price - e.points[0].price, a = e.points[1].price + Math.abs(l) * 0.25, c = e.points[1].price - Math.abs(l) * 0.25, f = o.priceToY(a), h = o.priceToY(c);
    t.beginPath(), t.moveTo(s.x, s.y), t.lineTo(r.x, f), t.lineTo(r.x, h), t.closePath(), t.fillStyle = _(t, e.color, qi), t.fill(), t.save(), t.setLineDash([2, 3]), t.lineWidth = 1, t.strokeStyle = _(t, e.color, ln), $(t, s.x, s.y, r.x, f), $(t, s.x, s.y, r.x, h), t.restore(), t.save(), t.setLineDash([5, 4]), t.lineWidth = Math.max(1, e.width), t.strokeStyle = e.color, $(t, s.x, s.y, r.x, r.y), t.restore();
    const u = ji(e), p = Ji(e, n.barMs), g = u === null ? `${p} bars` : `${Ce(u)} · ${p} bars`;
    At(t, r.x, r.y, [g], e.color), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    if (!t.points[1]) return !1;
    const n = M(i, t.points[0]), s = M(i, t.points[1]), r = t.points[1].price - t.points[0].price, l = i.priceToY(t.points[1].price + Math.abs(r) * 0.25), a = i.priceToY(t.points[1].price - Math.abs(r) * 0.25), c = [n, { x: s.x, y: l }, { x: s.x, y: a }];
    return jt(e, o, c) ? !0 : Q(e, o, n, s) <= V(t);
  }
}, Ql = {
  id: "barspattern",
  label: "Bars Pattern",
  group: "projection",
  pointsNeeded: 2,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]);
    if (!e.points[1]) {
      q(t, s.x, s.y, e.width), i && N(t, e, o);
      return;
    }
    const r = M(o, e.points[1]), l = n.candles;
    if (t.save(), t.setLineDash([4, 4]), t.lineWidth = 1, t.strokeStyle = _(t, e.color, ln), t.strokeRect(
      Math.min(s.x, r.x),
      Math.min(s.y, r.y),
      Math.abs(r.x - s.x),
      Math.abs(r.y - s.y)
    ), t.restore(), l.length > 0 && n.barMs > 0) {
      const a = Math.min(e.points[0].time, e.points[1].time), c = Math.max(e.points[0].time, e.points[1].time), f = ti(l, a), h = ti(l, c + 1), u = l.slice(f, h);
      if (u.length > 0) {
        const p = l[l.length - 1], g = p.time + n.barMs, b = p.close - u[0].open, P = o.timeToX(g), w = o.timeToX(g + n.barMs), I = Math.max(1, Math.abs(w - P) * 0.32);
        for (let v = 0; v < u.length; v++) {
          const L = u[v], k = o.timeToX(g + v * n.barMs);
          Ui(
            t,
            k,
            I,
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
    i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    return t.points[1] ? _t(e, o, M(i, t.points[0]), M(i, t.points[1]), V(t)) : !1;
  }
}, zl = {
  id: "ghostfeed",
  label: "Ghost Feed",
  group: "projection",
  pointsNeeded: 2,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]);
    if (!e.points[1]) {
      q(t, s.x, s.y, e.width), i && N(t, e, o);
      return;
    }
    const r = M(o, e.points[1]);
    t.save(), t.setLineDash([2, 3]), t.lineWidth = 1, t.strokeStyle = _(t, e.color, ln), $(t, s.x, s.y, r.x, r.y), t.restore();
    const l = n.barMs;
    if (l > 0) {
      const a = e.points[0].time, c = e.points[1].time, f = e.points[0].price, h = e.points[1].price, u = Math.max(1, Math.round(Math.abs(c - a) / l)), p = c >= a ? 1 : -1, g = o.timeToX(a), b = o.timeToX(a + p * l), P = Math.max(1, Math.abs(b - g) * 0.32);
      let w = f;
      for (let I = 1; I <= u; I++) {
        const v = I / u, L = f + (h - f) * v, k = w, B = Math.abs(L - k) * 0.6 + Math.abs(h - f) / u / 4, J = (I % 2 === 0 ? 1 : -1) * B, K = Math.max(k, L) + Math.abs(J) * 0.5 + B * 0.3, j = Math.min(k, L) - Math.abs(J) * 0.5 - B * 0.3, U = o.timeToX(a + p * I * l);
        Ui(t, U, P, k, K, j, L, o, e.color), w = L;
      }
      At(t, r.x, r.y, [`ghost ×${u}`], e.color);
    }
    i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    return t.points[1] ? _t(e, o, M(i, t.points[0]), M(i, t.points[1]), V(t)) : !1;
  }
}, xl = {
  id: "dprange",
  label: "Date & Price Range",
  group: "projection",
  pointsNeeded: 2,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]);
    if (!e.points[1]) {
      q(t, s.x, s.y, e.width), i && N(t, e, o);
      return;
    }
    const r = M(o, e.points[1]), l = Math.min(s.x, r.x), a = Math.min(s.y, r.y), c = Math.abs(r.x - s.x), f = Math.abs(r.y - s.y);
    t.fillStyle = _(t, e.color, qi), t.fillRect(l, a, c, f), t.save(), t.setLineDash([4, 4]), t.lineWidth = 1, t.strokeStyle = _(t, e.color, ln), t.strokeRect(l, a, c, f), t.restore();
    const h = e.points[1].price - e.points[0].price, u = ji(e), p = Ji(e, n.barMs), g = Math.abs(e.points[1].time - e.points[0].time), b = ke(h, n.pricePrecision), P = u === null ? "" : ` (${Ce(u)})`, w = p === 1 ? "1 bar" : `${p} bars`, I = `Δ ${b}${P} · ${w} · ${Ti(g)}`;
    At(t, (s.x + r.x) / 2, (s.y + r.y) / 2, [I], e.color), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    return t.points[1] ? _t(e, o, M(i, t.points[0]), M(i, t.points[1]), V(t)) : !1;
  }
}, ta = [
  ql,
  Ul,
  jl,
  Jl,
  Kl,
  Zl,
  Ql,
  zl,
  xl
], ea = 26, na = 3, ae = 16, lo = 8, ao = 6, oa = "#089981", ia = "#f23645", sa = new Set(
  ["#2962ff", "#787b86", "#5d606b", "#b2b5be", "#ffffff", "#000000"].map((t) => t.toLowerCase())
);
function ra(t) {
  return sa.has(t.trim().toLowerCase());
}
const Ft = /* @__PURE__ */ new Map();
function ve(t, e) {
  return Ft.size > 512 && Ft.clear(), Ft.set(t, e), e;
}
function qt(t, e) {
  var r;
  const o = (t.text ?? "").trim(), i = o.length === 0, n = Mi(i ? e : o, ea, na), s = typeof ((r = t.props) == null ? void 0 : r.emoji) == "string" ? t.props.emoji.trim() : "";
  return s.length > 0 && n.length > 0 && (n[0] = `${s} ${n[0]}`), { lines: n, isPlaceholder: i };
}
function co(t, e) {
  t.font = ce;
  let o = 0;
  for (const i of e) o = Math.max(o, t.measureText(i).width);
  return { w: o + lo * 2, h: e.length * ae + ao * 2 };
}
function fo(t) {
  let e = 0;
  for (const o of t) e = Math.max(e, o.length);
  return { w: e * 7 + lo * 2, h: t.length * ae + ao * 2 };
}
function ho(t, e, o, i, n, s) {
  t.font = ce, t.fillStyle = s ? _(t, n, 0.55) : n, t.textAlign = "left", t.textBaseline = "middle";
  for (let r = 0; r < e.length; r++)
    t.fillText(e[r], o + lo, i + ao + ae * (r + 0.5));
}
function he(t, e, o, i) {
  return t >= o.x - i && t <= o.x + o.w + i && e >= o.y - i && e <= o.y + o.h + i;
}
const la = {
  id: "text",
  label: "Text",
  group: "annotate",
  pointsNeeded: 1,
  defaultProps: { emoji: "" },
  render(t, e, o, i) {
    const n = M(o, e.points[0]), { lines: s, isPlaceholder: r } = qt(e, "Text"), { w: l, h: a } = co(t, s), c = n.x, f = n.y, h = ve(e.id, { x: c, y: f, w: l, h: a });
    Pt(t, h.x, h.y, h.w, h.h, 4), t.fillStyle = _(t, e.color, 0.08), t.fill(), i && (t.lineWidth = 1, t.strokeStyle = _(t, e.color, 0.6), t.stroke()), ho(t, s, h.x, h.y, e.color, r), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = M(i, t.points[0]), s = Ft.get(t.id);
    if (s) return he(e, o, s, 2);
    const { lines: r } = qt(t, "Text"), { w: l, h: a } = fo(r);
    return he(e, o, { x: n.x, y: n.y, w: l, h: a }, 2);
  }
}, aa = {
  id: "callout",
  label: "Callout",
  group: "annotate",
  pointsNeeded: 2,
  defaultProps: { emoji: "" },
  render(t, e, o, i) {
    const n = M(o, e.points[0]);
    if (!e.points[1]) {
      t.fillStyle = e.color, t.beginPath(), t.arc(n.x, n.y, Math.max(2, e.width + 1), 0, Math.PI * 2), t.fill(), i && N(t, e, o);
      return;
    }
    const s = M(o, e.points[1]), { lines: r, isPlaceholder: l } = qt(e, "Callout"), { w: a, h: c } = co(t, r), f = s.x - a / 2, h = s.y - c / 2, u = ve(e.id, { x: f, y: h, w: a, h: c }), p = ei(u, n.x, n.y);
    t.lineWidth = Math.max(1, e.width), t.strokeStyle = e.color, t.fillStyle = e.color;
    const g = Math.hypot(n.x - p.x, n.y - p.y);
    if (g > 1) {
      const b = Math.atan2(n.y - p.y, n.x - p.x), P = 7, w = (n.x - p.x) / g, I = (n.y - p.y) / g;
      $(t, p.x, p.y, n.x - w * Math.min(P * 0.7, g), n.y - I * Math.min(P * 0.7, g)), xe(t, n.x, n.y, b, P);
    }
    Pt(t, u.x, u.y, u.w, u.h, 6), t.fillStyle = _(t, e.color, 0.14), t.fill(), t.lineWidth = 1, t.strokeStyle = i ? e.color : _(t, e.color, 0.5), t.stroke(), ho(t, r, u.x, u.y, e.color, l), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = M(i, t.points[0]), s = M(i, t.points[1]);
    let r = Ft.get(t.id);
    if (!r) {
      const { lines: a } = qt(t, "Callout"), { w: c, h: f } = fo(a);
      r = { x: s.x - c / 2, y: s.y - f / 2, w: c, h: f };
    }
    if (he(e, o, r, 2)) return !0;
    const l = ei(r, n.x, n.y);
    return ca(e, o, l, n) <= Math.max(6, t.width / 2 + 3);
  }
};
function ei(t, e, o) {
  const i = t.x + t.w / 2, n = t.y + t.h / 2, s = e - i, r = o - n;
  if (s === 0 && r === 0) return { x: i, y: n };
  const l = t.w / 2, a = t.h / 2, c = s !== 0 ? l / Math.abs(s) : 1 / 0, f = r !== 0 ? a / Math.abs(r) : 1 / 0, h = Math.min(c, f);
  return { x: i + s * h, y: n + r * h };
}
function ca(t, e, o, i) {
  const n = i.x - o.x, s = i.y - o.y, r = n * n + s * s;
  let l = r === 0 ? 0 : ((t - o.x) * n + (e - o.y) * s) / r;
  return l = Math.max(0, Math.min(1, l)), Math.hypot(t - (o.x + l * n), e - (o.y + l * s));
}
const de = 9, ni = 12, fa = {
  id: "comment",
  label: "Comment",
  group: "annotate",
  pointsNeeded: 1,
  defaultProps: { emoji: "" },
  render(t, e, o, i) {
    const n = M(o, e.points[0]), { lines: s, isPlaceholder: r } = qt(e, "Comment"), { w: l, h: a } = co(t, s), c = n.x - l / 2, f = n.y - ni - a, h = ve(e.id, { x: c, y: f, w: l, h: a });
    Pt(t, h.x, h.y, h.w, h.h, 7), t.fillStyle = _(t, e.color, 0.14), t.fill(), t.lineWidth = 1, t.strokeStyle = i ? e.color : _(t, e.color, 0.5), t.stroke();
    const u = Math.min(Math.max(n.x, h.x + 8), h.x + h.w - 8);
    t.beginPath(), t.moveTo(u - de / 2, h.y + h.h - 0.5), t.lineTo(u + de / 2, h.y + h.h - 0.5), t.lineTo(n.x, n.y), t.closePath(), t.fillStyle = _(t, e.color, 0.14), t.fill(), t.strokeStyle = i ? e.color : _(t, e.color, 0.5), t.beginPath(), t.moveTo(u - de / 2, h.y + h.h - 0.5), t.lineTo(n.x, n.y), t.lineTo(u + de / 2, h.y + h.h - 0.5), t.stroke(), ho(t, s, h.x, h.y, e.color, r), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = M(i, t.points[0]);
    let s = Ft.get(t.id);
    if (!s) {
      const { lines: r } = qt(t, "Comment"), { w: l, h: a } = fo(r);
      s = { x: n.x - l / 2, y: n.y - ni - a, w: l, h: a };
    }
    return he(e, o, s, 2) ? !0 : Math.abs(e - n.x) <= de && o >= s.y + s.h - 2 && o <= n.y + 2;
  }
}, Bt = 14, ha = {
  id: "pricelabel",
  label: "Price Label",
  group: "annotate",
  pointsNeeded: 1,
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]), r = yt(s.y, t.lineWidth), l = vt(e.points[0].price, n.pricePrecision);
    t.lineWidth = Math.max(1, e.width), t.strokeStyle = e.color, $(t, s.x - Bt / 2, r, s.x + Bt / 2, r), t.font = ce;
    const a = 6, c = t.measureText(l).width + a * 2, f = 18, h = s.x + Bt / 2 + 4, u = r - f / 2;
    ve(e.id, { x: s.x - Bt / 2, y: u, w: Bt / 2 + 4 + c, h: f }), Pt(t, h, u, c, f, 3), t.fillStyle = e.color, t.fill(), t.fillStyle = Ne(t, e.color), t.textAlign = "left", t.textBaseline = "middle", t.fillText(l, h + a, r + 0.5), i && N(t, e, o);
  },
  hitTest(t, e, o, i, n) {
    const s = M(i, t.points[0]), r = Ft.get(t.id);
    if (r) return he(e, o, r, 2);
    const l = vt(t.points[0].price, n.pricePrecision).length * 7 + 12 + Bt;
    return e >= s.x - Bt / 2 - 2 && e <= s.x + l && Math.abs(o - s.y) <= 11;
  }
}, In = 8, Nn = 5, ua = {
  id: "signpost",
  label: "Signpost",
  group: "annotate",
  pointsNeeded: 1,
  defaultProps: { emoji: "" },
  render(t, e, o, i, n) {
    const s = M(o, e.points[0]), { h: r } = rt(t), l = yt(s.x, t.lineWidth);
    t.lineWidth = Math.max(1, e.width), t.strokeStyle = e.color, $(t, l, r, l, s.y);
    const { lines: a, isPlaceholder: c } = qt(e, "Signpost"), f = zn(e.points[0].time, n.barMs);
    t.font = ce;
    let h = t.measureText(f).width;
    for (const I of a) h = Math.max(h, t.measureText(I).width);
    const u = h + In * 2, g = (a.length + 1) * ae + Nn * 2, b = l, P = s.y - g, w = ve(e.id, { x: b, y: P, w: u, h: g });
    Pt(t, w.x, w.y, w.w, w.h, 4), t.fillStyle = _(t, e.color, 0.16), t.fill(), t.lineWidth = 1, t.strokeStyle = i ? e.color : _(t, e.color, 0.55), t.stroke(), t.font = ce, t.textAlign = "left", t.textBaseline = "middle";
    for (let I = 0; I < a.length; I++)
      t.fillStyle = c ? _(t, e.color, 0.55) : e.color, t.fillText(a[I], w.x + In, w.y + Nn + ae * (I + 0.5));
    t.fillStyle = _(t, e.color, 0.7), t.fillText(f, w.x + In, w.y + Nn + ae * (a.length + 0.5)), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = M(i, t.points[0]), s = Ft.get(t.id);
    return s && he(e, o, s, 2) ? !0 : Math.abs(e - n.x) <= Math.max(6, t.width / 2 + 3) && o >= n.y - 2;
  }
}, Le = 13;
function Ki(t, e) {
  return ra(t.color) ? e ? oa : ia : t.color;
}
function Zi(t, e, o, i, n) {
  const s = Le, r = i ? 1 : -1, l = s * 0.62, a = s * 0.26, c = o, f = o + r * s * 0.7, h = o + r * s * 1.6;
  t.beginPath(), t.moveTo(e, c), t.lineTo(e - l, f), t.lineTo(e - a, f), t.lineTo(e - a, h), t.lineTo(e + a, h), t.lineTo(e + a, f), t.lineTo(e + l, f), t.closePath(), t.fillStyle = n, t.fill(), t.lineWidth = 1, t.lineJoin = "round", t.strokeStyle = _(t, n, 0.9), t.stroke();
}
const pa = {
  id: "arrowup",
  label: "Arrow Up",
  group: "annotate",
  pointsNeeded: 1,
  render(t, e, o, i) {
    const n = M(o, e.points[0]);
    Zi(t, n.x, n.y, !0, Ki(e, !0)), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = M(i, t.points[0]);
    return Math.abs(e - n.x) <= Le * 0.7 + 3 && o >= n.y - 3 && o <= n.y + Le * 1.6 + 3;
  }
}, ma = {
  id: "arrowdown",
  label: "Arrow Down",
  group: "annotate",
  pointsNeeded: 1,
  render(t, e, o, i) {
    const n = M(o, e.points[0]);
    Zi(t, n.x, n.y, !1, Ki(e, !1)), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = M(i, t.points[0]);
    return Math.abs(e - n.x) <= Le * 0.7 + 3 && o <= n.y + 3 && o >= n.y - Le * 1.6 - 3;
  }
}, oi = 22, ii = 14, Cn = 10, ga = {
  id: "flag",
  label: "Flag",
  group: "annotate",
  pointsNeeded: 1,
  render(t, e, o, i) {
    const n = M(o, e.points[0]), s = yt(n.x, t.lineWidth), r = n.y - oi;
    t.lineWidth = Math.max(1.5, e.width), t.strokeStyle = e.color, t.lineCap = "round", $(t, s, n.y, s, r), t.beginPath(), t.moveTo(s, r), t.lineTo(s + ii, r + Cn / 2), t.lineTo(s, r + Cn), t.closePath(), t.fillStyle = e.color, t.fill(), i && N(t, e, o);
  },
  hitTest(t, e, o, i) {
    const n = M(i, t.points[0]), s = n.y - oi, r = Math.abs(e - n.x) <= Math.max(6, t.width / 2 + 3) && o >= s - 2 && o <= n.y + 2, l = e >= n.x - 2 && e <= n.x + ii + 2 && o >= s - 2 && o <= s + Cn + 2;
    return r || l;
  }
}, ya = [
  la,
  aa,
  fa,
  ha,
  ua,
  pa,
  ma,
  ga
], ba = [
  ...Ks,
  ...tr,
  ...fr,
  ...yr,
  ...wr,
  ...Cr,
  ...tl,
  ...Sl,
  ...Rl,
  ...Xl,
  ...ta,
  ...ya
], Ut = ba.reduce(
  (t, e) => (t[e.id] = e, t),
  {}
), da = [
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
], Ta = [
  "lines",
  "channels",
  "fib",
  "patterns",
  "shapes",
  "annotate",
  "measure",
  "projection",
  "smart"
], Ma = {
  lines: "Lines",
  channels: "Channels",
  fib: "Fibonacci",
  patterns: "Patterns",
  shapes: "Shapes",
  annotate: "Annotate",
  measure: "Measure",
  projection: "Projection",
  smart: "Smart"
}, wa = Ta.map((t) => ({
  group: t,
  label: Ma[t],
  tools: da.filter((e) => {
    var o;
    return ((o = Ut[e]) == null ? void 0 : o.group) === t;
  }).map((e) => ({
    id: e,
    label: Ut[e].label
  }))
})), df = wa.flatMap(
  (t) => t.tools
);
function uo(t) {
  const e = Ut[t];
  if (!e) throw new Error(`drawings: no ToolImpl registered for tool "${t}"`);
  return e;
}
function je(t) {
  return uo(t).pointsNeeded;
}
const Sa = "#2962ff";
function Fn(t, e) {
  const o = uo(t), i = {
    id: `d_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`,
    tool: t,
    points: [{ time: e.time, price: e.price }],
    color: Sa,
    width: 1
  };
  return o.defaultProps && (i.props = { ...o.defaultProps }), i;
}
function vn(t, e, o, i, n) {
  if (e.points.length === 0) return;
  const s = Ut[e.tool];
  s && (t.save(), t.lineWidth = Math.max(1, e.width), t.strokeStyle = e.color, t.fillStyle = e.color, t.setLineDash([]), t.lineCap = "butt", t.lineJoin = "miter", s.render(t, e, o, i, n), t.restore());
}
function si(t, e, o, i, n) {
  const s = Ut[t.tool];
  return !s || !(s.pointsNeeded >= 0 ? t.points.length >= s.pointsNeeded : t.points.length >= 2) ? !1 : s.hitTest(t, e, o, i, n);
}
function ri(t, e, o, i, n) {
  const s = Ut[t.tool];
  if (s != null && s.handleAt) return s.handleAt(t, e, o, i, n);
  for (let r = t.points.length - 1; r >= 0; r--) {
    const l = t.points[r];
    if (Math.abs(e - i.timeToX(l.time)) <= ze && Math.abs(o - i.priceToY(l.price)) <= ze)
      return r;
  }
  return -1;
}
function Pa(t, e, o) {
  return {
    ...t,
    points: t.points.map((i) => ({ time: i.time + e, price: i.price + o }))
  };
}
function Aa(t, e, o, i) {
  if (e < 0 || e >= t.points.length) return t;
  const n = Ut[t.tool];
  return n != null && n.moveHandle ? n.moveHandle(t, e, o, i) : {
    ...t,
    points: t.points.map((s, r) => r === e ? { time: o.time, price: o.price } : s)
  };
}
const ka = /* @__PURE__ */ new Set([
  "renko",
  "kagi",
  "linebreak",
  "pnf",
  "range"
]);
function oe(t) {
  return ka.has(t);
}
function La(t) {
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
function Ia(t, e) {
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
function po(t) {
  const e = t.length;
  if (e === 0) return 1;
  const o = t[e - 1].close, i = Math.abs(o) * 5e-3 || 1, n = Ia(t, 14) * 0.5, s = n > 0 ? n : i;
  return s > 0 ? s : i;
}
function Na(t, e) {
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
function Ca(t, e = 3) {
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
function Fa(t) {
  return po(t);
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
function Ra(t) {
  return po(t);
}
function Ea(t, e) {
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
function _a(t, e) {
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
const Da = {
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
}, Dt = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', Wa = '10px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
class $a {
  constructor() {
    /** Candle open times, ascending (epoch ms). */
    ot(this, "times", []);
    /** Estimated uniform bar interval (ms), used to extrapolate beyond the data. */
    ot(this, "intervalMs", 6e4);
    /** Plot-area width in CSS px (excludes the price axis column). */
    ot(this, "plotWidth", 0);
    ot(this, "view", { start: -80, end: 80 });
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
class Te {
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
    let n = jn(o / i);
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
function jn(t) {
  if (!(t > 0) || !isFinite(t)) return 1;
  const e = Math.pow(10, Math.floor(Math.log10(t)));
  for (const o of [1, 2, 5, 10])
    if (o * e >= t) return o * e;
  return 10 * e;
}
function li(t) {
  return !(t > 0) || !isFinite(t) ? 2 : Math.max(0, Math.min(8, -Math.floor(Math.log10(t) + 1e-9)));
}
function Me(t, e) {
  return isFinite(t) ? t.toLocaleString("en-US", {
    minimumFractionDigits: e,
    maximumFractionDigits: e
  }) : "—";
}
function Ya(t) {
  if (!isFinite(t)) return "—";
  const e = Math.abs(t);
  return e >= 1e12 ? (t / 1e12).toFixed(2) + "T" : e >= 1e9 ? (t / 1e9).toFixed(2) + "B" : e >= 1e6 ? (t / 1e6).toFixed(2) + "M" : e >= 1e3 ? (t / 1e3).toFixed(2) + "K" : e >= 100 ? t.toFixed(0) : e >= 1 ? t.toFixed(2) : t.toFixed(4);
}
function Oa(t) {
  let e = 1;
  for (; ; ) {
    for (const o of [1, 2, 5]) {
      const i = o * e;
      if (i >= t) return i;
    }
    e *= 10;
  }
}
function Ba(t) {
  const e = t.barSpacing();
  if (!(e > 0) || t.plotWidth <= 0) return [];
  const o = Oa(Math.max(1, Math.ceil(90 / e))), i = [], n = Math.ceil(t.view.start / o) * o;
  for (let s = n; s < t.view.end; s += o) {
    const r = t.centerX(s);
    r < -1 || r > t.plotWidth + 1 || i.push({ index: s, x: r, time: t.indexToTime(s) });
  }
  return i;
}
const Jn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function Ae(t) {
  return t < 10 ? "0" + t : String(t);
}
function Ha(t, e, o) {
  const i = new Date(t), n = e !== null ? new Date(e) : null;
  return o >= 864e5 ? n && i.getFullYear() !== n.getFullYear() ? String(i.getFullYear()) : !n || i.getMonth() !== n.getMonth() ? Jn[i.getMonth()] : String(i.getDate()) : !n || i.getDate() !== n.getDate() || i.getMonth() !== n.getMonth() || i.getFullYear() !== n.getFullYear() ? `${i.getDate()} ${Jn[i.getMonth()]}` : `${Ae(i.getHours())}:${Ae(i.getMinutes())}`;
}
function Xa(t, e) {
  const o = new Date(t), i = `${o.getDate()} ${Jn[o.getMonth()]} '${Ae(o.getFullYear() % 100)}`;
  return e >= 864e5 ? i : `${i}  ${Ae(o.getHours())}:${Ae(o.getMinutes())}`;
}
function Wt(t) {
  const e = Math.floor(t) - 1;
  return Math.max(1, Math.min(Math.floor(t * 0.8), e > 0 ? e : 1));
}
function Ie(t, e) {
  const o = /^#([0-9a-f]{6})$/i.exec(t);
  if (!o) return t;
  const i = parseInt(o[1], 16);
  return `rgba(${i >> 16 & 255}, ${i >> 8 & 255}, ${i & 255}, ${e})`;
}
function Va(t, e, o, i) {
  t.fillStyle = e.grid;
  for (const n of o)
    t.fillRect(Math.round(n.x), 0, 1, i);
}
function ai(t, e, o, i, n) {
  t.fillStyle = e.grid;
  for (const s of n)
    t.fillRect(0, Math.round(i.priceToY(s)), o, 1);
}
function Ga(t, e, o, i) {
  t.fillStyle = e.separator, t.fillRect(0, o, i, 1);
}
function qa(t, e, o, i, n, s) {
  t.fillStyle = e.axisLine, t.fillRect(o, 0, 1, s), t.fillRect(0, i, n, 1);
}
function Rn(t, e, o, i, n, s, r) {
  const l = n.barSpacing(), a = Wt(l);
  for (let c = o; c <= i; c++) {
    const f = e[c], h = f.close >= f.open ? r.up : r.down, u = n.centerX(c), p = Math.round(u), g = Math.round(s.priceToY(f.high)), b = Math.round(s.priceToY(f.low));
    t.fillStyle = h, t.fillRect(p, g, 1, Math.max(1, b - g));
    const P = Math.round(s.priceToY(f.open)), w = Math.round(s.priceToY(f.close));
    t.fillRect(Math.round(u - a / 2), Math.min(P, w), a, Math.max(1, Math.abs(w - P)));
  }
}
function Ua(t, e, o, i, n, s, r) {
  const l = n.barSpacing(), a = Wt(l);
  let c = 0;
  for (let f = o; f <= i; f++)
    e[f].volume > c && (c = e[f].volume);
  for (let f = o; f <= i; f++) {
    const h = e[f], u = h.close >= h.open ? r.up : r.down, p = n.centerX(f), g = Math.round(p), b = Math.round(s.priceToY(h.high)), P = Math.round(s.priceToY(h.low));
    t.fillStyle = u, t.fillRect(g, b, 1, Math.max(1, P - b));
    const w = c > 0 ? h.volume / c : 1, I = Math.max(1, Math.round(a * w)), v = Math.round(s.priceToY(h.open)), L = Math.round(s.priceToY(h.close));
    t.fillRect(Math.round(p - I / 2), Math.min(v, L), I, Math.max(1, Math.abs(L - v)));
  }
}
function ja(t, e, o, i, n, s, r) {
  const l = n.barSpacing(), a = Math.max(1, Math.floor(Wt(l) / 2));
  for (let c = o; c <= i; c++) {
    const f = e[c], h = f.close >= f.open ? r.up : r.down, u = Math.round(n.centerX(c)), p = Math.round(s.priceToY(f.high)), g = Math.round(s.priceToY(f.low));
    t.fillStyle = h, t.fillRect(u, p, 1, Math.max(1, g - p)), t.fillRect(u - a, Math.round(s.priceToY(f.open)), a, 1), t.fillRect(u + 1, Math.round(s.priceToY(f.close)), a, 1);
  }
}
function on(t, e, o, i, n, s) {
  const r = Math.max(0, o - 1), l = Math.min(e.length - 1, i + 1);
  t.beginPath();
  for (let a = r; a <= l; a++) {
    const c = n.centerX(a), f = s.priceToY(e[a].close);
    a === r ? t.moveTo(c, f) : t.lineTo(c, f);
  }
}
function Ja(t, e, o, i, n, s, r) {
  o > i || (on(t, e, o, i, n, s), t.strokeStyle = r.accent, t.lineWidth = 2, t.lineJoin = "round", t.lineCap = "round", t.stroke());
}
function Ka(t, e, o, i, n, s, r) {
  if (o > i) return;
  const l = Math.max(0, o - 1), a = Math.min(e.length - 1, i + 1), c = t.createLinearGradient(0, s.top, 0, s.bottom);
  c.addColorStop(0, Ie(r.accent, 0.28)), c.addColorStop(1, Ie(r.accent, 0.02)), on(t, e, o, i, n, s), t.lineTo(n.centerX(a), s.bottom), t.lineTo(n.centerX(l), s.bottom), t.closePath(), t.fillStyle = c, t.fill(), on(t, e, o, i, n, s), t.strokeStyle = r.accent, t.lineWidth = 2, t.lineJoin = "round", t.lineCap = "round", t.stroke();
}
function Za(t, e, o, i, n, s, r) {
  if (o > i) return;
  const l = Math.max(0, o - 1), a = Math.min(e.length - 1, i + 1), c = Math.min(i, e.length - 1), f = c > 0 ? e[c - 1].close : e[c].open, u = e[c].close >= f ? r.up : r.down;
  t.beginPath();
  for (let p = l; p <= a; p++) {
    const g = n.centerX(p), b = s.priceToY(e[p].high);
    p === l ? t.moveTo(g, b) : t.lineTo(g, b);
  }
  for (let p = a; p >= l; p--)
    t.lineTo(n.centerX(p), s.priceToY(e[p].low));
  t.closePath(), t.fillStyle = Ie(u, 0.16), t.fill(), t.beginPath();
  for (let p = l; p <= a; p++) {
    const g = n.centerX(p), b = s.priceToY(e[p].close);
    p === l ? t.moveTo(g, b) : t.lineTo(g, b);
  }
  t.strokeStyle = u, t.lineWidth = 2, t.lineJoin = "round", t.lineCap = "round", t.stroke();
}
function Qa(t, e, o, i, n, s, r) {
  const l = n.barSpacing(), a = Wt(l);
  for (let c = o; c <= i; c++) {
    const f = e[c], h = f.close >= f.open, u = h ? r.up : r.down, p = n.centerX(c), g = Math.round(p), b = Math.round(s.priceToY(f.high)), P = Math.round(s.priceToY(f.low));
    t.fillStyle = u, t.fillRect(g, b, 1, Math.max(1, P - b));
    const w = Math.round(s.priceToY(f.open)), I = Math.round(s.priceToY(f.close)), v = Math.round(p - a / 2), L = Math.min(w, I), k = Math.max(1, Math.abs(I - w));
    h ? (t.strokeStyle = u, t.lineWidth = 1, t.strokeRect(v + 0.5, L + 0.5, Math.max(1, a - 1), Math.max(1, k - 1))) : t.fillRect(v, L, a, k);
  }
}
function za(t, e, o, i, n, s, r) {
  const l = n.barSpacing(), a = Math.max(1, Math.floor(Wt(l) / 2));
  for (let c = o; c <= i; c++) {
    const f = e[c], h = f.close >= f.open ? r.up : r.down, u = Math.round(n.centerX(c)), p = Math.round(s.priceToY(f.high)), g = Math.round(s.priceToY(f.low));
    t.fillStyle = h, t.fillRect(u, p, 1, Math.max(1, g - p)), t.fillRect(u + 1, Math.round(s.priceToY(f.close)), a, 1);
  }
}
function xa(t, e, o, i, n, s, r) {
  if (!(o > i)) {
    on(t, e, o, i, n, s), t.strokeStyle = r.accent, t.lineWidth = 2, t.lineJoin = "round", t.lineCap = "round", t.stroke(), t.fillStyle = r.accent;
    for (let l = o; l <= i; l++) {
      const a = n.centerX(l), c = s.priceToY(e[l].close);
      t.beginPath(), t.arc(a, c, 2.5, 0, Math.PI * 2), t.fill();
    }
  }
}
function tc(t, e, o, i, n, s, r) {
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
function ec(t, e, o, i, n, s, r, l) {
  if (o > i) return;
  const a = Math.max(0, o - 1), c = Math.min(e.length - 1, i + 1), f = s.priceToY(l), h = () => {
    t.beginPath();
    for (let g = a; g <= c; g++) {
      const b = n.centerX(g), P = s.priceToY(e[g].close);
      g === a ? t.moveTo(b, P) : t.lineTo(b, P);
    }
  }, u = n.centerX(a), p = n.centerX(c);
  t.save(), t.beginPath(), t.rect(0, s.top, n.plotWidth, Math.max(0, f - s.top)), t.clip(), h(), t.lineTo(p, f), t.lineTo(u, f), t.closePath(), t.fillStyle = Ie(r.up, 0.2), t.fill(), t.restore(), t.save(), t.beginPath(), t.rect(0, f, n.plotWidth, Math.max(0, s.bottom - f)), t.clip(), h(), t.lineTo(p, f), t.lineTo(u, f), t.closePath(), t.fillStyle = Ie(r.down, 0.2), t.fill(), t.restore(), t.lineWidth = 2, t.lineJoin = "round", t.lineCap = "round", t.save(), t.beginPath(), t.rect(0, s.top, n.plotWidth, Math.max(0, f - s.top)), t.clip(), h(), t.strokeStyle = r.up, t.stroke(), t.restore(), t.save(), t.beginPath(), t.rect(0, f, n.plotWidth, Math.max(0, s.bottom - f)), t.clip(), h(), t.strokeStyle = r.down, t.stroke(), t.restore();
}
function nc(t, e, o, i, n, s, r) {
  const l = n.barSpacing(), a = Wt(l), c = s.bottom;
  for (let f = o; f <= i; f++) {
    const h = e[f], u = f > 0 ? e[f - 1].close : h.open;
    t.fillStyle = h.close >= u ? r.up : r.down;
    const p = Math.round(s.priceToY(h.close)), g = Math.min(p, c);
    t.fillRect(Math.round(n.centerX(f) - a / 2), g, a, Math.max(1, Math.round(c - g)));
  }
}
function oc(t, e, o, i, n, s, r) {
  for (let l = o; l <= i; l++) {
    const a = e[l];
    t.fillStyle = a.close >= a.open ? r.up : r.down;
    const c = Math.round(n.centerX(l)), f = Math.round(s.priceToY(a.high)), h = Math.round(s.priceToY(a.low));
    t.fillRect(c, f, 1, Math.max(1, h - f));
  }
}
function ic(t, e, o, i, n, s, r) {
  const l = n.barSpacing(), a = Wt(l);
  for (let c = o; c <= i; c++) {
    const f = e[c], h = f.close >= f.open;
    t.fillStyle = h ? r.up : r.down;
    const u = Math.round(s.priceToY(Math.max(f.open, f.close))), p = Math.round(s.priceToY(Math.min(f.open, f.close)));
    t.fillRect(Math.round(n.centerX(c) - a / 2), u, a, Math.max(1, p - u));
  }
}
function sc(t, e, o, i, n, s, r, l) {
  if (!(l > 0) || !isFinite(l)) return;
  const a = n.barSpacing(), c = Wt(a), f = Math.max(1.5, c / 2 - 1);
  t.save(), t.lineWidth = Math.max(1.5, Math.min(2.5, c / 6)), t.lineCap = "round";
  for (let h = o; h <= i; h++) {
    const u = e[h], p = u.close >= u.open;
    t.strokeStyle = p ? r.up : r.down;
    const g = n.centerX(h), b = Math.max(1, Math.round((u.high - u.low) / l));
    for (let P = 0; P < b; P++) {
      const w = s.priceToY(u.low + (P + 1) * l), I = s.priceToY(u.low + P * l), v = (w + I) / 2, L = Math.min(f, Math.abs(I - w) / 2 - 0.5);
      L <= 0.5 || (t.beginPath(), p ? (t.moveTo(g - L, v - L), t.lineTo(g + L, v + L), t.moveTo(g + L, v - L), t.lineTo(g - L, v + L), t.stroke()) : (t.arc(g, v, L, 0, Math.PI * 2), t.stroke()));
    }
  }
  t.restore();
}
function rc(t, e, o, i, n) {
  if (!(e.length < 2)) {
    t.save(), t.strokeStyle = n.accent, t.lineJoin = "round", t.lineCap = "butt";
    for (let s = 1; s < e.length; s++) {
      const r = e[s - 1], l = e[s];
      t.lineWidth = l.thick ? 3 : 1, t.beginPath(), t.moveTo(o.centerX(s - 1), i.priceToY(r.price)), t.lineTo(o.centerX(s - 1), i.priceToY(l.price)), t.lineTo(o.centerX(s), i.priceToY(l.price)), t.stroke();
    }
    t.restore();
  }
}
function ci(t, e, o, i, n, s) {
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
function lc(t, e, o, i, n, s) {
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
function ac(t, e, o, i, n, s, r, l, a) {
  const c = o ? 0.4 : 1;
  if (t.save(), t.globalAlpha = c, r) {
    const b = Math.round(n) + 0.5;
    t.strokeStyle = e, t.lineWidth = 1, t.setLineDash([5, 4]), t.beginPath(), t.moveTo(0, b), t.lineTo(l, b), t.stroke(), t.setLineDash([]);
  }
  const f = 18, h = Math.round(s), u = 14, p = l + 1, g = a - 1;
  return t.fillStyle = e, t.fillRect(p, h - f / 2, g, f), cc(t, p + u / 2 + 2, h, "#ffffff"), t.font = Dt, t.fillStyle = "#ffffff", t.textAlign = "left", t.textBaseline = "middle", t.fillText(i, p + u + 4, h + 0.5), t.restore(), { x: p, y: h - f / 2, width: g, height: f };
}
function cc(t, e, o, i) {
  t.save(), t.fillStyle = i, t.strokeStyle = i, t.lineWidth = 1, t.lineJoin = "round", t.beginPath(), t.moveTo(e, o - 5), t.lineTo(e, o - 4), t.moveTo(e - 3.5, o + 2), t.quadraticCurveTo(e - 3.5, o - 4, e, o - 4), t.quadraticCurveTo(e + 3.5, o - 4, e + 3.5, o + 2), t.lineTo(e - 3.5, o + 2), t.closePath(), t.fill(), t.beginPath(), t.arc(e, o + 3.2, 1, 0, Math.PI * 2), t.fill(), t.restore();
}
function fc(t, e, o, i, n) {
  t.save(), t.strokeStyle = e.guide, t.lineWidth = 1, t.setLineDash([4, 4]);
  for (const s of n) {
    const r = Math.round(i.priceToY(s)) + 0.5;
    t.beginPath(), t.moveTo(0, r), t.lineTo(o, r), t.stroke();
  }
  t.restore();
}
function fi(t, e, o, i, n, s, r = "A") {
  t.save();
  const l = 3, a = () => {
    t.beginPath(), t.moveTo(o + l, i), t.arcTo(o + n, i, o + n, i + n, l), t.arcTo(o + n, i + n, o, i + n, l), t.arcTo(o, i + n, o, i, l), t.arcTo(o, i, o + n, i, l), t.closePath();
  };
  s ? (a(), t.fillStyle = e.accent, t.fill(), t.fillStyle = "#ffffff") : (a(), t.fillStyle = e.bg, t.fill(), t.strokeStyle = e.accent, t.lineWidth = 1, t.save(), t.beginPath(), t.rect(o + 0.5, i + 0.5, n - 1, n - 1), t.strokeStyle = e.accent, t.stroke(), t.restore(), t.fillStyle = e.accent), t.font = Dt, t.textAlign = "center", t.textBaseline = "middle", t.fillText(r, o + n / 2, i + n / 2 + 0.5), t.restore();
}
function hi(t, e, o, i) {
  t.font = Dt, t.fillStyle = e.mutedText, t.textAlign = "left", t.textBaseline = "middle";
  for (const n of i)
    t.fillText(n.label, o + 7, n.y);
}
function hc(t, e, o, i) {
  t.font = Dt, t.fillStyle = e.mutedText, t.textAlign = "center", t.textBaseline = "middle";
  for (const n of o)
    t.fillText(n.label, n.x, i);
}
function ui(t, e, o, i, n, s, r) {
  const a = Math.round(o);
  t.fillStyle = s, t.fillRect(i + 1, a - 18 / 2, n - 1, 18), t.font = Dt, t.fillStyle = r, t.textAlign = "left", t.textBaseline = "middle", t.fillText(e, i + 7, a + 0.5);
}
function uc(t, e, o, i, n, s) {
  const l = Math.round(o);
  t.fillStyle = s.crosshairTagBg, t.fillRect(i + 1, l - 15 / 2, n - 1, 15), t.font = Wa, t.fillStyle = s.crosshairTagText, t.textAlign = "center", t.textBaseline = "middle", t.fillText(e, i + 1 + (n - 1) / 2, l + 0.5);
}
function pc(t, e, o, i, n, s, r) {
  t.font = Dt;
  const l = t.measureText(o).width + 14, a = Math.min(Math.max(i - l / 2, 0), Math.max(0, n - l)), c = 18, f = s + (r - c) / 2 + 1;
  t.fillStyle = e.crosshairTagBg, t.fillRect(a, f, l, c), t.fillStyle = e.crosshairTagText, t.textAlign = "center", t.textBaseline = "middle", t.fillText(o, a + l / 2, f + c / 2 + 0.5);
}
function mc(t, e, o, i) {
  t.save(), t.strokeStyle = e, t.lineWidth = 1, t.setLineDash([1.5, 3]), t.beginPath(), t.moveTo(0, o), t.lineTo(i, o), t.stroke(), t.restore();
}
function gc(t, e, o, i) {
  t.save(), t.strokeStyle = e.crosshair, t.lineWidth = 1, t.setLineDash([3, 3]), t.beginPath(), t.moveTo(o, 0), t.lineTo(o, i), t.stroke(), t.restore();
}
function yc(t, e, o, i) {
  t.save(), t.strokeStyle = e.crosshair, t.lineWidth = 1, t.setLineDash([3, 3]), t.beginPath(), t.moveTo(0, o), t.lineTo(i, o), t.stroke(), t.restore();
}
function bc(t, e, o, i) {
  t.save(), t.strokeStyle = i, t.lineWidth = 1.5, t.beginPath(), t.arc(e, o, 5, 0, Math.PI * 2), t.stroke(), t.restore();
}
function En(t, e, o, i) {
  t.font = Dt, t.textAlign = "left", t.textBaseline = "middle";
  let n = o;
  for (const s of e)
    t.fillStyle = s.color, t.fillText(s.text, n, i), n += t.measureText(s.text).width + 8;
  return n;
}
function dc(t, e) {
  let o = !1;
  const i = (k) => {
    const E = t.getBoundingClientRect();
    return { x: k.clientX - E.left, y: k.clientY - E.top };
  }, n = (k) => {
    const { x: E, y: B } = i(k);
    e.pointerMove(E, B, k);
  }, s = (k) => {
    o = !1, window.removeEventListener("mousemove", n), window.removeEventListener("mouseup", s);
    const { x: E, y: B } = i(k);
    e.pointerUp(E, B, k);
  }, r = (k) => {
    if (k.button !== 0) return;
    k.preventDefault(), o = !0;
    const { x: E, y: B } = i(k);
    e.pointerDown(E, B, k), window.addEventListener("mousemove", n), window.addEventListener("mouseup", s);
  }, l = (k) => {
    if (o) return;
    const { x: E, y: B } = i(k);
    e.pointerMove(E, B, k);
  }, a = () => {
    o || e.pointerLeave();
  }, c = (k) => {
    k.preventDefault();
    const { x: E, y: B } = i(k);
    e.wheel(E, B, k);
  }, f = (k) => {
    const { x: E, y: B } = i(k);
    e.doubleClick(E, B, k);
  }, h = (k) => {
    const { x: E, y: B } = i(k);
    e.contextMenu(E, B, k);
  }, u = (k) => {
    e.keyDown(k);
  };
  let p = "none", g = 0;
  const b = { button: 0, preventDefault: () => {
  } }, P = (k) => {
    const E = t.getBoundingClientRect();
    return { x: k.clientX - E.left, y: k.clientY - E.top };
  }, w = (k) => {
    const E = P(k.touches[0]), B = P(k.touches[1]);
    return Math.hypot(E.x - B.x, E.y - B.y);
  }, I = (k) => {
    if (k.touches.length >= 2)
      k.preventDefault(), p === "pan" && e.pointerUp(0, 0, b), p = "pinch", g = w(k);
    else if (k.touches.length === 1) {
      k.preventDefault(), p = "pan";
      const { x: E, y: B } = P(k.touches[0]);
      e.pointerDown(E, B, b);
    }
  }, v = (k) => {
    if (p === "pinch" && k.touches.length >= 2) {
      k.preventDefault();
      const E = w(k);
      if (g > 0 && E > 0) {
        const B = P(k.touches[0]), J = P(k.touches[1]);
        e.pinch((B.x + J.x) / 2, E / g);
      }
      g = E;
    } else if (p === "pan" && k.touches.length === 1) {
      k.preventDefault();
      const { x: E, y: B } = P(k.touches[0]);
      e.pointerMove(E, B, b);
    }
  }, L = (k) => {
    if (p === "pan") {
      const E = k.changedTouches[0];
      if (E) {
        const { x: B, y: J } = P(E);
        e.pointerUp(B, J, b);
      } else e.pointerUp(0, 0, b);
      p = "none";
    } else p === "pinch" && k.touches.length < 2 && (p = "none", g = 0);
  };
  return t.addEventListener("mousedown", r), t.addEventListener("mousemove", l), t.addEventListener("mouseleave", a), t.addEventListener("wheel", c, { passive: !1 }), t.addEventListener("dblclick", f), t.addEventListener("contextmenu", h), t.addEventListener("touchstart", I, { passive: !1 }), t.addEventListener("touchmove", v, { passive: !1 }), t.addEventListener("touchend", L), t.addEventListener("touchcancel", L), window.addEventListener("keydown", u), () => {
    t.removeEventListener("mousedown", r), t.removeEventListener("mousemove", l), t.removeEventListener("mouseleave", a), t.removeEventListener("wheel", c), t.removeEventListener("dblclick", f), t.removeEventListener("contextmenu", h), t.removeEventListener("touchstart", I), t.removeEventListener("touchmove", v), t.removeEventListener("touchend", L), t.removeEventListener("touchcancel", L), window.removeEventListener("keydown", u), window.removeEventListener("mousemove", n), window.removeEventListener("mouseup", s);
  };
}
const Tc = 64, _n = 26, Mc = 110, Dn = 1, Wn = 3, $n = 160, Je = 5, wc = 10, Sc = 50, dt = 18, Yn = 4, Pc = 180, pi = 3, Ac = 400, mi = 5;
function ft(t, e, o) {
  return Math.min(Math.max(t, e), o);
}
function kc(t) {
  let e = Math.floor(t / 1e3);
  const o = Math.floor(e / 86400);
  e -= o * 86400;
  const i = Math.floor(e / 3600);
  e -= i * 3600;
  const n = Math.floor(e / 60), s = e - n * 60, r = (l) => String(l).padStart(2, "0");
  return o > 0 ? `${o}d ${r(i)}:${r(n)}` : i > 0 ? `${i}:${r(n)}:${r(s)}` : `${r(n)}:${r(s)}`;
}
function Lc(t) {
  if (!(t instanceof HTMLElement)) return !1;
  const e = t.tagName;
  return e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || t.isContentEditable;
}
function Tf(t, e) {
  const o = document.createElement("canvas");
  o.style.display = "block", o.style.touchAction = "none";
  const i = o.getContext("2d");
  if (!i) throw new Error("CandL chart: 2d canvas context unavailable");
  const n = i;
  t.appendChild(o);
  let s = e.theme, r = e.pricePrecision, l = e.chartType, a = [], c = [], f = null, h = 0, u = [], p = null, g = !1, b = [], P = null, w = [], I = [], v = null, L = [], k = null, E = null, B = [], J = !1, K = 6e4, j = "auto", U = null, $t = !1, an = null, Ee = null, D = null, Z = null, cn = !0, _e = !1, Kt = 0, Zt = 1;
  const st = { width: 0, height: 0 }, C = new $a();
  function De() {
    const m = t.clientWidth, y = t.clientHeight;
    Zt = Math.max(1, window.devicePixelRatio || 1), st.width = m, st.height = y, o.width = Math.max(1, Math.round(m * Zt)), o.height = Math.max(1, Math.round(y * Zt)), o.style.width = `${m}px`, o.style.height = `${y}px`, n.setTransform(Zt, 0, 0, Zt, 0, 0);
  }
  function H() {
    _e || Kt !== 0 || (Kt = requestAnimationFrame(() => {
      Kt = 0, Ds();
    }));
  }
  const ns = setInterval(H, 1e3);
  function at() {
    const m = st.width, y = st.height, d = Math.max(0, m - Tc), T = u.filter((X) => X.placement === "pane"), S = T.length, A = Math.max(0, y - _n), R = Math.max(0, A - S * Dn);
    let F = S > 0 ? Mc : 0, W = R - S * F;
    S > 0 && W < 120 && (F = Math.max(40, Math.floor((R - 120) / S)), W = Math.max(0, R - S * F));
    const Y = [{ kind: "main", top: 0, height: W }];
    let O = W;
    for (const X of T)
      O += Dn, Y.push({ kind: "indicator", top: O, height: F, indicator: X }), O += F;
    return C.plotWidth = d, { width: m, height: y, plotWidth: d, timeAxisTop: A, panes: Y };
  }
  function os(m, y) {
    for (let d = 0; d < y.panes.length; d++) {
      const T = y.panes[d];
      if (m >= T.top && m < T.top + T.height) return d;
    }
    return -1;
  }
  function ct(m) {
    if (j === "manual" && U !== null)
      return new Te(
        m.top,
        m.height,
        U.min,
        U.max,
        $t && U.min > 0
      );
    const y = C.visibleRange(), d = y.from, T = Math.min(y.to, pt() - 1);
    let S = 1 / 0, A = -1 / 0;
    if (c.length > 0 && d <= T) {
      const F = l === "line" || l === "area" || l === "linemarkers" || l === "step" || l === "baseline" || l === "columns" || l === "kagi";
      for (let W = d; W <= T; W++) {
        const Y = c[W];
        F ? (Y.close < S && (S = Y.close), Y.close > A && (A = Y.close)) : (Y.low < S && (S = Y.low), Y.high > A && (A = Y.high));
      }
      if (!oe(l)) {
        for (const W of u)
          if (W.placement === "overlay")
            for (const Y of W.outputs) {
              const O = Math.min(T, Y.values.length - 1);
              for (let X = d; X <= O; X++) {
                const z = Y.values[X];
                z == null || !isFinite(z) || (z < S && (S = z), z > A && (A = z));
              }
            }
      }
    }
    if (c.length > 0 && (b.length > 0 || P !== null)) {
      const F = c.length - 1, W = (Y) => {
        for (const O of Y) {
          const X = F + O.barOffset + 0.5;
          X < C.view.start - 1 || X > C.view.end + 1 || isFinite(O.price) && (O.price < S && (S = O.price), O.price > A && (A = O.price));
        }
      };
      for (const Y of b) W(Y.points);
      P && (W(P.upper), W(P.lower));
    }
    if ((!isFinite(S) || !isFinite(A)) && (S = 0, A = 1), S === A) {
      const F = Math.abs(S) * 0.01 || 1;
      S -= F, A += F;
    }
    if ($t && S > 0) {
      const F = Math.log(S), W = Math.log(A), Y = (W - F) * 0.08;
      return new Te(m.top, m.height, Math.exp(F - Y), Math.exp(W + Y), !0);
    }
    const R = (A - S) * 0.08;
    return new Te(m.top, m.height, S - R, A + R);
  }
  function is(m) {
    const y = m.indicator;
    if (y.range)
      return new Te(m.top, m.height, y.range[0], y.range[1]);
    const d = C.visibleRange(), T = d.from, S = Math.min(d.to, pt() - 1);
    let A = 1 / 0, R = -1 / 0, F = !1;
    for (const Y of y.outputs) {
      (Y.style ?? "line") === "histogram" && (F = !0);
      const O = Math.min(S, Y.values.length - 1);
      for (let X = Math.max(0, T); X <= O; X++) {
        const z = Y.values[X];
        z == null || !isFinite(z) || (z < A && (A = z), z > R && (R = z));
      }
    }
    if (F && (A > 0 && (A = 0), R < 0 && (R = 0)), (!isFinite(A) || !isFinite(R)) && (A = 0, R = 1), A === R) {
      const Y = Math.abs(A) * 0.01 || 1;
      A -= Y, R += Y;
    }
    const W = (R - A) * 0.08;
    return new Te(m.top, m.height, A - W, R + W);
  }
  function Qt(m) {
    return {
      timeToX: (y) => C.timeToX(y),
      xToTime: (y) => C.xToTime(y),
      priceToY: (y) => m.priceToY(y),
      yToPrice: (y) => m.yToPrice(y)
    };
  }
  let mo = null;
  function go() {
    const m = c.length, y = m > 0 ? c[m - 1] : null, d = mo;
    if (d !== null && d.mode === j && d.log === $t && d.manualMin === (U !== null ? U.min : NaN) && d.manualMax === (U !== null ? U.max : NaN) && d.viewStart === C.view.start && d.viewEnd === C.view.end && d.width === st.width && d.height === st.height && d.seriesRef === c && d.seriesCount === m && d.indicatorsRef === u && d.projLinesRef === b && d.projBandRef === P && d.type === l && (y === null || d.lastHigh === y.high && d.lastLow === y.low && d.lastClose === y.close))
      return d.scale;
    const T = ct(at().panes[0]);
    return mo = {
      scale: T,
      viewStart: C.view.start,
      viewEnd: C.view.end,
      width: st.width,
      height: st.height,
      seriesRef: c,
      seriesCount: m,
      lastHigh: y !== null ? y.high : NaN,
      lastLow: y !== null ? y.low : NaN,
      lastClose: y !== null ? y.close : NaN,
      indicatorsRef: u,
      projLinesRef: b,
      projBandRef: P,
      type: l,
      mode: j,
      log: $t,
      manualMin: U !== null ? U.min : NaN,
      manualMax: U !== null ? U.max : NaN
    }, T;
  }
  const ss = {
    timeToX: (m) => C.timeToX(m),
    xToTime: (m) => C.xToTime(m),
    priceToY: (m) => go().priceToY(m),
    yToPrice: (m) => go().yToPrice(m)
  };
  function rs() {
    const m = a.length;
    if (m < 2) {
      K = C.intervalMs || 6e4;
      return;
    }
    const y = [];
    for (let d = 1; d < m; d++) {
      const T = a[d].time - a[d - 1].time;
      T > 0 && y.push(T);
    }
    if (y.length === 0) {
      K = C.intervalMs || 6e4;
      return;
    }
    y.sort((d, T) => d - T), K = y[y.length >> 1];
  }
  function We() {
    switch (h = 0, l) {
      case "heikin":
        c = La(a), f = null;
        break;
      case "renko":
        c = Na(a, po(a)), f = null;
        break;
      case "linebreak":
        c = Ca(a, 3), f = null;
        break;
      case "pnf": {
        const m = Fa(a);
        h = m, c = va(a, m, 3), f = null;
        break;
      }
      case "range":
        c = Ea(a, Ra(a)), f = null;
        break;
      case "kagi": {
        const m = _a(a, 0.04);
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
    C.setTimes(c.map((m) => m.time));
  }
  function pt() {
    const m = c.length;
    return p === null ? m : Math.min(p + 1, m);
  }
  function yo() {
    if (p === null) return;
    const m = c.length;
    if (m === 0) {
      p = null;
      return;
    }
    p = ft(p, 0, m - 1);
  }
  function me() {
    return { candles: a, pricePrecision: r, barMs: K };
  }
  function $e(m) {
    return v ? v.upColor : m.up;
  }
  function Ye(m) {
    return v ? v.downColor : m.down;
  }
  function ls(m) {
    return v ? { ...m, up: v.upColor, down: v.downColor, accent: v.upColor } : m;
  }
  function as() {
    return v ? v.gridVisible : !0;
  }
  function cs() {
    return v ? v.crosshairVisible : !0;
  }
  function Oe(m, y, d) {
    const T = d.xToTime(m), S = d.yToPrice(y);
    if (!J || a.length === 0) return { time: T, price: S, snapped: !1 };
    const A = Math.floor(C.xToIndex(m));
    if (A < 0 || A >= a.length) return { time: T, price: S, snapped: !1 };
    const R = a[A];
    let F = S, W = 1 / 0;
    for (const Y of [R.open, R.high, R.low, R.close]) {
      const O = Math.abs(d.priceToY(Y) - y);
      O < W && (W = O, F = Y);
    }
    return W <= Sc ? { time: T, price: F, snapped: !0 } : { time: T, price: S, snapped: !1 };
  }
  function bo() {
    return Math.max(60, Math.round(pt() * 1.2) + Je * 2);
  }
  function It() {
    const m = pt();
    if (m === 0) return;
    let { start: y, end: d } = C.view;
    const T = d - y, S = Math.min(m, 2);
    d < S && (d = S, y = d - T);
    const A = m - 2;
    y > A && (y = A, d = y + T), C.view = { start: y, end: d };
  }
  function fn(m) {
    return Math.min(Je, Math.max(0, Math.floor(m / 3)));
  }
  function To(m) {
    if (p === null || !g || !(p >= m.start && p <= m.end - fn(m.end - m.start))) return;
    let { start: d, end: T } = C.view;
    const S = T - d, A = fn(S);
    p >= d && p <= T - A || (p < d ? (d = p, T = d + S) : (T = p + 1 + A, d = T - S), C.view = { start: d, end: T });
  }
  function zt() {
    var m;
    cn && C.count > 0 && C.view.start <= wc && (cn = !1, (m = e.onRequestHistory) == null || m.call(e));
  }
  function fs(m) {
    C.view = { start: C.view.start + m, end: C.view.end + m }, It(), zt(), H();
  }
  function xt() {
    hn();
    const m = pt();
    if (m === 0) {
      C.view = { start: -$n / 2, end: $n / 2 };
      return;
    }
    const y = m + Je, d = Math.min($n, Math.max(Wn, m) + Je);
    C.view = { start: y - d, end: y };
  }
  function hs() {
    return ct(at().panes[0]);
  }
  function us() {
    const m = hs();
    U = { min: m.min, max: m.max }, j = "manual";
  }
  function hn() {
    j = "auto", U = null;
  }
  function ge() {
    var m;
    (m = e.onDrawingsChange) == null || m.call(e, w.slice());
  }
  function Mo(m, y) {
    const d = w.findIndex((T) => T.id === m);
    d >= 0 && (w[d] = y);
  }
  function Yt(m) {
    var d;
    if (k === m) return;
    k = m;
    const y = m !== null ? w.find((T) => T.id === m) ?? null : null;
    (d = e.onSelectionChange) == null || d.call(e, y);
  }
  function ps() {
    var y;
    const m = k !== null ? w.find((d) => d.id === k) ?? null : null;
    (y = e.onSelectionChange) == null || y.call(e, m);
  }
  function wo() {
    var m;
    B = [], E !== null && (E = null, (m = e.onActiveToolChange) == null || m.call(e, null)), H();
  }
  function So(m) {
    var y, d;
    w.push(m), k = m.id, B = [], E = null, ge(), (y = e.onActiveToolChange) == null || y.call(e, null), (d = e.onSelectionChange) == null || d.call(e, m);
  }
  function ms(m, y, d) {
    const T = E;
    if (!T) return;
    const S = je(T);
    if (S < 1) return;
    const A = ct(d.panes[0]), R = Qt(A), F = Oe(m, y, R);
    if (B.push({ time: F.time, price: F.price }), B.length >= S) {
      const W = me();
      let Y = Fn(T, B[0]);
      Y.points = B.slice(0, S);
      const O = uo(T);
      O.expandOnCommit && (Y = O.expandOnCommit(Y, W)), So(Y);
    }
    H();
  }
  function gs(m, y, d) {
    const T = E;
    if (!T) return;
    const S = Qt(ct(d.panes[0]));
    D = { mode: "freehand", drawing: Fn(T, { time: S.xToTime(m), price: S.yToPrice(y) }), lastPx: m, lastPy: y }, H();
  }
  function ys(m, y) {
    const d = E;
    if (!d) return null;
    const T = je(d);
    if (T < 1) return null;
    const S = Z !== null && Z.x >= 0 && Z.x <= C.plotWidth && Z.y >= y.top && Z.y < y.top + y.height, A = B.slice();
    if (S && Z && A.length < T) {
      const F = Oe(Z.x, Z.y, m);
      A.push({ time: F.time, price: F.price });
    }
    if (A.length === 0) return null;
    const R = Fn(d, A[0]);
    return R.id = "__preview__", R.points = A, R;
  }
  function Be(m, y) {
    for (const d of L)
      if (m >= d.x && m <= d.x + d.width && y >= d.y && y <= d.y + d.height)
        return I.find((T) => T.id === d.id) ?? null;
    return null;
  }
  function Po(m, y, d, T) {
    if (m < 0 || m > d.plotWidth) return null;
    let S = null, A = mi + 1;
    for (const R of I) {
      const F = T.priceToY(R.price);
      if (F < T.top || F > T.bottom) continue;
      const W = Math.abs(F - y);
      W <= mi && W < A && (S = R, A = W);
    }
    return S;
  }
  function un(m, y, d) {
    const T = d.panes[0];
    return m > d.plotWidth && m <= d.width && y >= T.top && y < T.top + T.height;
  }
  function pn(m, y) {
    const d = an;
    return d !== null && m >= d.x && m <= d.x + d.width && y >= d.y && y <= d.y + d.height;
  }
  function Ao(m, y) {
    const d = Ee;
    return d !== null && m >= d.x && m <= d.x + d.width && y >= d.y && y <= d.y + d.height;
  }
  function ko(m, y) {
    if (D) return;
    const d = at();
    if (!E) {
      if (pn(m, y) || Ao(m, y)) {
        o.style.cursor = "pointer";
        return;
      }
      if (un(m, y, d) && Be(m, y) === null) {
        o.style.cursor = "ns-resize";
        return;
      }
    }
    if (!(m >= 0 && m <= d.plotWidth && y >= 0 && y < d.timeAxisTop)) {
      o.style.cursor = "default";
      return;
    }
    if (E) {
      o.style.cursor = "crosshair";
      return;
    }
    const S = d.panes[0];
    if (w.length > 0 && y >= S.top && y < S.top + S.height) {
      const A = Qt(ct(S)), R = me(), F = k ? w.find((W) => W.id === k) : void 0;
      if (F && ri(F, m, y, A, R) >= 0) {
        o.style.cursor = "pointer";
        return;
      }
      for (let W = w.length - 1; W >= 0; W--)
        if (si(w[W], m, y, A, R)) {
          o.style.cursor = "pointer";
          return;
        }
    }
    if (I.length > 0) {
      if (Be(m, y) !== null) {
        o.style.cursor = "pointer";
        return;
      }
      const A = ct(S);
      if (Po(m, y, d, A) !== null) {
        o.style.cursor = "grab";
        return;
      }
    }
    o.style.cursor = "crosshair";
  }
  function bs(m, y, d) {
    var R;
    if (d.button !== 0) return;
    const T = at(), S = T.panes[0], A = m >= 0 && m <= T.plotWidth && y >= S.top && y < S.top + S.height;
    if (E) {
      A && (je(E) === -1 ? gs(m, y, T) : ms(m, y, T));
      return;
    }
    if (pn(m, y)) {
      j === "manual" ? hn() : us(), H();
      return;
    }
    if (Ao(m, y)) {
      $t = !$t, H();
      return;
    }
    if (un(m, y, T) && Be(m, y) === null) {
      const F = ct(S), W = F.yToPrice(ft(y, F.top, F.bottom));
      D = { mode: "scale-axis", startMin: F.min, startMax: F.max, anchorPrice: W, startY: y }, U = { min: F.min, max: F.max }, j = "manual", o.style.cursor = "ns-resize", H();
      return;
    }
    if (I.length > 0) {
      const F = Be(m, y);
      if (F) {
        (R = e.onAlertRemove) == null || R.call(e, F.id);
        return;
      }
    }
    if (A && w.length > 0) {
      const F = Qt(ct(S)), W = me(), Y = k ? w.find((O) => O.id === k) : void 0;
      if (Y) {
        const O = ri(Y, m, y, F, W);
        if (O >= 0) {
          D = { mode: "move-handle", id: Y.id, original: Y, handleIndex: O, moved: !1 }, H();
          return;
        }
      }
      for (let O = w.length - 1; O >= 0; O--) {
        const X = w[O];
        if (si(X, m, y, F, W)) {
          Yt(X.id), D = {
            mode: "move-drawing",
            id: X.id,
            original: X,
            startTime: F.xToTime(m),
            startPrice: F.yToPrice(y),
            moved: !1
          }, H();
          return;
        }
      }
    }
    if (A && I.length > 0) {
      const F = ct(S), W = Po(m, y, T, F);
      if (W) {
        D = { mode: "move-alert", id: W.id, price: W.price, moved: !1 }, o.style.cursor = "grabbing", H();
        return;
      }
    }
    A && w.length > 0 && k && (Yt(null), H()), D = { mode: "pan", lastX: m, lastY: y }, o.style.cursor = "grabbing";
  }
  function ds(m, y, d) {
    if (Z = { x: m, y }, D)
      if (D.mode === "pan") {
        const T = C.barSpacing();
        if (T > 0) {
          const S = (m - D.lastX) / T;
          D.lastX = m, S !== 0 && fs(-S);
        }
        if (j === "manual" && U !== null) {
          const S = y - D.lastY;
          if (S !== 0) {
            const A = at().panes[0], R = U.max - U.min, F = S / Math.max(1, A.height) * R;
            U = { min: U.min + F, max: U.max + F };
          }
        }
        D.lastY = y;
      } else if (D.mode === "scale-axis") {
        const T = y - D.startY, S = Math.exp(T / Pc), A = D.anchorPrice - (D.anchorPrice - D.startMin) * S, R = D.anchorPrice + (D.startMax - D.anchorPrice) * S;
        R - A > 1e-12 && isFinite(A) && isFinite(R) && (U = { min: A, max: R });
      } else {
        const T = at(), S = ct(T.panes[0]), A = Qt(S);
        if (D.mode === "freehand") {
          const R = m - D.lastPx, F = y - D.lastPy;
          D.drawing.points.length < Ac && R * R + F * F >= pi * pi && (D.drawing.points.push({ time: A.xToTime(m), price: A.yToPrice(y) }), D.lastPx = m, D.lastPy = y);
        } else if (D.mode === "move-drawing") {
          const R = A.xToTime(m), F = A.yToPrice(y);
          Mo(D.id, Pa(D.original, R - D.startTime, F - D.startPrice)), D.moved = !0;
        } else if (D.mode === "move-alert") {
          const R = ft(y, S.top, S.bottom);
          D.price = S.yToPrice(R), D.moved = !0, o.style.cursor = "grabbing";
        } else {
          const R = Oe(m, y, A);
          Mo(
            D.id,
            Aa(D.original, D.handleIndex, { time: R.time, price: R.price }, me())
          ), D.moved = !0;
        }
      }
    else
      ko(m, y);
    H();
  }
  function Ts(m, y, d) {
    var T;
    D && (D.mode === "freehand" ? D.drawing.points.length >= 2 && So(D.drawing) : D.mode === "move-alert" ? D.moved && ((T = e.onAlertMove) == null || T.call(e, D.id, D.price)) : (D.mode === "move-drawing" || D.mode === "move-handle") && D.moved && (ge(), ps())), D = null, Z && ko(Z.x, Z.y), H();
  }
  function Ms() {
    Z = null, H();
  }
  function ws(m, y, d) {
    const T = at();
    if (T.plotWidth <= 0) return;
    if (Math.abs(d.deltaX) > Math.abs(d.deltaY) && !d.ctrlKey) {
      const z = C.range / T.plotWidth, mt = d.deltaX * z;
      C.view = { start: C.view.start + mt, end: C.view.end + mt }, It(), zt(), H();
      return;
    }
    const S = C.range, A = Math.exp(-d.deltaY * 12e-4), R = ft(S / A, Wn, bo());
    if (R === S) return;
    const F = ft(m, 0, T.plotWidth), W = C.xToIndex(F), Y = F / T.plotWidth, O = W - Y * R, X = C.view;
    C.view = { start: O, end: O + R }, To(X), It(), zt(), H();
  }
  function Ss(m, y) {
    const d = at();
    if (d.plotWidth <= 0 || !(y > 0)) return;
    const T = C.range, S = ft(T / y, Wn, bo());
    if (S === T) return;
    const A = ft(m, 0, d.plotWidth), R = C.xToIndex(A), F = A / d.plotWidth, W = R - F * S, Y = C.view;
    C.view = { start: W, end: W + S }, To(Y), It(), zt(), H();
  }
  function Ps(m, y, d) {
    const T = at();
    if (!E && (pn(m, y) || un(m, y, T))) {
      hn(), H();
      return;
    }
    xt(), H();
  }
  function As(m, y, d) {
    if (d.preventDefault(), !e.onContextMenu) return;
    const T = at(), A = ct(T.panes[0]).yToPrice(y), R = C.xToTime(m);
    e.onContextMenu({ x: m, y, price: A, time: R });
  }
  function ks(m) {
    Lc(m.target) || (m.key === "Escape" ? D !== null && D.mode === "freehand" ? (D = null, wo()) : E !== null || B.length > 0 ? wo() : k && (Yt(null), H()) : (m.key === "Delete" || m.key === "Backspace") && k && (w = w.filter((y) => y.id !== k), Yt(null), ge(), H(), m.preventDefault()));
  }
  const Ls = dc(o, {
    pointerDown: bs,
    pointerMove: ds,
    pointerUp: Ts,
    pointerLeave: Ms,
    wheel: ws,
    pinch: Ss,
    doubleClick: Ps,
    contextMenu: As,
    keyDown: ks
  }), Lo = new ResizeObserver(() => {
    De(), H();
  });
  Lo.observe(t);
  function Is(m) {
    const y = Math.abs(m) >= 1 ? 2 : 4;
    return m.toLocaleString("en-US", { minimumFractionDigits: y, maximumFractionDigits: y });
  }
  function Ns(m, y) {
    const d = y.length >= 2 ? y[1] - y[0] : jn((m.max - m.min) / 8 || 1), T = li(d);
    return y.map((S) => ({
      y: Math.round(m.priceToY(S)),
      label: S.toLocaleString("en-US", { minimumFractionDigits: T, maximumFractionDigits: T })
    }));
  }
  function Cs(m, y) {
    const d = li(jn((y.max - y.min) / 8 || 1));
    return m.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
  }
  function mn(m, y) {
    n.beginPath(), n.rect(0, m.top, y.plotWidth, m.height), n.clip();
  }
  function Fs(m, y, d, T) {
    const S = c;
    switch (l) {
      case "candles":
        Rn(n, S, d, T, C, m, y);
        break;
      case "volcandles":
        Ua(n, S, d, T, C, m, y);
        break;
      case "hlcarea":
        Za(n, S, d, T, C, m, y);
        break;
      case "hollow":
        Qa(n, S, d, T, C, m, y);
        break;
      case "heikin":
        Rn(n, S, d, T, C, m, y);
        break;
      case "bars":
        ja(n, S, d, T, C, m, y);
        break;
      case "hlcbars":
        za(n, S, d, T, C, m, y);
        break;
      case "line":
        Ja(n, S, d, T, C, m, y);
        break;
      case "linemarkers":
        xa(n, S, d, T, C, m, y);
        break;
      case "step":
        tc(n, S, d, T, C, m, y);
        break;
      case "area":
        Ka(n, S, d, T, C, m, y);
        break;
      case "baseline": {
        const A = S[d].close;
        ec(n, S, d, T, C, m, y, A);
        break;
      }
      case "columns":
        nc(n, S, d, T, C, m, y);
        break;
      case "highlow":
        oc(n, S, d, T, C, m, y);
        break;
      case "renko":
      case "linebreak":
        ic(n, S, d, T, C, m, y);
        break;
      case "range":
        Rn(n, S, d, T, C, m, y);
        break;
      case "pnf":
        sc(n, S, d, T, C, m, y, h);
        break;
      case "kagi":
        if (f) {
          const A = T >= f.length - 1 ? f : f.slice(0, T + 1);
          rc(n, A, C, m, y);
        }
        break;
    }
  }
  function vs(m, y, d) {
    const T = pt();
    if (T === 0) return;
    const S = c[T - 1], A = T > 1 ? c[T - 2].close : S.open, R = S.close >= A ? $e(d) : Ye(d), F = y.priceToY(S.close);
    F >= y.top && F <= y.bottom && mc(n, R, Math.round(F) + 0.5, m.plotWidth);
    const W = ft(F, y.top + 9, y.bottom - 9);
    if (ui(
      n,
      Me(S.close, r),
      W,
      m.plotWidth,
      m.width - m.plotWidth,
      R,
      "#ffffff"
    ), p === null && !oe(l) && a.length > 0 && C.intervalMs > 0) {
      const Y = a[a.length - 1].time + C.intervalMs - Date.now();
      if (Y > 0 && Y <= C.intervalMs + 6e4) {
        let O = W + 9 + 8;
        O + 8 > y.bottom && (O = W - 9 - 8), uc(
          n,
          kc(Y),
          O,
          m.plotWidth,
          m.width - m.plotWidth,
          d
        );
      }
    }
  }
  function Rs(m, y, d) {
    if (L = [], I.length === 0) return;
    const T = m.width - m.plotWidth, S = D !== null && D.mode === "move-alert" ? D : null;
    for (const A of I) {
      const R = S !== null && S.id === A.id ? S.price : A.price, F = y.priceToY(R), W = ft(F, y.top + 9, y.bottom - 9), Y = A.condition === "above" ? $e(d) : Ye(d), O = F >= y.top && F <= y.bottom, X = ac(
        n,
        Y,
        A.triggered,
        Me(R, r),
        F,
        W,
        O,
        m.plotWidth,
        T
      );
      L.push({ id: A.id, x: X.x, y: X.y, width: X.width, height: X.height });
    }
  }
  function Es(m, y, d) {
    const T = pt();
    if (T === 0) return;
    const S = d ?? T - 1, A = c[S], R = 10, F = 16;
    let W = m.panes[0].top + 12;
    const Y = A.close >= A.open ? $e(y) : Ye(y), O = S > 0 ? c[S - 1].close : A.open, X = O !== 0 ? (A.close - O) / O * 100 : 0, z = X >= 0 ? $e(y) : Ye(y), mt = (bt) => Me(bt, r);
    if (En(
      n,
      [
        { text: "O", color: y.mutedText },
        { text: mt(A.open), color: Y },
        { text: "H", color: y.mutedText },
        { text: mt(A.high), color: Y },
        { text: "L", color: y.mutedText },
        { text: mt(A.low), color: Y },
        { text: "C", color: y.mutedText },
        { text: mt(A.close), color: Y },
        { text: `${X >= 0 ? "+" : ""}${X.toFixed(2)}%`, color: z },
        { text: "Vol", color: y.mutedText },
        { text: Ya(A.volume), color: Y }
      ],
      R,
      W
    ), W += F, !oe(l)) {
      for (const bt of u) {
        if (bt.placement !== "overlay") continue;
        const Nt = [{ text: bt.label, color: y.mutedText }];
        for (const Ct of bt.outputs) {
          const G = S < Ct.values.length ? Ct.values[S] : null;
          Nt.push({ text: G == null || !isFinite(G) ? "—" : mt(G), color: Ct.color });
        }
        En(n, Nt, R, W), W += F;
      }
      for (let bt = 1; bt < m.panes.length; bt++) {
        const Nt = m.panes[bt], Ct = Nt.indicator, G = [{ text: Ct.label, color: y.mutedText }];
        for (const x of Ct.outputs) {
          const tt = S < x.values.length ? x.values[S] : null;
          G.push({ text: tt == null || !isFinite(tt) ? "—" : Is(tt), color: x.color });
        }
        En(n, G, R, Nt.top + 12);
      }
    }
  }
  function _s(m, y, d) {
    if (!Z) return;
    const { x: T, y: S } = Z;
    if (T < 0 || T > m.plotWidth || S < 0 || S >= m.timeAxisTop) return;
    const A = Math.floor(C.xToIndex(T)), R = Math.round(C.centerX(A)) + 0.5;
    gc(n, d, R, m.timeAxisTop), C.count > 0 && pc(
      n,
      d,
      Xa(C.indexToTime(A), C.intervalMs),
      Math.round(C.centerX(A)),
      m.plotWidth,
      m.timeAxisTop,
      _n
    );
    const F = os(S, m);
    if (F >= 0 && F < y.length) {
      yc(n, d, Math.round(S) + 0.5, m.plotWidth);
      const W = y[F], Y = W.yToPrice(S), O = F === 0 ? Me(Y, r) : Cs(Y, W);
      ui(
        n,
        O,
        S,
        m.plotWidth,
        m.width - m.plotWidth,
        d.crosshairTagBg,
        d.crosshairTagText
      );
    }
  }
  function Ds() {
    if (_e || ((window.devicePixelRatio || 1) !== Zt && De(), st.width <= 0 || st.height <= 0)) return;
    const m = Da[s], y = ls(m), d = as(), T = at();
    n.save(), n.font = Dt, n.fillStyle = m.bg, n.fillRect(0, 0, T.width, T.height);
    const S = Ba(C);
    d && Va(n, m, S, T.timeAxisTop);
    const { from: A, to: R } = C.visibleRange(), F = Math.min(R, pt() - 1), W = pt() > 0 && A <= F, Y = oe(l), O = T.panes[0], X = ct(O), z = [X], mt = X.ticks(Math.pow(10, -r));
    if (d && ai(n, m, T.plotWidth, X, mt), W && O.height > 0 && T.plotWidth > 0) {
      if (n.save(), mn(O, T), Fs(X, y, A, F), !Y) {
        for (const G of u)
          if (G.placement === "overlay")
            for (const x of G.outputs)
              ci(n, x, A, F, C, X);
      }
      (b.length > 0 || P !== null) && lc(n, b, P, pt() - 1, C, X), n.restore();
    }
    for (let G = 1; G < T.panes.length; G++) {
      const x = T.panes[G], tt = is(x);
      z.push(tt);
      const te = tt.ticks();
      d && ai(n, m, T.plotWidth, tt, te);
      const ee = x.indicator;
      if (ee.range && ee.range[0] === 0 && ee.range[1] === 100 && fc(n, m, T.plotWidth, tt, [30, 70]), !Y && x.height > 0 && T.plotWidth > 0) {
        n.save(), mn(x, T);
        for (const gn of ee.outputs)
          ci(n, gn, A, F, C, tt);
        n.restore();
      }
      Ga(n, m, x.top - Dn, T.width);
    }
    qa(n, m, T.plotWidth, T.timeAxisTop, T.width, T.height), hi(
      n,
      m,
      T.plotWidth,
      mt.map((G) => ({ y: Math.round(X.priceToY(G)), label: Me(G, r) }))
    );
    for (let G = 1; G < T.panes.length; G++)
      hi(n, m, T.plotWidth, Ns(z[G], z[G].ticks()));
    if (T.width - T.plotWidth > dt + Yn && O.height > dt) {
      const G = T.plotWidth + Yn + 1, x = O.top + Yn;
      fi(n, m, G, x, dt, j === "auto"), an = { x: G, y: x, width: dt, height: dt };
      const tt = x + dt + 4;
      O.top + O.height > tt + dt ? (fi(n, m, G, tt, dt, $t, "L"), Ee = { x: G, y: tt, width: dt, height: dt }) : Ee = null;
    } else
      an = null, Ee = null;
    const Nt = [];
    for (let G = 0; G < S.length; G++)
      Nt.push({
        x: S[G].x,
        label: Ha(S[G].time, G > 0 ? S[G - 1].time : null, C.intervalMs)
      });
    if (hc(n, m, Nt, T.timeAxisTop + _n / 2 + 1), W && vs(T, X, m), Rs(T, X, m), O.height > 0 && T.plotWidth > 0) {
      const G = Qt(X), x = me();
      n.save(), mn(O, T);
      for (const te of w)
        vn(n, te, G, te.id === k, x);
      const tt = ys(G, O);
      if (tt && vn(n, tt, G, !1, x), D !== null && D.mode === "freehand" && vn(n, D.drawing, G, !1, x), J && Z) {
        const te = E !== null && je(E) >= 1, ee = D !== null && D.mode === "move-handle", gn = Z.x >= 0 && Z.x <= T.plotWidth && Z.y >= O.top && Z.y < O.top + O.height;
        if (te && gn || ee) {
          const No = Oe(Z.x, Z.y, G);
          No.snapped && bc(n, Z.x, G.priceToY(No.price), y.accent);
        }
      }
      n.restore();
    }
    const Ct = Z && W && Z.x >= 0 && Z.x <= T.plotWidth && Z.y < T.timeAxisTop ? ft(Math.floor(C.xToIndex(Z.x)), 0, pt() - 1) : null;
    cs() && _s(T, z, m), Es(T, m, Ct), n.restore();
  }
  const Io = {
    setData(m) {
      const y = c, d = y.length, T = { ...C.view };
      a = m.slice(), rs(), We();
      const S = c.length;
      if (d === 0 || S === 0)
        xt();
      else {
        const A = c[S - 1].time === y[d - 1].time, R = S - d;
        A ? C.view = { start: T.start + R, end: T.end + R } : c[0].time === y[0].time ? C.view = T : xt();
      }
      cn = !0, yo(), H();
    },
    updateLast(m) {
      const y = a.length;
      if (y === 0) {
        Io.setData([m]);
        return;
      }
      const d = c.length, T = C.view.end >= d - 0.5, S = a[y - 1];
      if (m.time === S.time)
        a[y - 1] = m;
      else if (m.time > S.time)
        a.push(m);
      else
        return;
      We();
      const A = c.length - d;
      T && A > 0 && (C.view = { start: C.view.start + A, end: C.view.end + A }), yo(), H();
    },
    setIndicators(m) {
      u = m.slice(), H();
    },
    setChartType(m) {
      if (m === l) {
        H();
        return;
      }
      const y = c.length, d = oe(m) !== oe(l);
      l = m, We(), d || c.length !== y ? xt() : It(), H();
    },
    setTheme(m) {
      s = m, H();
    },
    setPricePrecision(m) {
      r = m, H();
    },
    setActiveTool(m) {
      E = m, B = [], D !== null && D.mode === "freehand" && (D = null), m !== null && Yt(null), H();
    },
    setDrawings(m) {
      w = m.slice(), k && !w.some((y) => y.id === k) && Yt(null), H();
    },
    updateDrawing(m) {
      const y = w.findIndex((d) => d.id === m.id);
      y < 0 || (w[y] = m, ge(), H());
    },
    setMagnet(m) {
      J = m, H();
    },
    setAlerts(m) {
      if (D !== null && D.mode === "move-alert") {
        const y = D.id;
        m.some((d) => d.id === y) || (D = null);
      }
      I = m.slice(), H();
    },
    setSettings(m) {
      v = { ...m }, H();
    },
    clearDrawings() {
      w.length !== 0 && (w = [], Yt(null), ge(), H());
    },
    resetView() {
      xt(), H();
    },
    resize() {
      De(), H();
    },
    destroy() {
      _e || (_e = !0, clearInterval(ns), Kt !== 0 && cancelAnimationFrame(Kt), Kt = 0, Ls(), Lo.disconnect(), o.remove());
    },
    setProjections(m, y) {
      b = m.slice(), P = y ?? null;
      const d = C.count;
      if (b.length > 0 && d > 0 && C.view.end >= d - 0.5) {
        let T = 0;
        for (const A of b)
          for (const R of A.points) R.barOffset > T && (T = R.barOffset);
        if (P) {
          for (const A of P.upper) A.barOffset > T && (T = A.barOffset);
          for (const A of P.lower) A.barOffset > T && (T = A.barOffset);
        }
        const S = d + T + 3;
        if (C.view.end < S) {
          const A = C.range;
          C.view = { start: S - A, end: S }, It();
        }
      }
      H();
    },
    scrollToTime(m) {
      const y = c.length;
      if (y === 0) return;
      const d = ft(Math.round(C.timeToIndex(m)), 0, y - 1), T = C.range, S = d + 0.5;
      C.view = { start: S - T / 2, end: S + T / 2 }, It(), zt(), H();
    },
    setReplayCursor(m) {
      if (m === null) {
        if (p === null) return;
        p = null, H();
        return;
      }
      const y = c.length, d = y === 0 ? 0 : ft(Math.round(m), 0, y - 1), T = p === null;
      if (!(!T && d === p)) {
        if (p = d, y > 0) {
          const S = C.view.end - C.view.start, A = fn(S), R = d >= C.view.start && d <= C.view.end - A;
          if (T || !R) {
            const F = d + 1 + A;
            C.view = { start: F - S, end: F }, It(), zt();
          }
        }
        H();
      }
    },
    setReplayPlaying(m) {
      g = m;
    },
    getMainConverters() {
      return st.width <= 0 || st.height <= 0 ? null : ss;
    },
    getMainPaneRect() {
      if (st.width <= 0 || st.height <= 0) return null;
      const m = at().panes[0];
      return { x: 0, y: m.top, width: C.plotWidth, height: m.height };
    }
  };
  return De(), We(), xt(), H(), Io;
}
function ut(t, e, o, i = 1) {
  const n = t[e], s = typeof n == "number" && Number.isFinite(n) ? Math.floor(n) : o;
  return Math.max(i, s);
}
function Ic(t, e, o, i = 0) {
  const n = t[e], s = typeof n == "number" && Number.isFinite(n) ? n : o;
  return Math.max(i, s);
}
function Re(t) {
  return t.map((e) => e.close);
}
function sn(t, e) {
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
function Ze(t, e) {
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
function Kn(t, e) {
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
const Nc = {
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
        values: sn(Re(t), o),
        color: "#2962FF"
      }
    ];
  }
}, Cc = {
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
        values: Ze(Re(t), o),
        color: "#FF6D00"
      }
    ];
  }
}, Fc = {
  id: "wma",
  label: "Weighted Moving Average",
  shortLabel: "WMA",
  placement: "overlay",
  params: [{ key: "period", label: "Period", default: 20, min: 1, max: 500, step: 1 }],
  compute(t, e) {
    const o = ut(e, "period", 20), i = Re(t), n = new Array(i.length).fill(null), s = o * (o + 1) / 2;
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
    const o = ut(e, "period", 20), i = Ic(e, "stdDev", 2, 0), n = Re(t), s = sn(n, o), r = new Array(n.length).fill(null), l = new Array(n.length).fill(null);
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
}, Rc = {
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
}, Ec = {
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
    const r = Kn(n, o), l = Kn(s, o), a = new Array(i).fill(null);
    for (let c = 0; c < i; c++) {
      const f = r[c], h = l[c];
      f === null || h === null || (h === 0 ? a[c] = f === 0 ? 50 : 100 : a[c] = 100 - 100 / (1 + f / h));
    }
    return [{ name: "rsi", values: a, color: "#7E57C2" }];
  }
}, _c = {
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
    const o = ut(e, "fast", 12), i = ut(e, "slow", 26), n = ut(e, "signal", 9), s = Re(t), r = s.length, l = Ze(s, o), a = Ze(s, i), c = new Array(r).fill(null);
    for (let u = 0; u < r; u++) {
      const p = l[u], g = a[u];
      p !== null && g !== null && (c[u] = p - g);
    }
    const f = Ze(c, n), h = new Array(r).fill(null);
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
}, Dc = {
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
    const l = sn(r, n), a = sn(l, i);
    return [
      { name: "k", values: l, color: "#2962FF" },
      { name: "d", values: a, color: "#FF6D00" }
    ];
  }
}, Wc = {
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
    return [{ name: "atr", values: Kn(n, o), color: "#EF5350" }];
  }
}, $c = {
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
}, Yc = {
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
}, Oc = {
  id: "cvd",
  label: "Cumulative Volume Delta",
  shortLabel: "CVD",
  placement: "pane",
  params: [],
  compute(t, e) {
    const o = t.length, i = new Array(o).fill(null);
    let n = 0;
    for (let s = 0; s < o; s++) {
      const r = t[s], l = r.high - r.low, a = l > 0 ? Bc(2 * (r.close - r.low) / l - 1, -1, 1) : 0;
      n += r.volume * a, i[s] = n;
    }
    return [{ name: "cvd", values: i, color: "#2962ff", style: "line" }];
  }
};
function Bc(t, e, o) {
  return t < e ? e : t > o ? o : t;
}
const Hc = [
  Yc,
  Nc,
  Cc,
  Fc,
  vc,
  Rc,
  Ec,
  _c,
  Dc,
  Wc,
  $c,
  Oc
], Xc = new Map(Hc.map((t) => [t.id, t]));
function Mf(t) {
  return Xc.get(t);
}
function Qi(t) {
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
function zi(t, e, o) {
  const i = e.length, n = t.length, s = Math.floor(o.k), r = Math.max(1, Math.floor(o.minGap ?? i)), l = Math.max(0, Math.floor(o.excludeTail ?? 0));
  if (s < 1 || i < 2) return [];
  const a = n - l - i;
  if (a < 0) return [];
  const c = a + 1, f = Qi(e);
  for (let L = 0; L < i; L++)
    if (!Number.isFinite(f[L])) return [];
  const h = new Float64Array(n), u = new Int32Array(n + 1);
  for (let L = 0; L < n; L++) {
    const k = t[L];
    Number.isFinite(k) ? (h[L] = k, u[L + 1] = u[L]) : (h[L] = 0, u[L + 1] = u[L] + 1);
  }
  const p = new Float64Array(c), g = 1024;
  let b = 0, P = 0;
  for (let L = 0; L < i; L++) {
    const k = h[L];
    b += k, P += k * k;
  }
  for (let L = 0; L < c; L++) {
    if (L > 0)
      if (L % g === 0) {
        b = 0, P = 0;
        for (let K = 0; K < i; K++) {
          const j = h[L + K];
          b += j, P += j * j;
        }
      } else {
        const K = h[L - 1], j = h[L + i - 1];
        b += j - K, P += j * j - K * K;
      }
    if (u[L + i] - u[L] > 0) {
      p[L] = 1 / 0;
      continue;
    }
    const k = b / i;
    let E = P / i - k * k;
    E < 0 && (E = 0);
    const B = Math.sqrt(E);
    let J = 0;
    if (B > 0) {
      const K = 1 / B;
      for (let j = 0; j < i; j++) {
        const U = (h[L + j] - k) * K - f[j];
        J += U * U;
      }
    } else
      for (let K = 0; K < i; K++) J += f[K] * f[K];
    p[L] = Number.isFinite(J) ? Math.sqrt(J) : 1 / 0;
  }
  const w = new Array(c);
  for (let L = 0; L < c; L++) w[L] = L;
  w.sort((L, k) => {
    const E = p[L], B = p[k];
    return E === B ? 0 : E < B ? -1 : 1;
  });
  const I = [], v = [];
  for (let L = 0; L < c && I.length < s; L++) {
    const k = w[L], E = p[k];
    if (!Number.isFinite(E)) break;
    let B = !0;
    for (let J = 0; J < v.length; J++)
      if (Math.abs(k - v[J]) < r) {
        B = !1;
        break;
      }
    B && (v.push(k), I.push({ startIndex: k, endIndex: k + i - 1, distance: E }));
  }
  return I;
}
function Vc(t, e, o, i) {
  if (e < 2 || o < 1 || i < 1) return null;
  const n = t.length;
  if (n < e * 3) return null;
  const s = new Array(n);
  for (let w = 0; w < n; w++) s[w] = t[w].close;
  const r = s.slice(n - e), l = zi(s, r, {
    k: i,
    minGap: e,
    excludeTail: e + o
  }), a = [];
  for (let w = 0; w < l.length; w++) {
    const I = l[w], v = I.endIndex, L = s[v];
    let k = null;
    if (v + o < n && Number.isFinite(L) && L !== 0) {
      const E = new Array(o);
      let B = !0;
      for (let J = 1; J <= o; J++) {
        const K = (s[v + J] / L - 1) * 100;
        if (!Number.isFinite(K)) {
          B = !1;
          break;
        }
        E[J - 1] = K;
      }
      B && (k = E);
    }
    a.push({ match: I, matchTime: t[v].time, aftermathPct: k });
  }
  const c = [];
  let f = 0;
  for (let w = 0; w < a.length; w++) {
    const I = a[w].aftermathPct;
    if (I === null) continue;
    const v = I[o - 1];
    c.push(v), v > 0 && f++;
  }
  c.sort((w, I) => w - I);
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
      const I = (r[w] / g - 1) * 100;
      b[w] = Number.isFinite(I) ? I : 0;
    } else
      b[w] = 0;
  return { windowLen: e, horizon: o, results: a, stats: p, queryClosePct: b };
}
function Gc(t, e) {
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
const qc = 200, gi = 120;
function we(t, e) {
  const o = t.length;
  if (o === 1) return t[0];
  const i = e * (o - 1), n = Math.floor(i), s = n + 1 < o ? n + 1 : n, r = i - n;
  return t[n] + r * (t[s] - t[n]);
}
function Uc(t, e, o, i = 12) {
  if (e = Math.floor(e), o = Math.floor(o), i = Math.floor(i), e < 1 || o < 1 || i < 1 || t.length < qc) return null;
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
      const I = Math.floor(Math.random() * (l + 1)), v = e - w, L = i < v ? i : v;
      for (let k = 0; k < L; k++)
        P += n[I + k], a[b + w] = (Math.exp(P) - 1) * 100, w++;
    }
  }
  const c = new Float32Array(o), f = new Array(e);
  for (let g = 0; g < e; g++) {
    for (let b = 0; b < o; b++) c[b] = a[b * e + g];
    c.sort(), f[g] = {
      p5: we(c, 0.05),
      p25: we(c, 0.25),
      p50: we(c, 0.5),
      p75: we(c, 0.75),
      p95: we(c, 0.95)
    };
  }
  const h = f[e - 1].p50, u = o < gi ? o : gi, p = new Array(u);
  for (let g = 0; g < u; g++) {
    const P = Math.floor(g * o / u) * e, w = new Array(e);
    for (let I = 0; I < e; I++) w[I] = a[P + I];
    p[g] = w;
  }
  return { horizon: e, nPaths: o, pathsPct: a, bandsPct: f, medianEndPct: h, samplePathsPct: p };
}
function jc(t, e) {
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
function Jc(t, e) {
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
const ie = 24, se = 7;
function Kc(t) {
  const e = new Float64Array(ie), o = new Float64Array(ie), i = new Float64Array(ie), n = new Int32Array(ie), s = new Float64Array(se), r = new Float64Array(se), l = new Float64Array(se), a = new Int32Array(se);
  let c = 1 / 0, f = -1 / 0;
  for (let g = 0; g < t.length; g++) {
    const b = t[g];
    if (!Number.isFinite(b.time) || !Number.isFinite(b.open) || !Number.isFinite(b.close) || !Number.isFinite(b.volume) || b.open === 0)
      continue;
    b.time < c && (c = b.time), b.time > f && (f = b.time);
    const P = new Date(b.time), w = P.getUTCHours(), I = P.getUTCDay(), v = (b.close / b.open - 1) * 100, L = Math.abs(v);
    e[w] += L, o[w] += v, i[w] += b.volume, n[w]++, s[I] += L, r[I] += v, l[I] += b.volume, a[I]++;
  }
  const h = (g, b, P, w) => w > 0 ? {
    meanAbsReturnPct: g / w,
    meanReturnPct: b / w,
    meanVolume: P / w,
    samples: w
  } : { meanAbsReturnPct: 0, meanReturnPct: 0, meanVolume: 0, samples: 0 }, u = new Array(ie);
  for (let g = 0; g < ie; g++)
    u[g] = h(e[g], o[g], i[g], n[g]);
  const p = new Array(se);
  for (let g = 0; g < se; g++)
    p[g] = h(s[g], r[g], l[g], a[g]);
  return {
    byHourUtc: u,
    byWeekdayUtc: p,
    candleCount: t.length,
    fromTime: Number.isFinite(c) ? c : 0,
    toTime: Number.isFinite(f) ? f : 0
  };
}
const Zc = 55, On = 256, Qc = 0.12, Bn = 5e-3, zc = 0.3, xc = 0.5, tf = 0.28, ef = 0.35, nf = 0.25, yi = 0.28, of = [0, 3, 5, 7, 10], sf = 3, rf = 220, Qe = [];
for (let t = 0; t < sf; t++)
  for (const e of of)
    Qe.push(rf * Math.pow(2, t + e / 12));
class xi {
  constructor() {
    ot(this, "ctx", null);
    ot(this, "masterGain", null);
    ot(this, "delay", null);
    ot(this, "_running", !1);
    // Rolling window of log(1+qty) values, as a ring buffer.
    ot(this, "sizes", new Float64Array(On));
    ot(this, "sizeCount", 0);
    ot(this, "sizeIdx", 0);
    // Rate limiting: at most one note per TICK_MS, coalescing same-side trades.
    ot(this, "pending", { buy: null, sell: null });
    ot(this, "tickTimer", null);
    ot(this, "suspendTimer", null);
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
    n.cancelScheduledValues(i), n.setValueAtTime(Math.max(n.value, 1e-4), i), n.exponentialRampToValueAtTime(Qc, i + 0.08), this._running = !0;
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
    r.delayTime.value = tf;
    const l = i.createGain();
    l.gain.value = ef;
    const a = i.createGain();
    return a.gain.value = nf, r.connect(l), l.connect(r), r.connect(a), a.connect(n), this.ctx = i, this.masterGain = n, this.delay = r, !0;
  }
  /** One rate-limit tick: keep ticking only while there is something pending. */
  scheduleTick() {
    this.tickTimer = setTimeout(() => {
      this.tickTimer = null, this._running && (this.pending.buy || this.pending.sell) && (this.flushOne(), this.scheduleTick());
    }, Zc);
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
    const r = Math.log1p(Math.max(0, o)), l = this.percentile(r), a = this.velocity(r), c = Math.min(Qe.length - 1, Math.max(0, Math.floor(l * Qe.length)));
    let f = Qe[c];
    e === "sell" && (f /= 2);
    const h = i.currentTime + 1e-3, u = zc + xc * a, p = 0.18 + 0.82 * a, g = i.createOscillator();
    g.type = e === "buy" ? "sine" : "triangle", g.frequency.value = f;
    const b = i.createGain();
    b.gain.setValueAtTime(1e-4, h), b.gain.linearRampToValueAtTime(p, h + Bn), b.gain.exponentialRampToValueAtTime(1e-4, h + Bn + u), g.connect(b);
    let P = b;
    if (typeof i.createStereoPanner == "function") {
      const w = i.createStereoPanner();
      w.pan.value = e === "buy" ? yi : -yi, b.connect(w), P = w;
    }
    P.connect(n), P.connect(s), g.start(h), g.stop(h + Bn + u + 0.05), g.onended = () => {
      g.disconnect(), b.disconnect(), P !== b && P.disconnect();
    };
  }
  pushSize(e) {
    this.sizes[this.sizeIdx] = e, this.sizeIdx = (this.sizeIdx + 1) % On, this.sizeCount < On && this.sizeCount++;
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
const lf = new xi(), wf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TradeSonifier: xi,
  buildEchoScan: Vc,
  buildOracle: Uc,
  computeMarketClock: Kc,
  findSimilar: zi,
  probabilityAtLeast: Jc,
  resampleStroke: Gc,
  sonifier: lf,
  targetOdds: jc,
  zNormalize: Qi
}, Symbol.toStringTag, { value: "Module" })), af = 10, cf = 1, ff = 10, ts = {
  upColor: "#26a69a",
  downColor: "#ef5350",
  gridVisible: !1,
  crosshairVisible: !0,
  alertSound: !0,
  alertTune: 0,
  alertDuration: 2
};
function Sf(t) {
  return typeof t == "number" && Number.isInteger(t) && t >= 0 && t < af ? t : ts.alertTune;
}
function hf(t) {
  return typeof t != "number" || !Number.isFinite(t) ? ts.alertDuration : Math.min(ff, Math.max(cf, Math.round(t)));
}
function it(t, e, o) {
  const { type: i = "sine", freq: n, freqTo: s, start: r, dur: l, peak: a = 0.2 } = o, c = t.createGain();
  c.connect(e);
  const f = Math.min(0.012, l * 0.25);
  c.gain.setValueAtTime(1e-4, r), c.gain.exponentialRampToValueAtTime(a, r + f), c.gain.exponentialRampToValueAtTime(1e-4, r + l);
  const h = t.createOscillator();
  h.type = i, h.frequency.setValueAtTime(n, r), s !== void 0 && h.frequency.exponentialRampToValueAtTime(Math.max(1, s), r + l), h.connect(c), h.start(r), h.stop(r + l + 0.03);
}
function kt(t, e, o, i) {
  const n = Math.max(1, Math.ceil(e / o));
  for (let s = 0; s < n; s++) {
    const r = t + s * o;
    if (r >= t + e - 1e-3) break;
    i(r, s);
  }
}
const Zn = [
  {
    name: "Classic beep",
    render: (t, e, o, i) => kt(o, i, 0.5, (n) => {
      it(t, e, { freq: 880, start: n, dur: 0.15 }), it(t, e, { freq: 1320, start: n + 0.17, dur: 0.15 });
    })
  },
  {
    name: "Chime",
    render: (t, e, o, i) => kt(o, i, 0.95, (n) => {
      it(t, e, { type: "triangle", freq: 1318, start: n, dur: 0.85, peak: 0.18 }), it(t, e, { type: "triangle", freq: 1047, start: n + 0.12, dur: 0.8, peak: 0.14 });
    })
  },
  {
    name: "Ping",
    render: (t, e, o, i) => kt(o, i, 0.6, (n) => it(t, e, { freq: 1568, start: n, dur: 0.35, peak: 0.22 }))
  },
  {
    name: "Rising alert",
    render: (t, e, o, i) => kt(
      o,
      i,
      0.7,
      (n) => it(t, e, { type: "sawtooth", freq: 440, freqTo: 1760, start: n, dur: 0.5, peak: 0.14 })
    )
  },
  {
    name: "Falling alert",
    render: (t, e, o, i) => kt(
      o,
      i,
      0.7,
      (n) => it(t, e, { type: "sawtooth", freq: 1760, freqTo: 440, start: n, dur: 0.5, peak: 0.14 })
    )
  },
  {
    name: "Pulse",
    render: (t, e, o, i) => kt(o, i, 0.2, (n) => it(t, e, { type: "square", freq: 1100, start: n, dur: 0.09, peak: 0.12 }))
  },
  {
    name: "Marimba",
    render: (t, e, o, i) => kt(o, i, 0.62, (n) => {
      it(t, e, { type: "triangle", freq: 523, start: n, dur: 0.2, peak: 0.18 }), it(t, e, { type: "triangle", freq: 659, start: n + 0.12, dur: 0.2, peak: 0.16 }), it(t, e, { type: "triangle", freq: 784, start: n + 0.24, dur: 0.22, peak: 0.16 });
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
    render: (t, e, o, i) => kt(
      o,
      i,
      1,
      (n) => [440, 554, 659, 880].forEach(
        (s, r) => it(t, e, { freq: s, start: n + r * 0.18, dur: 0.24, peak: 0.16 })
      )
    )
  },
  {
    name: "Digital",
    render: (t, e, o, i) => kt(o, i, 0.5, (n) => {
      it(t, e, { type: "square", freq: 1047, start: n, dur: 0.1, peak: 0.1 }), it(t, e, { type: "square", freq: 1568, start: n + 0.12, dur: 0.1, peak: 0.1 }), it(t, e, { type: "square", freq: 1319, start: n + 0.26, dur: 0.12, peak: 0.1 });
    })
  }
], Pf = Zn.map((t, e) => ({
  id: e,
  name: t.name
}));
function uf(t, e) {
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
  const s = hf(e), r = Zn[t] ?? Zn[0], l = n.createGain();
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
function pf(t) {
  if (!Number.isFinite(t)) return "—";
  const e = Math.abs(t);
  if (e >= 1e3)
    return t.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (e >= 1) return t.toFixed(2);
  if (e === 0) return "0.00";
  const o = t.toPrecision(4);
  return o.includes("e") ? t.toFixed(8) : String(parseFloat(o));
}
async function Af() {
  if (typeof Notification > "u") return !1;
  if (Notification.permission === "granted") return !0;
  if (Notification.permission === "denied") return !1;
  try {
    return await Notification.requestPermission() === "granted";
  } catch {
    return !1;
  }
}
function es(t) {
  const e = `${t.symbol} crossed ${t.condition} ${pf(t.price)}`;
  return t.message && t.message.trim() !== "" ? `${e} — ${t.message.trim()}` : e;
}
function mf(t) {
  if (typeof Notification > "u" || Notification.permission !== "granted") return !1;
  try {
    return new Notification("CandL price alert", { body: es(t), tag: t.id }), !0;
  } catch {
    return !1;
  }
}
function gf(t) {
  if (typeof document > "u") return;
  const e = document.createElement("div");
  e.className = "alert-toast", e.setAttribute("role", "status"), e.textContent = es(t), document.body.appendChild(e), requestAnimationFrame(() => e.classList.add("show"));
  const o = () => {
    e.classList.remove("show"), window.setTimeout(() => e.remove(), 250);
  };
  window.setTimeout(o, 6e3), e.addEventListener("click", o);
}
function kf(t) {
  const { symbol: e, price: o, prevPrice: i, alerts: n, soundOn: s, tune: r, tuneDurationSec: l, onTriggered: a } = t;
  if (Number.isFinite(o))
    for (const c of n) {
      if (c.symbol !== e || c.triggered) continue;
      let f;
      c.condition === "above" ? f = (i === null || i < c.price) && o >= c.price : f = (i === null || i > c.price) && o <= c.price, f && (mf(c) || gf(c), s && uf(r, l), a(c.id, Date.now()));
    }
}
const Lf = ["1s", "15s", "30s", "1m", "5m", "15m", "30m", "1h", "4h", "1d", "1w"], If = {
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
}, Nf = {
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
  ff as ALERT_DURATION_MAX,
  cf as ALERT_DURATION_MIN,
  Pf as ALERT_TUNES,
  af as ALERT_TUNE_COUNT,
  Sa as DEFAULT_DRAWING_COLOR,
  ts as DEFAULT_SETTINGS,
  df as DRAWING_TOOLS,
  lr as FIBEXT_LEVELS,
  Pi as FIBEXT_LEVEL_COLORS,
  dn as FIB_LEVELS,
  Si as FIB_LEVEL_COLORS,
  ze as HANDLE_TOLERANCE,
  Ys as HIT_TOLERANCE,
  Hc as INDICATORS,
  Lf as INTERVALS,
  Nf as INTERVAL_LABELS,
  If as INTERVAL_MS,
  wa as TOOL_GROUPS,
  Ut as TOOL_IMPLS,
  kf as checkAndFireAlerts,
  hf as clampAlertDuration,
  Sf as clampAlertTune,
  Tf as createChartEngine,
  Fn as defaultDrawing,
  Af as ensureNotificationPermission,
  Ro as fibExtLevelPrice,
  vo as fibLevelPrice,
  vt as formatPrice,
  Mf as getIndicator,
  si as hitTestDrawing,
  ri as hitTestHandle,
  wf as lab,
  Aa as movePoint,
  uf as playTune,
  je as pointsNeeded,
  vn as renderDrawing,
  uo as toolImpl,
  Pa as translateDrawing
};
//# sourceMappingURL=candl-charts.js.map
