// ============================================================
// genhtml.js — gera metodologia_obliant.html (site de uma
// página só, autossuficiente: CSS e JS embutidos) e dist/index.html
// Uso: node genhtml.js
// ============================================================

const fs = require('fs');
const path = require('path');
const {
  COLORS, WORDMARK,
  MATURITY_LEVELS, MATURITY_THRESHOLDS,
  HOWTO_BLOCKS, MODOS_ATUACAO,
  PRODUCTS, GLOSSARIO,
} = require('./data');

const C = Object.fromEntries(Object.entries(COLORS).map(([k, v]) => [k, '#' + v]));
const TAG_LABEL = { pmo: 'PMO', gmo: 'GMO', compartilhado: 'Compartilhado' };

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// ------------------------------------------------------------
// CSS
// ------------------------------------------------------------
function css() {
  return `
:root{
  --navy:${C.navy}; --cream:${C.cream}; --gold:${C.gold}; --ice:${C.ice};
  --gray:${C.gray}; --ink:${C.ink}; --line:${C.line}; --white:#fff;
}
*{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{font-family:'Inter',system-ui,sans-serif;background:var(--cream);color:var(--ink);line-height:1.55;font-size:15px}
h1,h2,h3,.serif{font-family:'Fraunces',Georgia,serif;font-weight:600}
.wrap{max-width:1120px;margin:0 auto;padding:0 24px}
button{font:inherit}

/* ---------- animações ---------- */
@keyframes fade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@keyframes rise{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
@keyframes popIn{from{opacity:0;transform:scale(.92)}to{opacity:1;transform:none}}
@keyframes radarIn{from{transform:scale(.04);opacity:0}to{transform:scale(1);opacity:1}}
@keyframes pulseRing{0%{transform:scale(.6);opacity:.9}100%{transform:scale(2.2);opacity:0}}
@keyframes blink{0%,100%{box-shadow:0 0 0 2px var(--gold)}50%{box-shadow:0 0 0 6px rgba(153,141,103,.25)}}
@keyframes shimmer{from{background-position:200% 0}to{background-position:-200% 0}}

/* stagger de entrada quando a aba abre */
.tab.on .grid>.card,.tab.on .road .col,.tab.on .mat .step,.tab.on .layers .l,
.tab.on .arch .p,.tab.on .howto .b,.tab.on .gloss .g,.tab.on .ass-pick button{
  animation:rise .5s cubic-bezier(.2,.7,.3,1) both}
.tab.on :is(.grid,.road,.mat,.layers,.arch,.howto,.gloss,.ass-pick)>*:nth-child(2){animation-delay:.06s}
.tab.on :is(.grid,.road,.mat,.layers,.arch,.howto,.gloss,.ass-pick)>*:nth-child(3){animation-delay:.12s}
.tab.on :is(.grid,.road,.mat,.layers,.arch,.howto,.gloss,.ass-pick)>*:nth-child(4){animation-delay:.18s}
.tab.on :is(.grid,.road,.mat,.layers,.arch,.howto,.gloss,.ass-pick)>*:nth-child(5){animation-delay:.24s}
.tab.on :is(.grid,.road,.mat,.layers,.arch,.howto,.gloss,.ass-pick)>*:nth-child(n+6){animation-delay:.3s}

/* ---------- header (hero) ---------- */
header{background:linear-gradient(135deg,var(--navy) 0%,#3d4d61 100%);color:var(--cream);padding:40px 0 34px}
.brand{display:flex;align-items:baseline;gap:12px;letter-spacing:.28em;font-size:13px;font-weight:600}
.brand b{color:var(--gold)}
header h1{font-size:clamp(26px,4vw,38px);margin:18px 0 10px;font-weight:600;line-height:1.15}
header p.sub{color:#c9d2de;max-width:560px;font-size:14.5px}

/* ---------- navbar fixa ---------- */
.navbar{position:sticky;top:0;z-index:60;background:var(--navy);box-shadow:0 8px 20px -14px rgba(0,0,0,.55)}
.navbar .wrap{display:flex;align-items:center;gap:20px}
.navbar .mini{font-size:11px;font-weight:700;letter-spacing:.24em;color:var(--cream);white-space:nowrap}
.navbar .mini b{color:var(--gold)}
@media(max-width:760px){.navbar .mini{display:none}}
nav.top{display:flex;gap:0;flex-wrap:wrap;flex:1}
nav.top button{appearance:none;border:0;cursor:pointer;font-size:13.5px;font-weight:600;
  padding:15px 16px;background:transparent;color:#b9c3d0;letter-spacing:.02em;transition:color .2s;position:relative}
nav.top button:hover{color:var(--cream)}
nav.top button.on{color:#fff}
nav.top button::after{content:'';position:absolute;left:14px;right:14px;bottom:0;height:3px;border-radius:2px 2px 0 0;background:transparent;transition:background .25s}
nav.top button.on::after{background:var(--gold)}

/* ---------- sections ---------- */
main{padding:34px 0 70px}
section.tab{display:none}
section.tab.on{display:block;animation:fade .3s ease}

/* ---------- hero de produto ---------- */
.prod-hero{display:flex;justify-content:space-between;align-items:center;gap:22px;flex-wrap:wrap;
  background:linear-gradient(120deg,var(--white) 55%,#fbf9f2);border:1px solid var(--line);
  border-left:5px solid var(--navy);border-radius:16px;padding:22px 26px;margin-bottom:22px}
.prod-hero.gold{border-left-color:var(--gold)}
.prod-hero .ph-k{font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--gold)}
.prod-hero h2{font-size:30px;color:var(--navy);margin:2px 0}
.prod-hero .ph-t{font-size:14px;color:var(--ink);max-width:560px}
.prod-hero .ph-n{font-size:12.5px;color:var(--gray);font-style:italic;margin-top:6px;max-width:560px}
.badge{background:var(--navy);color:var(--cream);font-size:11px;font-weight:600;letter-spacing:.12em;
  padding:4px 12px;border-radius:999px;text-transform:uppercase}
.badge.gold{background:var(--gold)}
p.lead{color:var(--gray);max-width:680px;margin:6px 0 20px;font-size:14.5px}
p.note{font-size:12.5px;color:var(--gray);font-style:italic;margin-top:10px}

/* ---------- cabeçalho de seção padrão ---------- */
.sect-head{margin:34px 0 16px}
.sect-head:first-child{margin-top:0}
.sect-head .kicker{margin-bottom:4px}
.sect-head h3{color:var(--navy);font-size:20px}
.sect-head p{color:var(--gray);font-size:13.5px;max-width:680px;margin-top:4px}

/* ---------- banner CTA ---------- */
.cta{background:linear-gradient(135deg,var(--navy),#3d4d61);color:var(--cream);border-radius:16px;
  padding:26px 30px;display:flex;justify-content:space-between;align-items:center;gap:20px;flex-wrap:wrap;margin-top:38px}
.cta h3{color:var(--cream);font-size:21px}
.cta p{color:#c9d2de;font-size:13px;max-width:520px;margin-top:4px}

/* ---------- sub tabs ---------- */
nav.sub{display:flex;gap:6px;flex-wrap:wrap;border-bottom:1px solid var(--line);margin:10px 0 24px}
@media(min-width:900px){nav.sub{position:sticky;top:48px;background:var(--cream);z-index:40}}
nav.sub button{appearance:none;border:0;background:none;cursor:pointer;font-size:13px;font-weight:600;
  color:var(--gray);padding:9px 14px;border-bottom:2px solid transparent;margin-bottom:-1px;transition:.2s}
nav.sub button:hover{color:var(--navy)}
nav.sub button.on{color:var(--navy);border-color:var(--gold)}
.subpane{display:none}
.subpane.on{display:block;animation:fade .25s ease}

/* ---------- cards / grids ---------- */
.grid{display:grid;gap:14px}
.grid.c2{grid-template-columns:repeat(auto-fit,minmax(300px,1fr))}
.grid.c3{grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}
.grid.c4{grid-template-columns:repeat(auto-fit,minmax(200px,1fr))}
.card{background:var(--white);border:1px solid var(--line);border-radius:14px;padding:20px;
  transition:transform .25s,box-shadow .25s}
.card:hover{transform:translateY(-2px);box-shadow:0 10px 24px -14px rgba(46,57,71,.35)}
.card h3{color:var(--navy);font-size:17px;margin-bottom:8px}
.card h4{font-size:13px;color:var(--navy);margin-bottom:4px;font-family:'Inter';font-weight:700}
.card p{font-size:13px;color:var(--gray)}
.kicker{font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);margin-bottom:10px}
.num{font-family:'Fraunces';font-size:26px;color:var(--gold);line-height:1}

.pillars{display:flex;gap:10px;flex-wrap:wrap;margin:14px 0}
.pill{background:var(--navy);color:var(--cream);border-radius:10px;padding:12px 18px;font-size:13.5px;font-weight:600;
  display:flex;align-items:center;gap:8px;transition:.25s}
.pill:hover{background:var(--gold)}
.pill span{color:var(--gold)}
.pill:hover span{color:var(--cream)}
.pill span{font-family:'Fraunces';font-size:15px}

ul.clean{list-style:none}
ul.clean li{padding:8px 0 8px 22px;position:relative;border-bottom:1px solid var(--ice);font-size:13.5px}
ul.clean li:last-child{border-bottom:0}
ul.clean li::before{content:'';position:absolute;left:2px;top:15px;width:7px;height:7px;border-radius:50%;background:var(--gold)}

/* ---------- roadmap ---------- */
.road{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}
@media(max-width:900px){.road{grid-template-columns:1fr}}
.road .col{background:var(--white);border:1px solid var(--line);border-radius:14px;display:flex;flex-direction:column;position:relative;transition:transform .25s,box-shadow .25s}
.road .col:hover{transform:translateY(-3px);box-shadow:0 12px 26px -16px rgba(46,57,71,.4)}
.road .col:not(:last-child)::before{content:'›';position:absolute;right:-13px;top:22px;z-index:2;
  font-family:'Fraunces';font-size:22px;color:var(--gold);line-height:1}
@media(max-width:900px){.road .col:not(:last-child)::before{content:'⌄';right:auto;left:50%;top:auto;bottom:-16px}}
.road .col header{background:var(--ice);color:var(--navy);padding:12px 14px;border-radius:13px 13px 0 0}
.road .col header .lvl{font-size:11px;font-weight:700;letter-spacing:.14em;color:var(--gold)}
.road .col header .nm{font-family:'Fraunces';font-size:17px}
.road .col header .dots{display:flex;gap:4px;margin-top:7px}
.road .col header .dots i{width:14px;height:4px;border-radius:2px;background:rgba(122,132,148,.28)}
.road .col header .dots i.f{background:var(--gold)}
.road .col.hot header{background:var(--navy);color:var(--cream)}
.road ul{list-style:none;padding:8px 14px 14px}
.road li{font-size:12.5px;padding:7px 0 7px 16px;position:relative;border-bottom:1px solid var(--ice);color:var(--ink)}
.road li:last-child{border-bottom:0}
.road li::before{content:'';position:absolute;left:0;top:13px;width:6px;height:6px;border-radius:50%;background:var(--gold)}
.road .col .mark{position:absolute;top:8px;right:8px;font-size:9.5px;font-weight:700;letter-spacing:.06em;
  border-radius:999px;padding:3px 9px;text-transform:uppercase}
.road .col.atual .mark{background:var(--ink);color:var(--cream)}
.road .col.reco{animation:blink 1.6s ease-in-out 3}
.road .col.reco .mark{background:var(--gold);color:#fff}
.road .col.reco{border-color:var(--gold)}

/* ---------- maturity ---------- */
.mat{display:grid;grid-template-columns:repeat(5,1fr);gap:0;border:1px solid var(--line);border-radius:14px;overflow:hidden;background:var(--white)}
@media(max-width:900px){.mat{grid-template-columns:1fr}}
.mat .step{padding:20px 16px;border-right:1px solid var(--line);position:relative;transition:background .25s;cursor:default}
.mat .step:hover{background:#fbf9f2}
.mat .step:last-child{border-right:0}
.mat .step .bar{height:6px;border-radius:3px;background:var(--ice);margin-bottom:14px;overflow:hidden}
.mat .step .bar i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--gold),var(--navy));transition:width .9s cubic-bezier(.2,.7,.3,1)}
.tab.on .mat .step .bar i{width:var(--w)}
.mat .step h4{font-family:'Fraunces';font-size:16px;color:var(--navy);font-weight:600}
.mat .step .rs{font-size:12px;font-weight:600;color:var(--gold);margin:2px 0 8px}
.mat .step p{font-size:12px;color:var(--gray)}

/* ---------- venn ---------- */
.venn-cols{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px}
@media(max-width:900px){.venn-cols{grid-template-columns:1fr}}
.venn-cols .card{border-top:4px solid var(--navy);cursor:pointer;transition:.3s}
.venn-cols .card.mid{border-top-color:var(--gold);background:#fbf9f2}
.venn-cols.sel .card{opacity:.35;transform:scale(.985)}
.venn-cols.sel .card.focus{opacity:1;transform:none;box-shadow:0 0 0 2px var(--gold),0 14px 30px -18px rgba(46,57,71,.45)}
.vennfig{display:flex;justify-content:center;margin:8px 0 22px}
.vennfig [data-zone]{cursor:pointer}
.vennfig [data-zone]:hover{opacity:.95}
.tag{display:inline-block;font-size:10px;font-weight:700;letter-spacing:.08em;border-radius:999px;padding:2px 9px;margin-left:8px;vertical-align:1px}
.tag.pmo{background:var(--navy);color:var(--cream)}
.tag.gmo{background:var(--gold);color:var(--white)}
.tag.compartilhado{background:var(--ice);color:var(--navy);border:1px solid var(--line)}

/* ---------- table / raci ---------- */
table{width:100%;border-collapse:collapse;background:var(--white);border:1px solid var(--line);border-radius:14px;overflow:hidden;font-size:13px}
th,td{padding:11px 13px;border-bottom:1px solid var(--ice);text-align:left;vertical-align:top}
thead th{background:var(--navy);color:var(--cream);font-size:12px;letter-spacing:.05em;font-weight:600}
tbody tr{transition:background .2s}
tbody tr:hover{background:#fbf9f2}
tbody tr:last-child td{border-bottom:0}
td.rc{text-align:center;font-weight:700}
td.rc span{display:inline-block;width:26px;height:26px;line-height:26px;border-radius:50%;font-size:12px;transition:transform .2s}
tbody tr:hover td.rc span{transform:scale(1.15)}
td.rc .R{background:var(--navy);color:var(--cream)}
td.rc .A{background:var(--gold);color:#fff}
td.rc .C{background:var(--ice);color:var(--navy)}
td.rc .I{background:transparent;color:var(--gray);border:1px solid var(--line)}
.legend{display:flex;gap:16px;flex-wrap:wrap;font-size:12px;color:var(--gray);margin-top:10px}
.legend b{color:var(--navy)}

/* ---------- assessment: seletor ---------- */
.ass-pick{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;margin-bottom:26px}
.ass-pick button{appearance:none;cursor:pointer;text-align:left;background:var(--white);
  border:1px solid var(--line);border-radius:14px;padding:18px;transition:.25s;position:relative}
.ass-pick button:hover{transform:translateY(-2px);box-shadow:0 10px 24px -14px rgba(46,57,71,.35)}
.ass-pick button.on{border-color:var(--gold);box-shadow:0 0 0 2px var(--gold)}
.ass-pick .t{font-family:'Fraunces';font-size:17px;color:var(--navy);font-weight:600}
.ass-pick .d{font-size:12.5px;color:var(--gray);margin-top:4px}
.ass-pick .done{position:absolute;top:12px;right:12px;background:var(--gold);color:#fff;font-size:10px;
  font-weight:700;border-radius:999px;padding:3px 10px;letter-spacing:.05em}

/* ---------- assessment: wizard ---------- */
.wizard{max-width:720px;margin:0 auto}
.wiz-top{display:flex;align-items:center;gap:14px;margin-bottom:18px}
.wiz-prog{flex:1;height:8px;background:var(--ice);border-radius:4px;overflow:hidden}
.wiz-prog i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--gold),var(--navy));border-radius:4px;transition:width .45s cubic-bezier(.2,.7,.3,1)}
.wiz-count{font-size:12px;font-weight:700;color:var(--navy);min-width:44px;text-align:right}
.wiz-card{background:var(--white);border:1px solid var(--line);border-radius:16px;padding:28px;animation:popIn .35s cubic-bezier(.2,.7,.3,1) both}
.wiz-card .qn{font-size:11px;font-weight:700;letter-spacing:.16em;color:var(--gold);text-transform:uppercase}
.wiz-card .qt{font-family:'Fraunces';font-size:21px;color:var(--navy);margin:10px 0 22px;line-height:1.35}
.opts{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}
.opts button{appearance:none;cursor:pointer;background:var(--cream);border:1px solid var(--line);border-radius:12px;
  padding:14px 8px;text-align:center;transition:.2s}
.opts button:hover{border-color:var(--gold);transform:translateY(-2px)}
.opts button.sel{background:var(--navy);border-color:var(--navy);color:var(--cream)}
.opts button .v{font-family:'Fraunces';font-size:22px;color:var(--gold);line-height:1}
.opts button .l{display:block;font-size:10.5px;color:var(--gray);margin-top:6px;line-height:1.3}
.opts button.sel .l{color:#c9d2de}
@media(max-width:700px){
  .opts{grid-template-columns:1fr;gap:8px}
  .opts button{display:flex;align-items:center;gap:14px;text-align:left;padding:10px 16px}
  .opts button .l{margin-top:0;font-size:12px}
}
.kbd-hint{text-align:center;font-size:11.5px;color:var(--gray);margin-top:12px}
.kbd-hint b{display:inline-block;border:1px solid var(--line);border-bottom-width:2px;border-radius:5px;
  padding:0 6px;font-size:10.5px;color:var(--navy);background:var(--white)}
@media(max-width:700px){.kbd-hint{display:none}}
.wiz-nav{display:flex;gap:12px;align-items:center;margin-top:16px}
.wiz-nav .spacer{flex:1}
.linkish{appearance:none;background:none;border:0;cursor:pointer;color:var(--gray);font-size:12.5px;text-decoration:underline;text-underline-offset:3px}
.linkish:hover{color:var(--navy)}

.btn{appearance:none;border:0;cursor:pointer;font-weight:700;font-size:14px;border-radius:12px;
  padding:13px 28px;background:var(--navy);color:var(--cream);letter-spacing:.03em;transition:.2s}
.btn:hover{background:#3c4c60;transform:translateY(-1px)}
.btn.ghost{background:transparent;color:var(--gray);border:1px solid var(--line)}
.btn.gold{background:var(--gold)}
.btn.gold:hover{background:#87795a}

/* ---------- assessment: resultado ---------- */
.result{display:none;border:1px solid var(--gold);border-radius:16px;background:var(--white);padding:26px;margin-top:8px}
.result.on{display:block;animation:popIn .4s cubic-bezier(.2,.7,.3,1)}
.res-grid{display:grid;grid-template-columns:330px 1fr;gap:26px;align-items:start}
@media(max-width:820px){.res-grid{grid-template-columns:1fr}}
.radar{width:100%;max-width:330px}
.radar-shape{animation:radarIn .9s cubic-bezier(.2,.8,.3,1) .15s both}
.quad{width:100%;max-width:330px}
.quad-dot{animation:popIn .5s .5s both}
.quad-pulse{transform-origin:center;transform-box:fill-box;animation:pulseRing 1.6s ease-out .7s 3}
.score-line{display:flex;align-items:baseline;gap:14px;flex-wrap:wrap}
.score{font-family:'Fraunces';font-size:54px;color:var(--navy);line-height:1}
.lvl-name{font-family:'Fraunces';font-size:23px;color:var(--gold)}
.gauge{position:relative;margin:18px 0 8px;height:44px}
.gauge-track{display:grid;grid-template-columns:repeat(5,1fr);gap:3px;height:12px;border-radius:6px;overflow:hidden}
.gauge-track i{background:var(--ice)}
.gauge-track i.f{background:linear-gradient(90deg,var(--gold),var(--navy));background-size:400% 100%;animation:shimmer 3s linear infinite}
.gauge-marker{position:absolute;top:14px;transform:translateX(-50%);left:0;transition:left 1s cubic-bezier(.2,.7,.3,1);text-align:center}
.gauge-marker::before{content:'';display:block;margin:0 auto;width:0;height:0;border:7px solid transparent;border-bottom-color:var(--navy);border-top:0}
.gauge-marker span{display:inline-block;background:var(--navy);color:var(--cream);font-size:11px;font-weight:700;border-radius:6px;padding:2px 8px}
.gauge-labels{display:flex;justify-content:space-between;font-size:10.5px;color:var(--gray);margin-top:2px}
.dimbars{display:grid;gap:10px;margin:14px 0 6px}
.dimbar{display:grid;grid-template-columns:180px 1fr 34px;gap:12px;align-items:center;font-size:13px}
@media(max-width:640px){.dimbar{grid-template-columns:1fr;gap:4px}}
.dimbar .tr{height:8px;background:var(--ice);border-radius:4px;overflow:hidden}
.dimbar .tr i{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--gold),var(--navy));border-radius:4px;transition:width .9s cubic-bezier(.2,.7,.3,1)}
.dimbar b{text-align:right;color:var(--navy)}
.reco{background:var(--ice);border-radius:12px;padding:18px;margin-top:16px}
.reco h4{color:var(--navy);font-family:'Fraunces';font-size:16px;margin-bottom:8px}
.res-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}
.res-actions .btn{font-size:13px;padding:11px 20px}
.axes{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:10px 0}
@media(max-width:640px){.axes{grid-template-columns:1fr}}
.axis-card{border:1px solid var(--line);border-radius:12px;padding:16px;background:var(--cream)}
.axis-card h5{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--gold)}
.axis-card .v{font-family:'Fraunces';font-size:30px;color:var(--navy)}
.modo-strip{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-top:14px}
@media(max-width:640px){.modo-strip{grid-template-columns:1fr}}
.modo-strip .m{border:1px solid var(--line);border-radius:12px;padding:14px;background:var(--white);font-size:12.5px;transition:.3s}
.modo-strip .m.on{border-color:var(--gold);background:#fbf9f2;box-shadow:0 0 0 2px var(--gold)}
.modo-strip .m b{display:block;font-family:'Fraunces';font-size:15px;color:var(--navy);margin-bottom:4px}
.toast{position:fixed;bottom:24px;left:50%;transform:translate(-50%,80px);background:var(--navy);color:var(--cream);
  font-size:13px;font-weight:600;border-radius:999px;padding:10px 22px;transition:transform .35s;z-index:99}
.toast.on{transform:translate(-50%,0)}

/* ---------- clientes: barra do cliente ativo ---------- */
.clientbar{display:flex;align-items:center;gap:16px;flex-wrap:wrap;background:var(--white);
  border:1px solid var(--line);border-left:4px solid var(--gold);border-radius:14px;padding:12px 18px;margin-bottom:22px}
.clientbar .cb-k{font-size:10.5px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);display:block;margin-bottom:3px}
.clientbar select{appearance:none;font:inherit;font-weight:600;color:var(--navy);border:1px solid var(--line);
  border-radius:9px;padding:8px 30px 8px 12px;background:var(--cream) url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%234A5C72'/%3E%3C/svg%3E") no-repeat right 12px center;min-width:200px;cursor:pointer}
.clientbar .cb-chips{display:flex;gap:8px;flex-wrap:wrap;flex:1}
.clientbar .cchip{font-size:12px;color:var(--gray);background:var(--cream);border:1px solid var(--line);border-radius:999px;padding:4px 12px}
.clientbar .cchip b{color:var(--navy);font-family:'Fraunces';margin-right:3px}
.clientbar .muted{font-size:12.5px;color:var(--gray);font-style:italic}
.clientbar .cb-right{display:flex;gap:14px}

/* ---------- clientes: carteira ---------- */
.newcli{margin-bottom:18px}
.newcli-form{display:grid;grid-template-columns:1.4fr 1fr 1fr auto;gap:10px;margin-top:12px}
@media(max-width:820px){.newcli-form{grid-template-columns:1fr}}
.newcli-form input{font:inherit;border:1px solid var(--line);border-radius:10px;padding:11px 13px;background:var(--cream);color:var(--ink)}
.newcli-form input:focus{outline:none;border-color:var(--gold);box-shadow:0 0 0 2px rgba(153,141,103,.2)}
.roster-actions{display:flex;gap:18px;margin:0 0 16px;font-size:13px}
.roster{display:grid;grid-template-columns:repeat(auto-fill,minmax(320px,1fr));gap:14px}
.rcard{background:var(--white);border:1px solid var(--line);border-radius:14px;padding:18px;transition:.25s;display:flex;flex-direction:column;gap:12px}
.rcard:hover{transform:translateY(-2px);box-shadow:0 12px 26px -16px rgba(46,57,71,.4)}
.rcard.active{border-color:var(--gold);box-shadow:0 0 0 1px var(--gold)}
.rcard-h{display:flex;justify-content:space-between;align-items:flex-start;gap:10px}
.rc-name{font-family:'Fraunces';font-size:18px;color:var(--navy)}
.rc-meta{font-size:12px;color:var(--gray);margin-top:2px}
.rc-active{font-size:10px;font-weight:700;letter-spacing:.06em;background:var(--gold);color:#fff;border-radius:999px;padding:3px 10px;text-transform:uppercase;white-space:nowrap}
.rc-fronts{display:flex;flex-direction:column;gap:7px}
.rc-front{display:grid;grid-template-columns:52px 1fr 54px;gap:10px;align-items:center;font-size:12px}
.rc-front .rc-sig{font-weight:700;color:var(--navy)}
.rc-front .rc-bar{height:7px;background:var(--ice);border-radius:4px;overflow:hidden}
.rc-front .rc-bar i{display:block;height:100%;background:linear-gradient(90deg,var(--gold),var(--navy));border-radius:4px}
.rc-front .rc-lab{text-align:right;color:var(--gray);font-weight:600}
.rc-actions{display:flex;gap:12px;flex-wrap:wrap;align-items:center;border-top:1px solid var(--ice);padding-top:12px}
.btn.sm{font-size:12.5px;padding:8px 16px;border-radius:10px}
.linkish.danger{color:#a3562f}
.empty{background:var(--white);border:1px dashed var(--line);border-radius:14px;padding:34px;text-align:center;color:var(--gray)}

/* ---------- clientes: dossiê ---------- */
.doss-head{display:flex;justify-content:space-between;align-items:flex-start;gap:20px;flex-wrap:wrap;margin:8px 0 18px}
.doss-name{font-family:'Fraunces';font-size:26px;color:var(--navy);border:0;border-bottom:2px solid transparent;background:none;padding:2px 0;width:min(420px,90vw)}
.doss-name:focus{outline:none;border-bottom-color:var(--gold)}
.doss-meta{display:flex;gap:10px;margin-top:8px;flex-wrap:wrap}
.doss-meta input{font:inherit;font-size:13px;border:1px solid var(--line);border-radius:9px;padding:7px 11px;background:var(--cream);color:var(--ink)}
.doss-meta input:focus{outline:none;border-color:var(--gold)}
.doss-actions{display:flex;gap:10px;flex-wrap:wrap}
.doss-grid{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:16px}
@media(max-width:820px){.doss-grid{grid-template-columns:1fr}}
.dfront{background:var(--white);border:1px solid var(--line);border-radius:14px;padding:18px;border-top:4px solid var(--navy)}
.dfront.empty{border:1px dashed var(--line);border-top:1px dashed var(--line);text-align:left;padding:18px}
.dfront .df-sig{font-size:11px;font-weight:700;letter-spacing:.14em;color:var(--gold);text-transform:uppercase}
.dfront .df-score{font-family:'Fraunces';font-size:40px;color:var(--navy);line-height:1;margin:6px 0 2px}
.dfront .df-rec{font-family:'Fraunces';font-size:24px;color:var(--navy);margin:8px 0 2px}
.dfront .df-lvl{font-size:13px;color:var(--gold);font-weight:600}
.dfront .df-axes{font-size:12px;color:var(--gray);margin-top:6px}
.dfront .gauge{height:30px;margin:12px 0 0}
.dfront .gauge-labels{display:none}
.doss-notes{width:100%;min-height:90px;font:inherit;font-size:13.5px;border:1px solid var(--line);border-radius:10px;
  padding:12px;background:var(--cream);color:var(--ink);resize:vertical;margin-top:8px}
.doss-notes:focus{outline:none;border-color:var(--gold)}

/* ---------- overview ---------- */
.arch{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin:18px 0}
@media(max-width:900px){.arch{grid-template-columns:1fr}}
.arch .p{background:var(--white);border:1px solid var(--line);border-radius:14px;padding:22px;border-top:4px solid var(--navy);transition:transform .25s,box-shadow .25s}
.arch .p:hover{transform:translateY(-3px);box-shadow:0 12px 26px -16px rgba(46,57,71,.4)}
.arch .p.mid{border-top-color:var(--gold)}
.arch .p .role{font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--gold)}
.arch .p h3{font-size:22px;color:var(--navy);margin:4px 0 2px}
.arch .p .full{font-size:12.5px;color:var(--gray);margin-bottom:10px}
.arch .p .go{margin-top:12px;font-size:12px;font-weight:700;color:var(--navy);cursor:pointer;background:none;border:0;padding:0;letter-spacing:.04em}
.arch .p .go:hover{color:var(--gold)}
.layers{display:grid;gap:10px;max-width:560px;margin:16px 0}
.layers .l{background:var(--white);border:1px solid var(--line);border-left:5px solid var(--gold);border-radius:10px;padding:14px 18px;transition:.25s}
.layers .l:hover{transform:translateX(4px)}
.layers .l b{font-family:'Fraunces';color:var(--navy);font-size:15px}
.layers .l span{display:block;font-size:12.5px;color:var(--gray)}
.howto{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}
@media(max-width:900px){.howto{grid-template-columns:1fr 1fr}}
.howto .b{background:var(--white);border:1px solid var(--line);border-radius:12px;padding:14px;transition:.25s}
.howto .b:hover{transform:translateY(-2px);border-color:var(--gold)}
.howto .b .id{font-family:'Fraunces';color:var(--gold);font-size:20px}
.howto .b b{display:block;font-size:13px;color:var(--navy)}
.howto .b span{font-size:11.5px;color:var(--gray)}

.gloss{display:grid;grid-template-columns:1fr 1fr;gap:12px}
@media(max-width:800px){.gloss{grid-template-columns:1fr}}
.gloss .g{background:var(--white);border:1px solid var(--line);border-radius:12px;padding:16px;transition:.25s}
.gloss .g:hover{transform:translateY(-2px);border-color:var(--gold)}
.gloss .g b{font-family:'Fraunces';color:var(--navy);font-size:15px}
.gloss .g p{font-size:13px;color:var(--gray);margin-top:2px}

footer{background:var(--navy);color:#b9c3d0;padding:26px 0;font-size:12px}
footer .wrap{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
h3.sect{color:var(--navy);font-size:19px;margin:26px 0 12px}
h3.sect:first-child{margin-top:0}

/* ---------- impressão ---------- */
@media print{
  .navbar,.ass-pick,.wizard,.res-actions,footer,.toast,.clientbar,.newcli,
  .roster-actions,.rc-actions,.doss-actions,.rc-active,.dfront.empty,
  #dossie>.linkish{display:none!important}
  .doss-name,.doss-meta input,.doss-notes{border-color:transparent!important;background:none!important;padding-left:0!important}
  header{padding-bottom:20px}
  body{background:#fff}
  .result{border-color:var(--line)}
}
`;
}

