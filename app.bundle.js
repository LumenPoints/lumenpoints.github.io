"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// Shared SVG assets: star-glyph representation for the 5 dimensions
// Colors per spec: Trends=light green, Body=grey, Blood=terracotta, Skin=purple, Mind=forest green

window.LP_COLORS = {
  trends: '#B8C9A6',
  // light green
  body: '#9A9692',
  // grey
  blood: '#C5725C',
  // terracotta
  skin: '#7E6B87',
  // muted purple
  mind: '#2F4438' // forest green
};

// Five-pointed star glyph — each point uses one of the dimension colors.
// Used as a compact brand mark across directions.
window.LP_StarMark = function LP_StarMark(_ref) {
  var _ref$size = _ref.size,
    size = _ref$size === void 0 ? 80 : _ref$size,
    _ref$muted = _ref.muted,
    muted = _ref$muted === void 0 ? false : _ref$muted,
    _ref$bg = _ref.bg,
    bg = _ref$bg === void 0 ? 'transparent' : _ref$bg;
  var c = window.LP_COLORS;
  var points = [{
    angle: -90,
    color: c.trends,
    label: 'Trends'
  }, {
    angle: -18,
    color: c.body,
    label: 'Body'
  }, {
    angle: 54,
    color: c.blood,
    label: 'Blood'
  }, {
    angle: 126,
    color: c.skin,
    label: 'Skin'
  }, {
    angle: 198,
    color: c.mind,
    label: 'Mind'
  }];
  var cx = 50,
    cy = 50,
    outer = 44,
    inner = 17;
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 100",
    width: size,
    height: size,
    style: {
      background: bg,
      display: 'block'
    }
  }, points.map(function (p, i) {
    var next = points[(i + 1) % 5];
    var a1 = p.angle * Math.PI / 180;
    var a2 = (p.angle + 36) * Math.PI / 180;
    var a3 = next.angle * Math.PI / 180;
    var x1 = cx + outer * Math.cos(a1),
      y1 = cy + outer * Math.sin(a1);
    var x2 = cx + inner * Math.cos(a2),
      y2 = cy + inner * Math.sin(a2);
    var x3 = cx + outer * Math.cos(a3),
      y3 = cy + outer * Math.sin(a3);
    var path = "M".concat(cx, ",").concat(cy, " L").concat(x1, ",").concat(y1, " L").concat(x2, ",").concat(y2, " Z M").concat(cx, ",").concat(cy, " L").concat(x2, ",").concat(y2, " L").concat(x3, ",").concat(y3, " Z");
    return /*#__PURE__*/React.createElement("path", {
      key: i,
      d: path,
      fill: muted ? 'currentColor' : p.color,
      opacity: muted ? 0.85 : 1
    });
  }));
};

// Monochrome outline version (for dark backgrounds or minimalist layouts)
window.LP_StarOutline = function LP_StarOutline(_ref2) {
  var _ref2$size = _ref2.size,
    size = _ref2$size === void 0 ? 80 : _ref2$size,
    _ref2$color = _ref2.color,
    color = _ref2$color === void 0 ? 'currentColor' : _ref2$color,
    _ref2$strokeWidth = _ref2.strokeWidth,
    strokeWidth = _ref2$strokeWidth === void 0 ? 1 : _ref2$strokeWidth;
  var cx = 50,
    cy = 50,
    outer = 44,
    inner = 17;
  var pts = [];
  for (var i = 0; i < 5; i++) {
    var aOuter = (-90 + i * 72) * Math.PI / 180;
    var aInner = (-90 + i * 72 + 36) * Math.PI / 180;
    pts.push([cx + outer * Math.cos(aOuter), cy + outer * Math.sin(aOuter)]);
    pts.push([cx + inner * Math.cos(aInner), cy + inner * Math.sin(aInner)]);
  }
  var d = 'M' + pts.map(function (p) {
    return p.join(',');
  }).join(' L') + ' Z';
  return /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 100 100",
    width: size,
    height: size,
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/React.createElement("path", {
    d: d,
    fill: "none",
    stroke: color,
    strokeWidth: strokeWidth,
    strokeLinejoin: "round"
  }));
};

