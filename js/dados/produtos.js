/* ==========================================================================
   js/dados/produtos.js — CATÁLOGO
   >>> TODOS OS PRODUTOS ABAIXO SÃO DE EXEMPLO (demo: true). <<<
   Substitua pelos seus produtos reais. Nomes de clubes/seleções e marcas são
   propriedade de terceiros: use apenas produtos que você tem direito de vender
   e fotos próprias ou licenciadas.

   Campos:
     id, slug        identificadores únicos (slug vai na URL: produto.html?p=slug)
     nome, grupo     grupo = clube, seleção ou linha (aparece no filtro)
     categoria       camisas | selecoes | retro | casacos | agasalhos | moda
     tipo            camisa | casaco | calca | short | acessorio (define o desenho de exemplo)
     preco, promo    promo = preço promocional (ou null)
     estoque         { P: 5, M: 3 ... }  — quantidade por tamanho (0 = esgotado)
                     Acessórios: { "Único": 10 }
     badge           "novo" | "lancamento" | "especial" | null
     vendas          número usado em "Mais vendidos"
     data            "AAAA-MM-DD" (usado em "Novidades")
     cores           [cor1, cor2] — cores do desenho de exemplo
     estilo          liso | listras | faixa | metade (desenho de exemplo)
     numero          número desenhado na camisa de exemplo
     imagens         ["assets/img/foto1.jpg", ...]  ← fotos reais (substituem o desenho)
   ========================================================================== */
window.Liming = window.Liming || {};

const T = { P: 4, M: 6, G: 6, GG: 3, XG: 2 };           // estoque-padrão de exemplo
const UNICO = { "Único": 12 };

