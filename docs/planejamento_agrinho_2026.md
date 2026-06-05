# Planejamento do Projeto Agrinho 2026

**Concurso de Programação Front-End**

**Tema Geral:** Agro forte, futuro sustentável: equilíbrio entre produção e meio ambiente

**Aluna:** Maria Helena de Oliveira Ferreira

---

## 1. Dando identidade ao seu projeto

> **Qual será o nome do seu site?**

**R:** BioLoop

---

> **Por que você escolheu esse nome? Explique o que ele representa e como se relaciona com seu projeto.**

**R:** Escolhi o nome BioLoop porque ele representa exatamente o que o projeto propõe: um ciclo fechado (loop) de base biológica (bio). O resíduo do gado — que hoje polui o ambiente — entra no sistema e sai transformado em energia elétrica e adubo natural, voltando ao campo como um recurso de valor. A palavra "loop" também remete à tecnologia e à programação, conectando o tema do campo com o tema do concurso de programação front-end.

---

## 2. Escolhendo um problema para investigar

> **Qual problema relacionado à agricultura e ao meio ambiente você deseja abordar?**

**R:** Emissão de gases de efeito estufa pela pecuária bovina e o aproveitamento dos dejetos do gado como fonte de energia limpa através da biodigestão.

---

> **Por que esse tema é importante para a sociedade?**

**R:** O Brasil possui o maior rebanho bovino comercial do mundo, com mais de 200 milhões de cabeças de gado. Cada animal produz entre 10 e 15 kg de dejetos por dia. Quando esses resíduos são descartados incorretamente a céu aberto, liberam gás metano (CH₄) na atmosfera — um gás de efeito estufa com poder de aquecimento global 27,9 vezes maior do que o CO₂, segundo o IPCC (2021). Além disso, os dejetos contaminam rios, nascentes e lençóis freáticos.

O tema é urgente porque une dois problemas: a crise climática e a dependência de fertilizantes químicos importados. A biodigestão resolve os dois ao mesmo tempo: captura o metano antes que ele chegue à atmosfera e transforma o resíduo em biofertilizante natural. É uma solução que o próprio campo já tem ao alcance, mas que ainda é pouco conhecida.

---

## 3. O que você deseja ensinar ao visitante?

> **O que o visitante deverá aprender após utilizar seu site?**

**R:** Após utilizar o BioLoop, o visitante vai aprender:

- Que o metano liberado pelos dejetos do gado é mais prejudicial ao clima do que o CO₂ comum;
- Como funciona um biodigestor: um equipamento que processa os resíduos de forma fechada, sem deixar o gás escapar;
- Como a logística de coleta vedada funciona, desde os caminhões-tanque até a usina de biodigestão;
- Quantos metros cúbicos de metano uma propriedade pode capturar por dia, dependendo do tamanho do rebanho e do tipo de manejo;
- Quanta energia elétrica esse metano pode gerar e quantas residências podem ser abastecidas;
- Quantas toneladas de CO₂ equivalente são evitadas ao processar os dejetos;
- Quanto fertilizante NPK químico importado pode ser substituído pelo biofertilizante natural gerado no processo.

---

## 4. Quem utilizará seu site?

> **Quem é o público-alvo do seu projeto?**

**R:** O site foi pensado para três grupos principais:

- **Estudantes do Ensino Fundamental e Médio:** que podem usar o simulador para aprender sobre sustentabilidade e energia de forma prática e visual, sem precisar de conhecimento técnico prévio;
- **Produtores rurais e agricultores:** que podem simular o potencial energético da sua própria propriedade e entender o retorno econômico e ambiental de investir em um biodigestor;
- **Professores e comunidade escolar:** que podem usar o site como ferramenta de apoio em aulas sobre meio ambiente, agropecuária e energias renováveis.

---

> **Como seu site poderá ajudar esse público?**

**R:** Para os estudantes, o site transforma um assunto complexo — química do metano, eficiência energética, fertilizantes — em algo visual e interativo, com barras animadas e números reais. Para os produtores rurais, o simulador funciona como uma calculadora de viabilidade que mostra, em dados concretos, o que o resíduo do próprio rebanho deles pode gerar. Para os professores, o site oferece um exemplo real de tecnologia sustentável aplicada ao campo brasileiro.

---

## 5. Funcionalidade Principal

> **O que o usuário poderá fazer no seu site?**

**R:** Um simulador de bioenergia pecuária: o usuário informa o tamanho do rebanho e o tipo de manejo praticado na propriedade, e o JavaScript calcula em tempo real o potencial de conversão de dejetos em energia e biofertilizante.

---

> **Explique passo a passo como ela funcionará.**

**R:**