// ------------------------------------------------------------
// Render: visão geral
// ------------------------------------------------------------
function sectHead(kicker, title, lead) {
  return `
  <div class="sect-head">
    <div class="kicker">${kicker}</div>
    <h3 class="serif">${title}</h3>
    ${lead ? `<p>${lead}</p>` : ''}
  </div>`;
}

function overviewHTML() {
  const p = PRODUCTS;
  return `
  ${sectHead('01 · Arquitetura', 'Três produtos, uma metodologia, uma régua',
    'Material interno para os times comercial e de consultoria: o que ofertar em cada disciplina e como identificar em que nível o cliente está.')}
  <div class="arch">
    ${[p.epp, p.pmgo, p.gmo].map((pr, i) => `
    <div class="p${i === 1 ? ' mid' : ''}">
      <div class="role">${esc(pr.papel)}</div>
      <h3>${esc(pr.sigla)}</h3>
      <div class="full">${esc(pr.nome)}</div>
      <p style="font-size:13px">${esc(pr.tagline)}</p>
      <p class="note">${esc(pr.nota)}</p>
      <button class="go" onclick="showTab('${pr.key}')">Explorar ${esc(pr.sigla)} →</button>
    </div>`).join('')}
  </div>

  ${sectHead('02 · Estrutura', 'Como o material se organiza',
    'Não é "framework = roadmap = diagnóstico": são três camadas distintas que se empilham. E cada produto se lê pela mesma sequência de cinco blocos, A–E.')}
  <div class="grid c2">
    <div class="card">
      <h3>As três camadas</h3>
      <div class="layers" style="margin:12px 0 0;max-width:none">
        <div class="l"><b>1 · Framework</b><span>Objetivo, escopo, pilares e entregáveis</span></div>
        <div class="l"><b>2 · Roadmap</b><span>Iniciativas por nível de maturidade — jornada de evolução, não lista de serviços</span></div>
        <div class="l"><b>3 · Diagnóstico (Assessment)</b><span>Posiciona o cliente na régua e devolve o roadmap recomendado</span></div>
      </div>
    </div>
    <div class="card">
      <h3>Os cinco blocos de leitura</h3>
      <ul class="clean" style="margin-top:12px">
        ${HOWTO_BLOCKS.map(b => `<li><b style="color:var(--gold);font-family:Fraunces">${b.id}</b> · <b>${esc(b.titulo)}</b> — ${esc(b.desc)}</li>`).join('')}
      </ul>
    </div>
  </div>

  ${sectHead('03 · Escala', 'Régua de maturidade única',
    'As três frentes usam a mesma escala — é isso que transforma três roadmaps soltos em uma metodologia: com escala compartilhada dá para posicionar o cliente e comparar as frentes entre si.')}
  ${maturityStripHTML()}

  ${sectHead('04 · Intensidade', 'Modo de atuação — eixo exclusivo do PM&amp;GO',
    'Além da maturidade, o PM&amp;GO define a intensidade com que a Obliant atua — de leve a mão na massa — em função da maturidade e da criticidade do momento.')}
  <div class="grid c3">
    ${MODOS_ATUACAO.map((m, i) => `
    <div class="card"><div class="kicker">Modo ${i + 1}</div><h3>${esc(m.nome)}</h3><p>${esc(m.desc)}</p><p class="note">${esc(m.quando)}</p></div>`).join('')}
  </div>

  <div class="cta">
    <div>
      <h3 class="serif">Posicione o cliente na régua em minutos</h3>
      <p>Responda o diagnóstico ao vivo com o cliente e receba na hora o nível de maturidade, o detalhamento por dimensão e o roadmap recomendado — com link compartilhável.</p>
    </div>
    <button class="btn gold" onclick="showTab('assessment')">Começar o assessment →</button>
  </div>`;
}