Liming.produtos = [
  { id: 1, slug: "franca-2002-away-retro-jersey-s-xxl", nome: "France 2002 Away Retro Jersey S-XXL", grupo: "França", categoria: "retro", tipo: "camisa",
    preco: 170.0, promo: null, estoque: { P: 0, M: 0, G: 3, GG: 2, XG: 1 }, badge: "especial", vendas: 12, data: "2026-11-16", cores: ["#ffffff", "#1d4ed8"], estilo: "faixa", numero: "10",
    descricao: "Camisa retrô away da França 2002, modelo em edição especial com visual clássico e tecido de qualidade para uso casual ou colecionador.",
    imagens: [
      "https://photo.yupoo.com/limingstore/cc0519b2e5/small.jpg",
      "https://photo.yupoo.com/limingstore/bf6aca942a/small.jpg"
    ] },
  { id: 2, slug: "camisa-clube-a-visitante", nome: "Camisa Clube A — Visitante", grupo: "Clube A", categoria: "camisas", tipo: "camisa",
    preco: 239.9, promo: null, estoque: { P: 0, M: 5, G: 4, GG: 2, XG: 0 }, badge: null, vendas: 61, data: "2026-09-12", cores: ["#f5f6f7", "#c8102e"], estilo: "faixa", numero: "09",
    descricao: "Segundo uniforme com visual limpo. Produto de exemplo." },
  { id: 3, slug: "camisa-clube-b-titular", nome: "Camisa Clube B — Titular", grupo: "Clube B", categoria: "camisas", tipo: "camisa",
    preco: 249.9, promo: null, estoque: { ...T }, badge: "lancamento", vendas: 74, data: "2026-11-08", cores: ["#0b3d91", "#f5c400"], estilo: "metade", numero: "07",
    descricao: "Lançamento da temporada. Produto de exemplo." },
  { id: 4, slug: "camisa-clube-internacional-i", nome: "Camisa Clube Internacional I", grupo: "Clube Internacional", categoria: "camisas", tipo: "camisa",
    preco: 289.9, promo: 259.9, estoque: { ...T }, badge: null, vendas: 112, data: "2026-08-20", cores: ["#ffffff", "#1b1b1b"], estilo: "liso", numero: "11",
    descricao: "Camisa de clube internacional, corte moderno. Produto de exemplo." },
  { id: 5, slug: "camisa-selecao-a-titular", nome: "Camisa Seleção A — Titular", grupo: "Seleção A", categoria: "selecoes", tipo: "camisa",
    preco: 299.9, promo: null, estoque: { ...T }, badge: "especial", vendas: 140, data: "2026-10-02", cores: ["#f2d300", "#0a7d3b"], estilo: "liso", numero: "10",
    descricao: "Edição especial de seleção. Produto de exemplo." },
  { id: 6, slug: "camisa-selecao-b-reserva", nome: "Camisa Seleção B — Reserva", grupo: "Seleção B", categoria: "selecoes", tipo: "camisa",
    preco: 279.9, promo: 249.9, estoque: { ...T }, badge: null, vendas: 55, data: "2026-07-14", cores: ["#1d4ed8", "#ffffff"], estilo: "faixa", numero: "08",
    descricao: "Uniforme reserva de seleção. Produto de exemplo." },
  { id: 7, slug: "camisa-retro-clube-a-1998", nome: "Camisa Retrô Clube A — 1998", grupo: "Clube A", categoria: "retro", tipo: "camisa",
    preco: 229.9, promo: null, estoque: { P: 2, M: 3, G: 3, GG: 1, XG: 0 }, badge: "especial", vendas: 88, data: "2026-06-30", cores: ["#c8102e", "#111111"], estilo: "listras", numero: "09",
    descricao: "Releitura de clássico dos anos 90. Produto de exemplo." },
  { id: 8, slug: "camisa-retro-selecao-a-1994", nome: "Camisa Retrô Seleção A — 1994", grupo: "Seleção A", categoria: "retro", tipo: "camisa",
    preco: 239.9, promo: 209.9, estoque: { ...T }, badge: null, vendas: 120, data: "2026-05-18", cores: ["#f2d300", "#0b3d91"], estilo: "metade", numero: "07",
    descricao: "Camisa clássica de coleção. Produto de exemplo." },
  { id: 9, slug: "jaqueta-corta-vento-grafite", nome: "Jaqueta Corta-Vento Grafite", grupo: "Linha Street", categoria: "casacos", tipo: "casaco",
    preco: 329.9, promo: null, estoque: { ...T }, badge: "novo", vendas: 47, data: "2026-11-05", cores: ["#2d323b", "#d4f53c"], estilo: "faixa", numero: "",
    descricao: "Jaqueta leve com zíper frontal e detalhes em destaque. Produto de exemplo." },
  { id: 10, slug: "casaco-treino-clube-a", nome: "Casaco de Treino Clube A", grupo: "Clube A", categoria: "casacos", tipo: "casaco",
    preco: 299.9, promo: 269.9, estoque: { ...T }, badge: null, vendas: 66, data: "2026-09-03", cores: ["#c8102e", "#111111"], estilo: "liso", numero: "",
    descricao: "Casaco de treino com gola alta. Produto de exemplo." },
  { id: 11, slug: "conjunto-agasalho-preto", nome: "Conjunto de Agasalho Preto", grupo: "Linha Street", categoria: "agasalhos", tipo: "calca",
    preco: 389.9, promo: 349.9, estoque: { ...T }, badge: "lancamento", vendas: 82, data: "2026-11-10", cores: ["#171a1f", "#d4f53c"], estilo: "faixa", numero: "",
    descricao: "Jaqueta + calça em conjunto. Produto de exemplo." },
  { id: 12, slug: "conjunto-agasalho-selecao-a", nome: "Conjunto de Agasalho Seleção A", grupo: "Seleção A", categoria: "agasalhos", tipo: "calca",
    preco: 399.9, promo: null, estoque: { ...T }, badge: null, vendas: 39, data: "2026-08-01", cores: ["#0a7d3b", "#f2d300"], estilo: "faixa", numero: "",
    descricao: "Conjunto oficial de viagem. Produto de exemplo." },
  { id: 13, slug: "moletom-canguru-liming", nome: "Moletom Canguru Liming", grupo: "Linha Street", categoria: "moda", tipo: "casaco",
    preco: 259.9, promo: null, estoque: { ...T }, badge: "novo", vendas: 71, data: "2026-11-12", cores: ["#21252c", "#f5f6f7"], estilo: "liso", numero: "",
    descricao: "Moletom felpado com capuz. Produto de exemplo." },
  { id: 14, slug: "short-esportivo-preto", nome: "Short Esportivo Preto", grupo: "Linha Street", categoria: "moda", tipo: "short",
    preco: 119.9, promo: 99.9, estoque: { ...T }, badge: null, vendas: 90, data: "2026-07-22", cores: ["#111111", "#d4f53c"], estilo: "faixa", numero: "",
    descricao: "Short leve de secagem rápida. Produto de exemplo." },
  { id: 15, slug: "calca-esportiva-jogger", nome: "Calça Esportiva Jogger", grupo: "Linha Street", categoria: "moda", tipo: "calca",
    preco: 179.9, promo: null, estoque: { ...T }, badge: null, vendas: 58, data: "2026-06-10", cores: ["#2d323b", "#8b929d"], estilo: "liso", numero: "",
    descricao: "Calça jogger com punho. Produto de exemplo." },
  { id: 16, slug: "camiseta-esportiva-liming", nome: "Camiseta Esportiva Liming", grupo: "Linha Street", categoria: "moda", tipo: "camisa",
    preco: 99.9, promo: null, estoque: { ...T }, badge: "lancamento", vendas: 44, data: "2026-11-14", cores: ["#f5f6f7", "#111111"], estilo: "liso", numero: "",
    descricao: "Camiseta básica estilo casual. Produto de exemplo." },
];

Liming.produtos.forEach((p) => (p.demo = true));
