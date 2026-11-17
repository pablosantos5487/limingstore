/* js/paginas/contato.js — formulário de contato (Formspree opcional ou WhatsApp) */
window.Liming = window.Liming || {};
Liming.paginas = Liming.paginas || {};

Liming.paginas.contato = () => {
  const U = Liming.utils;
  const cfg = Liming.config;
  const $ = (id) => document.getElementById(id);

  $("canal-whats").href = U.linkWhats(`Olá! Vim pelo site da ${cfg.nome}.`);
  $("canal-email").href = `mailto:${cfg.email}`;
  $("canal-email-txt").textContent = cfg.email;
  $("canal-insta").href = cfg.instagram;
  $("canal-horario").textContent = cfg.horarioAtendimento;

  const aviso = (txt, tipo) => { const a = $("contato-aviso"); a.textContent = txt; a.className = `form-aviso form-aviso--${tipo} mt-2`; a.classList.remove("oculto"); };

  $("form-contato").addEventListener("submit", async (e) => {
    e.preventDefault();
    const nome = $("c-nome").value.trim(), email = $("c-email").value.trim(), assunto = $("c-assunto").value, msg = $("c-msg").value.trim();
    if (nome.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || msg.length < 10) {
      return aviso("Preencha nome, um e-mail válido e uma mensagem com pelo menos 10 caracteres.", "erro");
    }
    if ($("c-aceite").checked === false) return aviso("Aceite a política de privacidade para enviar.", "erro");
    if ($("c-honey").value) return; // anti-robô: campo escondido preenchido = spam

    const btn = $("c-enviar");
    await Liming.ui.carregando(btn, async () => {
      if (cfg.formspreeEndpoint) {
        try {
          const r = await fetch(cfg.formspreeEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify({ nome, email, assunto, mensagem: msg }) });
          if (!r.ok) throw new Error();
          aviso("Mensagem enviada! Responderemos em breve.", "ok");
          $("form-contato").reset();
        } catch (_) { aviso("Não foi possível enviar agora. Tente pelo WhatsApp ou e-mail.", "erro"); }
      } else {
        window.open(U.linkWhats(`*${assunto}*\nNome: ${nome}\nE-mail: ${email}\n\n${msg}`), "_blank", "noopener");
        aviso("Abrimos o WhatsApp com sua mensagem pronta. É só enviar.", "ok");
      }
    });
  });
};
