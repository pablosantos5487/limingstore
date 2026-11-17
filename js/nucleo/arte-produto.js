/* ==========================================================================
   js/nucleo/arte-produto.js
   Desenhos em SVG (camisa, casaco, calça, short) usados como IMAGEM DE EXEMPLO
   quando o produto ainda não tem foto real. Sem direitos autorais, sem arquivos.
   Quando você colocar fotos em produto.imagens, elas substituem estes desenhos.
   ========================================================================== */
window.Liming = window.Liming || {};

Liming.arte = (() => {
  let contador = 0;

  const FORMAS = {
    camisa: "M62 18 L86 10 Q100 32 114 10 L138 18 L186 56 L166 88 L146 74 L146 188 L54 188 L54 74 L34 88 L14 56 Z",
    casaco: "M60 16 L84 8 Q100 26 116 8 L140 16 L190 60 L174 150 L148 150 L148 190 L52 190 L52 150 L26 150 L10 60 Z",
    calca:  "M52 12 L148 12 L156 192 L108 192 L100 78 L92 192 L44 192 Z",
    short:  "M44 40 L156 40 L170 150 L112 150 L100 96 L88 150 L30 150 Z",
  };

  /* Retorna string SVG. Opções: { tipo, cores:[c1,c2], estilo, numero, vista } */
  function svg({ tipo = "camisa", cores = ["#2d323b", "#ffffff"], estilo = "liso", numero = "", vista = "frente" }) {
    const id = "f" + ++contador;
    const [c1, c2] = cores;
    const forma = FORMAS[tipo] || FORMAS.camisa;
    let decor = "";

    if (estilo === "listras") {
      for (let x = 54; x < 150; x += 24) decor += `<rect x="${x}" y="0" width="12" height="200" fill="${c2}" opacity=".9"/>`;
    } else if (estilo === "faixa") {
      decor = `<rect x="0" y="82" width="200" height="22" fill="${c2}" opacity=".95"/>`;
    } else if (estilo === "metade") {
      decor = `<rect x="100" y="0" width="100" height="200" fill="${c2}" opacity=".95"/>`;
    }

    let detalhes = "";
    if (tipo === "camisa" || tipo === "casaco") {
      detalhes += `<path d="M86 10 Q100 32 114 10" fill="none" stroke="${c2}" stroke-width="5" stroke-linecap="round"/>`;
    }
    if (tipo === "casaco") detalhes += `<line x1="100" y1="26" x2="100" y2="190" stroke="${c2}" stroke-width="3" opacity=".8"/>`;
    if (tipo === "calca" || tipo === "short") detalhes += `<rect x="40" y="${tipo === "short" ? 40 : 12}" width="120" height="10" fill="${c2}" opacity=".9"/>`;

    let num = "";
    if (numero && tipo === "camisa") {
      const y = vista === "costas" ? 112 : 78;
      num = `<text x="100" y="${y}" text-anchor="middle" font-family="Anton, Impact, sans-serif" font-size="${vista === "costas" ? 64 : 30}" fill="${estilo === "metade" ? "#111" : c2}" stroke="rgba(0,0,0,.25)" stroke-width="1">${numero}</text>`;
    }

    return `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true">
      <defs><clipPath id="${id}"><path d="${forma}"/></clipPath>
      <linearGradient id="${id}s" x1="0" x2="1"><stop offset="0" stop-color="#000" stop-opacity=".28"/><stop offset=".5" stop-color="#fff" stop-opacity=".07"/><stop offset="1" stop-color="#000" stop-opacity=".3"/></linearGradient></defs>
      <path d="${forma}" fill="${c1}"/>
      <g clip-path="url(#${id})">${decor}<rect width="200" height="200" fill="url(#${id}s)"/></g>
      ${detalhes}${num}
      <path d="${forma}" fill="none" stroke="rgba(0,0,0,.35)" stroke-width="1.5"/>
    </svg>`;
  }

  /* Imagem do produto: foto real (se houver) ou desenho */
  function midia(p, indice = 0) {
    if (p.imagens && p.imagens[indice]) {
      const alt = Liming.utils.esc(`${p.nome} — foto ${indice + 1}`);
      return `<img src="${Liming.utils.esc(p.imagens[indice])}" alt="${alt}" loading="lazy" decoding="async">`;
    }
    return svg({ tipo: p.tipo, cores: p.cores, estilo: p.estilo, numero: p.numero, vista: indice === 1 ? "costas" : "frente" });
  }

  /* Quantas vistas a galeria mostra */
  function totalVistas(p) {
    if (p.imagens && p.imagens.length) return p.imagens.length;
    return p.tipo === "camisa" && p.numero ? 2 : 1;
  }

  return { svg, midia, totalVistas };
})();
