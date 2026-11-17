/* js/nucleo/ui.js — mensagens (toast), revelar ao rolar, ícones reutilizáveis */
window.Liming = window.Liming || {};

Liming.ui = {
  /* Mensagem de confirmação/erro. tipo: "ok" | "erro" | "" */
  toast(msg, tipo = "") {
    let area = document.getElementById("toasts");
    if (!area) return;
    const el = document.createElement("div");
    el.className = "toast" + (tipo ? ` toast--${tipo}` : "");
    el.setAttribute("role", tipo === "erro" ? "alert" : "status");
    el.textContent = msg;
    area.appendChild(el);
    setTimeout(() => el.remove(), 4200);
  },

  /* Animação discreta de entrada nos elementos .revelar */
  revelar(raiz = document) {
    const alvos = raiz.querySelectorAll(".revelar:not(.visivel)");
    if (!("IntersectionObserver" in window)) { alvos.forEach((a) => a.classList.add("visivel")); return; }
    const obs = new IntersectionObserver((entradas) => {
      entradas.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visivel"); obs.unobserve(e.target); } });
    }, { threshold: 0.12 });
    alvos.forEach((a) => obs.observe(a));
  },

  /* Marca botão como "carregando" enquanto executa uma ação assíncrona */
  async carregando(botao, acao) {
    botao.classList.add("carregando");
    try { return await acao(); } finally { botao.classList.remove("carregando"); }
  },

  icones: {
    busca: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>',
    conta: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1-4.5 4.5-6 8-6s7 1.5 8 6"/></svg>',
    coracao: '<svg viewBox="0 0 24 24"><path d="M12 21s-8-5.2-8-11a4.6 4.6 0 0 1 8-3 4.6 4.6 0 0 1 8 3c0 5.8-8 11-8 11z"/></svg>',
    sacola: '<svg viewBox="0 0 24 24"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    menu: '<svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h10"/></svg>',
    fechar: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
    seta: '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    instagram: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8"/></svg>',
    email: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>',
    whats: '<svg viewBox="0 0 24 24"><path d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.8-1.2A9.5 9.5 0 1 0 12 2.5z"/><path d="M9 8.2c-.3.8-.2 1.8.6 3 .9 1.4 2 2.3 3.2 2.8.9.4 1.7.1 2-.5l.2-.7-1.9-.9-.7.7c-.8-.4-1.6-1.2-2-2l.6-.7-.8-1.9z" fill="#25d366"/></svg>',
  },
};
