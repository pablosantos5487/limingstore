/* ==========================================================================
   js/nucleo/gaveta.js
   - Carrinho lateral (mini-carrinho)
   - Janela "adicionar rápido" (escolher tamanho direto no card)
   - htmlItem(): linha de item reaproveitada na página do carrinho
   ========================================================================== */
window.Liming = window.Liming || {};

Liming.gaveta = (() => {
  const U = Liming.utils;
  const C = Liming.carrinho;

  /* Linha de item do carrinho */
  function htmlItem(l) {
    const p = l.produto;
    const url = `produto.html?p=${encodeURIComponent(p.slug)}`;
    return `
    <div class="item" data-id="${p.id}" data-tam="${U.esc(l.tamanho)}">
      <a class="item__img" href="${url}">${Liming.arte.midia(p)}</a>
      <div>
        <a class="item__nome" href="${url}">${U.esc(p.nome)}</a>
        <div class="item__meta">Tam. ${U.esc(l.tamanho)} · ${U.moeda(l.unit)}</div>
        <div class="qtd" role="group" aria-label="Quantidade">
          <button data-menos aria-label="Diminuir">−</button><span>${l.qtd}</span><button data-mais aria-label="Aumentar">+</button>
        </div>
      </div>
      <div>
        <div class="item__preco">${U.moeda(l.subtotal)}</div>
        <button class="item__remover" data-remover>Remover</button>
      </div>
    </div>`;
  }

  /* Liga os botões (+, −, remover) dentro de um container */
  function ligarItens(container) {
    container.addEventListener("click", (e) => {
      const linha = e.target.closest(".item");
      if (!linha) return;
      const id = Number(linha.dataset.id), tam = linha.dataset.tam;
      let r = null;
      if (e.target.closest("[data-mais]")) r = C.alterarQtd(id, tam, 1);
      else if (e.target.closest("[data-menos]")) r = C.alterarQtd(id, tam, -1);
      else if (e.target.closest("[data-remover]")) { C.remover(id, tam); Liming.ui.toast("Item removido do carrinho."); }
      if (r && r.ok === false && r.msg) Liming.ui.toast(r.msg, "erro");
    });
  }

  const iconeVazio = '<svg viewBox="0 0 24 24"><path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>';

  /* ----- Gaveta ----- */
  function desenharGaveta() {
    const lista = document.getElementById("gaveta-lista");
    const total = document.getElementById("gaveta-total");
    const btns = document.getElementById("gaveta-botoes");
    if (!lista) return;
    const t = C.totais();
    if (!t.linhas.length) {
      lista.innerHTML = `<div class="vazio">${iconeVazio}<p>Seu carrinho está vazio.</p><a class="btn btn--primario mt-3" href="catalogo.html">Explorar coleção</a></div>`;
      btns.classList.add("oculto");
    } else {
      lista.innerHTML = t.linhas.map(htmlItem).join("");
      btns.classList.remove("oculto");
    }
    total.textContent = U.moeda(t.subtotal);
  }

  function abrir() { const g = document.getElementById("gaveta"); if (g) { desenharGaveta(); g.classList.add("aberta"); document.body.style.overflow = "hidden"; } }
  function fechar() { const g = document.getElementById("gaveta"); if (g) { g.classList.remove("aberta"); document.body.style.overflow = ""; } }

  /* ----- Adicionar rápido (escolher tamanho) ----- */
  function abrirRapido(id) {
    const p = U.produtoPorId(id);
    if (!p) return;
    const modal = document.getElementById("rapido");
    const opcoes = Object.entries(p.estoque).map(([t, q]) =>
      `<button class="tamanho" data-t="${U.esc(t)}" ${q <= 0 ? "disabled" : ""} aria-pressed="false">${U.esc(t)}</button>`).join("");
    modal.querySelector(".modal-tabela__caixa").innerHTML = `
      <div class="gaveta__topo" style="padding:0 0 16px;border:0">
        <h2 class="titulo-md">${U.esc(p.nome)}</h2>
        <button class="acao-icone" data-fechar-rapido aria-label="Fechar">${Liming.ui.icones.fechar.replace("<svg", '<svg style="width:22px;height:22px;stroke:currentColor;fill:none;stroke-width:1.8"')}</button>
      </div>
      <p class="preco" style="color:var(--destaque);font-size:1.4rem">${U.moeda(U.precoFinal(p))}</p>
      <p class="texto-pequeno mt-2">Escolha o tamanho:</p>
      <div class="tamanhos mt-1">${opcoes}</div>
      <p class="erro-tamanho" id="rapido-erro" role="alert"></p>
      <button class="btn btn--primario btn--bloco mt-2" id="rapido-add">Adicionar ao carrinho</button>`;
    modal.dataset.id = id;
    modal.dataset.tam = "";
    modal.classList.add("aberto");
  }
  function fecharRapido() { const m = document.getElementById("rapido"); if (m) m.classList.remove("aberto"); }

  function ligarRapido() {
    const modal = document.getElementById("rapido");
    if (!modal) return;
    modal.addEventListener("click", (e) => {
      if (e.target === modal || e.target.closest("[data-fechar-rapido]")) return fecharRapido();
      const t = e.target.closest(".tamanho");
      if (t && !t.disabled) {
        modal.querySelectorAll(".tamanho").forEach((b) => b.setAttribute("aria-pressed", "false"));
        t.setAttribute("aria-pressed", "true");
        modal.dataset.tam = t.dataset.t;
        modal.querySelector("#rapido-erro").textContent = "";
      }
      if (e.target.closest("#rapido-add")) {
        const r = C.adicionar(Number(modal.dataset.id), modal.dataset.tam, 1);
        if (!r.ok) { modal.querySelector("#rapido-erro").textContent = r.msg; return; }
        fecharRapido();
        Liming.ui.toast(r.msg, "ok");
        abrir();
      }
    });
  }

  function iniciar() {
    const g = document.getElementById("gaveta");
    if (!g) return;
    g.addEventListener("click", (e) => { if (e.target.closest("[data-fechar-gaveta]") || e.target.classList.contains("gaveta__fundo")) fechar(); });
    ligarItens(document.getElementById("gaveta-lista"));
    ligarRapido();
    document.addEventListener("keydown", (e) => { if (e.key === "Escape") { fechar(); fecharRapido(); } });
    document.addEventListener("liming:carrinho", desenharGaveta);
    document.querySelectorAll("[data-abrir-carrinho]").forEach((b) => b.addEventListener("click", (e) => { if (/carrinho\.html$/.test(location.pathname)) return; e.preventDefault(); abrir(); }));
    desenharGaveta();
  }

  return { iniciar, abrir, fechar, abrirRapido, htmlItem, ligarItens };
})();
