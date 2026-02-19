
-- Adicionar política de admin para visualizar todos os pedidos
CREATE POLICY "Admins see all pedidos"
ON public.pedidos
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Admins podem atualizar status dos pedidos
CREATE POLICY "Admins update pedidos"
ON public.pedidos
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Admins podem ver todos os itens de pedidos
CREATE POLICY "Admins see all pedido_itens"
ON public.pedido_itens
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Admins podem atualizar produtos (estoque via import)
CREATE POLICY "Admins update produtos"
ON public.produtos
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Admins podem ver todos os perfis
CREATE POLICY "Admins see all profiles"
ON public.profiles
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));
