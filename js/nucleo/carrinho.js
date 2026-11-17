/* ==========================================================================
   js/nucleo/carrinho.js — LÓGICA DO CARRINHO
   Guarda os itens no navegador do cliente (localStorage) e calcula subtotal,
   cupom, frete e total. Valida estoque por tamanho antes de aceitar o item.
   Importante: por ser um site estático, o estoque é validado no navegador e
   reconfirmado pelo atendimento no fechamento do pedido (veja docs/03).
   ========================================================================== */
window.Liming = window.Liming || {};

Liming.carrinho = (() => {
  const CH_ITENS = "liming:carrinho";
  const CH_CUPOM = "liming:cupom";
  const CH_CEP = "liming:cep";
  const A = Liming.armazenamento;
  const U = Liming.utils;

  let itens = A.ler(CH_ITENS, []);

  function salvar() {
    A.gravar(CH_ITENS, itens);
    document.dispatchEvent(new CustomEvent("liming:carrinho"));
  }

  function qtdNoCarrinho(id, tamanho) {
    const i = itens.find((x) => x.id === id && x.tamanho === tamanho);
    return i ? i.qtd : 0;
  }

  /* Adiciona item. Retorna { ok, msg } */
  function adicionar(id, tamanho, qtd = 1) {
    const p = U.produtoPorId(id);
    if (!p) return { ok: false, msg: "Produto não encontrado." };
    if (!tamanho || !(tamanho in p.estoque)) return { ok: false, msg: "Selecione um tamanho para continuar." };
    const disponivel = p.estoque[tamanho] - qtdNoCarrinho(id, tamanho);
    if (p.estoque[tamanho] <= 0) return { ok: false, msg: `Tamanho ${tamanho} esgotado.` };
    if (qtd > disponivel) {
      return { ok: false, msg: disponivel <= 0 ? "Você já tem todo o estoque desse tamanho no carrinho." : `Só há mais ${disponivel} unidade(s) disponível(is).` };
    }
    const existente = itens.find((x) => x.id === id && x.tamanho === tamanho);
    if (existente) existente.qtd += qtd; else itens.push({ id, tamanho, qtd });
    salvar();
    return { ok: true, msg: `${p.nome} (${tamanho}) adicionado ao carrinho.` };
  }

  function alterarQtd(id, tamanho, delta) {
    const i = itens.find((x) => x.id === id && x.tamanho === tamanho);
    if (!i) return { ok: false };
    const p = U.produtoPorId(id);
    const nova = i.qtd + delta;
    if (nova <= 0) { remover(id, tamanho); return { ok: true }; }
    if (nova > p.estoque[tamanho]) return { ok: false, msg: `Estoque máximo para este tamanho: ${p.estoque[tamanho]}.` };
    i.qtd = nova;
    salvar();
    return { ok: true };
  }

  function remover(id, tamanho) {
    itens = itens.filter((x) => !(x.id === id && x.tamanho === tamanho));
    salvar();
  }

  function limpar() { itens = []; salvar(); }

  /* Linhas completas (item + produto + subtotal da linha). Ignora produtos que saíram do catálogo. */
  function linhas() {
    return itens
      .map((i) => {
        const p = U.produtoPorId(i.id);
        return p ? { ...i, produto: p, unit: U.precoFinal(p), subtotal: U.precoFinal(p) * i.qtd } : null;
      })
      .filter(Boolean);
  }

  function quantidadeTotal() { return itens.reduce((s, i) => s + i.qtd, 0); }

  /* ----- Cupom ----- */
  function cupomAtual() { return A.ler(CH_CUPOM, null); }
  function aplicarCupom(codigo) {
    const cod = String(codigo || "").trim().toUpperCase();
    const c = Liming.config.cupons[cod];
    if (!c) return { ok: false, msg: "Cupom inválido ou expirado." };
    A.gravar(CH_CUPOM, cod);
    document.dispatchEvent(new CustomEvent("liming:carrinho"));
    return { ok: true, msg: `Cupom aplicado: ${c.descricao || cod}` };
  }
  function removerCupom() { A.gravar(CH_CUPOM, null); document.dispatchEvent(new CustomEvent("liming:carrinho")); }

  /* ----- Frete (estimativa por região do CEP) ----- */
  function cepAtual() { return A.ler(CH_CEP, ""); }
  function definirCep(cep) {
    const n = U.somenteNumeros(cep);
    if (n.length !== 8) return { ok: false, msg: "Digite um CEP válido com 8 números." };
    A.gravar(CH_CEP, n);
    document.dispatchEvent(new CustomEvent("liming:carrinho"));
    return { ok: true };
  }

  /* ----- Totais ----- */
  function totais() {
    const ls = linhas();
    const subtotal = ls.reduce((s, l) => s + l.subtotal, 0);
    const cod = cupomAtual();
    const cupom = cod ? Liming.config.cupons[cod] : null;
    let desconto = 0;
    if (cupom) desconto = cupom.tipo === "percentual" ? (subtotal * cupom.valor) / 100 : Math.min(cupom.valor, subtotal);
    const base = subtotal - desconto;

    let frete = null, prazo = "";
    const cep = cepAtual();
    if (cep.length === 8 && ls.length) {
      const reg = Liming.config.fretePorRegiao[cep[0]];
      if (reg) {
        const gratis = Liming.config.freteGratisAcima > 0 && base >= Liming.config.freteGratisAcima;
        frete = gratis ? 0 : reg.valor;
        prazo = reg.prazo;
      }
    }
    const total = base + (frete || 0);
    const pix = Liming.config.descontoPix > 0 ? total * (1 - Liming.config.descontoPix / 100) : null;
    return { subtotal, desconto, cupomCodigo: cupom ? cod : null, frete, prazo, total, pix, cep, qtd: quantidadeTotal(), linhas: ls };
  }

  /* Remove do carrinho itens que não existem mais ou passaram do estoque atual */
  function sanear() {
    let mudou = false;
    itens = itens.filter((i) => {
      const p = U.produtoPorId(i.id);
      if (!p || !(i.tamanho in p.estoque) || p.estoque[i.tamanho] <= 0) { mudou = true; return false; }
      if (i.qtd > p.estoque[i.tamanho]) { i.qtd = p.estoque[i.tamanho]; mudou = true; }
      return true;
    });
    if (mudou) salvar();
  }
  sanear();

  return { adicionar, alterarQtd, remover, limpar, linhas, totais, quantidadeTotal, aplicarCupom, removerCupom, cupomAtual, definirCep, cepAtual, qtdNoCarrinho };
})();
