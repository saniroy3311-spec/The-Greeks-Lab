var Ys = Object.defineProperty;
var $s = (t, e, n) => e in t ? Ys(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n;
var ot = (t, e, n) => $s(t, typeof e != "symbol" ? e + "" : e, n);
import "react/jsx-runtime";
const Os = 6, tn = 8, be = 7, zn = '-apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', nt = `10px ${zn}`, di = `11px ${zn}`, fe = `12px ${zn}`;
function H(t) {
  return Math.max(Os, t.width / 2 + 3);
}
function w(t, e) {
  return { x: t.timeToX(e.time), y: t.priceToY(e.price) };
}
function yt(t, e) {
  return t.points.map((n) => w(e, n));
}
function rt(t) {
  const e = t.getTransform(), n = e.a !== 0 ? Math.abs(e.a) : 1, i = e.d !== 0 ? Math.abs(e.d) : 1;
  return { w: t.canvas.width / n, h: t.canvas.height / i };
}
const Ve = /* @__PURE__ */ new Map();
function Ti(t, e) {
  const n = Ve.get(e);
  if (n) return n;
  const i = t.fillStyle;
  t.fillStyle = e;
  const o = t.fillStyle;
  t.fillStyle = i;
  let s = { r: 0, g: 0, b: 0, a: 1 };
  if (typeof o == "string")
    if (o.charAt(0) === "#" && o.length >= 7)
      s = {
        r: parseInt(o.slice(1, 3), 16),
        g: parseInt(o.slice(3, 5), 16),
        b: parseInt(o.slice(5, 7), 16),
        a: 1
      };
    else {
      const r = /rgba?\(([^)]+)\)/.exec(o);
      if (r && r[1]) {
        const l = r[1].split(",").map((c) => parseFloat(c));
        s = { r: l[0] ?? 0, g: l[1] ?? 0, b: l[2] ?? 0, a: l[3] ?? 1 };
      }
    }
  return Ve.size > 256 && Ve.clear(), Ve.set(e, s), s;
}
function _(t, e, n) {
  const i = Ti(t, e);
  return `rgba(${i.r}, ${i.g}, ${i.b}, ${(i.a * n).toFixed(3)})`;
}
function Re(t, e) {
  const n = Ti(t, e);
  return 0.2126 * n.r + 0.7152 * n.g + 0.0722 * n.b > 145 ? "#0f0f0f" : "#ffffff";
}
function Et(t, e) {
  if (!isFinite(t)) return "—";
  const n = Math.max(0, Math.min(8, Math.round(e)));
  return t.toLocaleString("en-US", {
    minimumFractionDigits: n,
    maximumFractionDigits: n
  });
}
function Ie(t, e) {
  const n = Et(t, e);
  return t >= 0 ? `+${n}` : n;
}
function Fe(t) {
  return isFinite(t) ? `${t >= 0 ? "+" : ""}${t.toFixed(2)}%` : "—";
}
const Bs = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function dn(t) {
  return t < 10 ? "0" + t : String(t);
}
function xn(t, e) {
  const n = new Date(t), i = `${n.getDate()} ${Bs[n.getMonth()]} '${dn(n.getFullYear() % 100)}`;
  return e >= 864e5 ? i : `${i} ${dn(n.getHours())}:${dn(n.getMinutes())}`;
}
function Mi(t) {
  const e = Math.abs(t), n = Math.floor(e / 6e4);
  if (n < 1) return `${Math.round(e / 1e3)}s`;
  const i = Math.floor(n / 1440), o = Math.floor(n % 1440 / 60), s = n % 60;
  return i > 0 ? o > 0 ? `${i}d ${o}h` : `${i}d` : o > 0 ? s > 0 ? `${o}h ${s}m` : `${o}h` : `${s}m`;
}
function Xs(t) {
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
function wi(t, e, n) {
  const i = t.split(/\s+/).filter((l) => l.length > 0), o = [];
  let s = "";
  const r = () => {
    s.length > 0 && (o.push(s), s = "");
  };
  for (const l of i) {
    let c = l;
    if (s.length > 0 && s.length + 1 + c.length <= e) {
      s += " " + c;
      continue;
    }
    for (r(); c.length > e; )
      o.push(c.slice(0, e)), c = c.slice(e);
    s = c;
  }
  if (r(), o.length === 0 && o.push(""), o.length > n) {
    const l = o.slice(0, n), c = l[n - 1];
    return l[n - 1] = (c.length >= e ? c.slice(0, e - 1) : c) + "…", l;
  }
  return o;
}
function At(t, e, n, i, o, s) {
  const r = Math.min(s, i / 2, o / 2);
  t.beginPath(), t.moveTo(e + r, n), t.arcTo(e + i, n, e + i, n + o, r), t.arcTo(e + i, n + o, e, n + o, r), t.arcTo(e, n + o, e, n, r), t.arcTo(e, n, e + i, n, r), t.closePath();
}
function bt(t, e) {
  return Math.round(e) % 2 === 1 ? Math.round(t) + 0.5 : Math.round(t);
}
function v(t, e, n, i, o) {
  t.beginPath(), t.moveTo(e, n), t.lineTo(i, o), t.stroke();
}
function V(t, e, n, i) {
  t.beginPath(), t.arc(e, n, Math.max(1, i), 0, Math.PI * 2), t.fill();
}
function en(t, e, n, i, o) {
  t.beginPath(), t.moveTo(e, n), t.lineTo(e - o * Math.cos(i - 0.42), n - o * Math.sin(i - 0.42)), t.lineTo(e - o * Math.cos(i + 0.42), n - o * Math.sin(i + 0.42)), t.closePath(), t.fill();
}
function to(t, e, n, i, o, s, r) {
  const l = i - e, c = o - n, a = Math.hypot(l, c);
  if (a < 1) return;
  const f = Math.atan2(c, l), h = Math.min(s * 0.8, a / 2), u = l / a, p = c / a, g = r ? e + u * h : e, b = r ? n + p * h : n;
  v(t, g, b, i - u * h, o - p * h), en(t, i, o, f, s), r && en(t, e, n, f + Math.PI, s);
}
function kt(t, e, n, i, o, s = fe) {
  if (i.length === 0) return;
  t.font = s;
  const r = 8, l = 4, a = (parseInt(s, 10) || 12) + 4;
  let f = 0;
  for (const b of i) f = Math.max(f, t.measureText(b).width);
  const h = f + r * 2, u = i.length * a + l * 2, p = e - h / 2, g = n - u / 2;
  At(t, p, g, h, u, 4), t.fillStyle = o, t.fill(), t.fillStyle = Re(t, o), t.textAlign = "center", t.textBaseline = "middle";
  for (let b = 0; b < i.length; b++)
    t.fillText(i[b], e, g + l + a * (b + 0.5));
}
function I(t, e, n, i) {
  const o = be / 2;
  t.lineWidth = 1, t.setLineDash([]);
  const s = i ?? e.points.map((r, l) => l);
  for (const r of s) {
    const l = e.points[r];
    if (!l) continue;
    const c = n.timeToX(l.time), a = n.priceToY(l.price);
    t.fillStyle = "#ffffff", t.fillRect(c - o, a - o, be, be), t.strokeStyle = e.color, t.strokeRect(c - o, a - o, be, be);
  }
}
function lt(t, e, n, i, o, s, r, l) {
  const c = o - n, a = s - i, f = c * c + a * a;
  let h = f === 0 ? 0 : ((t - n) * c + (e - i) * a) / f;
  return h = Math.max(r, Math.min(l, h)), Math.hypot(t - (n + h * c), e - (i + h * a));
}
function Z(t, e, n, i) {
  return lt(t, e, n.x, n.y, i.x, i.y, 0, 1);
}
function Kt(t, e, n) {
  let i = !1;
  for (let o = 0, s = n.length - 1; o < n.length; s = o++) {
    const r = n[o].x, l = n[o].y, c = n[s].x, a = n[s].y;
    l > e != a > e && t < (c - r) * (e - l) / (a - l) + r && (i = !i);
  }
  return i;
}
function Dt(t, e, n, i, o) {
  return t >= Math.min(n.x, i.x) - o && t <= Math.max(n.x, i.x) + o && e >= Math.min(n.y, i.y) - o && e <= Math.max(n.y, i.y) + o;
}
function an(t, e, n, i, o, s, r, l) {
  const c = n - t, a = i - e, f = Math.hypot(c, a);
  if (f < 1e-6) return null;
  const h = 1e6 / f;
  let u = 0, p = 1;
  const g = [];
  if (c !== 0 && g.push((0 - t) / c, (o - t) / c), a !== 0 && g.push((0 - e) / a, (s - e) / a), g.length > 0) {
    let b = g[0], A = g[0];
    for (const T of g)
      b = Math.min(b, T), A = Math.max(A, T);
    r && (u = Math.max(Math.min(0, b), -h)), p = Math.min(Math.max(1, A), h);
  }
  return [t + c * u, e + a * u, t + c * p, e + a * p];
}
function Hs(t, e, n = 14) {
  if (t.length < n + 1) return null;
  let i = t.length - 1;
  for (; i > 0 && t[i].time > e; ) i--;
  if (i < n) return null;
  let o = 0;
  for (let s = i - n + 1; s <= i; s++) {
    const r = t[s], l = t[s - 1].close;
    o += Math.max(r.high - r.low, Math.abs(r.high - l), Math.abs(r.low - l));
  }
  return o / n;
}
function Vs(t, e, n) {
  const i = t.length;
  if (e < 1 || i - e < 30) return null;
  let o = 0, s = 0;
  for (let r = 0; r + e < i; r++) {
    const l = t[r].close;
    l > 0 && (o++, Math.abs((t[r + e].close / l - 1) * 100) <= n && s++);
  }
  return o < 30 ? null : Math.round(100 * s / o);
}
function eo(t, e, n, i, o) {
  t.font = nt;
  const s = 4, r = t.measureText(i).width + s * 2, l = 15;
  At(t, e, n - l / 2, r, l, 3), t.fillStyle = o, t.fill(), t.fillStyle = Re(t, o), t.textAlign = "left", t.textBaseline = "middle", t.fillText(i, e + s, n + 0.5);
}
function Si(t, e) {
  return t.font = nt, t.measureText(e).width + 8;
}
const Gs = {
  id: "trendline",
  label: "Trend Line",
  group: "lines",
  pointsNeeded: 2,
  render(t, e, n, i) {
    const o = w(n, e.points[0]), s = e.points[1] ? w(n, e.points[1]) : o;
    v(t, o.x, o.y, s.x, s.y), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    const o = w(i, t.points[0]), s = w(i, t.points[1]);
    return lt(e, n, o.x, o.y, s.x, s.y, 0, 1) <= H(t);
  }
}, qs = {
  id: "ray",
  label: "Ray",
  group: "lines",
  pointsNeeded: 2,
  render(t, e, n, i) {
    const o = w(n, e.points[0]), s = e.points[1] ? w(n, e.points[1]) : o, { w: r, h: l } = rt(t), c = an(o.x, o.y, s.x, s.y, r, l, !1);
    c ? v(t, c[0], c[1], c[2], c[3]) : V(t, o.x, o.y, e.width), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    const o = w(i, t.points[0]), s = w(i, t.points[1]);
    return lt(e, n, o.x, o.y, s.x, s.y, 0, Number.POSITIVE_INFINITY) <= H(t);
  }
}, Us = {
  id: "xline",
  label: "Extended Line",
  group: "lines",
  pointsNeeded: 2,
  render(t, e, n, i) {
    const o = w(n, e.points[0]), s = e.points[1] ? w(n, e.points[1]) : o, { w: r, h: l } = rt(t), c = an(o.x, o.y, s.x, s.y, r, l, !0);
    c ? v(t, c[0], c[1], c[2], c[3]) : V(t, o.x, o.y, e.width), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    const o = w(i, t.points[0]), s = w(i, t.points[1]);
    return lt(e, n, o.x, o.y, s.x, s.y, Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY) <= H(t);
  }
}, js = {
  id: "hray",
  label: "Horizontal Ray",
  group: "lines",
  pointsNeeded: 1,
  render(t, e, n, i, o) {
    const s = w(n, e.points[0]), { w: r } = rt(t), l = bt(s.y, t.lineWidth);
    if (s.x < r) {
      v(t, s.x, l, r, l);
      const c = Et(e.points[0].price, o.pricePrecision);
      eo(t, Math.max(s.x, r - Si(t, c) - 2), l, c, e.color);
    }
    i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    const o = w(i, t.points[0]), s = H(t);
    return Math.abs(n - o.y) <= s && e >= o.x - s;
  }
}, Js = {
  id: "hline",
  label: "Horizontal Line",
  group: "lines",
  pointsNeeded: 1,
  render(t, e, n, i, o) {
    const s = w(n, e.points[0]), { w: r } = rt(t), l = bt(s.y, t.lineWidth);
    v(t, 0, l, r, l), eo(t, 2, l, Et(e.points[0].price, o.pricePrecision), e.color), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    return Math.abs(n - i.priceToY(t.points[0].price)) <= H(t);
  }
}, Ks = {
  id: "vline",
  label: "Vertical Line",
  group: "lines",
  pointsNeeded: 1,
  render(t, e, n, i, o) {
    const s = w(n, e.points[0]), { w: r, h: l } = rt(t), c = bt(s.x, t.lineWidth);
    v(t, c, 0, c, l);
    const a = xn(e.points[0].time, o.barMs), f = Si(t, a), h = Math.max(2, Math.min(r - f - 2, c - f / 2));
    eo(t, h, l - 10, a, e.color), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    return Math.abs(e - i.timeToX(t.points[0].time)) <= H(t);
  }
}, Zs = [Gs, qs, Us, js, Js, Ks], Qs = 0.08, zs = 0.06;
function Ro(t, e, n) {
  if (Math.abs(e.x - t.x) > 1e-9) {
    const i = (n.x - t.x) / (e.x - t.x), o = t.y + i * (e.y - t.y);
    return { x: 0, y: n.y - o };
  }
  return { x: n.x - t.x, y: 0 };
}
const xs = {
  id: "channel",
  label: "Parallel Channel",
  group: "channels",
  pointsNeeded: 3,
  render(t, e, n, i) {
    const o = w(n, e.points[0]), s = e.points[1], r = e.points[2];
    if (!s) {
      V(t, o.x, o.y, e.width), i && I(t, e, n);
      return;
    }
    const l = w(n, s);
    if (r) {
      const c = Ro(o, l, w(n, r)), a = { x: o.x + c.x, y: o.y + c.y }, f = { x: l.x + c.x, y: l.y + c.y };
      t.fillStyle = _(t, e.color, Qs), t.beginPath(), t.moveTo(o.x, o.y), t.lineTo(l.x, l.y), t.lineTo(f.x, f.y), t.lineTo(a.x, a.y), t.closePath(), t.fill(), v(t, a.x, a.y, f.x, f.y), t.save(), t.setLineDash([4, 4]), t.strokeStyle = _(t, e.color, 0.45), t.lineWidth = 1, v(t, o.x + c.x / 2, o.y + c.y / 2, l.x + c.x / 2, l.y + c.y / 2), t.restore();
    }
    v(t, o.x, o.y, l.x, l.y), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    const o = w(i, t.points[0]), s = w(i, t.points[1]), r = Ro(o, s, w(i, t.points[2])), l = { x: o.x + r.x, y: o.y + r.y }, c = { x: s.x + r.x, y: s.y + r.y }, a = H(t);
    return Z(e, n, o, s) <= a || Z(e, n, l, c) <= a ? !0 : Kt(e, n, [o, s, c, l]);
  }
};
function Tn(t, e, n, i, o, s, r) {
  let l = 1;
  return n !== 0 && (l = Math.max(l, (0 - t) / n, (o - t) / n)), i !== 0 && (l = Math.max(l, (0 - e) / i, (s - e) / i)), Math.min(l, 1e6 / r);
}
function Fo(t, e) {
  if (!t.points[1] || !t.points[2]) return null;
  const n = w(e, t.points[0]), i = w(e, t.points[1]), o = w(e, t.points[2]), s = { x: (i.x + o.x) / 2, y: (i.y + o.y) / 2 }, r = s.x - n.x, l = s.y - n.y;
  return { a: n, b: i, c: o, mid: s, dx: r, dy: l, len: Math.hypot(r, l) };
}
const tr = {
  id: "pitchfork",
  label: "Pitchfork",
  group: "channels",
  pointsNeeded: 3,
  render(t, e, n, i) {
    const o = w(n, e.points[0]), s = e.points[1];
    if (!s) {
      V(t, o.x, o.y, e.width), i && I(t, e, n);
      return;
    }
    const r = Fo(e, n);
    if (!r) {
      const L = w(n, s);
      v(t, o.x, o.y, L.x, L.y), i && I(t, e, n);
      return;
    }
    const { b: l, c, mid: a, dx: f, dy: h, len: u } = r, { w: p, h: g } = rt(t);
    if (u < 1e-6) {
      v(t, l.x, l.y, c.x, c.y), i && I(t, e, n);
      return;
    }
    const b = Tn(l.x, l.y, f, h, p, g, u), A = Tn(c.x, c.y, f, h, p, g, u), T = Tn(o.x, o.y, f, h, p, g, u), P = { x: l.x + f * b, y: l.y + h * b }, N = { x: c.x + f * A, y: c.y + h * A };
    t.fillStyle = _(t, e.color, zs), t.beginPath(), t.moveTo(l.x, l.y), t.lineTo(P.x, P.y), t.lineTo(N.x, N.y), t.lineTo(c.x, c.y), t.closePath(), t.fill(), t.strokeStyle = _(t, e.color, 0.85), v(t, l.x, l.y, P.x, P.y), v(t, c.x, c.y, N.x, N.y), t.save(), t.setLineDash([4, 4]), t.strokeStyle = _(t, e.color, 0.5), t.lineWidth = 1, v(t, l.x, l.y, c.x, c.y), t.restore(), t.strokeStyle = e.color, v(t, o.x, o.y, o.x + f * T, o.y + h * T), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    const o = Fo(t, i);
    if (!o) return !1;
    const { a: s, b: r, c: l, dx: c, dy: a, len: f } = o, h = H(t);
    if (f < 1e-6) return Z(e, n, r, l) <= h;
    const u = Number.POSITIVE_INFINITY;
    return lt(e, n, s.x, s.y, s.x + c, s.y + a, 0, u) <= h || lt(e, n, r.x, r.y, r.x + c, r.y + a, 0, u) <= h || lt(e, n, l.x, l.y, l.x + c, l.y + a, 0, u) <= h || Z(e, n, r, l) <= h;
  }
}, er = [xs, tr], nr = [0, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144], or = [0, 0.382, 0.618, 1, 1.618, 2.618, 4.236], ir = [0.236, 0.382, 0.5, 0.618, 0.786, 1];
function Xt(t, e) {
  return t.map((n, i) => {
    const o = { ratio: n, visible: !0 };
    return e && e[i] && (o.color = e[i]), o;
  });
}
function sr(t) {
  switch (t) {
    case "fib":
      return Xt(Mn, Pi);
    case "fibext":
      return Xt(ar, Ai);
    case "fibchannel":
    case "fibcircle":
      return Xt(Mn);
    case "fibtimezone":
      return Xt(nr);
    case "fibtimeext":
      return Xt(or);
    case "fibfan":
    case "fibwedge":
      return Xt(ir);
    default:
      return Xt(Mn);
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
  const n = [];
  for (const i of e) {
    if (typeof i != "object" || i === null) continue;
    const o = i;
    if (typeof o.ratio != "number" || !Number.isFinite(o.ratio)) continue;
    const s = { ratio: o.ratio, visible: o.visible !== !1 };
    typeof o.color == "string" && o.color && (s.color = o.color), typeof o.label == "string" && o.label && (s.label = o.label.slice(0, 24)), n.push(s);
  }
  return n.length ? n : null;
}
function et(t, e) {
  var n;
  return rr((n = t.props) == null ? void 0 : n.levels) ?? sr(e);
}
const lr = 0.08, Mn = [0, 0.236, 0.382, 0.5, 0.618, 0.786, 1], Pi = [
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
function _o(t, e) {
  const n = t.points[0], i = t.points[1] ?? n;
  return i.price + (n.price - i.price) * e;
}
function Eo(t, e) {
  const n = t.points[0], i = t.points[1] ?? n;
  return (t.points[2] ?? i).price + (i.price - n.price) * e;
}
function ki(t, e, n, i, o, s, r, l, c) {
  const a = (h) => s[h].color ?? r(h);
  for (let h = 0; h < s.length - 1; h++) {
    if (!s[h].visible || !s[h + 1].visible) continue;
    const u = n.priceToY(l(s[h].ratio)), p = n.priceToY(l(s[h + 1].ratio));
    t.fillStyle = _(t, a(h + 1), lr), t.fillRect(i, Math.min(u, p), o, Math.abs(p - u));
  }
  const f = Math.max(1, e.width);
  t.font = nt, t.textAlign = "left", t.textBaseline = "bottom", t.lineWidth = f;
  for (let h = 0; h < s.length; h++) {
    const u = s[h];
    if (!u.visible) continue;
    const p = l(u.ratio), g = bt(n.priceToY(p), f), b = a(h);
    t.strokeStyle = b, v(t, i, g, i + o, g), t.fillStyle = b, t.fillText(`${u.label ?? u.ratio} — ${Et(p, c)}`, i + 4, g - 2);
  }
}
function Hn(t, e, n, i, o, s) {
  t.save(), t.setLineDash([4, 4]), t.strokeStyle = _(t, e, 0.55), t.lineWidth = 1, v(t, n, i, o, s), t.restore();
}
const cr = {
  id: "fib",
  label: "Fib Retracement",
  group: "fib",
  pointsNeeded: 2,
  render(t, e, n, i, o) {
    const s = w(n, e.points[0]), r = e.points[1] ? w(n, e.points[1]) : s, l = Math.min(s.x, r.x), c = Math.abs(r.x - s.x);
    ki(
      t,
      e,
      n,
      l,
      c,
      et(e, "fib"),
      (a) => Pi[a] ?? e.color,
      (a) => _o(e, a),
      o.pricePrecision
    ), Hn(t, e.color, s.x, s.y, r.x, r.y), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    const o = H(t), s = i.timeToX(t.points[0].time), r = i.timeToX(t.points[1].time);
    if (e < Math.min(s, r) - o || e > Math.max(s, r) + o) return !1;
    for (const l of et(t, "fib"))
      if (l.visible && Math.abs(n - i.priceToY(_o(t, l.ratio))) <= o)
        return !0;
    return !1;
  }
};
function vo(t, e) {
  const n = e.timeToX(t.points[0].time), i = e.timeToX(t.points[1].time), o = e.timeToX(t.points[2].time);
  return { left: o, width: Math.max(Math.abs(i - n), Math.abs(o - i), 60) };
}
const fr = {
  id: "fibext",
  label: "Fib Extension",
  group: "fib",
  pointsNeeded: 3,
  render(t, e, n, i, o) {
    const s = w(n, e.points[0]);
    if (!e.points[1]) {
      V(t, s.x, s.y, e.width), i && I(t, e, n);
      return;
    }
    const r = w(n, e.points[1]);
    if (Hn(t, e.color, s.x, s.y, r.x, r.y), e.points[2]) {
      const l = w(n, e.points[2]);
      Hn(t, e.color, r.x, r.y, l.x, l.y);
      const { left: c, width: a } = vo(e, n);
      ki(
        t,
        e,
        n,
        c,
        a,
        et(e, "fibext"),
        (f) => Ai[f] ?? e.color,
        (f) => Eo(e, f),
        o.pricePrecision
      );
    }
    i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    const o = H(t), { left: s, width: r } = vo(t, i);
    if (e < s - o || e > s + r + o) return !1;
    for (const l of et(t, "fibext"))
      if (l.visible && Math.abs(n - i.priceToY(Eo(t, l.ratio))) <= o)
        return !0;
    return !1;
  }
}, hr = [cr, fr], no = 0.12, ur = {
  id: "rect",
  label: "Rectangle",
  group: "shapes",
  pointsNeeded: 2,
  render(t, e, n, i) {
    const o = w(n, e.points[0]), s = e.points[1] ? w(n, e.points[1]) : o, r = Math.min(o.x, s.x), l = Math.min(o.y, s.y), c = Math.abs(s.x - o.x), a = Math.abs(s.y - o.y);
    t.fillStyle = _(t, e.color, no), t.fillRect(r, l, c, a), t.strokeRect(r, l, c, a), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    return Dt(e, n, w(i, t.points[0]), w(i, t.points[1]), H(t));
  }
}, pr = {
  id: "ellipse",
  label: "Ellipse",
  group: "shapes",
  pointsNeeded: 2,
  render(t, e, n, i) {
    const o = w(n, e.points[0]), s = e.points[1] ? w(n, e.points[1]) : o, r = (o.x + s.x) / 2, l = (o.y + s.y) / 2, c = Math.max(Math.abs(s.x - o.x) / 2, 0.5), a = Math.max(Math.abs(s.y - o.y) / 2, 0.5);
    t.beginPath(), t.ellipse(r, l, c, a, 0, 0, Math.PI * 2), t.fillStyle = _(t, e.color, no), t.fill(), t.stroke(), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    const o = w(i, t.points[0]), s = w(i, t.points[1]), r = (o.x + s.x) / 2, l = (o.y + s.y) / 2, c = Math.max(Math.abs(s.x - o.x) / 2, 1), a = Math.max(Math.abs(s.y - o.y) / 2, 1);
    return Math.hypot((e - r) / c, (n - l) / a) <= 1 + H(t) / Math.min(c, a);
  }
}, mr = {
  id: "triangle",
  label: "Triangle",
  group: "shapes",
  pointsNeeded: 3,
  render(t, e, n, i) {
    const o = yt(e, n);
    o.length === 1 ? V(t, o[0].x, o[0].y, e.width) : o.length === 2 ? v(t, o[0].x, o[0].y, o[1].x, o[1].y) : (t.beginPath(), t.moveTo(o[0].x, o[0].y), t.lineTo(o[1].x, o[1].y), t.lineTo(o[2].x, o[2].y), t.closePath(), t.fillStyle = _(t, e.color, no), t.fill(), t.lineJoin = "round", t.stroke()), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    const o = yt(t, i);
    if (Kt(e, n, o)) return !0;
    const s = H(t);
    return Z(e, n, o[0], o[1]) <= s || Z(e, n, o[1], o[2]) <= s || Z(e, n, o[2], o[0]) <= s;
  }
}, gr = {
  id: "arrow",
  label: "Arrow",
  group: "shapes",
  pointsNeeded: 2,
  render(t, e, n, i) {
    const o = w(n, e.points[0]), s = e.points[1] ? w(n, e.points[1]) : o, r = Math.max(1, e.width), l = 6 + r * 3, c = s.x - o.x, a = s.y - o.y, f = Math.hypot(c, a);
    if (f < 1)
      V(t, o.x, o.y, r);
    else {
      const h = Math.atan2(a, c), u = c / f, p = a / f, g = Math.min(l * 0.7, f);
      t.lineCap = "round", v(t, o.x, o.y, s.x - u * g, s.y - p * g), en(t, s.x, s.y, h, l);
    }
    i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    const o = w(i, t.points[0]), s = w(i, t.points[1]);
    return Z(e, n, o, s) <= Math.max(H(t), 3 + t.width * 1.5);
  }
}, yr = {
  id: "brush",
  label: "Brush",
  group: "shapes",
  pointsNeeded: -1,
  // freehand: the engine streams points while dragging
  render(t, e, n, i) {
    const o = yt(e, n);
    if (o.length !== 0) {
      if (o.length === 1)
        V(t, o[0].x, o[0].y, Math.max(1.5, e.width));
      else {
        t.lineJoin = "round", t.lineCap = "round", t.beginPath(), t.moveTo(o[0].x, o[0].y);
        for (let s = 1; s < o.length; s++) t.lineTo(o[s].x, o[s].y);
        t.stroke();
      }
      i && I(t, e, n, o.length > 1 ? [0, o.length - 1] : [0]);
    }
  },
  hitTest(t, e, n, i) {
    const o = yt(t, i), s = H(t);
    if (o.length === 1) return Math.hypot(e - o[0].x, n - o[0].y) <= s;
    for (let r = 0; r < o.length - 1; r++)
      if (Z(e, n, o[r], o[r + 1]) <= s) return !0;
    return !1;
  },
  handleAt(t, e, n, i) {
    const o = t.points.length > 1 ? [t.points.length - 1, 0] : [0];
    for (const s of o) {
      const r = t.points[s];
      if (Math.abs(e - i.timeToX(r.time)) <= tn && Math.abs(n - i.priceToY(r.price)) <= tn)
        return s;
    }
    return -1;
  }
}, br = [ur, pr, mr, gr, yr], dr = 24, Tr = 3, Vn = 15, Gn = 8, qn = 6, Li = 12, ie = 6.5, Un = 15, Ge = /* @__PURE__ */ new Map();
function Ii(t) {
  var s;
  const e = (t.text ?? "").trim(), n = e.length === 0, i = wi(n ? "Note" : e, dr, Tr), o = typeof ((s = t.props) == null ? void 0 : s.emoji) == "string" ? t.props.emoji.trim() : "";
  return o.length > 0 && (i[0] = `${o} ${i[0]}`), { lines: i, placeholder: n };
}
function Mr(t, e, n) {
  const { lines: i } = Ii(t);
  let o = 0;
  for (const l of i) o = Math.max(o, l.length);
  const s = o * 6.5 + Gn * 2, r = i.length * Vn + qn * 2;
  return { x: e + Li, y: n - Un - r / 2, w: s, h: r };
}
const wr = {
  id: "note",
  label: "Note",
  group: "annotate",
  pointsNeeded: 1,
  defaultProps: { emoji: "" },
  render(t, e, n, i) {
    const o = w(n, e.points[0]), s = o.y - Un;
    t.beginPath(), t.moveTo(o.x, o.y), t.quadraticCurveTo(o.x - ie, o.y - 9, o.x - ie, s), t.arc(o.x, s, ie, Math.PI, 0, !1), t.quadraticCurveTo(o.x + ie, o.y - 9, o.x, o.y), t.closePath(), t.fillStyle = e.color, t.fill(), t.beginPath(), t.arc(o.x, s, 2.4, 0, Math.PI * 2), t.fillStyle = "#ffffff", t.fill();
    const { lines: r, placeholder: l } = Ii(e);
    t.font = di;
    let c = 0;
    for (const p of r) c = Math.max(c, t.measureText(p).width);
    const a = c + Gn * 2, f = r.length * Vn + qn * 2, h = o.x + Li, u = s - f / 2;
    Ge.size > 512 && Ge.clear(), Ge.set(e.id, { x: h, y: u, w: a, h: f }), At(t, h, u, a, f, 6), t.fillStyle = _(t, e.color, 0.14), t.fill(), t.lineWidth = 1, t.strokeStyle = i ? e.color : _(t, e.color, 0.35), t.stroke(), t.fillStyle = l ? _(t, e.color, 0.55) : e.color, t.textAlign = "left", t.textBaseline = "middle";
    for (let p = 0; p < r.length; p++)
      t.fillText(r[p], h + Gn, u + qn + Vn * (p + 0.5));
  },
  hitTest(t, e, n, i) {
    const o = w(i, t.points[0]);
    if (Math.abs(e - o.x) <= ie + 3 && n >= o.y - Un - ie - 3 && n <= o.y + 3)
      return !0;
    const s = Ge.get(t.id) ?? Mr(t, o.x, o.y);
    return e >= s.x - 2 && e <= s.x + s.w + 2 && n >= s.y - 2 && n <= s.y + s.h + 2;
  }
}, Sr = [wr], Pr = 0.08, Ar = 0.35, kr = "#089981", Lr = "#f23645";
function Ni(t) {
  var e;
  return (((e = t.points[1]) == null ? void 0 : e.price) ?? t.points[0].price) >= t.points[0].price ? kr : Lr;
}
function oo(t, e, n, i) {
  const o = Math.min(e.x, n.x), s = Math.min(e.y, n.y), r = Math.abs(n.x - e.x), l = Math.abs(n.y - e.y);
  t.fillStyle = _(t, i, Pr), t.fillRect(o, s, r, l), t.save(), t.setLineDash([4, 4]), t.lineWidth = 1, t.strokeStyle = _(t, i, Ar), t.strokeRect(o, s, r, l), t.restore();
}
function Ci(t) {
  const e = t.points[0].price, n = t.points[1].price;
  if (!(Math.abs(e) > 0)) return null;
  const i = (n - e) / Math.abs(e) * 100;
  return isFinite(i) ? i : null;
}
function Ri(t, e) {
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
  render(t, e, n, i, o) {
    const s = w(n, e.points[0]);
    if (!e.points[1]) {
      V(t, s.x, s.y, e.width), i && I(t, e, n);
      return;
    }
    const r = w(n, e.points[1]), l = Ni(e);
    oo(t, s, r, l);
    const c = (s.x + r.x) / 2;
    t.strokeStyle = l, t.fillStyle = l, t.lineWidth = Math.max(1, e.width), to(t, c, s.y, c, r.y, 7, !0);
    const a = e.points[1].price - e.points[0].price, f = Ci(e), h = Ie(a, o.pricePrecision), u = f === null ? `Δ ${h}` : `Δ ${h}  (${Fe(f)})`;
    kt(t, c, (s.y + r.y) / 2, [u], l), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    return Dt(e, n, w(i, t.points[0]), w(i, t.points[1]), 6);
  }
}, Nr = {
  id: "daterange",
  label: "Date Range",
  group: "measure",
  pointsNeeded: 2,
  render(t, e, n, i, o) {
    const s = w(n, e.points[0]);
    if (!e.points[1]) {
      V(t, s.x, s.y, e.width), i && I(t, e, n);
      return;
    }
    const r = w(n, e.points[1]);
    oo(t, s, r, e.color);
    const l = (s.y + r.y) / 2;
    t.strokeStyle = e.color, t.fillStyle = e.color, t.lineWidth = Math.max(1, e.width), to(t, s.x, l, r.x, l, 7, !1);
    const c = Math.abs(e.points[1].time - e.points[0].time), a = `${jn(Ri(e, o.barMs))} · ${Mi(c)}`;
    kt(t, (s.x + r.x) / 2, l, [a], e.color), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    return Dt(e, n, w(i, t.points[0]), w(i, t.points[1]), 6);
  }
}, Cr = {
  id: "sigmatape",
  label: "Sigma Tape",
  group: "measure",
  pointsNeeded: 2,
  render(t, e, n, i, o) {
    const s = w(n, e.points[0]);
    if (!e.points[1]) {
      V(t, s.x, s.y, e.width), i && I(t, e, n);
      return;
    }
    const r = w(n, e.points[1]), l = Ni(e);
    oo(t, s, r, l), t.strokeStyle = l, t.fillStyle = l, t.lineWidth = Math.max(1, e.width), to(t, s.x, s.y, r.x, r.y, 7, !1);
    const c = Ci(e), a = Ri(e, o.barMs), f = c === null ? jn(a) : `${Fe(c)} · ${jn(a)}`, h = [], u = Hs(o.candles, Math.max(e.points[0].time, e.points[1].time), 14), p = Math.abs(e.points[1].price - e.points[0].price);
    if (u !== null && u > 0 && h.push(`${(p / u).toFixed(1)}× ATR`), c !== null) {
      const b = Vs(o.candles, a, Math.abs(c));
      b !== null && h.push(`${Xs(b)} %ile`);
    }
    const g = h.length > 0 ? [f, h.join(" · ")] : [f];
    kt(t, (s.x + r.x) / 2, (s.y + r.y) / 2, g, l), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    return Dt(e, n, w(i, t.points[0]), w(i, t.points[1]), 6);
  }
}, Rr = [Ir, Nr, Cr], Mt = 6, Vt = 8, de = 7, Fr = '500 11px -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', wn = 17, Wo = 5, _r = 3, Fi = "rgba(24, 28, 38, 0.92)";
function Er(t) {
  const e = t.getTransform(), n = e.a !== 0 ? Math.abs(e.a) : 1, i = e.d !== 0 ? Math.abs(e.d) : 1;
  return { w: t.canvas.width / n, h: t.canvas.height / i };
}
const qe = /* @__PURE__ */ new Map();
function _i(t, e) {
  const n = qe.get(e);
  if (n) return n;
  const i = t.fillStyle;
  t.fillStyle = e;
  const o = t.fillStyle;
  t.fillStyle = i;
  let s = { r: 0, g: 0, b: 0, a: 1 };
  if (typeof o == "string")
    if (o.charAt(0) === "#" && o.length >= 7)
      s = {
        r: parseInt(o.slice(1, 3), 16),
        g: parseInt(o.slice(3, 5), 16),
        b: parseInt(o.slice(5, 7), 16),
        a: 1
      };
    else {
      const r = /rgba?\(([^)]+)\)/.exec(o);
      if (r && r[1]) {
        const l = r[1].split(",").map((c) => parseFloat(c));
        s = { r: l[0] ?? 0, g: l[1] ?? 0, b: l[2] ?? 0, a: l[3] ?? 1 };
      }
    }
  return qe.size > 256 && qe.clear(), qe.set(e, s), s;
}
function Ut(t, e, n) {
  const i = _i(t, e);
  return `rgba(${i.r}, ${i.g}, ${i.b}, ${(i.a * n).toFixed(3)})`;
}
function vr(t, e) {
  const n = _i(t, e);
  return 0.2126 * n.r + 0.7152 * n.g + 0.0722 * n.b > 145 ? "#0f0f0f" : "#ffffff";
}
function Wr(t, e, n, i, o, s) {
  const r = Math.min(s, i / 2, o / 2);
  t.beginPath(), t.moveTo(e + r, n), t.arcTo(e + i, n, e + i, n + o, r), t.arcTo(e + i, n + o, e, n + o, r), t.arcTo(e, n + o, e, n, r), t.arcTo(e, n, e + i, n, r), t.closePath();
}
function ut(t, e) {
  return Math.round(e) % 2 === 1 ? Math.round(t) + 0.5 : Math.round(t);
}
function Gt(t, e, n, i, o) {
  t.beginPath(), t.moveTo(e, n), t.lineTo(i, o), t.stroke();
}
function St(t, e, n, i, o, s = "left") {
  t.font = Fr;
  const r = Math.ceil(t.measureText(i).width) + Wo * 2, l = s === "left" ? e : s === "right" ? e - r : e - r / 2, c = n - wn / 2;
  return Wr(t, l, c, r, wn, _r), t.fillStyle = o, t.fill(), t.fillStyle = vr(t, o), t.textAlign = "left", t.textBaseline = "middle", t.fillText(i, l + Wo, n + 0.5), { x: l, y: c, w: r, h: wn };
}
function le(t, e, n, i) {
  const o = de / 2;
  t.lineWidth = 1, t.fillStyle = "#ffffff", t.fillRect(e - o, n - o, de, de), t.strokeStyle = i, t.strokeRect(e - o, n - o, de, de);
}
function qt(t, e) {
  if (!Number.isFinite(t)) return String(t);
  const n = Math.max(0, Math.min(8, Math.round(e))), i = t < 0, o = Math.abs(t).toFixed(n), s = o.indexOf("."), r = s === -1 ? o : o.slice(0, s), l = s === -1 ? "" : o.slice(s);
  let c = "";
  for (let a = 0; a < r.length; a++)
    a > 0 && (r.length - a) % 3 === 0 && (c += ","), c += r.charAt(a);
  return (i ? "-" : "") + c + l;
}
function Ei(t) {
  if (!Number.isFinite(t)) return String(t);
  const e = t < 0 ? "-" : "";
  let n = Math.abs(t);
  const i = ["", "K", "M", "B", "T"];
  let o = 0;
  for (; n >= 999.95 && o < i.length - 1; )
    n /= 1e3, o++;
  const s = n >= 99.95 ? n.toFixed(0) : n.toFixed(1).replace(/\.0$/, "");
  return e + s + i[o];
}
function Do(t) {
  return Number.isFinite(t) ? `${t >= 0 ? "+" : ""}${t.toFixed(2)}%` : "0.00%";
}
function Yo(t) {
  if (!Number.isFinite(t)) return "0";
  const e = Math.abs(t);
  return e >= 1e3 ? Ei(t) : e >= 100 ? t.toFixed(0) : e >= 10 ? t.toFixed(1) : t.toFixed(2);
}
function nn(t, e, n) {
  const i = t.props ? t.props[e] : void 0;
  return typeof i == "number" && Number.isFinite(i) ? i : n;
}
function on(t, e) {
  let n = 0, i = t.length;
  for (; n < i; ) {
    const o = n + i >> 1;
    t[o].time < e ? n = o + 1 : i = o;
  }
  return n;
}
function vi(t, e) {
  const n = t.length;
  if (n === 0) return -1;
  const i = on(t, e);
  return i <= 0 ? 0 : i >= n ? n - 1 : e - t[i - 1].time <= t[i].time - e ? i - 1 : i;
}
function $o(t, e) {
  return Math.max(t.high - t.low, Math.abs(t.high - e.close), Math.abs(t.low - e.close));
}
function Dr(t, e, n = 14) {
  const i = Math.min(e, t.length - 1);
  if (n < 1 || i < n) return;
  let o = 0;
  for (let s = 1; s <= n; s++) o += $o(t[s], t[s - 1]);
  o /= n;
  for (let s = n + 1; s <= i; s++)
    o = (o * (n - 1) + $o(t[s], t[s - 1])) / n;
  return o;
}
function Yr(t, e, n, i, o, s) {
  const r = o - n, l = s - i, c = r * r + l * l;
  let a = c === 0 ? 0 : ((t - n) * r + (e - i) * l) / c;
  return a = Math.max(0, Math.min(1, a)), Math.hypot(t - (n + a * r), e - (i + a * l));
}
const Ue = "#ef5350", je = "#26a69a", $r = 12, Or = 14, Br = 1.5, Xr = 0.02, Oo = 0.12;
function Bo(t) {
  const e = Math.abs(t) * 1e-5;
  return e > 0 ? e : 1e-8;
}
function Sn(t, e, n) {
  const i = t.points[0], o = t.points[1], s = t.points[2];
  if (!i || !o || !s) return null;
  const r = e.timeToX(i.time);
  let l = e.timeToX(i.time + $r * n.barMs);
  return (!Number.isFinite(l) || l - r < 8) && (l = r + 120), {
    entry: i,
    stop: o,
    target: s,
    x0: r,
    x1: l,
    yEntry: e.priceToY(i.price),
    yStop: e.priceToY(o.price),
    yTarget: e.priceToY(s.price)
  };
}
function Xo(t) {
  const e = t === "long" ? 1 : -1;
  return {
    id: t === "long" ? "longpos" : "shortpos",
    label: t === "long" ? "Long Position" : "Short Position",
    group: "smart",
    pointsNeeded: 1,
    defaultProps: { stake: 1e3, riskR: 2 },
    expandOnCommit(n, i) {
      const o = n.points[0];
      if (!o) return n;
      const s = Math.max(nn(n, "riskR", 2), 0.1), r = on(i.candles, o.time + 1) - 1;
      let l = r >= 0 ? Dr(i.candles, r, Or) : void 0;
      (l === void 0 || !(l > 0)) && (l = Math.max(Math.abs(o.price) * Xr, Bo(o.price)));
      const c = o.price - e * Br * l, a = o.price + e * s * Math.abs(o.price - c);
      return {
        ...n,
        points: [
          { time: o.time, price: o.price },
          { time: o.time, price: c },
          { time: o.time, price: a }
        ]
      };
    },
    render(n, i, o, s, r) {
      const l = i.points[0];
      if (!l) return;
      n.save();
      const c = r.pricePrecision, a = Sn(i, o, r);
      if (!a) {
        const K = o.timeToX(l.time), x = ut(o.priceToY(l.price), 1);
        n.lineWidth = 1, n.strokeStyle = i.color, n.setLineDash([4, 3]), Gt(n, K, x, K + 120, x), n.setLineDash([]), St(n, K + 126, x, `Entry ${qt(l.price, c)}`, i.color, "left"), n.restore();
        return;
      }
      const { x0: f, x1: h, yEntry: u, yStop: p, yTarget: g } = a, b = h - f;
      n.fillStyle = Ut(n, Ue, Oo), n.fillRect(f, Math.min(u, p), b, Math.abs(p - u)), n.fillStyle = Ut(n, je, Oo), n.fillRect(f, Math.min(u, g), b, Math.abs(g - u));
      const A = Math.max(1, i.width);
      n.lineWidth = A, n.strokeStyle = Ue, Gt(n, f, ut(p, A), h, ut(p, A)), n.strokeStyle = je, Gt(n, f, ut(g, A), h, ut(g, A)), n.strokeStyle = i.color, Gt(n, f, ut(u, A), h, ut(u, A));
      const T = l.price !== 0 ? l.price : 1, P = (a.stop.price - l.price) / T * 100, N = (a.target.price - l.price) / T * 100;
      St(n, h + 6, u, `Entry ${qt(l.price, c)}`, i.color, "left"), St(
        n,
        h + 6,
        p,
        `Stop ${qt(a.stop.price, c)} · ${Do(P)}`,
        Ue,
        "left"
      ), St(
        n,
        h + 6,
        g,
        `Target ${qt(a.target.price, c)} · ${Do(N)}`,
        je,
        "left"
      );
      const L = nn(i, "stake", 1e3), D = Math.abs(P), O = Math.abs(N), G = D > 0 ? O / D : 0, U = L * D / 100, j = L * O / 100;
      St(
        n,
        (f + h) / 2,
        u,
        `R:R 1:${G.toFixed(1)} · risk $${Yo(U)} · reward $${Yo(j)}`,
        Fi,
        "center"
      ), s && (le(n, h, u, i.color), le(n, h, p, Ue), le(n, h, g, je)), n.restore();
    },
    hitTest(n, i, o, s, r) {
      const l = Sn(n, s, r);
      if (!l || i < l.x0 - Mt || i > l.x1 + Mt) return !1;
      const c = o >= Math.min(l.yEntry, l.yStop) - Mt && o <= Math.max(l.yEntry, l.yStop) + Mt, a = o >= Math.min(l.yEntry, l.yTarget) - Mt && o <= Math.max(l.yEntry, l.yTarget) + Mt;
      return c || a;
    },
    handleAt(n, i, o, s, r) {
      const l = Sn(n, s, r);
      if (!l) return -1;
      const c = (a, f) => Math.abs(i - a) <= Vt && Math.abs(o - f) <= Vt;
      return c(l.x1, l.yStop) ? 1 : c(l.x1, l.yTarget) ? 2 : c(l.x1, l.yEntry) || i >= l.x0 - Vt && i <= l.x1 + Vt && Math.abs(o - l.yEntry) <= Vt ? 0 : -1;
    },
    moveHandle(n, i, o) {
      const s = n.points[0], r = n.points[1], l = n.points[2];
      if (!s || !r || !l)
        return {
          ...n,
          points: n.points.map((a, f) => f === i ? { time: o.time, price: o.price } : a)
        };
      if (i === 0) {
        const a = o.time - s.time, f = o.price - s.price;
        return { ...n, points: n.points.map((h) => ({ time: h.time + a, price: h.price + f })) };
      }
      const c = Bo(s.price);
      if (i === 1) {
        const a = e === 1 ? Math.min(o.price, s.price - c) : Math.max(o.price, s.price + c);
        return { ...n, points: [s, { time: s.time, price: a }, l] };
      }
      if (i === 2) {
        const a = e === 1 ? Math.max(o.price, s.price + c) : Math.min(o.price, s.price - c);
        return { ...n, points: [s, r, { time: s.time, price: a }] };
      }
      return n;
    }
  };
}
const Hr = [Xo("long"), Xo("short")], Pn = 0.4, Vr = 0.1, Gr = 0.25, Ho = 12, qr = 5, Vo = 3;
function Go(t, e) {
  const n = Math.abs(t) * e / 200;
  return [t - n, t + n];
}
function Ur(t, e, n) {
  let i = 0, o = -1 - Vo;
  for (let s = 0; s < t.length; s++) {
    const r = t[s];
    r.low <= n && r.high >= e && (s - o - 1 >= Vo && i++, o = s);
  }
  return i;
}
const jr = {
  id: "smartlevel",
  label: "Smart Level",
  group: "smart",
  pointsNeeded: 1,
  defaultProps: { heightPct: Pn },
  render(t, e, n, i, o) {
    const s = e.points[0];
    if (!s) return;
    t.save();
    const { w: r } = Er(t), l = Math.max(nn(e, "heightPct", Pn), 1e-4), [c, a] = Go(s.price, l), f = n.priceToY(a), h = n.priceToY(c), u = Math.min(f, h), p = Math.max(Math.abs(h - f), 1), g = Ur(o.candles, c, a), b = Vr + Math.min(g, Ho) / Ho * Gr;
    t.fillStyle = Ut(t, e.color, b), t.fillRect(0, u, r, p), t.lineWidth = 1, t.strokeStyle = Ut(t, e.color, 0.85), Gt(t, 0, ut(u, 1), r, ut(u, 1)), Gt(t, 0, ut(u + p, 1), r, ut(u + p, 1));
    const A = u + p / 2, T = `${g >= qr ? "★ " : ""}${g} ${g === 1 ? "touch" : "touches"}`;
    St(t, 6, A, T, e.color, "left"), St(t, r - 4, A, qt(s.price, o.pricePrecision), e.color, "right"), i && le(t, n.timeToX(s.time), n.priceToY(s.price), e.color), t.restore();
  },
  hitTest(t, e, n, i) {
    const o = t.points[0];
    if (!o) return !1;
    const s = Math.max(nn(t, "heightPct", Pn), 1e-4), [r, l] = Go(o.price, s), c = i.priceToY(l), a = i.priceToY(r);
    return n >= Math.min(c, a) - Mt && n <= Math.max(c, a) + Mt;
  }
}, Nt = 24, Jr = 0.35, Kr = 0.8;
function qo(t, e) {
  const n = t.points[0];
  if (!n) return null;
  const i = t.points[1] ?? n, o = e.timeToX(n.time), s = e.timeToX(i.time), r = e.priceToY(n.price), l = e.priceToY(i.price);
  return {
    left: Math.min(o, s),
    right: Math.max(o, s),
    top: Math.min(r, l),
    bottom: Math.max(r, l),
    tLo: Math.min(n.time, i.time),
    tHi: Math.max(n.time, i.time),
    pLo: Math.min(n.price, i.price),
    pHi: Math.max(n.price, i.price)
  };
}
function An(t) {
  return t < 0 ? 0 : t >= Nt ? Nt - 1 : t;
}
function Uo(t, e, n, i, o) {
  const s = new Float64Array(Nt);
  let r = 0;
  if (t.length > 0 && o > i) {
    const a = (o - i) / Nt, f = on(t, e), h = on(t, n + 1) - 1;
    for (let u = f; u <= h; u++) {
      const p = t[u];
      if (!(p.volume > 0)) continue;
      const g = Math.max(p.low, i), b = Math.min(p.high, o);
      if (b < g) continue;
      const A = p.high - p.low;
      if (A <= 0) {
        const N = An(Math.floor((p.close - i) / a));
        s[N] += p.volume, r += p.volume;
        continue;
      }
      const T = An(Math.floor((g - i) / a)), P = An(Math.ceil((b - i) / a) - 1);
      for (let N = T; N <= P; N++) {
        const L = i + N * a, D = Math.min(b, L + a) - Math.max(g, L);
        if (D > 0) {
          const O = p.volume * (D / A);
          s[N] += O, r += O;
        }
      }
    }
  }
  let l = 0, c = -1;
  for (let a = 0; a < Nt; a++)
    s[a] > l && (l = s[a], c = a);
  return { rows: s, max: l, pocIndex: c, total: r };
}
const Zr = {
  id: "volxray",
  label: "Volume X-Ray",
  group: "smart",
  pointsNeeded: 2,
  render(t, e, n, i, o) {
    const s = qo(e, n);
    if (!s) return;
    t.save();
    const r = s.right - s.left, l = s.bottom - s.top, c = Math.max(1, e.width);
    if (t.lineWidth = c, t.strokeStyle = e.color, t.strokeRect(s.left, s.top, r, l), !e.points[1]) {
      t.restore();
      return;
    }
    const a = Uo(o.candles, s.tLo, s.tHi, s.pLo, s.pHi);
    if (a.max > 0 && s.pHi > s.pLo) {
      const f = (s.pHi - s.pLo) / Nt;
      for (let p = 0; p < Nt; p++) {
        const g = a.rows[p];
        if (g <= 0) continue;
        const b = n.priceToY(s.pLo + (p + 1) * f), A = n.priceToY(s.pLo + p * f), T = Math.min(b, A), P = Math.max(Math.abs(A - b) - 1, 1), N = g / a.max * r;
        t.fillStyle = Ut(t, e.color, p === a.pocIndex ? Kr : Jr), t.fillRect(s.left, T + 0.5, N, P);
      }
      const h = s.pLo + (a.pocIndex + 0.5) * f, u = ut(n.priceToY(h), 1);
      t.lineWidth = 1, t.strokeStyle = e.color, t.setLineDash([4, 3]), Gt(t, s.left, u, s.right, u), t.setLineDash([]), St(t, s.right + 6, u, `POC ${qt(h, o.pricePrecision)}`, e.color, "left");
    }
    if (a.total > 0 && St(t, s.left + 4, s.bottom - 11, `Σ ${Ei(a.total)}`, Fi, "left"), i)
      for (const f of e.points)
        le(t, n.timeToX(f.time), n.priceToY(f.price), e.color);
    t.restore();
  },
  hitTest(t, e, n, i, o) {
    if (!t.points[0] || !t.points[1]) return !1;
    const s = qo(t, i);
    if (!s) return !1;
    const r = Math.max(Mt, t.width / 2 + 3);
    if (!(e >= s.left - r && e <= s.right + r && n >= s.top - r && n <= s.bottom + r)) return !1;
    if (!(e > s.left + r && e < s.right - r && n > s.top + r && n < s.bottom - r)) return !0;
    if (s.pHi <= s.pLo) return !1;
    const a = Uo(o.candles, s.tLo, s.tHi, s.pLo, s.pHi);
    if (a.max <= 0) return !1;
    const f = (s.pHi - s.pLo) / Nt, h = Math.floor((i.yToPrice(n) - s.pLo) / f);
    if (h < 0 || h >= Nt) return !1;
    const u = a.rows[h] / a.max * (s.right - s.left);
    return e <= s.left + u + r;
  }
}, Qr = 0.5, zr = 0.08;
function kn(t, e) {
  const n = vi(t, e);
  if (n < 0) return null;
  const i = t.length - n, o = new Float64Array(i), s = new Float64Array(i);
  let r = 0, l = 0, c = 0, a = 0;
  for (let f = 0; f < i; f++) {
    const h = t[n + f], u = (h.high + h.low + h.close) / 3, p = h.volume > 0 ? h.volume : 0;
    if (r += u * p, l += u * u * p, c += p, a += u, c > 0) {
      const g = r / c;
      o[f] = g, s[f] = Math.sqrt(Math.max(0, l / c - g * g));
    } else
      o[f] = a / (f + 1), s[f] = 0;
  }
  return { start: n, n: i, vwap: o, sd: s };
}
function Ln(t, e, n, i, o) {
  t.beginPath();
  for (let s = 0; s < i.n; s++) {
    const r = e.priceToY(i.vwap[s] + o * i.sd[s]);
    s === 0 ? t.moveTo(n[s], r) : t.lineTo(n[s], r);
  }
  t.stroke();
}
function xr(t, e, n, i) {
  t.strokeStyle = i, t.lineWidth = 1.5, t.beginPath(), t.moveTo(e + 0.5, n - 3), t.lineTo(e + 0.5, n - 16), t.stroke(), t.fillStyle = i, t.beginPath(), t.moveTo(e + 0.5, n - 16), t.lineTo(e + 10, n - 13), t.lineTo(e + 0.5, n - 10), t.closePath(), t.fill(), t.beginPath(), t.arc(e, n, 2.5, 0, Math.PI * 2), t.fill();
}
const tl = {
  id: "avwap",
  label: "Anchored VWAP",
  group: "smart",
  pointsNeeded: 1,
  render(t, e, n, i, o) {
    const s = e.points[0];
    if (!s || o.candles.length === 0) return;
    const r = kn(o.candles, s.time);
    if (!r) return;
    t.save();
    const l = new Float64Array(r.n);
    for (let a = 0; a < r.n; a++) l[a] = n.timeToX(o.candles[r.start + a].time);
    if (r.n > 1) {
      t.beginPath();
      for (let a = 0; a < r.n; a++) {
        const f = n.priceToY(r.vwap[a] + r.sd[a]);
        a === 0 ? t.moveTo(l[a], f) : t.lineTo(l[a], f);
      }
      for (let a = r.n - 1; a >= 0; a--)
        t.lineTo(l[a], n.priceToY(r.vwap[a] - r.sd[a]));
      t.closePath(), t.fillStyle = Ut(t, e.color, zr), t.fill(), t.lineJoin = "round", t.lineCap = "round", t.lineWidth = 1, t.strokeStyle = Ut(t, e.color, Qr), Ln(t, n, l, r, 1), Ln(t, n, l, r, -1), t.lineWidth = Math.max(1, e.width) + 1, t.strokeStyle = e.color, Ln(t, n, l, r, 0);
    } else
      t.fillStyle = e.color, t.beginPath(), t.arc(l[0], n.priceToY(r.vwap[0]), Math.max(1, e.width) + 1, 0, Math.PI * 2), t.fill();
    xr(t, l[0], n.priceToY(r.vwap[0]), e.color);
    const c = n.priceToY(r.vwap[r.n - 1]);
    St(
      t,
      l[r.n - 1] + 8,
      c,
      `AVWAP ${qt(r.vwap[r.n - 1], o.pricePrecision)}`,
      e.color,
      "left"
    ), i && le(t, l[0], n.priceToY(r.vwap[0]), e.color), t.restore();
  },
  hitTest(t, e, n, i, o) {
    const s = t.points[0];
    if (!s || o.candles.length === 0) return !1;
    const r = kn(o.candles, s.time);
    if (!r) return !1;
    const l = o.candles, c = Mt + (Math.max(1, t.width) + 1) / 2, a = i.timeToX(l[r.start].time), f = i.timeToX(l[l.length - 1].time);
    if (e < a - c || e > f + c) return !1;
    if (r.n === 1) return Math.hypot(e - a, n - i.priceToY(r.vwap[0])) <= c;
    let h = vi(l, i.xToTime(e)) - r.start;
    h < 0 && (h = 0), h > r.n - 1 && (h = r.n - 1);
    const u = Math.max(0, h - 2), p = Math.min(r.n - 2, h + 1);
    for (let g = u; g <= p; g++) {
      const b = i.timeToX(l[r.start + g].time), A = i.timeToX(l[r.start + g + 1].time), T = i.priceToY(r.vwap[g]), P = i.priceToY(r.vwap[g + 1]);
      if (Yr(e, n, b, T, A, P) <= c) return !0;
    }
    return !1;
  },
  handleAt(t, e, n, i, o) {
    const s = t.points[0];
    if (!s || o.candles.length === 0) return -1;
    const r = kn(o.candles, s.time);
    if (!r) return -1;
    const l = i.timeToX(o.candles[r.start].time), c = i.priceToY(r.vwap[0]);
    return Math.abs(e - l) <= Vt && Math.abs(n - c) <= Vt ? 0 : -1;
  },
  moveHandle(t, e, n) {
    return e !== 0 ? t : { ...t, points: [{ time: n.time, price: n.price }] };
  }
}, el = [
  ...Hr,
  jr,
  Zr,
  tl
], nl = "#089981", ol = "#f23645", Wi = 0.08, il = 0.06, sl = 0.07, rl = 0.05;
function ll(t, e) {
  const n = t.points[1];
  return !n || !(e > 0) ? 0 : Math.round(Math.abs(n.time - t.points[0].time) / e);
}
function al(t) {
  return t === 1 ? "1 bar" : `${t} bars`;
}
function cl(t, e) {
  if (!(Math.abs(t) > 0)) return null;
  const n = (e - t) / Math.abs(t) * 100;
  return isFinite(n) ? n : null;
}
function Di(t, e) {
  return Math.atan2(-(e.y - t.y), e.x - t.x) * 180 / Math.PI;
}
function io(t, e, n, i, o, s, r = 0.5) {
  t.save(), t.setLineDash([4, 4]), t.strokeStyle = _(t, e, r), t.lineWidth = 1, v(t, n, i, o, s), t.restore();
}
function Qe(t, e, n, i, o, s, r) {
  let l = 1;
  return n !== 0 && (l = Math.max(l, (0 - t) / n, (o - t) / n)), i !== 0 && (l = Math.max(l, (0 - e) / i, (s - e) / i)), Math.min(l, r > 0 ? 1e6 / r : 1);
}
const fl = {
  id: "infoline",
  label: "Info Line",
  group: "lines",
  pointsNeeded: 2,
  render(t, e, n, i, o) {
    const s = w(n, e.points[0]), r = e.points[1];
    if (!r) {
      V(t, s.x, s.y, e.width), i && I(t, e, n);
      return;
    }
    const l = w(n, r), a = r.price >= e.points[0].price ? nl : ol;
    t.strokeStyle = a, t.lineWidth = Math.max(1, e.width), v(t, s.x, s.y, l.x, l.y);
    const f = r.price - e.points[0].price, h = cl(e.points[0].price, r.price), u = ll(e, o.barMs), p = Di(s, l), b = `${h === null ? `Δ ${Ie(f, o.pricePrecision)}` : `Δ ${Ie(f, o.pricePrecision)}  ${Fe(h)}`}  ·  ${al(u)}  ·  ${p.toFixed(0)}°`;
    kt(t, (s.x + l.x) / 2, (s.y + l.y) / 2, [b], a), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    if (!t.points[1]) return !1;
    const o = w(i, t.points[0]), s = w(i, t.points[1]);
    return lt(e, n, o.x, o.y, s.x, s.y, 0, 1) <= H(t);
  }
}, hl = {
  id: "crossline",
  label: "Cross Line",
  group: "lines",
  pointsNeeded: 1,
  render(t, e, n, i, o) {
    const s = w(n, e.points[0]), { w: r, h: l } = rt(t), c = bt(s.x, t.lineWidth), a = bt(s.y, t.lineWidth);
    v(t, 0, a, r, a), v(t, c, 0, c, l);
    const f = Et(e.points[0].price, o.pricePrecision);
    Zo(t, Math.max(2, r - Qo(t, f) - 2), a, f, e.color);
    const h = xn(e.points[0].time, o.barMs), u = Qo(t, h);
    Zo(t, Math.max(2, Math.min(r - u - 2, c - u / 2)), l - 10, h, e.color), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    const o = w(i, t.points[0]), s = H(t);
    return Math.abs(e - o.x) <= s || Math.abs(n - o.y) <= s;
  }
}, ul = {
  id: "trendangle",
  label: "Trend Angle",
  group: "lines",
  pointsNeeded: 2,
  render(t, e, n, i) {
    const o = w(n, e.points[0]), s = e.points[1];
    if (!s) {
      V(t, o.x, o.y, e.width), i && I(t, e, n);
      return;
    }
    const r = w(n, s);
    v(t, o.x, o.y, r.x, r.y);
    const l = r.x >= o.x ? 1 : -1, c = Math.min(34, Math.max(16, Math.hypot(r.x - o.x, r.y - o.y) * 0.45));
    io(t, e.color, o.x, o.y, o.x + l * c, o.y, 0.5);
    const a = Math.atan2(r.y - o.y, r.x - o.x), f = l > 0 ? 0 : Math.PI;
    t.save(), t.beginPath(), t.strokeStyle = _(t, e.color, 0.7), t.lineWidth = 1, t.setLineDash([]);
    const h = l > 0 ? a < f : a > f;
    t.arc(o.x, o.y, c, f, a, h), t.stroke(), t.restore();
    const u = Di(o, r), p = (f + a) / 2, g = o.x + Math.cos(p) * (c + 12), b = o.y + Math.sin(p) * (c + 12);
    kt(t, g, b, [`${u.toFixed(0)}°`], e.color, di), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    if (!t.points[1]) return !1;
    const o = w(i, t.points[0]), s = w(i, t.points[1]);
    return lt(e, n, o.x, o.y, s.x, s.y, 0, 1) <= H(t);
  }
}, pl = {
  id: "channeldisjoint",
  label: "Disjoint Channel",
  group: "channels",
  pointsNeeded: 4,
  render(t, e, n, i) {
    const o = w(n, e.points[0]), s = e.points[1];
    if (!s) {
      V(t, o.x, o.y, e.width), i && I(t, e, n);
      return;
    }
    const r = w(n, s), l = e.points[2], c = e.points[3];
    if (l && c) {
      const a = w(n, l), f = w(n, c);
      t.fillStyle = _(t, e.color, Wi), t.beginPath(), t.moveTo(o.x, o.y), t.lineTo(r.x, r.y), t.lineTo(f.x, f.y), t.lineTo(a.x, a.y), t.closePath(), t.fill(), v(t, a.x, a.y, f.x, f.y);
    } else if (l) {
      const a = w(n, l);
      V(t, a.x, a.y, e.width);
    }
    v(t, o.x, o.y, r.x, r.y), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    if (!t.points[3]) return !1;
    const o = w(i, t.points[0]), s = w(i, t.points[1]), r = w(i, t.points[2]), l = w(i, t.points[3]), c = H(t);
    return Z(e, n, o, s) <= c || Z(e, n, r, l) <= c ? !0 : Kt(e, n, [o, s, l, r]);
  }
}, ml = {
  id: "channelflat",
  label: "Flat Channel",
  group: "channels",
  pointsNeeded: 3,
  render(t, e, n, i) {
    const o = w(n, e.points[0]), s = e.points[1];
    if (!s) {
      V(t, o.x, o.y, e.width), i && I(t, e, n);
      return;
    }
    const r = w(n, s), l = e.points[2];
    if (l) {
      const c = n.priceToY(l.price), a = { x: o.x, y: c }, f = { x: r.x, y: c };
      t.fillStyle = _(t, e.color, Wi), t.beginPath(), t.moveTo(o.x, o.y), t.lineTo(r.x, r.y), t.lineTo(f.x, f.y), t.lineTo(a.x, a.y), t.closePath(), t.fill(), v(t, a.x, a.y, f.x, f.y);
    }
    v(t, o.x, o.y, r.x, r.y), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    if (!t.points[2]) return !1;
    const o = w(i, t.points[0]), s = w(i, t.points[1]), r = i.priceToY(t.points[2].price), l = { x: o.x, y: r }, c = { x: s.x, y: r }, a = H(t);
    return Z(e, n, o, s) <= a || Z(e, n, l, c) <= a ? !0 : Kt(e, n, [o, s, c, l]);
  }
};
function jo(t, e) {
  let n = 0, i = t.length;
  for (; n < i; ) {
    const o = n + i >> 1;
    t[o].time < e ? n = o + 1 : i = o;
  }
  return n;
}
function Jo(t, e) {
  const { candles: n } = e;
  if (n.length < 2 || !t.points[1]) return null;
  const i = Math.min(t.points[0].time, t.points[1].time), o = Math.max(t.points[0].time, t.points[1].time);
  let s = jo(n, i), r = jo(n, o);
  r >= n.length && (r = n.length - 1), s > r && (s = r);
  const l = r - s + 1;
  if (l < 2) return null;
  let c = 0, a = 0, f = 0, h = 0;
  for (let T = s; T <= r; T++) {
    const P = T - s, N = n[T].close;
    c += P, a += N, f += P * P, h += P * N;
  }
  const u = l * f - c * c;
  if (Math.abs(u) < 1e-12) return null;
  const p = (l * h - c * a) / u, g = (a - p * c) / l;
  let b = 0;
  for (let T = s; T <= r; T++) {
    const P = T - s, N = n[T].close - (g + p * P);
    b += N * N;
  }
  const A = Math.sqrt(b / l);
  return { i0: s, i1: r, slope: p, intercept: g, sigma: A };
}
const gl = {
  id: "regression",
  label: "Regression Channel",
  group: "channels",
  pointsNeeded: 2,
  render(t, e, n, i, o) {
    const s = w(n, e.points[0]), r = e.points[1];
    if (!r) {
      V(t, s.x, s.y, e.width), i && I(t, e, n);
      return;
    }
    const l = w(n, r), c = Jo(e, o);
    if (!c) {
      io(t, e.color, s.x, s.y, l.x, l.y, 0.6), i && I(t, e, n);
      return;
    }
    const { candles: a } = o, { i0: f, i1: h, slope: u, intercept: p, sigma: g } = c, b = (x) => p + u * x, A = n.timeToX(a[f].time), T = n.timeToX(a[h].time), P = h - f, N = n.priceToY(b(0)), L = n.priceToY(b(P)), D = 2 * g, O = n.priceToY(b(0) + D), G = n.priceToY(b(P) + D), U = n.priceToY(b(0) - D), j = n.priceToY(b(P) - D);
    t.fillStyle = _(t, e.color, sl), t.beginPath(), t.moveTo(A, O), t.lineTo(T, G), t.lineTo(T, j), t.lineTo(A, U), t.closePath(), t.fill(), t.save(), t.strokeStyle = _(t, e.color, 0.6), t.lineWidth = 1, v(t, A, O, T, G), v(t, A, U, T, j), t.restore(), t.strokeStyle = e.color, t.lineWidth = Math.max(1, e.width), v(t, A, N, T, L);
    const K = `${Ie(u, o.pricePrecision)}/bar`;
    kt(t, T + 4 + yl(t, K), L, [K], e.color, nt), i && I(t, e, n);
  },
  hitTest(t, e, n, i, o) {
    if (!t.points[1]) return !1;
    const s = Jo(t, o);
    if (!s) return !1;
    const { candles: r } = o, { i0: l, i1: c, slope: a, intercept: f, sigma: h } = s, u = (L) => f + a * L, p = i.timeToX(r[l].time), g = i.timeToX(r[c].time), b = c - l, A = H(t);
    if (e < Math.min(p, g) - A || e > Math.max(p, g) + A) return !1;
    const T = [
      { x: p, y: i.priceToY(u(0) + 2 * h) },
      { x: g, y: i.priceToY(u(b) + 2 * h) }
    ], P = [
      { x: p, y: i.priceToY(u(0) - 2 * h) },
      { x: g, y: i.priceToY(u(b) - 2 * h) }
    ], N = [
      { x: p, y: i.priceToY(u(0)) },
      { x: g, y: i.priceToY(u(b)) }
    ];
    return Z(e, n, T[0], T[1]) <= A || Z(e, n, P[0], P[1]) <= A || Z(e, n, N[0], N[1]) <= A ? !0 : Kt(e, n, [T[0], T[1], P[1], P[0]]);
  }
};
function yl(t, e) {
  return t.font = nt, (t.measureText(e).width + 16) / 2;
}
function so(t, e, n, i, o) {
  const { origin: s, b: r, c: l, target: c } = i, a = c.x - s.x, f = c.y - s.y, h = Math.hypot(a, f), { w: u, h: p } = rt(t);
  if (h < 1e-6) {
    v(t, r.x, r.y, l.x, l.y), o && I(t, e, n);
    return;
  }
  const g = Qe(s.x, s.y, a, f, u, p, h), b = Qe(r.x, r.y, a, f, u, p, h), A = Qe(l.x, l.y, a, f, u, p, h), T = { x: r.x + a * b, y: r.y + f * b }, P = { x: l.x + a * A, y: l.y + f * A };
  t.fillStyle = _(t, e.color, il), t.beginPath(), t.moveTo(r.x, r.y), t.lineTo(T.x, T.y), t.lineTo(P.x, P.y), t.lineTo(l.x, l.y), t.closePath(), t.fill(), t.save(), t.strokeStyle = _(t, e.color, 0.85), t.lineWidth = Math.max(1, e.width), v(t, r.x, r.y, T.x, T.y), v(t, l.x, l.y, P.x, P.y), t.restore(), io(t, e.color, r.x, r.y, l.x, l.y, 0.5), t.strokeStyle = e.color, t.lineWidth = Math.max(1, e.width), v(t, s.x, s.y, s.x + a * g, s.y + f * g), o && I(t, e, n);
}
function ro(t, e, n, i, o) {
  const { origin: s, b: r, c: l, target: c } = o, a = c.x - s.x, f = c.y - s.y, h = H(t);
  if (Math.hypot(a, f) < 1e-6) return Z(e, n, r, l) <= h;
  const u = Number.POSITIVE_INFINITY;
  return lt(e, n, s.x, s.y, s.x + a, s.y + f, 0, u) <= h || lt(e, n, r.x, r.y, r.x + a, r.y + f, 0, u) <= h || lt(e, n, l.x, l.y, l.x + a, l.y + f, 0, u) <= h || Z(e, n, r, l) <= h;
}
function Pt(t, e) {
  return { x: (t.x + e.x) / 2, y: (t.y + e.y) / 2 };
}
function Je(t, e, n) {
  return { x: t.x + (e.x - t.x) * n, y: t.y + (e.y - t.y) * n };
}
function he(t, e) {
  return !t.points[1] || !t.points[2] ? null : { a: w(e, t.points[0]), b: w(e, t.points[1]), c: w(e, t.points[2]) };
}
function lo(t, e, n, i) {
  const o = w(n, e.points[0]), s = e.points[1];
  if (!s)
    return V(t, o.x, o.y, e.width), i && I(t, e, n), !0;
  if (!e.points[2]) {
    const r = w(n, s);
    return v(t, o.x, o.y, r.x, r.y), i && I(t, e, n), !0;
  }
  return !1;
}
const bl = {
  id: "pitchforkschiff",
  label: "Schiff Pitchfork",
  group: "channels",
  pointsNeeded: 3,
  render(t, e, n, i) {
    if (lo(t, e, n, i)) return;
    const { a: o, b: s, c: r } = he(e, n);
    so(t, e, n, { origin: Pt(o, s), b: s, c: r, target: Pt(s, r) }, i);
  },
  hitTest(t, e, n, i) {
    const o = he(t, i);
    return o ? ro(t, e, n, i, {
      origin: Pt(o.a, o.b),
      b: o.b,
      c: o.c,
      target: Pt(o.b, o.c)
    }) : !1;
  }
}, dl = {
  id: "pitchforkmod",
  label: "Modified Schiff Pitchfork",
  group: "channels",
  pointsNeeded: 3,
  render(t, e, n, i) {
    if (lo(t, e, n, i)) return;
    const { a: o, b: s, c: r } = he(e, n), l = Pt(s, r);
    so(t, e, n, { origin: Pt(o, l), b: s, c: r, target: l }, i);
  },
  hitTest(t, e, n, i) {
    const o = he(t, i);
    if (!o) return !1;
    const s = Pt(o.b, o.c);
    return ro(t, e, n, i, { origin: Pt(o.a, s), b: o.b, c: o.c, target: s });
  }
}, Tl = {
  id: "pitchforkinside",
  label: "Inside Pitchfork",
  group: "channels",
  pointsNeeded: 3,
  render(t, e, n, i) {
    if (lo(t, e, n, i)) return;
    const { a: o, b: s, c: r } = he(e, n);
    so(
      t,
      e,
      n,
      { origin: o, b: Je(s, r, 0.25), c: Je(s, r, 0.75), target: Pt(s, r) },
      i
    );
  },
  hitTest(t, e, n, i) {
    const o = he(t, i);
    return o ? ro(t, e, n, i, {
      origin: o.a,
      b: Je(o.b, o.c, 0.25),
      c: Je(o.b, o.c, 0.75),
      target: Pt(o.b, o.c)
    }) : !1;
  }
}, In = [
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
  render(t, e, n, i) {
    const o = w(n, e.points[0]), s = e.points[1];
    if (!s) {
      V(t, o.x, o.y, e.width), i && I(t, e, n);
      return;
    }
    const r = w(n, s), { w: l, h: c } = rt(t), a = r.x - o.x, f = r.y - o.y;
    if (Math.abs(a) < 1e-6 && Math.abs(f) < 1e-6) {
      V(t, o.x, o.y, e.width), i && I(t, e, n);
      return;
    }
    t.save(), t.lineWidth = 1, t.font = nt, t.textBaseline = "middle";
    for (let h = 0; h < In.length; h++) {
      const u = In[h], p = a, g = f * u.mult, b = Math.hypot(p, g);
      if (b < 1e-6) continue;
      const A = Qe(o.x, o.y, p, g, l, c, b), T = o.x + p * A, P = o.y + g * A, N = u.mult === 1;
      t.strokeStyle = N ? e.color : _(t, Ko[h], 0.85), v(t, o.x, o.y, T, P);
      const L = Math.min(A, 0.42 * Math.min(l, c) / b), D = o.x + p * L, O = o.y + g * L;
      D > 2 && D < l - 24 && O > 8 && O < c - 8 && (t.fillStyle = _(t, N ? e.color : Ko[h], 0.8), t.textAlign = p >= 0 ? "left" : "right", t.fillText(u.label, D + (p >= 0 ? 3 : -3), O - 6));
    }
    t.restore(), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    if (!t.points[1]) return !1;
    const o = w(i, t.points[0]), s = w(i, t.points[1]), r = s.x - o.x, l = s.y - o.y, c = H(t), a = Number.POSITIVE_INFINITY;
    for (const f of In) {
      const h = r, u = l * f.mult;
      if (!(Math.hypot(h, u) < 1e-6) && lt(e, n, o.x, o.y, o.x + h, o.y + u, 0, a) <= c)
        return !0;
    }
    return !1;
  }
}, wl = [0, 0.25, 0.382, 0.5, 0.618, 0.75, 1], Sl = {
  id: "gannbox",
  label: "Gann Box",
  group: "channels",
  pointsNeeded: 2,
  render(t, e, n, i) {
    const o = w(n, e.points[0]), s = e.points[1];
    if (!s) {
      V(t, o.x, o.y, e.width), i && I(t, e, n);
      return;
    }
    const r = w(n, s), l = Math.min(o.x, r.x), c = Math.max(o.x, r.x), a = Math.min(o.y, r.y), f = Math.max(o.y, r.y), h = c - l, u = f - a;
    t.fillStyle = _(t, e.color, rl), t.fillRect(l, a, h, u), t.save(), t.lineWidth = 1, t.strokeStyle = _(t, e.color, 0.4), t.font = nt, t.fillStyle = _(t, e.color, 0.7), t.textBaseline = "top";
    for (const p of wl) {
      if (p === 0 || p === 1) continue;
      const g = l + h * p, b = a + u * p;
      v(t, g, a, g, f), v(t, l, b, c, b);
    }
    t.strokeStyle = _(t, e.color, 0.55), v(t, l, a, c, f), v(t, l, f, c, a), t.restore(), t.strokeStyle = e.color, t.lineWidth = Math.max(1, e.width), t.strokeRect(l, a, h, u), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    return t.points[1] ? Dt(e, n, w(i, t.points[0]), w(i, t.points[1]), H(t)) : !1;
  }
};
function Zo(t, e, n, i, o) {
  t.font = nt;
  const s = 4, r = t.measureText(i).width + s * 2, l = 15;
  At(t, e, n - l / 2, r, l, 3), t.fillStyle = o, t.fill(), t.fillStyle = Re(t, o), t.textAlign = "left", t.textBaseline = "middle", t.fillText(i, e + s, n + 0.5);
}
function Qo(t, e) {
  return t.font = nt, t.measureText(e).width + 8;
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
], Yi = 0.07, pe = 0.85, Al = 0.55, $i = /* @__PURE__ */ new Set([0.382, 0.5, 0.618]);
function ae(t, e, n, i) {
  t.save(), t.setLineDash([4, 4]), t.strokeStyle = _(t, e, Al), t.lineWidth = 1, v(t, n.x, n.y, i.x, i.y), t.restore();
}
const kl = {
  id: "fibtimezone",
  label: "Fib Time Zone",
  group: "fib",
  pointsNeeded: 2,
  render(t, e, n, i) {
    const o = w(n, e.points[0]);
    if (!e.points[1]) {
      V(t, o.x, o.y, e.width), i && I(t, e, n);
      return;
    }
    const r = e.points[1].time - e.points[0].time, { w: l, h: c } = rt(t), a = Math.max(1, e.width);
    t.lineWidth = a, t.font = nt, t.textAlign = "center", t.textBaseline = "bottom";
    for (const f of et(e, "fibtimezone")) {
      if (!f.visible) continue;
      const h = f.ratio, u = bt(n.timeToX(e.points[0].time + r * h), a);
      if (u < -2 || u > l + 2) continue;
      const p = h === 0 || h === 1;
      t.strokeStyle = _(t, f.color ?? e.color, p ? pe : 0.6), v(t, u, 0, u, c), t.fillStyle = _(t, f.color ?? e.color, 0.95), t.fillText(f.label ?? String(h), u, c - 4);
    }
    i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    if (!t.points[1]) return !1;
    const o = t.points[1].time - t.points[0].time, s = H(t);
    for (const r of et(t, "fibtimezone"))
      if (r.visible && Math.abs(e - i.timeToX(t.points[0].time + o * r.ratio)) <= s)
        return !0;
    return !1;
  }
}, Ll = {
  id: "fibfan",
  label: "Fib Speed Fan",
  group: "fib",
  pointsNeeded: 2,
  render(t, e, n, i) {
    const o = w(n, e.points[0]), s = e.points[1];
    if (!s) {
      V(t, o.x, o.y, e.width), i && I(t, e, n);
      return;
    }
    const r = w(n, s), { w: l, h: c } = rt(t), a = r.x - o.x, f = r.y - o.y;
    t.font = nt, t.textAlign = "left", t.textBaseline = "middle", t.lineWidth = Math.max(1, e.width);
    for (const h of et(e, "fibfan")) {
      if (!h.visible) continue;
      const u = h.ratio, p = o.y + f * u, g = o.x + a, b = an(o.x, o.y, g, p, l, c, !1);
      b && (t.strokeStyle = _(t, h.color ?? e.color, pe), v(t, b[0], b[1], b[2], b[3]), (h.label ?? $i.has(u)) && (t.fillStyle = _(t, h.color ?? e.color, 0.95), t.fillText(h.label ?? String(u), g + 4, p)));
    }
    ae(t, e.color, o, r), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    if (!t.points[1]) return !1;
    const o = w(i, t.points[0]), s = w(i, t.points[1]), r = s.x - o.x, l = s.y - o.y, c = H(t), a = Number.POSITIVE_INFINITY;
    for (const f of et(t, "fibfan")) {
      if (!f.visible) continue;
      const h = o.y + l * f.ratio, u = o.x + r;
      if (Il(e, n, o.x, o.y, u, h, c, a)) return !0;
    }
    return !1;
  }
};
function Il(t, e, n, i, o, s, r, l) {
  const c = o - n, a = s - i, f = c * c + a * a;
  let h = f === 0 ? 0 : ((t - n) * c + (e - i) * a) / f;
  return h = Math.max(0, Math.min(l, h)), Math.hypot(t - (n + h * c), e - (i + h * a)) <= r;
}
function zo(t, e, n) {
  if (Math.abs(e.x - t.x) > 1e-9) {
    const i = (n.x - t.x) / (e.x - t.x), o = t.y + i * (e.y - t.y);
    return { x: 0, y: n.y - o };
  }
  return { x: n.x - t.x, y: 0 };
}
const Nl = {
  id: "fibchannel",
  label: "Fib Channel",
  group: "fib",
  pointsNeeded: 3,
  render(t, e, n, i, o) {
    const s = w(n, e.points[0]), r = e.points[1];
    if (!r) {
      V(t, s.x, s.y, e.width), i && I(t, e, n);
      return;
    }
    const l = w(n, r), c = e.points[2];
    if (!c) {
      v(t, s.x, s.y, l.x, l.y), i && I(t, e, n);
      return;
    }
    const a = zo(s, l, w(n, c)), f = Math.max(1, e.width), h = et(e, "fibchannel");
    for (let u = 0; u < h.length - 1; u++) {
      if (!h[u].visible || !h[u + 1].visible) continue;
      const p = h[u].ratio, g = h[u + 1].ratio;
      t.fillStyle = _(t, h[u + 1].color ?? e.color, Yi), t.beginPath(), t.moveTo(s.x + a.x * p, s.y + a.y * p), t.lineTo(l.x + a.x * p, l.y + a.y * p), t.lineTo(l.x + a.x * g, l.y + a.y * g), t.lineTo(s.x + a.x * g, s.y + a.y * g), t.closePath(), t.fill();
    }
    t.font = nt, t.textAlign = "left", t.textBaseline = "bottom", t.lineWidth = f;
    for (const u of h) {
      if (!u.visible) continue;
      const p = u.ratio, g = { x: s.x + a.x * p, y: s.y + a.y * p }, b = { x: l.x + a.x * p, y: l.y + a.y * p }, A = p === 0 || p === 1;
      t.strokeStyle = _(t, u.color ?? e.color, A ? pe : 0.6), v(t, g.x, g.y, b.x, b.y);
      const T = e.points[0].price + (e.points[2].price - e.points[0].price) * p;
      t.fillStyle = _(t, u.color ?? e.color, 0.95), t.fillText(`${u.label ?? p} — ${Et(T, o.pricePrecision)}`, b.x + 4, b.y - 2);
    }
    i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    if (!t.points[1] || !t.points[2]) return !1;
    const o = w(i, t.points[0]), s = w(i, t.points[1]), r = zo(o, s, w(i, t.points[2])), l = H(t);
    for (const c of et(t, "fibchannel")) {
      if (!c.visible) continue;
      const a = { x: o.x + r.x * c.ratio, y: o.y + r.y * c.ratio }, f = { x: s.x + r.x * c.ratio, y: s.y + r.y * c.ratio };
      if (Cl(e, n, a, f) <= l) return !0;
    }
    return !1;
  }
};
function Cl(t, e, n, i) {
  const o = i.x - n.x, s = i.y - n.y, r = o * o + s * s;
  let l = r === 0 ? 0 : ((t - n.x) * o + (e - n.y) * s) / r;
  return l = Math.max(0, Math.min(1, l)), Math.hypot(t - (n.x + l * o), e - (n.y + l * s));
}
const Rl = {
  id: "fibcircle",
  label: "Fib Circle",
  group: "fib",
  pointsNeeded: 2,
  render(t, e, n, i, o) {
    const s = w(n, e.points[0]), r = e.points[1];
    if (!r) {
      V(t, s.x, s.y, e.width), i && I(t, e, n);
      return;
    }
    const l = w(n, r), c = Math.hypot(l.x - s.x, l.y - s.y), a = Math.max(1, e.width);
    t.lineWidth = a, t.font = nt, t.textAlign = "center", t.textBaseline = "bottom";
    const f = et(e, "fibcircle");
    for (let h = f.length - 1; h >= 0; h--) {
      const u = f[h];
      if (!u.visible || u.ratio <= 0) continue;
      const p = c * u.ratio;
      p < 0.5 || (t.beginPath(), t.ellipse(s.x, s.y, p, p, 0, 0, Math.PI * 2), t.fillStyle = _(t, u.color ?? e.color, Yi), t.fill());
    }
    for (const h of f) {
      if (!h.visible || h.ratio <= 0) continue;
      const u = c * h.ratio;
      u < 0.5 || (t.beginPath(), t.ellipse(s.x, s.y, u, u, 0, 0, Math.PI * 2), t.strokeStyle = _(t, h.color ?? e.color, h.ratio === 1 ? pe : 0.6), t.stroke(), t.fillStyle = _(t, h.color ?? e.color, 0.95), t.fillText(h.label ?? String(h.ratio), s.x, s.y - u - 2));
    }
    ae(t, e.color, s, l), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    if (!t.points[1]) return !1;
    const o = w(i, t.points[0]), s = w(i, t.points[1]), r = Math.hypot(s.x - o.x, s.y - o.y), l = Math.hypot(e - o.x, n - o.y), c = H(t);
    for (const a of et(t, "fibcircle"))
      if (!(!a.visible || a.ratio <= 0) && Math.abs(l - r * a.ratio) <= c)
        return !0;
    return !1;
  }
}, Fl = {
  id: "fibtimeext",
  label: "Fib Time Extension",
  group: "fib",
  pointsNeeded: 3,
  render(t, e, n, i) {
    const o = w(n, e.points[0]), s = e.points[1];
    if (!s) {
      V(t, o.x, o.y, e.width), i && I(t, e, n);
      return;
    }
    const r = w(n, s), l = e.points[2];
    if (!l) {
      ae(t, e.color, o, r), i && I(t, e, n);
      return;
    }
    const c = w(n, l), a = e.points[1].time - e.points[0].time, { w: f, h } = rt(t), u = Math.max(1, e.width);
    ae(t, e.color, o, r), ae(t, e.color, r, c), t.lineWidth = u, t.font = nt, t.textAlign = "center", t.textBaseline = "bottom";
    for (const p of et(e, "fibtimeext")) {
      if (!p.visible) continue;
      const g = p.ratio, b = bt(n.timeToX(e.points[2].time + a * g), u);
      b < -2 || b > f + 2 || (t.strokeStyle = _(t, p.color ?? e.color, g === 0 || g === 1 ? pe : 0.6), v(t, b, 0, b, h), t.fillStyle = _(t, p.color ?? e.color, 0.95), t.fillText(p.label ?? String(g), b, h - 4));
    }
    i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    if (!t.points[1] || !t.points[2]) return !1;
    const o = t.points[1].time - t.points[0].time, s = H(t);
    for (const r of et(t, "fibtimeext"))
      if (r.visible && Math.abs(e - i.timeToX(t.points[2].time + o * r.ratio)) <= s)
        return !0;
    return !1;
  }
}, _l = {
  id: "fibwedge",
  label: "Fib Wedge",
  group: "fib",
  pointsNeeded: 2,
  render(t, e, n, i) {
    const o = w(n, e.points[0]), s = e.points[1];
    if (!s) {
      V(t, o.x, o.y, e.width), i && I(t, e, n);
      return;
    }
    const r = w(n, s), l = Math.hypot(r.x - o.x, r.y - o.y), c = Math.atan2(r.y - o.y, r.x - o.x), a = c - Math.PI / 2, f = c + Math.PI / 2, h = Math.max(1, e.width);
    t.lineWidth = h, t.font = nt, t.textAlign = "center", t.textBaseline = "middle";
    for (const u of et(e, "fibwedge")) {
      if (!u.visible) continue;
      const p = u.ratio, g = l * p;
      if (!(g < 0.5) && (t.beginPath(), t.ellipse(o.x, o.y, g, g, 0, a, f), t.strokeStyle = _(t, u.color ?? e.color, p === 1 ? pe : 0.6), t.stroke(), u.label ?? $i.has(p))) {
        const b = o.x + Math.cos(c) * g, A = o.y + Math.sin(c) * g;
        t.fillStyle = _(t, u.color ?? e.color, 0.95), t.fillText(u.label ?? String(p), b, A);
      }
    }
    ae(t, e.color, o, r), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    if (!t.points[1]) return !1;
    const o = w(i, t.points[0]), s = w(i, t.points[1]), r = Math.hypot(s.x - o.x, s.y - o.y), l = Math.atan2(s.y - o.y, s.x - o.x), c = Math.atan2(n - o.y, e - o.x);
    let a = Math.abs(c - l);
    if (a > Math.PI && (a = Math.PI * 2 - a), a > Math.PI / 2) return !1;
    const f = Math.hypot(e - o.x, n - o.y), h = H(t);
    for (const u of et(t, "fibwedge"))
      if (u.visible && Math.abs(f - r * u.ratio) <= h)
        return !0;
    return !1;
  }
}, El = [
  kl,
  Ll,
  Nl,
  Rl,
  Fl,
  _l
], Oi = 0.08, xo = 14;
function Bi(t, e) {
  if (!(e.length < 2)) {
    t.lineJoin = "round", t.lineCap = "round", t.beginPath(), t.moveTo(e[0].x, e[0].y);
    for (let n = 1; n < e.length; n++) t.lineTo(e[n].x, e[n].y);
    t.stroke();
  }
}
function sn(t, e, n) {
  t.fillStyle = e.color;
  for (const i of n) t.fillRect(i.x - 2.5, i.y - 2.5, 5, 5);
}
function Xi(t, e, n, i, o) {
  t.font = nt;
  const r = t.measureText(i).width + 4 * 2, l = 14;
  At(t, e - r / 2, n - l / 2, r, l, 3), t.fillStyle = o, t.fill(), t.fillStyle = Re(t, o), t.textAlign = "center", t.textBaseline = "middle", t.fillText(i, e, n + 0.5);
}
function vt(t, e, n, i, o) {
  const s = Math.hypot(n.x, n.y) || 1;
  Xi(t, e.x + n.x / s * xo, e.y + n.y / s * xo, i, o);
}
function me(t) {
  let e = 0, n = 0;
  for (const i of t)
    e += i.x, n += i.y;
  return { x: e / t.length, y: n / t.length };
}
function Wt(t, e) {
  const n = t.x - e.x, i = t.y - e.y;
  return Math.hypot(n, i) < 1 ? { x: 0, y: -1 } : { x: n, y: i };
}
function Nn(t, e, n, i, o) {
  t.fillStyle = _(t, o, Oi), t.beginPath(), t.moveTo(e.x, e.y), t.lineTo(n.x, n.y), t.lineTo(i.x, i.y), t.closePath(), t.fill();
}
function Ae(t, e, n, i, o) {
  Xi(t, (e.x + n.x) / 2, (e.y + n.y) / 2, i, o);
}
function wt(t, e, n) {
  const i = t.points[e], o = t.points[n];
  return !i || !o ? 0 : Math.abs(o.price - i.price);
}
function ke(t, e) {
  return e > 1e-12 ? (t / e).toFixed(3) : "—";
}
function Zt(t, e, n, i) {
  if (t.points.length < 2) return !1;
  const o = yt(t, i), s = H(t);
  for (let r = 0; r < o.length - 1; r++)
    if (Z(e, n, o[r], o[r + 1]) <= s) return !0;
  return !1;
}
function _e(t, e, n, i = !0) {
  const o = yt(e, n);
  return o.length === 1 ? (V(t, o[0].x, o[0].y, e.width), o) : (i && Bi(t, o), sn(t, e, o), o);
}
function Hi(t, e, n) {
  var o;
  const i = (o = t.props) == null ? void 0 : o[e];
  return typeof i == "boolean" ? i : n;
}
function Vi(t, e) {
  var i;
  const n = (i = t.props) == null ? void 0 : i[e];
  return typeof n == "string" ? n : "";
}
const vl = {
  id: "abcd",
  label: "ABCD Pattern",
  group: "patterns",
  pointsNeeded: 4,
  render(t, e, n, i) {
    const o = _e(t, e, n), s = ["A", "B", "C", "D"], r = me(o);
    for (let l = 0; l < o.length; l++)
      vt(t, o[l], Wt(o[l], r), s[l], e.color);
    o.length >= 3 && Ae(t, o[1], o[2], ke(wt(e, 1, 2), wt(e, 0, 1)), e.color), o.length >= 4 && Ae(t, o[2], o[3], `CD ${ke(wt(e, 2, 3), wt(e, 0, 1))}`, e.color), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    return t.points.length < 4 ? !1 : Zt(t, e, n, i);
  }
};
function Gi(t, e, n, i, o) {
  const s = yt(e, n);
  if (s.length === 1) {
    V(t, s[0].x, s[0].y, e.width), i && I(t, e, n);
    return;
  }
  s.length >= 4 && Nn(t, s[1], s[2], s[3], e.color), s.length >= 3 && Nn(t, s[0], s[1], s[2], e.color), s.length >= 5 && Nn(t, s[2], s[3], s[4], e.color), Bi(t, s), sn(t, e, s);
  const r = ["X", "A", "B", "C", "D"], l = me(s);
  for (let c = 0; c < s.length; c++)
    vt(t, s[c], Wt(s[c], l), r[c], e.color);
  if (s.length >= 3 && Ae(t, s[1], s[2], ke(wt(e, 1, 2), wt(e, 0, 1)), e.color), s.length >= 4 && Ae(t, s[2], s[3], ke(wt(e, 2, 3), wt(e, 1, 2)), e.color), s.length >= 5) {
    const c = ke(wt(e, 3, 4), wt(e, 2, 3));
    Ae(t, s[3], s[4], o ? `${c} ${o}` : c, e.color);
  }
  i && I(t, e, n);
}
const Wl = {
  id: "xabcd",
  label: "XABCD Pattern",
  group: "patterns",
  pointsNeeded: 5,
  render(t, e, n, i) {
    Gi(t, e, n, i, "");
  },
  hitTest(t, e, n, i) {
    return t.points.length < 5 ? !1 : Zt(t, e, n, i);
  }
}, Dl = {
  id: "cypher",
  label: "Cypher Pattern",
  group: "patterns",
  pointsNeeded: 5,
  render(t, e, n, i) {
    Gi(t, e, n, i, "Cypher 0.786");
  },
  hitTest(t, e, n, i) {
    return t.points.length < 5 ? !1 : Zt(t, e, n, i);
  }
}, Yl = {
  id: "headshoulders",
  label: "Head & Shoulders",
  group: "patterns",
  pointsNeeded: 7,
  render(t, e, n, i) {
    const o = _e(t, e, n);
    if (o.length >= 5) {
      const l = o[2], c = o[4], { w: a, h: f } = rt(t), h = an(l.x, l.y, c.x, c.y, a, f, !0);
      h && (t.save(), t.setLineDash([5, 4]), t.strokeStyle = _(t, e.color, 0.6), t.lineWidth = Math.max(1, e.width), v(t, h[0], h[1], h[2], h[3]), t.restore());
    }
    const s = me(o), r = [
      [1, "LS"],
      [3, "H"],
      [5, "RS"]
    ];
    for (const [l, c] of r) {
      const a = o[l];
      if (a) {
        const f = Wt(a, s);
        vt(t, a, { x: f.x, y: -Math.abs(f.y) - 0.5 }, c, e.color);
      }
    }
    i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    return t.points.length < 7 ? !1 : Zt(t, e, n, i);
  }
}, $l = {
  id: "threedrives",
  label: "Three Drives",
  group: "patterns",
  pointsNeeded: 7,
  render(t, e, n, i) {
    const o = _e(t, e, n), s = me(o), r = {
      1: "1",
      2: "A",
      3: "2",
      4: "B",
      5: "3"
    };
    for (let l = 0; l < o.length; l++) {
      const c = r[l];
      c && vt(t, o[l], Wt(o[l], s), c, e.color);
    }
    i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    return t.points.length < 7 ? !1 : Zt(t, e, n, i);
  }
}, Ol = {
  id: "elliottimpulse",
  label: "Elliott Impulse",
  group: "patterns",
  pointsNeeded: 6,
  defaultProps: { showConnector: !0, waveDegree: "" },
  render(t, e, n, i) {
    const o = _e(t, e, n, Hi(e, "showConnector", !0)), s = me(o);
    for (let l = 1; l < o.length; l++)
      vt(t, o[l], Wt(o[l], s), String(l), e.color);
    const r = Vi(e, "waveDegree");
    r && o.length >= 1 && vt(t, o[0], Wt(o[0], s), r, e.color), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    return t.points.length < 6 ? !1 : Zt(t, e, n, i);
  }
}, Bl = {
  id: "elliottcorrection",
  label: "Elliott Correction",
  group: "patterns",
  pointsNeeded: 4,
  defaultProps: { showConnector: !0, waveDegree: "" },
  render(t, e, n, i) {
    const o = _e(t, e, n, Hi(e, "showConnector", !0)), s = ["", "A", "B", "C"], r = me(o);
    for (let c = 1; c < o.length; c++)
      vt(t, o[c], Wt(o[c], r), s[c], e.color);
    const l = Vi(e, "waveDegree");
    l && o.length >= 1 && vt(t, o[0], Wt(o[0], r), l, e.color), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    return t.points.length < 4 ? !1 : Zt(t, e, n, i);
  }
};
function Xl(t, e, n, i) {
  const o = { x: e.x - t.x, y: e.y - t.y }, s = { x: i.x - n.x, y: i.y - n.y }, r = o.x * s.y - o.y * s.x;
  if (Math.abs(r) < 1e-9) return null;
  const l = ((n.x - t.x) * s.y - (n.y - t.y) * s.x) / r;
  return { x: t.x + l * o.x, y: t.y + l * o.y };
}
const Hl = {
  id: "trianglepattern",
  label: "Triangle Pattern",
  group: "patterns",
  pointsNeeded: 4,
  render(t, e, n, i) {
    const o = yt(e, n);
    if (o.length === 1) {
      V(t, o[0].x, o[0].y, e.width), i && I(t, e, n);
      return;
    }
    if (o.length === 2) {
      v(t, o[0].x, o[0].y, o[1].x, o[1].y), sn(t, e, o), i && I(t, e, n);
      return;
    }
    if (o.length >= 4) {
      const s = Xl(o[0], o[2], o[1], o[3]);
      t.fillStyle = _(t, e.color, Oi), t.beginPath(), t.moveTo(o[0].x, o[0].y), t.lineTo(o[1].x, o[1].y), t.lineTo(o[3].x, o[3].y), t.lineTo(o[2].x, o[2].y), t.closePath(), t.fill(), t.strokeStyle = e.color, t.lineWidth = Math.max(1, e.width);
      const r = s ?? o[2], l = s ?? o[3];
      v(t, o[0].x, o[0].y, r.x, r.y), v(t, o[1].x, o[1].y, l.x, l.y);
    } else
      v(t, o[0].x, o[0].y, o[2].x, o[2].y), v(t, o[0].x, o[0].y, o[1].x, o[1].y);
    sn(t, e, o), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    if (t.points.length < 4) return !1;
    const o = yt(t, i), s = H(t);
    return Z(e, n, o[0], o[2]) <= s || Z(e, n, o[1], o[3]) <= s;
  }
}, Vl = [
  vl,
  Wl,
  Dl,
  Yl,
  $l,
  Ol,
  Bl,
  Hl
], qi = 0.12, Ui = 0.1, cn = 0.4, Gl = 0.45, ql = 0.12;
function ti(t, e) {
  const n = t.points[0], i = t.points[1], o = t.points[2];
  if (!n || !i || !o) return null;
  const s = w(e, n), r = w(e, i), l = w(e, o), c = r.x - s.x, a = r.y - s.y, f = Math.hypot(c, a);
  if (f < 1e-6) return null;
  const h = -a / f, u = c / f, p = (l.x - s.x) * h + (l.y - s.y) * u, g = h * p, b = u * p;
  return [
    s,
    r,
    { x: r.x + g, y: r.y + b },
    { x: s.x + g, y: s.y + b }
  ];
}
function ei(t, e) {
  let n = 0, i = t.length;
  for (; n < i; ) {
    const o = n + i >> 1;
    t[o].time < e ? n = o + 1 : i = o;
  }
  return n;
}
function ji(t, e, n, i, o, s, r, l, c) {
  const a = l.priceToY(i), f = l.priceToY(o), h = l.priceToY(s), u = l.priceToY(r);
  t.strokeStyle = _(t, c, Gl), t.lineWidth = 1, v(t, e, f, e, h);
  const p = Math.min(a, u), g = Math.max(a, u), b = Math.max(g - p, 1);
  t.fillStyle = _(t, c, ql), t.fillRect(e - n, p, n * 2, b), t.strokeRect(e - n, p, n * 2, b);
}
const Ul = {
  id: "rotrect",
  label: "Rotated Rectangle",
  group: "shapes",
  pointsNeeded: 3,
  render(t, e, n, i) {
    const o = w(n, e.points[0]), s = e.points[1];
    if (!s) {
      V(t, o.x, o.y, e.width), i && I(t, e, n);
      return;
    }
    const r = w(n, s);
    if (!e.points[2]) {
      v(t, o.x, o.y, r.x, r.y), i && I(t, e, n);
      return;
    }
    const l = ti(e, n);
    if (!l) {
      v(t, o.x, o.y, r.x, r.y), i && I(t, e, n);
      return;
    }
    t.beginPath(), t.moveTo(l[0].x, l[0].y);
    for (let c = 1; c < l.length; c++) t.lineTo(l[c].x, l[c].y);
    t.closePath(), t.fillStyle = _(t, e.color, qi), t.fill(), t.lineJoin = "round", t.stroke(), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    const o = ti(t, i);
    if (!o) return !1;
    if (Kt(e, n, o)) return !0;
    const s = H(t);
    for (let r = 0; r < o.length; r++)
      if (Z(e, n, o[r], o[(r + 1) % o.length]) <= s) return !0;
    return !1;
  }
}, jl = {
  id: "circle",
  label: "Circle",
  group: "shapes",
  pointsNeeded: 2,
  render(t, e, n, i) {
    const o = w(n, e.points[0]), s = e.points[1];
    if (!s) {
      V(t, o.x, o.y, e.width), i && I(t, e, n);
      return;
    }
    const r = w(n, s), l = Math.max(Math.hypot(r.x - o.x, r.y - o.y), 0.5);
    t.beginPath(), t.arc(o.x, o.y, l, 0, Math.PI * 2), t.fillStyle = _(t, e.color, qi), t.fill(), t.stroke(), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    if (!t.points[1]) return !1;
    const o = w(i, t.points[0]), s = w(i, t.points[1]), r = Math.hypot(s.x - o.x, s.y - o.y);
    return Math.hypot(e - o.x, n - o.y) <= r + H(t);
  }
}, Jl = {
  id: "arc",
  label: "Arc",
  group: "shapes",
  pointsNeeded: 3,
  render(t, e, n, i) {
    const o = e.points[0], s = e.points[1], r = e.points[2], l = w(n, o);
    if (!s) {
      V(t, l.x, l.y, e.width), i && I(t, e, n);
      return;
    }
    const c = w(n, s);
    if (!r) {
      v(t, c.x, c.y, l.x, l.y), i && I(t, e, n);
      return;
    }
    const a = w(n, r), f = Math.max(Math.hypot(l.x - c.x, l.y - c.y), 0.5), h = Math.atan2(l.y - c.y, l.x - c.x), u = Math.atan2(a.y - c.y, a.x - c.x);
    t.beginPath(), t.arc(c.x, c.y, f, h, u), t.lineCap = "round", t.stroke(), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    if (!t.points[2]) return !1;
    const o = w(i, t.points[1]), s = w(i, t.points[0]), r = w(i, t.points[2]), l = Math.hypot(s.x - o.x, s.y - o.y);
    if (Math.abs(Math.hypot(e - o.x, n - o.y) - l) > H(t)) return !1;
    let a = Math.atan2(s.y - o.y, s.x - o.x), f = Math.atan2(r.y - o.y, r.x - o.x), h = Math.atan2(n - o.y, e - o.x);
    const u = (b) => b < 0 ? b + Math.PI * 2 : b;
    a = u(a), f = u(f), h = u(h);
    const p = u(f - a);
    return u(h - a) <= p;
  }
}, Kl = {
  id: "curve",
  label: "Curve",
  group: "shapes",
  pointsNeeded: 3,
  render(t, e, n, i) {
    const o = w(n, e.points[0]), s = e.points[1];
    if (!s) {
      V(t, o.x, o.y, e.width), i && I(t, e, n);
      return;
    }
    const r = w(n, s), l = e.points[2];
    if (!l) {
      v(t, o.x, o.y, r.x, r.y), i && I(t, e, n);
      return;
    }
    const c = w(n, l);
    t.beginPath(), t.moveTo(o.x, o.y), t.quadraticCurveTo(r.x, r.y, c.x, c.y), t.lineCap = "round", t.stroke(), i && (t.save(), t.setLineDash([3, 3]), t.lineWidth = 1, t.strokeStyle = _(t, e.color, 0.5), v(t, o.x, o.y, r.x, r.y), v(t, c.x, c.y, r.x, r.y), t.restore(), I(t, e, n));
  },
  hitTest(t, e, n, i) {
    if (!t.points[2]) return !1;
    const o = w(i, t.points[0]), s = w(i, t.points[1]), r = w(i, t.points[2]), l = H(t), c = 24;
    let a = o.x, f = o.y;
    for (let h = 1; h <= c; h++) {
      const u = h / c, p = 1 - u, g = p * p * o.x + 2 * p * u * s.x + u * u * r.x, b = p * p * o.y + 2 * p * u * s.y + u * u * r.y;
      if (Z(e, n, { x: a, y: f }, { x: g, y: b }) <= l) return !0;
      a = g, f = b;
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
  render(t, e, n, i) {
    const o = yt(e, n);
    if (o.length !== 0) {
      if (o.length === 1)
        V(t, o[0].x, o[0].y, e.width);
      else {
        t.lineJoin = "round", t.lineCap = "round", t.beginPath(), t.moveTo(o[0].x, o[0].y);
        for (let s = 1; s < o.length; s++) t.lineTo(o[s].x, o[s].y);
        t.stroke();
      }
      i && I(t, e, n);
    }
  },
  hitTest(t, e, n, i) {
    if (t.points.length < 4) return !1;
    const o = yt(t, i), s = H(t);
    for (let r = 0; r < o.length - 1; r++)
      if (Z(e, n, o[r], o[r + 1]) <= s) return !0;
    return !1;
  }
};
function Ji(t) {
  const e = t.points[0].price, n = t.points[1].price;
  if (!(Math.abs(e) > 0)) return null;
  const i = (n - e) / Math.abs(e) * 100;
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
  render(t, e, n, i, o) {
    const s = w(n, e.points[0]);
    if (!e.points[1]) {
      V(t, s.x, s.y, e.width), i && I(t, e, n);
      return;
    }
    const r = w(n, e.points[1]), l = e.points[1].price - e.points[0].price, c = e.points[1].price + Math.abs(l) * 0.25, a = e.points[1].price - Math.abs(l) * 0.25, f = n.priceToY(c), h = n.priceToY(a);
    t.beginPath(), t.moveTo(s.x, s.y), t.lineTo(r.x, f), t.lineTo(r.x, h), t.closePath(), t.fillStyle = _(t, e.color, Ui), t.fill(), t.save(), t.setLineDash([2, 3]), t.lineWidth = 1, t.strokeStyle = _(t, e.color, cn), v(t, s.x, s.y, r.x, f), v(t, s.x, s.y, r.x, h), t.restore(), t.save(), t.setLineDash([5, 4]), t.lineWidth = Math.max(1, e.width), t.strokeStyle = e.color, v(t, s.x, s.y, r.x, r.y), t.restore();
    const u = Ji(e), p = Ki(e, o.barMs), g = u === null ? `${p} bars` : `${Fe(u)} · ${p} bars`;
    kt(t, r.x, r.y, [g], e.color), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    if (!t.points[1]) return !1;
    const o = w(i, t.points[0]), s = w(i, t.points[1]), r = t.points[1].price - t.points[0].price, l = i.priceToY(t.points[1].price + Math.abs(r) * 0.25), c = i.priceToY(t.points[1].price - Math.abs(r) * 0.25), a = [o, { x: s.x, y: l }, { x: s.x, y: c }];
    return Kt(e, n, a) ? !0 : Z(e, n, o, s) <= H(t);
  }
}, zl = {
  id: "barspattern",
  label: "Bars Pattern",
  group: "projection",
  pointsNeeded: 2,
  render(t, e, n, i, o) {
    const s = w(n, e.points[0]);
    if (!e.points[1]) {
      V(t, s.x, s.y, e.width), i && I(t, e, n);
      return;
    }
    const r = w(n, e.points[1]), l = o.candles;
    if (t.save(), t.setLineDash([4, 4]), t.lineWidth = 1, t.strokeStyle = _(t, e.color, cn), t.strokeRect(
      Math.min(s.x, r.x),
      Math.min(s.y, r.y),
      Math.abs(r.x - s.x),
      Math.abs(r.y - s.y)
    ), t.restore(), l.length > 0 && o.barMs > 0) {
      const c = Math.min(e.points[0].time, e.points[1].time), a = Math.max(e.points[0].time, e.points[1].time), f = ei(l, c), h = ei(l, a + 1), u = l.slice(f, h);
      if (u.length > 0) {
        const p = l[l.length - 1], g = p.time + o.barMs, b = p.close - u[0].open, A = n.timeToX(g), T = n.timeToX(g + o.barMs), P = Math.max(1, Math.abs(T - A) * 0.32);
        for (let N = 0; N < u.length; N++) {
          const L = u[N], D = n.timeToX(g + N * o.barMs);
          ji(
            t,
            D,
            P,
            L.open + b,
            L.high + b,
            L.low + b,
            L.close + b,
            n,
            e.color
          );
        }
        kt(
          t,
          n.timeToX(g + (u.length - 1) * o.barMs),
          n.priceToY(u[u.length - 1].close + b),
          [`${u.length} bars →`],
          e.color
        );
      }
    }
    i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    return t.points[1] ? Dt(e, n, w(i, t.points[0]), w(i, t.points[1]), H(t)) : !1;
  }
}, xl = {
  id: "ghostfeed",
  label: "Ghost Feed",
  group: "projection",
  pointsNeeded: 2,
  render(t, e, n, i, o) {
    const s = w(n, e.points[0]);
    if (!e.points[1]) {
      V(t, s.x, s.y, e.width), i && I(t, e, n);
      return;
    }
    const r = w(n, e.points[1]);
    t.save(), t.setLineDash([2, 3]), t.lineWidth = 1, t.strokeStyle = _(t, e.color, cn), v(t, s.x, s.y, r.x, r.y), t.restore();
    const l = o.barMs;
    if (l > 0) {
      const c = e.points[0].time, a = e.points[1].time, f = e.points[0].price, h = e.points[1].price, u = Math.max(1, Math.round(Math.abs(a - c) / l)), p = a >= c ? 1 : -1, g = n.timeToX(c), b = n.timeToX(c + p * l), A = Math.max(1, Math.abs(b - g) * 0.32);
      let T = f;
      for (let P = 1; P <= u; P++) {
        const N = P / u, L = f + (h - f) * N, D = T, G = Math.abs(L - D) * 0.6 + Math.abs(h - f) / u / 4, U = (P % 2 === 0 ? 1 : -1) * G, j = Math.max(D, L) + Math.abs(U) * 0.5 + G * 0.3, K = Math.min(D, L) - Math.abs(U) * 0.5 - G * 0.3, x = n.timeToX(c + p * P * l);
        ji(t, x, A, D, j, K, L, n, e.color), T = L;
      }
      kt(t, r.x, r.y, [`ghost ×${u}`], e.color);
    }
    i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    return t.points[1] ? Dt(e, n, w(i, t.points[0]), w(i, t.points[1]), H(t)) : !1;
  }
}, ta = {
  id: "dprange",
  label: "Date & Price Range",
  group: "projection",
  pointsNeeded: 2,
  render(t, e, n, i, o) {
    const s = w(n, e.points[0]);
    if (!e.points[1]) {
      V(t, s.x, s.y, e.width), i && I(t, e, n);
      return;
    }
    const r = w(n, e.points[1]), l = Math.min(s.x, r.x), c = Math.min(s.y, r.y), a = Math.abs(r.x - s.x), f = Math.abs(r.y - s.y);
    t.fillStyle = _(t, e.color, Ui), t.fillRect(l, c, a, f), t.save(), t.setLineDash([4, 4]), t.lineWidth = 1, t.strokeStyle = _(t, e.color, cn), t.strokeRect(l, c, a, f), t.restore();
    const h = e.points[1].price - e.points[0].price, u = Ji(e), p = Ki(e, o.barMs), g = Math.abs(e.points[1].time - e.points[0].time), b = Ie(h, o.pricePrecision), A = u === null ? "" : ` (${Fe(u)})`, T = p === 1 ? "1 bar" : `${p} bars`, P = `Δ ${b}${A} · ${T} · ${Mi(g)}`;
    kt(t, (s.x + r.x) / 2, (s.y + r.y) / 2, [P], e.color), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    return t.points[1] ? Dt(e, n, w(i, t.points[0]), w(i, t.points[1]), H(t)) : !1;
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
const _t = /* @__PURE__ */ new Map();
function Ee(t, e) {
  return _t.size > 512 && _t.clear(), _t.set(t, e), e;
}
function jt(t, e) {
  var r;
  const n = (t.text ?? "").trim(), i = n.length === 0, o = wi(i ? e : n, na, oa), s = typeof ((r = t.props) == null ? void 0 : r.emoji) == "string" ? t.props.emoji.trim() : "";
  return s.length > 0 && o.length > 0 && (o[0] = `${s} ${o[0]}`), { lines: o, isPlaceholder: i };
}
function fo(t, e) {
  t.font = fe;
  let n = 0;
  for (const i of e) n = Math.max(n, t.measureText(i).width);
  return { w: n + ao * 2, h: e.length * ce + co * 2 };
}
function ho(t) {
  let e = 0;
  for (const n of t) e = Math.max(e, n.length);
  return { w: e * 7 + ao * 2, h: t.length * ce + co * 2 };
}
function uo(t, e, n, i, o, s) {
  t.font = fe, t.fillStyle = s ? _(t, o, 0.55) : o, t.textAlign = "left", t.textBaseline = "middle";
  for (let r = 0; r < e.length; r++)
    t.fillText(e[r], n + ao, i + co + ce * (r + 0.5));
}
function ue(t, e, n, i) {
  return t >= n.x - i && t <= n.x + n.w + i && e >= n.y - i && e <= n.y + n.h + i;
}
const aa = {
  id: "text",
  label: "Text",
  group: "annotate",
  pointsNeeded: 1,
  defaultProps: { emoji: "" },
  render(t, e, n, i) {
    const o = w(n, e.points[0]), { lines: s, isPlaceholder: r } = jt(e, "Text"), { w: l, h: c } = fo(t, s), a = o.x, f = o.y, h = Ee(e.id, { x: a, y: f, w: l, h: c });
    At(t, h.x, h.y, h.w, h.h, 4), t.fillStyle = _(t, e.color, 0.08), t.fill(), i && (t.lineWidth = 1, t.strokeStyle = _(t, e.color, 0.6), t.stroke()), uo(t, s, h.x, h.y, e.color, r), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    const o = w(i, t.points[0]), s = _t.get(t.id);
    if (s) return ue(e, n, s, 2);
    const { lines: r } = jt(t, "Text"), { w: l, h: c } = ho(r);
    return ue(e, n, { x: o.x, y: o.y, w: l, h: c }, 2);
  }
}, ca = {
  id: "callout",
  label: "Callout",
  group: "annotate",
  pointsNeeded: 2,
  defaultProps: { emoji: "" },
  render(t, e, n, i) {
    const o = w(n, e.points[0]);
    if (!e.points[1]) {
      t.fillStyle = e.color, t.beginPath(), t.arc(o.x, o.y, Math.max(2, e.width + 1), 0, Math.PI * 2), t.fill(), i && I(t, e, n);
      return;
    }
    const s = w(n, e.points[1]), { lines: r, isPlaceholder: l } = jt(e, "Callout"), { w: c, h: a } = fo(t, r), f = s.x - c / 2, h = s.y - a / 2, u = Ee(e.id, { x: f, y: h, w: c, h: a }), p = ni(u, o.x, o.y);
    t.lineWidth = Math.max(1, e.width), t.strokeStyle = e.color, t.fillStyle = e.color;
    const g = Math.hypot(o.x - p.x, o.y - p.y);
    if (g > 1) {
      const b = Math.atan2(o.y - p.y, o.x - p.x), A = 7, T = (o.x - p.x) / g, P = (o.y - p.y) / g;
      v(t, p.x, p.y, o.x - T * Math.min(A * 0.7, g), o.y - P * Math.min(A * 0.7, g)), en(t, o.x, o.y, b, A);
    }
    At(t, u.x, u.y, u.w, u.h, 6), t.fillStyle = _(t, e.color, 0.14), t.fill(), t.lineWidth = 1, t.strokeStyle = i ? e.color : _(t, e.color, 0.5), t.stroke(), uo(t, r, u.x, u.y, e.color, l), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    const o = w(i, t.points[0]), s = w(i, t.points[1]);
    let r = _t.get(t.id);
    if (!r) {
      const { lines: c } = jt(t, "Callout"), { w: a, h: f } = ho(c);
      r = { x: s.x - a / 2, y: s.y - f / 2, w: a, h: f };
    }
    if (ue(e, n, r, 2)) return !0;
    const l = ni(r, o.x, o.y);
    return fa(e, n, l, o) <= Math.max(6, t.width / 2 + 3);
  }
};
function ni(t, e, n) {
  const i = t.x + t.w / 2, o = t.y + t.h / 2, s = e - i, r = n - o;
  if (s === 0 && r === 0) return { x: i, y: o };
  const l = t.w / 2, c = t.h / 2, a = s !== 0 ? l / Math.abs(s) : 1 / 0, f = r !== 0 ? c / Math.abs(r) : 1 / 0, h = Math.min(a, f);
  return { x: i + s * h, y: o + r * h };
}
function fa(t, e, n, i) {
  const o = i.x - n.x, s = i.y - n.y, r = o * o + s * s;
  let l = r === 0 ? 0 : ((t - n.x) * o + (e - n.y) * s) / r;
  return l = Math.max(0, Math.min(1, l)), Math.hypot(t - (n.x + l * o), e - (n.y + l * s));
}
const Te = 9, oi = 12, ha = {
  id: "comment",
  label: "Comment",
  group: "annotate",
  pointsNeeded: 1,
  defaultProps: { emoji: "" },
  render(t, e, n, i) {
    const o = w(n, e.points[0]), { lines: s, isPlaceholder: r } = jt(e, "Comment"), { w: l, h: c } = fo(t, s), a = o.x - l / 2, f = o.y - oi - c, h = Ee(e.id, { x: a, y: f, w: l, h: c });
    At(t, h.x, h.y, h.w, h.h, 7), t.fillStyle = _(t, e.color, 0.14), t.fill(), t.lineWidth = 1, t.strokeStyle = i ? e.color : _(t, e.color, 0.5), t.stroke();
    const u = Math.min(Math.max(o.x, h.x + 8), h.x + h.w - 8);
    t.beginPath(), t.moveTo(u - Te / 2, h.y + h.h - 0.5), t.lineTo(u + Te / 2, h.y + h.h - 0.5), t.lineTo(o.x, o.y), t.closePath(), t.fillStyle = _(t, e.color, 0.14), t.fill(), t.strokeStyle = i ? e.color : _(t, e.color, 0.5), t.beginPath(), t.moveTo(u - Te / 2, h.y + h.h - 0.5), t.lineTo(o.x, o.y), t.lineTo(u + Te / 2, h.y + h.h - 0.5), t.stroke(), uo(t, s, h.x, h.y, e.color, r), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    const o = w(i, t.points[0]);
    let s = _t.get(t.id);
    if (!s) {
      const { lines: r } = jt(t, "Comment"), { w: l, h: c } = ho(r);
      s = { x: o.x - l / 2, y: o.y - oi - c, w: l, h: c };
    }
    return ue(e, n, s, 2) ? !0 : Math.abs(e - o.x) <= Te && n >= s.y + s.h - 2 && n <= o.y + 2;
  }
}, Ht = 14, ua = {
  id: "pricelabel",
  label: "Price Label",
  group: "annotate",
  pointsNeeded: 1,
  render(t, e, n, i, o) {
    const s = w(n, e.points[0]), r = bt(s.y, t.lineWidth), l = Et(e.points[0].price, o.pricePrecision);
    t.lineWidth = Math.max(1, e.width), t.strokeStyle = e.color, v(t, s.x - Ht / 2, r, s.x + Ht / 2, r), t.font = fe;
    const c = 6, a = t.measureText(l).width + c * 2, f = 18, h = s.x + Ht / 2 + 4, u = r - f / 2;
    Ee(e.id, { x: s.x - Ht / 2, y: u, w: Ht / 2 + 4 + a, h: f }), At(t, h, u, a, f, 3), t.fillStyle = e.color, t.fill(), t.fillStyle = Re(t, e.color), t.textAlign = "left", t.textBaseline = "middle", t.fillText(l, h + c, r + 0.5), i && I(t, e, n);
  },
  hitTest(t, e, n, i, o) {
    const s = w(i, t.points[0]), r = _t.get(t.id);
    if (r) return ue(e, n, r, 2);
    const l = Et(t.points[0].price, o.pricePrecision).length * 7 + 12 + Ht;
    return e >= s.x - Ht / 2 - 2 && e <= s.x + l && Math.abs(n - s.y) <= 11;
  }
}, Cn = 8, Rn = 5, pa = {
  id: "signpost",
  label: "Signpost",
  group: "annotate",
  pointsNeeded: 1,
  defaultProps: { emoji: "" },
  render(t, e, n, i, o) {
    const s = w(n, e.points[0]), { h: r } = rt(t), l = bt(s.x, t.lineWidth);
    t.lineWidth = Math.max(1, e.width), t.strokeStyle = e.color, v(t, l, r, l, s.y);
    const { lines: c, isPlaceholder: a } = jt(e, "Signpost"), f = xn(e.points[0].time, o.barMs);
    t.font = fe;
    let h = t.measureText(f).width;
    for (const P of c) h = Math.max(h, t.measureText(P).width);
    const u = h + Cn * 2, g = (c.length + 1) * ce + Rn * 2, b = l, A = s.y - g, T = Ee(e.id, { x: b, y: A, w: u, h: g });
    At(t, T.x, T.y, T.w, T.h, 4), t.fillStyle = _(t, e.color, 0.16), t.fill(), t.lineWidth = 1, t.strokeStyle = i ? e.color : _(t, e.color, 0.55), t.stroke(), t.font = fe, t.textAlign = "left", t.textBaseline = "middle";
    for (let P = 0; P < c.length; P++)
      t.fillStyle = a ? _(t, e.color, 0.55) : e.color, t.fillText(c[P], T.x + Cn, T.y + Rn + ce * (P + 0.5));
    t.fillStyle = _(t, e.color, 0.7), t.fillText(f, T.x + Cn, T.y + Rn + ce * (c.length + 0.5)), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    const o = w(i, t.points[0]), s = _t.get(t.id);
    return s && ue(e, n, s, 2) ? !0 : Math.abs(e - o.x) <= Math.max(6, t.width / 2 + 3) && n >= o.y - 2;
  }
}, Ne = 13;
function Zi(t, e) {
  return la(t.color) ? e ? ia : sa : t.color;
}
function Qi(t, e, n, i, o) {
  const s = Ne, r = i ? 1 : -1, l = s * 0.62, c = s * 0.26, a = n, f = n + r * s * 0.7, h = n + r * s * 1.6;
  t.beginPath(), t.moveTo(e, a), t.lineTo(e - l, f), t.lineTo(e - c, f), t.lineTo(e - c, h), t.lineTo(e + c, h), t.lineTo(e + c, f), t.lineTo(e + l, f), t.closePath(), t.fillStyle = o, t.fill(), t.lineWidth = 1, t.lineJoin = "round", t.strokeStyle = _(t, o, 0.9), t.stroke();
}
const ma = {
  id: "arrowup",
  label: "Arrow Up",
  group: "annotate",
  pointsNeeded: 1,
  render(t, e, n, i) {
    const o = w(n, e.points[0]);
    Qi(t, o.x, o.y, !0, Zi(e, !0)), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    const o = w(i, t.points[0]);
    return Math.abs(e - o.x) <= Ne * 0.7 + 3 && n >= o.y - 3 && n <= o.y + Ne * 1.6 + 3;
  }
}, ga = {
  id: "arrowdown",
  label: "Arrow Down",
  group: "annotate",
  pointsNeeded: 1,
  render(t, e, n, i) {
    const o = w(n, e.points[0]);
    Qi(t, o.x, o.y, !1, Zi(e, !1)), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    const o = w(i, t.points[0]);
    return Math.abs(e - o.x) <= Ne * 0.7 + 3 && n <= o.y + 3 && n >= o.y - Ne * 1.6 - 3;
  }
}, ii = 22, si = 14, Fn = 10, ya = {
  id: "flag",
  label: "Flag",
  group: "annotate",
  pointsNeeded: 1,
  render(t, e, n, i) {
    const o = w(n, e.points[0]), s = bt(o.x, t.lineWidth), r = o.y - ii;
    t.lineWidth = Math.max(1.5, e.width), t.strokeStyle = e.color, t.lineCap = "round", v(t, s, o.y, s, r), t.beginPath(), t.moveTo(s, r), t.lineTo(s + si, r + Fn / 2), t.lineTo(s, r + Fn), t.closePath(), t.fillStyle = e.color, t.fill(), i && I(t, e, n);
  },
  hitTest(t, e, n, i) {
    const o = w(i, t.points[0]), s = o.y - ii, r = Math.abs(e - o.x) <= Math.max(6, t.width / 2 + 3) && n >= s - 2 && n <= o.y + 2, l = e >= o.x - 2 && e <= o.x + si + 2 && n >= s - 2 && n <= s + Fn + 2;
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
  ...Rr,
  ...el,
  ...Pl,
  ...El,
  ...Vl,
  ...ea,
  ...ba
], Jt = da.reduce(
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
    var n;
    return ((n = Jt[e]) == null ? void 0 : n.group) === t;
  }).map((e) => ({
    id: e,
    label: Jt[e].label
  }))
})), bf = Sa.flatMap(
  (t) => t.tools
);
function po(t) {
  const e = Jt[t];
  if (!e) throw new Error(`drawings: no ToolImpl registered for tool "${t}"`);
  return e;
}
function Ke(t) {
  return po(t).pointsNeeded;
}
const Pa = "#2962ff";
function _n(t, e) {
  const n = po(t), i = {
    id: `d_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`,
    tool: t,
    points: [{ time: e.time, price: e.price }],
    color: Pa,
    width: 1
  };
  return n.defaultProps && (i.props = { ...n.defaultProps }), i;
}
function En(t, e, n, i, o) {
  if (e.points.length === 0) return;
  const s = Jt[e.tool];
  s && (t.save(), t.lineWidth = Math.max(1, e.width), t.strokeStyle = e.color, t.fillStyle = e.color, t.setLineDash([]), t.lineCap = "butt", t.lineJoin = "miter", s.render(t, e, n, i, o), t.restore());
}
function ri(t, e, n, i, o) {
  const s = Jt[t.tool];
  return !s || !(s.pointsNeeded >= 0 ? t.points.length >= s.pointsNeeded : t.points.length >= 2) ? !1 : s.hitTest(t, e, n, i, o);
}
function li(t, e, n, i, o) {
  const s = Jt[t.tool];
  if (s != null && s.handleAt) return s.handleAt(t, e, n, i, o);
  for (let r = t.points.length - 1; r >= 0; r--) {
    const l = t.points[r];
    if (Math.abs(e - i.timeToX(l.time)) <= tn && Math.abs(n - i.priceToY(l.price)) <= tn)
      return r;
  }
  return -1;
}
function Aa(t, e, n) {
  return {
    ...t,
    points: t.points.map((i) => ({ time: i.time + e, price: i.price + n }))
  };
}
function ka(t, e, n, i) {
  if (e < 0 || e >= t.points.length) return t;
  const o = Jt[t.tool];
  return o != null && o.moveHandle ? o.moveHandle(t, e, n, i) : {
    ...t,
    points: t.points.map((s, r) => r === e ? { time: n.time, price: n.price } : s)
  };
}
const La = /* @__PURE__ */ new Set([
  "renko",
  "kagi",
  "linebreak",
  "pnf",
  "range"
]);
function Me(t) {
  return La.has(t);
}
function Ia(t) {
  const e = t.length;
  if (e === 0) return [];
  const n = new Array(e);
  let i = (t[0].open + t[0].close) / 2, o = t[0].close;
  for (let s = 0; s < e; s++) {
    const r = t[s], l = (r.open + r.high + r.low + r.close) / 4, c = s === 0 ? (r.open + r.close) / 2 : (i + o) / 2, a = Math.max(r.high, c, l), f = Math.min(r.low, c, l);
    n[s] = { time: r.time, open: c, high: a, low: f, close: l, volume: r.volume, isPrediction: r.isPrediction }, i = c, o = l;
  }
  return n;
}
function Na(t, e) {
  const n = t.length;
  if (n === 0) return 0;
  let i = 0, o = 0;
  for (let l = 1; l < n; l++) {
    const c = t[l], a = t[l - 1].close, f = Math.max(c.high - c.low, Math.abs(c.high - a), Math.abs(c.low - a));
    isFinite(f) && (i += f, o++);
  }
  if (o === 0) return 0;
  let s = 0, r = 0;
  for (let l = n - 1; l >= 1 && r < e; l--) {
    const c = t[l], a = t[l - 1].close, f = Math.max(c.high - c.low, Math.abs(c.high - a), Math.abs(c.low - a));
    isFinite(f) && (s += f, r++);
  }
  return r > 0 ? s / r : i / o;
}
function mo(t) {
  const e = t.length;
  if (e === 0) return 1;
  const n = t[e - 1].close, i = Math.abs(n) * 5e-3 || 1, o = Na(t, 14) * 0.5, s = o > 0 ? o : i;
  return s > 0 ? s : i;
}
function Ca(t, e) {
  const n = t.length;
  if (n === 0 || !(e > 0) || !isFinite(e)) return [];
  const i = [];
  let o = t[0].close, s = 0;
  for (let r = 0; r < n; r++) {
    const l = t[r], c = l.close;
    if (s >= 0)
      for (; c >= o + e; )
        i.push({ time: l.time, open: o, high: o + e, low: o, close: o + e, volume: l.volume }), o += e, s = 1;
    if (s <= 0)
      for (; c <= o - e; )
        i.push({ time: l.time, open: o, high: o, low: o - e, close: o - e, volume: l.volume }), o -= e, s = -1;
    if (s === 1)
      for (; c <= o - 2 * e; ) {
        const a = o - e;
        i.push({ time: l.time, open: a, high: a, low: a - e, close: a - e, volume: l.volume }), o = a - e, s = -1;
      }
    else if (s === -1)
      for (; c >= o + 2 * e; ) {
        const a = o + e;
        i.push({ time: l.time, open: a, high: a + e, low: a, close: a + e, volume: l.volume }), o = a + e, s = 1;
      }
  }
  return i;
}
function Ra(t, e = 3) {
  const n = t.length;
  if (n === 0) return [];
  const i = [];
  for (let o = 0; o < n; o++) {
    const s = t[o], r = s.close;
    if (i.length === 0) {
      const g = s.close >= s.open, b = Math.min(s.open, s.close), A = Math.max(s.open, s.close);
      i.push({ time: s.time, open: g ? b : A, high: A, low: b, close: g ? A : b, volume: s.volume });
      continue;
    }
    const l = i[i.length - 1], c = l.close >= l.open;
    let a = -1 / 0, f = 1 / 0;
    const h = Math.max(0, i.length - e);
    for (let g = h; g < i.length; g++)
      a = Math.max(a, i[g].high), f = Math.min(f, i[g].low);
    const u = Math.max(l.open, l.close), p = Math.min(l.open, l.close);
    r > u ? i.push({ time: s.time, open: u, high: r, low: u, close: r, volume: s.volume }) : r < p ? i.push({ time: s.time, open: p, high: p, low: r, close: r, volume: s.volume }) : c && r < f ? i.push({ time: s.time, open: p, high: p, low: r, close: r, volume: s.volume }) : !c && r > a && i.push({ time: s.time, open: u, high: r, low: u, close: r, volume: s.volume });
  }
  return i;
}
function Fa(t) {
  return mo(t);
}
function _a(t, e, n = 3) {
  const i = t.length;
  if (i === 0 || !(e > 0) || !isFinite(e)) return [];
  const o = n >= 1 ? Math.floor(n) : 3, s = t[0].close, r = (u) => Math.floor((u - s) / e), l = [];
  let c = 0, a = r(t[0].close), f = a, h = t[0].time;
  for (let u = 0; u < i; u++) {
    const p = t[u], g = r(p.high), b = r(p.low);
    if (c === 0) {
      g > a ? (c = 1, a = g, h = p.time) : b < f && (c = -1, f = b, h = p.time);
      continue;
    }
    c === 1 ? g > a ? (a = g, h = p.time) : b <= a - o && (l.push({ dir: 1, top: a, bottom: f, time: h }), c = -1, f = b, a = a - 1, h = p.time) : b < f ? (f = b, h = p.time) : g >= f + o && (l.push({ dir: -1, top: a, bottom: f, time: h }), c = 1, a = g, f = f + 1, h = p.time);
  }
  return c !== 0 && l.push({ dir: c, top: a, bottom: f, time: h }), l.map((u) => {
    const p = s + u.bottom * e, g = s + (u.top + 1) * e, b = u.dir === 1 ? p : g, A = u.dir === 1 ? g : p;
    return { time: u.time, open: b, high: g, low: p, close: A, volume: 0 };
  });
}
function Ea(t) {
  return mo(t);
}
function va(t, e) {
  const n = t.length;
  if (n === 0 || !(e > 0) || !isFinite(e)) return [];
  const i = [];
  let o = t[0].open, s = o, r = o, l = t[0].time;
  const c = (a, f, h) => {
    for (a > r && (r = a), a < s && (s = a); a - s >= e; ) {
      const u = s + e;
      i.push({ time: f, open: s, high: u, low: s, close: u, volume: h }), o = u, s = u, r = a > u ? a : u;
    }
    for (; r - a >= e; ) {
      const u = r - e;
      i.push({ time: f, open: r, high: r, low: u, close: u, volume: h }), o = u, r = u, s = a < u ? a : u;
    }
  };
  for (let a = 0; a < n; a++) {
    const f = t[a];
    l = f.time;
    const h = f.close >= f.open;
    c(f.open, f.time, f.volume), c(h ? f.low : f.high, f.time, f.volume), c(h ? f.high : f.low, f.time, f.volume), c(f.close, f.time, f.volume);
  }
  if (r > s || i.length === 0) {
    const a = t[n - 1].close >= o;
    i.push({ time: l, open: o, high: r, low: s, close: a ? r : s, volume: t[n - 1].volume });
  }
  return i;
}
function Wa(t, e) {
  const n = t.length;
  if (n === 0) return [];
  const i = isFinite(e) ? e : 0.04, o = [];
  let s = 0, r = t[0].close, l = 1 / 0, c = -1 / 0, a = !0;
  o.push({ time: t[0].time, price: t[0].close, thick: a });
  const f = (h) => {
    r >= l ? a = !0 : r <= c && (a = !1), o[o.length - 1] = { time: h, price: r, thick: a };
  };
  for (let h = 1; h < n; h++) {
    const u = t[h], p = u.close;
    if (s === 0) {
      if (p >= r * (1 + i))
        s = 1, r = p;
      else if (p <= r * (1 - i))
        s = -1, r = p;
      else
        continue;
      o.push({ time: u.time, price: r, thick: a }), f(u.time);
    } else s === 1 ? p > r ? (r = p, f(u.time)) : p <= r * (1 - i) && (l = r, r = p, s = -1, o.push({ time: u.time, price: r, thick: a }), f(u.time)) : p < r ? (r = p, f(u.time)) : p >= r * (1 + i) && (c = r, r = p, s = 1, o.push({ time: u.time, price: r, thick: a }), f(u.time));
  }
  return o;
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
}, Yt = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
class Ya {
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
      let n = 1 / 0;
      for (let i = 1; i < e.length; i++) {
        const o = e[i] - e[i - 1];
        o > 0 && o < n && (n = o);
      }
      isFinite(n) && (this.intervalMs = n);
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
    const n = this.times, i = n.length;
    if (i === 0) return e / this.intervalMs;
    if (e <= n[0]) return (e - n[0]) / this.intervalMs;
    if (e >= n[i - 1]) return i - 1 + (e - n[i - 1]) / this.intervalMs;
    let o = 0, s = i - 1;
    for (; s - o > 1; ) {
      const l = o + s >> 1;
      n[l] <= e ? o = l : s = l;
    }
    const r = n[s] - n[o];
    return o + (r > 0 ? (e - n[o]) / r : 0);
  }
  /** Fractional bar index -> time. Inverse of timeToIndex (same extrapolation). */
  indexToTime(e) {
    const n = this.times, i = n.length;
    if (i === 0) return Math.round(e * this.intervalMs);
    if (e <= 0) return Math.round(n[0] + e * this.intervalMs);
    if (e >= i - 1) return Math.round(n[i - 1] + (e - (i - 1)) * this.intervalMs);
    const o = Math.floor(e);
    return Math.round(n[o] + (n[o + 1] - n[o]) * (e - o));
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
    const e = Math.max(0, Math.floor(this.view.start)), n = Math.min(this.count - 1, Math.ceil(this.view.end));
    return { from: e, to: n };
  }
}
class we {
  constructor(e, n, i, o, s = !1) {
    this.top = e, this.height = n, this.min = i, this.max = o, this.log = s;
  }
  get bottom() {
    return this.top + this.height;
  }
  priceToY(e) {
    if (this.log) {
      const i = Math.log(this.min), o = Math.log(this.max) - i || 1;
      return this.top + (Math.log(this.max) - Math.log(Math.max(e, 1e-12))) / o * this.height;
    }
    const n = this.max - this.min;
    return this.top + (this.max - e) / (n || 1) * this.height;
  }
  yToPrice(e) {
    if (this.log) {
      const i = Math.log(this.max), o = i - Math.log(this.min) || 1;
      return Math.exp(i - (e - this.top) / (this.height || 1) * o);
    }
    const n = this.max - this.min;
    return this.max - (e - this.top) / (this.height || 1) * n;
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
      const n = this.logDecadeTicks();
      if (n.length >= 3) return n;
    }
    return this.linearTicks(e);
  }
  linearTicks(e) {
    const n = this.max - this.min;
    if (!(n > 0)) return [];
    const i = Math.max(2, Math.floor(this.height / 45));
    let o = Jn(n / i);
    e > 0 && o < e && (o = e);
    const s = [], r = Math.ceil(this.min / o);
    for (let l = r; l * o <= this.max + o * 0.5; l++) {
      const c = l * o, a = this.priceToY(c);
      a >= this.top + 8 && a <= this.bottom - 8 && s.push(c);
    }
    return s;
  }
  logDecadeTicks() {
    const e = [], n = Math.floor(Math.log10(this.min)), i = Math.ceil(Math.log10(this.max));
    for (let o = n; o <= i; o++) {
      const s = Math.pow(10, o);
      for (const r of [1, 2, 5]) {
        const l = r * s;
        if (l < this.min || l > this.max) continue;
        const c = this.priceToY(l);
        c >= this.top + 8 && c <= this.bottom - 8 && e.push(l);
      }
    }
    return e;
  }
}
function Jn(t) {
  if (!(t > 0) || !isFinite(t)) return 1;
  const e = Math.pow(10, Math.floor(Math.log10(t)));
  for (const n of [1, 2, 5, 10])
    if (n * e >= t) return n * e;
  return 10 * e;
}
function ai(t) {
  return !(t > 0) || !isFinite(t) ? 2 : Math.max(0, Math.min(8, -Math.floor(Math.log10(t) + 1e-9)));
}
function Se(t, e) {
  return isFinite(t) ? t.toLocaleString("en-US", {
    minimumFractionDigits: e,
    maximumFractionDigits: e
  }) : "—";
}
function $a(t) {
  if (!isFinite(t)) return "—";
  const e = Math.abs(t);
  return e >= 1e12 ? (t / 1e12).toFixed(2) + "T" : e >= 1e9 ? (t / 1e9).toFixed(2) + "B" : e >= 1e6 ? (t / 1e6).toFixed(2) + "M" : e >= 1e3 ? (t / 1e3).toFixed(2) + "K" : e >= 100 ? t.toFixed(0) : e >= 1 ? t.toFixed(2) : t.toFixed(4);
}
function Oa(t) {
  let e = 1;
  for (; ; ) {
    for (const n of [1, 2, 5]) {
      const i = n * e;
      if (i >= t) return i;
    }
    e *= 10;
  }
}
function Ba(t) {
  const e = t.barSpacing();
  if (!(e > 0) || t.plotWidth <= 0) return [];
  const n = Oa(Math.max(1, Math.ceil(90 / e))), i = [], o = Math.ceil(t.view.start / n) * n;
  for (let s = o; s < t.view.end; s += n) {
    const r = t.centerX(s);
    r < -1 || r > t.plotWidth + 1 || i.push({ index: s, x: r, time: t.indexToTime(s) });
  }
  return i;
}
const Kn = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function Le(t) {
  return t < 10 ? "0" + t : String(t);
}
function Xa(t, e, n) {
  const i = new Date(t), o = e !== null ? new Date(e) : null;
  return n >= 864e5 ? o && i.getFullYear() !== o.getFullYear() ? String(i.getFullYear()) : !o || i.getMonth() !== o.getMonth() ? Kn[i.getMonth()] : String(i.getDate()) : !o || i.getDate() !== o.getDate() || i.getMonth() !== o.getMonth() || i.getFullYear() !== o.getFullYear() ? `${i.getDate()} ${Kn[i.getMonth()]}` : `${Le(i.getHours())}:${Le(i.getMinutes())}`;
}
function Ha(t, e) {
  const n = new Date(t), i = `${n.getDate()} ${Kn[n.getMonth()]} '${Le(n.getFullYear() % 100)}`;
  return e >= 864e5 ? i : `${i}  ${Le(n.getHours())}:${Le(n.getMinutes())}`;
}
function $t(t) {
  const e = Math.floor(t) - 1;
  return Math.max(1, Math.min(Math.floor(t * 0.8), e > 0 ? e : 1));
}
function Ce(t, e) {
  const n = /^#([0-9a-f]{6})$/i.exec(t);
  if (!n) return t;
  const i = parseInt(n[1], 16);
  return `rgba(${i >> 16 & 255}, ${i >> 8 & 255}, ${i & 255}, ${e})`;
}
function Va(t, e, n, i) {
  t.fillStyle = e.grid;
  for (const o of n)
    t.fillRect(Math.round(o.x), 0, 1, i);
}
function ci(t, e, n, i, o) {
  t.fillStyle = e.grid;
  for (const s of o)
    t.fillRect(0, Math.round(i.priceToY(s)), n, 1);
}
function Ga(t, e, n, i) {
  t.fillStyle = e.separator, t.fillRect(0, n, i, 1);
}
function qa(t, e, n, i, o, s) {
  t.fillStyle = e.axisLine, t.fillRect(n, 0, 1, s), t.fillRect(0, i, o, 1);
}
function vn(t, e, n, i, o, s, r) {
  const l = o.barSpacing(), c = $t(l);
  for (let a = n; a <= i; a++) {
    const f = e[a], h = f.close >= f.open ? r.up : r.down, u = o.centerX(a), p = Math.round(u), g = Math.round(s.priceToY(f.high)), b = Math.round(s.priceToY(f.low)), A = t.globalAlpha;
    f.isPrediction && (t.globalAlpha = 0.4), t.fillStyle = h, t.fillRect(p, g, 1, Math.max(1, b - g));
    const T = Math.round(s.priceToY(f.open)), P = Math.round(s.priceToY(f.close));
    t.fillRect(Math.round(u - c / 2), Math.min(T, P), c, Math.max(1, Math.abs(P - T))), f.isPrediction && (t.globalAlpha = A);
  }
}
function Ua(t, e, n, i, o, s, r) {
  const l = o.barSpacing(), c = $t(l);
  let a = 0;
  for (let f = n; f <= i; f++)
    e[f].volume > a && (a = e[f].volume);
  for (let f = n; f <= i; f++) {
    const h = e[f], u = h.close >= h.open ? r.up : r.down, p = o.centerX(f), g = Math.round(p), b = Math.round(s.priceToY(h.high)), A = Math.round(s.priceToY(h.low));
    t.fillStyle = u, t.fillRect(g, b, 1, Math.max(1, A - b));
    const T = a > 0 ? h.volume / a : 1, P = Math.max(1, Math.round(c * T)), N = Math.round(s.priceToY(h.open)), L = Math.round(s.priceToY(h.close));
    t.fillRect(Math.round(p - P / 2), Math.min(N, L), P, Math.max(1, Math.abs(L - N)));
  }
}
function ja(t, e, n, i, o, s, r) {
  const l = o.barSpacing(), c = Math.max(1, Math.floor($t(l) / 2));
  for (let a = n; a <= i; a++) {
    const f = e[a], h = f.close >= f.open ? r.up : r.down, u = Math.round(o.centerX(a)), p = Math.round(s.priceToY(f.high)), g = Math.round(s.priceToY(f.low)), b = t.globalAlpha;
    f.isPrediction && (t.globalAlpha = 0.4), t.fillStyle = h, t.fillRect(u, p, 1, Math.max(1, g - p)), t.fillRect(u - c, Math.round(s.priceToY(f.open)), c, 1), t.fillRect(u + 1, Math.round(s.priceToY(f.close)), c, 1), f.isPrediction && (t.globalAlpha = b);
  }
}
function rn(t, e, n, i, o, s) {
  const r = Math.max(0, n - 1), l = Math.min(e.length - 1, i + 1);
  t.beginPath();
  for (let c = r; c <= l; c++) {
    const a = o.centerX(c), f = s.priceToY(e[c].close);
    c === r ? t.moveTo(a, f) : t.lineTo(a, f);
  }
}
function Ja(t, e, n, i, o, s, r) {
  n > i || (rn(t, e, n, i, o, s), t.strokeStyle = r.accent, t.lineWidth = 2, t.lineJoin = "round", t.lineCap = "round", t.stroke());
}
function Ka(t, e, n, i, o, s, r) {
  if (n > i) return;
  const l = Math.max(0, n - 1), c = Math.min(e.length - 1, i + 1), a = t.createLinearGradient(0, s.top, 0, s.bottom);
  a.addColorStop(0, Ce(r.accent, 0.28)), a.addColorStop(1, Ce(r.accent, 0.02)), rn(t, e, n, i, o, s), t.lineTo(o.centerX(c), s.bottom), t.lineTo(o.centerX(l), s.bottom), t.closePath(), t.fillStyle = a, t.fill(), rn(t, e, n, i, o, s), t.strokeStyle = r.accent, t.lineWidth = 2, t.lineJoin = "round", t.lineCap = "round", t.stroke();
}
function Za(t, e, n, i, o, s, r) {
  if (n > i) return;
  const l = Math.max(0, n - 1), c = Math.min(e.length - 1, i + 1), a = Math.min(i, e.length - 1), f = a > 0 ? e[a - 1].close : e[a].open, u = e[a].close >= f ? r.up : r.down;
  t.beginPath();
  for (let p = l; p <= c; p++) {
    const g = o.centerX(p), b = s.priceToY(e[p].high);
    p === l ? t.moveTo(g, b) : t.lineTo(g, b);
  }
  for (let p = c; p >= l; p--)
    t.lineTo(o.centerX(p), s.priceToY(e[p].low));
  t.closePath(), t.fillStyle = Ce(u, 0.16), t.fill(), t.beginPath();
  for (let p = l; p <= c; p++) {
    const g = o.centerX(p), b = s.priceToY(e[p].close);
    p === l ? t.moveTo(g, b) : t.lineTo(g, b);
  }
  t.strokeStyle = u, t.lineWidth = 2, t.lineJoin = "round", t.lineCap = "round", t.stroke();
}
function Qa(t, e, n, i, o, s, r) {
  const l = o.barSpacing(), c = $t(l);
  for (let a = n; a <= i; a++) {
    const f = e[a], h = f.close >= f.open, u = h ? r.up : r.down, p = o.centerX(a), g = Math.round(p), b = Math.round(s.priceToY(f.high)), A = Math.round(s.priceToY(f.low)), T = t.globalAlpha;
    f.isPrediction && (t.globalAlpha = 0.4), t.fillStyle = u, t.fillRect(g, b, 1, Math.max(1, A - b));
    const P = Math.round(s.priceToY(f.open)), N = Math.round(s.priceToY(f.close)), L = Math.round(p - c / 2), D = Math.min(P, N), O = Math.max(1, Math.abs(N - P));
    h ? (t.strokeStyle = u, t.lineWidth = 1, t.strokeRect(L + 0.5, D + 0.5, Math.max(1, c - 1), Math.max(1, O - 1))) : t.fillRect(L, D, c, O), f.isPrediction && (t.globalAlpha = T);
  }
}
function za(t, e, n, i, o, s, r) {
  const l = o.barSpacing(), c = Math.max(1, Math.floor($t(l) / 2));
  for (let a = n; a <= i; a++) {
    const f = e[a], h = f.close >= f.open ? r.up : r.down, u = Math.round(o.centerX(a)), p = Math.round(s.priceToY(f.high)), g = Math.round(s.priceToY(f.low));
    t.fillStyle = h, t.fillRect(u, p, 1, Math.max(1, g - p)), t.fillRect(u + 1, Math.round(s.priceToY(f.close)), c, 1);
  }
}
function xa(t, e, n, i, o, s, r) {
  if (!(n > i)) {
    rn(t, e, n, i, o, s), t.strokeStyle = r.accent, t.lineWidth = 2, t.lineJoin = "round", t.lineCap = "round", t.stroke(), t.fillStyle = r.accent;
    for (let l = n; l <= i; l++) {
      const c = o.centerX(l), a = s.priceToY(e[l].close);
      t.beginPath(), t.arc(c, a, 2.5, 0, Math.PI * 2), t.fill();
    }
  }
}
function tc(t, e, n, i, o, s, r) {
  if (n > i) return;
  const l = Math.max(0, n - 1), c = Math.min(e.length - 1, i + 1);
  t.beginPath();
  let a = s.priceToY(e[l].close);
  t.moveTo(o.centerX(l), a);
  for (let f = l + 1; f <= c; f++) {
    const h = o.centerX(f), u = s.priceToY(e[f].close);
    t.lineTo(h, a), t.lineTo(h, u), a = u;
  }
  t.strokeStyle = r.accent, t.lineWidth = 2, t.lineJoin = "miter", t.lineCap = "butt", t.stroke();
}
function ec(t, e, n, i, o, s, r, l) {
  if (n > i) return;
  const c = Math.max(0, n - 1), a = Math.min(e.length - 1, i + 1), f = s.priceToY(l), h = () => {
    t.beginPath();
    for (let g = c; g <= a; g++) {
      const b = o.centerX(g), A = s.priceToY(e[g].close);
      g === c ? t.moveTo(b, A) : t.lineTo(b, A);
    }
  }, u = o.centerX(c), p = o.centerX(a);
  t.save(), t.beginPath(), t.rect(0, s.top, o.plotWidth, Math.max(0, f - s.top)), t.clip(), h(), t.lineTo(p, f), t.lineTo(u, f), t.closePath(), t.fillStyle = Ce(r.up, 0.2), t.fill(), t.restore(), t.save(), t.beginPath(), t.rect(0, f, o.plotWidth, Math.max(0, s.bottom - f)), t.clip(), h(), t.lineTo(p, f), t.lineTo(u, f), t.closePath(), t.fillStyle = Ce(r.down, 0.2), t.fill(), t.restore(), t.lineWidth = 2, t.lineJoin = "round", t.lineCap = "round", t.save(), t.beginPath(), t.rect(0, s.top, o.plotWidth, Math.max(0, f - s.top)), t.clip(), h(), t.strokeStyle = r.up, t.stroke(), t.restore(), t.save(), t.beginPath(), t.rect(0, f, o.plotWidth, Math.max(0, s.bottom - f)), t.clip(), h(), t.strokeStyle = r.down, t.stroke(), t.restore();
}
function nc(t, e, n, i, o, s, r) {
  const l = o.barSpacing(), c = $t(l), a = s.bottom;
  for (let f = n; f <= i; f++) {
    const h = e[f], u = f > 0 ? e[f - 1].close : h.open;
    t.fillStyle = h.close >= u ? r.up : r.down;
    const p = Math.round(s.priceToY(h.close)), g = Math.min(p, a);
    t.fillRect(Math.round(o.centerX(f) - c / 2), g, c, Math.max(1, Math.round(a - g)));
  }
}
function oc(t, e, n, i, o, s, r) {
  for (let l = n; l <= i; l++) {
    const c = e[l];
    t.fillStyle = c.close >= c.open ? r.up : r.down;
    const a = Math.round(o.centerX(l)), f = Math.round(s.priceToY(c.high)), h = Math.round(s.priceToY(c.low));
    t.fillRect(a, f, 1, Math.max(1, h - f));
  }
}
function ic(t, e, n, i, o, s, r) {
  const l = o.barSpacing(), c = $t(l);
  for (let a = n; a <= i; a++) {
    const f = e[a], h = f.close >= f.open;
    t.fillStyle = h ? r.up : r.down;
    const u = Math.round(s.priceToY(Math.max(f.open, f.close))), p = Math.round(s.priceToY(Math.min(f.open, f.close)));
    t.fillRect(Math.round(o.centerX(a) - c / 2), u, c, Math.max(1, p - u));
  }
}
function sc(t, e, n, i, o, s, r, l) {
  if (!(l > 0) || !isFinite(l)) return;
  const c = o.barSpacing(), a = $t(c), f = Math.max(1.5, a / 2 - 1);
  t.save(), t.lineWidth = Math.max(1.5, Math.min(2.5, a / 6)), t.lineCap = "round";
  for (let h = n; h <= i; h++) {
    const u = e[h], p = u.close >= u.open;
    t.strokeStyle = p ? r.up : r.down;
    const g = o.centerX(h), b = Math.max(1, Math.round((u.high - u.low) / l));
    for (let A = 0; A < b; A++) {
      const T = s.priceToY(u.low + (A + 1) * l), P = s.priceToY(u.low + A * l), N = (T + P) / 2, L = Math.min(f, Math.abs(P - T) / 2 - 0.5);
      L <= 0.5 || (t.beginPath(), p ? (t.moveTo(g - L, N - L), t.lineTo(g + L, N + L), t.moveTo(g + L, N - L), t.lineTo(g - L, N + L), t.stroke()) : (t.arc(g, N, L, 0, Math.PI * 2), t.stroke()));
    }
  }
  t.restore();
}
function rc(t, e, n, i, o) {
  if (!(e.length < 2)) {
    t.save(), t.strokeStyle = o.accent, t.lineJoin = "round", t.lineCap = "butt";
    for (let s = 1; s < e.length; s++) {
      const r = e[s - 1], l = e[s];
      t.lineWidth = l.thick ? 3 : 1, t.beginPath(), t.moveTo(n.centerX(s - 1), i.priceToY(r.price)), t.lineTo(n.centerX(s - 1), i.priceToY(l.price)), t.lineTo(n.centerX(s), i.priceToY(l.price)), t.stroke();
    }
    t.restore();
  }
}
function fi(t, e, n, i, o, s) {
  const r = e.style ?? "line", l = Math.min(i, e.values.length - 1);
  if (r === "histogram") {
    const h = o.barSpacing(), u = Math.max(1, Math.floor(h * 0.6) || 1), p = Math.min(Math.max(s.priceToY(0), s.top), s.bottom);
    t.fillStyle = e.color;
    for (let g = Math.max(0, n); g <= l; g++) {
      const b = e.values[g];
      if (b == null || !isFinite(b)) continue;
      const A = s.priceToY(b);
      t.fillRect(
        Math.round(o.centerX(g) - u / 2),
        Math.round(Math.min(A, p)),
        u,
        Math.max(1, Math.round(Math.abs(p - A)))
      );
    }
    return;
  }
  const c = Math.max(0, n - 1), a = Math.min(e.values.length - 1, i + 1);
  t.beginPath();
  let f = !1;
  for (let h = c; h <= a; h++) {
    const u = e.values[h];
    if (u == null || !isFinite(u)) {
      f = !1;
      continue;
    }
    const p = o.centerX(h), g = s.priceToY(u);
    f ? t.lineTo(p, g) : (t.moveTo(p, g), f = !0);
  }
  t.strokeStyle = e.color, t.lineWidth = 1.5, t.lineJoin = "round", t.stroke();
}
function lc(t, e, n, i, o, s) {
  const r = (l) => o.centerX(i + l);
  if (t.save(), t.lineJoin = "round", t.lineCap = "round", n && n.upper.length >= 2 && n.lower.length >= 2) {
    t.beginPath();
    for (let l = 0; l < n.upper.length; l++) {
      const c = n.upper[l], a = r(c.barOffset), f = s.priceToY(c.price);
      l === 0 ? t.moveTo(a, f) : t.lineTo(a, f);
    }
    for (let l = n.lower.length - 1; l >= 0; l--) {
      const c = n.lower[l];
      t.lineTo(r(c.barOffset), s.priceToY(c.price));
    }
    t.closePath(), t.globalAlpha = Math.min(1, Math.max(0, n.opacity)), t.fillStyle = n.color, t.fill(), t.globalAlpha = 1;
  }
  for (const l of e)
    if (!(l.points.length < 2)) {
      t.beginPath();
      for (let c = 0; c < l.points.length; c++) {
        const a = l.points[c], f = r(a.barOffset), h = s.priceToY(a.price);
        c === 0 ? t.moveTo(f, h) : t.lineTo(f, h);
      }
      t.globalAlpha = Math.min(1, Math.max(0, l.opacity)), t.strokeStyle = l.color, t.lineWidth = l.width, t.setLineDash(l.dashed ? [4, 3] : []), t.stroke();
    }
  t.restore();
}
function ac(t, e, n, i, o, s, r, l, c) {
  const a = n ? 0.4 : 1;
  if (t.save(), t.globalAlpha = a, r) {
    const b = Math.round(o) + 0.5;
    t.strokeStyle = e, t.lineWidth = 1, t.setLineDash([5, 4]), t.beginPath(), t.moveTo(0, b), t.lineTo(l, b), t.stroke(), t.setLineDash([]);
  }
  const f = 18, h = Math.round(s), u = 14, p = l + 1, g = c - 1;
  return t.fillStyle = e, t.fillRect(p, h - f / 2, g, f), cc(t, p + u / 2 + 2, h, "#ffffff"), t.font = Yt, t.fillStyle = "#ffffff", t.textAlign = "left", t.textBaseline = "middle", t.fillText(i, p + u + 4, h + 0.5), t.restore(), { x: p, y: h - f / 2, width: g, height: f };
}
function cc(t, e, n, i) {
  t.save(), t.fillStyle = i, t.strokeStyle = i, t.lineWidth = 1, t.lineJoin = "round", t.beginPath(), t.moveTo(e, n - 5), t.lineTo(e, n - 4), t.moveTo(e - 3.5, n + 2), t.quadraticCurveTo(e - 3.5, n - 4, e, n - 4), t.quadraticCurveTo(e + 3.5, n - 4, e + 3.5, n + 2), t.lineTo(e - 3.5, n + 2), t.closePath(), t.fill(), t.beginPath(), t.arc(e, n + 3.2, 1, 0, Math.PI * 2), t.fill(), t.restore();
}
function fc(t, e, n, i, o) {
  t.save(), t.strokeStyle = e.guide, t.lineWidth = 1, t.setLineDash([4, 4]);
  for (const s of o) {
    const r = Math.round(i.priceToY(s)) + 0.5;
    t.beginPath(), t.moveTo(0, r), t.lineTo(n, r), t.stroke();
  }
  t.restore();
}
function hi(t, e, n, i, o, s, r = "A") {
  t.save();
  const l = 3, c = () => {
    t.beginPath(), t.moveTo(n + l, i), t.arcTo(n + o, i, n + o, i + o, l), t.arcTo(n + o, i + o, n, i + o, l), t.arcTo(n, i + o, n, i, l), t.arcTo(n, i, n + o, i, l), t.closePath();
  };
  s ? (c(), t.fillStyle = e.accent, t.fill(), t.fillStyle = "#ffffff") : (c(), t.fillStyle = e.bg, t.fill(), t.strokeStyle = e.accent, t.lineWidth = 1, t.save(), t.beginPath(), t.rect(n + 0.5, i + 0.5, o - 1, o - 1), t.strokeStyle = e.accent, t.stroke(), t.restore(), t.fillStyle = e.accent), t.font = Yt, t.textAlign = "center", t.textBaseline = "middle", t.fillText(r, n + o / 2, i + o / 2 + 0.5), t.restore();
}
function ui(t, e, n, i) {
  t.font = Yt, t.fillStyle = e.mutedText, t.textAlign = "left", t.textBaseline = "middle";
  for (const o of i)
    t.fillText(o.label, n + 7, o.y);
}
function hc(t, e, n, i) {
  t.font = Yt, t.fillStyle = e.mutedText, t.textAlign = "center", t.textBaseline = "middle";
  for (const o of n)
    t.fillText(o.label, o.x, i);
}
function pi(t, e, n, i, o, s, r) {
  const c = Math.round(n);
  t.fillStyle = s, t.fillRect(i + 1, c - 18 / 2, o - 1, 18), t.font = Yt, t.fillStyle = r, t.textAlign = "left", t.textBaseline = "middle", t.fillText(e, i + 7, c + 0.5);
}
function uc(t, e, n, i, o, s, r) {
  t.font = Yt;
  const l = t.measureText(n).width + 14, c = Math.min(Math.max(i - l / 2, 0), Math.max(0, o - l)), a = 18, f = s + (r - a) / 2 + 1;
  t.fillStyle = e.crosshairTagBg, t.fillRect(c, f, l, a), t.fillStyle = e.crosshairTagText, t.textAlign = "center", t.textBaseline = "middle", t.fillText(n, c + l / 2, f + a / 2 + 0.5);
}
function pc(t, e, n, i) {
  t.save(), t.strokeStyle = e, t.lineWidth = 1, t.setLineDash([1.5, 3]), t.beginPath(), t.moveTo(0, n), t.lineTo(i, n), t.stroke(), t.restore();
}
function mc(t, e, n, i) {
  t.save(), t.strokeStyle = e.crosshair, t.lineWidth = 1, t.setLineDash([3, 3]), t.beginPath(), t.moveTo(n, 0), t.lineTo(n, i), t.stroke(), t.restore();
}
function gc(t, e, n, i) {
  t.save(), t.strokeStyle = e.crosshair, t.lineWidth = 1, t.setLineDash([3, 3]), t.beginPath(), t.moveTo(0, n), t.lineTo(i, n), t.stroke(), t.restore();
}
function yc(t, e, n, i) {
  t.save(), t.strokeStyle = i, t.lineWidth = 1.5, t.beginPath(), t.arc(e, n, 5, 0, Math.PI * 2), t.stroke(), t.restore();
}
function Wn(t, e, n, i) {
  t.font = Yt, t.textAlign = "left", t.textBaseline = "middle";
  let o = n;
  for (const s of e)
    t.fillStyle = s.color, t.fillText(s.text, o, i), o += t.measureText(s.text).width + 8;
  return o;
}
function bc(t, e) {
  const n = /* @__PURE__ */ new Map();
  let i = !1, o = null, s = 0;
  const r = (T, P) => {
    const N = o || t.getBoundingClientRect();
    return { x: T - N.left, y: P - N.top };
  }, l = (T) => {
    if (!(T.pointerType === "mouse" && T.button !== 0 && T.button !== 2) && T.button !== 2) {
      if (T.pointerType !== "mouse")
        try {
          t.setPointerCapture(T.pointerId);
        } catch {
        }
      if (n.set(T.pointerId, { clientX: T.clientX, clientY: T.clientY }), n.size === 1) {
        i = !0, o = t.getBoundingClientRect();
        const { x: P, y: N } = r(T.clientX, T.clientY);
        e.pointerDown(P, N, T), window.addEventListener("pointermove", f), window.addEventListener("pointerup", h), window.addEventListener("pointercancel", h);
      } else if (n.size === 2) {
        i && (e.pointerUp(0, 0, T), i = !1);
        const P = Array.from(n.values()), N = P[0].clientX - P[1].clientX, L = P[0].clientY - P[1].clientY;
        s = Math.hypot(N, L);
      }
    }
  }, c = (T) => {
    if (!n.has(T.pointerId)) {
      if (n.size === 0) {
        const { x: P, y: N } = r(T.clientX, T.clientY);
        e.pointerMove(P, N, T);
      }
      return;
    }
    if (n.set(T.pointerId, { clientX: T.clientX, clientY: T.clientY }), n.size === 1 && i) {
      const { x: P, y: N } = r(T.clientX, T.clientY);
      e.pointerMove(P, N, T);
    } else if (n.size === 2) {
      const P = Array.from(n.values()), N = P[0].clientX - P[1].clientX, L = P[0].clientY - P[1].clientY, D = Math.hypot(N, L);
      if (s > 0 && D > 0) {
        const O = (P[0].clientX + P[1].clientX) / 2, G = (P[0].clientY + P[1].clientY) / 2, { x: U } = r(O, G);
        e.pinch(U, D / s);
      }
      s = D;
    }
  }, a = (T) => {
    if (n.has(T.pointerId)) {
      if (T.pointerType !== "mouse")
        try {
          t.releasePointerCapture(T.pointerId);
        } catch {
        }
      if (n.size === 1 && i) {
        const { x: P, y: N } = r(T.clientX, T.clientY);
        e.pointerUp(P, N, T), i = !1, o = null;
      }
      n.delete(T.pointerId), n.size < 2 && (s = 0);
    }
  }, f = (T) => {
    c(T);
  }, h = (T) => {
    a(T), n.size === 0 && (window.removeEventListener("pointermove", f), window.removeEventListener("pointerup", h), window.removeEventListener("pointercancel", h));
  }, u = (T) => {
    T.preventDefault();
    const P = t.getBoundingClientRect(), N = T.clientX - P.left, L = T.clientY - P.top;
    e.wheel(N, L, T);
  }, p = (T) => {
    const P = t.getBoundingClientRect(), N = T.clientX - P.left, L = T.clientY - P.top;
    e.doubleClick(N, L, T);
  }, g = (T) => {
    T.preventDefault();
    const P = t.getBoundingClientRect(), N = T.clientX - P.left, L = T.clientY - P.top;
    e.contextMenu(N, L, T);
  }, b = (T) => {
    n.size === 0 && e.pointerLeave();
  }, A = (T) => {
    e.keyDown(T);
  };
  return t.addEventListener("pointerdown", l), t.addEventListener("pointermove", c), t.addEventListener("pointerleave", b), t.addEventListener("wheel", u, { passive: !1 }), t.addEventListener("dblclick", p), t.addEventListener("contextmenu", g), window.addEventListener("keydown", A), () => {
    t.removeEventListener("pointerdown", l), t.removeEventListener("pointermove", c), t.removeEventListener("pointerleave", b), t.removeEventListener("wheel", u), t.removeEventListener("dblclick", p), t.removeEventListener("contextmenu", g), window.removeEventListener("pointermove", f), window.removeEventListener("pointerup", h), window.removeEventListener("pointercancel", h), window.removeEventListener("keydown", A);
  };
}
const dc = 64, Tc = 26, Mc = 110, Dn = 1, Yn = 3, $n = 160, Ze = 5, wc = 10, Sc = 50, Tt = 18, On = 4, Pc = 180, mi = 3, Ac = 400, gi = 5;
function ht(t, e, n) {
  return Math.min(Math.max(t, e), n);
}
function kc(t) {
  if (!(t instanceof HTMLElement)) return !1;
  const e = t.tagName;
  return e === "INPUT" || e === "TEXTAREA" || e === "SELECT" || t.isContentEditable;
}
function df(t, e) {
  const n = document.createElement("canvas");
  n.style.display = "block", n.style.touchAction = "none";
  const i = n.getContext("2d");
  if (!i) throw new Error("CandL chart: 2d canvas context unavailable");
  const o = i;
  t.appendChild(n);
  let s = e.theme, r = e.pricePrecision, l = e.chartType, c = e.timeAxisHeight !== void 0 ? e.timeAxisHeight : Tc, a = [], f = [], h = null, u = 0, p = [], g = null, b = !1, A = [], T = null, P = [], N = [], L = null, D = [], O = null, G = null, U = [], j = !1, K = 6e4, x = "auto", Q = null, Ot = !1, fn = null, We = null, E = null, J = null, hn = !0, De = !1, Qt = 0, zt = 1;
  const st = { width: 0, height: 0 }, C = new Ya();
  function Ye() {
    const m = t.clientWidth, y = t.clientHeight;
    zt = Math.max(1, window.devicePixelRatio || 1), st.width = m, st.height = y, n.width = Math.max(1, Math.round(m * zt)), n.height = Math.max(1, Math.round(y * zt)), n.style.width = `${m}px`, n.style.height = `${y}px`, o.setTransform(zt, 0, 0, zt, 0, 0);
  }
  function B() {
    De || Qt !== 0 || (Qt = requestAnimationFrame(() => {
      Qt = 0, Ds();
    }));
  }
  const os = setInterval(B, 1e3);
  function at() {
    const m = st.width, y = st.height, d = Math.max(0, m - dc), M = p.filter((X) => X.placement === "pane"), S = M.length, k = Math.max(0, y - c), F = Math.max(0, k - S * Dn);
    let R = S > 0 ? Mc : 0, W = F - S * R;
    S > 0 && W < 120 && (R = Math.max(40, Math.floor((F - 120) / S)), W = Math.max(0, F - S * R));
    const Y = [{ kind: "main", top: 0, height: W }];
    let $ = W;
    for (const X of M)
      $ += Dn, Y.push({ kind: "indicator", top: $, height: R, indicator: X }), $ += R;
    return C.plotWidth = d, { width: m, height: y, plotWidth: d, timeAxisTop: k, panes: Y };
  }
  function is(m, y) {
    for (let d = 0; d < y.panes.length; d++) {
      const M = y.panes[d];
      if (m >= M.top && m < M.top + M.height) return d;
    }
    return -1;
  }
  function ct(m) {
    if (x === "manual" && Q !== null)
      return new we(
        m.top,
        m.height,
        Q.min,
        Q.max,
        Ot && Q.min > 0
      );
    const y = C.visibleRange(), d = y.from, M = Math.min(y.to, mt() - 1);
    let S = 1 / 0, k = -1 / 0;
    if (f.length > 0 && d <= M) {
      const R = l === "line" || l === "area" || l === "linemarkers" || l === "step" || l === "baseline" || l === "columns" || l === "kagi";
      for (let W = d; W <= M; W++) {
        const Y = f[W];
        R ? (Y.close < S && (S = Y.close), Y.close > k && (k = Y.close)) : (Y.low < S && (S = Y.low), Y.high > k && (k = Y.high));
      }
      if (!Me(l)) {
        for (const W of p)
          if (W.placement === "overlay")
            for (const Y of W.outputs) {
              const $ = Math.min(M, Y.values.length - 1);
              for (let X = d; X <= $; X++) {
                const z = Y.values[X];
                z == null || !isFinite(z) || (z < S && (S = z), z > k && (k = z));
              }
            }
      }
    }
    if (f.length > 0 && (A.length > 0 || T !== null)) {
      const R = f.length - 1, W = (Y) => {
        for (const $ of Y) {
          const X = R + $.barOffset + 0.5;
          X < C.view.start - 1 || X > C.view.end + 1 || isFinite($.price) && ($.price < S && (S = $.price), $.price > k && (k = $.price));
        }
      };
      for (const Y of A) W(Y.points);
      T && (W(T.upper), W(T.lower));
    }
    if ((!isFinite(S) || !isFinite(k)) && (S = 0, k = 1), S === k) {
      const R = Math.abs(S) * 0.01 || 1;
      S -= R, k += R;
    }
    if (Ot && S > 0) {
      const R = Math.log(S), W = Math.log(k), Y = (W - R) * 0.08;
      return new we(m.top, m.height, Math.exp(R - Y), Math.exp(W + Y), !0);
    }
    const F = (k - S) * 0.08;
    return new we(m.top, m.height, S - F, k + F);
  }
  function ss(m) {
    const y = m.indicator;
    if (y.range)
      return new we(m.top, m.height, y.range[0], y.range[1]);
    const d = C.visibleRange(), M = d.from, S = Math.min(d.to, mt() - 1);
    let k = 1 / 0, F = -1 / 0, R = !1;
    for (const Y of y.outputs) {
      (Y.style ?? "line") === "histogram" && (R = !0);
      const $ = Math.min(S, Y.values.length - 1);
      for (let X = Math.max(0, M); X <= $; X++) {
        const z = Y.values[X];
        z == null || !isFinite(z) || (z < k && (k = z), z > F && (F = z));
      }
    }
    if (R && (k > 0 && (k = 0), F < 0 && (F = 0)), (!isFinite(k) || !isFinite(F)) && (k = 0, F = 1), k === F) {
      const Y = Math.abs(k) * 0.01 || 1;
      k -= Y, F += Y;
    }
    const W = (F - k) * 0.08;
    return new we(m.top, m.height, k - W, F + W);
  }
  function xt(m) {
    return {
      timeToX: (y) => C.timeToX(y),
      xToTime: (y) => C.xToTime(y),
      priceToY: (y) => m.priceToY(y),
      yToPrice: (y) => m.yToPrice(y)
    };
  }
  let go = null;
  function yo() {
    const m = f.length, y = m > 0 ? f[m - 1] : null, d = go;
    if (d !== null && d.mode === x && d.log === Ot && d.manualMin === (Q !== null ? Q.min : NaN) && d.manualMax === (Q !== null ? Q.max : NaN) && d.viewStart === C.view.start && d.viewEnd === C.view.end && d.width === st.width && d.height === st.height && d.seriesRef === f && d.seriesCount === m && d.indicatorsRef === p && d.projLinesRef === A && d.projBandRef === T && d.type === l && (y === null || d.lastHigh === y.high && d.lastLow === y.low && d.lastClose === y.close))
      return d.scale;
    const M = ct(at().panes[0]);
    return go = {
      scale: M,
      viewStart: C.view.start,
      viewEnd: C.view.end,
      width: st.width,
      height: st.height,
      seriesRef: f,
      seriesCount: m,
      lastHigh: y !== null ? y.high : NaN,
      lastLow: y !== null ? y.low : NaN,
      lastClose: y !== null ? y.close : NaN,
      indicatorsRef: p,
      projLinesRef: A,
      projBandRef: T,
      type: l,
      mode: x,
      log: Ot,
      manualMin: Q !== null ? Q.min : NaN,
      manualMax: Q !== null ? Q.max : NaN
    }, M;
  }
  const rs = {
    timeToX: (m) => C.timeToX(m),
    xToTime: (m) => C.xToTime(m),
    priceToY: (m) => yo().priceToY(m),
    yToPrice: (m) => yo().yToPrice(m)
  };
  function ls() {
    const m = a.length;
    if (m < 2) {
      K = C.intervalMs || 6e4;
      return;
    }
    const y = [];
    for (let d = 1; d < m; d++) {
      const M = a[d].time - a[d - 1].time;
      M > 0 && y.push(M);
    }
    if (y.length === 0) {
      K = C.intervalMs || 6e4;
      return;
    }
    y.sort((d, M) => d - M), K = y[y.length >> 1];
  }
  function $e() {
    switch (u = 0, l) {
      case "heikin":
        f = Ia(a), h = null;
        break;
      case "renko":
        f = Ca(a, mo(a)), h = null;
        break;
      case "linebreak":
        f = Ra(a, 3), h = null;
        break;
      case "pnf": {
        const m = Fa(a);
        u = m, f = _a(a, m, 3), h = null;
        break;
      }
      case "range":
        f = va(a, Ea(a)), h = null;
        break;
      case "kagi": {
        const m = Wa(a, 0.04);
        h = m, f = m.map((y) => ({
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
        f = a, h = null;
        break;
    }
    C.setTimes(f.map((m) => m.time));
  }
  function mt() {
    const m = f.length;
    return g === null ? m : Math.min(g + 1, m);
  }
  function bo() {
    if (g === null) return;
    const m = f.length;
    if (m === 0) {
      g = null;
      return;
    }
    g = ht(g, 0, m - 1);
  }
  function ge() {
    return { candles: a, pricePrecision: r, barMs: K };
  }
  function Oe(m) {
    return L ? L.upColor : m.up;
  }
  function Be(m) {
    return L ? L.downColor : m.down;
  }
  function as(m) {
    return L ? { ...m, up: L.upColor, down: L.downColor, accent: L.upColor } : m;
  }
  function cs() {
    return L ? L.gridVisible : !0;
  }
  function fs() {
    return L ? L.crosshairVisible : !0;
  }
  function Xe(m, y, d) {
    const M = d.xToTime(m), S = d.yToPrice(y);
    if (!j || a.length === 0) return { time: M, price: S, snapped: !1 };
    const k = Math.floor(C.xToIndex(m));
    if (k < 0 || k >= a.length) return { time: M, price: S, snapped: !1 };
    const F = a[k];
    let R = S, W = 1 / 0;
    for (const Y of [F.open, F.high, F.low, F.close]) {
      const $ = Math.abs(d.priceToY(Y) - y);
      $ < W && (W = $, R = Y);
    }
    return W <= Sc ? { time: M, price: R, snapped: !0 } : { time: M, price: S, snapped: !1 };
  }
  function To() {
    return Math.max(60, Math.round(mt() * 1.2) + Ze * 2);
  }
  function Ct() {
    const m = mt();
    if (m === 0) return;
    let { start: y, end: d } = C.view;
    const M = d - y, S = Math.min(m, 2);
    d < S && (d = S, y = d - M);
    const k = m - 2;
    y > k && (y = k, d = y + M), C.view = { start: y, end: d };
  }
  function un(m) {
    return Math.min(Ze, Math.max(0, Math.floor(m / 3)));
  }
  function Mo(m) {
    if (g === null || !b || !(g >= m.start && g <= m.end - un(m.end - m.start))) return;
    let { start: d, end: M } = C.view;
    const S = M - d, k = un(S);
    g >= d && g <= M - k || (g < d ? (d = g, M = d + S) : (M = g + 1 + k, d = M - S), C.view = { start: d, end: M });
  }
  function te() {
    var m;
    hn && C.count > 0 && C.view.start <= wc && (hn = !1, (m = e.onRequestHistory) == null || m.call(e));
  }
  function hs(m) {
    C.view = { start: C.view.start + m, end: C.view.end + m }, Ct(), te(), B();
  }
  function ee() {
    pn();
    const m = mt();
    if (m === 0) {
      C.view = { start: -$n / 2, end: $n / 2 };
      return;
    }
    const y = m + Ze, d = Math.min($n, Math.max(Yn, m) + Ze);
    C.view = { start: y - d, end: y };
  }
  function us() {
    return ct(at().panes[0]);
  }
  function ps() {
    const m = us();
    Q = { min: m.min, max: m.max }, x = "manual";
  }
  function pn() {
    x = "auto", Q = null;
  }
  function ye() {
    var m;
    (m = e.onDrawingsChange) == null || m.call(e, P.slice());
  }
  function wo(m, y) {
    const d = P.findIndex((M) => M.id === m);
    d >= 0 && (P[d] = y);
  }
  function Bt(m) {
    var d;
    if (O === m) return;
    O = m;
    const y = m !== null ? P.find((M) => M.id === m) ?? null : null;
    (d = e.onSelectionChange) == null || d.call(e, y);
  }
  function ms() {
    var y;
    const m = O !== null ? P.find((d) => d.id === O) ?? null : null;
    (y = e.onSelectionChange) == null || y.call(e, m);
  }
  function So() {
    var m;
    U = [], G !== null && (G = null, (m = e.onActiveToolChange) == null || m.call(e, null)), B();
  }
  function Po(m) {
    var y, d;
    P.push(m), O = m.id, U = [], G = null, ye(), (y = e.onActiveToolChange) == null || y.call(e, null), (d = e.onSelectionChange) == null || d.call(e, m);
  }
  function gs(m, y, d) {
    const M = G;
    if (!M) return;
    const S = Ke(M);
    if (S < 1) return;
    const k = ct(d.panes[0]), F = xt(k), R = Xe(m, y, F);
    if (U.push({ time: R.time, price: R.price }), U.length >= S) {
      const W = ge();
      let Y = _n(M, U[0]);
      Y.points = U.slice(0, S);
      const $ = po(M);
      $.expandOnCommit && (Y = $.expandOnCommit(Y, W)), Po(Y);
    }
    B();
  }
  function ys(m, y, d) {
    const M = G;
    if (!M) return;
    const S = xt(ct(d.panes[0]));
    E = { mode: "freehand", drawing: _n(M, { time: S.xToTime(m), price: S.yToPrice(y) }), lastPx: m, lastPy: y }, B();
  }
  function bs(m, y) {
    const d = G;
    if (!d) return null;
    const M = Ke(d);
    if (M < 1) return null;
    const S = J !== null && J.x >= 0 && J.x <= C.plotWidth && J.y >= y.top && J.y < y.top + y.height, k = U.slice();
    if (S && J && k.length < M) {
      const R = Xe(J.x, J.y, m);
      k.push({ time: R.time, price: R.price });
    }
    if (k.length === 0) return null;
    const F = _n(d, k[0]);
    return F.id = "__preview__", F.points = k, F;
  }
  function He(m, y) {
    for (const d of D)
      if (m >= d.x && m <= d.x + d.width && y >= d.y && y <= d.y + d.height)
        return N.find((M) => M.id === d.id) ?? null;
    return null;
  }
  function Ao(m, y, d, M) {
    if (m < 0 || m > d.plotWidth) return null;
    let S = null, k = gi + 1;
    for (const F of N) {
      const R = M.priceToY(F.price);
      if (R < M.top || R > M.bottom) continue;
      const W = Math.abs(R - y);
      W <= gi && W < k && (S = F, k = W);
    }
    return S;
  }
  function mn(m, y, d) {
    const M = d.panes[0];
    return m > d.plotWidth && m <= d.width && y >= M.top && y < M.top + M.height;
  }
  function gn(m, y) {
    const d = fn;
    return d !== null && m >= d.x && m <= d.x + d.width && y >= d.y && y <= d.y + d.height;
  }
  function ko(m, y) {
    const d = We;
    return d !== null && m >= d.x && m <= d.x + d.width && y >= d.y && y <= d.y + d.height;
  }
  function Lo(m, y) {
    if (E) return;
    const d = at();
    if (!G) {
      if (gn(m, y) || ko(m, y)) {
        n.style.cursor = "pointer";
        return;
      }
      if (mn(m, y, d) && He(m, y) === null) {
        n.style.cursor = "ns-resize";
        return;
      }
    }
    if (!(m >= 0 && m <= d.plotWidth && y >= 0 && y < d.timeAxisTop)) {
      n.style.cursor = "default";
      return;
    }
    if (G) {
      n.style.cursor = "crosshair";
      return;
    }
    const S = d.panes[0];
    if (P.length > 0 && y >= S.top && y < S.top + S.height) {
      const k = xt(ct(S)), F = ge(), R = O ? P.find((W) => W.id === O) : void 0;
      if (R && li(R, m, y, k, F) >= 0) {
        n.style.cursor = "pointer";
        return;
      }
      for (let W = P.length - 1; W >= 0; W--)
        if (ri(P[W], m, y, k, F)) {
          n.style.cursor = "pointer";
          return;
        }
    }
    if (N.length > 0) {
      if (He(m, y) !== null) {
        n.style.cursor = "pointer";
        return;
      }
      const k = ct(S);
      if (Ao(m, y, d, k) !== null) {
        n.style.cursor = "grab";
        return;
      }
    }
    n.style.cursor = "crosshair";
  }
  function ds(m, y, d) {
    var F;
    if (d.button !== 0) return;
    const M = at(), S = M.panes[0], k = m >= 0 && m <= M.plotWidth && y >= S.top && y < S.top + S.height;
    if (G) {
      k && (Ke(G) === -1 ? ys(m, y, M) : gs(m, y, M));
      return;
    }
    if (gn(m, y)) {
      x === "manual" ? pn() : ps(), B();
      return;
    }
    if (ko(m, y)) {
      Ot = !Ot, B();
      return;
    }
    if (mn(m, y, M) && He(m, y) === null) {
      const R = ct(S), W = R.yToPrice(ht(y, R.top, R.bottom));
      E = { mode: "scale-axis", startMin: R.min, startMax: R.max, anchorPrice: W, startY: y }, Q = { min: R.min, max: R.max }, x = "manual", n.style.cursor = "ns-resize", B();
      return;
    }
    if (N.length > 0) {
      const R = He(m, y);
      if (R) {
        (F = e.onAlertRemove) == null || F.call(e, R.id);
        return;
      }
    }
    if (k && P.length > 0) {
      const R = xt(ct(S)), W = ge(), Y = O ? P.find(($) => $.id === O) : void 0;
      if (Y) {
        const $ = li(Y, m, y, R, W);
        if ($ >= 0) {
          E = { mode: "move-handle", id: Y.id, original: Y, handleIndex: $, moved: !1 }, B();
          return;
        }
      }
      for (let $ = P.length - 1; $ >= 0; $--) {
        const X = P[$];
        if (ri(X, m, y, R, W)) {
          Bt(X.id), E = {
            mode: "move-drawing",
            id: X.id,
            original: X,
            startTime: R.xToTime(m),
            startPrice: R.yToPrice(y),
            moved: !1
          }, B();
          return;
        }
      }
    }
    if (k && N.length > 0) {
      const R = ct(S), W = Ao(m, y, M, R);
      if (W) {
        E = { mode: "move-alert", id: W.id, price: W.price, moved: !1 }, n.style.cursor = "grabbing", B();
        return;
      }
    }
    k && P.length > 0 && O && (Bt(null), B()), E = { mode: "pan", lastX: m, lastY: y }, n.style.cursor = "grabbing";
  }
  function Ts(m, y, d) {
    if (J = { x: m, y }, E)
      if (E.mode === "pan") {
        const M = C.barSpacing();
        if (M > 0) {
          const S = (m - E.lastX) / M;
          E.lastX = m, S !== 0 && hs(-S);
        }
        if (x === "manual" && Q !== null) {
          const S = y - E.lastY;
          if (S !== 0) {
            const k = at().panes[0], F = Q.max - Q.min, R = S / Math.max(1, k.height) * F;
            Q = { min: Q.min + R, max: Q.max + R };
          }
        }
        E.lastY = y;
      } else if (E.mode === "scale-axis") {
        const M = y - E.startY, S = Math.exp(M / Pc), k = E.anchorPrice - (E.anchorPrice - E.startMin) * S, F = E.anchorPrice + (E.startMax - E.anchorPrice) * S;
        F - k > 1e-12 && isFinite(k) && isFinite(F) && (Q = { min: k, max: F });
      } else {
        const M = at(), S = ct(M.panes[0]), k = xt(S);
        if (E.mode === "freehand") {
          const F = m - E.lastPx, R = y - E.lastPy;
          E.drawing.points.length < Ac && F * F + R * R >= mi * mi && (E.drawing.points.push({ time: k.xToTime(m), price: k.yToPrice(y) }), E.lastPx = m, E.lastPy = y);
        } else if (E.mode === "move-drawing") {
          const F = k.xToTime(m), R = k.yToPrice(y);
          wo(E.id, Aa(E.original, F - E.startTime, R - E.startPrice)), E.moved = !0;
        } else if (E.mode === "move-alert") {
          const F = ht(y, S.top, S.bottom);
          E.price = S.yToPrice(F), E.moved = !0, n.style.cursor = "grabbing";
        } else {
          const F = Xe(m, y, k);
          wo(
            E.id,
            ka(E.original, E.handleIndex, { time: F.time, price: F.price }, ge())
          ), E.moved = !0;
        }
      }
    else
      Lo(m, y);
    B();
  }
  function Ms(m, y, d) {
    var M;
    E && (E.mode === "freehand" ? E.drawing.points.length >= 2 && Po(E.drawing) : E.mode === "move-alert" ? E.moved && ((M = e.onAlertMove) == null || M.call(e, E.id, E.price)) : (E.mode === "move-drawing" || E.mode === "move-handle") && E.moved && (ye(), ms())), E = null, J && Lo(J.x, J.y), B();
  }
  function ws() {
    J = null, B();
  }
  function Ss(m, y, d) {
    const M = at();
    if (M.plotWidth <= 0) return;
    if (Math.abs(d.deltaX) > Math.abs(d.deltaY) && !d.ctrlKey) {
      const z = C.range / M.plotWidth, gt = d.deltaX * z;
      C.view = { start: C.view.start + gt, end: C.view.end + gt }, Ct(), te(), B();
      return;
    }
    const S = C.range, k = Math.exp(-d.deltaY * 12e-4), F = ht(S / k, Yn, To());
    if (F === S) return;
    const R = ht(m, 0, M.plotWidth), W = C.xToIndex(R), Y = R / M.plotWidth, $ = W - Y * F, X = C.view;
    C.view = { start: $, end: $ + F }, Mo(X), Ct(), te(), B();
  }
  function Ps(m, y) {
    const d = at();
    if (d.plotWidth <= 0 || !(y > 0)) return;
    const M = C.range, S = ht(M / y, Yn, To());
    if (S === M) return;
    const k = ht(m, 0, d.plotWidth), F = C.xToIndex(k), R = k / d.plotWidth, W = F - R * S, Y = C.view;
    C.view = { start: W, end: W + S }, Mo(Y), Ct(), te(), B();
  }
  function As(m, y, d) {
    const M = at();
    if (!G && (gn(m, y) || mn(m, y, M))) {
      pn(), B();
      return;
    }
    ee(), B();
  }
  function ks(m, y, d) {
    if (d.preventDefault(), !e.onContextMenu) return;
    const M = at(), k = ct(M.panes[0]).yToPrice(y), F = C.xToTime(m);
    e.onContextMenu({ x: m, y, price: k, time: F });
  }
  function Ls(m) {
    kc(m.target) || (m.key === "Escape" ? E !== null && E.mode === "freehand" ? (E = null, So()) : G !== null || U.length > 0 ? So() : O && (Bt(null), B()) : (m.key === "Delete" || m.key === "Backspace") && O && (P = P.filter((y) => y.id !== O), Bt(null), ye(), B(), m.preventDefault()));
  }
  const Is = bc(n, {
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
    Ye(), B();
  });
  Io.observe(t);
  function Ns(m) {
    const y = Math.abs(m) >= 1 ? 2 : 4;
    return m.toLocaleString("en-US", { minimumFractionDigits: y, maximumFractionDigits: y });
  }
  function Cs(m, y) {
    const d = y.length >= 2 ? y[1] - y[0] : Jn((m.max - m.min) / 8 || 1), M = ai(d);
    return y.map((S) => ({
      y: Math.round(m.priceToY(S)),
      label: S.toLocaleString("en-US", { minimumFractionDigits: M, maximumFractionDigits: M })
    }));
  }
  function Rs(m, y) {
    const d = ai(Jn((y.max - y.min) / 8 || 1));
    return m.toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });
  }
  function yn(m, y) {
    o.beginPath(), o.rect(0, m.top, y.plotWidth, m.height), o.clip();
  }
  function Fs(m, y, d, M) {
    const S = f;
    switch (l) {
      case "candles":
        vn(o, S, d, M, C, m, y);
        break;
      case "volcandles":
        Ua(o, S, d, M, C, m, y);
        break;
      case "hlcarea":
        Za(o, S, d, M, C, m, y);
        break;
      case "hollow":
        Qa(o, S, d, M, C, m, y);
        break;
      case "heikin":
        vn(o, S, d, M, C, m, y);
        break;
      case "bars":
        ja(o, S, d, M, C, m, y);
        break;
      case "hlcbars":
        za(o, S, d, M, C, m, y);
        break;
      case "line":
        Ja(o, S, d, M, C, m, y);
        break;
      case "linemarkers":
        xa(o, S, d, M, C, m, y);
        break;
      case "step":
        tc(o, S, d, M, C, m, y);
        break;
      case "area":
        Ka(o, S, d, M, C, m, y);
        break;
      case "baseline": {
        const k = S[d].close;
        ec(o, S, d, M, C, m, y, k);
        break;
      }
      case "columns":
        nc(o, S, d, M, C, m, y);
        break;
      case "highlow":
        oc(o, S, d, M, C, m, y);
        break;
      case "renko":
      case "linebreak":
        ic(o, S, d, M, C, m, y);
        break;
      case "range":
        vn(o, S, d, M, C, m, y);
        break;
      case "pnf":
        sc(o, S, d, M, C, m, y, u);
        break;
      case "kagi":
        if (h) {
          const k = M >= h.length - 1 ? h : h.slice(0, M + 1);
          rc(o, k, C, m, y);
        }
        break;
    }
  }
  function _s(m, y, d) {
    const M = mt();
    if (M === 0) return;
    const S = f[M - 1], k = M > 1 ? f[M - 2].close : S.open, F = S.close >= k ? Oe(d) : Be(d), R = y.priceToY(S.close);
    R >= y.top && R <= y.bottom && pc(o, F, Math.round(R) + 0.5, m.plotWidth);
    const W = ht(R, y.top + 9, y.bottom - 9);
    pi(
      o,
      Se(S.close, r),
      W,
      m.plotWidth,
      m.width - m.plotWidth,
      F,
      "#ffffff"
    );
  }
  function Es(m, y, d) {
    if (D = [], N.length === 0) return;
    const M = m.width - m.plotWidth, S = E !== null && E.mode === "move-alert" ? E : null;
    for (const k of N) {
      const F = S !== null && S.id === k.id ? S.price : k.price, R = y.priceToY(F), W = ht(R, y.top + 9, y.bottom - 9), Y = k.condition === "above" ? Oe(d) : Be(d), $ = R >= y.top && R <= y.bottom, X = ac(
        o,
        Y,
        k.triggered,
        Se(F, r),
        R,
        W,
        $,
        m.plotWidth,
        M
      );
      D.push({ id: k.id, x: X.x, y: X.y, width: X.width, height: X.height });
    }
  }
  function vs(m, y, d) {
    const M = mt();
    if (M === 0) return;
    const S = d ?? M - 1, k = f[S], F = 10, R = 16;
    let W = m.panes[0].top + 12;
    const Y = k.close >= k.open ? Oe(y) : Be(y), $ = S > 0 ? f[S - 1].close : k.open, X = $ !== 0 ? (k.close - $) / $ * 100 : 0, z = X >= 0 ? Oe(y) : Be(y), gt = (dt) => Se(dt, r);
    if (Wn(
      o,
      [
        { text: "O", color: y.mutedText },
        { text: gt(k.open), color: Y },
        { text: "H", color: y.mutedText },
        { text: gt(k.high), color: Y },
        { text: "L", color: y.mutedText },
        { text: gt(k.low), color: Y },
        { text: "C", color: y.mutedText },
        { text: gt(k.close), color: Y },
        { text: `${X >= 0 ? "+" : ""}${X.toFixed(2)}%`, color: z },
        { text: "Vol", color: y.mutedText },
        { text: $a(k.volume), color: Y }
      ],
      F,
      W
    ), W += R, !Me(l)) {
      for (const dt of p) {
        if (dt.placement !== "overlay") continue;
        const Rt = [{ text: dt.label, color: y.mutedText }];
        for (const Ft of dt.outputs) {
          const Lt = S < Ft.values.length ? Ft.values[S] : null;
          Rt.push({ text: Lt == null || !isFinite(Lt) ? "—" : gt(Lt), color: Ft.color });
        }
        Wn(o, Rt, F, W), W += R;
      }
      for (let dt = 1; dt < m.panes.length; dt++) {
        const Rt = m.panes[dt], Ft = Rt.indicator, Lt = [{ text: Ft.label, color: y.mutedText }];
        for (const q of Ft.outputs) {
          const tt = S < q.values.length ? q.values[S] : null;
          Lt.push({ text: tt == null || !isFinite(tt) ? "—" : Ns(tt), color: q.color });
        }
        Wn(o, Lt, F, Rt.top + 12);
      }
    }
  }
  function Ws(m, y, d) {
    if (!J) return;
    const { x: M, y: S } = J;
    if (M < 0 || M > m.plotWidth || S < 0 || S >= m.timeAxisTop) return;
    const k = Math.floor(C.xToIndex(M)), F = Math.round(C.centerX(k)) + 0.5;
    mc(o, d, F, m.timeAxisTop), C.count > 0 && uc(
      o,
      d,
      Ha(C.indexToTime(k), C.intervalMs),
      Math.round(C.centerX(k)),
      m.plotWidth,
      m.timeAxisTop,
      c
    );
    const R = is(S, m);
    if (R >= 0 && R < y.length) {
      gc(o, d, Math.round(S) + 0.5, m.plotWidth);
      const W = y[R], Y = W.yToPrice(S), $ = R === 0 ? Se(Y, r) : Rs(Y, W);
      pi(
        o,
        $,
        S,
        m.plotWidth,
        m.width - m.plotWidth,
        d.crosshairTagBg,
        d.crosshairTagText
      );
    }
  }
  function Ds() {
    var Lt;
    if (De || ((window.devicePixelRatio || 1) !== zt && Ye(), st.width <= 0 || st.height <= 0)) return;
    const m = Da[s], y = as(m), d = cs(), M = at();
    o.save(), o.font = Yt, o.fillStyle = m.bg, o.fillRect(0, 0, M.width, M.height);
    const S = Ba(C);
    d && Va(o, m, S, M.timeAxisTop);
    const { from: k, to: F } = C.visibleRange(), R = Math.min(F, mt() - 1), W = mt() > 0 && k <= R, Y = Me(l), $ = M.panes[0], X = ct($), z = [X], gt = X.ticks(Math.pow(10, -r));
    if (d && ci(o, m, M.plotWidth, X, gt), W && $.height > 0 && M.plotWidth > 0) {
      if (o.save(), yn($, M), Fs(X, y, k, R), !Y) {
        for (const q of p)
          if (q.placement === "overlay")
            for (const tt of q.outputs)
              fi(o, tt, k, R, C, X);
      }
      (A.length > 0 || T !== null) && lc(o, A, T, mt() - 1, C, X), o.restore();
    }
    for (let q = 1; q < M.panes.length; q++) {
      const tt = M.panes[q], ft = ss(tt);
      z.push(ft);
      const ne = ft.ticks();
      d && ci(o, m, M.plotWidth, ft, ne);
      const oe = tt.indicator;
      if (oe.range && oe.range[0] === 0 && oe.range[1] === 100 && fc(o, m, M.plotWidth, ft, [30, 70]), !Y && tt.height > 0 && M.plotWidth > 0) {
        o.save(), yn(tt, M);
        for (const bn of oe.outputs)
          fi(o, bn, k, R, C, ft);
        o.restore();
      }
      Ga(o, m, tt.top - Dn, M.width);
    }
    qa(o, m, M.plotWidth, M.timeAxisTop, M.width, M.height), ui(
      o,
      m,
      M.plotWidth,
      gt.map((q) => ({ y: Math.round(X.priceToY(q)), label: Se(q, r) }))
    );
    for (let q = 1; q < M.panes.length; q++)
      ui(o, m, M.plotWidth, Cs(z[q], z[q].ticks()));
    if (M.width - M.plotWidth > Tt + On && $.height > Tt) {
      const q = M.plotWidth + On + 1, tt = $.top + On;
      hi(o, m, q, tt, Tt, x === "auto"), fn = { x: q, y: tt, width: Tt, height: Tt };
      const ft = tt + Tt + 4;
      $.top + $.height > ft + Tt ? (hi(o, m, q, ft, Tt, Ot, "L"), We = { x: q, y: ft, width: Tt, height: Tt }) : We = null;
    } else
      fn = null, We = null;
    const Rt = [];
    for (let q = 0; q < S.length; q++)
      Rt.push({
        x: S[q].x,
        label: Xa(S[q].time, q > 0 ? S[q - 1].time : null, C.intervalMs)
      });
    if (hc(o, m, Rt, M.timeAxisTop + c / 2 + 1), W && _s(M, X, m), Es(M, X, m), $.height > 0 && M.plotWidth > 0) {
      const q = xt(X), tt = ge();
      o.save(), yn($, M);
      for (const ne of P)
        En(o, ne, q, ne.id === O, tt);
      const ft = bs(q, $);
      if (ft && En(o, ft, q, !1, tt), E !== null && E.mode === "freehand" && En(o, E.drawing, q, !1, tt), j && J) {
        const ne = G !== null && Ke(G) >= 1, oe = E !== null && E.mode === "move-handle", bn = J.x >= 0 && J.x <= M.plotWidth && J.y >= $.top && J.y < $.top + $.height;
        if (ne && bn || oe) {
          const Co = Xe(J.x, J.y, q);
          Co.snapped && yc(o, J.x, q.priceToY(Co.price), y.accent);
        }
      }
      o.restore();
    }
    const Ft = J && W && J.x >= 0 && J.x <= M.plotWidth && J.y < M.timeAxisTop ? ht(Math.floor(C.xToIndex(J.x)), 0, mt() - 1) : null;
    fs() && Ws(M, z, m), vs(M, m, Ft), o.restore(), (Lt = e.onRender) == null || Lt.call(e);
  }
  const No = {
    setData(m) {
      const y = f, d = y.length, M = { ...C.view };
      a = m.slice(), ls(), $e();
      const S = f.length;
      if (d === 0 || S === 0)
        ee();
      else {
        const k = f[S - 1].time === y[d - 1].time, F = S - d;
        k ? C.view = { start: M.start + F, end: M.end + F } : f[0].time === y[0].time ? C.view = M : ee();
      }
      hn = !0, bo(), B();
    },
    updateLast(m) {
      const y = a.length;
      if (y === 0) {
        No.setData([m]);
        return;
      }
      const d = f.length, M = C.view.end >= d - 0.5;
      let S = -1;
      for (let F = y - 1; F >= 0; F--)
        if (a[F].time === m.time) {
          S = F;
          break;
        }
      if (S !== -1)
        a[S] = m;
      else if (m.time > a[y - 1].time)
        a.push(m);
      else
        return;
      $e();
      const k = f.length - d;
      M && k > 0 && (C.view = { start: C.view.start + k, end: C.view.end + k }), bo(), B();
    },
    setIndicators(m) {
      p = m.slice(), B();
    },
    setChartType(m) {
      if (m === l) {
        B();
        return;
      }
      const y = f.length, d = Me(m) !== Me(l);
      l = m, $e(), d || f.length !== y ? ee() : Ct(), B();
    },
    setTheme(m) {
      s = m, B();
    },
    setPricePrecision(m) {
      r = m, B();
    },
    setActiveTool(m) {
      G = m, U = [], E !== null && E.mode === "freehand" && (E = null), m !== null && Bt(null), B();
    },
    setDrawings(m) {
      P = m.slice(), O && !P.some((y) => y.id === O) && Bt(null), B();
    },
    updateDrawing(m) {
      const y = P.findIndex((d) => d.id === m.id);
      y < 0 || (P[y] = m, ye(), B());
    },
    setMagnet(m) {
      j = m, B();
    },
    setAlerts(m) {
      if (E !== null && E.mode === "move-alert") {
        const y = E.id;
        m.some((d) => d.id === y) || (E = null);
      }
      N = m.slice(), B();
    },
    setSettings(m) {
      L = { ...m }, B();
    },
    clearDrawings() {
      P.length !== 0 && (P = [], Bt(null), ye(), B());
    },
    resetView() {
      ee(), B();
    },
    resize() {
      Ye(), B();
    },
    destroy() {
      De || (De = !0, clearInterval(os), Qt !== 0 && cancelAnimationFrame(Qt), Qt = 0, Is(), Io.disconnect(), n.remove());
    },
    setProjections(m, y) {
      A = m.slice(), T = y ?? null;
      const d = C.count;
      if (A.length > 0 && d > 0 && C.view.end >= d - 0.5) {
        let M = 0;
        for (const k of A)
          for (const F of k.points) F.barOffset > M && (M = F.barOffset);
        if (T) {
          for (const k of T.upper) k.barOffset > M && (M = k.barOffset);
          for (const k of T.lower) k.barOffset > M && (M = k.barOffset);
        }
        const S = d + M + 3;
        if (C.view.end < S) {
          const k = C.range;
          C.view = { start: S - k, end: S }, Ct();
        }
      }
      B();
    },
    scrollToTime(m) {
      const y = f.length;
      if (y === 0) return;
      const d = ht(Math.round(C.timeToIndex(m)), 0, y - 1), M = C.range, S = d + 0.5;
      C.view = { start: S - M / 2, end: S + M / 2 }, Ct(), te(), B();
    },
    setReplayCursor(m) {
      if (m === null) {
        if (g === null) return;
        g = null, B();
        return;
      }
      const y = f.length, d = y === 0 ? 0 : ht(Math.round(m), 0, y - 1), M = g === null;
      if (!(!M && d === g)) {
        if (g = d, y > 0) {
          const S = C.view.end - C.view.start, k = un(S), F = d >= C.view.start && d <= C.view.end - k;
          if (M || !F) {
            const R = d + 1 + k;
            C.view = { start: R - S, end: R }, Ct(), te();
          }
        }
        B();
      }
    },
    setReplayPlaying(m) {
      b = m;
    },
    getMainConverters() {
      return st.width <= 0 || st.height <= 0 ? null : rs;
    },
    getMainPaneRect() {
      if (st.width <= 0 || st.height <= 0) return null;
      const m = at().panes[0];
      return { x: 0, y: m.top, width: C.plotWidth, height: m.height };
    }
  };
  return Ye(), $e(), ee(), B(), No;
}
function pt(t, e, n, i = 1) {
  const o = t[e], s = typeof o == "number" && Number.isFinite(o) ? Math.floor(o) : n;
  return Math.max(i, s);
}
function Lc(t, e, n, i = 0) {
  const o = t[e], s = typeof o == "number" && Number.isFinite(o) ? o : n;
  return Math.max(i, s);
}
function ve(t) {
  return t.map((e) => e.close);
}
function ln(t, e) {
  const n = new Array(t.length).fill(null);
  if (e <= 0) return n;
  let i = 0, o = 0;
  for (let s = 0; s < t.length; s++) {
    const r = t[s];
    if (r == null ? o++ : i += r, s >= e) {
      const l = t[s - e];
      l == null ? o-- : i -= l;
    }
    s >= e - 1 && o === 0 && (n[s] = i / e);
  }
  return n;
}
function ze(t, e) {
  const n = new Array(t.length).fill(null);
  if (e <= 0) return n;
  const i = 2 / (e + 1);
  let o = null, s = 0, r = 0;
  for (let l = 0; l < t.length; l++) {
    const c = t[l];
    if (c == null) {
      o = null, s = 0, r = 0;
      continue;
    }
    o !== null ? (o = (c - o) * i + o, n[l] = o) : (s += c, r++, r === e && (o = s / e, n[l] = o));
  }
  return n;
}
function Zn(t, e) {
  const n = new Array(t.length).fill(null);
  if (e <= 0) return n;
  let i = null, o = 0, s = 0;
  for (let r = 0; r < t.length; r++) {
    const l = t[r];
    if (l == null) {
      i = null, o = 0, s = 0;
      continue;
    }
    i !== null ? (i = (i * (e - 1) + l) / e, n[r] = i) : (o += l, s++, s === e && (i = o / e, n[r] = i));
  }
  return n;
}
const Ic = {
  id: "sma",
  label: "Simple Moving Average",
  shortLabel: "SMA",
  placement: "overlay",
  params: [{ key: "period", label: "Period", default: 20, min: 1, max: 500, step: 1 }],
  compute(t, e) {
    const n = pt(e, "period", 20);
    return [
      {
        name: "sma",
        values: ln(ve(t), n),
        color: "#2962FF"
      }
    ];
  }
}, Nc = {
  id: "ema",
  label: "Exponential Moving Average",
  shortLabel: "EMA",
  placement: "overlay",
  params: [{ key: "period", label: "Period", default: 20, min: 1, max: 500, step: 1 }],
  compute(t, e) {
    const n = pt(e, "period", 20);
    return [
      {
        name: "ema",
        values: ze(ve(t), n),
        color: "#FF6D00"
      }
    ];
  }
}, Cc = {
  id: "wma",
  label: "Weighted Moving Average",
  shortLabel: "WMA",
  placement: "overlay",
  params: [{ key: "period", label: "Period", default: 20, min: 1, max: 500, step: 1 }],
  compute(t, e) {
    const n = pt(e, "period", 20), i = ve(t), o = new Array(i.length).fill(null), s = n * (n + 1) / 2;
    for (let r = n - 1; r < i.length; r++) {
      let l = 0;
      for (let c = 0; c < n; c++)
        l += i[r - n + 1 + c] * (c + 1);
      o[r] = l / s;
    }
    return [
      {
        name: "wma",
        values: o,
        color: "#9C27B0"
      }
    ];
  }
}, Rc = {
  id: "bollinger",
  label: "Bollinger Bands",
  shortLabel: "BB",
  placement: "overlay",
  params: [
    { key: "period", label: "Period", default: 20, min: 1, max: 500, step: 1 },
    { key: "stdDev", label: "StdDev", default: 2, min: 0.1, max: 10, step: 0.1 }
  ],
  compute(t, e) {
    const n = pt(e, "period", 20), i = Lc(e, "stdDev", 2, 0), o = ve(t), s = ln(o, n), r = new Array(o.length).fill(null), l = new Array(o.length).fill(null);
    for (let c = n - 1; c < o.length; c++) {
      const a = s[c];
      if (a === null) continue;
      let f = 0;
      for (let u = c - n + 1; u <= c; u++) {
        const p = o[u] - a;
        f += p * p;
      }
      const h = Math.sqrt(f / n);
      r[c] = a + i * h, l[c] = a - i * h;
    }
    return [
      { name: "basis", values: s, color: "#FF9800" },
      { name: "upper", values: r, color: "#26A69A" },
      { name: "lower", values: l, color: "#EF5350" }
    ];
  }
}, Fc = {
  id: "vwap",
  label: "Volume Weighted Average Price",
  shortLabel: "VWAP",
  placement: "overlay",
  params: [],
  compute(t, e) {
    const n = new Array(t.length).fill(null);
    let i = 0, o = 0;
    for (let s = 0; s < t.length; s++) {
      const r = t[s], l = (r.high + r.low + r.close) / 3;
      i += l * r.volume, o += r.volume, n[s] = o > 0 ? i / o : null;
    }
    return [{ name: "vwap", values: n, color: "#E91E63" }];
  }
}, _c = {
  id: "rsi",
  label: "Relative Strength Index",
  shortLabel: "RSI",
  placement: "pane",
  params: [{ key: "period", label: "Period", default: 14, min: 1, max: 500, step: 1 }],
  range: [0, 100],
  compute(t, e) {
    const n = pt(e, "period", 14), i = t.length, o = new Array(i).fill(null), s = new Array(i).fill(null);
    for (let a = 1; a < i; a++) {
      const f = t[a].close - t[a - 1].close;
      o[a] = f > 0 ? f : 0, s[a] = f < 0 ? -f : 0;
    }
    const r = Zn(o, n), l = Zn(s, n), c = new Array(i).fill(null);
    for (let a = 0; a < i; a++) {
      const f = r[a], h = l[a];
      f === null || h === null || (h === 0 ? c[a] = f === 0 ? 50 : 100 : c[a] = 100 - 100 / (1 + f / h));
    }
    return [{ name: "rsi", values: c, color: "#7E57C2" }];
  }
}, Ec = {
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
    const n = pt(e, "fast", 12), i = pt(e, "slow", 26), o = pt(e, "signal", 9), s = ve(t), r = s.length, l = ze(s, n), c = ze(s, i), a = new Array(r).fill(null);
    for (let u = 0; u < r; u++) {
      const p = l[u], g = c[u];
      p !== null && g !== null && (a[u] = p - g);
    }
    const f = ze(a, o), h = new Array(r).fill(null);
    for (let u = 0; u < r; u++) {
      const p = a[u], g = f[u];
      p !== null && g !== null && (h[u] = p - g);
    }
    return [
      { name: "histogram", values: h, color: "#26A69A", style: "histogram" },
      { name: "macd", values: a, color: "#2962FF" },
      { name: "signal", values: f, color: "#FF6D00" }
    ];
  }
}, vc = {
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
    const n = pt(e, "kPeriod", 14), i = pt(e, "dPeriod", 3), o = pt(e, "smooth", 3), s = t.length, r = new Array(s).fill(null);
    for (let a = n - 1; a < s; a++) {
      let f = -1 / 0, h = 1 / 0;
      for (let p = a - n + 1; p <= a; p++) {
        const g = t[p];
        g.high > f && (f = g.high), g.low < h && (h = g.low);
      }
      const u = f - h;
      r[a] = u > 0 ? 100 * (t[a].close - h) / u : 50;
    }
    const l = ln(r, o), c = ln(l, i);
    return [
      { name: "k", values: l, color: "#2962FF" },
      { name: "d", values: c, color: "#FF6D00" }
    ];
  }
}, Wc = {
  id: "atr",
  label: "Average True Range",
  shortLabel: "ATR",
  placement: "pane",
  params: [{ key: "period", label: "Period", default: 14, min: 1, max: 500, step: 1 }],
  compute(t, e) {
    const n = pt(e, "period", 14), i = t.length, o = new Array(i).fill(null);
    for (let s = 0; s < i; s++) {
      const r = t[s];
      if (s === 0)
        o[s] = r.high - r.low;
      else {
        const l = t[s - 1].close;
        o[s] = Math.max(
          r.high - r.low,
          Math.abs(r.high - l),
          Math.abs(r.low - l)
        );
      }
    }
    return [{ name: "atr", values: Zn(o, n), color: "#EF5350" }];
  }
}, Dc = {
  id: "obv",
  label: "On-Balance Volume",
  shortLabel: "OBV",
  placement: "pane",
  params: [],
  compute(t, e) {
    const n = t.length, i = new Array(n).fill(null);
    let o = 0;
    for (let s = 0; s < n; s++) {
      if (s > 0) {
        const r = t[s].close - t[s - 1].close;
        r > 0 ? o += t[s].volume : r < 0 && (o -= t[s].volume);
      }
      i[s] = o;
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
    const n = t.length, i = new Array(n).fill(null), o = new Array(n).fill(null);
    for (let s = 0; s < n; s++) {
      const r = t[s];
      r.close >= r.open ? i[s] = r.volume : o[s] = r.volume;
    }
    return [
      { name: "up", values: i, color: "#26a69a", style: "histogram" },
      { name: "down", values: o, color: "#ef5350", style: "histogram" }
    ];
  }
}, $c = {
  id: "cvd",
  label: "Cumulative Volume Delta",
  shortLabel: "CVD",
  placement: "pane",
  params: [],
  compute(t, e) {
    const n = t.length, i = new Array(n).fill(null);
    let o = 0;
    for (let s = 0; s < n; s++) {
      const r = t[s], l = r.high - r.low, c = l > 0 ? Oc(2 * (r.close - r.low) / l - 1, -1, 1) : 0;
      o += r.volume * c, i[s] = o;
    }
    return [{ name: "cvd", values: i, color: "#2962ff", style: "line" }];
  }
};
function Oc(t, e, n) {
  return t < e ? e : t > n ? n : t;
}
const Bc = [
  Yc,
  Ic,
  Nc,
  Cc,
  Rc,
  Fc,
  _c,
  Ec,
  vc,
  Wc,
  Dc,
  $c
], Xc = new Map(Bc.map((t) => [t.id, t]));
function Tf(t) {
  return Xc.get(t);
}
function zi(t) {
  const e = t.length, n = new Array(e);
  if (e === 0) return n;
  let i = 0;
  for (let c = 0; c < e; c++) i += t[c];
  const o = i / e;
  let s = 0;
  for (let c = 0; c < e; c++) {
    const a = t[c] - o;
    s += a * a;
  }
  const r = Math.sqrt(s / e);
  if (!(r > 0) || !Number.isFinite(r) || !Number.isFinite(o)) {
    for (let c = 0; c < e; c++) n[c] = 0;
    return n;
  }
  const l = 1 / r;
  for (let c = 0; c < e; c++) n[c] = (t[c] - o) * l;
  return n;
}
function xi(t, e, n) {
  const i = e.length, o = t.length, s = Math.floor(n.k), r = Math.max(1, Math.floor(n.minGap ?? i)), l = Math.max(0, Math.floor(n.excludeTail ?? 0));
  if (s < 1 || i < 2) return [];
  const c = o - l - i;
  if (c < 0) return [];
  const a = c + 1, f = zi(e);
  for (let L = 0; L < i; L++)
    if (!Number.isFinite(f[L])) return [];
  const h = new Float64Array(o), u = new Int32Array(o + 1);
  for (let L = 0; L < o; L++) {
    const D = t[L];
    Number.isFinite(D) ? (h[L] = D, u[L + 1] = u[L]) : (h[L] = 0, u[L + 1] = u[L] + 1);
  }
  const p = new Float64Array(a), g = 1024;
  let b = 0, A = 0;
  for (let L = 0; L < i; L++) {
    const D = h[L];
    b += D, A += D * D;
  }
  for (let L = 0; L < a; L++) {
    if (L > 0)
      if (L % g === 0) {
        b = 0, A = 0;
        for (let j = 0; j < i; j++) {
          const K = h[L + j];
          b += K, A += K * K;
        }
      } else {
        const j = h[L - 1], K = h[L + i - 1];
        b += K - j, A += K * K - j * j;
      }
    if (u[L + i] - u[L] > 0) {
      p[L] = 1 / 0;
      continue;
    }
    const D = b / i;
    let O = A / i - D * D;
    O < 0 && (O = 0);
    const G = Math.sqrt(O);
    let U = 0;
    if (G > 0) {
      const j = 1 / G;
      for (let K = 0; K < i; K++) {
        const x = (h[L + K] - D) * j - f[K];
        U += x * x;
      }
    } else
      for (let j = 0; j < i; j++) U += f[j] * f[j];
    p[L] = Number.isFinite(U) ? Math.sqrt(U) : 1 / 0;
  }
  const T = new Array(a);
  for (let L = 0; L < a; L++) T[L] = L;
  T.sort((L, D) => {
    const O = p[L], G = p[D];
    return O === G ? 0 : O < G ? -1 : 1;
  });
  const P = [], N = [];
  for (let L = 0; L < a && P.length < s; L++) {
    const D = T[L], O = p[D];
    if (!Number.isFinite(O)) break;
    let G = !0;
    for (let U = 0; U < N.length; U++)
      if (Math.abs(D - N[U]) < r) {
        G = !1;
        break;
      }
    G && (N.push(D), P.push({ startIndex: D, endIndex: D + i - 1, distance: O }));
  }
  return P;
}
function Hc(t, e, n, i) {
  if (e < 2 || n < 1 || i < 1) return null;
  const o = t.length;
  if (o < e * 3) return null;
  const s = new Array(o);
  for (let T = 0; T < o; T++) s[T] = t[T].close;
  const r = s.slice(o - e), l = xi(s, r, {
    k: i,
    minGap: e,
    excludeTail: e + n
  }), c = [];
  for (let T = 0; T < l.length; T++) {
    const P = l[T], N = P.endIndex, L = s[N];
    let D = null;
    if (N + n < o && Number.isFinite(L) && L !== 0) {
      const O = new Array(n);
      let G = !0;
      for (let U = 1; U <= n; U++) {
        const j = (s[N + U] / L - 1) * 100;
        if (!Number.isFinite(j)) {
          G = !1;
          break;
        }
        O[U - 1] = j;
      }
      G && (D = O);
    }
    c.push({ match: P, matchTime: t[N].time, aftermathPct: D });
  }
  const a = [];
  let f = 0;
  for (let T = 0; T < c.length; T++) {
    const P = c[T].aftermathPct;
    if (P === null) continue;
    const N = P[n - 1];
    a.push(N), N > 0 && f++;
  }
  a.sort((T, P) => T - P);
  const h = a.length;
  let u = 0;
  if (h > 0) {
    const T = h >> 1;
    u = h % 2 === 1 ? a[T] : (a[T - 1] + a[T]) / 2;
  }
  const p = {
    count: h,
    upCount: f,
    medianEndPct: u,
    bestEndPct: h > 0 ? a[h - 1] : 0,
    worstEndPct: h > 0 ? a[0] : 0,
    horizon: n
  }, g = r[0], b = new Array(e), A = Number.isFinite(g) && g !== 0;
  for (let T = 0; T < e; T++)
    if (A) {
      const P = (r[T] / g - 1) * 100;
      b[T] = Number.isFinite(P) ? P : 0;
    } else
      b[T] = 0;
  return { windowLen: e, horizon: n, results: c, stats: p, queryClosePct: b };
}
function Vc(t, e) {
  if (!Number.isInteger(e) || e < 2)
    throw new Error(`resampleStroke: n must be an integer >= 2 (got ${e})`);
  const n = /* @__PURE__ */ new Map();
  for (let u = 0; u < t.length; u++) {
    const p = t[u];
    Number.isFinite(p.x) && Number.isFinite(p.y) && n.set(p.x, p.y);
  }
  if (n.size < 2)
    throw new Error("resampleStroke: need at least 2 points with distinct x");
  const i = n.size, o = new Float64Array(i);
  let s = 0;
  for (const u of n.keys()) o[s++] = u;
  o.sort();
  const r = new Float64Array(i);
  for (let u = 0; u < i; u++) r[u] = n.get(o[u]);
  const l = o[0], a = o[i - 1] - l, f = new Array(e);
  let h = 0;
  for (let u = 0; u < e; u++) {
    const p = l + a * u / (e - 1);
    for (; h < i - 2 && o[h + 1] < p; ) h++;
    const g = o[h], b = o[h + 1];
    let A = (p - g) / (b - g);
    A < 0 && (A = 0), A > 1 && (A = 1);
    const T = r[h] + A * (r[h + 1] - r[h]);
    f[u] = -T;
  }
  return f;
}
const Gc = 200, yi = 120;
function Pe(t, e) {
  const n = t.length;
  if (n === 1) return t[0];
  const i = e * (n - 1), o = Math.floor(i), s = o + 1 < n ? o + 1 : o, r = i - o;
  return t[o] + r * (t[s] - t[o]);
}
function qc(t, e, n, i = 12) {
  if (e = Math.floor(e), n = Math.floor(n), i = Math.floor(i), e < 1 || n < 1 || i < 1 || t.length < Gc) return null;
  const o = new Float64Array(t.length - 1);
  let s = 0, r = NaN;
  for (let g = 0; g < t.length; g++) {
    const b = t[g].close;
    if (!(!Number.isFinite(b) || b <= 0)) {
      if (r === r) {
        const A = Math.log(b / r);
        Number.isFinite(A) && (o[s++] = A);
      }
      r = b;
    }
  }
  if (s < i) return null;
  const l = s - i, c = new Float32Array(n * e);
  for (let g = 0; g < n; g++) {
    const b = g * e;
    let A = 0, T = 0;
    for (; T < e; ) {
      const P = Math.floor(Math.random() * (l + 1)), N = e - T, L = i < N ? i : N;
      for (let D = 0; D < L; D++)
        A += o[P + D], c[b + T] = (Math.exp(A) - 1) * 100, T++;
    }
  }
  const a = new Float32Array(n), f = new Array(e);
  for (let g = 0; g < e; g++) {
    for (let b = 0; b < n; b++) a[b] = c[b * e + g];
    a.sort(), f[g] = {
      p5: Pe(a, 0.05),
      p25: Pe(a, 0.25),
      p50: Pe(a, 0.5),
      p75: Pe(a, 0.75),
      p95: Pe(a, 0.95)
    };
  }
  const h = f[e - 1].p50, u = n < yi ? n : yi, p = new Array(u);
  for (let g = 0; g < u; g++) {
    const A = Math.floor(g * n / u) * e, T = new Array(e);
    for (let P = 0; P < e; P++) T[P] = c[A + P];
    p[g] = T;
  }
  return { horizon: e, nPaths: n, pathsPct: c, bandsPct: f, medianEndPct: h, samplePathsPct: p };
}
function Uc(t, e) {
  const { horizon: n, nPaths: i, pathsPct: o } = t;
  if (i < 1 || n < 1) return { endAbovePct: 0, touchPct: 0 };
  const s = e >= 0;
  let r = 0, l = 0;
  for (let c = 0; c < i; c++) {
    const a = c * n;
    if (o[a + n - 1] > e && r++, s) {
      for (let f = 0; f < n; f++)
        if (o[a + f] >= e) {
          l++;
          break;
        }
    } else
      for (let f = 0; f < n; f++)
        if (o[a + f] <= e) {
          l++;
          break;
        }
  }
  return {
    endAbovePct: r / i * 100,
    touchPct: l / i * 100
  };
}
function jc(t, e) {
  const { horizon: n, nPaths: i, pathsPct: o } = t;
  if (i < 1 || n < 1 || !Number.isFinite(e)) return 0;
  const s = n - 1;
  let r = 0;
  if (e >= 0)
    for (let l = 0; l < i; l++)
      o[l * n + s] >= e && r++;
  else
    for (let l = 0; l < i; l++)
      o[l * n + s] <= e && r++;
  return r / i * 100;
}
const se = 24, re = 7;
function Jc(t) {
  const e = new Float64Array(se), n = new Float64Array(se), i = new Float64Array(se), o = new Int32Array(se), s = new Float64Array(re), r = new Float64Array(re), l = new Float64Array(re), c = new Int32Array(re);
  let a = 1 / 0, f = -1 / 0;
  for (let g = 0; g < t.length; g++) {
    const b = t[g];
    if (!Number.isFinite(b.time) || !Number.isFinite(b.open) || !Number.isFinite(b.close) || !Number.isFinite(b.volume) || b.open === 0)
      continue;
    b.time < a && (a = b.time), b.time > f && (f = b.time);
    const A = new Date(b.time), T = A.getUTCHours(), P = A.getUTCDay(), N = (b.close / b.open - 1) * 100, L = Math.abs(N);
    e[T] += L, n[T] += N, i[T] += b.volume, o[T]++, s[P] += L, r[P] += N, l[P] += b.volume, c[P]++;
  }
  const h = (g, b, A, T) => T > 0 ? {
    meanAbsReturnPct: g / T,
    meanReturnPct: b / T,
    meanVolume: A / T,
    samples: T
  } : { meanAbsReturnPct: 0, meanReturnPct: 0, meanVolume: 0, samples: 0 }, u = new Array(se);
  for (let g = 0; g < se; g++)
    u[g] = h(e[g], n[g], i[g], o[g]);
  const p = new Array(re);
  for (let g = 0; g < re; g++)
    p[g] = h(s[g], r[g], l[g], c[g]);
  return {
    byHourUtc: u,
    byWeekdayUtc: p,
    candleCount: t.length,
    fromTime: Number.isFinite(a) ? a : 0,
    toTime: Number.isFinite(f) ? f : 0
  };
}
const Kc = 55, Bn = 256, Zc = 0.12, Xn = 5e-3, Qc = 0.3, zc = 0.5, xc = 0.28, tf = 0.35, ef = 0.25, bi = 0.28, nf = [0, 3, 5, 7, 10], of = 3, sf = 220, xe = [];
for (let t = 0; t < of; t++)
  for (const e of nf)
    xe.push(sf * Math.pow(2, t + e / 12));
class ts {
  constructor() {
    ot(this, "ctx", null);
    ot(this, "masterGain", null);
    ot(this, "delay", null);
    ot(this, "_running", !1);
    // Rolling window of log(1+qty) values, as a ring buffer.
    ot(this, "sizes", new Float64Array(Bn));
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
    const e = this.ctx, n = this.masterGain;
    if (!e || !n) return;
    this.suspendTimer !== null && (clearTimeout(this.suspendTimer), this.suspendTimer = null), e.state !== "running" && await e.resume();
    const i = e.currentTime, o = n.gain;
    o.cancelScheduledValues(i), o.setValueAtTime(Math.max(o.value, 1e-4), i), o.exponentialRampToValueAtTime(Zc, i + 0.08), this._running = !0;
  }
  /** Fade out, then suspend the context. Restartable via start(). */
  stop() {
    this._running = !1, this.tickTimer !== null && (clearTimeout(this.tickTimer), this.tickTimer = null), this.pending.buy = null, this.pending.sell = null;
    const e = this.ctx, n = this.masterGain;
    if (!e || !n) return;
    const i = e.currentTime, o = n.gain;
    o.cancelScheduledValues(i), o.setValueAtTime(Math.max(o.value, 1e-4), i), o.exponentialRampToValueAtTime(1e-4, i + 0.12), this.suspendTimer !== null && clearTimeout(this.suspendTimer), this.suspendTimer = setTimeout(() => {
      this.suspendTimer = null, !this._running && this.ctx && this.ctx.state === "running" && this.ctx.suspend().catch(() => {
      });
    }, 180);
  }
  /** Feed one live trade. Cheap no-op while stopped. */
  onTrade(e) {
    if (!this._running || !this.ctx || !(e.qty > 0)) return;
    this.pushSize(Math.log1p(e.qty));
    const n = this.pending[e.side];
    n ? n.qty += e.qty : this.pending[e.side] = { qty: e.qty, firstAt: performance.now() }, this.tickTimer === null && (this.flushOne(), this.scheduleTick());
  }
  // ----- internals -----
  /** Lazily build the node graph. Returns false if Web Audio is unavailable. */
  ensureGraph() {
    if (this.ctx) return !0;
    const e = globalThis, n = e.AudioContext ?? e.webkitAudioContext;
    if (!n) return !1;
    const i = new n(), o = i.createGain();
    o.gain.value = 1e-4;
    const s = i.createDynamicsCompressor();
    s.threshold.value = -22, s.knee.value = 18, s.ratio.value = 5, s.attack.value = 4e-3, s.release.value = 0.22, o.connect(s), s.connect(i.destination);
    const r = i.createDelay(1);
    r.delayTime.value = xc;
    const l = i.createGain();
    l.gain.value = tf;
    const c = i.createGain();
    return c.gain.value = ef, r.connect(l), l.connect(r), r.connect(c), c.connect(o), this.ctx = i, this.masterGain = o, this.delay = r, !0;
  }
  /** One rate-limit tick: keep ticking only while there is something pending. */
  scheduleTick() {
    this.tickTimer = setTimeout(() => {
      this.tickTimer = null, this._running && (this.pending.buy || this.pending.sell) && (this.flushOne(), this.scheduleTick());
    }, Kc);
  }
  /**
   * Play at most ONE pending note (strict ≤ ~18 notes/sec). If both sides are
   * waiting, the side whose first trade arrived earlier goes first; the other
   * keeps accumulating until the next tick.
   */
  flushOne() {
    const { buy: e, sell: n } = this.pending;
    let i;
    if (e && n) i = e.firstAt <= n.firstAt ? "buy" : "sell";
    else if (e) i = "buy";
    else if (n) i = "sell";
    else return;
    const o = this.pending[i];
    this.pending[i] = null, o && this.playNote(i, o.qty);
  }
  playNote(e, n) {
    const i = this.ctx, o = this.masterGain, s = this.delay;
    if (!i || !o || !s || i.state !== "running") return;
    const r = Math.log1p(Math.max(0, n)), l = this.percentile(r), c = this.velocity(r), a = Math.min(xe.length - 1, Math.max(0, Math.floor(l * xe.length)));
    let f = xe[a];
    e === "sell" && (f /= 2);
    const h = i.currentTime + 1e-3, u = Qc + zc * c, p = 0.18 + 0.82 * c, g = i.createOscillator();
    g.type = e === "buy" ? "sine" : "triangle", g.frequency.value = f;
    const b = i.createGain();
    b.gain.setValueAtTime(1e-4, h), b.gain.linearRampToValueAtTime(p, h + Xn), b.gain.exponentialRampToValueAtTime(1e-4, h + Xn + u), g.connect(b);
    let A = b;
    if (typeof i.createStereoPanner == "function") {
      const T = i.createStereoPanner();
      T.pan.value = e === "buy" ? bi : -bi, b.connect(T), A = T;
    }
    A.connect(o), A.connect(s), g.start(h), g.stop(h + Xn + u + 0.05), g.onended = () => {
      g.disconnect(), b.disconnect(), A !== b && A.disconnect();
    };
  }
  pushSize(e) {
    this.sizes[this.sizeIdx] = e, this.sizeIdx = (this.sizeIdx + 1) % Bn, this.sizeCount < Bn && this.sizeCount++;
  }
  /** Fraction of the rolling window at or below x. */
  percentile(e) {
    const n = this.sizeCount;
    if (n === 0) return 0.5;
    let i = 0;
    for (let o = 0; o < n; o++)
      this.sizes[o] <= e && i++;
    return i / n;
  }
  /** Loudness 0..1: log(1+qty) normalized by the rolling-window max, clamped. */
  velocity(e) {
    const n = this.sizeCount;
    if (n === 0) return 0.5;
    let i = 0;
    for (let o = 0; o < n; o++)
      this.sizes[o] > i && (i = this.sizes[o]);
    return i <= 0 ? 0.5 : Math.min(1, Math.max(0.05, e / i));
  }
}
const rf = new ts(), Mf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  TradeSonifier: ts,
  buildEchoScan: Hc,
  buildOracle: qc,
  computeMarketClock: Jc,
  findSimilar: xi,
  probabilityAtLeast: jc,
  resampleStroke: Vc,
  sonifier: rf,
  targetOdds: Uc,
  zNormalize: zi
}, Symbol.toStringTag, { value: "Module" })), lf = 10, af = 1, cf = 10, es = {
  upColor: "#26a69a",
  downColor: "#ef5350",
  gridVisible: !1,
  crosshairVisible: !0,
  alertSound: !0,
  alertTune: 0,
  alertDuration: 2
};
function wf(t) {
  return typeof t == "number" && Number.isInteger(t) && t >= 0 && t < lf ? t : es.alertTune;
}
function ff(t) {
  return typeof t != "number" || !Number.isFinite(t) ? es.alertDuration : Math.min(cf, Math.max(af, Math.round(t)));
}
function it(t, e, n) {
  const { type: i = "sine", freq: o, freqTo: s, start: r, dur: l, peak: c = 0.2 } = n, a = t.createGain();
  a.connect(e);
  const f = Math.min(0.012, l * 0.25);
  a.gain.setValueAtTime(1e-4, r), a.gain.exponentialRampToValueAtTime(c, r + f), a.gain.exponentialRampToValueAtTime(1e-4, r + l);
  const h = t.createOscillator();
  h.type = i, h.frequency.setValueAtTime(o, r), s !== void 0 && h.frequency.exponentialRampToValueAtTime(Math.max(1, s), r + l), h.connect(a), h.start(r), h.stop(r + l + 0.03);
}
function It(t, e, n, i) {
  const o = Math.max(1, Math.ceil(e / n));
  for (let s = 0; s < o; s++) {
    const r = t + s * n;
    if (r >= t + e - 1e-3) break;
    i(r, s);
  }
}
const Qn = [
  {
    name: "Classic beep",
    render: (t, e, n, i) => It(n, i, 0.5, (o) => {
      it(t, e, { freq: 880, start: o, dur: 0.15 }), it(t, e, { freq: 1320, start: o + 0.17, dur: 0.15 });
    })
  },
  {
    name: "Chime",
    render: (t, e, n, i) => It(n, i, 0.95, (o) => {
      it(t, e, { type: "triangle", freq: 1318, start: o, dur: 0.85, peak: 0.18 }), it(t, e, { type: "triangle", freq: 1047, start: o + 0.12, dur: 0.8, peak: 0.14 });
    })
  },
  {
    name: "Ping",
    render: (t, e, n, i) => It(n, i, 0.6, (o) => it(t, e, { freq: 1568, start: o, dur: 0.35, peak: 0.22 }))
  },
  {
    name: "Rising alert",
    render: (t, e, n, i) => It(
      n,
      i,
      0.7,
      (o) => it(t, e, { type: "sawtooth", freq: 440, freqTo: 1760, start: o, dur: 0.5, peak: 0.14 })
    )
  },
  {
    name: "Falling alert",
    render: (t, e, n, i) => It(
      n,
      i,
      0.7,
      (o) => it(t, e, { type: "sawtooth", freq: 1760, freqTo: 440, start: o, dur: 0.5, peak: 0.14 })
    )
  },
  {
    name: "Pulse",
    render: (t, e, n, i) => It(n, i, 0.2, (o) => it(t, e, { type: "square", freq: 1100, start: o, dur: 0.09, peak: 0.12 }))
  },
  {
    name: "Marimba",
    render: (t, e, n, i) => It(n, i, 0.62, (o) => {
      it(t, e, { type: "triangle", freq: 523, start: o, dur: 0.2, peak: 0.18 }), it(t, e, { type: "triangle", freq: 659, start: o + 0.12, dur: 0.2, peak: 0.16 }), it(t, e, { type: "triangle", freq: 784, start: o + 0.24, dur: 0.22, peak: 0.16 });
    })
  },
  {
    name: "Siren",
    render: (t, e, n, i) => {
      const o = t.createGain();
      o.connect(e), o.gain.setValueAtTime(1e-4, n), o.gain.exponentialRampToValueAtTime(0.16, n + 0.05), o.gain.setValueAtTime(0.16, Math.max(n + 0.06, n + i - 0.08)), o.gain.exponentialRampToValueAtTime(1e-4, n + i);
      const s = t.createOscillator();
      s.type = "sine", s.frequency.setValueAtTime(620, n);
      const r = 0.4;
      let l = 0;
      for (let c = n; c < n + i; l++, c += r)
        s.frequency.linearRampToValueAtTime(l % 2 === 0 ? 980 : 620, Math.min(n + i, c + r));
      s.connect(o), s.start(n), s.stop(n + i + 0.03);
    }
  },
  {
    name: "Arpeggio",
    render: (t, e, n, i) => It(
      n,
      i,
      1,
      (o) => [440, 554, 659, 880].forEach(
        (s, r) => it(t, e, { freq: s, start: o + r * 0.18, dur: 0.24, peak: 0.16 })
      )
    )
  },
  {
    name: "Digital",
    render: (t, e, n, i) => It(n, i, 0.5, (o) => {
      it(t, e, { type: "square", freq: 1047, start: o, dur: 0.1, peak: 0.1 }), it(t, e, { type: "square", freq: 1568, start: o + 0.12, dur: 0.1, peak: 0.1 }), it(t, e, { type: "square", freq: 1319, start: o + 0.26, dur: 0.12, peak: 0.1 });
    })
  }
], Sf = Qn.map((t, e) => ({
  id: e,
  name: t.name
}));
function hf(t, e) {
  const n = window, i = n.AudioContext ?? n.webkitAudioContext;
  if (!i) return () => {
  };
  let o;
  try {
    o = new i();
  } catch {
    return () => {
    };
  }
  o.resume().catch(() => {
  });
  const s = ff(e), r = Qn[t] ?? Qn[0], l = o.createGain();
  l.gain.value = 0.85, l.connect(o.destination);
  const c = o.currentTime + 0.03;
  try {
    r.render(o, l, c, s);
  } catch {
  }
  let a = !1;
  const f = () => {
    a || (a = !0, o.close().catch(() => {
    }));
  }, h = window.setTimeout(f, (s + 0.5) * 1e3);
  return () => {
    window.clearTimeout(h), f();
  };
}
function uf(t) {
  if (!Number.isFinite(t)) return "—";
  const e = Math.abs(t);
  if (e >= 1e3)
    return t.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (e >= 1) return t.toFixed(2);
  if (e === 0) return "0.00";
  const n = t.toPrecision(4);
  return n.includes("e") ? t.toFixed(8) : String(parseFloat(n));
}
async function Pf() {
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
  const e = `${t.symbol} crossed ${t.condition} ${uf(t.price)}`;
  return t.message && t.message.trim() !== "" ? `${e} — ${t.message.trim()}` : e;
}
function pf(t) {
  if (typeof Notification > "u" || Notification.permission !== "granted") return !1;
  try {
    return new Notification("CandL price alert", { body: ns(t), tag: t.id }), !0;
  } catch {
    return !1;
  }
}
function mf(t) {
  if (typeof document > "u") return;
  const e = document.createElement("div");
  e.className = "alert-toast", e.setAttribute("role", "status"), e.textContent = ns(t), document.body.appendChild(e), requestAnimationFrame(() => e.classList.add("show"));
  const n = () => {
    e.classList.remove("show"), window.setTimeout(() => e.remove(), 250);
  };
  window.setTimeout(n, 6e3), e.addEventListener("click", n);
}
function Af(t) {
  const { symbol: e, price: n, prevPrice: i, alerts: o, soundOn: s, tune: r, tuneDurationSec: l, onTriggered: c } = t;
  if (Number.isFinite(n))
    for (const a of o) {
      if (a.symbol !== e || a.triggered) continue;
      let f;
      a.condition === "above" ? f = (i === null || i < a.price) && n >= a.price : f = (i === null || i > a.price) && n <= a.price, f && (pf(a) || mf(a), s && hf(r, l), c(a.id, Date.now()));
    }
}
const kf = ["1s", "15s", "30s", "1m", "5m", "15m", "30m", "1h", "4h", "1d", "1w"], Lf = {
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
}, If = {
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
  cf as ALERT_DURATION_MAX,
  af as ALERT_DURATION_MIN,
  Sf as ALERT_TUNES,
  lf as ALERT_TUNE_COUNT,
  Pa as DEFAULT_DRAWING_COLOR,
  es as DEFAULT_SETTINGS,
  bf as DRAWING_TOOLS,
  ar as FIBEXT_LEVELS,
  Ai as FIBEXT_LEVEL_COLORS,
  Mn as FIB_LEVELS,
  Pi as FIB_LEVEL_COLORS,
  tn as HANDLE_TOLERANCE,
  Os as HIT_TOLERANCE,
  Bc as INDICATORS,
  kf as INTERVALS,
  If as INTERVAL_LABELS,
  Lf as INTERVAL_MS,
  Sa as TOOL_GROUPS,
  Jt as TOOL_IMPLS,
  Af as checkAndFireAlerts,
  ff as clampAlertDuration,
  wf as clampAlertTune,
  df as createChartEngine,
  _n as defaultDrawing,
  Pf as ensureNotificationPermission,
  Eo as fibExtLevelPrice,
  _o as fibLevelPrice,
  Et as formatPrice,
  Tf as getIndicator,
  ri as hitTestDrawing,
  li as hitTestHandle,
  Mf as lab,
  ka as movePoint,
  hf as playTune,
  Ke as pointsNeeded,
  En as renderDrawing,
  po as toolImpl,
  Aa as translateDrawing
};
//# sourceMappingURL=candl-charts.js.map
