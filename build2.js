// ============================================================
// build2.js — gera Metodologia_Obliant.pptx (deck editável,
// formas e textos nativos, sem imagens rasterizadas)
// Uso: npm i pptxgenjs && node build2.js
// ============================================================

const PptxGenJS = require('pptxgenjs');
const {
  COLORS: C, WORDMARK,
  MATURITY_LEVELS, HOWTO_BLOCKS, MODOS_ATUACAO,
  PRODUCTS, GLOSSARIO,
} = require('./data');

const pptx = new PptxGenJS();
pptx.defineLayout({ name: 'WIDE', width: 13.33, height: 7.5 });
pptx.layout = 'WIDE';
pptx.author = 'Obliant Digital';
pptx.title = 'Metodologia Governança, Projetos e Mudança';

const SERIF = 'Fraunces';
const SANS = 'Inter';
const W = 13.33, H = 7.5, MX = 0.6;
const TAG_LABEL = { pmo: 'PMO', gmo: 'GMO', compartilhado: 'COMP.' };
const TAG_FILL = { pmo: C.navy, gmo: C.gold, compartilhado: C.ice };
const TAG_TXT = { pmo: C.cream, gmo: C.white, compartilhado: C.navy };

// ---------- helpers ----------
function baseSlide(bg) {
  const s = pptx.addSlide();
  s.background = { color: bg || C.cream };
  return s;
}

function wordmark(s, light, x, y) {
  s.addText([
    { text: 'OBLIANT ', options: { color: light ? C.cream : C.navy } },
    { text: 'DIGITAL', options: { color: C.gold } },
  ], { x: x ?? MX, y: y ?? 0.28, w: 4, h: 0.3, fontFace: SANS, fontSize: 10, bold: true, charSpacing: 4 });
}

function footer(s) {
  s.addText('Metodologia Governança, Projetos e Mudança  ·  material interno e exclusivo Obliant', {
    x: MX, y: H - 0.42, w: 9.5, h: 0.3, fontFace: SANS, fontSize: 8, color: C.gray,
  });
  s.addText(WORDMARK, {
    x: W - 3.6, y: H - 0.42, w: 3, h: 0.3, align: 'right', fontFace: SANS, fontSize: 8, color: C.gray, charSpacing: 2,
  });
}

function header(s, kicker, title, sub) {
  wordmark(s, false);
  s.addText(kicker.toUpperCase(), { x: MX, y: 0.62, w: 10, h: 0.3, fontFace: SANS, fontSize: 10, bold: true, color: C.gold, charSpacing: 3 });
  s.addText(title, { x: MX, y: 0.9, w: 12.1, h: 0.62, fontFace: SERIF, fontSize: 26, color: C.navy });
  if (sub) s.addText(sub, { x: MX, y: 1.52, w: 12.1, h: 0.34, fontFace: SANS, fontSize: 11, color: C.gray });
  footer(s);
  return 1.95; // y do conteúdo
}

function card(s, x, y, w, h, opts = {}) {
  s.addShape('roundRect', {
    x, y, w, h, rectRadius: 0.06,
    fill: { color: opts.fill || C.white },
    line: { color: opts.line || C.line, width: opts.lw ?? 0.75 },
    shadow: { type: 'none' },
  });
}

// ---------- capa ----------
function cover() {
  const s = baseSlide(C.navy);
  s.addShape('rect', { x: 0, y: H - 0.18, w: W, h: 0.18, fill: { color: C.gold } });
  wordmark(s, true, MX, 0.55);
  s.addText('Metodologia\nGovernança, Projetos e Mudança', {
    x: MX, y: 2.3, w: 11.5, h: 2.0, fontFace: SERIF, fontSize: 44, color: C.cream, lineSpacing: 52,
  });
  s.addText('EPP  ·  GMO  ·  PM&GO   —   Framework + Roadmap + Diagnóstico, na mesma régua de maturidade', {
    x: MX, y: 4.5, w: 10.5, h: 0.4, fontFace: SANS, fontSize: 14, color: C.gold,
  });
  s.addText('Uso comercial e de consultoria · material exclusivo Obliant', {
    x: MX, y: 6.5, w: 8, h: 0.3, fontFace: SANS, fontSize: 11, color: 'B9C3D0',
  });
}

