# 05 · Segurança, LGPD e exigências legais

## Segurança já aplicada
- Todo texto vindo de dados é escapado antes de entrar no HTML (`Liming.utils.esc`), evitando XSS.
- Links externos com `rel="noopener"`.
- Validação de formulários (carrinho e contato) e campo anti-robô (honeypot) no contato.
- Sem chaves de API no código. Nenhum dado de cartão passa pelo site.
- localStorage protegido com fallback se o navegador bloquear.

## Antes de publicar (obrigatório no e-commerce brasileiro)
- **Identificação do fornecedor** visível: razão social, CNPJ, endereço e contato (Decreto 7.962/2013). Preencha em `loja.config.js` (aparece no rodapé).
- **Informações claras** de preço, frete, prazo, formas de pagamento e política de troca.
- **Direito de arrependimento** de 7 dias (CDC art. 49): modelo em `politicas.html`.
- **LGPD:** política de privacidade publicada, aceite no checkout/contato, canal para o titular pedir exclusão de dados.
- **Revisão jurídica** dos textos de `politicas.html` (são modelos).
- **Direitos de imagem e marca:** só venda e divulgue itens que pode legalmente comercializar; use fotos próprias/licenciadas.
- **Avaliações:** publique somente depoimentos reais e autorizados (por isso o config começa vazio).

## Boas práticas no GitHub
- Não versione tokens, senhas nem planilhas de clientes.
- Se o repositório for público, todo o conteúdo (preços e estoque) é público. Isso é normal em vitrine, mas dados de clientes nunca devem ir para lá.
