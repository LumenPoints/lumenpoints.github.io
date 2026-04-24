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
window.LP_StarMark = function LP_StarMark({
  size = 80,
  muted = false,
  bg = 'transparent'
}) {
  const c = window.LP_COLORS;
  const points = [{
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
  const cx = 50,
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
  }, points.map((p, i) => {
    const next = points[(i + 1) % 5];
    const a1 = p.angle * Math.PI / 180;
    const a2 = (p.angle + 36) * Math.PI / 180;
    const a3 = next.angle * Math.PI / 180;
    const x1 = cx + outer * Math.cos(a1),
      y1 = cy + outer * Math.sin(a1);
    const x2 = cx + inner * Math.cos(a2),
      y2 = cy + inner * Math.sin(a2);
    const x3 = cx + outer * Math.cos(a3),
      y3 = cy + outer * Math.sin(a3);
    const path = `M${cx},${cy} L${x1},${y1} L${x2},${y2} Z M${cx},${cy} L${x2},${y2} L${x3},${y3} Z`;
    return /*#__PURE__*/React.createElement("path", {
      key: i,
      d: path,
      fill: muted ? 'currentColor' : p.color,
      opacity: muted ? 0.85 : 1
    });
  }));
};

// Monochrome outline version (for dark backgrounds or minimalist layouts)
window.LP_StarOutline = function LP_StarOutline({
  size = 80,
  color = 'currentColor',
  strokeWidth = 1
}) {
  const cx = 50,
    cy = 50,
    outer = 44,
    inner = 17;
  const pts = [];
  for (let i = 0; i < 5; i++) {
    const aOuter = (-90 + i * 72) * Math.PI / 180;
    const aInner = (-90 + i * 72 + 36) * Math.PI / 180;
    pts.push([cx + outer * Math.cos(aOuter), cy + outer * Math.sin(aOuter)]);
    pts.push([cx + inner * Math.cos(aInner), cy + inner * Math.sin(aInner)]);
  }
  const d = 'M' + pts.map(p => p.join(',')).join(' L') + ' Z';
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
window.LP_ImagePlaceholder = function LP_ImagePlaceholder({
  caption,
  tint = '#e8e2d6',
  fg = '#7a7169',
  aspect = '4/5',
  style = {}
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      aspectRatio: aspect,
      background: `repeating-linear-gradient(135deg, ${tint}, ${tint} 12px, ${shade(tint, -4)} 12px, ${shade(tint, -4)} 24px)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: fg,
      fontFamily: 'ui-monospace, "SF Mono", Menlo, monospace',
      fontSize: 11,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      ...style
    }
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
  const m = hex.match(/^#([0-9a-f]{6})$/i);
  if (!m) return hex;
  const n = parseInt(m[1], 16);
  let r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  r = Math.max(0, Math.min(255, r + delta));
  g = Math.max(0, Math.min(255, g + delta));
  b = Math.max(0, Math.min(255, b + delta));
  return '#' + (r << 16 | g << 8 | b).toString(16).padStart(6, '0');
}

// Direction 3 — Soft Dark / Night Mode Premium
// Deep charcoal-green + warm cream. Display serif + refined sans.
// The 5 dimension colors as hero data accents.

const D3 = {
  bg: '#161C19',
  // deep charcoal-forest
  bgAlt: '#1E2623',
  cream: '#EDE6D6',
  creamSoft: 'rgba(237,230,214,0.68)',
  rule: 'rgba(237,230,214,0.14)',
  terracotta: '#D48A72',
  gold: '#C9A978'
};
const d3Styles = {
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
      borderBottom: `1px solid ${D3.rule}`
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
    style: {
      ...d3Styles.display,
      fontSize: 48,
      letterSpacing: '0.04em',
      lineHeight: 1
    }
  }, /*#__PURE__*/React.createElement("span", null, "Lumen"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: D3.terracotta,
      fontStyle: 'italic'
    }
  }, "Points"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 44,
      ...d3Styles.mono,
      fontSize: 17,
      letterSpacing: '0.18em'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#method",
    style: {
      color: 'inherit',
      textDecoration: 'none',
      cursor: 'pointer'
    }
  }, "The Method"), /*#__PURE__*/React.createElement("a", {
    href: "#points",
    style: {
      color: 'inherit',
      textDecoration: 'none',
      cursor: 'pointer'
    }
  }, "Five Points"), /*#__PURE__*/React.createElement("a", {
    href: "#founding",
    style: {
      color: 'inherit',
      textDecoration: 'none',
      cursor: 'pointer'
    }
  }, "Founding"), /*#__PURE__*/React.createElement("a", {
    href: "#stories",
    style: {
      color: 'inherit',
      textDecoration: 'none',
      cursor: 'pointer'
    }
  }, "Stories")), /*#__PURE__*/React.createElement("a", {
    href: "#waitlist",
    style: {
      padding: '14px 28px',
      border: `1px solid ${D3.cream}`,
      ...d3Styles.mono,
      fontSize: 16,
      letterSpacing: '0.2em',
      color: D3.cream,
      borderRadius: 1,
      textDecoration: 'none',
      cursor: 'pointer'
    }
  }, "Join Waitlist"));
}
function D3_Hero() {
  const c = LP_COLORS;
  const points = [{
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
      background: `radial-gradient(circle, rgba(212,138,114,0.25) 0%, transparent 65%)`,
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
    style: {
      ...d3Styles.mono,
      fontSize: 20,
      letterSpacing: '0.22em',
      color: D3.terracotta,
      marginBottom: 36
    }
  }, "\u2726 Get The App"), /*#__PURE__*/React.createElement("h1", {
    style: {
      ...d3Styles.display,
      fontSize: 140,
      lineHeight: 0.96,
      margin: 0,
      letterSpacing: '-0.02em',
      color: D3.cream
    }
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
      borderLeft: `1px solid ${D3.gold}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...d3Styles.display,
      fontSize: 36,
      fontStyle: 'italic',
      color: D3.gold,
      lineHeight: 1.15,
      letterSpacing: '-0.01em',
      marginBottom: 24
    }
  }, "\"What gets measured,", /*#__PURE__*/React.createElement("br", null), "gets managed.\""), /*#__PURE__*/React.createElement("div", {
    style: {
      ...d3Styles.body,
      fontSize: 19,
      lineHeight: 1.65,
      color: 'rgba(237,230,214,0.82)'
    }
  }, "LumenPoints unifies the five dimensions of your wellness into a single, legible system \u2014 so the work you're already doing becomes the signal you can actually read.")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 16,
      marginTop: 48,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#founding",
    style: {
      padding: '18px 34px',
      background: D3.cream,
      color: D3.bg,
      ...d3Styles.mono,
      fontSize: 14,
      letterSpacing: '0.18em',
      textDecoration: 'none',
      cursor: 'pointer'
    }
  }, "Claim Founding \xB7 $349"), /*#__PURE__*/React.createElement("a", {
    href: "#waitlist",
    style: {
      padding: '18px 30px',
      border: `1px solid ${D3.rule}`,
      ...d3Styles.mono,
      fontSize: 14,
      color: D3.creamSoft,
      textDecoration: 'none',
      cursor: 'pointer'
    }
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
  }), (() => {
    const cx = 250,
      cy = 250,
      outer = 200,
      inner = 78;
    const pts = [];
    for (let i = 0; i < 5; i++) {
      const aO = (-90 + i * 72) * Math.PI / 180;
      const aI = (-90 + i * 72 + 36) * Math.PI / 180;
      pts.push([cx + outer * Math.cos(aO), cy + outer * Math.sin(aO)]);
      pts.push([cx + inner * Math.cos(aI), cy + inner * Math.sin(aI)]);
    }
    const path = 'M' + pts.map(p => p.join(',')).join(' L') + ' Z';
    return /*#__PURE__*/React.createElement("path", {
      d: path,
      fill: "none",
      stroke: D3.gold,
      strokeWidth: "1.2",
      strokeLinejoin: "round",
      opacity: "0.5"
    });
  })(), points.map((p, i) => {
    const a = p.angle * Math.PI / 180;
    const x = 250 + 200 * Math.cos(a);
    const y = 250 + 200 * Math.sin(a);
    const lx = 250 + 230 * Math.cos(a);
    const ly = 250 + 230 * Math.sin(a);
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
      borderTop: `1px solid ${D3.rule}`,
      borderBottom: `1px solid ${D3.rule}`
    }
  }, [['5', 'Dimensions tracked'], ['100', 'Founding memberships'], ['$349', 'Lifetime, one-time'], ['May 12', 'iOS launch']].map(([n, l], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: '28px 24px',
      borderLeft: i > 0 ? `1px solid ${D3.rule}` : 'none'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...d3Styles.display,
      fontSize: 52,
      letterSpacing: '-0.01em'
    }
  }, n), /*#__PURE__*/React.createElement("div", {
    style: {
      ...d3Styles.mono,
      marginTop: 8
    }
  }, l)))));
}
function D3_Quote() {
  return /*#__PURE__*/React.createElement("div", {
    id: "method",
    style: {
      padding: '120px 72px',
      background: D3.bgAlt,
      textAlign: 'center',
      scrollMarginTop: 100
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...d3Styles.mono,
      fontSize: 26,
      marginBottom: 40
    }
  }, "\u2726 The Premise"), /*#__PURE__*/React.createElement("div", {
    style: {
      ...d3Styles.display,
      fontSize: 88,
      lineHeight: 1.12,
      letterSpacing: '-0.015em',
      maxWidth: 1200,
      margin: '0 auto'
    }
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
    style: {
      ...d3Styles.body,
      fontSize: 22,
      lineHeight: 1.55,
      color: 'rgba(237,230,214,0.85)',
      marginTop: 48,
      maxWidth: 860,
      margin: '48px auto 0'
    }
  }, "Your wellness has been scattered across a dozen apps, a notes file, a shoebox of labs, and your memory. LumenPoints is the first place where all five dimensions live together \u2014 so the pattern, finally, has somewhere to emerge."));
}
function D3_ForHer() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '140px 72px',
      borderTop: `1px solid ${D3.rule}`,
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
      background: `radial-gradient(circle, ${LP_COLORS.skin}22 0%, transparent 65%)`,
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
    style: {
      ...d3Styles.mono,
      fontSize: 26,
      color: D3.gold,
      marginBottom: 32
    }
  }, "\u2726 Who It's For"), /*#__PURE__*/React.createElement("h2", {
    style: {
      ...d3Styles.display,
      fontSize: 96,
      lineHeight: 1,
      margin: 0,
      letterSpacing: '-0.02em',
      color: D3.cream
    }
  }, "Built for the one", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic',
      color: D3.gold
    }
  }, "drowning in their own data.")), /*#__PURE__*/React.createElement("div", {
    style: {
      ...d3Styles.body,
      fontSize: 21,
      lineHeight: 1.55,
      color: 'rgba(237,230,214,0.88)',
      marginTop: 40,
      maxWidth: 540
    }
  }, "Apple Health. Renpho. A supplement tracker. A shoebox of lab PDFs. A skincare routine held in your head. A mental wellness check-in no one is actually doing."), /*#__PURE__*/React.createElement("div", {
    style: {
      ...d3Styles.body,
      fontSize: 21,
      lineHeight: 1.55,
      color: 'rgba(237,230,214,0.88)',
      marginTop: 24,
      maxWidth: 540
    }
  }, "You're already collecting the signal. LumenPoints is the first place it can finally be read.")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 1,
      background: D3.rule,
      border: `1px solid ${D3.rule}`
    }
  }, [['Too many apps', 'Health data scattered across a dozen trackers — none of them talking to each other.'], ['Too many products', 'New serums, supplements, peptides every week. No clear signal on what is actually working for you.'], ['Ignored wellbeing', 'Mental health lives in a separate tab, if it lives anywhere at all. Sleep, mood, stress — rarely connected to the rest.'], ['No one connecting it', 'Your labs, your stack, your skin, your sleep — nobody is pulling it together. Not your doctor. Not your apps. Not you, on a Tuesday night.']].map(([who, what], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: 32,
      background: D3.bg
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...d3Styles.mono,
      fontSize: 13,
      color: D3.gold,
      marginBottom: 14
    }
  }, "0", i + 1), /*#__PURE__*/React.createElement("div", {
    style: {
      ...d3Styles.display,
      fontSize: 30,
      fontStyle: 'italic',
      color: D3.cream,
      marginBottom: 14
    }
  }, who), /*#__PURE__*/React.createElement("div", {
    style: {
      ...d3Styles.body,
      fontSize: 17,
      lineHeight: 1.55,
      color: 'rgba(237,230,214,0.78)'
    }
  }, what)))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 28,
      ...d3Styles.body,
      fontSize: 21,
      fontStyle: 'italic',
      color: 'rgba(237,230,214,0.78)',
      textAlign: 'right'
    }
  }, "One place. For the noise to finally make sense."))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      marginTop: 100,
      padding: '56px 64px',
      border: `1px solid ${D3.rule}`,
      background: 'rgba(237,230,214,0.03)',
      display: 'grid',
      gridTemplateColumns: '320px 1fr',
      gap: 72,
      alignItems: 'start'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      ...d3Styles.mono,
      fontSize: 16,
      color: D3.terracotta,
      marginBottom: 16,
      letterSpacing: '0.22em'
    }
  }, "\u2726 A Feature"), /*#__PURE__*/React.createElement("div", {
    style: {
      ...d3Styles.display,
      fontSize: 42,
      fontStyle: 'italic',
      color: D3.gold,
      lineHeight: 1.05,
      letterSpacing: '-0.01em'
    }
  }, "Track together.", /*#__PURE__*/React.createElement("br", null), "Stay yourself.")), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 680
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...d3Styles.body,
      fontSize: 18,
      lineHeight: 1.6,
      color: 'rgba(237,230,214,0.86)'
    }
  }, "LumenPoints is built for one person at a time. Joint is for the couples who live this way together \u2014 two people, two accounts, one subscription."), /*#__PURE__*/React.createElement("div", {
    style: {
      ...d3Styles.body,
      fontSize: 18,
      lineHeight: 1.6,
      color: 'rgba(237,230,214,0.86)',
      marginTop: 18
    }
  }, "Each of you has your own private LumenPoints. Your bloodwork. Your stack. Your trends. Your mind. Nothing is shared by default, and nothing is merged."), /*#__PURE__*/React.createElement("div", {
    style: {
      ...d3Styles.body,
      fontSize: 18,
      lineHeight: 1.6,
      color: 'rgba(237,230,214,0.86)',
      marginTop: 18
    }
  }, "For couples who want to share specific parts of their picture \u2014 opt-in, per-Point, revocable \u2014 that's coming in our first major update, shaped by what Founding Members tell us they actually want to share."), /*#__PURE__*/React.createElement("div", {
    style: {
      ...d3Styles.body,
      fontSize: 18,
      lineHeight: 1.6,
      color: D3.gold,
      fontStyle: 'italic',
      marginTop: 22
    }
  }, "Until then: two lives tracked side by side. Separately, intentionally, privately."))));
}
function D3_Dimension({
  n,
  label,
  color,
  title,
  body,
  image,
  align = 'left'
}) {
  const reversed = align === 'right';
  return /*#__PURE__*/React.createElement("div", {
    id: n === 1 ? 'points' : undefined,
    style: {
      padding: '110px 72px',
      borderTop: `1px solid ${D3.rule}`,
      scrollMarginTop: 100,
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
      boxShadow: `0 0 28px ${color}`
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      ...d3Styles.mono,
      fontSize: 32,
      letterSpacing: '0.18em',
      color: color,
      fontWeight: 600
    }
  }, "0", n, " \xB7 ", label)), /*#__PURE__*/React.createElement("h3", {
    style: {
      ...d3Styles.display,
      fontSize: 72,
      lineHeight: 1.05,
      margin: 0,
      letterSpacing: '-0.015em',
      color: D3.cream
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      ...d3Styles.body,
      fontSize: 19,
      marginTop: 32,
      maxWidth: 480,
      color: 'rgba(237,230,214,0.82)'
    }
  }, body)), /*#__PURE__*/React.createElement("div", {
    style: {
      order: reversed ? 1 : 2,
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: -30,
      background: `radial-gradient(circle, ${color}33 0%, transparent 70%)`,
      filter: 'blur(28px)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      aspectRatio: '4 / 5',
      overflow: 'hidden',
      border: `1px solid ${D3.rule}`,
      background: '#1f2522'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: label,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      display: 'block',
      filter: 'saturate(0.85) contrast(1.02)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: `linear-gradient(180deg, transparent 40%, rgba(22,28,25,0.55) 100%)`,
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 24,
      bottom: 20,
      ...d3Styles.mono,
      fontSize: 12,
      color: color,
      letterSpacing: '0.24em'
    }
  }, "\u2726 0", n, " \xB7 ", label))));
}
function D3_Founding() {
  return /*#__PURE__*/React.createElement("div", {
    id: "founding",
    style: {
      padding: '140px 72px',
      borderTop: `1px solid ${D3.rule}`,
      background: D3.bgAlt,
      position: 'relative',
      overflow: 'hidden',
      scrollMarginTop: 100
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
      background: `radial-gradient(circle, rgba(201,169,120,0.12) 0%, transparent 60%)`,
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
    style: {
      ...d3Styles.mono,
      fontSize: 26,
      color: D3.gold,
      marginBottom: 32,
      lineHeight: 1.4
    }
  }, "\u2726 Founding", /*#__PURE__*/React.createElement("br", null), "Limited to One Hundred"), /*#__PURE__*/React.createElement("h2", {
    style: {
      ...d3Styles.display,
      fontSize: 108,
      lineHeight: 0.98,
      margin: 0,
      letterSpacing: '-0.02em'
    }
  }, "A quiet", /*#__PURE__*/React.createElement("br", null), "invitation", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic',
      color: D3.gold
    }
  }, "for the serious.")), /*#__PURE__*/React.createElement("div", {
    style: {
      ...d3Styles.body,
      fontSize: 20,
      marginTop: 40,
      maxWidth: 480,
      color: 'rgba(237,230,214,0.82)'
    }
  }, "Five lifetime benefits, one price, yours forever. For the hundred founding members who want to be first.")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: 40,
      border: `1px solid ${D3.rule}`,
      background: 'rgba(237,230,214,0.03)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      borderBottom: `1px solid ${D3.rule}`,
      paddingBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...d3Styles.display,
      fontSize: 72,
      letterSpacing: '-0.02em'
    }
  }, "$349"), /*#__PURE__*/React.createElement("div", {
    style: {
      ...d3Styles.mono
    }
  }, "One time \xB7 Lifetime")), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 24
    }
  }, ['Early access', 'Premium feature unlock', 'Beta feedback channel', 'Founding member badge', 'Direct founder support'].map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '14px 0',
      borderBottom: i < 4 ? `1px solid ${D3.rule}` : 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      ...d3Styles.mono,
      color: D3.gold,
      width: 30
    }
  }, "0", i + 1), /*#__PURE__*/React.createElement("span", {
    style: {
      ...d3Styles.body,
      color: D3.cream,
      fontSize: 17
    }
  }, t)))), /*#__PURE__*/React.createElement("a", {
    href: "#waitlist",
    style: {
      display: 'block',
      marginTop: 28,
      padding: '20px 0',
      background: D3.gold,
      color: D3.bg,
      textAlign: 'center',
      ...d3Styles.mono,
      fontSize: 14,
      letterSpacing: '0.2em',
      fontWeight: 600,
      textDecoration: 'none',
      cursor: 'pointer'
    }
  }, "Claim Founding Spot"))));
}
function D3_Wordmark() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '180px 72px 160px',
      borderTop: `1px solid ${D3.rule}`,
      position: 'relative',
      overflow: 'hidden',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      background: `radial-gradient(ellipse at center, ${D3.gold}14 0%, transparent 60%)`
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
    style: {
      ...d3Styles.display,
      fontSize: 200,
      lineHeight: 0.9,
      letterSpacing: '-0.035em',
      margin: 0
    }
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
    style: {
      ...d3Styles.display,
      fontSize: 44,
      fontStyle: 'italic',
      color: D3.gold,
      marginTop: 56,
      letterSpacing: '-0.01em',
      lineHeight: 1.2
    }
  }, "Every point of your health, illuminated.")));
}
function D3_Setup() {
  return /*#__PURE__*/React.createElement("div", {
    id: "stories",
    style: {
      padding: '130px 72px',
      borderTop: `1px solid ${D3.rule}`,
      scrollMarginTop: 100
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...d3Styles.mono,
      fontSize: 26,
      marginBottom: 56
    }
  }, "\u2726 How It Works"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: 0
    }
  }, [['Download', 'Get LumenPoints from the App Store on May 12. iOS first — Android is on the roadmap.'], ['Set up account', 'Choose Individual or Joint account. Premium accounts give full access to AI insights.'], ['Start tracking', 'Log supplements, routines, and metrics. Upload bloodwork. Connect Apple Health. Enable custom notifications for every Point — a reminder for the morning stack, a check-in after labs, a nudge when the mind needs it. Then let LumenPoints do the connecting.']].map(([t, b], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      padding: '0 36px',
      borderLeft: `1px solid ${D3.rule}`
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...d3Styles.display,
      fontSize: 100,
      letterSpacing: '-0.03em',
      color: D3.gold,
      lineHeight: 1
    }
  }, "0", i + 1), /*#__PURE__*/React.createElement("div", {
    style: {
      ...d3Styles.display,
      fontSize: 42,
      fontStyle: 'italic',
      margin: '18px 0 24px',
      color: D3.cream
    }
  }, t), /*#__PURE__*/React.createElement("div", {
    style: {
      ...d3Styles.body,
      fontSize: 20,
      lineHeight: 1.6
    }
  }, b)))));
}
function D3_Waitlist() {
  const [submitted, setSubmitted] = React.useState(false);
  const [submitting, setSubmitting] = React.useState(false);
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    if (!email) return;
    setSubmitting(true);
    const data = new FormData();
    data.append('fields[email]', email);
    data.append('ml-submit', '1');
    data.append('anticsrf', 'true');
    fetch('https://assets.mailerlite.com/jsonp/2279171/forms/185478669838320940/subscribe', {
      method: 'POST',
      body: data,
      mode: 'no-cors'
    }).finally(() => {
      setSubmitted(true);
      setSubmitting(false);
    });
  };
  return /*#__PURE__*/React.createElement("div", {
    id: "waitlist",
    style: {
      padding: '120px 72px',
      textAlign: 'center',
      borderTop: `1px solid ${D3.rule}`,
      scrollMarginTop: 100
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...d3Styles.mono,
      fontSize: 26,
      marginBottom: 28
    }
  }, "\u2726 The Waitlist"), /*#__PURE__*/React.createElement("h2", {
    style: {
      ...d3Styles.display,
      fontSize: 100,
      lineHeight: 1,
      margin: 0,
      letterSpacing: '-0.02em'
    }
  }, "Be among the ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontStyle: 'italic',
      color: D3.gold
    }
  }, "first to know.")), submitted ? /*#__PURE__*/React.createElement("div", {
    style: {
      ...d3Styles.display,
      fontSize: 32,
      fontStyle: 'italic',
      color: D3.gold,
      marginTop: 56
    }
  }, "Thank you. You're on the list.") : /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    style: {
      display: 'flex',
      maxWidth: 560,
      margin: '56px auto 0',
      borderBottom: `1px solid ${D3.cream}`,
      paddingBottom: 16
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "email",
    name: "email",
    required: true,
    placeholder: "your@email.com",
    style: {
      flex: 1,
      background: 'transparent',
      border: 0,
      outline: 'none',
      ...d3Styles.display,
      fontSize: 26,
      color: D3.cream
    }
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: submitting,
    style: {
      background: 'transparent',
      border: 0,
      ...d3Styles.mono,
      fontSize: 13,
      color: D3.gold,
      cursor: submitting ? 'default' : 'pointer',
      letterSpacing: '0.22em',
      opacity: submitting ? 0.5 : 1
    }
  }, submitting ? 'Sending...' : 'Submit →')));
}
function D3_Footer() {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '72px 72px 48px',
      borderTop: `1px solid ${D3.rule}`,
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
    style: {
      ...d3Styles.display,
      fontSize: 48,
      letterSpacing: '0.04em'
    }
  }, /*#__PURE__*/React.createElement("span", null, "Lumen"), /*#__PURE__*/React.createElement("span", {
    style: {
      color: D3.terracotta,
      fontStyle: 'italic'
    }
  }, "Points"))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...d3Styles.mono,
      fontSize: 16,
      letterSpacing: '0.18em',
      marginTop: 18
    }
  }, "LumenPoints LLC \xB7 hello@lumenpoints.com")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 44,
      ...d3Styles.mono,
      fontSize: 16,
      letterSpacing: '0.18em'
    }
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
    image: "img/body.jpg",
    title: "Every metric. Every stack. One tab.",
    body: "Stack vitamins, peptides, and medications with reminders. Track weight, muscle, composition \u2014 alongside doses. Syncs with Apple Health. See how your stack and stats move together."
  }), /*#__PURE__*/React.createElement(D3_Dimension, {
    n: 2,
    label: "Skin",
    color: LP_COLORS.skin,
    align: "right",
    image: "img/skin.jpg",
    title: "Your routine. Your products. The real results.",
    body: "Log every AM/PM product. Know what you're using and when you started. Connect the dots between retinol rotations and visible change \u2014 without relying on memory."
  }), /*#__PURE__*/React.createElement(D3_Dimension, {
    n: 3,
    label: "Mind",
    color: LP_COLORS.mind,
    image: "img/mind.jpg",
    title: "Sleep, mood, and mindfulness \u2014 where it all connects.",
    body: "Sleep, mental health, daily gratitude \u2014 in one view. Watch how last night's sleep shows up in today's recovery. The mind isn't a separate tab. It's the through line."
  }), /*#__PURE__*/React.createElement(D3_Dimension, {
    n: 4,
    label: "Blood",
    color: LP_COLORS.blood,
    align: "right",
    image: "img/blood.jpg",
    title: "The proof your body gives you. Finally understood.",
    body: "Upload labs. AI connects your markers to your stack, training, sleep, and stress. Spot the gaps. Get specific, personalized adjustments for what to change."
  }), /*#__PURE__*/React.createElement(D3_Dimension, {
    n: 5,
    label: "Trends",
    color: LP_COLORS.trends,
    image: "img/trends.jpg",
    title: "Your data. Your story. Translated.",
    body: "Every data point becomes a line in someone's story. AI surfaces the patterns you'd never spot on your own \u2014 how his supplement timing shifted his sleep, why your recovery dipped in week three, what finally landed with your teenager. Visualized clearly. Interpreted intelligently."
  }), /*#__PURE__*/React.createElement(D3_Setup, null), /*#__PURE__*/React.createElement(D3_Wordmark, null), /*#__PURE__*/React.createElement(D3_ForHer, null), /*#__PURE__*/React.createElement(D3_Founding, null), /*#__PURE__*/React.createElement(D3_Waitlist, null), /*#__PURE__*/React.createElement(D3_Footer, null));
};

ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(D3_Homepage, null));
