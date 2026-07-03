// ============================================================
// Obliant — Metodologia "Governança, Projetos e Mudança"
// Fonte única de conteúdo compartilhada por genhtml.js (site)
// e build2.js (deck .pptx). Tudo em pt-BR.
// ============================================================

// ---------- Identidade visual ----------
const COLORS = {
  navy:   '4A5C72',
  cream:  'FFFDF6',
  gold:   '998D67',
  ice:    'EDF0F4',
  gray:   '7A8494',
  ink:    '2E3947',
  line:   'D9DDE3',
  white:  'FFFFFF',
};

const FONTS = { serif: 'Fraunces', sans: 'Inter' };
const WORDMARK = 'OBLIANT DIGITAL';

// ---------- Régua de maturidade ÚNICA (5 níveis) ----------
const MATURITY_LEVELS = [
  {
    n: 1, nome: 'Inicial',
    resumo: 'Práticas ad hoc, dependentes de pessoas',
    desc: 'Iniciativas conduzidas caso a caso, sem método comum. Resultados dependem de esforço individual; pouca visibilidade e previsibilidade.',
  },
  {
    n: 2, nome: 'Emergente',
    resumo: 'Primeiras práticas definidas, aplicação irregular',
    desc: 'Métodos e papéis básicos existem, mas a aplicação é inconsistente entre áreas e projetos. Padrões começam a se formar.',
  },
  {
    n: 3, nome: 'Estruturado',
    resumo: 'Método padronizado e adotado',
    desc: 'Método único, papéis claros e ritos de governança operando. A organização executa de forma consistente e comparável.',
  },
  {
    n: 4, nome: 'Integrado',
    resumo: 'Gestão integrada e orientada a dados',
    desc: 'Disciplinas conectadas entre si e ao planejamento da organização. Decisões apoiadas por indicadores; capacidade e portfólio geridos em conjunto.',
  },
  {
    n: 5, nome: 'Excelência',
    resumo: 'Melhoria contínua e valor estratégico',
    desc: 'A disciplina é vantagem competitiva: melhoria contínua institucionalizada, análise preditiva e referência externa (benchmark).',
  },
];

// Notas de corte do assessment de maturidade (média 1–5 → nível)
const MATURITY_THRESHOLDS = [
  { max: 1.8, nivel: 1 },
  { max: 2.6, nivel: 2 },
  { max: 3.4, nivel: 3 },
  { max: 4.2, nivel: 4 },
  { max: 5.01, nivel: 5 },
];

// ---------- Estrutura padrão de leitura (5 blocos A–E) ----------
const HOWTO_BLOCKS = [
  { id: 'A', titulo: 'Framework',   desc: 'Objetivo, escopo, pilares e entregáveis do produto' },
  { id: 'B', titulo: 'Roadmap',     desc: 'Iniciativas organizadas por nível de maturidade — uma jornada, não uma lista de serviços' },
  { id: 'C', titulo: 'Maturidade',  desc: 'A régua única de 5 níveis aplicada à frente' },
  { id: 'D', titulo: 'Assessment',  desc: 'Diagnóstico que posiciona o cliente na régua e devolve o roadmap recomendado' },
  { id: 'E', titulo: 'RACI',        desc: 'Papéis e responsabilidades entre Obliant, cliente e estruturas de governança' },
];

// ---------- Modo de atuação (eixo exclusivo do PM&GO) ----------
const MODOS_ATUACAO = [
  {
    nome: 'Suporte',
    desc: 'Atuação leve: aconselhamento, métodos e templates. O cliente conduz; a Obliant orienta.',
    quando: 'Maturidade razoável e criticidade baixa a média.',
  },
  {
    nome: 'Controle',
    desc: 'Atuação estruturante: a Obliant opera a governança, ritos e indicadores lado a lado com o cliente.',
    quando: 'Maturidade em construção ou criticidade relevante.',
  },
  {
    nome: 'Diretivo',
    desc: 'Atuação mão na massa: a Obliant assume a condução da entrega e da adoção até a estabilização.',
    quando: 'Baixa maturidade e alta criticidade — momentos decisivos.',
  },
];

