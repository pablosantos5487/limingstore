/* ==========================================================================
   js/app.js — PONTO DE ENTRADA
   Monta o layout comum e executa o script da página atual.
   Cada HTML declara qual é a sua página em <body data-pagina="home">.
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
  Liming.layout.montar();
  const pagina = document.body.dataset.pagina;
  if (pagina && Liming.paginas && typeof Liming.paginas[pagina] === "function") Liming.paginas[pagina]();
  Liming.ui.revelar();
});
