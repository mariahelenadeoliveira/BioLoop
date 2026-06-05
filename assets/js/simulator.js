// ============================================================
//  BIOLOOP — Simulador de Bioenergia Pecuária
//  Concurso Agrinho 2026 | Programação Front-End
//
//  Valores baseados em dados científicos verificados.
//  Fontes completas no README.md e nos tooltips da interface.
// ============================================================

// ─────────────────────────────────────────────────────────────
//  CONSTANTES CIENTÍFICAS
// ─────────────────────────────────────────────────────────────

// Dejetos coletáveis por manejo (kg/cabeça/dia)
// Fonte: Embrapa Gado de Corte, Embrapa Gado de Leite, FAO (2013)
const DEJETO_POR_TIPO = {
  confinado:     12,
  semiconfinado:  7,
  pasto:          4,
};

// Biogás e composição
// Fonte: PROBIOGÁS / MMA-GIZ (2015); Embrapa Suínos e Aves
const BIOGAS_POR_KG = 0.045; // m³ de biogás por kg de dejeto fresco
const TEOR_METANO   = 0.60;  // 60% de CH₄ na composição do biogás bovino

// Geração de energia elétrica
// Fonte: IEA / EPE; ANEEL
const PCI_METANO = 9.97; // Poder Calorífico Inferior do CH₄ (kWh/m³)
const EF_GERADOR = 0.33; // Eficiência típica de motor-gerador a biogás (33%)

// Emissões evitadas
// Fonte: NIST Chemistry WebBook + IPCC AR6 (2021), Tab. 7.SM.7
const MASSA_METANO = 0.716; // kg/m³ (15°C, 1 atm)
const GWP_METANO   = 27.9;  // Global Warming Potential do CH₄ em 100 anos

// Fertilizante NPK equivalente
// Fonte: CQFS-RS/SC (2016); IAC — Circular 100
const NPK_POR_KG = 0.004; // kg de NPK por kg de dejeto processado

// Consumo residencial médio
// Fonte: ANEEL (2023)
const KWH_RESIDENCIA_DIA = 5; // 150 kWh/mês ÷ 30 dias ≈ 5 kWh/dia

// ─────────────────────────────────────────────────────────────
//  BENCHMARK — escala das barras de progresso
//  Referência: 500 cabeças em confinamento total
// ─────────────────────────────────────────────────────────────
const BENCH = (() => {
  const dejeto  = 500 * DEJETO_POR_TIPO.confinado;
  const metano  = dejeto * BIOGAS_POR_KG * TEOR_METANO;
  const energia = metano * PCI_METANO * EF_GERADOR;
  const npk     = dejeto * NPK_POR_KG;
  const co2     = metano * MASSA_METANO * GWP_METANO;
  return { dejeto, metano, energia, npk, co2 };
})();

// ─────────────────────────────────────────────────────────────
//  ESTADO DO SIMULADOR
// ─────────────────────────────────────────────────────────────

let ultimosResultados = null;
let periodoAtual = 'dia';
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─────────────────────────────────────────────────────────────
//  FUNÇÕES DE CÁLCULO
// ─────────────────────────────────────────────────────────────

function calcular(cabecas, tipo) {
  const dejeto  = cabecas * DEJETO_POR_TIPO[tipo];
  const biogas  = dejeto * BIOGAS_POR_KG;
  const metano  = biogas * TEOR_METANO;
  const energia = metano * PCI_METANO * EF_GERADOR;
  const co2eq   = metano * MASSA_METANO * GWP_METANO;
  const npk     = dejeto * NPK_POR_KG;
  const casas   = energia / KWH_RESIDENCIA_DIA;
  return { dejeto, metano, energia, co2eq, npk, casas };
}

function pct(valor, bench) {
  return Math.min((valor / bench) * 100, 100).toFixed(1);
}

function fmt(n, dec = 1) {
  return n.toLocaleString('pt-BR', { maximumFractionDigits: dec });
}

// ─────────────────────────────────────────────────────────────
//  ANIMAÇÃO DE CONTADOR (ease-out cúbico)
// ─────────────────────────────────────────────────────────────

function animarValor(el, valorFinal, formataFn, duracao = 850) {
  if (prefersReducedMotion || valorFinal === 0) {
    el.textContent = formataFn(valorFinal);
    return;
  }
  const inicio = Date.now();
  const frame = () => {
    const t    = Math.min((Date.now() - inicio) / duracao, 1);
    const prog = 1 - Math.pow(1 - t, 3); // ease-out cúbico
    el.textContent = formataFn(valorFinal * prog);
    if (t < 1) requestAnimationFrame(frame);
    else el.textContent = formataFn(valorFinal);
  };
  requestAnimationFrame(frame);
}

// ─────────────────────────────────────────────────────────────
//  ATUALIZAÇÃO DO DOM — BARRAS DE PROGRESSO
//  (chamada apenas no clique de simular)
// ─────────────────────────────────────────────────────────────

