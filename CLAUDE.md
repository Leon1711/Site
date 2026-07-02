# Obliant — Metodologia "Governança, Projetos e Mudança"
## Documento de contexto para retomada no Claude Code

> **O que é este arquivo:** um briefing consolidado do projeto para o Claude Code continuar de onde a construção parou. Ele **descreve** o estado atual e as decisões tomadas — os arquivos-fonte (`build2.js`, `genhtml.js`, `metodologia_obliant.html`, `Metodologia_Obliant.pptx`) você já tem em mãos e são a fonte de verdade do código.
>
> **Dica:** se quiser que o Claude Code carregue este contexto automaticamente, salve-o como `CLAUDE.md` na raiz da pasta do projeto.

---

## 0. TL;DR

Material **interno** da consultoria Obliant que padroniza três produtos (EPP, GMO, PM&GO) em uma metodologia única. Cada produto se descreve em três camadas empilhadas — **Framework + Roadmap + Diagnóstico** — e todos correm na **mesma régua de maturidade**. Existem dois entregáveis paralelos, gerados por código: um **deck `.pptx`** (arquitetura visual) e um **site HTML de uma página só** com abas e um **assessment interativo**. O objetivo do assessment é ser preenchido ao vivo com o cliente e devolver na hora o diagnóstico de maturidade + o roadmap recomendado.

Falta: trocar o wordmark de texto pelo logo real, calibrar as perguntas/notas de corte do assessment, aprofundar o conteúdo dos frameworks e publicar o site (link para o time comercial).

---

## 1. Contexto do cliente e do produto

- **Empresa:** Obliant — consultoria de transformação empresarial.
- **Natureza do material:** ativo **interno**, para orientar os times comercial e de consultoria sobre **quais iniciativas ofertar em cada disciplina e como identificar em que nível o cliente está**. Não é peça comercial, não é a metodologia completa, não deve explicar conceitos nem ter muito texto — a régua é "padrão Big Four" (Deloitte/EY/KPMG/Gartner), altamente visual.
- **Idioma:** tudo em **Português (pt-BR)**.
- **Estilo de trabalho:** iterativo — revisar o resultado visualmente e pedir ajustes pontuais, em vez de reconstruir do zero.

---

## 2. As três frentes (produtos)

| Sigla | Nome | O que é | Papel |
|---|---|---|---|
| **EPP** | Escritório de Projetos e Processos | Estrutura, controla e entrega: método, portfólio, processos e indicadores | **Entrega**. É o *produto*; quem o opera é um **PMO** (time/estrutura) |
| **GMO** | Gestão da Mudança Organizacional | Trata o lado humano da transformação — adoção e sustentação | **Adoção** |
| **PM&GO** | (governança integrada) | Governa um projeto combinando EPP (entrega) + GMO (adoção) | **Integração** |

> ⚠️ **Correção importante já aplicada:** o produto é **EPP**, **não** "PMO". PMO é o *time que performa* o EPP. Onde fizer sentido, deixar explícito "operado por um PMO".

O **PM&GO** carrega um **diagrama de Venn**: o que é só EPP/PMO, o que é só GMO e o que é compartilhado. Cada entregável/atividade do PM&GO é **etiquetado** (PMO / GMO / compartilhado) para o Venn ser operacional, não só conceitual.

---

## 3. Modelo conceitual (o coração da metodologia)

### 3.1. Três camadas por frente
Cada produto se descreve em três camadas que **se empilham** e juntas formam o documento completo:

1. **Framework** — objetivo, escopo, pilares e entregáveis.
2. **Roadmap** — iniciativas organizadas **por nível de maturidade** (jornada de evolução, não lista de serviços).
3. **Diagnóstico (Assessment)** — posiciona o cliente na régua e devolve o roadmap recomendado.

> Frase-chave do projeto: **não** é "framework = roadmap = diagnóstico" (a mesma coisa com nomes diferentes). É **framework + roadmap + diagnóstico** — três camadas distintas.

