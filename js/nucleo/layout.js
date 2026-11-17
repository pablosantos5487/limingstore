/* ==========================================================================
   js/nucleo/layout.js
   Monta as peças que se repetem em TODAS as páginas (barra superior,
   cabeçalho, menu mobile, carrinho lateral, rodapé, botão do WhatsApp).
   Para mudar o menu ou o rodapé do site inteiro, edite SOMENTE este arquivo.
   ========================================================================== */
window.Liming = window.Liming || {};

Liming.layout = (() => {
  const U = Liming.utils;
  const cfg = Liming.config;
  const ic = Liming.ui.icones;

  /* Links do menu principal (rótulo, endereço) */
  const MENU = [
    ["Início", "index.html"],
    ["Camisas", "catalogo.html?categoria=camisas"],
    ["Seleções", "catalogo.html?categoria=selecoes"],
    ["Retrô", "catalogo.html?categoria=retro"],
    ["Moda esportiva", "catalogo.html?categoria=moda"],
    ["Novidades", "catalogo.html?ordem=novidades"],
    ["Marca", "marca.html"],
  ];

  function logo() {
    return `<a class="logo" href="index.html" aria-label="${U.esc(cfg.nome)} — página inicial">Liming<b>.</b><small>STORE</small></a>`;
  }

  function barraSuperior() {
    const msgs = cfg.mensagensBarra.map((m) => `<span>${U.esc(m)}</span>`).join("");
    return `<div class="barra-superior" role="region" aria-label="Avisos da loja"><div class="barra-superior__trilho">${msgs}${msgs}${msgs}${msgs}</div></div>`;
  }

  function cabecalho() {
    const atual = location.pathname.split("/").pop() || "index.html";
    const links = MENU.map(([r, h]) => {
      const pagina = h.split("?")[0];
      const ativo = !h.includes("?") && pagina === atual ? ' aria-current="page"' : "";
      return `<a href="${h}"${ativo}>${r}</a>`;
    }).join("");
    return `
    <header class="cabecalho">
      <div class="container cabecalho__linha">
        <button class="acao-icone btn-menu-mobile" id="abrir-menu" aria-label="Abrir menu">${ic.menu}</button>
        ${logo()}
        <nav class="menu" aria-label="Menu principal">${links}</nav>
        <form class="busca" role="search" action="catalogo.html" method="get">
          <label class="sr-only" for="campo-busca">Buscar produtos</label>
          <input id="campo-busca" type="search" name="q" placeholder="Buscar camisas, clubes, seleções…" autocomplete="off">
          <button type="submit" aria-label="Buscar">${ic.busca}</button>
        </form>
        <div class="acoes">
          <a class="acao-icone acao-icone--conta" href="contato.html" aria-label="Atendimento e conta">${ic.conta}</a>
          <a class="acao-icone" href="catalogo.html?fav=1" aria-label="Favoritos">${ic.coracao}<span class="contador" id="cont-fav"></span></a>
          <a class="acao-icone" href="carrinho.html" data-abrir-carrinho aria-label="Carrinho">${ic.sacola}<span class="contador" id="cont-carrinho"></span></a>
        </div>
      </div>
    </header>
    <div class="menu-mobile" id="menu-mobile">
      <div class="menu-mobile__fundo" data-fechar-menu></div>
      <nav class="menu-mobile__painel" aria-label="Menu mobile">
        <button class="acao-icone" data-fechar-menu aria-label="Fechar menu" style="align-self:flex-end">${ic.fechar}</button>
        ${MENU.map(([r, h]) => `<a href="${h}">${r}</a>`).join("")}
        <a href="contato.html">Contato</a>
      </nav>
    </div>`;
  }

  function gaveta() {
    return `
    <div class="gaveta" id="gaveta" aria-hidden="false">
      <div class="gaveta__fundo"></div>
      <aside class="gaveta__painel" role="dialog" aria-label="Carrinho de compras">
        <div class="gaveta__topo"><h2 class="titulo-md">Seu carrinho</h2>
          <button class="acao-icone" data-fechar-gaveta aria-label="Fechar carrinho">${ic.fechar}</button></div>
        <div class="gaveta__lista" id="gaveta-lista"></div>
        <div class="gaveta__rodape" id="gaveta-botoes">
          <div class="gaveta__total"><span>Subtotal</span><span class="preco" id="gaveta-total">R$ 0,00</span></div>
          <p class="texto-pequeno">Frete e descontos calculados na próxima etapa.</p>
          <a class="btn btn--primario btn--bloco" href="carrinho.html">Finalizar pedido ${ic.seta}</a>
        </div>
      </aside>
    </div>
    <div class="modal-tabela" id="rapido"><div class="modal-tabela__caixa"></div></div>
    <div class="toasts" id="toasts" aria-live="polite"></div>`;
  }

  function rodape() {
    const wa = U.linkWhats(`Olá! Vim pelo site da ${cfg.nome}.`);
    return `
    <footer class="rodape">
      <div class="container">
        <div class="rodape__grade">
          <div class="rodape__marca">${logo()}
            <p>Camisas, agasalhos e estilo para quem vive o futebol todos os dias.</p>
            <div class="rodape__redes">
              <a href="${U.esc(cfg.instagram)}" target="_blank" rel="noopener" aria-label="Instagram">${ic.instagram}</a>
              <a href="${wa}" target="_blank" rel="noopener" aria-label="WhatsApp">${ic.whats.replace("<svg", '<svg style="fill:currentColor;stroke:none"')}</a>
              <a href="mailto:${U.esc(cfg.email)}" aria-label="E-mail">${ic.email}</a>
            </div>
          </div>
          <div><h4>Institucional</h4><ul>
            <li><a href="marca.html">Nossa marca</a></li>
            <li><a href="catalogo.html">Todos os produtos</a></li>
            <li><a href="catalogo.html?ordem=novidades">Novidades</a></li>
            <li><a href="contato.html">Fale conosco</a></li></ul></div>
          <div><h4>Ajuda</h4><ul>
            <li><a href="politicas.html#privacidade">Política de privacidade</a></li>
            <li><a href="politicas.html#trocas">Trocas e devoluções</a></li>
            <li><a href="politicas.html#entrega">Informações de entrega</a></li>
            <li><a href="politicas.html#termos">Termos de uso</a></li></ul></div>
          <div><h4>Atendimento</h4><ul>
            <li><a href="${wa}" target="_blank" rel="noopener">WhatsApp</a></li>
            <li><a href="mailto:${U.esc(cfg.email)}">${U.esc(cfg.email)}</a></li>
            <li class="texto-pequeno">${U.esc(cfg.horarioAtendimento)}</li></ul>
            <h4 class="mt-3">Pagamento</h4>
            <div class="rodape__pagamentos">${cfg.formasPagamento.map((f) => `<span>${U.esc(f)}</span>`).join("")}</div>
          </div>
        </div>
        <div class="rodape__base">
          <span>© ${new Date().getFullYear()} ${U.esc(cfg.razaoSocial)} · CNPJ ${U.esc(cfg.cnpj)} · ${U.esc(cfg.endereco)}</span>
          <span>Todas as marcas citadas pertencem a seus respectivos donos.</span>
        </div>
      </div>
    </footer>
    <a class="whats-flutuante" href="${wa}" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">${ic.whats.replace("<svg", "<svg")}</a>`;
  }

  /* Contadores do cabeçalho (carrinho e favoritos) */
  function atualizarContadores() {
    const c = document.getElementById("cont-carrinho");
    const f = document.getElementById("cont-fav");
    if (c) { const n = Liming.carrinho.quantidadeTotal(); c.textContent = n || ""; c.dataset.n = n; }
    if (f) { const n = Liming.favoritos.total(); f.textContent = n || ""; f.dataset.n = n; }
  }

  function ligarMenuMobile() {
    const m = document.getElementById("menu-mobile");
    document.getElementById("abrir-menu").addEventListener("click", () => m.classList.add("aberto"));
    m.addEventListener("click", (e) => { if (e.target.closest("[data-fechar-menu]")) m.classList.remove("aberto"); });
  }

  function montar() {
    const set = (id, h) => { const el = document.getElementById(id); if (el) el.innerHTML = h; };
    set("barra-superior", barraSuperior());
    set("cabecalho", cabecalho());
    set("rodape", rodape());
    const extra = document.createElement("div");
    extra.innerHTML = gaveta();
    document.body.appendChild(extra);
    ligarMenuMobile();
    Liming.gaveta.iniciar();
    Liming.card.ligarEventos();
    atualizarContadores();
    document.addEventListener("liming:carrinho", atualizarContadores);
    document.addEventListener("liming:favoritos", atualizarContadores);
    /* Preenche a busca com o termo atual */
    const q = U.param("q"); const campo = document.getElementById("campo-busca");
    if (q && campo) campo.value = q;
  }

  return { montar };
})();