function atualizarBarras(res) {
  const barMethane = document.getElementById('bar-methane');
  barMethane.style.width = pct(res.metano, BENCH.metano) + '%';
  barMethane.parentElement.setAttribute('aria-valuenow', Math.round(pct(res.metano, BENCH.metano)));

  const barEnergy = document.getElementById('bar-energy');
  barEnergy.style.width = pct(res.energia, BENCH.energia) + '%';
  barEnergy.parentElement.setAttribute('aria-valuenow', Math.round(pct(res.energia, BENCH.energia)));

  const barNpk = document.getElementById('bar-npk');
  barNpk.style.width = pct(res.npk, BENCH.npk) + '%';
  barNpk.parentElement.setAttribute('aria-valuenow', Math.round(pct(res.npk, BENCH.npk)));

  const barCo2 = document.getElementById('bar-co2');
  barCo2.style.width = pct(res.co2eq, BENCH.co2) + '%';
  barCo2.parentElement.setAttribute('aria-valuenow', Math.round(pct(res.co2eq, BENCH.co2)));
}

// ─────────────────────────────────────────────────────────────
//  ATUALIZAÇÃO DO DOM — VALORES NUMÉRICOS
//  animar = true → contador animado; false → valor direto
// ─────────────────────────────────────────────────────────────

function exibirNumericos(res, periodo, animar) {
  const mult = periodo === 'ano' ? 365 : 1;
  const suf  = periodo === 'ano' ? 'ano' : 'dia';

  const set = animar
    ? (el, val, fn) => animarValor(el, val, fn)
    : (el, val, fn) => { el.textContent = fn(val); };

  // Dejetos
  set(
    document.getElementById('val-waste'),
    res.dejeto * mult,
    (v) => {
      if (periodo === 'ano' && v >= 1000) return fmt(v / 1000, 1) + ' t/ano';
      return fmt(v) + ' kg/' + suf;
    }
  );

  // Metano
  set(
    document.getElementById('txt-methane'),
    res.metano * mult,
    (v) => fmt(v, periodo === 'ano' ? 0 : 1) + ' m³/' + suf
  );

  // Energia
  set(
    document.getElementById('txt-energy'),
    res.energia * mult,
    (v) => fmt(v, periodo === 'ano' ? 0 : 1) + ' kWh/' + suf
  );

  // NPK
  set(
    document.getElementById('txt-npk'),
    res.npk * mult,
    (v) => {
      if (periodo === 'ano' && v >= 1000) return fmt(v / 1000, 2) + ' t/ano';
      return fmt(v, 2) + ' kg/' + suf;
    }
  );

  // CO₂ (co2eq está em kg, exibe em toneladas)
  set(
    document.getElementById('txt-co2'),
    (res.co2eq * mult) / 1000,
    (v) => fmt(v, periodo === 'ano' ? 2 : 3) + ' t CO₂eq/' + suf
  );

  // Residências (taxa contínua — o número não muda com o período)
  set(
    document.getElementById('txt-casas'),
    res.casas,
    (v) => Math.floor(v) + ' residências'
  );
}

// ─────────────────────────────────────────────────────────────
//  TOGGLE DE PERÍODO (/ Dia  |  / Ano)
// ─────────────────────────────────────────────────────────────

document.querySelectorAll('.period-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const periodo = this.dataset.period;
    if (periodo === periodoAtual || !ultimosResultados) return;

    periodoAtual = periodo;

    document.querySelectorAll('.period-btn').forEach(b => {
      b.classList.toggle('period-btn--active', b.dataset.period === periodo);
    });

    exibirNumericos(ultimosResultados, periodoAtual, false);
  });
});

// ─────────────────────────────────────────────────────────────
//  EVENTO: BOTÃO SIMULAR
// ─────────────────────────────────────────────────────────────

document.getElementById('btn-simulate').addEventListener('click', function () {
  const inputCabecas = document.getElementById('cattle-count');
  const inputTipo    = document.getElementById('management-type');
  const cabecas      = parseInt(inputCabecas.value, 10);

  inputCabecas.classList.remove('error', 'success');

  if (!cabecas || cabecas <= 0 || cabecas > 100000) {
    inputCabecas.classList.add('error');
    inputCabecas.focus();
    inputCabecas.setAttribute('aria-invalid', 'true');
    return;
  }

  inputCabecas.classList.add('success');
  inputCabecas.setAttribute('aria-invalid', 'false');

  const res = calcular(cabecas, inputTipo.value);
  ultimosResultados = res;

  // Reseta para diário a cada nova simulação
  periodoAtual = 'dia';
  document.querySelectorAll('.period-btn').forEach(b => {
    b.classList.toggle('period-btn--active', b.dataset.period === 'dia');
  });

  atualizarBarras(res);
  exibirNumericos(res, 'dia', true);

  // Exibe o toggle de período após a primeira simulação
  const toggle = document.getElementById('period-toggle');
  if (toggle) toggle.hidden = false;
});

// Limpa erro ao redigitar
document.getElementById('cattle-count').addEventListener('input', function () {
  this.classList.remove('error', 'success');
  this.setAttribute('aria-invalid', 'false');
});

// Simula ao pressionar Enter no campo de número
document.getElementById('cattle-count').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') document.getElementById('btn-simulate').click();
});