// ---------- como ler ----------
function howto() {
  const s = baseSlide();
  const y0 = header(s, 'Como ler este material', 'Cada produto segue a mesma estrutura de 5 blocos',
    'A sequência A–E se repete em EPP, GMO e PM&GO — leia qualquer frente da mesma forma.');
  const w = (W - 2 * MX - 4 * 0.25) / 5;
  HOWTO_BLOCKS.forEach((b, i) => {
    const x = MX + i * (w + 0.25);
    card(s, x, y0 + 0.3, w, 3.4);
    s.addText(b.id, { x: x + 0.15, y: y0 + 0.5, w: w - 0.3, h: 0.6, fontFace: SERIF, fontSize: 30, color: C.gold });
    s.addText(b.titulo, { x: x + 0.15, y: y0 + 1.15, w: w - 0.3, h: 0.4, fontFace: SANS, fontSize: 14, bold: true, color: C.navy });
    s.addText(b.desc, { x: x + 0.15, y: y0 + 1.6, w: w - 0.3, h: 1.9, fontFace: SANS, fontSize: 10, color: C.gray, valign: 'top' });
  });
  s.addText('Framework + Roadmap + Diagnóstico são três camadas distintas que se empilham — não a mesma coisa com nomes diferentes.', {
    x: MX, y: y0 + 4.0, w: 12.1, h: 0.4, fontFace: SANS, fontSize: 11, italic: true, color: C.gold, align: 'center',
  });
}

// ---------- arquitetura ----------
function architecture() {
  const s = baseSlide();
  const y0 = header(s, 'Arquitetura da metodologia', 'Três produtos, uma metodologia, uma régua',
    'EPP entrega · GMO adota · PM&GO integra — todos posicionados na mesma régua de maturidade de 5 níveis.');
  const order = ['epp', 'pmgo', 'gmo'];
  const w = (W - 2 * MX - 2 * 0.3) / 3;
  order.forEach((k, i) => {
    const p = PRODUCTS[k];
    const x = MX + i * (w + 0.3);
    const mid = k === 'pmgo';
    card(s, x, y0 + 0.2, w, 2.9);
    s.addShape('rect', { x, y: y0 + 0.2, w, h: 0.08, fill: { color: mid ? C.gold : C.navy } });
    s.addText(p.papel.toUpperCase(), { x: x + 0.2, y: y0 + 0.4, w: w - 0.4, h: 0.28, fontFace: SANS, fontSize: 9, bold: true, color: C.gold, charSpacing: 3 });
    s.addText(p.sigla, { x: x + 0.2, y: y0 + 0.68, w: w - 0.4, h: 0.5, fontFace: SERIF, fontSize: 24, color: C.navy });
    s.addText(p.nome, { x: x + 0.2, y: y0 + 1.2, w: w - 0.4, h: 0.35, fontFace: SANS, fontSize: 10, color: C.gray });
    s.addText(p.tagline, { x: x + 0.2, y: y0 + 1.6, w: w - 0.4, h: 0.8, fontFace: SANS, fontSize: 10.5, color: C.ink, valign: 'top' });
    s.addText(p.nota, { x: x + 0.2, y: y0 + 2.45, w: w - 0.4, h: 0.6, fontFace: SANS, fontSize: 8.5, italic: true, color: C.gray, valign: 'top' });
  });
  // régua compartilhada
  const ry = y0 + 3.4;
  s.addText('RÉGUA ÚNICA DE MATURIDADE — compartilhada pelas três frentes', {
    x: MX, y: ry, w: 12.1, h: 0.3, fontFace: SANS, fontSize: 10, bold: true, color: C.gold, charSpacing: 2,
  });
  const mw = (W - 2 * MX - 4 * 0.15) / 5;
  MATURITY_LEVELS.forEach((l, i) => {
    const x = MX + i * (mw + 0.15);
    card(s, x, ry + 0.35, mw, 0.85, { fill: i === 4 ? C.navy : C.white });
    s.addText(`${l.n} · ${l.nome}`, { x: x + 0.12, y: ry + 0.42, w: mw - 0.24, h: 0.3, fontFace: SERIF, fontSize: 12, color: i === 4 ? C.cream : C.navy });
    s.addText(l.resumo, { x: x + 0.12, y: ry + 0.72, w: mw - 0.24, h: 0.42, fontFace: SANS, fontSize: 7.5, color: i === 4 ? 'B9C3D0' : C.gray, valign: 'top' });
  });
}

