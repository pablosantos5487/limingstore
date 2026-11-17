/* ==========================================================================
   js/paginas/produto.js — página individual do produto
   Galeria com zoom, seleção obrigatória de tamanho, trava de estoque por
   combinação, adicionar ao carrinho, comprar agora, estimativa de frete,
   produtos relacionados e dados estruturados (JSON-LD) para SEO.
   ========================================================================== */
window.Liming = window.Liming || {};
Liming.paginas = Liming.paginas || {};

Liming.paginas.produto = () => {
  const U = Liming.utils;
  const C = Liming.carrinho;
  const cfg = Liming.config;
  const $ = (id) => document.getElementById(id);

  const p = U.produtoPorSlug(U.param("p"));
  if (!p) {
    $("produto-raiz").innerHTML = `<div class="catalogo__vazio" style="grid-column:1/-1"><p class="titulo-md">Produto não encontrado</p>
      <a class="btn btn--primario mt-3" href="catalogo.html">Ver todos os produtos</a></div>`;
    return;
  }

  /* ----- SEO dinâmico ----- */
  const preco = U.precoFinal(p);
  document.title = `${p.nome} | ${cfg.nome}`;
  const desc = `${p.nome} por ${U.moeda(preco)}. ${p.descricao.split(".")[0]}. Compre na ${cfg.nome}.`;
  const metaDesc = document.querySelector('meta[name="description"]'); if (metaDesc) metaDesc.content = desc;
  const canonical = document.querySelector('link[rel="canonical"]'); if (canonical) canonical.href = `${cfg.urlSite}/produto.html?p=${p.slug}`;
  const ld = {
    "@context": "https://schema.org", "@type": "Product", name: p.nome, description: p.descricao,
    brand: { "@type": "Brand", name: cfg.nome }, category: (U.categoriaPorSlug(p.categoria) || {}).nome,
    offers: { "@type": "Offer", priceCurrency: "BRL", price: preco.toFixed(2),
      availability: U.estoqueTotal(p) > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${cfg.urlSite}/produto.html?p=${p.slug}` },
  };
  if (p.imagens && p.imagens.length) ld.image = p.imagens.map((i) => `${cfg.urlSite}/${i}`);
  const s = document.createElement("script"); s.type = "application/ld+json"; s.textContent = JSON.stringify(ld); document.head.appendChild(s);

  /* ----- Galeria ----- */
  const n = Liming.arte.totalVistas(p);
  let vista = 0;
  $("migalha-categoria").textContent = (U.categoriaPorSlug(p.categoria) || {}).nome || "Produtos";
  $("migalha-categoria").href = `catalogo.html?categoria=${p.categoria}`;
  $("migalha-produto").textContent = p.nome;

  function desenharGaleria() {
    $("galeria-principal").innerHTML = Liming.arte.midia(p, vista) + '<span class="galeria__dica">CLIQUE PARA AMPLIAR</span>';
    $("galeria-mini").innerHTML = Array.from({ length: n }, (_, i) =>
      `<button class="miniatura" data-v="${i}" aria-current="${i === vista}" aria-label="Ver imagem ${i + 1}">${Liming.arte.midia(p, i)}</button>`).join("");
    $("galeria-mini").classList.toggle("oculto", n < 2);
  }
  $("galeria-mini").addEventListener("click", (e) => { const b = e.target.closest("[data-v]"); if (b) { vista = Number(b.dataset.v); desenharGaleria(); } });
  $("galeria-principal").addEventListener("click", () => { $("zoom").innerHTML = Liming.arte.midia(p, vista); $("zoom").classList.add("aberto"); });
  $("zoom").addEventListener("click", () => $("zoom").classList.remove("aberto"));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") $("zoom").classList.remove("aberto"); });
  desenharGaleria();

  /* ----- Informações ----- */
  $("produto-grupo").textContent = p.grupo;
  $("produto-nome").textContent = p.nome;
  const pct = U.descontoPct(p);
  $("produto-precos").innerHTML = `<span class="preco">${U.moeda(preco)}</span>` +
    (p.promo != null ? `<span class="preco preco-antigo">${U.moeda(p.preco)}</span><span class="produto__desconto">-${pct}%</span>` : "");
  const parc = U.parcelamento(preco);
  $("produto-parcelas").textContent = [parc, cfg.descontoPix > 0 ? `${U.moeda(preco * (1 - cfg.descontoPix / 100))} no Pix (${cfg.descontoPix}% off)` : ""].filter(Boolean).join(" · ");
  $("produto-descricao").textContent = p.descricao;

  /* ----- Tamanhos e estoque ----- */
  let tamanho = "";
  let qtd = 1;
  const tamanhosEl = $("tamanhos");
  tamanhosEl.innerHTML = Object.entries(p.estoque).map(([t, q]) =>
    `<button class="tamanho" data-t="${U.esc(t)}" aria-pressed="false" ${q <= 0 ? "disabled title=\"Esgotado\"" : ""}>${U.esc(t)}</button>`).join("");
  const unico = Object.keys(p.estoque).length === 1;

  function disponivel() { return tamanho ? p.estoque[tamanho] - C.qtdNoCarrinho(p.id, tamanho) : 0; }

  function atualizarEstoque() {
    const el = $("estoque-info");
    if (U.estoqueTotal(p) === 0) { el.textContent = "Produto esgotado."; el.className = "estoque-info baixo"; return; }
    if (!tamanho) { el.textContent = "Selecione um tamanho para ver a disponibilidade."; el.className = "estoque-info"; return; }
    const d = disponivel();
    if (d <= 0) { el.textContent = "Você já tem todo o estoque deste tamanho no carrinho."; el.className = "estoque-info baixo"; }
    else if (d <= 3) { el.textContent = `Últimas ${d} unidade(s) no tamanho ${tamanho}!`; el.className = "estoque-info baixo"; }
    else { el.textContent = `Em estoque — tamanho ${tamanho}.`; el.className = "estoque-info ok"; }
  }
  function mostrarQtd() { $("qtd-valor").textContent = qtd; }

  tamanhosEl.addEventListener("click", (e) => {
    const b = e.target.closest(".tamanho"); if (!b || b.disabled) return;
    tamanhosEl.querySelectorAll(".tamanho").forEach((x) => x.setAttribute("aria-pressed", "false"));
    b.setAttribute("aria-pressed", "true"); tamanho = b.dataset.t;
    qtd = 1; mostrarQtd(); $("erro-tamanho").textContent = ""; atualizarEstoque();
  });
  if (unico && Object.values(p.estoque)[0] > 0) tamanhosEl.querySelector(".tamanho").click();

  $("qtd-menos").addEventListener("click", () => { if (qtd > 1) { qtd--; mostrarQtd(); } });
  $("qtd-mais").addEventListener("click", () => {
    if (!tamanho) { $("erro-tamanho").textContent = "Selecione um tamanho antes."; return; }
    if (qtd < disponivel()) { qtd++; mostrarQtd(); } else Liming.ui.toast(`Máximo disponível: ${disponivel()}.`, "erro");
  });

  /* ----- Comprar ----- */
  function adicionar() {
    if (U.estoqueTotal(p) === 0) { Liming.ui.toast("Produto esgotado.", "erro"); return null; }
    if (!tamanho) { $("erro-tamanho").textContent = "Escolha um tamanho para continuar."; $("tamanhos").scrollIntoView({ behavior: "smooth", block: "center" }); return null; }
    const r = C.adicionar(p.id, tamanho, qtd);
    if (!r.ok) { $("erro-tamanho").textContent = r.msg; Liming.ui.toast(r.msg, "erro"); return null; }
    qtd = 1; mostrarQtd(); atualizarEstoque();
    return r;
  }
  $("btn-adicionar").addEventListener("click", (e) => {
    const r = adicionar();
    if (r) { Liming.ui.toast(r.msg, "ok"); Liming.gaveta.abrir(); }
  });
  $("btn-comprar").addEventListener("click", () => { if (adicionar()) location.href = "carrinho.html"; });
  if (U.estoqueTotal(p) === 0) { $("btn-adicionar").disabled = true; $("btn-comprar").disabled = true; }
  document.addEventListener("liming:carrinho", atualizarEstoque);
  atualizarEstoque();

  /* ----- Tabela de tamanhos ----- */
  const tab = Liming.tabelaTamanhos;
  $("tabela-corpo").innerHTML = `<table><thead><tr>${tab.cabecalho.map((c) => `<th>${c}</th>`).join("")}</tr></thead><tbody>${
    tab.linhas.map((l) => `<tr>${l.map((c) => `<td>${c}</td>`).join("")}</tr>`).join("")}</tbody></table><p class="texto-pequeno">${tab.nota}</p>`;
  $("abrir-tabela").addEventListener("click", () => $("modal-tabela").classList.add("aberto"));
  $("modal-tabela").addEventListener("click", (e) => { if (e.target === $("modal-tabela") || e.target.closest("[data-fechar]")) $("modal-tabela").classList.remove("aberto"); });

  /* ----- Entrega (estimativa por CEP) ----- */
  $("form-cep").addEventListener("submit", (e) => {
    e.preventDefault();
    const cep = U.somenteNumeros($("cep-produto").value);
    const saida = $("cep-resultado");
    if (cep.length !== 8) { saida.textContent = "Digite um CEP válido com 8 números."; saida.style.color = "var(--alerta)"; return; }
    const reg = cfg.fretePorRegiao[cep[0]];
    if (!reg) { saida.textContent = "Não conseguimos estimar para este CEP. Fale com o atendimento."; return; }
    const gratis = cfg.freteGratisAcima > 0 && preco >= cfg.freteGratisAcima;
    saida.style.color = "var(--ok)";
    saida.textContent = `${gratis ? "Frete grátis" : "Frete estimado " + U.moeda(reg.valor)} · prazo de ${reg.prazo} dias úteis (confirmado no fechamento).`;
  });
  $("info-frete-gratis").textContent = cfg.freteGratisAcima > 0 ? `Frete grátis em compras acima de ${U.moeda(cfg.freteGratisAcima)}.` : "Enviamos para todo o Brasil.";

  /* ----- Relacionados ----- */
  const rel = Liming.produtos.filter((x) => x.id !== p.id && (x.categoria === p.categoria || x.grupo === p.grupo)).slice(0, 4);
  Liming.card.renderizar($("relacionados"), rel);
  $("relacionados-secao").classList.toggle("oculto", !rel.length);
};
