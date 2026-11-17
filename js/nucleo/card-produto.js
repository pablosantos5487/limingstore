/* js/nucleo/card-produto.js — monta o HTML do card padrão e liga os botões */
window.Liming = window.Liming || {};

Liming.card = (() => {
  const U = Liming.utils;
  const I = () => Liming.ui.icones;

  const ROTULOS = { novo: "Novo", lancamento: "Lançamento", especial: "Edição especial" };

  function selos(p) {
    const s = [];
    if (U.estoqueTotal(p) === 0) s.push('<span class="selo selo--esgotado">Esgotado</span>');
    else {
      if (p.promo != null) s.push(`<span class="selo selo--promo">-${U.descontoPct(p)}%</span>`);
      if (p.badge) s.push(`<span class="selo selo--${p.badge}">${ROTULOS[p.badge]}</span>`);
    }
    return s.join("");
  }

  function html(p) {
    const preco = U.precoFinal(p);
    const parc = U.parcelamento(preco);
    const esgotado = U.estoqueTotal(p) === 0;
    const fav = Liming.favoritos.tem(p.id);
    const url = `produto.html?p=${encodeURIComponent(p.slug)}`;
    return `
    <article class="card ${esgotado ? "card--esgotado" : ""}" data-id="${p.id}">
      <a class="card__midia" href="${url}" aria-label="Ver ${U.esc(p.nome)}">
        ${Liming.arte.midia(p)}
      </a>
      <div class="card__selos">${selos(p)}</div>
      <button class="card__fav" data-fav="${p.id}" aria-pressed="${fav}" aria-label="Favoritar ${U.esc(p.nome)}">${I().coracao}</button>
      <div class="card__corpo">
        <span class="card__grupo">${U.esc(p.grupo)}</span>
        <h3 class="card__nome"><a href="${url}">${U.esc(p.nome)}</a></h3>
        <div class="card__precos">
          <span class="preco">${U.moeda(preco)}</span>
          ${p.promo != null ? `<span class="preco preco-antigo">${U.moeda(p.preco)}</span>` : ""}
        </div>
        ${parc ? `<span class="card__parcelas">${parc}</span>` : ""}
        <div class="card__acoes">
          <a class="btn btn--contorno" href="${url}">Ver</a>
          <button class="btn btn--primario" data-rapido="${p.id}" ${esgotado ? "disabled" : ""}>${esgotado ? "Esgotado" : "Adicionar"}</button>
        </div>
      </div>
    </article>`;
  }

  /* Desenha uma lista de produtos dentro de um container */
  function renderizar(container, lista) {
    container.innerHTML = lista.map(html).join("");
  }

  /* Delegação de eventos (uma única vez por página): favoritar e adicionar rápido */
  function ligarEventos() {
    document.addEventListener("click", (e) => {
      const fav = e.target.closest("[data-fav]");
      if (fav) {
        const id = Number(fav.dataset.fav);
        const ativo = Liming.favoritos.alternar(id);
        document.querySelectorAll(`[data-fav="${id}"]`).forEach((b) => b.setAttribute("aria-pressed", ativo));
        Liming.ui.toast(ativo ? "Adicionado aos favoritos." : "Removido dos favoritos.", ativo ? "ok" : "");
        return;
      }
      const rapido = e.target.closest("[data-rapido]");
      if (rapido) Liming.gaveta.abrirRapido(Number(rapido.dataset.rapido));
    });
  }

  return { html, renderizar, ligarEventos };
})();
