# Obliant — Metodologia "Governança, Projetos e Mudança"

Ativo **interno** da consultoria Obliant que padroniza três produtos — **EPP** (entrega), **GMO** (adoção) e **PM&GO** (integração) — em uma metodologia única. Cada produto se descreve em três camadas empilhadas (**Framework + Roadmap + Diagnóstico**) e todos correm na **mesma régua de maturidade de 5 níveis** (Inicial → Emergente → Estruturado → Integrado → Excelência).

Dois entregáveis paralelos, ambos **gerados por código** a partir da mesma fonte de conteúdo:

| Arquivo | Gerador | O que é |
|---|---|---|
| `metodologia_obliant.html` (+ `dist/index.html`) | `genhtml.js` | Site de **uma página só**, autossuficiente (CSS/JS embutidos), com abas e **assessment interativo** |
| `Metodologia_Obliant.pptx` | `build2.js` | Deck com a arquitetura visual, **24 slides**, 100% editável (formas e textos nativos) |

`data.js` é a **fonte única de conteúdo** (produtos, dimensões, roadmaps, perguntas do assessment, RACI, glossário) compartilhada pelos dois geradores — editar lá reflete no site e no deck.

## Como buildar

```bash
npm install          # dependência: pptxgenjs
npm run build        # gera site (html) + deck (pptx)
npm run build:site   # só o site  → metodologia_obliant.html e dist/index.html
npm run build:deck   # só o deck  → Metodologia_Obliant.pptx
```

Para revisar o site: abrir `metodologia_obliant.html` no navegador.

## Assessment interativo

- **EPP e GMO (maturidade):** 6 dimensões, escala 1–5 → nível médio na régua + detalhamento por dimensão + iniciativas do próximo nível (puxadas do roadmap).
- **PM&GO (fit):** 6 perguntas em dois eixos — A (necessidade de entrega) e B (necessidade de adoção) → recomenda **EPP**, **GMO**, **PM&GO** ou **suporte leve**, e define o **modo de atuação** (Suporte / Controle / Diretivo).
- Notas de corte em `data.js` (`MATURITY_THRESHOLDS` e `PRODUCTS.pmgo.assessment.cortes`) — calibráveis em um único lugar.

## Publicação

O site publica em qualquer hospedagem estática ("um arquivo, um link"). O repositório inclui `netlify.toml` (build `node genhtml.js`, publish `dist/`) para deploy contínuo via Netlify; alternativa rápida: Netlify Drop arrastando o `metodologia_obliant.html`.

## Pendências conhecidas

- **Logo real:** o símbolo "∂" da marca não pode ser reproduzido por código — ao receber o PNG/SVG, embutir no HTML (`genhtml.js`) e no deck (`build2.js`) no lugar do wordmark de texto.
- **Calibração fina do assessment:** perguntas e notas de corte estão em primeira versão funcional; validar com o time de consultoria.
