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
const PRODS = ['epp', 'gmo', 'pmgo'];
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

/* ---------- header ---------- */
header{background:var(--navy);color:var(--cream);padding:34px 0 0}
.brand{display:flex;align-items:baseline;gap:12px;letter-spacing:.28em;font-size:13px;font-weight:600}
.brand b{color:var(--gold)}
header h1{font-size:clamp(26px,4vw,40px);margin:18px 0 6px;font-weight:600}
header p.sub{color:#c9d2de;max-width:640px;font-size:15px}
.chip-row{display:flex;gap:8px;margin:16px 0 26px;flex-wrap:wrap}
.chip{border:1px solid rgba(255,253,246,.35);color:var(--cream);border-radius:999px;padding:4px 14px;font-size:12px;letter-spacing:.06em}
.chip em{color:var(--gold);font-style:normal;font-weight:600}

/* ---------- top tabs ---------- */
nav.top{display:flex;gap:2px;flex-wrap:wrap}
nav.top button{appearance:none;border:0;cursor:pointer;font:inherit;font-size:13.5px;font-weight:600;
  padding:12px 20px;background:transparent;color:#b9c3d0;border-radius:10px 10px 0 0;letter-spacing:.02em}
nav.top button:hover{color:var(--cream)}
nav.top button.on{background:var(--cream);color:var(--navy)}

/* ---------- sections ---------- */
main{padding:34px 0 70px}
section.tab{display:none}
section.tab.on{display:block;animation:fade .25s ease}
@keyframes fade{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}

.prod-head{display:flex;align-items:baseline;gap:14px;flex-wrap:wrap;margin-bottom:4px}
.prod-head h2{font-size:30px;color:var(--navy)}
.badge{background:var(--navy);color:var(--cream);font-size:11px;font-weight:600;letter-spacing:.12em;
  padding:4px 12px;border-radius:999px;text-transform:uppercase}
.badge.gold{background:var(--gold)}
p.lead{color:var(--gray);max-width:720px;margin:6px 0 20px}
p.note{font-size:12.5px;color:var(--gray);font-style:italic;margin-top:10px}

/* ---------- sub tabs ---------- */
nav.sub{display:flex;gap:6px;flex-wrap:wrap;border-bottom:1px solid var(--line);margin:10px 0 24px}
nav.sub button{appearance:none;border:0;background:none;cursor:pointer;font:inherit;font-size:13px;font-weight:600;
  color:var(--gray);padding:9px 14px;border-bottom:2px solid transparent;margin-bottom:-1px}
nav.sub button.on{color:var(--navy);border-color:var(--gold)}
.subpane{display:none}
.subpane.on{display:block;animation:fade .2s ease}

/* ---------- cards / grids ---------- */
.grid{display:grid;gap:14px}
.grid.c2{grid-template-columns:repeat(auto-fit,minmax(300px,1fr))}
.grid.c3{grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}
.grid.c4{grid-template-columns:repeat(auto-fit,minmax(200px,1fr))}
.card{background:var(--white);border:1px solid var(--line);border-radius:14px;padding:20px}
.card h3{color:var(--navy);font-size:17px;margin-bottom:8px}
.card h4{font-size:13px;color:var(--navy);margin-bottom:4px;font-family:'Inter';font-weight:700}
.card p{font-size:13px;color:var(--gray)}
.kicker{font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--gold);margin-bottom:10px}
.num{font-family:'Fraunces';font-size:26px;color:var(--gold);line-height:1}

/* pilares */
.pillars{display:flex;gap:10px;flex-wrap:wrap;margin:14px 0}
.pill{background:var(--navy);color:var(--cream);border-radius:10px;padding:12px 18px;font-size:13.5px;font-weight:600;
  display:flex;align-items:center;gap:8px}
.pill span{color:var(--gold);font-family:'Fraunces';font-size:15px}

ul.clean{list-style:none}
ul.clean li{padding:8px 0 8px 22px;position:relative;border-bottom:1px solid var(--ice);font-size:13.5px}
ul.clean li:last-child{border-bottom:0}
ul.clean li::before{content:'';position:absolute;left:2px;top:15px;width:7px;height:7px;border-radius:50%;background:var(--gold)}

/* ---------- roadmap ---------- */
.road{display:grid;grid-template-columns:repeat(5,1fr);gap:12px}
@media(max-width:900px){.road{grid-template-columns:1fr}}
.road .col{background:var(--white);border:1px solid var(--line);border-radius:14px;overflow:hidden;display:flex;flex-direction:column}
.road .col header{background:var(--ice);color:var(--navy);padding:12px 14px}
.road .col header .lvl{font-size:11px;font-weight:700;letter-spacing:.14em;color:var(--gold)}
.road .col header .nm{font-family:'Fraunces';font-size:17px}
.road .col.hot header{background:var(--navy);color:var(--cream)}
.road ul{list-style:none;padding:8px 14px 14px}
.road li{font-size:12.5px;padding:7px 0 7px 16px;position:relative;border-bottom:1px solid var(--ice);color:var(--ink)}
.road li:last-child{border-bottom:0}
.road li::before{content:'';position:absolute;left:0;top:13px;width:6px;height:6px;border-radius:50%;background:var(--gold)}

/* ---------- maturity ---------- */
.mat{display:grid;grid-template-columns:repeat(5,1fr);gap:0;border:1px solid var(--line);border-radius:14px;overflow:hidden;background:var(--white)}
@media(max-width:900px){.mat{grid-template-columns:1fr}}
.mat .step{padding:20px 16px;border-right:1px solid var(--line);position:relative}
.mat .step:last-child{border-right:0}
.mat .step .bar{height:6px;border-radius:3px;background:var(--ice);margin-bottom:14px;overflow:hidden}
.mat .step .bar i{display:block;height:100%;background:linear-gradient(90deg,var(--gold),var(--navy))}
.mat .step h4{font-family:'Fraunces';font-size:16px;color:var(--navy);font-weight:600}
.mat .step .rs{font-size:12px;font-weight:600;color:var(--gold);margin:2px 0 8px}
.mat .step p{font-size:12px;color:var(--gray)}

/* ---------- venn ---------- */
.venn-cols{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px}
@media(max-width:900px){.venn-cols{grid-template-columns:1fr}}
.venn-cols .card{border-top:4px solid var(--navy)}
.venn-cols .card.mid{border-top-color:var(--gold);background:#fbf9f2}
.vennfig{display:flex;justify-content:center;margin:8px 0 22px}
.tag{display:inline-block;font-size:10px;font-weight:700;letter-spacing:.08em;border-radius:999px;padding:2px 9px;margin-left:8px;vertical-align:1px}
.tag.pmo{background:var(--navy);color:var(--cream)}
.tag.gmo{background:var(--gold);color:var(--white)}
.tag.compartilhado{background:var(--ice);color:var(--navy);border:1px solid var(--line)}

/* ---------- table / raci ---------- */
table{width:100%;border-collapse:collapse;background:var(--white);border:1px solid var(--line);border-radius:14px;overflow:hidden;font-size:13px}
th,td{padding:11px 13px;border-bottom:1px solid var(--ice);text-align:left;vertical-align:top}
thead th{background:var(--navy);color:var(--cream);font-size:12px;letter-spacing:.05em;font-weight:600}
tbody tr:last-child td{border-bottom:0}
td.rc{text-align:center;font-weight:700}
td.rc span{display:inline-block;width:26px;height:26px;line-height:26px;border-radius:50%;font-size:12px}
td.rc .R{background:var(--navy);color:var(--cream)}
td.rc .A{background:var(--gold);color:#fff}
td.rc .C{background:var(--ice);color:var(--navy)}
td.rc .I{background:transparent;color:var(--gray);border:1px solid var(--line)}
.legend{display:flex;gap:16px;flex-wrap:wrap;font-size:12px;color:var(--gray);margin-top:10px}
.legend b{color:var(--navy)}

/* ---------- assessment ---------- */
.ass-pick{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;margin-bottom:26px}
.ass-pick button{appearance:none;font:inherit;cursor:pointer;text-align:left;background:var(--white);
  border:1px solid var(--line);border-radius:14px;padding:18px}
.ass-pick button.on{border-color:var(--gold);box-shadow:0 0 0 2px var(--gold)}
.ass-pick .t{font-family:'Fraunces';font-size:17px;color:var(--navy);font-weight:600}
.ass-pick .d{font-size:12.5px;color:var(--gray);margin-top:4px}
.qcard{background:var(--white);border:1px solid var(--line);border-radius:14px;padding:18px 20px;margin-bottom:12px}
.qcard .qn{font-size:11px;font-weight:700;letter-spacing:.14em;color:var(--gold);text-transform:uppercase}
.qcard .qt{font-size:14px;font-weight:600;color:var(--ink);margin:4px 0 12px}
.scale{display:flex;gap:8px;flex-wrap:wrap}
.scale label{flex:1;min-width:52px;text-align:center;border:1px solid var(--line);border-radius:10px;
  padding:9px 4px;font-size:12.5px;cursor:pointer;user-select:none;background:var(--cream)}
.scale input{display:none}
.scale input:checked+span{color:var(--cream)}
.scale label:has(input:checked){background:var(--navy);border-color:var(--navy);color:var(--cream);font-weight:700}
.scale-hint{display:flex;justify-content:space-between;font-size:11px;color:var(--gray);margin-top:6px}
.ass-actions{display:flex;gap:12px;align-items:center;margin:20px 0}
.btn{appearance:none;border:0;cursor:pointer;font:inherit;font-weight:700;font-size:14px;border-radius:12px;
  padding:13px 28px;background:var(--navy);color:var(--cream);letter-spacing:.03em}
.btn:hover{background:#3c4c60}
.btn.ghost{background:transparent;color:var(--gray);border:1px solid var(--line)}
.warn{color:#a3562f;font-size:13px;display:none}

/* resultado */
.result{display:none;border:1px solid var(--gold);border-radius:16px;background:var(--white);padding:26px;margin-top:8px}
.result.on{display:block;animation:fade .3s ease}
.result .big{display:flex;align-items:center;gap:18px;flex-wrap:wrap;margin-bottom:18px}
.result .score{font-family:'Fraunces';font-size:52px;color:var(--navy);line-height:1}
.result .lvl-name{font-family:'Fraunces';font-size:24px;color:var(--gold)}
.dimbars{display:grid;gap:10px;margin:14px 0 6px}
.dimbar{display:grid;grid-template-columns:180px 1fr 34px;gap:12px;align-items:center;font-size:13px}
@media(max-width:640px){.dimbar{grid-template-columns:1fr;gap:4px}}
.dimbar .tr{height:8px;background:var(--ice);border-radius:4px;overflow:hidden}
.dimbar .tr i{display:block;height:100%;background:linear-gradient(90deg,var(--gold),var(--navy));border-radius:4px}
.dimbar b{text-align:right;color:var(--navy)}
.reco{background:var(--ice);border-radius:12px;padding:18px;margin-top:16px}
.reco h4{color:var(--navy);font-family:'Fraunces';font-size:16px;margin-bottom:8px}
.axes{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin:10px 0}
@media(max-width:640px){.axes{grid-template-columns:1fr}}
.axis-card{border:1px solid var(--line);border-radius:12px;padding:16px;background:var(--cream)}
.axis-card h5{font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:var(--gold)}
.axis-card .v{font-family:'Fraunces';font-size:30px;color:var(--navy)}
.modo-strip{display:grid;grid-template-columns:1fr 1fr 1fr;gap:10px;margin-top:14px}
@media(max-width:640px){.modo-strip{grid-template-columns:1fr}}
.modo-strip .m{border:1px solid var(--line);border-radius:12px;padding:14px;background:var(--white);font-size:12.5px}
.modo-strip .m.on{border-color:var(--gold);background:#fbf9f2;box-shadow:0 0 0 2px var(--gold)}
.modo-strip .m b{display:block;font-family:'Fraunces';font-size:15px;color:var(--navy);margin-bottom:4px}

/* ---------- overview ---------- */
.arch{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin:18px 0}
@media(max-width:900px){.arch{grid-template-columns:1fr}}
.arch .p{background:var(--white);border:1px solid var(--line);border-radius:14px;padding:22px;border-top:4px solid var(--navy)}
.arch .p.mid{border-top-color:var(--gold)}
.arch .p .role{font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--gold)}
.arch .p h3{font-size:22px;color:var(--navy);margin:4px 0 2px}
.arch .p .full{font-size:12.5px;color:var(--gray);margin-bottom:10px}
.layers{display:grid;gap:10px;max-width:560px;margin:16px 0}
.layers .l{background:var(--white);border:1px solid var(--line);border-left:5px solid var(--gold);border-radius:10px;padding:14px 18px}
.layers .l b{font-family:'Fraunces';color:var(--navy);font-size:15px}
.layers .l span{display:block;font-size:12.5px;color:var(--gray)}
.howto{display:grid;grid-template-columns:repeat(5,1fr);gap:10px}
@media(max-width:900px){.howto{grid-template-columns:1fr 1fr}}
.howto .b{background:var(--white);border:1px solid var(--line);border-radius:12px;padding:14px}
.howto .b .id{font-family:'Fraunces';color:var(--gold);font-size:20px}
.howto .b b{display:block;font-size:13px;color:var(--navy)}
.howto .b span{font-size:11.5px;color:var(--gray)}

/* glossário */
.gloss{display:grid;grid-template-columns:1fr 1fr;gap:12px}
@media(max-width:800px){.gloss{grid-template-columns:1fr}}
.gloss .g{background:var(--white);border:1px solid var(--line);border-radius:12px;padding:16px}
.gloss .g b{font-family:'Fraunces';color:var(--navy);font-size:15px}
.gloss .g p{font-size:13px;color:var(--gray);margin-top:2px}

footer{background:var(--navy);color:#b9c3d0;padding:26px 0;font-size:12px}
footer .wrap{display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap}
h3.sect{color:var(--navy);font-size:19px;margin:26px 0 12px}
h3.sect:first-child{margin-top:0}
`;
}

// ------------------------------------------------------------
// Render: visão geral
// ------------------------------------------------------------
function overviewHTML() {
  const p = PRODUCTS;
  return `
  <div class="kicker">Arquitetura da metodologia</div>
  <h2 class="serif" style="color:var(--navy);font-size:28px">Três produtos, uma metodologia, uma régua</h2>
  <p class="lead">Material interno para os times comercial e de consultoria: o que ofertar em cada disciplina e como identificar em que nível o cliente está. Cada produto se descreve em três camadas empilhadas — <b>Framework + Roadmap + Diagnóstico</b> — e todos correm na mesma régua de maturidade.</p>

  <div class="arch">
    ${[p.epp, p.pmgo, p.gmo].map((pr, i) => `
    <div class="p${i === 1 ? ' mid' : ''}">
      <div class="role">${esc(pr.papel)}</div>
      <h3>${esc(pr.sigla)}</h3>
      <div class="full">${esc(pr.nome)}</div>
      <p style="font-size:13px">${esc(pr.tagline)}</p>
      <p class="note">${esc(pr.nota)}</p>
    </div>`).join('')}
  </div>

  <h3 class="sect">As três camadas de cada produto</h3>
  <p class="lead" style="margin-top:-6px">Não é "framework = roadmap = diagnóstico". São <b>três camadas distintas</b> que se empilham e juntas formam o documento completo.</p>
  <div class="layers">
    <div class="l"><b>1 · Framework</b><span>Objetivo, escopo, pilares e entregáveis</span></div>
    <div class="l"><b>2 · Roadmap</b><span>Iniciativas organizadas por nível de maturidade — jornada de evolução, não lista de serviços</span></div>
    <div class="l"><b>3 · Diagnóstico (Assessment)</b><span>Posiciona o cliente na régua e devolve o roadmap recomendado</span></div>
  </div>

  <h3 class="sect">Régua de maturidade única</h3>
  <p class="lead" style="margin-top:-6px">As três frentes usam a mesma escala — é isso que transforma três roadmaps soltos em uma metodologia: com escala compartilhada dá para posicionar o cliente e comparar as frentes entre si.</p>
  ${maturityStripHTML()}

  <h3 class="sect">Como ler cada produto — 5 blocos padrão</h3>
  <div class="howto">
    ${HOWTO_BLOCKS.map(b => `<div class="b"><div class="id">${b.id}</div><b>${esc(b.titulo)}</b><span>${esc(b.desc)}</span></div>`).join('')}
  </div>

  <h3 class="sect">Eixo exclusivo do PM&amp;GO — modo de atuação</h3>
  <p class="lead" style="margin-top:-6px">Além da maturidade, o PM&amp;GO define a <b>intensidade</b> com que a Obliant atua — de leve a mão na massa — em função da maturidade <b>e</b> da criticidade do momento.</p>
  <div class="grid c3">
    ${MODOS_ATUACAO.map((m, i) => `
    <div class="card"><div class="kicker">Modo ${i + 1}</div><h3>${esc(m.nome)}</h3><p>${esc(m.desc)}</p><p class="note">${esc(m.quando)}</p></div>`).join('')}
  </div>`;
}

function maturityStripHTML() {
  return `
  <div class="mat">
    ${MATURITY_LEVELS.map(l => `
    <div class="step">
      <div class="bar"><i style="width:${l.n * 20}%"></i></div>
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
  <p class="lead">Iniciativas organizadas por nível de maturidade: uma jornada de evolução, não uma lista de serviços. O assessment indica em qual coluna o cliente está — e a coluna seguinte é o plano recomendado.</p>
  <div class="road">
    ${p.roadmap.map(r => {
      const lvl = MATURITY_LEVELS[r.nivel - 1];
      return `
      <div class="col${r.nivel === 3 ? ' hot' : ''}">
        <header><div class="lvl">NÍVEL ${r.nivel}</div><div class="nm">${esc(lvl.nome)}</div></header>
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
    <div class="ass-actions"><button class="btn" onclick="goAssessment('${prod}')">Preencher o assessment interativo →</button></div>`;
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
  <div class="ass-actions"><button class="btn" onclick="goAssessment('pmgo')">Preencher o assessment interativo →</button></div>`;
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
// Render: Venn (exclusivo PM&GO)
// ------------------------------------------------------------
function vennHTML() {
  const v = PRODUCTS.pmgo.venn;
  const svg = `
  <svg width="440" height="250" viewBox="0 0 440 250" role="img" aria-label="Diagrama de Venn PMO × GMO">
    <circle cx="165" cy="125" r="105" fill="${C.navy}" fill-opacity="0.82"/>
    <circle cx="275" cy="125" r="105" fill="${C.gold}" fill-opacity="0.82"/>
    <text x="112" y="125" fill="${C.cream}" font-family="Fraunces,serif" font-size="20" text-anchor="middle" font-weight="600">PMO</text>
    <text x="112" y="146" fill="${C.cream}" font-family="Inter,sans-serif" font-size="11" text-anchor="middle">entrega</text>
    <text x="328" y="125" fill="#fff" font-family="Fraunces,serif" font-size="20" text-anchor="middle" font-weight="600">GMO</text>
    <text x="328" y="146" fill="#fff" font-family="Inter,sans-serif" font-size="11" text-anchor="middle">adoção</text>
    <text x="220" y="118" fill="#fff" font-family="Inter,sans-serif" font-size="10.5" text-anchor="middle" font-weight="700">COMPAR-</text>
    <text x="220" y="132" fill="#fff" font-family="Inter,sans-serif" font-size="10.5" text-anchor="middle" font-weight="700">TILHADO</text>
  </svg>`;
  return `
  <div class="kicker">Venn — o que é de quem</div>
  <p class="lead">O PM&amp;GO opera na intersecção: o que é só do PMO (entrega), o que é só do GMO (adoção) e o que é governado em conjunto. Cada entregável e atividade é etiquetado para o Venn ser operacional.</p>
  <div class="vennfig">${svg}</div>
  <div class="venn-cols">
    <div class="card"><h3>Só PMO <span class="tag pmo">entrega</span></h3><ul class="clean">${v.pmo.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
    <div class="card mid"><h3>Compartilhado <span class="tag compartilhado">governança</span></h3><ul class="clean">${v.compartilhado.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
    <div class="card"><h3>Só GMO <span class="tag gmo">adoção</span></h3><ul class="clean">${v.gmo.map(x => `<li>${esc(x)}</li>`).join('')}</ul></div>
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
  <div class="prod-head">
    <h2>${esc(p.sigla)}</h2>
    <span class="badge${prod === 'pmgo' ? ' gold' : ''}">${esc(p.papel)}</span>
    <span style="color:var(--gray);font-size:14px">${esc(p.nome)}</span>
  </div>
  <p class="lead">${esc(p.tagline)} <i style="color:var(--gold)">${esc(p.nota)}</i></p>
  <nav class="sub" data-prod="${prod}">
    ${subs.map((s, i) => `<button class="${i === 0 ? 'on' : ''}" data-sub="${s.id}">${s.label}</button>`).join('')}
  </nav>
  ${subs.map((s, i) => `<div class="subpane${i === 0 ? ' on' : ''}" data-pane="${prod}-${s.id}">${s.html}</div>`).join('')}`;
}

// ------------------------------------------------------------
// Render: aba Assessment interativo
// ------------------------------------------------------------
function scaleInput(name, labels) {
  const lb = labels || ['1', '2', '3', '4', '5'];
  return `<div class="scale">${[1, 2, 3, 4, 5].map(v =>
    `<label><input type="radio" name="${name}" value="${v}"><span>${lb[v - 1]}</span></label>`).join('')}</div>
  <div class="scale-hint"><span>1 · inexistente / discordo</span><span>5 · excelência / concordo totalmente</span></div>`;
}

function assessmentHTML() {
  const forms = ['epp', 'gmo'].map(prod => {
    const p = PRODUCTS[prod];
    return `
    <form class="ass-form" data-form="${prod}" style="display:none" onsubmit="return false">
      <p class="lead">${esc(p.assessment.intro)}</p>
      ${p.assessment.dimensoes.map((d, i) => `
      <div class="qcard">
        <div class="qn">Dimensão ${i + 1} · ${esc(d.nome)}</div>
        <div class="qt">${esc(d.pergunta)}</div>
        ${scaleInput(`${prod}-d${i}`)}
      </div>`).join('')}
      <div class="ass-actions">
        <button class="btn" onclick="calcMaturity('${prod}')">Gerar diagnóstico</button>
        <button class="btn ghost" type="reset" onclick="resetForm('${prod}')">Limpar</button>
        <span class="warn" data-warn="${prod}">Responda todas as dimensões antes de gerar o diagnóstico.</span>
      </div>
      <div class="result" data-result="${prod}"></div>
    </form>`;
  }).join('');

  const pf = PRODUCTS.pmgo;
  const fitForm = `
  <form class="ass-form" data-form="pmgo" style="display:none" onsubmit="return false">
    <p class="lead">${esc(pf.assessment.intro)}</p>
    ${pf.assessment.perguntas.map((q, i) => `
    <div class="qcard">
      <div class="qn">Eixo ${q.eixo} · ${esc(q.nome)}</div>
      <div class="qt">${esc(q.pergunta)}</div>
      ${scaleInput(`pmgo-q${i}`)}
    </div>`).join('')}
    <div class="ass-actions">
      <button class="btn" onclick="calcFit()">Gerar recomendação</button>
      <button class="btn ghost" type="reset" onclick="resetForm('pmgo')">Limpar</button>
      <span class="warn" data-warn="pmgo">Responda todas as perguntas antes de gerar a recomendação.</span>
    </div>
    <div class="result" data-result="pmgo"></div>
  </form>`;

  return `
  <div class="kicker">Diagnóstico interativo</div>
  <h2 class="serif" style="color:var(--navy);font-size:28px">Assessment</h2>
  <p class="lead">Para preencher <b>ao vivo com o cliente</b>: escolha a frente, responda às perguntas e receba na hora o diagnóstico de maturidade + o roadmap recomendado.</p>
  <div class="ass-pick">
    <button data-pick="epp" onclick="pickAssessment('epp')"><div class="t">EPP — maturidade</div><div class="d">6 dimensões de entrega · posiciona na régua e recomenda o próximo nível</div></button>
    <button data-pick="gmo" onclick="pickAssessment('gmo')"><div class="t">GMO — maturidade</div><div class="d">6 dimensões de adoção · posiciona na régua e recomenda o próximo nível</div></button>
    <button data-pick="pmgo" onclick="pickAssessment('pmgo')"><div class="t">PM&amp;GO — fit</div><div class="d">6 perguntas em 2 eixos · recomenda o produto certo e o modo de atuação</div></button>
  </div>
  ${forms}
  ${fitForm}`;
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
// JS embutido (abas + lógica do assessment)
// ------------------------------------------------------------
function js() {
  const data = {
    levels: MATURITY_LEVELS,
    thresholds: MATURITY_THRESHOLDS,
    modos: MODOS_ATUACAO,
    prods: {
      epp: { sigla: 'EPP', dims: PRODUCTS.epp.assessment.dimensoes.map(d => d.nome), roadmap: PRODUCTS.epp.roadmap },
      gmo: { sigla: 'GMO', dims: PRODUCTS.gmo.assessment.dimensoes.map(d => d.nome), roadmap: PRODUCTS.gmo.roadmap },
      pmgo: {
        sigla: 'PM&GO',
        perguntas: PRODUCTS.pmgo.assessment.perguntas.map(q => ({ eixo: q.eixo, nome: q.nome })),
        cortes: PRODUCTS.pmgo.assessment.cortes,
        roadmap: PRODUCTS.pmgo.roadmap,
      },
    },
  };
  return `
const DATA = ${JSON.stringify(data)};

// ------- abas de topo -------
function showTab(id){
  document.querySelectorAll('nav.top button').forEach(b=>b.classList.toggle('on', b.dataset.tab===id));
  document.querySelectorAll('section.tab').forEach(s=>s.classList.toggle('on', s.dataset.tab===id));
  window.scrollTo({top:0,behavior:'smooth'});
}
document.querySelectorAll('nav.top button').forEach(b=>b.addEventListener('click',()=>showTab(b.dataset.tab)));

// ------- sub-abas -------
document.querySelectorAll('nav.sub').forEach(nav=>{
  const prod = nav.dataset.prod;
  nav.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{
    nav.querySelectorAll('button').forEach(x=>x.classList.toggle('on', x===b));
    document.querySelectorAll('[data-pane^="'+prod+'-"]').forEach(p=>
      p.classList.toggle('on', p.dataset.pane===prod+'-'+b.dataset.sub));
  }));
});

// ------- assessment -------
function pickAssessment(prod){
  document.querySelectorAll('.ass-pick button').forEach(b=>b.classList.toggle('on', b.dataset.pick===prod));
  document.querySelectorAll('.ass-form').forEach(f=>f.style.display = f.dataset.form===prod?'block':'none');
}
function goAssessment(prod){ showTab('assessment'); pickAssessment(prod); }
function resetForm(prod){
  const r=document.querySelector('[data-result="'+prod+'"]'); r.classList.remove('on'); r.innerHTML='';
  document.querySelector('[data-warn="'+prod+'"]').style.display='none';
}
function answers(prefix,n){
  const vals=[];
  for(let i=0;i<n;i++){
    const el=document.querySelector('input[name="'+prefix+i+'"]:checked');
    if(!el) return null;
    vals.push(+el.value);
  }
  return vals;
}
function levelFor(avg){
  for(const t of DATA.thresholds){ if(avg < t.max) return t.nivel; }
  return 5;
}
function fmt(x){ return x.toFixed(1).replace('.',','); }

function calcMaturity(prod){
  const p=DATA.prods[prod];
  const vals=answers(prod+'-d', p.dims.length);
  const warn=document.querySelector('[data-warn="'+prod+'"]');
  if(!vals){ warn.style.display='inline'; return; }
  warn.style.display='none';
  const avg=vals.reduce((a,b)=>a+b,0)/vals.length;
  const nivel=levelFor(avg);
  const lvl=DATA.levels[nivel-1];
  const next=Math.min(nivel+1,5);
  const nextLvl=DATA.levels[next-1];
  const inits=p.roadmap.find(r=>r.nivel===next).iniciativas;
  const atTop = nivel===5;
  const el=document.querySelector('[data-result="'+prod+'"]');
  el.innerHTML =
    '<div class="kicker">Diagnóstico '+p.sigla+'</div>'+
    '<div class="big"><div class="score">'+fmt(avg)+'</div>'+
    '<div><div class="lvl-name">Nível '+nivel+' · '+lvl.nome+'</div>'+
    '<div style="color:var(--gray);font-size:13px;max-width:520px">'+lvl.desc+'</div></div></div>'+
    '<h4 style="font-family:Fraunces;color:var(--navy);margin-bottom:6px">Detalhamento por dimensão</h4>'+
    '<div class="dimbars">'+vals.map((v,i)=>
      '<div class="dimbar"><span>'+p.dims[i]+'</span><div class="tr"><i style="width:'+(v*20)+'%"></i></div><b>'+v+'</b></div>'
    ).join('')+'</div>'+
    '<div class="reco"><h4>'+(atTop
      ? 'Nível máximo — foco em sustentar a excelência'
      : 'Roadmap recomendado — iniciativas do Nível '+next+' · '+nextLvl.nome)+'</h4>'+
    '<ul class="clean">'+inits.map(i=>'<li>'+i+'</li>').join('')+'</ul></div>';
  el.classList.add('on');
  el.scrollIntoView({behavior:'smooth',block:'start'});
}

function calcFit(){
  const p=DATA.prods.pmgo;
  const vals=answers('pmgo-q', p.perguntas.length);
  const warn=document.querySelector('[data-warn="pmgo"]');
  if(!vals){ warn.style.display='inline'; return; }
  warn.style.display='none';
  const A=[],B=[];
  vals.forEach((v,i)=>(p.perguntas[i].eixo==='A'?A:B).push(v));
  const avgA=A.reduce((a,b)=>a+b,0)/A.length;
  const avgB=B.reduce((a,b)=>a+b,0)/B.length;
  const avgAll=vals.reduce((a,b)=>a+b,0)/vals.length;
  const hiA=avgA>=p.cortes.eixoAlto, hiB=avgB>=p.cortes.eixoAlto;
  let rec, desc;
  if(hiA&&hiB){ rec='PM&GO'; desc='Necessidade alta nos dois eixos: governança integrada de entrega + adoção sob um único modelo.'; }
  else if(hiA){ rec='EPP'; desc='Necessidade concentrada em entrega: estruturar método, portfólio, processos e indicadores — operado por um PMO.'; }
  else if(hiB){ rec='GMO'; desc='Necessidade concentrada em adoção: tratar o lado humano da transformação — engajamento, capacitação e sustentação.'; }
  else { rec='Suporte leve'; desc='Necessidade baixa nos dois eixos: aconselhamento pontual, métodos e templates, sem estrutura dedicada.'; }
  const modo = avgAll>=p.cortes.modoDiretivo?2:(avgAll>=p.cortes.modoControle?1:0);
  const el=document.querySelector('[data-result="pmgo"]');
  el.innerHTML =
    '<div class="kicker">Recomendação PM&GO — fit</div>'+
    '<div class="big"><div class="score" style="font-size:38px">'+rec+'</div></div>'+
    '<p style="font-size:14px;max-width:640px">'+desc+'</p>'+
    '<div class="axes">'+
      '<div class="axis-card"><h5>Eixo A · necessidade de entrega</h5><div class="v">'+fmt(avgA)+'</div>'+
      '<div style="font-size:12px;color:var(--gray)">'+(hiA?'Alta':'Baixa/moderada')+' (corte: '+fmt(p.cortes.eixoAlto)+')</div></div>'+
      '<div class="axis-card"><h5>Eixo B · necessidade de adoção</h5><div class="v">'+fmt(avgB)+'</div>'+
      '<div style="font-size:12px;color:var(--gray)">'+(hiB?'Alta':'Baixa/moderada')+' (corte: '+fmt(p.cortes.eixoAlto)+')</div></div>'+
    '</div>'+
    '<h4 style="font-family:Fraunces;color:var(--navy);margin:14px 0 4px">Modo de atuação recomendado</h4>'+
    '<div class="modo-strip">'+DATA.modos.map((m,i)=>
      '<div class="m'+(i===modo?' on':'')+'"><b>'+m.nome+'</b>'+m.desc+'</div>').join('')+'</div>'+
    (rec==='PM&GO'
      ? '<div class="reco" style="margin-top:16px"><h4>Primeiros passos — Nível 1 do roadmap PM&GO</h4><ul class="clean">'+
        p.roadmap[0].iniciativas.map(i=>'<li>'+i+'</li>').join('')+'</ul></div>'
      : '');
  el.classList.add('on');
  el.scrollIntoView({behavior:'smooth',block:'start'});
}
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
    <p class="sub">Ativo interno · orienta os times comercial e de consultoria sobre o que ofertar em cada disciplina e como posicionar o cliente na régua de maturidade.</p>
    <div class="chip-row">
      <span class="chip"><em>EPP</em> · Entrega</span>
      <span class="chip"><em>GMO</em> · Adoção</span>
      <span class="chip"><em>PM&amp;GO</em> · Integração</span>
      <span class="chip">Framework + Roadmap + Diagnóstico</span>
      <span class="chip">Régua única · 5 níveis</span>
    </div>
    <nav class="top">
      ${tabs.map((t, i) => `<button class="${i === 0 ? 'on' : ''}" data-tab="${t.id}">${t.label}</button>`).join('')}
    </nav>
  </div>
</header>
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