1. O usuário acessa a seção "Simulador" da página.
2. Preenche o campo "Tamanho do Rebanho" com o número de cabeças de gado da propriedade.
3. Seleciona o tipo de manejo praticado: Totalmente Confinado, Semi-confinado ou Extensivo (Pasto Livre). Cada tipo tem uma quantidade diferente de dejetos coletáveis por dia (12 kg, 7 kg ou 4 kg por cabeça, respectivamente), baseada em dados da Embrapa e da FAO.
4. Clica no botão "Processar Ciclo Energético".
5. O JavaScript valida os dados informados. Se algo estiver errado (número negativo ou vazio), o campo fica destacado em vermelho e o usuário é avisado.
6. Com os dados válidos, o código realiza os cálculos usando fórmulas científicas reais: quantidade de dejetos × taxa de biogás × teor de metano × eficiência do gerador, entre outras.
7. Os resultados aparecem no painel da direita com barras de progresso animadas, mostrando: dejetos processados por dia, metano retido (m³), energia elétrica gerada (kWh), CO₂ equivalente evitado (toneladas), substituição de NPK químico (kg) e número de residências que poderiam ser abastecidas.

---

## 6. Planejando a estrutura do site

> **Quais seções existirão?**

**R:**

1. Cabeçalho com logo e menu de navegação (links para cada seção)
2. Barra de acessibilidade (Alto Contraste, Modo Daltônico, A+, A−)
3. Seção Hero: título do projeto, frase de impacto e botão de acesso ao simulador
4. Seção "O Problema": dois cards comparando o cenário tradicional (emissão de metano) com a solução BioLoop (biodigestão)
5. Seção "A Logística": fluxo visual em 3 etapas — Coleta Vedada → Central de Biodigestão → Geração de Valor
6. Seção "Simulador": painel interativo com formulário de entrada e painel de resultados com barras de progresso
7. Rodapé com identificação do projeto e créditos

---

## 7. Acessibilidade

> **Quais recursos de acessibilidade você pretende implementar?**

**R:**

- **Alto Contraste:** um botão na barra superior altera toda a paleta de cores do site para preto, branco e amarelo, facilitando a leitura para pessoas com baixa visão ou sensibilidade à luz;
- **Modo Daltônico:** um botão exclusivo substitui as cores das barras de progresso e dos elementos visuais por uma paleta cientificamente validada para pessoas com deuteranopia e protanopia (os tipos mais comuns de daltonismo vermelho-verde). A paleta utilizada é a de Wong (2011), publicada na revista _Nature Methods_, e substitui o verde por azul-royal (`#0072B2`), o vermelho por vermelhão (`#D55E00`), o laranja por âmbar (`#E69F00`) e o ciano por azul-céu (`#56B4E9`) — cores distinguíveis por praticamente todos os tipos de visão;
- **Aumentar fonte (A+):** botão que aumenta progressivamente o tamanho de todo o texto da página, com limite máximo de 26px;
- **Diminuir fonte (A−):** botão que reduz o tamanho do texto, com limite mínimo de 12px para não comprometer a legibilidade.

---

> **Como esses recursos ajudarão os usuários?**

**R:** O recurso de alto contraste é essencial para pessoas com deficiência visual ou sensibilidade à luz. O modo daltônico é especialmente importante para este projeto porque o simulador usa barras coloridas como principal indicador visual — sem ele, uma pessoa com daltonismo vermelho-verde não conseguiria distinguir a barra de energia (verde) da barra de CO₂ (vermelha). Os botões de ajuste de fonte permitem que crianças, idosos e pessoas com dificuldade de leitura adaptem o texto ao seu conforto. Todas as preferências são salvas durante a visita com `sessionStorage`, e os modos daltônico e alto contraste podem ser usados simultaneamente.

---

## 8. Aparência do Projeto

> **Que sensações você deseja transmitir visualmente?**

**R:** Quero que o site transmita ao mesmo tempo inovação tecnológica e responsabilidade ambiental. O visual precisa parecer sério e técnico (como um painel de dados real), mas também conectado à natureza e à sustentabilidade. Quero que o visitante sinta que está vendo algo moderno e confiável, não apenas um site decorativo.

---

> **Quais cores pretende utilizar? Explique sua escolha.**

**R:** Utilizarei cinco cores principais, cada uma com um propósito:

| Cor         | Código    | Uso                                                                                                   |
| ----------- | --------- | ----------------------------------------------------------------------------------------------------- |
| Verde       | `#2ecc71` | Representa a natureza, a solução e os resultados positivos — barras de energia e destaques de sucesso |
| Ciano       | `#00d2ff` | Representa tecnologia, dados e inovação — logo "Bio", detalhes técnicos e barra de metano             |
| Azul escuro | `#1e222b` | Transmite seriedade e confiança técnica — fundo do cabeçalho e rodapé                                 |
| Laranja     | `#e67e22` | Destaque para indicadores secundários como NPK e fertilizantes                                        |
| Vermelho    | `#e74c3c` | Alerta ambiental — representa o CO₂ e o cenário problemático                                          |

