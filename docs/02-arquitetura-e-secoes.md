# 02 · Arquitetura do site e seções

## Mapa de páginas
```
index.html ─┬─ catalogo.html (?categoria= &grupo= &tam= &min= &max= &ordem= &q= &fav=1)
            ├─ produto.html?p=<slug> ── carrinho.html (pedido via WhatsApp)
            ├─ marca.html
            ├─ contato.html
            └─ politicas.html (#privacidade #trocas #entrega #termos)
```

## Onde cada coisa é montada
| Peça | Arquivo |
|---|---|
| Barra superior, cabeçalho, menu mobile, rodapé, WhatsApp flutuante | `js/nucleo/layout.js` (edite o menu aqui) |
| Carrinho lateral e "adicionar rápido" | `js/nucleo/gaveta.js` |
| Card de produto (usado em todas as vitrines) | `js/nucleo/card-produto.js` + `css/03-componentes/card-produto.css` |
| Desenhos SVG de exemplo | `js/nucleo/arte-produto.js` |

## Home: 12 seções (`index.html` + `js/paginas/home.js`)
1. **Barra superior**: frete, pagamento, novidades (texto em `loja.config.js`).
2. **Cabeçalho**: logo, menu, busca, conta/contato, favoritos, carrinho.
3. **Banner principal**: "VISTA SUA PAIXÃO PELO FUTEBOL." + botão EXPLORAR COLEÇÃO.
4. **Categorias**: 6 cards "escalação" (camisas, seleções, retrô, casacos, agasalhos, moda).
5. **Mais vendidos**: 8 produtos por campo `vendas`.
6. **Coleção de camisas**: abas Todas / Clubes / Seleções / Retrô.
7. **Moda esportiva**: casacos, moletons, agasalhos.
8. **Novidades**: produtos com selo NOVO / LANÇAMENTO / EDIÇÃO ESPECIAL.
9. **Identidade da marca**: texto institucional + botão CONHEÇA NOSSA MARCA.
10. **Avaliações**: só reais (`avaliacoes` no config). Vazio = convite para avaliar, nada inventado.
11. **Instagram**: posts reais (`postsInstagram` no config) + botão para o perfil.
12. **Rodapé**: institucional, políticas, atendimento, pagamentos, redes, CNPJ.

## Responsividade
Breakpoints: ≤1024px (tablet) e ≤680px (celular). No celular: menu lateral, busca em linha própria, filtros em tela cheia, grade de 2 colunas, botão de compra fixo no rodapé do produto, WhatsApp flutuante.