// ---------- divider ----------
function divider(num, prodKey) {
  const p = PRODUCTS[prodKey];
  const s = baseSlide(C.navy);
  wordmark(s, true, MX, 0.55);
  s.addText(num, { x: MX, y: 2.0, w: 3, h: 1.4, fontFace: SERIF, fontSize: 80, color: C.gold });
  s.addText(p.sigla, { x: MX, y: 3.5, w: 11, h: 1.0, fontFace: SERIF, fontSize: 44, color: C.cream });
  s.addText(p.nome + '  —  ' + p.papel, { x: MX, y: 4.55, w: 11, h: 0.45, fontFace: SANS, fontSize: 15, color: C.gold });
  s.addText(p.tagline, { x: MX, y: 5.05, w: 9.5, h: 0.6, fontFace: SANS, fontSize: 12, color: 'B9C3D0' });
  s.addShape('rect', { x: 0, y: H - 0.18, w: W, h: 0.18, fill: { color: C.gold } });
}

// ---------- framework (por produto) ----------
function framework(prodKey) {
  const p = PRODUCTS[prodKey];
  const s = baseSlide();
  const y0 = header(s, `${p.sigla} · Bloco A`, 'Framework — objetivo, pilares e entregáveis', p.objetivo);

  // pilares
  const pw = (6.2 - (p.pilares.length - 1) * 0.15) / p.pilares.length;
  s.addText('PILARES', { x: MX, y: y0 + 0.1, w: 3, h: 0.26, fontFace: SANS, fontSize: 9, bold: true, color: C.gold, charSpacing: 3 });
  p.pilares.forEach((pi, i) => {
    const x = MX + i * (pw + 0.15);
    s.addShape('roundRect', { x, y: y0 + 0.4, w: pw, h: 0.55, rectRadius: 0.06, fill: { color: C.navy } });
    s.addText(`${i + 1} · ${pi}`, { x, y: y0 + 0.4, w: pw, h: 0.55, align: 'center', fontFace: SANS, fontSize: p.pilares.length > 4 ? 8.5 : 10.5, bold: true, color: C.cream });
  });
  if (p.pilaresNota) {
    s.addText(p.pilaresNota, { x: MX, y: y0 + 1.0, w: 6.2, h: 0.3, fontFace: SANS, fontSize: 8, italic: true, color: C.gray });
  }

  // entregáveis
  s.addText('ENTREGÁVEIS', { x: 7.1, y: y0 + 0.1, w: 3, h: 0.26, fontFace: SANS, fontSize: 9, bold: true, color: C.gold, charSpacing: 3 });
  card(s, 7.1, y0 + 0.4, W - MX - 7.1, 1.5);
  const ent = p.entregaveis.map(e => {
    const nome = typeof e === 'string' ? e : e.nome;
    const tag = typeof e === 'string' ? '' : `   [${TAG_LABEL[e.tag]}]`;
    return { text: nome + tag, options: { bullet: { code: '2022', indent: 8 }, color: C.ink } };
  });
  s.addText(ent, { x: 7.25, y: y0 + 0.48, w: W - MX - 7.35, h: 1.36, fontFace: SANS, fontSize: 8, valign: 'top', lineSpacing: 10.5 });

  // 8 dimensões (grade 4x2)
  const dy = y0 + 2.0;
  s.addText('8 DIMENSÕES DO FRAMEWORK', { x: MX, y: dy, w: 6, h: 0.26, fontFace: SANS, fontSize: 9, bold: true, color: C.gold, charSpacing: 3 });
  const gw = (W - 2 * MX - 3 * 0.2) / 4, gh = 1.25;
  p.dimensoes.forEach((d, i) => {
    const x = MX + (i % 4) * (gw + 0.2);
    const y = dy + 0.3 + Math.floor(i / 4) * (gh + 0.15);
    card(s, x, y, gw, gh);
    s.addText(String(i + 1).padStart(2, '0'), { x: x + 0.12, y: y + 0.08, w: 0.7, h: 0.32, fontFace: SERIF, fontSize: 14, color: C.gold });
    s.addText(d.nome, { x: x + 0.12, y: y + 0.38, w: gw - 0.24, h: 0.3, fontFace: SANS, fontSize: 9.5, bold: true, color: C.navy });
    s.addText(d.desc, { x: x + 0.12, y: y + 0.68, w: gw - 0.24, h: 0.55, fontFace: SANS, fontSize: 7.5, color: C.gray, valign: 'top' });
  });
}