function maturityStripHTML() {
  return `
  <div class="mat">
    ${MATURITY_LEVELS.map(l => `
    <div class="step">
      <div class="bar"><i style="--w:${l.n * 20}%"></i></div>
      <h4>${l.n} · ${esc(l.nome)}</h4>
      <div class="rs">${esc(l.resumo)}</div>
      <p>${esc(l.desc)}</p>
    </div>`).join('')}
  </div>`;
}

// ------------------------------------------------------------
// Render: framework / roadmap / maturidade / raci por produto
// ------------------------------------------------------------
function frameworkHTML(prod) {
  const p = PRODUCTS[prod];
  const isPmgo = prod === 'pmgo';
  const entregaveis = p.entregaveis.map(e => (typeof e === 'string')
    ? `<li>${esc(e)}</li>`
    : `<li>${esc(e.nome)}<span class="tag ${e.tag}">${TAG_LABEL[e.tag]}</span></li>`).join('');
  return `
  <div class="kicker">Framework — bloco A</div>
  <div class="grid c2" style="margin-bottom:14px">
    <div class="card">
      <h3>Objetivo</h3>
      <p style="font-size:14px;color:var(--ink)">${esc(p.objetivo)}</p>
      <div class="pillars">
        ${p.pilares.map((pi, i) => `<div class="pill"><span>${i + 1}</span>${esc(pi)}</div>`).join('')}
      </div>
      ${p.pilaresNota ? `<p class="note">${esc(p.pilaresNota)}</p>` : ''}
    </div>
    <div class="card">
      <h3>Entregáveis</h3>
      <ul class="clean">${entregaveis}</ul>
    </div>
  </div>
  <h3 class="sect">8 dimensões do framework</h3>
  <div class="grid c4">
    ${p.dimensoes.map((d, i) => `
    <div class="card"><div class="num">${String(i + 1).padStart(2, '0')}</div><h4>${esc(d.nome)}</h4><p>${esc(d.desc)}</p></div>`).join('')}
  </div>
  ${isPmgo ? `<p class="note" style="margin-top:14px">Cada entregável e atividade do PM&amp;GO é etiquetado — <span class="tag pmo">PMO</span> <span class="tag gmo">GMO</span> <span class="tag compartilhado">Compartilhado</span> — para o Venn ser operacional, não só conceitual.</p>` : ''}`;
}

