// ============================================================
//  BIOLOOP — Quiz de Conhecimentos
//  Seção "O Problema" — 4 perguntas sobre bioenergia pecuária
// ============================================================

(function () {
  'use strict';

  const PERGUNTAS = [
    {
      texto: 'O gás metano (CH₄) é quantas vezes mais potente que o CO₂ como gás de efeito estufa, segundo o IPCC AR6 (2021)?',
      opcoes: ['2,7 vezes', '12 vezes', '27,9 vezes', '100 vezes'],
      correta: 2,
      explicacao: 'O GWP (Potencial de Aquecimento Global) do metano é <strong>27,9 × o do CO₂</strong> em 100 anos (IPCC AR6, 2021). Por isso capturar o metano bovino tem impacto climático muito maior do que reduzir emissões de CO₂ comum.'
    },
    {
      texto: 'Quantos kg de dejetos um bovino totalmente confinado produz por dia, em média?',
      opcoes: ['4 kg', '7 kg', '10 kg', '12 kg'],
      correta: 3,
      explicacao: 'Em confinamento total, cada bovino produz cerca de <strong>12 kg/dia</strong> de dejetos coletáveis (Embrapa Gado de Corte). Em semi-confinado são 7 kg/dia; em pasto livre, apenas 4 kg/dia podem ser coletados.'
    },
    {
      texto: 'O que é um biodigestor?',
      opcoes: [
        'Uma usina de energia solar adaptada ao campo',
        'Um tanque vedado que processa dejetos sem oxigênio, gerando biogás',
        'Um sistema de irrigação inteligente com sensores',
        'Um fertilizante químico de liberação lenta'
      ],
      correta: 1,
      explicacao: 'Um biodigestor é um <strong>recipiente hermético</strong> onde bactérias decompõem matéria orgânica sem oxigênio (digestão anaeróbica). Os produtos são o biogás (rico em CH₄) e o digestato (biofertilizante natural).'
    },
    {
      texto: 'O digestato, resíduo final da biodigestão, é usado principalmente como:',
      opcoes: [
        'Combustível alternativo ao GLP doméstico',
        'Gás injetado na rede de distribuição de gás natural',
        'Biofertilizante natural rico em NPK (Nitrogênio, Fósforo, Potássio)',
        'Aditivo para purificação do biogás'
      ],
      correta: 2,
      explicacao: 'O digestato é rico em <strong>N, P e K</strong> — os três nutrientes do fertilizante NPK mineral. Aplicado no solo, substitui adubos químicos importados, reduzindo custos e dependência do mercado externo.'
    }
  ];

  const container = document.getElementById('quiz-container');
  if (!container) return;

  let atual     = 0;
  let acertos   = 0;
  let respondida = false;

  const LETRAS = 'ABCD';

  // SVG reutilizáveis
  const SVG_CHECK  = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>';
  const SVG_X      = '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>';
  const SVG_ARROW  = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>';
  const SVG_BOLT   = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>';
  const SVG_RETRY  = '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.51"/></svg>';

  function renderPergunta() {
    respondida = false;
    const q     = PERGUNTAS[atual];
    const total = PERGUNTAS.length;

    const pips = Array.from({ length: total }, (_, i) => {
      const cls = i < atual ? 'quiz-pip quiz-pip--done'
                : i === atual ? 'quiz-pip quiz-pip--active'
                : 'quiz-pip';
      return `<span class="${cls}"></span>`;
    }).join('');

    const opcoesMarcacao = q.opcoes.map((op, i) => `
      <li>
        <button class="quiz-opt" data-idx="${i}" type="button"
                aria-label="Opção ${LETRAS[i]}: ${op}">
          <span class="quiz-opt__letter" aria-hidden="true">${LETRAS[i]}</span>
          <span class="quiz-opt__text">${op}</span>
        </button>
      </li>
    `).join('');

    const ehUltima = atual === total - 1;

    container.innerHTML = `
      <div class="quiz-card" role="group" aria-label="Pergunta ${atual + 1} de ${total}">
        <div class="quiz-header">
          <span class="quiz-tag">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                 stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="12" cy="12" r="10"/>
              <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            Teste seus Conhecimentos
          </span>
          <div class="quiz-progress" aria-label="${atual + 1} de ${total} perguntas">${pips}</div>
        </div>

        <p class="quiz-question">${q.texto}</p>

        <ul class="quiz-options" role="list">${opcoesMarcacao}</ul>

        <div class="quiz-feedback" id="quiz-feedback" hidden></div>

        <div class="quiz-nav" id="quiz-nav" hidden>
          <button class="btn ${ehUltima ? 'btn--accent' : 'btn--ghost'} quiz-btn-next"
                  id="btn-quiz-next" type="button">
            ${ehUltima ? `Ver resultado ${SVG_BOLT}` : `Próxima ${SVG_ARROW}`}
          </button>
        </div>
      </div>
    `;

    container.querySelectorAll('.quiz-opt').forEach(btn => {
      btn.addEventListener('click', () => responder(parseInt(btn.dataset.idx)));
    });

    document.getElementById('btn-quiz-next').addEventListener('click', () => {
      if (!respondida) return;
      atual++;
      if (atual < PERGUNTAS.length) renderPergunta();
      else renderResultado();
    });
  }

  function responder(idx) {
    if (respondida) return;
    respondida = true;

    const q       = PERGUNTAS[atual];
    const correto = idx === q.correta;
    if (correto) acertos++;

    // Move o foco para o botão "Próxima" ANTES de desabilitar as opções.
    // Se desabilitarmos primeiro, o browser transfere o foco automaticamente
    // para o próximo elemento focável do DOM (que fica no simulador),
    // causando um scroll indesejado para fora do quiz.
    document.getElementById('quiz-nav').hidden = false;
    document.getElementById('btn-quiz-next').focus({ preventScroll: true });

    // Agora é seguro desabilitar e marcar as opções
    container.querySelectorAll('.quiz-opt').forEach((btn, i) => {
      btn.disabled = true;
      if (i === q.correta) btn.classList.add('quiz-opt--correct');
      if (i === idx && !correto) btn.classList.add('quiz-opt--wrong');
    });

    const feedback = document.getElementById('quiz-feedback');
    feedback.hidden = false;
    feedback.className = `quiz-feedback ${correto ? 'quiz-feedback--correct' : 'quiz-feedback--wrong'}`;
    feedback.innerHTML = `
      ${correto ? SVG_CHECK : SVG_X}
      <span><strong>${correto ? 'Correto!' : 'Quase!'}</strong> ${q.explicacao}</span>
    `;
  }

  function renderResultado() {
    const total   = PERGUNTAS.length;
    const porCent = Math.round((acertos / total) * 100);

    let mensagem, classe;
    if (acertos === total) {
      mensagem = 'Perfeito! Você já é um expert em bioenergia. Agora use o simulador para ver esses conceitos em números reais!';
      classe   = 'quiz-result--perfect';
    } else if (acertos >= Math.ceil(total / 2)) {
      mensagem = 'Bom trabalho! Você entendeu o essencial. Use o simulador para ver esses dados na prática.';
      classe   = 'quiz-result--good';
    } else {
      mensagem = 'Não desanime! Leia as seções A Logística e o Glossário — depois tente novamente.';
      classe   = 'quiz-result--low';
    }

    container.innerHTML = `
      <div class="quiz-card quiz-result ${classe}" aria-label="Resultado do quiz: ${acertos} de ${total} acertos">
        <div class="quiz-result__score">
          <span class="quiz-result__num">${acertos}</span>
          <span class="quiz-result__den">/${total}</span>
        </div>
        <p class="quiz-result__pct">${porCent}% de acerto</p>
        <p class="quiz-result__msg">${mensagem}</p>
        <div class="quiz-result__btns">
          <a href="#simulador" class="btn btn--accent">
            ${SVG_BOLT} Abrir Simulador
          </a>
          <button type="button" class="btn btn--ghost" id="btn-quiz-retry">
            ${SVG_RETRY} Tentar novamente
          </button>
        </div>
      </div>
    `;

    document.getElementById('btn-quiz-retry').addEventListener('click', () => {
      atual   = 0;
      acertos = 0;
      renderPergunta();
    });
  }

  // Inicia o quiz
  renderPergunta();
})();