// ---------- roadmap (por produto) ----------
function roadmap(prodKey) {
  const p = PRODUCTS[prodKey];
  const s = baseSlide();
  const y0 = header(s, `${p.sigla} · Bloco B`, 'Roadmap — iniciativas por nível de maturidade',
    'Jornada de evolução, não lista de serviços: o assessment aponta a coluna atual; a seguinte é o plano recomendado.');
  const cw = (W - 2 * MX - 4 * 0.18) / 5;
  const rowH = 0.62;
  p.roadmap.forEach((r, i) => {
    const x = MX + i * (cw + 0.18);
    const lvl = MATURITY_LEVELS[r.nivel - 1];
    const hot = r.nivel === 3;
    card(s, x, y0 + 0.15, cw, 4.55);
    s.addShape('rect', { x, y: y0 + 0.15, w: cw, h: 0.62, fill: { color: hot ? C.navy : C.ice } });
    s.addText(`NÍVEL ${r.nivel}`, { x: x + 0.12, y: y0 + 0.2, w: cw - 0.24, h: 0.22, fontFace: SANS, fontSize: 7.5, bold: true, color: C.gold, charSpacing: 2 });
    s.addText(lvl.nome, { x: x + 0.12, y: y0 + 0.4, w: cw - 0.24, h: 0.32, fontFace: SERIF, fontSize: 13, color: hot ? C.cream : C.navy });
    r.iniciativas.forEach((ini, j) => {
      const ry = y0 + 0.92 + j * rowH;
      const dc = ry + (rowH - 0.05) / 2; // alinhamento vertical dos dots
      s.addShape('ellipse', { x: x + 0.14, y: dc - 0.035, w: 0.07, h: 0.07, fill: { color: C.gold } });
      s.addText(ini, { x: x + 0.28, y: ry, w: cw - 0.4, h: rowH, fontFace: SANS, fontSize: 7.6, color: C.ink, valign: 'middle', lineSpacing: 9 });
    });
  });
}

// ---------- mapa de maturidade (por produto) ----------
function maturity(prodKey) {
  const p = PRODUCTS[prodKey];
  const s = baseSlide();
  const y0 = header(s, `${p.sigla} · Bloco C`, 'Mapa de maturidade — régua única de 5 níveis',
    'A mesma escala das três frentes: posicione o cliente aqui e leia o roadmap a partir do nível seguinte.');
  const w = (W - 2 * MX - 4 * 0.2) / 5;
  MATURITY_LEVELS.forEach((l, i) => {
    const x = MX + i * (w + 0.2);
    const y = y0 + 0.3 + (4 - i) * 0.45; // escada ascendente
    const h = 3.9 - (4 - i) * 0.45;
    card(s, x, y, w, h, { fill: i === 4 ? C.navy : C.white });
    s.addShape('rect', { x, y, w, h: 0.08, fill: { color: C.gold } });
    s.addText(String(l.n), { x: x + 0.14, y: y + 0.16, w: 1, h: 0.5, fontFace: SERIF, fontSize: 24, color: C.gold });
    s.addText(l.nome, { x: x + 0.14, y: y + 0.68, w: w - 0.28, h: 0.34, fontFace: SERIF, fontSize: 14, color: i === 4 ? C.cream : C.navy });
    s.addText(l.resumo, { x: x + 0.14, y: y + 1.02, w: w - 0.28, h: 0.5, fontFace: SANS, fontSize: 8.5, bold: true, color: C.gold, valign: 'top' });
    s.addText(l.desc, { x: x + 0.14, y: y + 1.52, w: w - 0.28, h: h - 1.66, fontFace: SANS, fontSize: 8, color: i === 4 ? 'B9C3D0' : C.gray, valign: 'top' });
  });
}

