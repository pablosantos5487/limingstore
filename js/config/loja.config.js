/* ==========================================================================
   js/config/loja.config.js
   >>> ÚNICO ARQUIVO QUE VOCÊ PRECISA EDITAR PARA PERSONALIZAR A LOJA <<<
   Dados da loja, contatos, frete, parcelamento, cupons, avaliações e Instagram.
   ========================================================================== */
window.Liming = window.Liming || {};

Liming.config = {
  /* ---------- Identidade ---------- */
  nome: "Liming Store",
  slogan: "Vista sua paixão pelo futebol.",
  /* Troque pelo endereço real quando publicar (usado em SEO, sitemap, links). */
  urlSite: "https://SEU-USUARIO.github.io/liming-store",

  /* ---------- Contato (TROQUE pelos dados reais) ---------- */
  whatsapp: "5500000000000",           // só números: 55 + DDD + número
  email: "contato@seudominio.com.br",
  instagram: "https://www.instagram.com/SEU_PERFIL",
  horarioAtendimento: "Seg a Sex, 9h às 18h · Sáb, 9h às 13h",
  cnpj: "00.000.000/0001-00",          // exigido por lei na loja virtual (Decreto 7.962/13)
  razaoSocial: "Liming Store LTDA",
  endereco: "Cidade/UF",

  /* ---------- Barra superior (mensagens rolando) ---------- */
  mensagensBarra: [
    "Frete para todo o Brasil",
    "Pix, cartão e condições especiais",
    "Novidades e lançamentos toda semana",
  ],

  /* ---------- Preços e pagamento ---------- */
  parcelasMax: 6,                      // parcelas sem juros exibidas nos cards
  parcelaMinima: 30,                   // valor mínimo de cada parcela (R$)
  descontoPix: 5,                      // % exibido no resumo (0 para ocultar)
  formasPagamento: ["Pix", "Cartão de crédito", "Boleto"],

  /* ---------- Frete (ESTIMATIVA por região do CEP) ----------
     O valor final é confirmado pelo atendimento. Troque pelas suas tabelas
     ou, no futuro, por uma API (Melhor Envio, Correios). Veja docs/03. */
  freteGratisAcima: 299,               // R$ — frete grátis (0 para desativar)
  fretePorRegiao: {
    // primeiro dígito do CEP → { valor, prazo (dias úteis) }
    "0": { valor: 24.9, prazo: "3 a 6" }, "1": { valor: 24.9, prazo: "3 a 6" },
    "2": { valor: 27.9, prazo: "4 a 7" }, "3": { valor: 27.9, prazo: "4 a 7" },
    "4": { valor: 32.9, prazo: "5 a 9" }, "5": { valor: 32.9, prazo: "5 a 9" },
    "6": { valor: 39.9, prazo: "7 a 12" }, "7": { valor: 34.9, prazo: "5 a 9" },
    "8": { valor: 27.9, prazo: "4 a 7" }, "9": { valor: 29.9, prazo: "4 a 8" },
  },

  /* ---------- Cupons (EXEMPLO — edite ou apague) ---------- */
  cupons: {
    BEMVINDO10: { tipo: "percentual", valor: 10, descricao: "10% na primeira compra" },
  },

  /* ---------- Avaliações REAIS ----------
     Deixe vazio até ter depoimentos autorizados. NÃO invente avaliações.
     Formato: { nome: "Maria S.", nota: 5, comentario: "...", produto: "Nome" } */
  avaliacoes: [],

  /* ---------- Instagram ----------
     Cole URLs de posts reais e (opcional) imagens da pasta assets/img.
     Formato: { link: "https://instagram.com/p/XXXX", imagem: "assets/img/post1.jpg" } */
  postsInstagram: [],

  /* ---------- Formulário de contato ----------
     Opcional: endpoint do Formspree (https://formspree.io) para receber por e-mail.
     Vazio = o formulário abre o WhatsApp com a mensagem pronta. */
  formspreeEndpoint: "",
};
