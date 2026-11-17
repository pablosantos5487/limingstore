/* js/nucleo/armazenamento.js — leitura/gravação segura no localStorage
   (se o navegador bloquear, o site continua funcionando em memória) */
window.Liming = window.Liming || {};

Liming.armazenamento = (() => {
  const memoria = {};
  return {
    ler(chave, padrao) {
      try {
        const bruto = localStorage.getItem(chave);
        return bruto ? JSON.parse(bruto) : padrao;
      } catch (e) { return chave in memoria ? memoria[chave] : padrao; }
    },
    gravar(chave, valor) {
      memoria[chave] = valor;
      try { localStorage.setItem(chave, JSON.stringify(valor)); } catch (e) { /* ignora */ }
    },
  };
})();