// Image placeholder with monospace caption — for photography slots
window.LP_ImagePlaceholder = function LP_ImagePlaceholder(_ref3) {
  var caption = _ref3.caption,
    _ref3$tint = _ref3.tint,
    tint = _ref3$tint === void 0 ? '#e8e2d6' : _ref3$tint,
    _ref3$fg = _ref3.fg,
    fg = _ref3$fg === void 0 ? '#7a7169' : _ref3$fg,
    _ref3$aspect = _ref3.aspect,
    aspect = _ref3$aspect === void 0 ? '4/5' : _ref3$aspect,
    _ref3$style = _ref3.style,
    style = _ref3$style === void 0 ? {} : _ref3$style;
  return /*#__PURE__*/React.createElement("div", {
    style: _objectSpread({
      aspectRatio: aspect,
      background: "repeating-linear-gradient(135deg, ".concat(tint, ", ").concat(tint, " 12px, ").concat(shade(tint, -4), " 12px, ").concat(shade(tint, -4), " 24px)"),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: fg,
      fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
      fontSize: 11,
      letterSpacing: '0.08em',
      textTransform: 'uppercase'
    }, style)
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      padding: '6px 12px',
      background: 'rgba(255,255,255,0.7)',
      borderRadius: 2
    }
  }, caption));
};
function shade(hex, delta) {
  // simple shade helper — delta in -100..100
  var m = hex.match(/^#([0-9a-f]{6})$/i);
  if (!m) return hex;
  var n = parseInt(m[1], 16);
  var r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  r = Math.max(0, Math.min(255, r + delta));
  g = Math.max(0, Math.min(255, g + delta));
  b = Math.max(0, Math.min(255, b + delta));
  return '#' + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
}

"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
// Direction 3 — Soft Dark / Night Mode Premium
// Deep charcoal-green + warm cream. Display serif + refined sans.
// The 5 dimension colors as hero data accents.

var D3 = {
  bg: '#161C19',
  // deep charcoal-forest
  bgAlt: '#1E2623',
  cream: '#EDE6D6',
  creamSoft: 'rgba(237,230,214,0.68)',
  rule: 'rgba(237,230,214,0.14)',
  terracotta: '#D48A72',
  gold: '#C9A978'
};
var d3Styles = {
  page: {
    width: 1440,
    background: D3.bg,
    color: D3.cream,
    fontFamily: '"Instrument Sans", system-ui, sans-serif'
  },
  display: {
    fontFamily: '"Cormorant Garamond", "Garamond", serif',
    fontWeight: 400
  },
  mono: {
    fontFamily: 'ui-monospace, "JetBrains Mono", monospace',
    fontSize: 13,
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: D3.creamSoft
  },
  body: {
    fontFamily: '"Instrument Sans", sans-serif',
    fontSize: 17,
    lineHeight: 1.65,
    color: D3.creamSoft
  }
};
function D3_Nav() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '32px 72px',
      borderBottom: "1px solid ".concat(D3.rule)
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement(LP_StarMark, {
    size: 56
  }), /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, d3Styles.display), {}, {
      fontSize: 48,
      letterSpacing: '0.04em',
      lineHeight: 1
    })
  }, /*#__PURE__*/React.createElement("span", null, "Lumen"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: D3.terracotta,
      fontStyle: 'italic'
    }
  }, "Points"))), /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({
      display: 'flex',
      gap: 44
    }, d3Styles.mono), {}, {
      fontSize: 17,
      letterSpacing: '0.18em'
    })
  }, /*#__PURE__*/React.createElement("span", null, "The Method"), /*#__PURE__*/React.createElement("span", null, "Five Points"), /*#__PURE__*/React.createElement("span", null, "Founding"), /*#__PURE__*/React.createElement("span", null, "Stories")), /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({
      padding: '14px 28px',
      border: "1px solid ".concat(D3.cream)
    }, d3Styles.mono), {}, {
      fontSize: 16,
      letterSpacing: '0.2em',
      color: D3.cream,
      borderRadius: 1
    })
  }, "Join Waitlist"));
}
function D3_Hero() {
  var c = LP_COLORS;
  var points = [{
    label: 'Trends',
    color: c.trends,
    angle: -90
  }, {
    label: 'Body',
    color: c.body,
    angle: -18
  }, {
    label: 'Blood',
    color: c.blood,
    angle: 54
  }, {
    label: 'Skin',
    color: c.skin,
    angle: 126
  }, {
    label: 'Mind',
    color: c.mind,
    angle: 198
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '60px 72px 120px',
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: -80,
      right: -80,
      width: 600,
      height: 600,
      opacity: 0.5,
      background: "radial-gradient(circle, rgba(212,138,114,0.25) 0%, transparent 65%)",
      filter: 'blur(20px)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 520px',
      gap: 60,
      alignItems: 'center',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, d3Styles.mono), {}, {
      fontSize: 20,
      letterSpacing: '0.22em',
      color: D3.terracotta,
      marginBottom: 36
    })
  }, "\u2726 Founding Access \xB7 May 10 \xB7 100 Spots"), /*#__PURE__*/React.createElement("h1", {
    style: _objectSpread(_objectSpread({}, d3Styles.display), {}, {
      fontSize: 140,
      lineHeight: 0.96,
      margin: 0,
      letterSpacing: '-0.02em',
      color: D3.cream
    })
  }, "Illuminate", /*#__PURE__*/React.createElement("br", null), "every point", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic',
      color: D3.gold
    }
  }, "of your health.")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 48,
      maxWidth: 560,
      paddingLeft: 28,
      borderLeft: "1px solid ".concat(D3.gold)
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, d3Styles.display), {}, {
      fontSize: 36,
      fontStyle: 'italic',
      color: D3.gold,
      lineHeight: 1.15,
      letterSpacing: '-0.01em',
      marginBottom: 24
    })
  }, "\"What gets measured,", /*#__PURE__*/React.createElement("br", null), "gets managed.\""), /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, d3Styles.body), {}, {
      fontSize: 19,
      lineHeight: 1.65,
      color: 'rgba(237,230,214,0.82)'
    })
  }, "LumenPoints unifies the five dimensions of your wellness into a single, legible system \u2014 so the work you're already doing becomes the signal you can actually read.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      marginTop: 48,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({
      padding: '18px 34px',
      background: D3.cream,
      color: D3.bg
    }, d3Styles.mono), {}, {
      fontSize: 14,
      letterSpacing: '0.18em'
    })
  }, "Claim Founding \xB7 $349"), /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({
      padding: '18px 30px',
      border: "1px solid ".concat(D3.rule)
    }, d3Styles.mono), {}, {
      fontSize: 14,
      color: D3.creamSoft
    })
  }, "Join Waitlist"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '1',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 500 500",
    width: "100%",
    style: {
      overflow: 'visible'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: "250",
    cy: "250",
    r: "200",
    fill: "none",
    stroke: D3.rule,
    strokeWidth: "1"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "250",
    cy: "250",
    r: "140",
    fill: "none",
    stroke: D3.rule,
    strokeWidth: "1",
    strokeDasharray: "2 4"
  }), /*#__PURE__*/React.createElement("circle", {
    cx: "250",
    cy: "250",
    r: "80",
    fill: "none",
    stroke: D3.rule,
    strokeWidth: "1"
  }), function () {
    var cx = 250,
      cy = 250,
      outer = 200,
      inner = 78;
    var pts = [];
    for (var i = 0; i < 5; i++) {
      var aO = (-90 + i * 72) * Math.PI / 180;
      var aI = (-90 + i * 72 + 36) * Math.PI / 180;
      pts.push([cx + outer * Math.cos(aO), cy + outer * Math.sin(aO)]);
      pts.push([cx + inner * Math.cos(aI), cy + inner * Math.sin(aI)]);
    }
    var path = 'M' + pts.map(function (p) {
      return p.join(',');
    }).join(' L') + ' Z';
    return /*#__PURE__*/React.createElement("path", {
      d: path,
      fill: "none",
      stroke: D3.gold,
      strokeWidth: "1.2",
      strokeLinejoin: "round",
      opacity: "0.5"
    });
  }(), points.map(function (p, i) {
    var a = p.angle * Math.PI / 180;
    var x = 250 + 200 * Math.cos(a);
    var y = 250 + 200 * Math.sin(a);
    var lx = 250 + 230 * Math.cos(a);
    var ly = 250 + 230 * Math.sin(a);
    return /*#__PURE__*/React.createElement("g", {
      key: i
    }, /*#__PURE__*/React.createElement("circle", {
      cx: x,
      cy: y,
      r: "9",
      fill: p.color
    }), /*#__PURE__*/React.createElement("circle", {
      cx: x,
      cy: y,
      r: "16",
      fill: "none",
      stroke: p.color,
      strokeWidth: "1",
      opacity: "0.4"
    }), /*#__PURE__*/React.createElement("text", {
      x: lx,
      y: ly,
      fill: D3.cream,
      fontFamily: "ui-monospace, monospace",
      fontSize: "14",
      letterSpacing: "2.5",
      textAnchor: Math.cos(a) > 0.2 ? 'start' : Math.cos(a) < -0.2 ? 'end' : 'middle',
      dy: "0.35em"
    }, p.label.toUpperCase()));
  }), /*#__PURE__*/React.createElement("g", {
    transform: "translate(250, 250)"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M0,-34 C18,-10 26,6 26,18 A26,26 0 1 1 -26,18 C-26,6 -18,-10 0,-34 Z",
    fill: LP_COLORS.blood
  }), /*#__PURE__*/React.createElement("ellipse", {
    cx: "-8",
    cy: "8",
    rx: "5",
    ry: "8",
    fill: "rgba(255,255,255,0.18)",
    transform: "rotate(-20)"
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      marginTop: 80,
      borderTop: "1px solid ".concat(D3.rule),
      borderBottom: "1px solid ".concat(D3.rule)
    }
  }, [['5', 'Dimensions tracked'], ['100', 'Founding memberships'], ['$349', 'Lifetime, one-time'], ['May 10', 'iOS launch']].map(function (_ref, i) {
    var _ref2 = _slicedToArray(_ref, 2),
      n = _ref2[0],
      l = _ref2[1];
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        padding: '28px 24px',
        borderLeft: i > 0 ? "1px solid ".concat(D3.rule) : 'none'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: _objectSpread(_objectSpread({}, d3Styles.display), {}, {
        fontSize: 52,
        letterSpacing: '-0.01em'
      })
    }, n), /*#__PURE__*/React.createElement("div", {
      style: _objectSpread(_objectSpread({}, d3Styles.mono), {}, {
        marginTop: 8
      })
    }, l));
  })));
}
function D3_Quote() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '120px 72px',
      background: D3.bgAlt,
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, d3Styles.mono), {}, {
      fontSize: 26,
      marginBottom: 40
    })
  }, "\u2726 The Premise"), /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, d3Styles.display), {}, {
      fontSize: 88,
      lineHeight: 1.12,
      letterSpacing: '-0.015em',
      maxWidth: 1200,
      margin: '0 auto'
    })
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic',
      color: D3.gold
    }
  }, "One Place."), ' ', /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic',
      color: D3.gold
    }
  }, "Every Metric."), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic',
      color: D3.gold
    }
  }, "Full Clarity.")), /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, d3Styles.body), {}, {
      fontSize: 22,
      lineHeight: 1.55,
      color: 'rgba(237,230,214,0.85)',
      marginTop: 48,
      maxWidth: 860,
      margin: '48px auto 0'
    })
  }, "Your wellness has been scattered across a dozen apps, a notes file, a shoebox of labs, and your memory. LumenPoints is the first place where all five dimensions live together \u2014 so the pattern, finally, has somewhere to emerge."));
}
function D3_ForHer() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '140px 72px',
      borderTop: "1px solid ".concat(D3.rule),
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '50%',
      right: -120,
      width: 520,
      height: 520,
      transform: 'translateY(-50%)',
      background: "radial-gradient(circle, ".concat(LP_COLORS.skin, "22 0%, transparent 65%)"),
      filter: 'blur(30px)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 100,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, d3Styles.mono), {}, {
      fontSize: 26,
      color: D3.gold,
      marginBottom: 32
    })
  }, "\u2726 Who It's For"), /*#__PURE__*/React.createElement("h2", {
    style: _objectSpread(_objectSpread({}, d3Styles.display), {}, {
      fontSize: 96,
      lineHeight: 1,
      margin: 0,
      letterSpacing: '-0.02em',
      color: D3.cream
    })
  }, "Built for the one", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic',
      color: D3.gold
    }
  }, "holding it all together.")), /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, d3Styles.body), {}, {
      fontSize: 21,
      lineHeight: 1.55,
      color: 'rgba(237,230,214,0.88)',
      marginTop: 40,
      maxWidth: 540
    })
  }, "You're trying to manage your own wellness, helping your partner stay organized with theirs, your aging parent with their medications, and your teenager with their finicky skincare."), /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, d3Styles.body), {}, {
      fontSize: 19,
      lineHeight: 1.65,
      color: 'rgba(237,230,214,0.72)',
      marginTop: 24,
      maxWidth: 540
    })
  }, "No one in wellness is speaking to you. LumenPoints is built for you \u2014 the one carrying the clipboard for everyone you love.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 1,
      background: D3.rule,
      border: "1px solid ".concat(D3.rule)
    }
  }, [['Her stack', "Peptides, bloodwork, HRT, the serum she's been testing for six weeks."], ['His stack', 'Training blocks, supplements, the labs he keeps meaning to schedule.'], ['Her mother', 'Four medications, two specialists, a calendar she holds in her head.'], ['Her teenager', "The skincare routine that finally worked \u2014 if she can remember which product started it."]].map(function (_ref3, i) {
    var _ref4 = _slicedToArray(_ref3, 2),
      who = _ref4[0],
      what = _ref4[1];
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        padding: 32,
        background: D3.bg
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: _objectSpread(_objectSpread({}, d3Styles.mono), {}, {
        fontSize: 12,
        color: D3.gold,
        marginBottom: 14
      })
    }, "0", i + 1), /*#__PURE__*/React.createElement("div", {
      style: _objectSpread(_objectSpread({}, d3Styles.display), {}, {
        fontSize: 26,
        fontStyle: 'italic',
        color: D3.cream,
        marginBottom: 12
      })
    }, who), /*#__PURE__*/React.createElement("div", {
      style: _objectSpread(_objectSpread({}, d3Styles.body), {}, {
        fontSize: 15,
        lineHeight: 1.55,
        color: 'rgba(237,230,214,0.72)'
      })
    }, what));
  })), /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({
      marginTop: 28
    }, d3Styles.body), {}, {
      fontSize: 15,
      fontStyle: 'italic',
      color: 'rgba(237,230,214,0.6)',
      textAlign: 'right'
    })
  }, "Four people. One mind holding it all."))));
}
function D3_Dimension(_ref5) {
  var n = _ref5.n,
    label = _ref5.label,
    color = _ref5.color,
    title = _ref5.title,
    body = _ref5.body,
    _ref5$align = _ref5.align,
    align = _ref5$align === void 0 ? 'left' : _ref5$align;
  var reversed = align === 'right';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '110px 72px',
      borderTop: "1px solid ".concat(D3.rule),
      display: 'grid',
      gridTemplateColumns: reversed ? '460px 1fr' : '1fr 460px',
      gap: 80,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      order: reversed ? 2 : 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 22,
      marginBottom: 40
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 20,
      height: 20,
      borderRadius: '50%',
      background: color,
      boxShadow: "0 0 28px ".concat(color)
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: _objectSpread(_objectSpread({}, d3Styles.mono), {}, {
      fontSize: 32,
      letterSpacing: '0.18em',
      color: color,
      fontWeight: 600
    })
  }, "0", n, " \xB7 ", label)), /*#__PURE__*/React.createElement("h3", {
    style: _objectSpread(_objectSpread({}, d3Styles.display), {}, {
      fontSize: 72,
      lineHeight: 1.05,
      margin: 0,
      letterSpacing: '-0.015em',
      color: D3.cream
    })
  }, title), /*#__PURE__*/React.createElement("p", {
    style: _objectSpread(_objectSpread({}, d3Styles.body), {}, {
      fontSize: 19,
      marginTop: 32,
      maxWidth: 480,
      color: 'rgba(237,230,214,0.82)'
    })
  }, body)), /*#__PURE__*/React.createElement("div", {
    style: {
      order: reversed ? 1 : 2,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: -30,
      background: "radial-gradient(circle, ".concat(color, "22 0%, transparent 70%)"),
      filter: 'blur(20px)'
    }
  }), /*#__PURE__*/React.createElement(LP_ImagePlaceholder, {
    caption: "".concat(label, " \xB7 app screen"),
    aspect: "4/5",
    tint: "#222A26",
    fg: "rgba(237,230,214,0.5)",
    style: {
      position: 'relative',
      border: "1px solid ".concat(D3.rule)
    }
  })));
}
function D3_Founding() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '140px 72px',
      borderTop: "1px solid ".concat(D3.rule),
      background: D3.bgAlt,
      position: 'relative',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: 800,
      height: 800,
      transform: 'translate(-50%, -50%)',
      borderRadius: '50%',
      background: "radial-gradient(circle, rgba(201,169,120,0.12) 0%, transparent 60%)",
      filter: 'blur(30px)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'grid',
      gridTemplateColumns: '1.1fr 1fr',
      gap: 80,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, d3Styles.mono), {}, {
      fontSize: 26,
      color: D3.gold,
      marginBottom: 32,
      lineHeight: 1.4
    })
  }, "\u2726 Founding", /*#__PURE__*/React.createElement("br", null), "Limited to One Hundred"), /*#__PURE__*/React.createElement("h2", {
    style: _objectSpread(_objectSpread({}, d3Styles.display), {}, {
      fontSize: 108,
      lineHeight: 0.98,
      margin: 0,
      letterSpacing: '-0.02em'
    })
  }, "A quiet", /*#__PURE__*/React.createElement("br", null), "invitation", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic',
      color: D3.gold
    }
  }, "for the serious.")), /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, d3Styles.body), {}, {
      fontSize: 20,
      marginTop: 40,
      maxWidth: 480,
      color: 'rgba(237,230,214,0.82)'
    })
  }, "Five lifetime benefits, one price, yours forever. For the hundred households who want to be first.")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 40,
      border: "1px solid ".concat(D3.rule),
      background: 'rgba(237,230,214,0.03)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      borderBottom: "1px solid ".concat(D3.rule),
      paddingBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, d3Styles.display), {}, {
      fontSize: 72,
      letterSpacing: '-0.02em'
    })
  }, "$349"), /*#__PURE__*/React.createElement("div", {
    style: _objectSpread({}, d3Styles.mono)
  }, "One time \xB7 Lifetime")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, ['Early access for your household', 'Premium feature unlock', 'Beta feedback channel', 'Founding member badge', 'Direct founder support'].map(function (t, i) {
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '14px 0',
        borderBottom: i < 4 ? "1px solid ".concat(D3.rule) : 'none'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: _objectSpread(_objectSpread({}, d3Styles.mono), {}, {
        color: D3.gold,
        width: 30
      })
    }, "0", i + 1), /*#__PURE__*/React.createElement("span", {
      style: _objectSpread(_objectSpread({}, d3Styles.body), {}, {
        color: D3.cream,
        fontSize: 17
      })
    }, t));
  })), /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({
      marginTop: 28,
      padding: '20px 0',
      background: D3.gold,
      color: D3.bg,
      textAlign: 'center'
    }, d3Styles.mono), {}, {
      fontSize: 14,
      letterSpacing: '0.2em',
      fontWeight: 600
    })
  }, "Claim Founding Spot"))));
}
function D3_Wordmark() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '180px 72px 160px',
      borderTop: "1px solid ".concat(D3.rule),
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: "radial-gradient(ellipse at center, ".concat(D3.gold, "14 0%, transparent 60%)")
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 40,
      marginBottom: 48
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 1,
      background: D3.rule,
      maxWidth: 280
    }
  }), /*#__PURE__*/React.createElement(LP_StarMark, {
    size: 72
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      height: 1,
      background: D3.rule,
      maxWidth: 280
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, d3Styles.display), {}, {
      fontSize: 200,
      lineHeight: 0.9,
      letterSpacing: '-0.035em',
      margin: 0
    })
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      color: D3.cream
    }
  }, "Lumen"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: D3.gold,
      fontStyle: 'italic'
    }
  }, "Points")), /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, d3Styles.display), {}, {
      fontSize: 44,
      fontStyle: 'italic',
      color: D3.gold,
      marginTop: 56,
      letterSpacing: '-0.01em',
      lineHeight: 1.2
    })
  }, "Every point of your health, illuminated.")));
}
function D3_Setup() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '130px 72px',
      borderTop: "1px solid ".concat(D3.rule)
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, d3Styles.mono), {}, {
      fontSize: 26,
      marginBottom: 56
    })
  }, "\u2726 How It Works"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 0
    }
  }, [['Download', 'Get LumenPoints from the App Store on May 10. iOS first — Android is on the roadmap.'], ['Set up household', 'Create profiles — adults, teens, everyone. Up to five profiles on Premium, each with their own stack, routines, and data.'], ['Start tracking', 'Log supplements, routines, and metrics. Upload bloodwork. Connect Apple Health. Then let LumenPoints do the connecting.']].map(function (_ref6, i) {
    var _ref7 = _slicedToArray(_ref6, 2),
      t = _ref7[0],
      b = _ref7[1];
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        padding: '0 36px',
        borderLeft: "1px solid ".concat(D3.rule)
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: _objectSpread(_objectSpread({}, d3Styles.display), {}, {
        fontSize: 100,
        letterSpacing: '-0.03em',
        color: D3.gold,
        lineHeight: 1
      })
    }, "0", i + 1), /*#__PURE__*/React.createElement("div", {
      style: _objectSpread(_objectSpread({}, d3Styles.display), {}, {
        fontSize: 42,
        fontStyle: 'italic',
        margin: '18px 0 24px',
        color: D3.cream
      })
    }, t), /*#__PURE__*/React.createElement("div", {
      style: _objectSpread(_objectSpread({}, d3Styles.body), {}, {
        fontSize: 20,
        lineHeight: 1.6
      })
    }, b));
  })));
}
function D3_Waitlist() {
  var _React$useState = React.useState(false),
    _React$useState2 = _slicedToArray(_React$useState, 2),
    submitted = _React$useState2[0],
    setSubmitted = _React$useState2[1];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '120px 72px',
      textAlign: 'center',
      borderTop: "1px solid ".concat(D3.rule)
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, d3Styles.mono), {}, {
      fontSize: 26,
      marginBottom: 28
    })
  }, "\u2726 The Waitlist"), /*#__PURE__*/React.createElement("h2", {
    style: _objectSpread(_objectSpread({}, d3Styles.display), {}, {
      fontSize: 100,
      lineHeight: 1,
      margin: 0,
      letterSpacing: '-0.02em'
    })
  }, "Be among the ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic',
      color: D3.gold
    }
  }, "first to know.")), submitted ? /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, d3Styles.display), {}, {
      fontSize: 32,
      fontStyle: 'italic',
      color: D3.gold,
      marginTop: 56
    })
  }, "Thank you. You're on the list.") : /*#__PURE__*/React.createElement("form", {
    action: "https://assets.mailerlite.com/jsonp/2279171/forms/185478669838320940/subscribe",
    method: "post",
    target: "_blank",
    onSubmit: function onSubmit() {
      return setTimeout(function () {
        return setSubmitted(true);
      }, 300);
    },
    style: {
      display: 'flex',
      maxWidth: 560,
      margin: '56px auto 0',
      borderBottom: "1px solid ".concat(D3.cream),
      paddingBottom: 16
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "email",
    name: "fields[email]",
    required: true,
    placeholder: "your@email.com",
    style: _objectSpread(_objectSpread({
      flex: 1,
      background: 'transparent',
      border: 0,
      outline: 'none'
    }, d3Styles.display), {}, {
      fontSize: 26,
      color: D3.cream
    })
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "ml-submit",
    value: "1"
  }), /*#__PURE__*/React.createElement("input", {
    type: "hidden",
    name: "anticsrf",
    value: "true"
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    style: _objectSpread(_objectSpread({
      background: 'transparent',
      border: 0
    }, d3Styles.mono), {}, {
      fontSize: 13,
      color: D3.gold,
      cursor: 'pointer',
      letterSpacing: '0.22em'
    })
  }, "Submit \u2192")));
}
function D3_Footer() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '72px 72px 48px',
      borderTop: "1px solid ".concat(D3.rule),
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(LP_StarMark, {
    size: 40
  }), /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, d3Styles.display), {}, {
      fontSize: 48,
      letterSpacing: '0.04em'
    })
  }, /*#__PURE__*/React.createElement("span", null, "Lumen"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: D3.terracotta,
      fontStyle: 'italic'
    }
  }, "Points"))), /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({}, d3Styles.mono), {}, {
      fontSize: 16,
      letterSpacing: '0.18em',
      marginTop: 18
    })
  }, "LumenPoints LLC \xB7 hello@lumenpoints.com")), /*#__PURE__*/React.createElement("div", {
    style: _objectSpread(_objectSpread({
      display: 'flex',
      gap: 44
    }, d3Styles.mono), {}, {
      fontSize: 16,
      letterSpacing: '0.18em'
    })
  }, /*#__PURE__*/React.createElement("a", {
    href: "https://app.termly.io/policy-viewer/policy.html?policyUUID=d9f94a0f-881f-48b2-94ae-eb0591489a96",
    target: "_blank",
    rel: "noopener",
    style: {
      color: 'inherit',
      textDecoration: 'none'
    }
  }, "Privacy"), /*#__PURE__*/React.createElement("a", {
    href: "https://app.termly.io/policy-viewer/policy.html?policyUUID=73a28b92-5f2c-451c-af83-287a56f51a67",
    target: "_blank",
    rel: "noopener",
    style: {
      color: 'inherit',
      textDecoration: 'none'
    }
  }, "Terms"), /*#__PURE__*/React.createElement("a", {
    href: "https://instagram.com/lumenpoints",
    target: "_blank",
    rel: "noopener",
    style: {
      color: 'inherit',
      textDecoration: 'none'
    }
  }, "@lumenpoints")));
}
window.D3_Homepage = function D3_Homepage() {
  return /*#__PURE__*/React.createElement("div", {
    style: d3Styles.page
  }, /*#__PURE__*/React.createElement(D3_Nav, null), /*#__PURE__*/React.createElement(D3_Hero, null), /*#__PURE__*/React.createElement(D3_Quote, null), /*#__PURE__*/React.createElement(D3_Dimension, {
    n: 1,
    label: "Body",
    color: LP_COLORS.body,
    title: "Every metric. Every stack. One tab.",
    body: "Stack vitamins, peptides, and medications with reminders. Track weight, muscle, composition \u2014 alongside doses. Syncs with Apple Health. See how your stack and stats move together."
  }), /*#__PURE__*/React.createElement(D3_Dimension, {
    n: 2,
    label: "Skin",
    color: LP_COLORS.skin,
    align: "right",
    title: "Your routine. Your products. The real results.",
    body: "Log every AM/PM product. Know what you're using and when you started. Connect the dots between retinol rotations and visible change \u2014 without relying on memory."
  }), /*#__PURE__*/React.createElement(D3_Dimension, {
    n: 3,
    label: "Mind",
    color: LP_COLORS.mind,
    title: "Sleep, mood, and mindfulness \u2014 where it all connects.",
    body: "Sleep, mental health, daily gratitude \u2014 in one view. Watch how last night's sleep shows up in today's recovery. The mind isn't a separate tab. It's the through line."
  }), /*#__PURE__*/React.createElement(D3_Dimension, {
    n: 4,
    label: "Blood",
    color: LP_COLORS.blood,
    align: "right",
    title: "The proof your body gives you. Finally understood.",
    body: "Upload labs. AI connects your markers to your stack, training, sleep, and stress. Spot the gaps. Get specific, personalized adjustments for what to change."
  }), /*#__PURE__*/React.createElement(D3_Dimension, {
    n: 5,
    label: "Trends",
    color: LP_COLORS.trends,
    title: "Your data. Your household's story. Translated.",
    body: "Every data point becomes a line in someone's story. AI surfaces the patterns you'd never spot on your own \u2014 how his supplement timing shifted his sleep, why your recovery dipped in week three, what finally landed with your teenager. Visualized clearly. Interpreted intelligently."
  }), /*#__PURE__*/React.createElement(D3_Setup, null), /*#__PURE__*/React.createElement(D3_Wordmark, null), /*#__PURE__*/React.createElement(D3_ForHer, null), /*#__PURE__*/React.createElement(D3_Founding, null), /*#__PURE__*/React.createElement(D3_Waitlist, null), /*#__PURE__*/React.createElement(D3_Footer, null));
};

"use strict";

ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(D3_Homepage, null));