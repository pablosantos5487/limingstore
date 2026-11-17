/* js/dados/categorias.js — categorias da loja (cards da Home e filtros do catálogo) */
window.Liming = window.Liming || {};

Liming.categorias = [
  { slug: "camisas",   numero: "09", nome: "Camisas de futebol",  desc: "Clubes nacionais e internacionais.", arte: "camisa" },
  { slug: "selecoes",  numero: "10", nome: "Camisas de seleções", desc: "Vista as cores do seu país.",        arte: "camisa" },
  { slug: "retro",     numero: "07", nome: "Camisas retrô",       desc: "Clássicos que viraram história.",     arte: "camisa" },
  { slug: "casacos",   numero: "11", nome: "Casacos e jaquetas",  desc: "Estilo para dentro e fora do estádio.", arte: "casaco" },
  { slug: "agasalhos", numero: "08", nome: "Conjuntos de agasalho", desc: "Look completo, do aquecimento à rua.", arte: "calca" },
  { slug: "moda",      numero: "05", nome: "Moda esportiva",      desc: "Camisetas, moletons, shorts e acessórios.", arte: "short" },
];

/* Tabela de medidas (cm) mostrada na página do produto */
Liming.tabelaTamanhos = {
  cabecalho: ["Tamanho", "Peito", "Comprimento"],
  linhas: [
    ["P",  "96 – 100", "68"],
    ["M",  "101 – 106", "70"],
    ["G",  "107 – 112", "72"],
    ["GG", "113 – 120", "74"],
    ["XG", "121 – 128", "76"],
  ],
  nota: "Medidas aproximadas do produto (peça deitada). Dúvida? Chame no WhatsApp.",
};
