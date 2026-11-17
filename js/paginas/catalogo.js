/* ==========================================================================
   js/paginas/catalogo.js — catálogo com filtros e ordenação
   Filtros: categoria, clube/seleção (grupo), tamanho, faixa de preço, busca.
   Ordenação: menor preço, maior preço, novidades, mais vendidos.
   Tudo é refletido na URL (dá para compartilhar o link filtrado).
   ========================================================================== */
window.Liming = window.Liming || {};
Liming.paginas = Liming.paginas || {};

Liming.paginas.catalogo = () => {
  const U = Liming.utils;
  const $ = (id) => document.getElementById(id);
  const todos = Liming.produtos;

  /* Estado lido da URL */
  const estado = {
    categoria: U.param("categoria") || "",
    grupos: (U.param("grupo") || "").split("|").filter(Boolean),
    tamanhos: (U.param("tam") || "").split(",").filter(Boolean),
    min: U.param("min") || "",
    max: U.param("max") || "",
    ordem: U.param("ordem") || "relevancia",
    q: (U.param("q") || "").trim(),
    fav: U.param("fav") === "1",
  };

  /* ----- Monta as opções dos filtros a partir dos produtos ----- */
  const grupos = [...new Set(todos.map((p) => p.grupo))].sort();
  const tamanhos = [...new Set(todos.flatMap((p) => Object.keys(p.estoque)))];

  $("f-categorias").innerHTML =
    `<label><input type="radio" name="cat" value="" ${!estado.categoria ? "checked" : ""}> Todas</label>` +
    Liming.categorias.map((c) => `<label><input type="radio" name="cat" value="${c.slug}" ${estado.categoria === c.slug ? "checked" : ""}> ${U.esc(c.nome)}</label>`).join("");
  $("f-grupos").innerHTML = grupos.map((g) => `<label><input type="checkbox" name="grupo" value="${U.esc(g)}" ${estado.grupos.includes(g) ? "checked" : ""}> ${U.esc(g)}</label>`).join("");
  $("f-tamanhos").innerHTML = tamanhos.map((t) => `<button type="button" class="chip" data-tam="${U.esc(t)}" aria-pressed="${estado.tamanhos.includes(t)}">${U.esc(t)}</button>`).join("");
  $("f-min").value = estado.min; $("f-max").value = estado.max; $("ordem").value = estado.ordem;

  /* ----- Aplica filtros e ordena ----- */
  function filtrar() {
    let lista = todos.filter((p) => {
      if (estado.fav && !Liming.favoritos.tem(p.id)) return false;
      if (estado.categoria && p.categoria !== estado.categoria) return false;
      if (estado.grupos.length && !estado.grupos.includes(p.grupo)) return false;
      if (estado.tamanhos.length && !estado.tamanhos.some((t) => (p.estoque[t] || 0) > 0)) return false;
      const preco = U.precoFinal(p);
      if (estado.min !== "" && preco < Number(estado.min)) return false;
      if (estado.max !== "" && preco > Number(estado.max)) return false;
      if (estado.q) {
        const alvo = `${p.nome} ${p.grupo} ${p.categoria}`.toLowerCase();
        if (!estado.q.toLowerCase().split(/\s+/).every((t) => alvo.includes(t))) return false;
      }
      return true;
    });
    const ord = {
      menor: (a, b) => U.precoFinal(a) - U.precoFinal(b),
      maior: (a, b) => U.precoFinal(b) - U.precoFinal(a),
      novidades: (a, b) => b.data.localeCompare(a.data),
      vendidos: (a, b) => b.vendas - a.vendas,
      relevancia: (a, b) => b.vendas - a.vendas,
    }[estado.ordem] || (() => 0);
    return lista.sort(ord);
  }

  function atualizarUrl() {
    const q = new URLSearchParams();
    if (estado.categoria) q.set("categoria", estado.categoria);
    if (estado.grupos.length) q.set("grupo", estado.grupos.join("|"));
    if (estado.tamanhos.length) q.set("tam", estado.tamanhos.join(","));
    if (estado.min !== "") q.set("min", estado.min);
    if (estado.max !== "") q.set("max", estado.max);
    if (estado.ordem !== "relevancia") q.set("ordem", estado.ordem);
    if (estado.q) q.set("q", estado.q);
    if (estado.fav) q.set("fav", "1");
    history.replaceState(null, "", q.toString() ? `?${q}` : location.pathname);
  }

  function desenhar() {
    const lista = filtrar();
    const grade = $("catalogo-grade");
    if (!lista.length) {
      grade.innerHTML = `<div class="catalogo__vazio"><p class="titulo-md">Nenhum produto encontrado</p>
        <p class="mt-1">Tente remover algum filtro ou buscar por outro termo.</p>
        <button class="btn btn--primario mt-3" id="limpar-filtros">Limpar filtros</button></div>`;
    } else {
      Liming.card.renderizar(grade, lista);
    }
    $("catalogo-contagem").textContent = `${lista.length} produto${lista.length === 1 ? "" : "s"}`;

    /* Título da página conforme o filtro */
    const cat = U.categoriaPorSlug(estado.categoria);
    $("catalogo-titulo").textContent = estado.fav ? "Meus favoritos" : estado.q ? `Busca: “${estado.q}”` : cat ? cat.nome : "Todos os produtos";
    document.title = `${$("catalogo-titulo").textContent} | ${Liming.config.nome}`;
    atualizarUrl();
  }

  /* ----- Eventos ----- */
  $("f-categorias").addEventListener("change", (e) => { estado.categoria = e.target.value; estado.fav = false; desenhar(); });
  $("f-grupos").addEventListener("change", () => { estado.grupos = [...document.querySelectorAll('[name="grupo"]:checked')].map((i) => i.value); desenhar(); });
  $("f-tamanhos").addEventListener("click", (e) => {
    const b = e.target.closest("[data-tam]"); if (!b) return;
    const t = b.dataset.tam;
    estado.tamanhos = estado.tamanhos.includes(t) ? estado.tamanhos.filter((x) => x !== t) : [...estado.tamanhos, t];
    b.setAttribute("aria-pressed", estado.tamanhos.includes(t)); desenhar();
  });
  ["f-min", "f-max"].forEach((id) => $(id).addEventListener("input", () => { estado.min = $("f-min").value; estado.max = $("f-max").value; desenhar(); }));
  $("ordem").addEventListener("change", (e) => { estado.ordem = e.target.value; desenhar(); });

  function limpar() {
    Object.assign(estado, { categoria: "", grupos: [], tamanhos: [], min: "", max: "", q: "", fav: false, ordem: "relevancia" });
    document.querySelectorAll("#filtros input[type=checkbox]").forEach((i) => (i.checked = false));
    const todas = document.querySelector('[name="cat"][value=""]'); if (todas) todas.checked = true;
    document.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", "false"));
    $("f-min").value = ""; $("f-max").value = ""; $("ordem").value = "relevancia";
    desenhar();
  }
  $("limpar-todos").addEventListener("click", limpar);
  $("catalogo-grade").addEventListener("click", (e) => { if (e.target.id === "limpar-filtros") limpar(); });

  /* Painel de filtros no celular */
  const painel = $("filtros");
  $("abrir-filtros").addEventListener("click", () => painel.classList.add("aberto"));
  $("fechar-filtros").addEventListener("click", () => painel.classList.remove("aberto"));

  /* Favoritos: se desfavoritar na tela de favoritos, atualiza a lista */
  document.addEventListener("liming:favoritos", () => { if (estado.fav) desenhar(); });

  desenhar();
};
