# Liming Store — E-commerce de moda esportiva e futebol

Loja virtual **100% estática** (HTML + CSS + JavaScript puro). Sem Wix, sem servidor, sem build:
abra o `index.html` ou publique direto no **GitHub Pages**.

## Como a loja funciona (importante)
- **Catálogo, filtros, busca, favoritos e carrinho** funcionam no navegador do cliente.
- **Fechamento do pedido:** o cliente preenche os dados e o pedido vai pronto para o **WhatsApp** da loja.
  O atendimento confirma estoque e envia o link/QR de pagamento (Pix, cartão, boleto).
  Nenhum pagamento é simulado e nenhuma compra é dada como concluída sem confirmação real.
- Para ter pagamento automático dentro do site no futuro, veja `docs/03-funcionalidades.md` (seção "Evoluir").

## Estrutura de pastas

```
liming-store/
├── index.html            Home (12 seções)
├── catalogo.html         Catálogo com filtros e ordenação
├── produto.html          Página individual do produto
├── carrinho.html         Carrinho + dados de entrega + envio do pedido
├── marca.html            Nossa marca
├── contato.html          Contato (WhatsApp / e-mail / formulário)
├── politicas.html        Privacidade, trocas, entrega, termos (modelo)
├── 404.html              Página de erro (GitHub Pages usa automaticamente)
├── robots.txt · sitemap.xml · .nojekyll
│
├── css/
│   ├── main.css          Importa tudo na ordem certa
│   ├── 01-base/          variáveis (cores/fontes), reset, tipografia, utilidades
│   ├── 02-layout/        container, barra superior, cabeçalho, rodapé
│   ├── 03-componentes/   botões, formulários, card de produto, carrinho lateral, toast, selos
│   ├── 04-paginas/       home, catálogo, produto, carrinho, institucional
│   └── 05-responsivo/    tablet e celular
│
├── js/
│   ├── app.js            Ponto de entrada
│   ├── config/           loja.config.js  ← EDITE AQUI (WhatsApp, frete, cupons...)
│   ├── dados/            produtos.js ← EDITE AQUI (catálogo) · categorias.js
│   ├── nucleo/           carrinho, favoritos, layout (menu/rodapé), gaveta, cards, utilidades
│   └── paginas/          um script por página
│
├── assets/img/           Suas fotos (favicon já incluso)
└── docs/                 Documentação do projeto (marca, arquitetura, SEO, checklists)
```

## Personalizar em 4 passos
1. `js/config/loja.config.js` → WhatsApp (só números), e-mail, Instagram, CNPJ, razão social, URL do site.
2. `js/dados/produtos.js` → troque os 16 produtos de **exemplo** pelos reais e coloque as fotos em `assets/img/` (campo `imagens`).
3. `css/01-base/variaveis.css` → cores e fontes. Para foto no banner: `--hero-imagem: url("../assets/img/hero.jpg");`
4. Troque `SEU-USUARIO` pela URL real em: `loja.config.js`, `robots.txt`, `sitemap.xml` e na tag `canonical` dos HTML.

## Publicar no GitHub Pages
1. Crie um repositório e envie esta pasta (raiz do repositório = esta pasta).
2. Settings → Pages → Source: *Deploy from a branch* → `main` / `/ (root)`.
3. Em alguns minutos o site fica em `https://SEU-USUARIO.github.io/NOME-DO-REPO/`.
4. Domínio próprio: Settings → Pages → Custom domain.

## Testar localmente
Dê dois cliques no `index.html`, ou rode `python3 -m http.server 8000` na pasta e abra `http://localhost:8000`.

## Direitos de imagem
Os desenhos de camisas são ilustrações geradas em SVG (sem direitos de terceiros). Use fotos de produtos
próprias ou licenciadas. Nomes de clubes, seleções e marcas pertencem a seus titulares.
