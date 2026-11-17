# 01 · Marca e identidade visual

## Conceito
**Liming Store**: para quem vive o futebol além das quatro linhas. Paixão, qualidade, estilo e personalidade.
Frase-guia: **"Vista sua paixão pelo futebol."**

## Diferencial visual (o que torna o site único)
- **Linguagem de campo:** linhas de gramado e círculo central no banner e nos divisores.
- **Números de camisa** gigantes (10, 09, 07…) vazados como elemento gráfico: a "escalação" das categorias.
- **Camisas desenhadas em SVG** geradas por código: cada produto de exemplo tem cores/estilo próprios, sem foto nem direitos autorais.
- **Barra superior em ticker** (rolagem contínua) como placar de estádio.
- **Tipografia de placar:** título condensado, preços em fonte mono.

## Paleta (`css/01-base/variaveis.css`)
| Uso | Cor |
|---|---|
| Base grafite | `#0a0b0d` · `#101216` · `#171a1f` · `#21252c` |
| Cinzas secundários | `#2d323b` · `#5d6572` · `#8b929d` · `#b5bbc4` |
| Branco | `#f5f6f7` |
| **Destaque (botões e chamadas)** | `#d4f53c` (verde-gramado suave) |
| Alerta / OK | `#ff6a4a` / `#3ddc84` |

O destaque aparece só em botões, preços, selos e foco. O resto da interface fica em grafite/cinza.

## Tipografia
- **Anton** — títulos (forte, esportiva). 
- **Inter** — textos (legibilidade). 
- **JetBrains Mono** — preços, selos e rótulos.
Carregadas pelo Google Fonts (link em cada HTML). Para não depender de CDN, baixe as fontes para `assets/fonts/` e use `@font-face`.

## Elementos visuais
Fotos reais de produtos (suas, com direitos), banners de impacto, ícones minimalistas em traço, cards padronizados, animações discretas (respeitam "reduzir movimento" do sistema).
