
# 🏢 CODISA Atacadista Distribuidor — Plano de Implementação

## Visão Geral
Site institucional completo com catálogo atacadista, sistema de pedidos via WhatsApp, login empresarial, e portal corporativo. Identidade visual em azul escuro (#003366), verde (#008000) e branco, com design moderno e profissional.

---

## Fase 1: Estrutura Base e Identidade Visual

### Layout Global
- **Header** com logo CODISA, menu de navegação (Home, Sobre, Produtos, Combos, Fornecedores, Trabalhe Conosco, Contato) e botões de Login/Cadastro
- **Menu hamburger** responsivo para mobile
- **Footer** com informações de contato, redes sociais, endereço e links rápidos
- **Botão flutuante do WhatsApp** em todas as páginas
- Paleta de cores: azul escuro, verde, branco, cinza claro
- Design mobile-first, totalmente responsivo

### Página Inicial (Home)
- Banner principal rotativo com slogan "Melhores preços e condições!"
- Seção de destaques por categoria (Alimentos, Limpeza, Refrigerados, Bebidas)
- Produtos em destaque e lançamentos
- Área de marcas parceiras (Colgate, Bauducco, Nissin, etc.)
- CTA "Faça seu pedido agora"
- Popup de cadastro para ofertas/newsletter

---

## Fase 2: Páginas Institucionais

### Sobre Nós
- História da empresa desde 1999 (25+ anos)
- Missão, visão e valores
- Área de atuação na Paraíba
- Google Maps embarcado com localização
- Galeria de fotos da empresa

### Fornecedores
- Grid de logos de marcas parceiras (Colgate, Nestlé, Ypê, Bombril, Bauducco, Nissin, etc.)
- Logos clicáveis com informações sobre a parceria

### Contato
- Formulário (nome, email, telefone, mensagem)
- Telefones clicáveis (+55 83 3231-2333 / 3231-7700)
- Link direto para Instagram @codisaatacadista
- Integração com WhatsApp
- Mapa com endereço

---

## Fase 3: Backend com Supabase (Banco de Dados)

### Tabelas do banco de dados
- **Produtos**: nome, código, EAN, marca, categoria, subcategoria, embalagem, qtd por caixa, preço atacadista, preço promocional, estoque, imagem, descrição, status
- **Categorias e Subcategorias**: Alimentos, Limpeza, Refrigerados, Bebidas, Combos, Lançamentos
- **Usuários/Perfis**: nome, email, telefone, CNPJ, tipo de acesso
- **Pedidos e Itens**: histórico de pedidos gerados
- **Currículos**: registros do "Trabalhe Conosco"
- **Fornecedores**: logos e dados dos parceiros
- **Ofertas**: promoções ativas

### Dados iniciais
- 50 a 100 produtos mockados nas categorias principais
- Categorias e subcategorias pré-cadastradas

---

## Fase 4: Catálogo de Produtos

### Listagem de Produtos
- Grid de produtos com imagem, nome, marca, preço atacadista e preço promocional
- **Filtros** por categoria, subcategoria, marca e faixa de preço
- **Busca com autocomplete**
- **Paginação** com lazy loading
- **Breadcrumbs** para navegação
- Preços visíveis para todos os visitantes

### Página de Produto
- Imagem ampliada, descrição completa
- Informações técnicas (EAN, embalagem, qtd por caixa)
- Botão "Adicionar ao carrinho"

### Combos
- Página dedicada para combos promocionais

---

## Fase 5: Carrinho e Pedido via WhatsApp

### Carrinho de Compras
- Sidebar ou página de carrinho
- Adicionar/remover produtos e ajustar quantidades
- Total estimado calculado automaticamente
- Botão "Finalizar Pedido"

### Geração de Pedido
- Sistema gera mensagem formatada automaticamente com lista de produtos, quantidades e total
- Redireciona para WhatsApp (+55 83 3231-2333) com a mensagem pré-formatada
- Pedido salvo no banco de dados

---

## Fase 6: Autenticação e Área do Cliente

### Login e Cadastro
- Cadastro com: nome, email, telefone, CNPJ, senha
- Login seguro via Supabase Auth
- Proteção de rotas autenticadas

### Área do Cliente (logado)
- Histórico de pedidos
- Ofertas exclusivas
- Dados do perfil editáveis

---

## Fase 7: Trabalhe Conosco

- Formulário: nome, email, telefone, cargo desejado
- Upload de currículo (PDF/DOCX) via Supabase Storage
- Registro salvo no banco de dados
- Confirmação visual de envio

---

## Fase 8: Melhorias e Otimizações

- SEO otimizado (meta tags, títulos, descrições em português)
- Newsletter com captura de emails
- Performance (lazy loading de imagens, otimização de assets)
- LGPD: aviso de cookies e política de privacidade
- Validação e sanitização de todos os formulários
