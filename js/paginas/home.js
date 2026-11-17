/* js/paginas/home.js — preenche as vitrines da página inicial */
window.Liming = window.Liming || {};
Liming.paginas = Liming.paginas || {};

Liming.paginas.home = () => {
  const U = Liming.utils;
  const P = Liming.produtos;
  const cfg = Liming.config;
  const $ = (id) => document.getElementById(id);

  /* SEÇÃO 3 — camisa de destaque do banner (desenho de exemplo; troque por foto com direitos) */
  $("hero-camisa").innerHTML = Liming.arte.svg({ tipo: "camisa", cores: ["#171a1f", "#d4f53c"], estilo: "faixa", numero: "10" });

  /* SEÇÃO 4 — Categorias (cards estilo "escalação") */
  $("home-categorias").innerHTML = Liming.categorias.map((c) => `
    <a class="cat revelar" href="catalogo.html?categoria=${c.slug}">
      <span class="cat__numero" aria-hidden="true">${c.numero}</span>
      <span class="cat__arte" aria-hidden="true">${Liming.arte.svg({ tipo: c.arte, cores: ["#2d323b", "#d4f53c"], estilo: "faixa" })}</span>
      <span class="cat__nome">${U.esc(c.nome)}</span>
      <span class="cat__desc">${U.esc(c.desc)}</span>
      <span class="cat__botao">Ver coleção →</span>
    </a>`).join("");

  /* SEÇÃO 5 — Mais vendidos */
  Liming.card.renderizar($("home-mais-vendidos"), [...P].sort((a, b) => b.vendas - a.vendas).slice(0, 8));

  /* SEÇÃO 6 — Coleção de camisas (abas) */
  const abas = [
    ["todas", "Todas", ["camisas", "selecoes", "retro"]],
    ["camisas", "Clubes", ["camisas"]],
    ["selecoes", "Seleções", ["selecoes"]],
    ["retro", "Retrô", ["retro"]],
  ];
  const caixaAbas = $("home-abas");
  caixaAbas.innerHTML = abas.map(([k, r], i) => `<button class="aba" role="tab" data-aba="${k}" aria-selected="${i === 0}">${r}</button>`).join("");
  function mostrarAba(k) {
    const cats = abas.find((a) => a[0] === k)[2];
    Liming.card.renderizar($("home-camisas"), P.filter((p) => cats.includes(p.categoria)).slice(0, 8));
    caixaAbas.querySelectorAll(".aba").forEach((b) => b.setAttribute("aria-selected", b.dataset.aba === k));
    const link = k === "todas" ? "catalogo.html?categoria=camisas" : `catalogo.html?categoria=${k}`;
    $("home-camisas-link").href = link;
  }
  caixaAbas.addEventListener("click", (e) => { const b = e.target.closest("[data-aba]"); if (b) mostrarAba(b.dataset.aba); });
  mostrarAba("todas");

  /* SEÇÃO 7 — Moda esportiva */
  Liming.card.renderizar($("home-moda"), P.filter((p) => ["casacos", "agasalhos", "moda"].includes(p.categoria)).slice(0, 4));

  /* SEÇÃO 8 — Novidades e lançamentos */
  const novos = P.filter((p) => p.badge).sort((a, b) => b.data.localeCompare(a.data)).slice(0, 4);
  Liming.card.renderizar($("home-novidades"), novos);

  /* SEÇÃO 10 — Avaliações REAIS (vem do config; vazio = convite, sem inventar nada) */
  const av = cfg.avaliacoes || [];
  $("home-avaliacoes").innerHTML = av.length
    ? `<div class="avaliacoes">${av.map((a) => `
        <article class="avaliacao revelar">
          <div class="avaliacao__nota" aria-label="Nota ${Number(a.nota)} de 5">${"★".repeat(a.nota)}${"☆".repeat(5 - a.nota)}</div>
          <p>“${U.esc(a.comentario)}”</p>
          <small>${U.esc(a.nome || "Cliente")} · ${U.esc(a.produto || "")}</small>
        </article>`).join("")}</div>`
    : `<div class="avaliacoes-vazio">
        <p class="titulo-md">As primeiras avaliações são suas.</p>
        <p class="texto-suave mt-1">Comprou com a gente? Conte como foi sua experiência — publicamos apenas depoimentos reais e autorizados.</p>
        <a class="btn btn--whats" target="_blank" rel="noopener" href="${U.linkWhats("Olá! Quero deixar minha avaliação da " + cfg.nome + ".")}">Enviar minha avaliação</a>
      </div>`;

  /* SEÇÃO 11 — Instagram (posts reais do config; vazio = atalho para o perfil) */
  const posts = cfg.postsInstagram || [];
  $("home-insta").innerHTML = posts.length
    ? posts.slice(0, 6).map((p) => `<a href="${U.esc(p.link)}" target="_blank" rel="noopener" aria-label="Ver publicação no Instagram">${p.imagem ? `<img src="${U.esc(p.imagem)}" alt="Publicação do Instagram da ${U.esc(cfg.nome)}" loading="lazy">` : "IG"}</a>`).join("")
    : Array.from({ length: 6 }, (_, i) => `<a href="${U.esc(cfg.instagram)}" target="_blank" rel="noopener" aria-label="Abrir Instagram">${["10", "09", "11", "07", "08", "05"][i]}</a>`).join("");
  $("home-insta-btn").href = cfg.instagram;

  Liming.ui.revelar();
};