function roadmapHTML(prod) {
  const p = PRODUCTS[prod];
  return `
  <div class="kicker">Roadmap — bloco B</div>
  <p class="lead">Iniciativas organizadas por nível de maturidade: uma jornada de evolução, não uma lista de serviços. Faça o <button class="linkish" onclick="goAssessment('${prod}')">assessment interativo</button> para marcar aqui o nível atual e o recomendado.</p>
  <div class="road" data-road="${prod}">
    ${p.roadmap.map(r => {
      const lvl = MATURITY_LEVELS[r.nivel - 1];
      return `
      <div class="col" data-col="${r.nivel}">
        <span class="mark" style="display:none"></span>
        <header>
          <div class="lvl">NÍVEL ${r.nivel}</div><div class="nm">${esc(lvl.nome)}</div>
          <div class="dots">${MATURITY_LEVELS.map(x => `<i class="${x.n <= r.nivel ? 'f' : ''}"></i>`).join('')}</div>
        </header>
        <ul>${r.iniciativas.map(i => `<li>${esc(i)}</li>`).join('')}</ul>
      </div>`;
    }).join('')}
  </div>`;
}

function maturityHTML() {
  return `
  <div class="kicker">Maturidade — bloco C</div>
  <p class="lead">A régua única de 5 níveis, compartilhada pelas três frentes. Posicione o cliente aqui e leia o roadmap a partir do nível seguinte.</p>
  ${maturityStripHTML()}`;
}

function assessmentInfoHTML(prod) {
  const p = PRODUCTS[prod];
  const a = p.assessment;
  if (a.tipo === 'maturidade') {
    return `
    <div class="kicker">Assessment — bloco D</div>
    <p class="lead">${esc(a.intro)}</p>
    <div class="grid c3">
      ${a.dimensoes.map((d, i) => `<div class="card"><div class="num">${String(i + 1).padStart(2, '0')}</div><h4>${esc(d.nome)}</h4><p>${esc(d.pergunta)}</p></div>`).join('')}
    </div>
    <div style="margin-top:20px"><button class="btn" onclick="goAssessment('${prod}')">Preencher o assessment interativo →</button></div>`;
  }
  return `
  <div class="kicker">Assessment de fit — bloco D</div>
  <p class="lead">${esc(a.intro)}</p>
  <div class="grid c2">
    <div class="card"><h3>Eixo A — necessidade de entrega</h3><ul class="clean">
      ${a.perguntas.filter(q => q.eixo === 'A').map(q => `<li><b>${esc(q.nome)}.</b> ${esc(q.pergunta)}</li>`).join('')}</ul></div>
    <div class="card"><h3>Eixo B — necessidade de adoção</h3><ul class="clean">
      ${a.perguntas.filter(q => q.eixo === 'B').map(q => `<li><b>${esc(q.nome)}.</b> ${esc(q.pergunta)}</li>`).join('')}</ul></div>
  </div>
  <div style="margin-top:20px"><button class="btn" onclick="goAssessment('pmgo')">Preencher o assessment interativo →</button></div>`;
}

function raciHTML(prod) {
  const p = PRODUCTS[prod];
  const r = p.raci;
  return `
  <div class="kicker">RACI — bloco E</div>
  <div style="overflow-x:auto">
  <table>
    <thead><tr><th style="min-width:240px">Atividade</th>${r.papeis.map(x => `<th style="text-align:center">${esc(x)}</th>`).join('')}</tr></thead>
    <tbody>
    ${r.atividades.map(a => `
      <tr><td>${esc(a.nome)}${a.tag ? `<span class="tag ${a.tag}">${TAG_LABEL[a.tag]}</span>` : ''}</td>
      ${a.raci.map(x => `<td class="rc"><span class="${x}">${x}</span></td>`).join('')}</tr>`).join('')}
    </tbody>
  </table></div>
  <div class="legend"><span><b>R</b> Responsável</span><span><b>A</b> Aprovador</span><span><b>C</b> Consultado</span><span><b>I</b> Informado</span></div>`;
}

// ------------------------------------------------------------
// Render: Venn (exclusivo PM&GO) — interativo
// ------------------------------------------------------------
function vennHTML() {
  const v = PRODUCTS.pmgo.venn;
  const svg = `
  <svg width="460" height="252" viewBox="0 0 460 252" role="img" aria-label="Diagrama de Venn PMO × GMO">
    <defs><clipPath id="clipPmo"><circle cx="178" cy="126" r="112"/></clipPath></defs>
    <circle data-zone="pmo" cx="178" cy="126" r="112" fill="${C.navy}" fill-opacity="0.9"/>
    <circle data-zone="gmo" cx="282" cy="126" r="112" fill="${C.gold}" fill-opacity="0.9"/>
    <circle data-zone="mid" cx="282" cy="126" r="112" clip-path="url(#clipPmo)" fill="#3a4657"/>
    <text x="118" y="122" fill="${C.cream}" font-family="Fraunces,serif" font-size="21" text-anchor="middle" font-weight="600" pointer-events="none">PMO</text>
    <text x="118" y="143" fill="#c9d2de" font-family="Inter,sans-serif" font-size="11" text-anchor="middle" pointer-events="none">entrega</text>
    <text x="342" y="122" fill="#fff" font-family="Fraunces,serif" font-size="21" text-anchor="middle" font-weight="600" pointer-events="none">GMO</text>
    <text x="342" y="143" fill="#fff" font-family="Inter,sans-serif" font-size="11" text-anchor="middle" pointer-events="none">adoção</text>
    <text x="230" y="123" fill="#fff" font-family="Inter,sans-serif" font-size="10" text-anchor="middle" font-weight="700" letter-spacing="0.4" pointer-events="none">COMPARTILHADO</text>
    <text x="230" y="139" fill="#c9d2de" font-family="Inter,sans-serif" font-size="9.5" text-anchor="middle" pointer-events="none">governança única</text>
  </svg>`;
  return `
  <div class="kicker">Venn — o que é de quem</div>
  <p class="lead">O PM&amp;GO opera na intersecção: o que é só do PMO (entrega), o que é só do GMO (adoção) e o que é governado em conjunto. <b>Clique nas áreas do diagrama</b> (ou nos cards) para destacar cada zona.</p>
  <div class="vennfig">${svg}</div>
  <div class="venn-cols" id="vennCols">
    <div class="card" data-zone="pmo"><h3>Só PMO <span class="tag pmo">entrega</span></h3><ul class="clean">${v.pmo.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
    <div class="card mid" data-zone="mid"><h3>Compartilhado <span class="tag compartilhado">governança</span></h3><ul class="clean">${v.compartilhado.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
    <div class="card" data-zone="gmo"><h3>Só GMO <span class="tag gmo">adoção</span></h3><ul class="clean">${v.gmo.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
  </div>`;
}

// ------------------------------------------------------------
// Render: aba de produto (sub-abas)
// ------------------------------------------------------------
function productTabHTML(prod) {
  const p = PRODUCTS[prod];
  const subs = [
    { id: 'framework', label: 'Framework', html: frameworkHTML(prod) },
    ...(prod === 'pmgo' ? [{ id: 'venn', label: 'Venn', html: vennHTML() }] : []),
    { id: 'roadmap', label: 'Roadmap', html: roadmapHTML(prod) },
    { id: 'maturidade', label: 'Maturidade', html: maturityHTML() },
    { id: 'assessment', label: 'Assessment', html: assessmentInfoHTML(prod) },
    { id: 'raci', label: 'RACI', html: raciHTML(prod) },
  ];
  return `
  <div class="prod-hero${prod === 'pmgo' ? ' gold' : ''}">
    <div>
      <div class="ph-k">${esc(p.papel)} · ${esc(p.nome)}</div>
      <h2>${esc(p.sigla)}</h2>
      <p class="ph-t">${esc(p.tagline)}</p>
      <p class="ph-n">${esc(p.nota)}</p>
    </div>
    <button class="btn gold" onclick="goAssessment('${prod}')">Diagnóstico ${esc(p.sigla)} →</button>
  </div>
  <nav class="sub" data-prod="${prod}">
    ${subs.map((s, i) => `<button class="${i === 0 ? 'on' : ''}" data-sub="${s.id}">${s.label}</button>`).join('')}
  </nav>
  ${subs.map((s, i) => `<div class="subpane${i === 0 ? ' on' : ''}" data-pane="${prod}-${s.id}">${s.html}</div>`).join('')}`;
}

