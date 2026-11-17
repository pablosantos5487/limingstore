# 06 · Checklists

## Implementação
- [ ] Editar `js/config/loja.config.js` (WhatsApp, e-mail, Instagram, CNPJ, razão social, endereço, URL).
- [ ] Trocar produtos de exemplo em `js/dados/produtos.js` (nome, grupo, preço, estoque, descrição).
- [ ] Colocar fotos em `assets/img/` e preencher `imagens` de cada produto.
- [ ] (Opcional) foto do banner em `--hero-imagem`.
- [ ] Ajustar cupom, frete por região, frete grátis e parcelas.
- [ ] Revisar textos de `marca.html` e `politicas.html` (com advogado).
- [ ] Trocar `SEU-USUARIO` em robots, sitemap e canonical; regerar sitemap.
- [ ] Preencher `avaliacoes` e `postsInstagram` apenas com conteúdo real.

## Testes antes de publicar
- [ ] Todas as páginas abrem sem erro no console (F12).
- [ ] Tamanho obrigatório bloqueia a compra; esgotado não deixa adicionar; estoque máximo respeitado.
- [ ] Carrinho: adicionar, remover, +/−, cupom válido e inválido, frete por CEP, frete grátis.
- [ ] Checkout: campos vazios mostram erros; com tudo certo abre o WhatsApp com a mensagem correta.
- [ ] Filtros e ordenação do catálogo; busca do cabeçalho; favoritos.
- [ ] Celular real: menu, filtros, carrinho, botão de compra fixo, sem rolagem horizontal.
- [ ] Navegação por teclado e leitor de tela (foco visível, `aria-label`).
- [ ] Lighthouse (Chrome) com boas notas de desempenho, acessibilidade e SEO.
- [ ] Links do rodapé e do WhatsApp funcionando.

## Publicação (GitHub Pages)
- [ ] Repositório criado e arquivos enviados na raiz.
- [ ] Settings → Pages → `main` / root.
- [ ] Site abre na URL pública; `404.html` aparece em endereço inexistente.
- [ ] (Opcional) domínio próprio + HTTPS ativo.
- [ ] Search Console + sitemap enviados.
