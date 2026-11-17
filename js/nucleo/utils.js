/* js/nucleo/utils.js — funções pequenas de apoio (formatar preço, ler URL, etc.) */
window.Liming = window.Liming || {};

Liming.utils = {
  /* R$ 1.234,56 */
  moeda(v) {
    return Number(v).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
  },
  /* Preço efetivo (promo quando existir) */
  precoFinal(p) { return p.promo != null ? p.promo : p.preco; },
  /* Texto "6x de R$ 36,65 sem juros" respeitando parcela mínima */
  parcelamento(valor) {
    const { parcelasMax, parcelaMinima } = Liming.config;
    let n = Math.min(parcelasMax, Math.floor(valor / parcelaMinima));
    if (n < 2) return "";
    return `${n}x de ${this.moeda(valor / n)} sem juros`;
  },
  descontoPct(p) {
    return p.promo != null ? Math.round((1 - p.promo / p.preco) * 100) : 0;
  },
  estoqueTotal(p) { return Object.values(p.estoque).reduce((a, b) => a + b, 0); },
  /* Escapa texto antes de inserir em HTML (segurança contra XSS) */
  esc(t) {
    return String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  },
  param(nome) { return new URLSearchParams(location.search).get(nome); },
  produtoPorId(id) { return Liming.produtos.find((p) => p.id === Number(id)); },
  produtoPorSlug(s) { return Liming.produtos.find((p) => p.slug === s); },
  categoriaPorSlug(s) { return Liming.categorias.find((c) => c.slug === s); },
  /* Link wa.me com mensagem pronta */
  linkWhats(texto) {
    return `https://wa.me/${Liming.config.whatsapp}?text=${encodeURIComponent(texto || "")}`;
  },
  somenteNumeros(t) { return String(t || "").replace(/\D/g, ""); },
};