// ---------- assessment (por produto) ----------
function assessment(prodKey) {
  const p = PRODUCTS[prodKey];
  const a = p.assessment;
  const s = baseSlide();
  if (a.tipo === 'maturidade') {
    const y0 = header(s, `${p.sigla} · Bloco D`, 'Assessment — fluxo do diagnóstico de maturidade', a.intro);
    // fluxo
    const steps = ['6 dimensões\navaliadas 1–5', 'Nível médio\nna régua', 'Detalhamento\npor dimensão', 'Roadmap do\npróximo nível'];
    const fw = 2.35, fx0 = MX, fy = y0 + 0.2;
    steps.forEach((t, i) => {
      const x = fx0 + i * (fw + 0.55);
      s.addShape('roundRect', { x, y: fy, w: fw, h: 0.85, rectRadius: 0.08, fill: { color: i === 3 ? C.gold : C.navy } });
      s.addText(t, { x, y: fy, w: fw, h: 0.85, align: 'center', valign: 'middle', fontFace: SANS, fontSize: 10.5, bold: true, color: C.cream, lineSpacing: 13 });
      if (i < 3) s.addText('→', { x: x + fw + 0.08, y: fy + 0.18, w: 0.4, h: 0.5, fontFace: SANS, fontSize: 18, color: C.gold, align: 'center' });
    });
    // dimensões
    const gw = (W - 2 * MX - 2 * 0.2) / 3, gh = 1.35;
    a.dimensoes.forEach((d, i) => {
      const x = MX + (i % 3) * (gw + 0.2);
      const y = fy + 1.25 + Math.floor(i / 3) * (gh + 0.18);
      card(s, x, y, gw, gh);
      s.addText(`DIMENSÃO ${i + 1} · ${d.nome.toUpperCase()}`, { x: x + 0.15, y: y + 0.1, w: gw - 0.3, h: 0.26, fontFace: SANS, fontSize: 8, bold: true, color: C.gold, charSpacing: 1 });
      s.addText(d.pergunta, { x: x + 0.15, y: y + 0.38, w: gw - 0.3, h: gh - 0.5, fontFace: SANS, fontSize: 9, color: C.ink, valign: 'top' });
    });
  } else {
    const y0 = header(s, `${p.sigla} · Bloco D`, 'Assessment de fit — há fit para o PM&GO?', a.intro);
    // eixos A, B e C
    const eixos = [
      { id: 'A', tit: 'EIXO A · ENTREGA' },
      { id: 'B', tit: 'EIXO B · ADOÇÃO' },
      { id: 'C', tit: 'EIXO C · INTEGRAÇÃO' },
    ];
    const colW = (W - 2 * MX - 2 * 0.25) / 3;
    eixos.forEach((e, k) => {
      const x = MX + k * (colW + 0.25);
      card(s, x, y0 + 0.08, colW, 1.5, { fill: e.id === 'C' ? 'FBF9F2' : C.white, line: e.id === 'C' ? C.gold : C.line });
      s.addText(e.tit, { x: x + 0.16, y: y0 + 0.2, w: colW - 0.32, h: 0.26, fontFace: SANS, fontSize: 9.5, bold: true, color: C.gold, charSpacing: 1 });
      const qs = a.perguntas.filter(q => q.eixo === e.id).map(q => ({
        text: q.nome, options: { bullet: { code: '2022', indent: 8 }, color: C.ink },
      }));
      s.addText(qs, { x: x + 0.16, y: y0 + 0.5, w: colW - 0.32, h: 1.0, fontFace: SANS, fontSize: 9, valign: 'top', lineSpacing: 13 });
    });
    s.addText('Há fit para o PM&GO só quando A, B e C são altos. Sem fit, avalia-se UMA frente — EPP ou GMO — nunca as duas juntas.', {
      x: MX, y: y0 + 1.66, w: W - 2 * MX, h: 0.26, fontFace: SANS, fontSize: 9, italic: true, color: C.gray,
    });
    // saídas do portão de fit (5)
    const my = y0 + 2.05;
    const recs = [
      ['A+B+C altas', 'PM&GO + modo', true],
      ['A+B altas · C baixa', 'Sem fit → EPP ou GMO', false],
      ['A alta · B baixa', 'Sem fit → EPP', false],
      ['A baixa · B alta', 'Sem fit → GMO', false],
      ['Todas baixas', 'Suporte leve', false],
    ];
    s.addText('SAÍDAS DO PORTÃO DE FIT', { x: MX, y: my, w: 5, h: 0.26, fontFace: SANS, fontSize: 9, bold: true, color: C.gold, charSpacing: 3 });
    const rw = (W - 2 * MX - 4 * 0.14) / 5;
    recs.forEach((r, i) => {
      const x = MX + i * (rw + 0.14), y = my + 0.3;
      card(s, x, y, rw, 0.92, { fill: r[2] ? C.navy : C.white, line: r[2] ? C.navy : C.line });
      s.addText(r[0], { x: x + 0.12, y: y + 0.1, w: rw - 0.24, h: 0.36, fontFace: SANS, fontSize: 7.5, color: r[2] ? 'B9C3D0' : C.gray, valign: 'top' });
      s.addText(r[1], { x: x + 0.12, y: y + 0.44, w: rw - 0.24, h: 0.42, fontFace: SERIF, fontSize: 11, color: r[2] ? C.cream : C.navy, valign: 'top' });
    });
    // modo de atuação
    const yy = my + 1.4;
    s.addText('MODO DE ATUAÇÃO (INTENSIDADE) — exclusivo do PM&GO integrado', { x: MX, y: yy, w: 9, h: 0.26, fontFace: SANS, fontSize: 9, bold: true, color: C.gold, charSpacing: 2 });
    MODOS_ATUACAO.forEach((m, i) => {
      const y = yy + 0.3 + i * 0.4;
      s.addShape('roundRect', { x: MX, y, w: 1.5, h: 0.32, rectRadius: 0.06, fill: { color: C.navy } });
      s.addText(m.nome, { x: MX, y, w: 1.5, h: 0.32, align: 'center', valign: 'middle', fontFace: SANS, fontSize: 9.5, bold: true, color: C.cream });
      s.addText(m.quando, { x: MX + 1.65, y, w: W - 2 * MX - 1.65, h: 0.32, fontFace: SANS, fontSize: 8.5, color: C.gray, valign: 'middle' });
    });
  }
}