// ------------------------------------------------------------
// Render: aba Assessment interativo (wizard)
// ------------------------------------------------------------
function assessmentHTML() {
  return `
  <div class="kicker">Diagnóstico interativo</div>
  <h2 class="serif" style="color:var(--navy);font-size:28px">Assessment</h2>
  <p class="lead">Preencha <b>ao vivo com o cliente</b>: cada resposta é salva no dossiê do <b>cliente ativo</b>. Escolha a frente, responda uma pergunta por vez e o diagnóstico aparece na hora — com gráfico, régua e roadmap recomendado.</p>
  <div class="clientbar" id="clientBar">
    <div class="cb-left">
      <span class="cb-k">Cliente ativo</span>
      <select id="clientSelect" onchange="switchClient(this.value)"></select>
    </div>
    <div class="cb-chips" id="clientChips"></div>
    <div class="cb-right">
      <button class="linkish" onclick="promptNewClient()">+ Novo cliente</button>
      <button class="linkish" onclick="showTab('clientes')">Ver carteira</button>
    </div>
  </div>
  <div class="ass-pick">
    <button data-pick="epp" onclick="pickAssessment('epp')"><span class="done" style="display:none"></span><div class="t">EPP — maturidade</div><div class="d">6 dimensões de entrega · posiciona na régua e recomenda o próximo nível</div></button>
    <button data-pick="gmo" onclick="pickAssessment('gmo')"><span class="done" style="display:none"></span><div class="t">GMO — maturidade</div><div class="d">6 dimensões de adoção · posiciona na régua e recomenda o próximo nível</div></button>
    <button data-pick="pmgo" onclick="pickAssessment('pmgo')"><span class="done" style="display:none"></span><div class="t">PM&amp;GO — fit</div><div class="d">6 perguntas em 2 eixos · recomenda o produto certo e o modo de atuação</div></button>
  </div>
  ${['epp', 'gmo', 'pmgo'].map(prod => `
  <div class="wizard" data-wizard="${prod}" style="display:none">
    <div class="wiz-top">
      <div class="wiz-prog"><i></i></div>
      <span class="wiz-count"></span>
    </div>
    <div class="wiz-card"></div>
    <div class="wiz-nav">
      <button class="linkish" onclick="wizBack('${prod}')">← Voltar</button>
      <span class="spacer"></span>
      <button class="linkish" onclick="wizDemo('${prod}')">Preencher exemplo (demo)</button>
      <button class="linkish" onclick="wizReset('${prod}')">Recomeçar</button>
    </div>
  </div>
  <div class="result" data-result="${prod}"></div>`).join('')}
  <div class="toast" id="toast"></div>`;
}

function clientsHTML() {
  return `
  ${sectHead('Carteira', 'Clientes',
    'Cada cliente é um dossiê que reúne os diagnósticos das três frentes (EPP, GMO, PM&amp;GO). Tudo fica salvo neste navegador — exporte um dossiê para levar a outro dispositivo ou enviar a um colega.')}
  <div id="rosterTools">
    <div class="newcli card">
      <h3>Novo cliente</h3>
      <div class="newcli-form">
        <input id="ncNome" placeholder="Nome do cliente *" onkeydown="if(event.key==='Enter')addClientFromForm()">
        <input id="ncSetor" placeholder="Setor / segmento" onkeydown="if(event.key==='Enter')addClientFromForm()">
        <input id="ncResp" placeholder="Responsável (consultor)" onkeydown="if(event.key==='Enter')addClientFromForm()">
        <button class="btn" onclick="addClientFromForm()">Criar dossiê</button>
      </div>
    </div>
    <div class="roster-actions">
      <button class="linkish" onclick="exportAll()">↓ Exportar todos (JSON)</button>
      <label class="linkish" style="cursor:pointer">↑ Importar arquivo…<input id="importFile" type="file" accept="application/json" style="display:none" onchange="importFromFile(event)"></label>
    </div>
  </div>
  <div id="roster"></div>
  <div id="dossie" style="display:none"></div>`;
}

function glossarioHTML() {
  return `
  <div class="kicker">Termos e definições</div>
  <h2 class="serif" style="color:var(--navy);font-size:28px">Glossário</h2>
  <p class="lead">Vocabulário comum do material — o mesmo no deck e no site.</p>
  <div class="gloss">
    ${GLOSSARIO.map(g => `<div class="g"><b>${esc(g.termo)}</b><p>${esc(g.def)}</p></div>`).join('')}
  </div>`;
}

