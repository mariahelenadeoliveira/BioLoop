// ============================================================
//  BIOLOOP — UI Controller
//  Gerencia: nav mobile, tooltips de info, acessibilidade,
//            tema, scroll reveal, active nav links
// ============================================================

(function () {
  'use strict';

  // ─────────────────────────────────────────────────────────
  //  NAV MOBILE (hamburger)
  // ─────────────────────────────────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const mainNav   = document.getElementById('main-nav');

  if (hamburger && mainNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = mainNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Fecha o menu ao clicar em um link
    mainNav.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Fecha ao clicar fora
    document.addEventListener('click', function (e) {
      if (!mainNav.contains(e.target) && !hamburger.contains(e.target)) {
        mainNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ─────────────────────────────────────────────────────────
  //  TOOLTIPS DE INFO (ícones ? nas métricas do simulador)
  // ─────────────────────────────────────────────────────────
  let activeTooltip = null;

  document.querySelectorAll('.info-btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const tooltipId = this.dataset.tooltipId;
      const tooltip   = document.getElementById(tooltipId);
      if (!tooltip) return;

      const isShowing = !tooltip.hidden;

      // Fecha tooltip aberto anteriormente
      if (activeTooltip && activeTooltip !== tooltip) {
        activeTooltip.hidden = true;
        activeTooltip.previousActiveBtn &&
          activeTooltip.previousActiveBtn.setAttribute('aria-expanded', 'false');
      }

      // Alterna o tooltip atual
      tooltip.hidden = isShowing;
      this.setAttribute('aria-expanded', String(!isShowing));
      tooltip.previousActiveBtn = this;
      activeTooltip = isShowing ? null : tooltip;
    });
  });

  // Fecha ao clicar fora de qualquer tooltip
  document.addEventListener('click', function (e) {
    if (activeTooltip && !activeTooltip.contains(e.target)) {
      const btn = activeTooltip.previousActiveBtn;
      activeTooltip.hidden = true;
      if (btn) btn.setAttribute('aria-expanded', 'false');
      activeTooltip = null;
    }
  });

  // Fecha ao pressionar Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && activeTooltip) {
      const btn = activeTooltip.previousActiveBtn;
      activeTooltip.hidden = true;
      if (btn) {
        btn.setAttribute('aria-expanded', 'false');
        btn.focus();
      }
      activeTooltip = null;
    }
  });

  // ─────────────────────────────────────────────────────────
  //  SCROLL REVEAL (IntersectionObserver)
  // ─────────────────────────────────────────────────────────
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  } else {
    // Fallback: mostra tudo sem animação
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  // ─────────────────────────────────────────────────────────
  //  ACTIVE NAV LINKS (scroll spy)
  // ─────────────────────────────────────────────────────────
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  if (sections.length && navLinks.length) {
    const spyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(l => l.classList.remove('active'));
          const active = document.querySelector(`.nav-link[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    }, { rootMargin: '-40% 0px -50% 0px' });

    sections.forEach(s => spyObserver.observe(s));
  }

  // ─────────────────────────────────────────────────────────
  //  ACESSIBILIDADE — Alto Contraste
  // ─────────────────────────────────────────────────────────
  const btnContrast = document.getElementById('btn-contrast');

  btnContrast && btnContrast.addEventListener('click', function () {
    document.body.classList.toggle('high-contrast');
    const ativo = document.body.classList.contains('high-contrast');
    this.textContent = ativo ? 'Contraste Normal' : 'Alto Contraste';
    sessionStorage.setItem('bioloop-contraste', ativo ? '1' : '0');
  });

  // ─────────────────────────────────────────────────────────
  //  ACESSIBILIDADE — Tamanho de Fonte
  // ─────────────────────────────────────────────────────────
  let fontSize = parseInt(sessionStorage.getItem('bioloop-fonte') || '16', 10);
  document.documentElement.style.fontSize = fontSize + 'px';

  document.getElementById('btn-font-up') && document.getElementById('btn-font-up').addEventListener('click', function () {
    if (fontSize < 26) {
      fontSize += 2;
      document.documentElement.style.fontSize = fontSize + 'px';
      sessionStorage.setItem('bioloop-fonte', String(fontSize));
    }
  });

  document.getElementById('btn-font-down') && document.getElementById('btn-font-down').addEventListener('click', function () {
    if (fontSize > 12) {
      fontSize -= 2;
      document.documentElement.style.fontSize = fontSize + 'px';
      sessionStorage.setItem('bioloop-fonte', String(fontSize));
    }
  });

  // ─────────────────────────────────────────────────────────
  //  ACESSIBILIDADE — Modo Daltônico
  // ─────────────────────────────────────────────────────────
  const btnColorblind = document.getElementById('btn-colorblind');

  btnColorblind && btnColorblind.addEventListener('click', function () {
    document.body.classList.toggle('colorblind-mode');
    const ativo = document.body.classList.contains('colorblind-mode');
    this.textContent = ativo ? 'Cores Padrão' : 'Daltônico';
    sessionStorage.setItem('bioloop-daltonico', ativo ? '1' : '0');
  });

  // ─────────────────────────────────────────────────────────
  //  TEMA CLARO / ESCURO
  // ─────────────────────────────────────────────────────────
  const btnLight = document.getElementById('btn-theme-light');
  const btnDark  = document.getElementById('btn-theme-dark');

  function aplicarTema(tema) {
    document.documentElement.setAttribute('data-theme', tema);

    if (btnLight && btnDark) {
      if (tema === 'dark') {
        btnDark.classList.add('active');
        btnLight.classList.remove('active');
        btnDark.setAttribute('aria-pressed', 'true');
        btnLight.setAttribute('aria-pressed', 'false');
      } else {
        btnLight.classList.add('active');
        btnDark.classList.remove('active');
        btnLight.setAttribute('aria-pressed', 'true');
        btnDark.setAttribute('aria-pressed', 'false');
      }
    }

    sessionStorage.setItem('bioloop-tema', tema);
  }

  btnLight && btnLight.addEventListener('click', () => aplicarTema('light'));
  btnDark  && btnDark.addEventListener('click',  () => aplicarTema('dark'));

  // ─────────────────────────────────────────────────────────
  //  CUSTOM SELECT — Tipo de Manejo
  // ─────────────────────────────────────────────────────────
  (function setupCustomSelect() {
    const wrapper = document.getElementById('management-select');
    if (!wrapper) return;

    const trigger  = document.getElementById('management-select-btn');
    const list     = document.getElementById('management-select-list');
    const native   = document.getElementById('management-type');
    const curIcon  = wrapper.querySelector('.cselect__cur-icon');
    const curLabel = wrapper.querySelector('.cselect__cur-label');
    const options  = list.querySelectorAll('.cselect__option');

    function isOpen() {
      return wrapper.getAttribute('aria-expanded') === 'true';
    }

    function open() {
      wrapper.setAttribute('aria-expanded', 'true');
      trigger.setAttribute('aria-expanded', 'true');
      const selected = list.querySelector('[aria-selected="true"]') || options[0];
      if (selected) selected.focus();
    }

    function close() {
      if (!isOpen()) return;
      wrapper.setAttribute('aria-expanded', 'false');
      trigger.setAttribute('aria-expanded', 'false');
      trigger.focus({ preventScroll: true });
    }

    function selectOpt(opt) {
      const value    = opt.dataset.value;
      const iconEl   = opt.querySelector('.cselect__opt-icon');
      const nameEl   = opt.querySelector('.cselect__opt-name');

      // Copia o ícone SVG para o trigger
      if (iconEl) curIcon.innerHTML = iconEl.innerHTML;

      // Atualiza o label do trigger
      if (nameEl) curLabel.textContent = nameEl.textContent;

      // Sincroniza o <select> nativo para o simulator.js
      native.value = value;
      native.dispatchEvent(new Event('change', { bubbles: true }));

      // Atualiza estados aria e classes
      options.forEach(o => {
        const isThis = o === opt;
        o.classList.toggle('cselect__option--selected', isThis);
        o.setAttribute('aria-selected', String(isThis));
      });

      trigger.setAttribute('aria-label',
        'Tipo de manejo selecionado: ' + (nameEl ? nameEl.textContent : value));

      close();
    }

    // Abre/fecha ao clicar no trigger
    trigger.addEventListener('click', () => isOpen() ? close() : open());

    // Clique e teclado em cada opção
    options.forEach(opt => {
      opt.addEventListener('click', () => selectOpt(opt));

      opt.addEventListener('keydown', e => {
        switch (e.key) {
          case 'Enter':
          case ' ':
            e.preventDefault();
            selectOpt(opt);
            break;
          case 'ArrowDown':
            e.preventDefault();
            (opt.nextElementSibling || options[0]).focus();
            break;
          case 'ArrowUp':
            e.preventDefault();
            if (opt.previousElementSibling) opt.previousElementSibling.focus();
            else trigger.focus();
            break;
          case 'Escape':
          case 'Tab':
            close();
            break;
        }
      });
    });

    // Teclado no trigger
    trigger.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault();
        open();
      } else if (e.key === 'Escape') {
        close();
      }
    });

    // Fecha ao clicar fora
    document.addEventListener('click', e => {
      if (!wrapper.contains(e.target)) close();
    });
  })();

  // ─────────────────────────────────────────────────────────
  //  FILTROS DO GLOSSÁRIO
  // ─────────────────────────────────────────────────────────
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const glossaryGroups = document.querySelectorAll('.glossary-group[data-category]');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function () {
      const filter = this.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('filter-btn--active'));
      this.classList.add('filter-btn--active');

      glossaryGroups.forEach(group => {
        if (filter === 'all' || group.dataset.category === filter) {
          group.classList.remove('hidden');
        } else {
          group.classList.add('hidden');
        }
      });
    });
  });

  // ─────────────────────────────────────────────────────────
  //  RESTAURAÇÃO DE PREFERÊNCIAS (sessionStorage)
  // ─────────────────────────────────────────────────────────
  (function restaurar() {
    if (sessionStorage.getItem('bioloop-contraste') === '1') {
      document.body.classList.add('high-contrast');
      if (btnContrast) btnContrast.textContent = 'Contraste Normal';
    }

    if (sessionStorage.getItem('bioloop-daltonico') === '1') {
      document.body.classList.add('colorblind-mode');
      if (btnColorblind) btnColorblind.textContent = 'Cores Padrão';
    }

    const tema = sessionStorage.getItem('bioloop-tema');
    aplicarTema(tema === 'light' ? 'light' : 'dark');
  })();

})();