### 3.2. Régua de maturidade ÚNICA
As três frentes usam **a mesma escala**. Isso é o que transforma "três roadmaps soltos" em uma **metodologia**: só com escala compartilhada dá para posicionar o cliente e comparar as frentes entre si.

### 3.3. Segundo eixo, exclusivo do PM&GO
O PM&GO tem um eixo que EPP e GMO não têm: o **modo de atuação da Obliant** — **Suporte → Controle → Diretivo** —, que representa a **intensidade** com que a Obliant atua (leve → mão na massa). Depende da maturidade **e** da criticidade do momento. É um diferencial que valoriza o produto.

---

## 4. Identidade visual

- **Cores da marca** (extraídas do PDF real de proposta da COPAG, via amostragem de pixels):
  - Navy `#4A5C72`
  - Creme `#FFFDF6`
  - Dourado `#998D67`
  - (o código também usa tons de apoio — cinza e "ice"; conferir os valores exatos nas constantes dos arquivos)
- **Tipografia:** **Fraunces** (serifada, títulos) + **Inter** (sem serifa, texto) — Google Fonts.
- **Wordmark:** lockup em texto **"OBLIANT DIGITAL"**.
- **Logo/símbolo:** a marca gráfica (um laço, tipo "∂") **não pode ser reproduzida por código**. Para trocar o wordmark de texto pelo símbolo real, é preciso fornecer um **PNG/SVG** e embutir/linkar no HTML e no deck. **← pendência.**

---

## 5. Entregáveis e arquivos-fonte

| Arquivo | Gerador | O que é |
|---|---|---|
| `Metodologia_Obliant.pptx` | `build2.js` (Node + **pptxgenjs**) | Deck com a arquitetura visual, ~24 slides, 100% editável (formas e textos nativos, sem imagens rasterizadas) |
| `metodologia_obliant.html` | `genhtml.js` (Node) | Site de **uma página só**, autossuficiente (CSS e JS embutidos), com abas e o assessment interativo |

Preferência do cliente: **um arquivo, um link** para o site.

---

## 6. Deck `.pptx` — estrutura detalhada

Gerado por `build2.js` (pptxgenjs). Sequência de montagem:

```
cover()                → capa
howto()                → "como ler" (estrutura padrão de 5 blocos A–E que se repete em cada produto)
architecture()         → os 3 produtos e a relação entre eles
divider 01 + EPP       → framework, roadmap, maturity, assessment, raci
divider 02 + GMO       → framework, roadmap, maturity, assessment, raci
divider 03 + PM&GO     → framework, venn, roadmap, maturity, assessment, raci
glossario()
closing()
```

Por produto, os 5 slides são: **Framework (8 dimensões)** · **Roadmap de iniciativas** · **Mapa de maturidade (5 níveis)** · **Assessment (fluxo)** · **RACI**.

**Detalhes/decisões já embutidas:**
- **GMO — Pilares proprietários:** `Diagnosticar · Preparar · Engajar · Capacitar · Sustentar`. Os métodos de mercado (ADKAR, Kotter, ACMP, SAP/Oracle OCM) foram **rebaixados para nota de rodapé em itálico** — para dar cara de metodologia própria ("padrão Big Four").
- **GMO — Entregáveis (OCM de verdade):** Change Readiness, Impact Assessment, Stakeholder & Communication Strategy, Training, Resistance Management, Adoption Metrics, Sustainment.
- **Roadmap granular:** meta de **4–5 iniciativas por nível** (antes eram ~2). Confirmar que está assim nas três frentes.
- **Ajuste fino aplicado:** alinhamento vertical dos "dots" dos roadmaps, via `dc = ry + (rowH - 0.05) / 2`.
- Paleta neutra premium (navy + dourado + creme), com lockup "OBLIANT DIGITAL".

---