// ------------------------------------------------------------
// JS embutido (abas + wizard + gráficos + resultado)
// ------------------------------------------------------------
function js() {
  const data = {
    levels: MATURITY_LEVELS,
    thresholds: MATURITY_THRESHOLDS,
    modos: MODOS_ATUACAO,
    prods: {
      epp: { sigla: 'EPP', tipo: 'maturidade', qs: PRODUCTS.epp.assessment.dimensoes.map(d => ({ nome: d.nome, pergunta: d.pergunta })), roadmap: PRODUCTS.epp.roadmap },
      gmo: { sigla: 'GMO', tipo: 'maturidade', qs: PRODUCTS.gmo.assessment.dimensoes.map(d => ({ nome: d.nome, pergunta: d.pergunta })), roadmap: PRODUCTS.gmo.roadmap },
      pmgo: {
        sigla: 'PM&GO', tipo: 'fit',
        qs: PRODUCTS.pmgo.assessment.perguntas.map(q => ({ eixo: q.eixo, nome: q.nome, pergunta: q.pergunta })),
        cortes: PRODUCTS.pmgo.assessment.cortes,
        roadmap: PRODUCTS.pmgo.roadmap,
      },
    },
  };
  return `
const DATA = ${JSON.stringify(data)};
const NAVY='${C.navy}', GOLD='${C.gold}', LINE='${C.line}', ICE='${C.ice}', GRAY='${C.gray}', CREAM='${C.cream}';
const SCALE_MAT = ['Inexistente / ad hoc','Emergente','Estruturado','Integrado','Excelência'];
const SCALE_FIT = ['Discordo totalmente','Discordo em parte','Neutro','Concordo em parte','Concordo totalmente'];
const wiz = { epp:{i:0,answers:[]}, gmo:{i:0,answers:[]}, pmgo:{i:0,answers:[]} };

// ------- helpers -------
const $  = s=>document.querySelector(s);
const $$ = s=>Array.from(document.querySelectorAll(s));
function fmt(x){ return x.toFixed(1).replace('.',','); }
function esc2(s){ return String(s==null?'':s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }
function uid(){ try{ if(crypto&&crypto.randomUUID) return crypto.randomUUID(); }catch(e){} return 'c'+Date.now()+Math.floor(Math.random()*1e5); }
function stamp(){ return new Date().toISOString(); }
function fmtDate(iso){ try{ return new Date(iso).toLocaleDateString('pt-BR'); }catch(e){ return ''; } }
function slug(s){ return (s||'cliente').toLowerCase().normalize('NFD').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')||'cliente'; }

// ------- base de clientes (dossiês) no navegador -------
let DB = { version:2, activeId:null, clients:{} };
try{ const raw=JSON.parse(localStorage.getItem('obliant-clients')||'null'); if(raw&&raw.clients) DB=raw; }catch(e){}
try{ // migração do diagnóstico único antigo, se existir
  const old=JSON.parse(localStorage.getItem('obliant-diag')||'null');
  if(old && (old.epp||old.gmo||old.pmgo) && !Object.keys(DB.clients).length){
    const id=uid();
    DB.clients[id]={id,nome:'Cliente sem nome',setor:'',responsavel:'',criado:stamp(),atualizado:stamp(),notas:'',diag:old};
    DB.activeId=id; localStorage.removeItem('obliant-diag');
  }
}catch(e){}
let store = {};                                  // espelho do diag do cliente ativo
function saveDB(){ try{ localStorage.setItem('obliant-clients', JSON.stringify(DB)); }catch(e){} }
function activeClient(){ return DB.activeId ? DB.clients[DB.activeId] : null; }
function syncStore(){ const c=activeClient(); store = c ? (c.diag=c.diag||{}) : {}; }
function createClient(nome,setor,resp){
  const id=uid();
  DB.clients[id]={id,nome:(nome||'Novo cliente').trim(),setor:(setor||'').trim(),responsavel:(resp||'').trim(),criado:stamp(),atualizado:stamp(),notas:'',diag:{}};
  DB.activeId=id; syncStore(); saveDB(); return DB.clients[id];
}
function ensureActive(){ return activeClient() || createClient('Cliente 1'); }
function clientList(){ return Object.values(DB.clients).sort((a,b)=>(b.atualizado||'').localeCompare(a.atualizado||'')); }
syncStore();
function levelFor(avg){ for(const t of DATA.thresholds){ if(avg < t.max) return t.nivel; } return 5; }
function toast(msg){
  const t=$('#toast'); t.textContent=msg; t.classList.add('on');
  clearTimeout(t._h); t._h=setTimeout(()=>t.classList.remove('on'),2400);
}

// ------- abas de topo -------
function showTab(id){
  $$('nav.top button').forEach(b=>b.classList.toggle('on', b.dataset.tab===id));
  $$('section.tab').forEach(s=>s.classList.toggle('on', s.dataset.tab===id));
  if(id==='clientes') renderRoster();
  if(id==='assessment'){ updateClientBar(); refreshPicks(); }
  window.scrollTo({top:0,behavior:'smooth'});
}
$$('nav.top button').forEach(b=>b.addEventListener('click',()=>showTab(b.dataset.tab)));

// ------- sub-abas -------
function showSub(prod, sub){
  const nav=$('nav.sub[data-prod="'+prod+'"]');
  nav.querySelectorAll('button').forEach(x=>x.classList.toggle('on', x.dataset.sub===sub));
  $$('[data-pane^="'+prod+'-"]').forEach(p=>p.classList.toggle('on', p.dataset.pane===prod+'-'+sub));
  if(sub==='roadmap') paintRoadmap(prod);
}
$$('nav.sub').forEach(nav=>{
  nav.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>showSub(nav.dataset.prod, b.dataset.sub)));
});

// ------- venn interativo -------
(function(){
  const cols=$('#vennCols'); if(!cols) return;
  let cur=null;
  function focus(zone){
    cur = (cur===zone)? null : zone;
    cols.classList.toggle('sel', !!cur);
    cols.querySelectorAll('.card').forEach(c=>c.classList.toggle('focus', c.dataset.zone===cur));
  }
  $$('.vennfig [data-zone]').forEach(el=>el.addEventListener('click',()=>focus(el.dataset.zone)));
  cols.querySelectorAll('.card').forEach(c=>c.addEventListener('click',()=>focus(c.dataset.zone)));
})();

// ------- roadmap: marcas de diagnóstico -------
function paintRoadmap(prod){
  const road=$('[data-road="'+prod+'"]'); if(!road) return;
  const d=store[prod];
  road.querySelectorAll('.col').forEach(col=>{
    col.classList.remove('atual','reco','hot');
    const mark=col.querySelector('.mark'); mark.style.display='none';
    if(d && d.tipo==='maturidade'){
      const n=+col.dataset.col;
      if(n===d.nivel){ col.classList.add('atual'); mark.textContent='Você está aqui'; mark.style.display='block'; }
      if(n===Math.min(d.nivel+1,5) && d.nivel<5){ col.classList.add('reco'); mark.textContent='Recomendado'; mark.style.display='block'; }
      if(d.nivel===5 && n===5){ col.classList.add('reco'); mark.textContent='Sustentar'; mark.style.display='block'; }
    } else if(+col.dataset.col===3){ col.classList.add('hot'); }
  });
}
['epp','gmo','pmgo'].forEach(paintRoadmap);

// ------- seletor do assessment -------
function pickAssessment(prod){
  $$('.ass-pick button').forEach(b=>b.classList.toggle('on', b.dataset.pick===prod));
  $$('.wizard').forEach(w=>w.style.display = w.dataset.wizard===prod?'block':'none');
  $$('.result').forEach(r=>{ if(r.dataset.result!==prod){ r.classList.remove('on'); } });
  const w=wiz[prod];
  if(store[prod] && store[prod].answers && !$('[data-result="'+prod+'"]').classList.contains('on')){
    w.answers = store[prod].answers.slice(); finish(prod, false);
  } else if(!$('[data-result="'+prod+'"]').classList.contains('on')){
    renderStep(prod);
  }
}
function goAssessment(prod){ showTab('assessment'); pickAssessment(prod); }
function refreshPicks(){
  ['epp','gmo','pmgo'].forEach(prod=>{
    const el=$('.ass-pick button[data-pick="'+prod+'"] .done'); if(!el) return;
    const d=store[prod];
    if(d && d.tipo==='maturidade'){ el.textContent='Nível '+d.nivel; el.style.display='block'; }
    else if(d && d.tipo==='fit'){ el.textContent=d.rec; el.style.display='block'; }
    else el.style.display='none';
  });
}

// ------- barra do cliente ativo -------
function statusChip(prod,c){
  const d=c.diag[prod], sig=DATA.prods[prod].sigla;
  let v='—';
  if(d&&d.tipo==='maturidade') v='Nível '+d.nivel;
  else if(d&&d.tipo==='fit') v=d.rec;
  return '<span class="cchip"><b>'+sig+'</b>'+v+'</span>';
}
function updateClientBar(){
  const sel=$('#clientSelect'); if(!sel) return;
  const c=activeClient(), list=clientList();
  sel.innerHTML = list.length
    ? list.map(x=>'<option value="'+x.id+'"'+(c&&x.id===c.id?' selected':'')+'>'+esc2(x.nome)+'</option>').join('')
    : '<option value="">— nenhum cliente —</option>';
  const chips=$('#clientChips');
  chips.innerHTML = c ? ['epp','gmo','pmgo'].map(p=>statusChip(p,c)).join('')
    : '<span class="muted">Nenhum cliente ativo — crie um para começar</span>';
}
function switchClient(id){
  if(!id) return;
  DB.activeId=id; syncStore(); saveDB();
  resetWizards(); updateClientBar(); refreshPicks(); ['epp','gmo','pmgo'].forEach(paintRoadmap);
}
function resetWizards(){
  ['epp','gmo','pmgo'].forEach(p=>{ wiz[p]={i:0,answers:[]}; });
  $$('.wizard').forEach(w=>w.style.display='none');
  $$('.result').forEach(r=>r.classList.remove('on'));
  $$('.ass-pick button').forEach(b=>b.classList.remove('on'));
}
function promptNewClient(){
  const n=prompt('Nome do novo cliente:'); if(n===null) return;
  createClient(n||'Novo cliente'); resetWizards();
  updateClientBar(); refreshPicks(); ['epp','gmo','pmgo'].forEach(paintRoadmap);
  toast('Cliente criado — pronto para os assessments');
}

// ------- wizard -------
function renderStep(prod){
  const p=DATA.prods[prod], w=wiz[prod], n=p.qs.length;
  const q=p.qs[w.i];
  const labels = p.tipo==='fit' ? SCALE_FIT : SCALE_MAT;
  const wr=$('[data-wizard="'+prod+'"]');
  wr.style.display='block';
  $('[data-result="'+prod+'"]').classList.remove('on');
  wr.querySelector('.wiz-prog i').style.width = (w.i/n*100)+'%';
  wr.querySelector('.wiz-count').textContent = (w.i+1)+' / '+n;
  const kick = p.tipo==='fit' ? ('Eixo '+q.eixo+' · '+q.nome) : ('Dimensão '+(w.i+1)+' · '+q.nome);
  const card=wr.querySelector('.wiz-card');
  card.style.animation='none'; void card.offsetWidth; card.style.animation='';
  card.innerHTML =
    '<div class="qn">'+kick+'</div>'+
    '<div class="qt">'+q.pergunta+'</div>'+
    '<div class="opts">'+[1,2,3,4,5].map(v=>
      '<button onclick="answer(\\''+prod+'\\','+v+')" class="'+(w.answers[w.i]===v?'sel':'')+'">'+
      '<span class="v">'+v+'</span><span class="l">'+labels[v-1]+'</span></button>').join('')+'</div>'+
    '<div class="kbd-hint">Dica: use as teclas <b>1</b>–<b>5</b> para responder</div>';
  requestAnimationFrame(()=>{ wr.querySelector('.wiz-prog i').style.width = (w.i/n*100)+'%'; });
}
function answer(prod, val){
  ensureActive();
  const w=wiz[prod], n=DATA.prods[prod].qs.length;
  w.answers[w.i]=val;
  const wr=$('[data-wizard="'+prod+'"]');
  wr.querySelectorAll('.opts button').forEach((b,k)=>b.classList.toggle('sel', k+1===val));
  wr.querySelector('.wiz-prog i').style.width = ((w.i+1)/n*100)+'%';
  setTimeout(()=>{
    if(w.i < n-1){ w.i++; renderStep(prod); }
    else finish(prod, true);
  }, 320);
}
function wizBack(prod){
  const w=wiz[prod];
  if(w.i>0){ w.i--; renderStep(prod); }
}
function wizReset(prod){
  wiz[prod]={i:0,answers:[]};
  if(store) delete store[prod];
  persist(); refreshPicks(); paintRoadmap(prod); updateClientBar();
  $('[data-result="'+prod+'"]').classList.remove('on');
  renderStep(prod);
}
function wizDemo(prod){
  ensureActive();
  const n=DATA.prods[prod].qs.length;
  wiz[prod].answers = Array.from({length:n},(_,i)=> 1+((i*2+prod.length)%4) + (i%2));
  wiz[prod].answers = wiz[prod].answers.map(v=>Math.max(1,Math.min(5,v)));
  wiz[prod].i=n-1;
  finish(prod, true);
  toast('Exemplo preenchido — resultado demonstrativo');
}
function persist(){ const c=activeClient(); if(c) c.atualizado=stamp(); saveDB(); }

// ------- gráficos SVG -------
function radarSVG(names, vals){
  const cx=170, cy=145, R=96, n=names.length;
  const pt=(i,r)=>{const a=-Math.PI/2+i*2*Math.PI/n; return [cx+r*Math.cos(a), cy+r*Math.sin(a)];};
  let g='';
  for(let k=1;k<=5;k++) g+='<polygon points="'+names.map((_,i)=>pt(i,R*k/5).map(x=>x.toFixed(1)).join(',')).join(' ')+'" fill="none" stroke="'+LINE+'" stroke-width="'+(k===5?1.1:0.55)+'"/>';
  g+=names.map((_,i)=>{const [x,y]=pt(i,R); return '<line x1="'+cx+'" y1="'+cy+'" x2="'+x.toFixed(1)+'" y2="'+y.toFixed(1)+'" stroke="'+LINE+'" stroke-width="0.55"/>';}).join('');
  const labels=names.map((nm,i)=>{
    const [x,y]=pt(i,R+16);
    const anc = Math.abs(x-cx)<12 ? 'middle' : (x>cx?'start':'end');
    return '<text x="'+x.toFixed(1)+'" y="'+(y+3).toFixed(1)+'" font-size="9" font-weight="600" fill="'+NAVY+'" text-anchor="'+anc+'" font-family="Inter,sans-serif">'+nm+'</text>';
  }).join('');
  const poly=vals.map((v,i)=>pt(i,R*v/5).map(x=>x.toFixed(1)).join(',')).join(' ');
  const dots=vals.map((v,i)=>{const [x,y]=pt(i,R*v/5); return '<circle cx="'+x.toFixed(1)+'" cy="'+y.toFixed(1)+'" r="3.4" fill="'+GOLD+'"/>';}).join('');
  return '<svg class="radar" viewBox="0 0 340 300">'+g+labels+
    '<g class="radar-shape" style="transform-origin:'+cx+'px '+cy+'px">'+
    '<polygon points="'+poly+'" fill="rgba(74,92,114,.22)" stroke="'+NAVY+'" stroke-width="2"/>'+dots+'</g></svg>';
}
function quadSVG(a,b,cut){
  const S=320,P=42,w=S-2*P;
  const X=v=>P+(v-1)/4*w, Y=v=>S-P-(v-1)/4*w;
  const xc=X(cut), yc=Y(cut);
  const reg=(x,y,ww,hh,f,o)=>'<rect x="'+x+'" y="'+y+'" width="'+ww+'" height="'+hh+'" fill="'+f+'" fill-opacity="'+o+'"/>';
  const lbl=(x,y,t,big)=>'<text x="'+x+'" y="'+y+'" text-anchor="middle" font-family="'+(big?'Fraunces,serif':'Inter,sans-serif')+'" font-size="'+(big?13:10)+'" font-weight="'+(big?600:400)+'" fill="'+NAVY+'">'+t+'</text>';
  return '<svg class="quad" viewBox="0 0 320 320">'+
    reg(P,P,w,w,'#fff',1)+
    reg(xc,P,P+w-xc,yc-P,GOLD,.16)+          // A alto, B alto → PM&GO
    reg(xc,yc,P+w-xc,S-P-yc,NAVY,.10)+       // A alto, B baixo → EPP
    reg(P,P,xc-P,yc-P,GOLD,.08)+             // A baixo, B alto → GMO
    '<rect x="'+P+'" y="'+P+'" width="'+w+'" height="'+w+'" fill="none" stroke="'+LINE+'"/>'+
    '<line x1="'+xc+'" y1="'+P+'" x2="'+xc+'" y2="'+(S-P)+'" stroke="'+GOLD+'" stroke-dasharray="4 4"/>'+
    '<line x1="'+P+'" y1="'+yc+'" x2="'+(S-P)+'" y2="'+yc+'" stroke="'+GOLD+'" stroke-dasharray="4 4"/>'+
    lbl((xc+S-P)/2, (P+yc)/2 - 4, 'PM&GO', 1)+ lbl((xc+S-P)/2, (P+yc)/2+12, 'integração')+
    lbl((xc+S-P)/2, (yc+S-P)/2+2, 'EPP', 1)+
    lbl((P+xc)/2, (P+yc)/2+2, 'GMO', 1)+
    lbl((P+xc)/2, (yc+S-P)/2+2, 'Suporte leve', 1)+
    '<text x="'+(S/2)+'" y="'+(S-8)+'" text-anchor="middle" font-size="10" fill="'+GRAY+'" font-family="Inter,sans-serif">Eixo A → necessidade de entrega</text>'+
    '<text x="12" y="'+(S/2)+'" text-anchor="middle" font-size="10" fill="'+GRAY+'" font-family="Inter,sans-serif" transform="rotate(-90 12 '+(S/2)+')">Eixo B → necessidade de adoção</text>'+
    '<g class="quad-dot"><circle class="quad-pulse" cx="'+X(a)+'" cy="'+Y(b)+'" r="9" fill="none" stroke="'+GOLD+'" stroke-width="2"/>'+
    '<circle cx="'+X(a)+'" cy="'+Y(b)+'" r="7" fill="'+GOLD+'" stroke="#fff" stroke-width="2"/></g></svg>';
}
function gaugeHTML(avg){
  const lvl=levelFor(avg);
  const pos=((avg-1)/4*100).toFixed(1);
  return '<div class="gauge"><div class="gauge-track">'+
    DATA.levels.map(l=>'<i class="'+(l.n<=lvl?'f':'')+'"></i>').join('')+
    '</div><div class="gauge-marker" data-pos="'+pos+'"><span>'+fmt(avg)+'</span></div></div>'+
    '<div class="gauge-labels">'+DATA.levels.map(l=>'<span>'+l.n+' · '+l.nome+'</span>').join('')+'</div>';
}
function animateResult(el){
  requestAnimationFrame(()=>requestAnimationFrame(()=>{
    el.querySelectorAll('.dimbar .tr i').forEach(i=>{ i.style.width=i.dataset.w+'%'; });
    const m=el.querySelector('.gauge-marker'); if(m) m.style.left=m.dataset.pos+'%';
    const sc=el.querySelector('.score[data-count]');
    if(sc){ const target=+sc.dataset.count; const t0=performance.now();
      (function tick(t){ const k=Math.min(1,(t-t0)/900);
        sc.textContent=fmt(1+(target-1)*(1-Math.pow(1-k,3)));
        if(k<1) requestAnimationFrame(tick); })(t0);
    }
  }));
}

// ------- resultado: maturidade -------
function finish(prod, save){
  const p=DATA.prods[prod], w=wiz[prod];
  $('[data-wizard="'+prod+'"]').style.display='none';
  const el=$('[data-result="'+prod+'"]');
  if(p.tipo==='maturidade') renderMaturity(prod, el);
  else renderFit(prod, el);
  el.classList.add('on');
  if(save!==false){
    el.scrollIntoView({behavior:'smooth',block:'start'});
    persist(); refreshPicks(); paintRoadmap(prod); updateClientBar();
  }
  animateResult(el);
}
function renderMaturity(prod, el){
  const p=DATA.prods[prod], vals=wiz[prod].answers;
  const avg=vals.reduce((a,b)=>a+b,0)/vals.length;
  const nivel=levelFor(avg), lvl=DATA.levels[nivel-1];
  const next=Math.min(nivel+1,5), nextLvl=DATA.levels[next-1];
  const inits=p.roadmap.find(r=>r.nivel===next).iniciativas;
  const atTop=nivel===5;
  store[prod]={tipo:'maturidade',avg:+avg.toFixed(2),nivel,answers:vals.slice()};
  el.innerHTML =
    '<div class="kicker">Diagnóstico '+p.sigla+'</div>'+
    '<div class="res-grid">'+
      '<div>'+radarSVG(p.qs.map(q=>q.nome), vals)+'</div>'+
      '<div>'+
        '<div class="score-line"><div class="score" data-count="'+avg+'">1,0</div>'+
        '<div><div class="lvl-name">Nível '+nivel+' · '+lvl.nome+'</div>'+
        '<div style="color:var(--gray);font-size:13px;max-width:460px">'+lvl.desc+'</div></div></div>'+
        gaugeHTML(avg)+
        '<h4 style="font-family:Fraunces;color:var(--navy);margin:16px 0 6px">Detalhamento por dimensão</h4>'+
        '<div class="dimbars">'+vals.map((v,i)=>
          '<div class="dimbar"><span>'+p.qs[i].nome+'</span><div class="tr"><i data-w="'+(v*20)+'"></i></div><b>'+v+'</b></div>').join('')+'</div>'+
      '</div>'+
    '</div>'+
    '<div class="reco"><h4>'+(atTop
      ? 'Nível máximo — foco em sustentar a excelência'
      : 'Roadmap recomendado — iniciativas do Nível '+next+' · '+nextLvl.nome)+'</h4>'+
    '<ul class="clean">'+inits.map(i=>'<li>'+i+'</li>').join('')+'</ul></div>'+
    '<div class="res-actions">'+
      '<button class="btn gold" onclick="goRoadmap(\\''+prod+'\\')">Ver no roadmap →</button>'+
      '<button class="btn ghost" onclick="openActiveDossie()">Dossiê do cliente →</button>'+
      '<button class="btn ghost" onclick="window.print()">Imprimir / PDF</button>'+
      '<button class="btn ghost" onclick="wizReset(\\''+prod+'\\')">Refazer</button>'+
    '</div>';
}

// ------- resultado: fit -------
function renderFit(prod, el){
  const p=DATA.prods.pmgo, vals=wiz.pmgo.answers;
  const A=[],B=[];
  vals.forEach((v,i)=>(p.qs[i].eixo==='A'?A:B).push(v));
  const avgA=A.reduce((a,b)=>a+b,0)/A.length;
  const avgB=B.reduce((a,b)=>a+b,0)/B.length;
  const avgAll=vals.reduce((a,b)=>a+b,0)/vals.length;
  const hiA=avgA>=p.cortes.eixoAlto, hiB=avgB>=p.cortes.eixoAlto;
  let rec, desc, alvo;
  if(hiA&&hiB){ rec='PM&GO'; alvo='pmgo'; desc='Necessidade alta nos dois eixos: governança integrada de entrega + adoção sob um único modelo.'; }
  else if(hiA){ rec='EPP'; alvo='epp'; desc='Necessidade concentrada em entrega: estruturar método, portfólio, processos e indicadores — operado por um PMO.'; }
  else if(hiB){ rec='GMO'; alvo='gmo'; desc='Necessidade concentrada em adoção: tratar o lado humano da transformação — engajamento, capacitação e sustentação.'; }
  else { rec='Suporte leve'; alvo=null; desc='Necessidade baixa nos dois eixos: aconselhamento pontual, métodos e templates, sem estrutura dedicada.'; }
  const modo = avgAll>=p.cortes.modoDiretivo?2:(avgAll>=p.cortes.modoControle?1:0);
  store.pmgo={tipo:'fit',rec,modo,avgA:+avgA.toFixed(2),avgB:+avgB.toFixed(2),answers:vals.slice()};
  el.innerHTML =
    '<div class="kicker">Recomendação PM&GO — fit</div>'+
    '<div class="res-grid">'+
      '<div>'+quadSVG(avgA,avgB,p.cortes.eixoAlto)+'</div>'+
      '<div>'+
        '<div class="score" style="font-size:38px">'+rec+'</div>'+
        '<p style="font-size:14px;max-width:520px;margin-top:6px">'+desc+'</p>'+
        '<div class="axes">'+
          '<div class="axis-card"><h5>Eixo A · entrega</h5><div class="v">'+fmt(avgA)+'</div>'+
          '<div style="font-size:12px;color:var(--gray)">'+(hiA?'Alta':'Baixa/moderada')+' (corte: '+fmt(p.cortes.eixoAlto)+')</div></div>'+
          '<div class="axis-card"><h5>Eixo B · adoção</h5><div class="v">'+fmt(avgB)+'</div>'+
          '<div style="font-size:12px;color:var(--gray)">'+(hiB?'Alta':'Baixa/moderada')+' (corte: '+fmt(p.cortes.eixoAlto)+')</div></div>'+
        '</div>'+
        '<h4 style="font-family:Fraunces;color:var(--navy);margin:10px 0 4px">Modo de atuação recomendado</h4>'+
        '<div class="modo-strip">'+DATA.modos.map((m,i)=>
          '<div class="m'+(i===modo?' on':'')+'"><b>'+m.nome+'</b>'+m.desc+'</div>').join('')+'</div>'+
      '</div>'+
    '</div>'+
    (rec==='PM&GO'
      ? '<div class="reco"><h4>Primeiros passos — Nível 1 do roadmap PM&GO</h4><ul class="clean">'+
        p.roadmap[0].iniciativas.map(i=>'<li>'+i+'</li>').join('')+'</ul></div>' : '')+
    '<div class="res-actions">'+
      (alvo ? '<button class="btn gold" onclick="showTab(\\''+alvo+'\\')">Conhecer o '+rec+' →</button>' : '')+
      '<button class="btn ghost" onclick="openActiveDossie()">Dossiê do cliente →</button>'+
      '<button class="btn ghost" onclick="window.print()">Imprimir / PDF</button>'+
      '<button class="btn ghost" onclick="wizReset(\\'pmgo\\')">Refazer</button>'+
    '</div>';
}

// ------- ponte resultado → roadmap -------
function goRoadmap(prod){
  showTab(prod);
  showSub(prod,'roadmap');
}

// ------- carteira: roster -------
function renderRoster(){
  const el=$('#roster'), d=$('#dossie'); if(!el) return;
  d.style.display='none'; el.style.display='block';
  const tools=$('#rosterTools'); if(tools) tools.style.display='block';
  const list=clientList();
  if(!list.length){ el.innerHTML='<div class="empty">Nenhum cliente ainda. Crie o primeiro dossiê acima para começar.</div>'; return; }
  el.innerHTML='<div class="roster">'+list.map(c=>{
    const fronts=['epp','gmo','pmgo'].map(p=>{
      const dd=c.diag[p], sig=DATA.prods[p].sigla;
      let bar='', lab='—';
      if(dd&&dd.tipo==='maturidade'){ lab='Nível '+dd.nivel; bar='<i style="width:'+(dd.nivel*20)+'%"></i>'; }
      else if(dd&&dd.tipo==='fit'){ lab=dd.rec; bar='<i style="width:100%"></i>'; }
      return '<div class="rc-front"><span class="rc-sig">'+sig+'</span><div class="rc-bar">'+bar+'</div><span class="rc-lab">'+lab+'</span></div>';
    }).join('');
    const meta=[esc2(c.setor),esc2(c.responsavel)].filter(Boolean).join(' · ')+(c.atualizado?(((c.setor||c.responsavel)?' · ':'')+'atualizado '+fmtDate(c.atualizado)):'');
    return '<div class="rcard'+(c.id===DB.activeId?' active':'')+'">'+
      '<div class="rcard-h"><div><div class="rc-name">'+esc2(c.nome)+'</div>'+
      (meta?'<div class="rc-meta">'+meta+'</div>':'')+'</div>'+
      (c.id===DB.activeId?'<span class="rc-active">ativo</span>':'')+'</div>'+
      '<div class="rc-fronts">'+fronts+'</div>'+
      '<div class="rc-actions">'+
        '<button class="btn sm" onclick="openClient(\\''+c.id+'\\')">Abrir dossiê</button>'+
        '<button class="linkish" onclick="continueClient(\\''+c.id+'\\')">Preencher</button>'+
        '<button class="linkish" onclick="dupClient(\\''+c.id+'\\')">Duplicar</button>'+
        '<button class="linkish" onclick="exportClient(\\''+c.id+'\\')">Exportar</button>'+
        '<button class="linkish danger" onclick="delClient(\\''+c.id+'\\')">Excluir</button>'+
      '</div></div>';
  }).join('')+'</div>';
}
function addClientFromForm(){
  const n=$('#ncNome').value.trim();
  if(!n){ $('#ncNome').focus(); toast('Informe o nome do cliente'); return; }
  createClient(n, $('#ncSetor').value, $('#ncResp').value);
  $('#ncNome').value=$('#ncSetor').value=$('#ncResp').value='';
  renderRoster(); updateClientBar(); refreshPicks();
  toast('Dossiê criado — pronto para os assessments');
}
function openClient(id){ DB.activeId=id; syncStore(); saveDB(); renderDossie(id); }
function continueClient(id){
  DB.activeId=id; syncStore(); saveDB();
  resetWizards(); updateClientBar(); refreshPicks(); ['epp','gmo','pmgo'].forEach(paintRoadmap);
  showTab('assessment');
}
function dupClient(id){
  const s=DB.clients[id];
  const c=createClient(s.nome+' (cópia)', s.setor, s.responsavel);
  c.notas=s.notas; c.diag=JSON.parse(JSON.stringify(s.diag||{}));
  syncStore(); saveDB(); renderRoster(); updateClientBar(); refreshPicks();
  toast('Dossiê duplicado');
}
function delClient(id){
  if(!confirm('Excluir o dossiê de "'+DB.clients[id].nome+'"? Esta ação não pode ser desfeita.')) return;
  delete DB.clients[id];
  if(DB.activeId===id){ const l=clientList(); DB.activeId=l.length?l[0].id:null; }
  syncStore(); saveDB(); renderRoster(); updateClientBar(); refreshPicks(); ['epp','gmo','pmgo'].forEach(paintRoadmap);
}

// ------- dossiê consolidado -------
function openActiveDossie(){ const c=activeClient(); if(!c){ showTab('clientes'); return; } showTab('clientes'); renderDossie(c.id); }
function dossieFront(c,p){
  const dd=c.diag[p], P=DATA.prods[p];
  if(!dd) return '<div class="dfront empty"><div class="df-sig">'+P.sigla+'</div><p style="color:var(--gray);font-size:13px;margin:8px 0">Ainda não avaliado</p><button class="linkish" onclick="continueClient(\\''+c.id+'\\')">Preencher '+P.sigla+' →</button></div>';
  if(dd.tipo==='maturidade'){
    const lvl=DATA.levels[dd.nivel-1];
    return '<div class="dfront"><div class="df-sig">'+P.sigla+' · maturidade</div>'+
      '<div class="df-score">'+fmt(dd.avg)+'</div>'+
      '<div class="df-lvl">Nível '+dd.nivel+' · '+lvl.nome+'</div>'+
      gaugeHTML(dd.avg)+'</div>';
  }
  return '<div class="dfront"><div class="df-sig">'+P.sigla+' · fit</div>'+
    '<div class="df-rec">'+dd.rec+'</div>'+
    '<div class="df-lvl">Modo '+DATA.modos[dd.modo].nome+'</div>'+
    '<div class="df-axes">Eixo A '+fmt(dd.avgA)+' · Eixo B '+fmt(dd.avgB)+'</div></div>';
}
function renderDossie(id){
  const c=DB.clients[id]; if(!c) return;
  const el=$('#dossie'), ros=$('#roster');
  ros.style.display='none'; el.style.display='block';
  const tools=$('#rosterTools'); if(tools) tools.style.display='none';
  el.innerHTML =
    '<button class="linkish" onclick="renderRoster()">← Voltar à carteira</button>'+
    '<div class="doss-head">'+
      '<div><div class="kicker">Dossiê do cliente</div>'+
      '<input class="doss-name" value="'+esc2(c.nome)+'" oninput="editClient(\\''+id+'\\',\\'nome\\',this.value)">'+
      '<div class="doss-meta">'+
        '<input placeholder="Setor / segmento" value="'+esc2(c.setor)+'" oninput="editClient(\\''+id+'\\',\\'setor\\',this.value)">'+
        '<input placeholder="Responsável" value="'+esc2(c.responsavel)+'" oninput="editClient(\\''+id+'\\',\\'responsavel\\',this.value)">'+
      '</div></div>'+
      '<div class="doss-actions">'+
        '<button class="btn" onclick="continueClient(\\''+id+'\\')">Preencher assessments →</button>'+
        '<button class="btn ghost" onclick="window.print()">Imprimir / PDF</button>'+
        '<button class="btn ghost" onclick="shareClient(\\''+id+'\\')">Copiar link</button>'+
        '<button class="btn ghost" onclick="exportClient(\\''+id+'\\')">Exportar</button>'+
      '</div>'+
    '</div>'+
    '<div class="doss-grid">'+['epp','gmo','pmgo'].map(p=>dossieFront(c,p)).join('')+'</div>'+
    '<div class="card"><h3>Observações da consultoria</h3>'+
      '<textarea class="doss-notes" placeholder="Notas sobre este cliente — contexto, prioridades, próximos passos…" oninput="editClient(\\''+id+'\\',\\'notas\\',this.value)">'+esc2(c.notas||'')+'</textarea></div>';
  el.querySelectorAll('.gauge-marker').forEach(m=>{ m.style.left=m.dataset.pos+'%'; });
}
function editClient(id,field,val){ const c=DB.clients[id]; if(!c) return; c[field]=val; c.atualizado=stamp(); saveDB(); if(field==='nome') updateClientBar(); }

// ------- exportar / importar / compartilhar -------
function download(name,obj){
  const blob=new Blob([JSON.stringify(obj,null,2)],{type:'application/json'});
  const u=URL.createObjectURL(blob), a=document.createElement('a');
  a.href=u; a.download=name; document.body.appendChild(a); a.click(); a.remove();
  setTimeout(()=>URL.revokeObjectURL(u),1500);
}
function exportClient(id){ const c=DB.clients[id]; download('obliant-'+slug(c.nome)+'.json',{obliant:1,cliente:c}); }
function exportAll(){ download('obliant-clientes.json',{obliant:1,clientes:Object.values(DB.clients)}); toast('Exportado'); }
function importFromFile(ev){
  const f=ev.target.files[0]; if(!f) return;
  const r=new FileReader();
  r.onload=()=>{ try{
    const j=JSON.parse(r.result);
    const arr=j.clientes||(j.cliente?[j.cliente]:[]);
    let n=0;
    arr.forEach(c=>{ if(!c||!c.diag) return; const id=(c.id&&!DB.clients[c.id])?c.id:uid(); DB.clients[id]=Object.assign({},c,{id}); n++; });
    saveDB(); renderRoster(); updateClientBar(); toast(n+' cliente(s) importado(s)');
  }catch(e){ toast('Arquivo inválido'); } ev.target.value=''; };
  r.readAsText(f);
}
function shareClient(id){
  const c=DB.clients[id];
  const min={n:c.nome,s:c.setor,r:c.responsavel,d:c.diag};
  const url=location.origin+location.pathname+'#cli='+encodeURIComponent(btoa(unescape(encodeURIComponent(JSON.stringify(min)))));
  (navigator.clipboard?navigator.clipboard.writeText(url):Promise.reject())
    .then(()=>toast('Link do dossiê copiado — abra para importar em outro dispositivo'))
    .catch(()=>prompt('Copie o link do dossiê:',url));
}
// ------- teclado: 1–5 respondem o wizard ativo -------
document.addEventListener('keydown', e=>{
  if(e.key<'1'||e.key>'5') return;
  if(!document.querySelector('section.tab[data-tab="assessment"]').classList.contains('on')) return;
  const w=$$('.wizard').find(x=>x.style.display!=='none');
  if(w) answer(w.dataset.wizard, +e.key);
});

// ------- init da barra + restaurar de link -------
updateClientBar();

(function restoreFromHash(){
  const cli=location.hash.match(/#cli=([^&]+)/);
  if(cli){
    try{
      const j=JSON.parse(decodeURIComponent(escape(atob(decodeURIComponent(cli[1])))));
      const id=uid();
      DB.clients[id]={id,nome:j.n||'Cliente compartilhado',setor:j.s||'',responsavel:j.r||'',criado:stamp(),atualizado:stamp(),notas:'',diag:j.d||{}};
      DB.activeId=id; syncStore(); saveDB();
      updateClientBar(); refreshPicks();
      showTab('clientes'); renderDossie(id);
      toast('Dossiê importado do link');
    }catch(e){}
    return;
  }
  const m=location.hash.match(/#d=(epp|gmo|pmgo):([1-5]{6})/);
  if(!m) return;
  const prod=m[1];
  createClient('Diagnóstico compartilhado');
  wiz[prod].answers=m[2].split('').map(Number);
  showTab('assessment'); updateClientBar();
  $$('.ass-pick button').forEach(b=>b.classList.toggle('on', b.dataset.pick===prod));
  finish(prod, true);
})();
`;
}