// ---------- raci (por produto) ----------
function raci(prodKey) {
  const p = PRODUCTS[prodKey];
  const s = baseSlide();
  const y0 = header(s, `${p.sigla} · Bloco E`, 'RACI — papéis e responsabilidades',
    'R Responsável · A Aprovador · C Consultado · I Informado');
  const r = p.raci;
  const rcColor = { R: C.navy, A: C.gold, C: C.ice, I: C.white };
  const rcTxt = { R: C.cream, A: C.white, C: C.navy, I: C.gray };
  const rows = [
    [{ text: 'Atividade', options: { bold: true, color: C.cream, fill: { color: C.navy } } },
      ...r.papeis.map(x => ({ text: x, options: { bold: true, color: C.cream, fill: { color: C.navy }, align: 'center' } }))],
    ...r.atividades.map(a => [
      { text: a.nome + (a.tag ? `   [${TAG_LABEL[a.tag]}]` : ''), options: { color: C.ink } },
      ...a.raci.map(x => ({ text: x, options: { bold: true, align: 'center', color: rcTxt[x], fill: { color: rcColor[x] } } })),
    ]),
  ];
  s.addTable(rows, {
    x: MX, y: y0 + 0.2, w: W - 2 * MX,
    colW: [4.5, ...r.papeis.map(() => (W - 2 * MX - 4.5) / r.papeis.length)],
    fontFace: SANS, fontSize: 9.5, border: { type: 'solid', color: C.line, pt: 0.5 },
    rowH: 0.42, valign: 'middle', margin: 0.06,
  });
}