## 7. Site HTML — estrutura detalhada

Gerado por `genhtml.js`, saída `metodologia_obliant.html` (tudo inline).

**6 abas de topo:** `Visão geral` · `EPP` · `GMO` · `PM&GO` · `Assessment` · `Glossário`.

**Cada aba de produto tem sub-abas:** `Framework` · `Roadmap` · `Maturidade` · `Assessment` · `RACI` (o **PM&GO** também tem `Venn`).

**Funções de renderização no gerador** (referência para editar o conteúdo certo):
- `overviewHTML()` — visão geral / arquitetura
- `frameworkHTML(prod)`
- `roadmapHTML(prod)`
- `maturityHTML()`
- `assessmentHTML()`
- `raciHTML(prod)`
- `vennHTML()`

---

## 8. Assessment interativo — lógica

Integrado ao site como a aba **Assessment**. **Objetivo:** preencher ao vivo com o cliente → gerar na hora o **diagnóstico de maturidade** + a **recomendação de roadmap**. Dois tipos de lógica:

**A) Assessment de maturidade (EPP e GMO)**
- **6 dimensões** por produto, escala **1–5**.
- Calcula o **nível médio** → mostra o **detalhamento por dimensão** + as **iniciativas do próximo nível** (puxadas do roadmap).

**B) Assessment de *fit* (PM&GO)**
- **6 perguntas** em **dois eixos**: **"A" = necessidade de entrega** e **"B" = necessidade de adoção**.
- Recomenda **EPP**, **GMO**, **PM&GO** ou **suporte leve**, e ainda define o **modo** (Suporte / Controle / Diretivo).
- Racional: para o PM&GO o assessment mede **adequação (fit)**, não só nível de maturidade.

> ⚠️ **As perguntas e as notas de corte (thresholds) são um primeiro rascunho** — precisam ser calibradas. **← pendência.**

---

## 9. Glossário (termos e definições no material)

- **EPP** — Escritório de Projetos e Processos. Operado por um PMO.
- **PMO** — Project Management Office: time/estrutura que opera o EPP e conduz projetos.
- **GMO** — Gestão da Mudança Organizacional: trata o lado humano da transformação.
- **PM&GO** — Governança integrada de um projeto, combinando EPP (entrega) + GMO (adoção).
- **Assessment** — Diagnóstico que posiciona o cliente na régua e gera o roadmap.
- **Maturidade** — Régua de 5 níveis (Inicial → Excelência) comum aos três produtos.
- **RACI** — Matriz de papéis: Responsável, Aprovador, Consultado, Informado.
- **OCM** — Organizational Change Management; base do GMO (ADKAR, Kotter, ACMP).

---

## 10. Como buildar (comandos)

### 10.1. Site HTML
```bash
node genhtml.js        # gera metodologia_obliant.html (autossuficiente)
```
Sem dependências externas além do Node. Para revisar: abrir o `.html` no navegador.

### 10.2. Deck .pptx
```bash
npm i pptxgenjs        # dependência do gerador
node build2.js         # grava Metodologia_Obliant.pptx direto
```

> ⚠️ **Cuidado de ambiente:** na sessão original o deck foi validado com utilitários **específicos daquele sandbox** (caminhos `/mnt/skills/public/pptx/...`, mais LibreOffice e Poppler). **No seu Claude Code local esses caminhos não existem.** O `node build2.js` (com pptxgenjs) **já grava um `.pptx` válido sozinho** — os passos abaixo eram só para **renderizar e conferir visualmente** e são opcionais:
>
> ```bash
> # QA visual (opcional; exige LibreOffice + Poppler instalados localmente):
> soffice --headless --convert-to pdf Metodologia_Obliant.pptx
> pdftoppm -jpeg -r 130 Metodologia_Obliant.pdf slide   # gera slide-*.jpg para inspeção
> ```
> O passo `rezip.py` do sandbox era um conserto de compressão daquele ambiente — normalmente **desnecessário** localmente.