// ------------------------------------------------------------
// Página completa
// ------------------------------------------------------------
function pageHTML() {
  const tabs = [
    { id: 'visao', label: 'Visão geral', html: overviewHTML() },
    { id: 'epp', label: 'EPP', html: productTabHTML('epp') },
    { id: 'gmo', label: 'GMO', html: productTabHTML('gmo') },
    { id: 'pmgo', label: 'PM&GO', html: productTabHTML('pmgo') },
    { id: 'clientes', label: 'Clientes', html: clientsHTML() },
    { id: 'assessment', label: 'Assessment', html: assessmentHTML() },
    { id: 'glossario', label: 'Glossário', html: glossarioHTML() },
  ];
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Obliant — Metodologia Governança, Projetos e Mudança</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>${css()}</style>
</head>
<body>
<header>
  <div class="wrap">
    <div class="brand">${esc(WORDMARK.split(' ')[0])} <b>${esc(WORDMARK.split(' ').slice(1).join(' '))}</b></div>
    <h1>Metodologia Governança,<br>Projetos e Mudança</h1>
    <p class="sub">Ativo interno de consultoria · orienta o que ofertar em cada disciplina e como posicionar o cliente na régua de maturidade.</p>
  </div>
</header>
<div class="navbar">
  <div class="wrap">
    <span class="mini">${esc(WORDMARK.split(' ')[0])} <b>${esc(WORDMARK.split(' ').slice(1).join(' '))}</b></span>
    <nav class="top">
      ${tabs.map((t, i) => `<button class="${i === 0 ? 'on' : ''}" data-tab="${t.id}">${t.label}</button>`).join('')}
    </nav>
  </div>
</div>
<main>
  <div class="wrap">
    ${tabs.map((t, i) => `<section class="tab${i === 0 ? ' on' : ''}" data-tab="${t.id}">${t.html}</section>`).join('')}
  </div>
</main>
<footer>
  <div class="wrap">
    <span>${esc(WORDMARK)} · Metodologia Governança, Projetos e Mudança</span>
    <span>Material interno · uso comercial e de consultoria</span>
  </div>
</footer>
<script>${js()}</script>
</body>
</html>`;
}

// ------------------------------------------------------------
const html = pageHTML();
fs.writeFileSync(path.join(__dirname, 'metodologia_obliant.html'), html);
fs.mkdirSync(path.join(__dirname, 'dist'), { recursive: true });
fs.writeFileSync(path.join(__dirname, 'dist', 'index.html'), html);
console.log('OK: metodologia_obliant.html e dist/index.html gerados (' + (html.length / 1024).toFixed(0) + ' KB)');