// ---------- venn (PM&GO) ----------
function venn() {
  const v = PRODUCTS.pmgo.venn;
  const s = baseSlide();
  const y0 = header(s, 'PM&GO · PMO × GMO', 'O que é do PMO, o que é do GMO, o que é compartilhado',
    'Cada entregável e atividade do PM&GO é etiquetado (PMO / GMO / compartilhado) para a divisão PMO × GMO ser operacional, não só conceitual.');
  // círculos
  const cy = y0 + 0.15, d = 2.3;
  s.addShape('ellipse', { x: 4.6, y: cy, w: d, h: d, fill: { color: C.navy, transparency: 18 } });
  s.addShape('ellipse', { x: 6.35, y: cy, w: d, h: d, fill: { color: C.gold, transparency: 18 } });
  s.addText('PMO', { x: 4.7, y: cy + 0.85, w: 1.4, h: 0.4, align: 'center', fontFace: SERIF, fontSize: 16, color: C.cream });
  s.addText('GMO', { x: 7.2, y: cy + 0.85, w: 1.4, h: 0.4, align: 'center', fontFace: SERIF, fontSize: 16, color: C.white });
  s.addText('COMPARTILHADO', { x: 5.9, y: cy + 0.95, w: 1.55, h: 0.4, align: 'center', fontFace: SANS, fontSize: 7, bold: true, color: C.white });
  // colunas
  const cols = [
    { titulo: 'Só PMO — entrega', itens: v.pmo, fill: C.white },
    { titulo: 'Compartilhado — governança', itens: v.compartilhado, fill: 'FBF9F2' },
    { titulo: 'Só GMO — adoção', itens: v.gmo, fill: C.white },
  ];
  const gw = (W - 2 * MX - 2 * 0.25) / 3, gy = cy + d + 0.25;
  cols.forEach((c, i) => {
    const x = MX + i * (gw + 0.25);
    card(s, x, gy, gw, 2.0, { fill: c.fill, line: i === 1 ? C.gold : C.line });
    s.addText(c.titulo.toUpperCase(), { x: x + 0.16, y: gy + 0.1, w: gw - 0.32, h: 0.26, fontFace: SANS, fontSize: 8.5, bold: true, color: C.gold, charSpacing: 1 });
    s.addText(c.itens.map(t => ({ text: t, options: { bullet: { code: '2022', indent: 8 }, color: C.ink } })),
      { x: x + 0.16, y: gy + 0.4, w: gw - 0.32, h: 1.5, fontFace: SANS, fontSize: 8.6, valign: 'top', lineSpacing: 12 });
  });
}

// ---------- glossário ----------
function glossario() {
  const s = baseSlide();
  const y0 = header(s, 'Glossário', 'Termos e definições', 'Vocabulário comum — o mesmo no deck e no site.');
  const gw = (W - 2 * MX - 0.3) / 2, gh = 0.72;
  GLOSSARIO.forEach((g, i) => {
    const x = MX + (i % 2) * (gw + 0.3);
    const y = y0 + 0.15 + Math.floor(i / 2) * (gh + 0.12);
    card(s, x, y, gw, gh);
    s.addText(g.termo, { x: x + 0.15, y: y + 0.06, w: 1.7, h: 0.6, fontFace: SERIF, fontSize: 12, color: C.navy, valign: 'middle' });
    s.addText(g.def, { x: x + 1.9, y: y + 0.06, w: gw - 2.05, h: 0.6, fontFace: SANS, fontSize: 8, color: C.gray, valign: 'middle', lineSpacing: 10 });
  });
}

// ---------- closing ----------
function closing() {
  const s = baseSlide(C.navy);
  s.addShape('rect', { x: 0, y: H - 0.18, w: W, h: 0.18, fill: { color: C.gold } });
  wordmark(s, true, MX, 0.55);
  s.addText('Uma metodologia.\nTrês produtos. Uma régua.', {
    x: MX, y: 2.6, w: 11, h: 1.8, fontFace: SERIF, fontSize: 40, color: C.cream, lineSpacing: 48,
  });
  s.addText('EPP entrega  ·  GMO adota  ·  PM&GO integra', {
    x: MX, y: 4.6, w: 10, h: 0.4, fontFace: SANS, fontSize: 14, color: C.gold,
  });
  s.addText(WORDMARK, { x: MX, y: 6.5, w: 6, h: 0.3, fontFace: SANS, fontSize: 10, bold: true, color: 'B9C3D0', charSpacing: 4 });
}

// ============================================================
// montagem
// ============================================================
cover();
howto();
architecture();

divider('01', 'epp');
framework('epp'); roadmap('epp'); maturity('epp'); assessment('epp'); raci('epp');

divider('02', 'gmo');
framework('gmo'); roadmap('gmo'); maturity('gmo'); assessment('gmo'); raci('gmo');

divider('03', 'pmgo');
framework('pmgo'); venn(); roadmap('pmgo'); maturity('pmgo'); assessment('pmgo'); raci('pmgo');

glossario();
closing();

pptx.writeFile({ fileName: 'Metodologia_Obliant.pptx' }).then(() => {
  console.log('OK: Metodologia_Obliant.pptx gerado (24 slides)');
});
