/* ==========================================================================
   js/paginas/carrinho.js — carrinho completo + fechamento do pedido
   O pedido é enviado ao atendimento pelo WhatsApp com todos os dados.
   NÃO existe pagamento simulado: o atendimento confirma estoque e envia o
   link/QR Code de pagamento real. Nenhuma compra é dada como "concluída" aqui.
   ========================================================================== */
window.Liming = window.Liming || {};
Liming.paginas = Liming.paginas || {};

Liming.paginas.carrinho = () => {
  const U = Liming.utils;
  const C = Liming.carrinho;
  const cfg = Liming.config;
  const $ = (id) => document.getElementById(id);

  Liming.gaveta.ligarItens($("carrinho-lista"));

  function desenhar() {
    const t = C.totais();
    const vazio = !t.linhas.length;
    $("carrinho-conteudo").classList.toggle("oculto", vazio);
    $("carrinho-vazio").classList.toggle("oculto", !vazio);
    if (vazio) return;

    $("carrinho-lista").innerHTML = t.linhas.map(Liming.gaveta.htmlItem).join("");
    $("res-subtotal").textContent = U.moeda(t.subtotal);

    $("res-desconto-linha").classList.toggle("oculto", !t.desconto);
    $("res-desconto").textContent = "− " + U.moeda(t.desconto);
    $("res-cupom-nome").textContent = t.cupomCodigo ? `Desconto (${t.cupomCodigo})` : "Desconto";

    if (t.frete === null) { $("res-frete").textContent = "Informe o CEP"; $("res-prazo").textContent = ""; }
    else { $("res-frete").textContent = t.frete === 0 ? "Grátis" : U.moeda(t.frete); $("res-prazo").textContent = `Prazo estimado: ${t.prazo} dias úteis`; }

    $("res-total").textContent = U.moeda(t.total);
    $("res-pix").textContent = t.pix ? `ou ${U.moeda(t.pix)} no Pix (${cfg.descontoPix}% off)` : "";
    $("res-parcelas").textContent = U.parcelamento(t.total);
    if (t.cep) $("cep").value = t.cep.replace(/^(\d{5})(\d{3})$/, "$1-$2");
    $("cupom-ativo").classList.toggle("oculto", !t.cupomCodigo);
    $("cupom-ativo-nome").textContent = t.cupomCodigo || "";
  }

  /* Frete */
  $("form-frete").addEventListener("submit", (e) => {
    e.preventDefault();
    const r = C.definirCep($("cep").value);
    if (!r.ok) Liming.ui.toast(r.msg, "erro");
  });
  /* Cupom */
  $("form-cupom").addEventListener("submit", (e) => {
    e.preventDefault();
    const r = C.aplicarCupom($("cupom").value);
    Liming.ui.toast(r.msg, r.ok ? "ok" : "erro");
    if (r.ok) $("cupom").value = "";
  });
  $("remover-cupom").addEventListener("click", () => C.removerCupom());
  $("limpar-carrinho").addEventListener("click", () => { if (confirm("Esvaziar o carrinho?")) C.limpar(); });

  /* ----- Dados do cliente e envio por WhatsApp ----- */
  const regras = {
    nome: (v) => (v.trim().split(/\s+/).length >= 2 ? "" : "Informe nome e sobrenome."),
    telefone: (v) => (U.somenteNumeros(v).length >= 10 ? "" : "Informe um telefone com DDD."),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) ? "" : "Informe um e-mail válido."),
    rua: (v) => (v.trim().length >= 3 ? "" : "Informe a rua."),
    numero: (v) => (v.trim() ? "" : "Informe o número."),
    bairro: (v) => (v.trim().length >= 2 ? "" : "Informe o bairro."),
    cidade: (v) => (v.trim().length >= 2 ? "" : "Informe a cidade."),
    uf: (v) => (/^[A-Za-z]{2}$/.test(v.trim()) ? "" : "Use a sigla do estado (ex.: SP)."),
    pagamento: (v) => (v ? "" : "Escolha a forma de pagamento."),
    aceite: (_, el) => (el.checked ? "" : "É necessário aceitar a política de privacidade."),
  };

  function validar() {
    let ok = true, primeiro = null;
    Object.keys(regras).forEach((nome) => {
      const el = $("f-" + nome);
      const msg = regras[nome](el.type === "checkbox" ? "" : el.value, el);
      const campo = el.closest(".campo") || el.parentElement;
      campo.classList.toggle("erro", !!msg);
      const m = campo.querySelector(".msg-erro"); if (m) m.textContent = msg;
      if (msg) { ok = false; primeiro = primeiro || el; }
    });
    if (primeiro) primeiro.focus();
    return ok;
  }

  $("form-pedido").addEventListener("submit", async (e) => {
    e.preventDefault();
    const t = C.totais();
    if (!t.linhas.length) return Liming.ui.toast("Seu carrinho está vazio.", "erro");
    if (t.frete === null) { Liming.ui.toast("Calcule o frete informando o CEP.", "erro"); $("cep").focus(); return; }
    if (!validar()) { Liming.ui.toast("Confira os campos destacados.", "erro"); return; }

    const v = (n) => $("f-" + n).value.trim();
    const itens = t.linhas.map((l) => `• ${l.qtd}x ${l.produto.nome} — Tam. ${l.tamanho} — ${U.moeda(l.subtotal)}`).join("\n");
    const msg =
`*NOVO PEDIDO — ${cfg.nome}*

${itens}

Subtotal: ${U.moeda(t.subtotal)}${t.desconto ? `\nDesconto (${t.cupomCodigo}): -${U.moeda(t.desconto)}` : ""}
Frete estimado: ${t.frete === 0 ? "Grátis" : U.moeda(t.frete)}
*Total: ${U.moeda(t.total)}*

*Cliente:* ${v("nome")}
Telefone: ${v("telefone")}
E-mail: ${v("email")}

*Entrega:* ${v("rua")}, ${v("numero")}${v("complemento") ? " - " + v("complemento") : ""}
${v("bairro")} — ${v("cidade")}/${v("uf").toUpperCase()} — CEP ${t.cep.replace(/^(\d{5})(\d{3})$/, "$1-$2")}

*Pagamento preferido:* ${v("pagamento")}
${v("obs") ? "Obs.: " + v("obs") : ""}

Aguardo a confirmação de estoque e o link de pagamento.`;

    await Liming.ui.carregando($("btn-finalizar"), async () => {
      await new Promise((r) => setTimeout(r, 400));
      window.open(U.linkWhats(msg), "_blank", "noopener");
    });
    $("aviso-enviado").classList.remove("oculto");
    Liming.ui.toast("Pedido enviado ao atendimento. Aguarde a confirmação.", "ok");
    /* O carrinho NÃO é esvaziado automaticamente: o pedido só vale após confirmação do atendimento. */
  });

  document.addEventListener("liming:carrinho", desenhar);
  desenhar();
};
