# 04 · SEO e conversão

## Já implementado
- `<title>` e `meta description` únicos por página; `canonical`; Open Graph na home.
- Hierarquia: um `h1` por página, `h2` por seção.
- `lang="pt-BR"`, textos alternativos nas imagens reais, links "pular para o conteúdo".
- Dados estruturados: `Store` (home) e `Product` + `Offer` (cada produto, gerado em `produto.js`).
- `sitemap.xml` (home, catálogo, categorias e todos os produtos), `robots.txt`, `404.html`; `carrinho.html` com `noindex`.

## Para fazer ao publicar
1. Trocar `SEU-USUARIO` pela URL real (config, sitemap, robots, canonical).
2. Regerar o sitemap quando adicionar produtos (um `<url>` por `produto.html?p=slug`).
3. Cadastrar o site no Google Search Console e enviar o sitemap.
4. Imagens reais: usar `.webp`, até ~150 KB, com nomes descritivos (`camisa-clube-a-titular.webp`).
5. Observação: a página de produto é montada por JavaScript. O Google renderiza JS, mas se o SEO for prioridade máxima, considere gerar páginas estáticas por produto (um script simples a partir de `produtos.js`).

## Modelo de título/descrição de produto
- Título: `Camisa {Clube} {Titular/Visitante} {Temporada} | Liming Store`
- Descrição: `{Produto} por R$ {preço}. {Material}. Frete para todo o Brasil e até 6x sem juros.`
- URL amigável: `slug` em minúsculas com hífen.

## Conversão (sem poluir o site)
Selo de promoção com % real, "últimas unidades" só quando o estoque é baixo de verdade, parcelamento e Pix visíveis no card, frete grátis acima de valor (config), WhatsApp flutuante, botão de compra fixo no celular, cupom de boas-vindas (edite ou remova em `loja.config.js`).
