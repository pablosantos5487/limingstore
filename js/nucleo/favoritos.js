/* js/nucleo/favoritos.js — lista de desejos (salva no navegador) */
window.Liming = window.Liming || {};

Liming.favoritos = (() => {
  const CH = "liming:favoritos";
  let ids = Liming.armazenamento.ler(CH, []);

  function notificar() {
    Liming.armazenamento.gravar(CH, ids);
    document.dispatchEvent(new CustomEvent("liming:favoritos"));
  }
  return {
    lista: () => ids.slice(),
    tem: (id) => ids.includes(id),
    alternar(id) {
      ids = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
      notificar();
      return ids.includes(id);
    },
    total: () => ids.length,
  };
})();