// ============================================================
// PRODUTOS
// ============================================================

const PRODUCTS = {
  // -----------------------------------------------------------
  epp: {
    key: 'epp',
    sigla: 'EPP',
    nome: 'Escritório de Projetos e Processos',
    papel: 'Entrega',
    tagline: 'Estrutura, controla e entrega: método, portfólio, processos e indicadores.',
    nota: 'O EPP é o produto; quem o opera é um PMO (time/estrutura).',
    objetivo: 'Dar à organização capacidade estável de priorizar, executar e medir projetos e processos — operado por um PMO.',
    pilares: ['Método', 'Portfólio', 'Processos', 'Indicadores'],
    dimensoes: [
      { nome: 'Estratégia & Portfólio', desc: 'Seleção e priorização de iniciativas conectadas à estratégia' },
      { nome: 'Metodologia & Métodos', desc: 'Ciclo de vida, práticas e templates de gestão de projetos' },
      { nome: 'Processos & Fluxos', desc: 'Mapeamento, redesenho e padronização de processos de negócio' },
      { nome: 'Governança & Papéis', desc: 'Ritos, alçadas, comitês e papéis de decisão' },
      { nome: 'Indicadores & Desempenho', desc: 'KPIs de entrega, painéis e rotina de gestão à vista' },
      { nome: 'Ferramentas & Tecnologia', desc: 'Plataformas de gestão, automação e integração de dados' },
      { nome: 'Pessoas & Competências', desc: 'Capacidades do time de projetos e trilhas de desenvolvimento' },
      { nome: 'Riscos & Qualidade', desc: 'Gestão de riscos, mudanças de escopo e garantia de qualidade' },
    ],
    entregaveis: [
      'Portfólio priorizado de iniciativas',
      'Metodologia de gestão de projetos (ciclo de vida + templates)',
      'Mapa e redesenho de processos críticos',
      'Modelo de governança (ritos, alçadas e comitês)',
      'Painel de indicadores de entrega',
      'Modelo de gestão de riscos e mudanças',
    ],
    roadmap: [
      { nivel: 1, iniciativas: [
        'Inventário de projetos e processos existentes',
        'Definição de patrocínio e papéis mínimos de gestão',
        'Padrão único de status report para iniciativas prioritárias',
        'Quick wins de padronização (templates essenciais)',
        'Canvas de escopo para os projetos críticos',
      ]},
      { nivel: 2, iniciativas: [
        'Metodologia básica de projetos (ciclo de vida em fases)',
        'Kit de templates: TAP, cronograma, matriz de riscos, status report',
        'Ritos de acompanhamento (reunião de status e comitê mensal)',
        'Mapeamento dos processos críticos (AS-IS)',
        'Indicadores essenciais de prazo e custo por projeto',
      ]},
      { nivel: 3, iniciativas: [
        'Gestão de portfólio com critérios de priorização',
        'Formalização do PMO (mandato, time e cadência)',
        'Gestão estruturada de riscos e mudanças de escopo',
        'Redesenho dos processos críticos (TO-BE) com donos definidos',
        'Painel executivo de indicadores de entrega',
      ]},
      { nivel: 4, iniciativas: [
        'Integração portfólio ↔ orçamento e planejamento anual',
        'Gestão de capacidade e alocação de recursos',
        'Automação de fluxos de trabalho e coleta de indicadores',
        'Gestão de benefícios: metas de valor por iniciativa',
        'Auditorias periódicas de qualidade de método',
      ]},
      { nivel: 5, iniciativas: [
        'Gestão por valor: portfólio dirigido por benefícios realizados',
        'Analytics preditivo de prazo, custo e risco',
        'Melhoria contínua institucionalizada do método',
        'Inovação de práticas (ágil, híbrido, IA aplicada à gestão)',
        'Benchmark externo e certificação de excelência',
      ]},
    ],
    assessment: {
      tipo: 'maturidade',
      intro: 'Avalie cada dimensão de 1 (inexistente/ad hoc) a 5 (excelência). O resultado posiciona o cliente na régua e recomenda as iniciativas do próximo nível.',
      dimensoes: [
        { nome: 'Metodologia', pergunta: 'Existe um método único de gestão de projetos, com ciclo de vida e templates, aplicado de forma consistente?' },
        { nome: 'Portfólio', pergunta: 'As iniciativas são priorizadas com critérios claros e conectadas à estratégia?' },
        { nome: 'Processos', pergunta: 'Os processos críticos estão mapeados, padronizados e têm donos definidos?' },
        { nome: 'Governança & Papéis', pergunta: 'Ritos, comitês e alçadas de decisão funcionam com cadência e consequência?' },
        { nome: 'Indicadores', pergunta: 'A entrega é medida por indicadores confiáveis, usados de fato na tomada de decisão?' },
        { nome: 'Ferramentas', pergunta: 'As plataformas de gestão sustentam o método e dão visibilidade integrada do portfólio?' },
      ],
    },
    raci: {
      papeis: ['Obliant', 'PMO (cliente)', 'Sponsor', 'Gestores de área', 'Equipes de projeto'],
      atividades: [
        { nome: 'Desenho do método e do modelo de governança', raci: ['R', 'C', 'A', 'C', 'I'] },
        { nome: 'Priorização do portfólio', raci: ['C', 'R', 'A', 'C', 'I'] },
        { nome: 'Condução dos ritos de acompanhamento', raci: ['C', 'R', 'I', 'C', 'C'] },
        { nome: 'Mapeamento e redesenho de processos', raci: ['R', 'C', 'A', 'R', 'C'] },
        { nome: 'Gestão de riscos e mudanças de escopo', raci: ['C', 'R', 'A', 'C', 'R'] },
        { nome: 'Painel de indicadores e gestão à vista', raci: ['C', 'R', 'I', 'C', 'I'] },
        { nome: 'Evolução contínua do método', raci: ['R', 'R', 'A', 'C', 'I'] },
      ],
    },
  },

  // -----------------------------------------------------------
  gmo: {
    key: 'gmo',
    sigla: 'GMO',
    nome: 'Gestão da Mudança Organizacional',
    papel: 'Adoção',
    tagline: 'Trata o lado humano da transformação — adoção e sustentação.',
    nota: 'Pilares proprietários Obliant. Referências de mercado (ADKAR, Kotter, ACMP, SAP/Oracle OCM) apenas como base conceitual.',
    objetivo: 'Garantir que as pessoas adotem e sustentem a transformação — reduzindo resistência e acelerando o retorno das iniciativas.',
    pilares: ['Diagnosticar', 'Preparar', 'Engajar', 'Capacitar', 'Sustentar'],
    pilaresNota: 'Método proprietário Obliant. ADKAR, Kotter, ACMP e SAP/Oracle OCM são base conceitual — não a metodologia.',
    metodo: {
      titulo: 'Método Obliant de gestão da mudança',
      intro: 'As cinco fases não são teoria: cada uma tem entregáveis e frentes de trabalho próprias, aplicadas ao longo do projeto.',
      fases: [
        { nome: 'Diagnosticar', foco: 'Entender o ponto de partida', desc: 'Mapear stakeholders e impactos, avaliar a prontidão para mudança e o histórico da organização.', entregas: ['Change Readiness', 'Impact Assessment', 'Mapa de stakeholders'] },
        { nome: 'Preparar', foco: 'Desenhar a estratégia', desc: 'Definir a estratégia de mudança e o patrocínio; estruturar comunicação, capacitação e a rede de agentes.', entregas: ['Estratégia de mudança', 'Plano de comunicação', 'Rede de agentes'] },
        { nome: 'Engajar', foco: 'Mobilizar as pessoas', desc: 'Comunicar por público, ativar lideranças e agentes e tratar resistências de forma ativa.', entregas: ['Execução da comunicação', 'Ativação de sponsors', 'Gestão de resistências'] },
        { nome: 'Capacitar', foco: 'Preparar para operar', desc: 'Treinar por perfil e transferir conhecimento para as pessoas operarem o novo modelo com autonomia.', entregas: ['Trilhas por perfil', 'Treinamento', 'Avaliação de aprendizagem'] },
        { nome: 'Sustentar', foco: 'Fixar a mudança', desc: 'Medir a adoção, reforçar comportamentos, corrigir a rota e institucionalizar a mudança.', entregas: ['Métricas de adoção', 'Reforço e sustentação', 'Ajuste de rota'] },
      ],
    },
    dimensoes: [
      { nome: 'Patrocínio & Liderança', desc: 'Sponsors ativos e coalizão de líderes visíveis na mudança' },
      { nome: 'Prontidão para Mudança', desc: 'Change readiness: histórico, cultura e disposição da organização' },
      { nome: 'Impactos Organizacionais', desc: 'Impact assessment: o que muda para quem, em processo, sistema e papel' },
      { nome: 'Stakeholders & Comunicação', desc: 'Mapeamento de públicos e estratégia de comunicação segmentada' },
      { nome: 'Capacitação & Treinamento', desc: 'Trilhas de treinamento por perfil e avaliação de aprendizagem' },
      { nome: 'Gestão de Resistências', desc: 'Identificação, escuta e tratamento ativo de resistências' },
      { nome: 'Métricas de Adoção', desc: 'Indicadores de uso, adesão e comportamento pós-implantação' },
      { nome: 'Sustentação & Reforço', desc: 'Mecanismos de reforço para a mudança não regredir' },
    ],
    entregaveis: [
      'Change Readiness Assessment (prontidão para mudança)',
      'Impact Assessment (avaliação de impactos organizacionais)',
      'Estratégia de stakeholders & plano de comunicação',
      'Plano de capacitação e treinamento por perfil',
      'Plano de gestão de resistências',
      'Painel de métricas de adoção',
      'Plano de sustentação e reforço',
    ],
    roadmap: [
      { nivel: 1, iniciativas: [
        'Mapeamento inicial de stakeholders e públicos impactados',
        'Avaliação de prontidão para mudança (change readiness)',
        'Alinhamento e ativação do patrocínio executivo',
        'Comunicação de partida (kick-off) da transformação',
        'Levantamento do histórico de mudanças da organização',
      ]},
      { nivel: 2, iniciativas: [
        'Plano de comunicação estruturado por público e canal',
        'Avaliação de impactos organizacionais (impact assessment)',
        'Formação da rede de agentes de mudança',
        'Plano de engajamento de lideranças intermediárias',
        'Canais de escuta e FAQ vivos da transformação',
      ]},
      { nivel: 3, iniciativas: [
        'Estratégia integrada de stakeholders com plano por segmento',
        'Trilhas de capacitação por perfil e papel',
        'Gestão ativa de resistências (identificação e tratamento)',
        'Rituais de reforço com lideranças e times',
        'Pesquisa de pulso periódica de engajamento',
      ]},
      { nivel: 4, iniciativas: [
        'Métricas de adoção e uso integradas aos projetos (gates de adoção)',
        'Programa de champions e multiplicadores',
        'Painel de sustentação pós-implantação',
        'Ciclo de feedback estruturado com ajustes de rota',
        'Integração da GMO ao ciclo de vida de todo projeto',
      ]},
      { nivel: 5, iniciativas: [
        'Cultura de mudança contínua institucionalizada',
        'Capacidade interna de OCM formada e autônoma',
        'Análise preditiva de adoção e risco de regressão',
        'Comunidade de prática de gestão da mudança',
        'Melhoria contínua do método com benchmark externo',
      ]},
    ],
    assessment: {
      tipo: 'maturidade',
      intro: 'Avalie cada dimensão de 1 (inexistente/ad hoc) a 5 (excelência). O resultado posiciona o cliente na régua e recomenda as iniciativas do próximo nível.',
      dimensoes: [
        { nome: 'Patrocínio', pergunta: 'Os sponsors são ativos e visíveis, dedicando tempo real à mudança?' },
        { nome: 'Comunicação', pergunta: 'A comunicação é planejada por público, com canais definidos e mensagem consistente?' },
        { nome: 'Impactos & Prontidão', pergunta: 'Os impactos da mudança são avaliados formalmente e a prontidão da organização é conhecida?' },
        { nome: 'Capacitação', pergunta: 'Existem trilhas de treinamento por perfil, com avaliação de aprendizagem?' },
        { nome: 'Resistências', pergunta: 'As resistências são identificadas e tratadas de forma ativa e estruturada?' },
        { nome: 'Adoção & Sustentação', pergunta: 'A adoção é medida após a implantação e existem mecanismos de reforço?' },
      ],
    },
    raci: {
      papeis: ['Obliant', 'Time GMO (cliente)', 'Sponsor', 'Líderes / Gestores', 'Colaboradores'],
      atividades: [
        { nome: 'Change readiness e avaliação de impactos', raci: ['R', 'C', 'A', 'C', 'I'] },
        { nome: 'Estratégia de stakeholders e comunicação', raci: ['R', 'R', 'A', 'C', 'I'] },
        { nome: 'Execução do plano de comunicação', raci: ['C', 'R', 'I', 'R', 'I'] },
        { nome: 'Capacitação e treinamento', raci: ['C', 'R', 'I', 'C', 'R'] },
        { nome: 'Gestão de resistências', raci: ['C', 'R', 'A', 'R', 'C'] },
        { nome: 'Medição de adoção e sustentação', raci: ['C', 'R', 'A', 'C', 'I'] },
        { nome: 'Ativação e coaching de sponsors', raci: ['R', 'C', 'R', 'C', 'I'] },
      ],
    },
  },

  // -----------------------------------------------------------
  pmgo: {
    key: 'pmgo',
    sigla: 'PM&GO',
    nome: 'Governança Integrada de Projetos e Mudança',
    papel: 'Integração',
    tagline: 'Governa um projeto combinando EPP (entrega) + GMO (adoção).',
    nota: 'Eixo exclusivo: modo de atuação da Obliant — Suporte → Controle → Diretivo.',
    objetivo: 'Governar um projeto crítico de ponta a ponta, unindo a disciplina de entrega (EPP) e a disciplina de adoção (GMO) sob uma única governança.',
    pilares: ['Entrega', 'Adoção', 'Governança única', 'Modo de atuação'],
    dimensoes: [
      { nome: 'Governança Integrada', desc: 'Um único modelo de decisão para entrega e adoção' },
      { nome: 'Planejamento & Entrega', desc: 'Escopo, prazo, custo e qualidade do projeto (lado EPP)' },
      { nome: 'Adoção & Pessoas', desc: 'Prontidão, engajamento e sustentação (lado GMO)' },
      { nome: 'Patrocínio Executivo', desc: 'Sponsor único respondendo pelos dois eixos' },
      { nome: 'Stakeholders & Comunicação', desc: 'Gestão compartilhada de públicos e mensagens' },
      { nome: 'Riscos Integrados', desc: 'Riscos de entrega e riscos de adoção na mesma matriz' },
      { nome: 'Indicadores Duplos', desc: 'Painel único: % de entrega × % de adoção' },
      { nome: 'Modo de Atuação', desc: 'Intensidade Obliant: Suporte, Controle ou Diretivo' },
    ],
    entregaveis: [
      { nome: 'Modelo de governança integrada do projeto', tag: 'compartilhado' },
      { nome: 'Plano integrado de projeto (escopo, prazo, custo)', tag: 'pmo' },
      { nome: 'Matriz integrada de riscos (entrega + adoção)', tag: 'compartilhado' },
      { nome: 'Impact assessment e plano de adoção', tag: 'gmo' },
      { nome: 'Plano de comunicação e stakeholders do projeto', tag: 'gmo' },
      { nome: 'Painel duplo: entrega × adoção', tag: 'compartilhado' },
      { nome: 'Controle de escopo, cronograma e custos', tag: 'pmo' },
      { nome: 'Definição do modo de atuação (Suporte/Controle/Diretivo)', tag: 'compartilhado' },
    ],
    venn: {
      pmo: ['Escopo, prazo e custo', 'Cronograma e dependências', 'Gestão de riscos de entrega', 'Qualidade e aceite técnico', 'Gestão de fornecedores'],
      compartilhado: ['Governança e ritos do projeto', 'Patrocínio executivo', 'Mapa de stakeholders', 'Painel entrega × adoção', 'Gestão integrada de riscos'],
      gmo: ['Comunicação e engajamento', 'Impactos organizacionais', 'Capacitação e treinamento', 'Gestão de resistências', 'Métricas de adoção e sustentação'],
    },
    roadmap: [
      { nivel: 1, iniciativas: [
        'Diagnóstico rápido do projeto: entrega e adoção',
        'Definição de sponsor único e mandato da governança',
        'Mapa unificado de stakeholders do projeto',
        'Ritos mínimos de governança integrada',
        'Definição inicial do modo de atuação da Obliant',
      ]},
      { nivel: 2, iniciativas: [
        'Plano integrado de projeto (entrega + adoção)',
        'Matriz de riscos unificada (entrega e adoção)',
        'Plano de comunicação do projeto por público',
        'Cadência de comitês com pauta dupla (entrega × adoção)',
        'Etiquetagem das atividades: PMO, GMO ou compartilhado',
      ]},
      { nivel: 3, iniciativas: [
        'Painel duplo operante: % entrega × % adoção',
        'Gates de fase condicionados a critérios de adoção',
        'Gestão ativa de resistências dentro do projeto',
        'Trilhas de capacitação sincronizadas ao cronograma',
        'Revisão periódica do modo de atuação',
      ]},
      { nivel: 4, iniciativas: [
        'Integração do projeto ao portfólio e ao orçamento',
        'Métricas de benefício: valor entregue × valor adotado',
        'Programa de champions dentro do projeto',
        'Auditoria integrada de qualidade (método + adoção)',
        'Playbook de transição para operação',
      ]},
      { nivel: 5, iniciativas: [
        'Governança integrada como padrão de todo projeto crítico',
        'Analytics preditivo de entrega e de adoção',
        'Transferência de capacidade: cliente autônomo no modelo',
        'Melhoria contínua do playbook integrado',
        'Benchmark externo de governança de projetos',
      ]},
    ],
    assessment: {
      tipo: 'fit',
      intro: 'Este assessment é um portão de fit para o PM&GO: 8 perguntas em três eixos — A (necessidade de entrega), B (necessidade de adoção) e C (interdependência e criticidade). Se houver fit, recomenda o PM&GO e o modo de atuação (Suporte, Controle ou Diretivo). Se não houver, aponta uma frente a avaliar — EPP ou GMO — ou suporte leve.',
      perguntas: [
        { eixo: 'A', nome: 'Complexidade de entrega', pergunta: 'O projeto tem alta complexidade de escopo, prazo ou orçamento (multiáreas, fornecedores, dependências)?' },
        { eixo: 'A', nome: 'Histórico de entrega', pergunta: 'A organização tem histórico de atrasos, estouros de custo ou projetos abandonados?' },
        { eixo: 'A', nome: 'Capacidade de gestão', pergunta: 'Falta hoje método, papéis ou governança para conduzir esse projeto internamente?' },
        { eixo: 'B', nome: 'Impacto nas pessoas', pergunta: 'A mudança altera de forma significativa rotinas, papéis ou a forma de trabalhar das pessoas?' },
        { eixo: 'B', nome: 'Risco de resistência', pergunta: 'Há risco relevante de resistência, baixa adesão ou regressão ao modo antigo?' },
        { eixo: 'B', nome: 'Dependência de adoção', pergunta: 'O retorno do projeto depende diretamente de as pessoas usarem/adotarem o novo modelo?' },
        { eixo: 'C', nome: 'Interdependência', pergunta: 'Entrega e adoção compartilham o mesmo cronograma e marcos — o go-live depende de as pessoas estarem prontas para usar o novo modelo?' },
        { eixo: 'C', nome: 'Governança e criticidade', pergunta: 'As decisões precisam ser tomadas de forma integrada, sob um sponsor único, com trade-offs frequentes entre prazo de entrega e prontidão das pessoas?' },
      ],
      // Notas de corte do fit (média por eixo, escala 1–5)
      cortes: {
        eixoAlto: 3.4,        // média A ou B >= 3.4 → necessidade alta
        integracaoAlta: 3.4,  // média C >= 3.4 → interdependência alta (separa PM&GO integrado de EPP+GMO apartado)
        modoDiretivo: 4.0,    // média geral >= 4.0 → Diretivo
        modoControle: 2.8,    // média geral >= 2.8 → Controle; abaixo → Suporte
      },
    },
    raci: {
      papeis: ['Obliant', 'PMO do projeto', 'Time GMO', 'Sponsor', 'Líderes / Equipes'],
      atividades: [
        { nome: 'Governança integrada e ritos do projeto', raci: ['R', 'R', 'R', 'A', 'I'], tag: 'compartilhado' },
        { nome: 'Planejamento e controle de entrega', raci: ['C', 'R', 'I', 'A', 'C'], tag: 'pmo' },
        { nome: 'Plano e execução da adoção', raci: ['C', 'I', 'R', 'A', 'R'], tag: 'gmo' },
        { nome: 'Matriz integrada de riscos', raci: ['R', 'R', 'R', 'A', 'C'], tag: 'compartilhado' },
        { nome: 'Comunicação e stakeholders', raci: ['C', 'C', 'R', 'A', 'C'], tag: 'gmo' },
        { nome: 'Painel duplo entrega × adoção', raci: ['R', 'R', 'R', 'I', 'I'], tag: 'compartilhado' },
        { nome: 'Definição e revisão do modo de atuação', raci: ['R', 'C', 'C', 'A', 'I'], tag: 'compartilhado' },
      ],
    },
  },
};

