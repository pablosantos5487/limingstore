# 03 · Funcionalidades, catálogo, carrinho e checkout

## Catálogo (`js/paginas/catalogo.js`)
Filtros: categoria, clube/seleção/linha, tamanho (só mostra o que tem estoque), faixa de preço, busca e favoritos.
Ordenação: relevância, mais vendidos, novidades, menor e maior preço. O estado vai para a URL (link compartilhável).

## Produto (`js/paginas/produto.js`)
Galeria com miniaturas e zoom, preço/promoção/parcelas/Pix, **tamanho obrigatório**, tamanhos esgotados bloqueados,
**trava de estoque por combinação** (inclui o que já está no carrinho), quantidade, ADICIONAR AO CARRINHO, COMPRAR AGORA,
estimativa de frete por CEP, tabela de medidas, relacionados e **JSON-LD de Product** gerado automaticamente.

## Carrinho (`js/nucleo/carrinho.js`)
Adicionar, remover, alterar quantidade (respeitando estoque), subtotal, cupom, frete por região do CEP, total, preço no Pix.
Salvo no `localStorage` do cliente.

## Checkout (`js/paginas/carrinho.js`)
Formulário com validação (nome, telefone, e-mail, endereço, pagamento, aceite LGPD) → mensagem de pedido formatada → WhatsApp.
O carrinho **não** é esvaziado automaticamente e a tela avisa que a compra só vale após confirmação do pagamento.

## Limitações honestas de um site estático
- **Estoque** fica em `produtos.js`: você atualiza manualmente (ou via GitHub) e o atendimento reconfirma no pedido.
- **Frete** é estimativa por região; o final é confirmado no atendimento.
- **Pagamento** acontece fora do site (link/QR enviado pelo atendimento).
- Dados do cliente não são guardados em servidor algum (bom para LGPD).

## Evoluir para pagamento automático (quando quiser)
| Necessidade | Caminho sem perder a hospedagem estática |
|---|---|
| Pagamento no site | **Mercado Pago Checkout Pro** ou **Stripe Payment Links** (um link por produto) / backend serverless (Cloudflare Workers, Netlify/Vercel Functions) para criar a cobrança |
| Frete real | API do **Melhor Envio** chamada por função serverless (nunca coloque tokens no JavaScript do site) |
| Estoque em tempo real | Planilha/banco (Supabase, Firebase) lido por função serverless |
| Formulário por e-mail | Preencha `formspreeEndpoint` no config |

Regra de segurança: **chaves secretas jamais vão para o GitHub nem para o navegador.** Use variáveis de ambiente do serviço serverless.