---

## 9. Produção Autoral

> **Quais conteúdos serão produzidos por você?**

**R:**

- Todos os textos explicativos do site (seção do problema, logística e rodapé), escritos e pesquisados por mim;
- O logotipo "BioLoop", criado com tipografia onde "Bio" aparece em ciano e "Loop" em verde, sem uso de imagens externas;
- O código HTML completo com a estrutura semântica da página;
- O arquivo CSS com toda a estilização, incluindo o modo de alto contraste, o modo daltônico e as animações das barras de progresso;
- O arquivo JavaScript com a lógica do simulador baseada em dados científicos reais pesquisados em fontes como Embrapa, IPCC e ANEEL;
- As tabelas comparativas do simulador e da logística.

---

## 10. Planejamento da Programação

> **Quais elementos HTML você acredita que serão necessários?**

**R:**

| Elemento                                    | Uso                                                         |
| ------------------------------------------- | ----------------------------------------------------------- |
| `<header>`                                  | Cabeçalho com logo e navegação                              |
| `<nav>`, `<ul>`, `<li>`, `<a>`              | Menu de links para cada seção                               |
| `<section>`                                 | Divisão semântica: hero, problema, logística, simulador     |
| `<form>`, `<input>`, `<select>`, `<option>` | Formulário do simulador                                     |
| `<button>`                                  | Botão de simulação e botões de acessibilidade               |
| `<div>`                                     | Painéis, cards, barras de progresso e contêineres de layout |
| `<footer>`                                  | Rodapé com créditos                                         |
| `<h1>`–`<h4>`, `<p>`, `<span>`, `<strong>`  | Hierarquia de textos e destaques                            |

---

> **Que interações serão programadas em JavaScript?**

**R:**

- **Simulador de bioenergia:** ao clicar no botão, o JS captura os valores do formulário, valida as entradas e executa os cálculos científicos, atualizando os textos e as barras de progresso animadas no painel de resultados;
- **Validação de formulário:** se o usuário digitar um número inválido (zero, negativo ou vazio), o campo fica destacado em vermelho e o foco é direcionado para ele;
- **Alto Contraste:** o botão adiciona ou remove a classe CSS `high-contrast` no body, alterando toda a paleta de cores da página instantaneamente;
- **Modo Daltônico:** o botão adiciona ou remove a classe CSS `colorblind-mode` no body, aplicando a paleta de Wong (2011) sobre os elementos visuais;
- **Ajuste de fonte (A+ e A−):** os botões aumentam ou diminuem o tamanho base da fonte do documento, com limites mínimo (12px) e máximo (26px);
- **Persistência de acessibilidade:** as preferências de alto contraste e modo daltônico são salvas com `sessionStorage` para não se perderem durante a navegação.

---

## 11. Resumo Final

> **Descreva seu projeto em um único texto para o avaliador do Concurso Agrinho.**

**R:** O BioLoop é um site interativo que aborda o problema da emissão de metano gerada pelos dejetos bovinos na pecuária brasileira. O Brasil possui o maior rebanho comercial do mundo, e os dejetos produzidos por esse gado — quando descartados incorretamente — liberam gás metano na atmosfera, um gás de efeito estufa 27,9 vezes mais potente do que o CO₂. Além disso, contaminam rios e lençóis freáticos.

O visitante vai aprender que esse problema tem solução tecnológica já disponível: os biodigestores, que processam os resíduos de forma fechada, capturam o metano e transformam o resíduo em biofertilizante natural. O site explica todo esse processo em três etapas visuais — coleta vedada, central de biodigestão e geração de valor — e apresenta um comparativo entre o cenário tradicional e a solução proposta.

A principal funcionalidade do site é um simulador interativo desenvolvido em JavaScript. O usuário informa o tamanho do rebanho e o tipo de manejo praticado, e o simulador calcula em tempo real: a quantidade de dejetos processados por dia, o volume de metano capturado, a energia elétrica que pode ser gerada, as toneladas de CO₂ equivalente evitadas, a quantidade de fertilizante NPK mineral que pode ser substituído e o número de residências que poderiam ser abastecidas com essa energia. Todos os cálculos são baseados em dados científicos reais de fontes como Embrapa, IPCC, PROBIOGÁS e ANEEL.

O projeto se relaciona diretamente com o tema do Concurso Agrinho 2026 — _"Agro forte, futuro sustentável"_ — ao mostrar que o próprio campo tem em mãos a tecnologia para transformar seu maior passivo ambiental em seu maior ativo energético. O BioLoop não enxerga a pecuária como vilã do meio ambiente, mas como protagonista da transição energética brasileira.

---

_Concurso Agrinho 2026 — SENAR-PR / Secretaria de Estado da Educação do Paraná_