// ---------- Glossário ----------
const GLOSSARIO = [
  { termo: 'EPP', def: 'Escritório de Projetos e Processos — o produto de entrega. Operado por um PMO.' },
  { termo: 'PMO', def: 'Project Management Office: time/estrutura que opera o EPP e conduz projetos.' },
  { termo: 'GMO', def: 'Gestão da Mudança Organizacional: trata o lado humano da transformação — adoção e sustentação.' },
  { termo: 'PM&GO', def: 'Governança integrada de um projeto, combinando EPP (entrega) + GMO (adoção).' },
  { termo: 'Assessment', def: 'Diagnóstico que posiciona o cliente na régua de maturidade e gera o roadmap recomendado.' },
  { termo: 'Maturidade', def: 'Régua de 5 níveis (Inicial → Excelência) comum aos três produtos.' },
  { termo: 'RACI', def: 'Matriz de papéis: Responsável, Aprovador, Consultado, Informado.' },
  { termo: 'OCM', def: 'Organizational Change Management; base conceitual do GMO (ADKAR, Kotter, ACMP).' },
  { termo: 'Modo de atuação', def: 'Intensidade da atuação Obliant no PM&GO: Suporte → Controle → Diretivo.' },
  { termo: 'Framework', def: 'Primeira camada de cada produto: objetivo, escopo, pilares e entregáveis.' },
  { termo: 'Roadmap', def: 'Segunda camada: iniciativas organizadas por nível de maturidade — jornada de evolução.' },
  { termo: 'Fit', def: 'Adequação: o assessment do PM&GO mede necessidade de entrega × necessidade de adoção.' },
];

module.exports = {
  COLORS, FONTS, WORDMARK,
  MATURITY_LEVELS, MATURITY_THRESHOLDS,
  HOWTO_BLOCKS, MODOS_ATUACAO,
  PRODUCTS, GLOSSARIO,
};
