# BioLoop — Painel de Transição Energética

**Concurso Agrinho 2026 | Categoria: Programação Front-End**  
Tema: _"Agro forte, futuro sustentável: equilíbrio entre produção e meio ambiente"_

> Desenvolvido com HTML, CSS e JavaScript puro — sem bibliotecas, frameworks ou dependências externas.

🌐 **Site publicado:** [mariahelenadeoliveira.github.io/BioLoop](https://mariahelenadeoliveira.github.io/BioLoop/)

**Autora:** Maria Helena de Oliveira Ferreira  
**Instituição:** SENAR-PR / Secretaria de Estado da Educação do Paraná

---

## Sobre o Projeto

O **BioLoop** é um site educacional interativo que mostra como os dejetos produzidos pelo gado bovino — hoje um dos maiores passivos ambientais da pecuária — podem ser convertidos em energia elétrica limpa e adubo natural através de biodigestores.

O nome **BioLoop** representa o ciclo fechado (_loop_) de base biológica (_bio_): o resíduo que seria descartado volta ao sistema como recurso de valor, sem desperdício e sem poluição. A palavra _loop_ também conecta o tema do campo ao universo da programação front-end.

---

## O Problema Abordado

A pecuária brasileira possui mais de 200 milhões de cabeças de gado — o maior rebanho comercial do mundo. Cada animal produz entre 10 e 15 kg de dejetos por dia. Quando descartados de forma incorreta a céu aberto, esses dejetos liberam **gás metano (CH₄)** na atmosfera — um gás de efeito estufa com poder de aquecimento global **27,9 vezes maior que o CO₂** (IPCC AR6, 2021). Além disso, contaminam rios, nascentes e lençóis freáticos.

Esse problema é real, mensurável e tem solução tecnológica já disponível. O BioLoop apresenta essa solução de forma visual e interativa.

---

## O Que o Visitante Aprende

Ao acessar o BioLoop, o usuário compreende:

- Por que o metano liberado pelo gado é mais perigoso para o clima do que o CO₂;
- Como funciona um biodigestor e a logística de coleta vedada de dejetos;
- Quantos metros cúbicos de metano uma propriedade pode capturar por dia;
- Quanta energia elétrica esse metano pode gerar e quantas residências abastece;
- Quantas toneladas de CO₂ equivalente são evitadas ao processar os dejetos;
- Quanto fertilizante NPK químico importado pode ser substituído pelo biofertilizante (digestato) gerado.

---

## Público-Alvo

O site foi pensado para três grupos principais:

- **Estudantes do Ensino Fundamental e Médio** — aprender sobre sustentabilidade e energia de forma visual e prática, sem conhecimento técnico prévio;
- **Produtores rurais e agricultores** — simular o potencial energético da própria propriedade e entender o retorno ambiental e econômico de um biodigestor;
- **Professores e comunidade escolar** — utilizar o site como ferramenta de apoio em aulas sobre meio ambiente, agropecuária e energias renováveis.

---

## Funcionalidade Principal — O Simulador

O simulador interativo é a peça central do projeto. O usuário informa:

1. O **tamanho do rebanho** (número de cabeças de gado, entre 1 e 100.000);
2. O **tipo de manejo** praticado na propriedade, selecionado em um dropdown acessível com ícones:
   - Totalmente Confinado — 12 kg/cabeça/dia
   - Semi-confinado — 7 kg/cabeça/dia
   - Extensivo / Pasto Livre — 4 kg/cabeça/dia

Ao clicar em **"Processar Ciclo Energético"**, o JavaScript valida os dados, executa os cálculos com constantes científicas reais e exibe os resultados com barras de progresso animadas:

| Indicador               | O que representa                                                      |
| ----------------------- | --------------------------------------------------------------------- |
| Dejetos Processados     | Total de resíduo coletável por dia (kg/dia)                           |
| Metano Retido           | Volume de CH₄ capturado antes de chegar à atmosfera (m³/dia)          |
| Energia Elétrica Gerada | Quantidade de kWh gerados com o metano (kWh/dia)                      |
| CO₂ Equivalente Evitado | Emissões de gases de efeito estufa evitadas (t CO₂eq/dia)             |
| Substituição de NPK     | Fertilizante mineral que pode ser substituído pelo digestato (kg/dia) |
| Residências Abastecidas | Equivalência em casas alimentadas pela energia gerada                 |

Cada métrica conta com um botão de informação (ícone ?) que exibe uma explicação contextual sobre o que aquele dado significa, tornando o simulador acessível a qualquer perfil de usuário.

---

## Estrutura do Site

| Seção           | Conteúdo                                                                              |
| --------------- | ------------------------------------------------------------------------------------- |
| **Hero**        | Título, frase de impacto e acesso direto ao simulador                                 |
| **O Problema**  | Cards comparando o cenário tradicional (emissão de metano) com a solução BioLoop      |
| **A Logística** | Fluxo visual em 3 etapas: Coleta Vedada → Central de Biodigestão → Geração de Valor   |
| **Simulador**   | Painel interativo com formulário de entrada e métricas de impacto com barras animadas |
| **Glossário**   | Definições dos termos técnicos usados no site, com filtros por categoria               |
| **Fontes**      | Links diretos para pesquisas científicas oficiais que embasam o simulador             |
| **Rodapé**      | Identificação do projeto e créditos do Concurso Agrinho 2026                          |

---

## Acessibilidade

O site implementa quatro recursos de acessibilidade, todos controlados por JavaScript e persistidos via `sessionStorage`:

| Recurso              | Funcionamento                                                                                    |
| -------------------- | ------------------------------------------------------------------------------------------------ |
| **Alto Contraste**   | Altera toda a paleta para preto, branco e amarelo — facilita leitura para pessoas com baixa visão |
| **Modo Daltônico**   | Aplica a paleta de Wong (2011) publicada na _Nature Methods_ — distinguível para deuteranopia e protanopia |
| **Aumentar fonte (A+)** | Aumenta o tamanho base do texto progressivamente (máx. 26px)                               |
| **Diminuir fonte (A−)** | Reduz o tamanho base do texto (mín. 12px)                                                   |

**Paleta daltônica (Wong 2011):** ciano → azul-céu `#56B4E9`, verde → azul-royal `#0072B2`, laranja → âmbar `#E69F00`, vermelho → vermelhão `#D55E00`. As preferências de alto contraste e modo daltônico podem ser usadas simultaneamente.

O site também suporta **tema claro e escuro** (alternável manualmente ou herdado do sistema), animações desativadas para usuários com `prefers-reduced-motion` e navegação completa por teclado, incluindo o dropdown de tipo de manejo.

---

## Identidade Visual

A paleta de cores foi escolhida para transmitir **tecnologia com responsabilidade ambiental** — visual de painel de dados, sério e técnico, mas conectado à natureza:

| Cor         | Token CSS    | Código    | Uso                                              |
| ----------- | ------------ | --------- | ------------------------------------------------ |
| Ciano       | `--cyan`     | `#00d4ff` | Tecnologia, dados, inovação — logo "Bio", metano |
| Verde       | `--green`    | `#00e87a` | Sustentabilidade, soluções, resultados positivos |
| Laranja     | `--orange`   | `#ff8c42` | Métricas secundárias — NPK, fertilizantes        |
| Vermelho    | `--red`      | `#ff4d6d` | Alerta ambiental — CO₂, cenário problemático     |
| Fundo dark  | `--bg`       | `#0d0f12` | Base do tema escuro (padrão)                     |
| Fundo light | — | `#f4f7fb` | Base do tema claro                               |

As cores são definidas como CSS custom properties no `:root`, garantindo que o modo daltônico, alto contraste e tema claro/escuro se propaguem automaticamente por toda a interface.

---

## Tecnologias Utilizadas

- **HTML5** — estrutura semântica com `<header>`, `<nav>`, `<section>`, `<article>`, `<footer>` e atributos ARIA para acessibilidade
- **CSS3** — design tokens com custom properties, glassmorphism, animações, scroll reveal, responsividade mobile-first e todos os modos de acessibilidade
- **JavaScript (ES6+)** — simulador científico, acessibilidade, dropdown acessível customizado, tooltips, scroll spy e splash screen

Nenhuma biblioteca, framework ou dependência externa foi utilizada, conforme as regras do Concurso Agrinho 2026.

---

## Estrutura de Arquivos

```
BioLoop/
├── index.html                  → Estrutura e conteúdo semântico da aplicação
├── assets/
│   ├── css/
│   │   ├── main.css            → Design system completo (tokens, tema, layout, componentes)
│   │   └── accessibility.css  → Paleta daltônica de Wong (2011) via CSS custom properties
│   └── js/
│       ├── splash.js           → Animação de entrada da aplicação
│       ├── simulator.js        → Lógica do simulador com constantes científicas reais
│       └── ui.js               → Nav mobile, tooltips, dropdown, tema e filtros
├── docs/
│   ├── planejamento_agrinho_2026.md  → Planejamento completo do projeto
│   └── trabalho_escolar.txt          → Enunciado e critérios do concurso
└── README.md                   → Este arquivo
```

---

## Base Científica dos Cálculos

Todos os valores numéricos do simulador são embasados em referências técnicas verificáveis, documentadas também na seção **Fontes** do próprio site:

| Dado                                   | Valor            | Fonte                      |
| -------------------------------------- | ---------------- | -------------------------- |
| Produção de dejetos (confinado)        | 12 kg/cabeça/dia | Embrapa Gado de Corte      |
| Produção de dejetos (semi-confinado)   | 7 kg/cabeça/dia  | Embrapa Gado de Leite      |
| Produção de dejetos (pasto, coletável) | 4 kg/cabeça/dia  | FAO (2013)                 |
| Biogás produzido por kg de dejeto      | 0,045 m³/kg      | PROBIOGÁS / MMA-GIZ (2015) |
| Teor de metano no biogás bovino        | 60%              | Embrapa Suínos e Aves      |
| Poder calorífico inferior do CH₄       | 9,97 kWh/m³      | IEA / EPE                  |
| Eficiência do motor-gerador a biogás   | 33%              | ANEEL                      |
| Massa específica do metano             | 0,716 kg/m³      | NIST Chemistry WebBook     |
| GWP do CH₄ (100 anos)                  | 27,9 × CO₂       | IPCC AR6 (2021)            |
| Equivalência NPK do digestato          | 4 kg/tonelada    | CQFS-RS/SC (2016) / IAC    |
| Consumo médio residencial              | 150 kWh/mês      | ANEEL (2023)               |

---

## Como Acessar

O projeto está publicado em:  
**GitHub Pages:** `[link a ser inserido após publicação]`

Para rodar localmente:
```bash
npx serve -p 3000 .
```

---

## Resumo para o Avaliador

O **BioLoop** é um site educacional interativo desenvolvido integralmente em HTML, CSS e JavaScript para o Concurso Agrinho 2026. O projeto aborda o problema da emissão de metano gerada pelos dejetos bovinos na pecuária brasileira — um gás com poder de aquecimento global 27,9 vezes maior que o CO₂ (IPCC AR6, 2021) — e apresenta como solução a biodigestão anaeróbica.

O visitante aprende sobre o problema ambiental, entende a logística de coleta e conversão dos dejetos e, através do simulador interativo, visualiza em dados concretos o impacto energético e ambiental que uma propriedade rural pode gerar. Todos os cálculos utilizam constantes científicas reais de Embrapa, IPCC, PROBIOGÁS e ANEEL. A seção de fontes oferece acesso direto às pesquisas científicas originais, reforçando a credibilidade dos dados apresentados.

O site conta com quatro recursos de acessibilidade (alto contraste, modo daltônico baseado na paleta de Wong 2011, A+ e A−), tema claro e escuro, responsividade completa para dispositivos móveis e navegação por teclado. Nenhuma biblioteca ou framework externo foi utilizado.

O projeto se relaciona diretamente com o tema _"Agro forte, futuro sustentável"_ ao mostrar que o próprio campo tem em mãos a tecnologia para transformar seu maior passivo ambiental em seu maior ativo energético. O BioLoop não trata a pecuária como vilã do meio ambiente — mas como protagonista da transição energética brasileira.

---

_Concurso Agrinho 2026 — SENAR-PR / Secretaria de Estado da Educação do Paraná._
