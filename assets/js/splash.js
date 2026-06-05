/**
 * BioLoop — Splash Screen
 * Tela de entrada com letras aparecendo uma a uma.
 * Auto-contido: injeta CSS e DOM sem dependências externas.
 */
(function () {

  var css = `
    #splash-overlay {
      position: fixed;
      inset: 0;
      z-index: 9999;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #07090f;
      opacity: 1;
      transition: opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1);
    }

    #splash-overlay.splash-fadeout {
      opacity: 0;
      pointer-events: none;
    }

    /* Fundo com grid sutil */
    #splash-overlay::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px);
      background-size: 60px 60px;
      mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, black 40%, transparent 100%);
      -webkit-mask-image: radial-gradient(ellipse 60% 60% at 50% 50%, black 40%, transparent 100%);
      pointer-events: none;
    }

    /* Glows de fundo */
    #splash-overlay::after {
      content: '';
      position: absolute;
      width: 400px;
      height: 400px;
      background: radial-gradient(circle, rgba(0, 212, 255, 0.15) 0%, transparent 70%);
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border-radius: 50%;
      pointer-events: none;
    }

    .splash-logo {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: baseline;
      font-family: 'Space Grotesk', system-ui, sans-serif;
      font-size: clamp(3.5rem, 10vw, 6.5rem);
      font-weight: 800;
      letter-spacing: -0.03em;
      line-height: 1;
    }

    .splash-letter {
      display: inline-block;
      opacity: 0;
      transform: translateY(30px);
      animation: splashRise 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
      animation-delay: calc(var(--i) * 100ms);
    }

    .splash-letter.tech   { color: #00d4ff; }
    .splash-letter.nature { color: #00e87a; }

    @keyframes splashRise {
      to { opacity: 1; transform: translateY(0); }
    }

    .splash-underline {
      position: relative;
      z-index: 1;
      width: 0;
      height: 2px;
      background: linear-gradient(90deg, #00d4ff, #00e87a);
      border-radius: 2px;
      margin-top: 14px;
      animation: splashLine 0.6s ease forwards 850ms;
    }

    @keyframes splashLine {
      to { width: 100%; }
    }

    .splash-tagline {
      position: relative;
      z-index: 1;
      margin-top: 18px;
      color: #8892b0;
      font-family: 'Inter', system-ui, sans-serif;
      font-size: clamp(0.7rem, 2vw, 0.9rem);
      font-weight: 500;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      opacity: 0;
      animation: splashSlide 0.7s ease forwards 1000ms;
    }

    @keyframes splashSlide {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .splash-skip {
      position: absolute;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1;
      color: #4a5568;
      font-family: 'Inter', system-ui, sans-serif;
      font-size: 0.72rem;
      letter-spacing: 0.08em;
      opacity: 0;
      animation: splashSlide 0.5s ease forwards 1400ms;
    }
  `;

  var styleTag = document.createElement('style');
  styleTag.textContent = css;
  document.head.appendChild(styleTag);

  function buildSplash() {
    if (sessionStorage.getItem('bioloop-splash-shown')) return;
    sessionStorage.setItem('bioloop-splash-shown', '1');

    var overlay = document.createElement('div');
    overlay.id = 'splash-overlay';
    overlay.setAttribute('aria-hidden', 'true');
    overlay.setAttribute('role', 'presentation');

    var html = '<div class="splash-logo">';
    ['B','i','o'].forEach(function (ch, i) {
      html += '<span class="splash-letter tech" style="--i:' + i + '">' + ch + '</span>';
    });
    ['L','o','o','p'].forEach(function (ch, j) {
      html += '<span class="splash-letter nature" style="--i:' + (3 + j) + '">' + ch + '</span>';
    });
    html += '</div>';
    html += '<div class="splash-underline"></div>';
    html += '<p class="splash-tagline">Painel de Transição Energética</p>';
    html += '<span class="splash-skip">Pressione qualquer tecla para pular</span>';

    overlay.innerHTML = html;
    document.body.prepend(overlay);

    function dismiss() {
      overlay.classList.add('splash-fadeout');
      overlay.addEventListener('transitionend', function () {
        overlay.remove();
        styleTag.remove();
      }, { once: true });
    }

    var timer = setTimeout(dismiss, 2800);

    function skip() {
      clearTimeout(timer);
      dismiss();
      document.removeEventListener('keydown', skip);
      overlay.removeEventListener('click', skip);
    }

    document.addEventListener('keydown', skip, { once: true });
    overlay.addEventListener('click', skip);
  }

  if (document.body) {
    buildSplash();
  } else {
    document.addEventListener('DOMContentLoaded', buildSplash);
  }
})();