---

## 11. Publicação do site

Meta: **link online compartilhável** para o time comercial apresentar ao cliente — **um arquivo, um link**.

- **Caminho mais simples — Netlify Drop:** abrir `app.netlify.com/drop` e arrastar o `metodologia_obliant.html`. Gera o link na hora.
- **Alternativas:** Netlify CLI (`netlify deploy`) ou qualquer hospedagem estática.

> Publicar/fazer deploy é uma ação irreversível voltada ao público — deixe para executar você mesmo (ou confirmar explicitamente), não como passo automático.

---

## 12. Decisões já tomadas (não re-litigar sem motivo)

- Produtos = **EPP / GMO / PM&GO**, com o **Venn dentro do PM&GO**.
- **EPP ≠ PMO** (EPP é o produto; PMO é o time que opera).
- **Régua de maturidade única e compartilhada** pelas três frentes.
- PM&GO tem **segundo eixo exclusivo**: Suporte / Controle / Diretivo (intensidade de atuação).
- Paleta **neutra premium**: navy + dourado + creme.
- GMO com **pilares proprietários** (Diagnosticar/Preparar/Engajar/Capacitar/Sustentar); métodos de mercado só em nota de rodapé.
- O material é **ativo interno** (orienta comercial + consultoria), não peça comercial nem metodologia completa; **pouco texto, muito visual**.
- Tudo em **pt-BR**.
- **Um arquivo, um link** para o site.

---

## 13. Pendências / TODO consolidado

- [ ] **Logo real:** substituir o wordmark de texto pelo símbolo "∂" (fornecer PNG/SVG e embutir no HTML e no deck).
- [ ] **Calibrar o assessment:** revisar perguntas e notas de corte — maturidade (EPP/GMO) e *fit* (PM&GO).
- [ ] **Aprofundar frameworks:** hoje o conteúdo está em nível estrutural/ilustrativo; detalhar por produto.
- [ ] **Roadmap:** confirmar 4–5 iniciativas por nível nas três frentes.
- [ ] **Publicar o site** (Netlify Drop) e gerar o link para o comercial.
- [ ] **Revisão final de identidade visual** (cores, fontes, lockup).

---

## 14. Pontos a confirmar / possíveis inconsistências

- **Rótulos dos níveis de maturidade:** o material fixa **5 níveis (Inicial → Excelência)**. Os **nomes dos 3 níveis intermediários** não estão consolidados neste resumo — conferir nos arquivos e garantir que **deck e site usem exatamente os mesmos rótulos**. (Obs.: em um rascunho conceitual no chat apareceu uma versão de **4 níveis** — fundação/estruturação/otimização/excelência —; o padrão vigente é **5 níveis**.)
- **Nomes das 8 dimensões do Framework:** ficam nos dados de cada produto dentro dos geradores — usar os arquivos como fonte.
- **Tons de apoio (cinza/ice):** confirmar os hex exatos nas constantes de `build2.js`/`genhtml.js`.

---

## 15. Como retomar no Claude Code (passo a passo)

1. Reúna numa pasta (repositório) os arquivos: `build2.js`, `genhtml.js`, `metodologia_obliant.html`, `Metodologia_Obliant.pptx` e este `.md`.
2. (Opcional) Renomeie este arquivo para `CLAUDE.md` na raiz, para carregamento automático de contexto.
3. Rode `node genhtml.js` e abra o HTML para ver o estado atual do site + assessment.
4. Rode `npm i pptxgenjs && node build2.js` para regenerar o deck.
5. Ataque o TODO da seção 13, começando pelo que trava a apresentação ao cliente (logo + publicação) ou pelo que dá mais valor (calibrar o assessment + aprofundar frameworks).

---

*Documento de contexto gerado a partir do histórico do projeto. Os arquivos-fonte são a fonte de verdade; onde houver divergência, valem os arquivos.*
