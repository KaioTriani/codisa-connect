export interface Product {
  id: string;
  name: string;
  code: string;
  ean: string;
  brand: string;
  category: string;
  subcategory: string;
  packaging: string;
  unitsPerBox: number;
  wholesalePrice: number;
  promoPrice: number | null;
  stock: number;
  image: string;
  description: string;
  active: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: string[];
}

export const categories: Category[] = [
  { id: "alimentos", name: "Alimentos", icon: "🍚", subcategories: ["Açúcar", "Biscoitos", "Cereais", "Chocolates", "Conservas", "Doces", "Farinhas", "Grãos", "Massas", "Óleos", "Refrescos", "Temperos", "Laticínios"] },
  { id: "limpeza", name: "Limpeza", icon: "🧹", subcategories: ["Detergentes", "Desinfetantes", "Produtos Higiênicos"] },
  { id: "refrigerados", name: "Refrigerados", icon: "❄️", subcategories: ["Carnes Frias", "Sorvetes", "Congelados"] },
  { id: "bebidas", name: "Bebidas", icon: "🥤", subcategories: ["Água", "Refrigerantes", "Sucos", "Energéticos"] },
  { id: "combos", name: "Combos", icon: "📦", subcategories: ["Combos Promocionais"] },
  { id: "lancamentos", name: "Lançamentos", icon: "🆕", subcategories: ["Novidades"] },
];

const img = (name: string) => `https://images.unsplash.com/photo-${name}?w=400&h=400&fit=crop`;

export const products: Product[] = [
  // ALIMENTOS - Açúcar
  { id: "1", name: "Açúcar Cristal União 1kg", code: "ACU001", ean: "7891910000197", brand: "União", category: "alimentos", subcategory: "Açúcar", packaging: "Pacote 1kg", unitsPerBox: 10, wholesalePrice: 4.29, promoPrice: 3.89, stock: 500, image: img("1558618666-fcd25c85f4aa"), description: "Açúcar cristal de alta qualidade", active: true },
  { id: "2", name: "Açúcar Refinado Caravelas 1kg", code: "ACU002", ean: "7896894900017", brand: "Caravelas", category: "alimentos", subcategory: "Açúcar", packaging: "Pacote 1kg", unitsPerBox: 10, wholesalePrice: 4.59, promoPrice: null, stock: 300, image: img("1558618666-fcd25c85f4aa"), description: "Açúcar refinado premium", active: true },

  // ALIMENTOS - Biscoitos
  { id: "3", name: "Biscoito Cream Cracker Vitarella 400g", code: "BIS001", ean: "7896085075018", brand: "Vitarella", category: "alimentos", subcategory: "Biscoitos", packaging: "Pacote 400g", unitsPerBox: 20, wholesalePrice: 3.99, promoPrice: 3.49, stock: 800, image: img("1558961363-fa8fdf82db35"), description: "Biscoito cream cracker crocante", active: true },
  { id: "4", name: "Biscoito Recheado Bauducco Chocolate 140g", code: "BIS002", ean: "7891962037615", brand: "Bauducco", category: "alimentos", subcategory: "Biscoitos", packaging: "Pacote 140g", unitsPerBox: 48, wholesalePrice: 2.19, promoPrice: 1.89, stock: 1200, image: img("1558961363-fa8fdf82db35"), description: "Biscoito recheado sabor chocolate", active: true },
  { id: "5", name: "Biscoito Wafer Bauducco Morango 140g", code: "BIS003", ean: "7891962037622", brand: "Bauducco", category: "alimentos", subcategory: "Biscoitos", packaging: "Pacote 140g", unitsPerBox: 48, wholesalePrice: 2.49, promoPrice: null, stock: 600, image: img("1558961363-fa8fdf82db35"), description: "Wafer crocante sabor morango", active: true },

  // ALIMENTOS - Massas
  { id: "6", name: "Miojo Nissin Lámen Galinha 85g", code: "MAS001", ean: "7891079008508", brand: "Nissin", category: "alimentos", subcategory: "Massas", packaging: "Pacote 85g", unitsPerBox: 50, wholesalePrice: 1.29, promoPrice: 0.99, stock: 2000, image: img("1612929633738-8b44f8c17e2e"), description: "Macarrão instantâneo sabor galinha", active: true },
  { id: "7", name: "Miojo Nissin Lámen Carne 85g", code: "MAS002", ean: "7891079008515", brand: "Nissin", category: "alimentos", subcategory: "Massas", packaging: "Pacote 85g", unitsPerBox: 50, wholesalePrice: 1.29, promoPrice: 0.99, stock: 1800, image: img("1612929633738-8b44f8c17e2e"), description: "Macarrão instantâneo sabor carne", active: true },
  { id: "8", name: "Macarrão Espaguete Vitarella 500g", code: "MAS003", ean: "7896085088261", brand: "Vitarella", category: "alimentos", subcategory: "Massas", packaging: "Pacote 500g", unitsPerBox: 20, wholesalePrice: 3.49, promoPrice: null, stock: 700, image: img("1612929633738-8b44f8c17e2e"), description: "Macarrão espaguete de sêmola", active: true },

  // ALIMENTOS - Óleos
  { id: "9", name: "Óleo de Soja Soya 900ml", code: "OLE001", ean: "7891080000195", brand: "Soya", category: "alimentos", subcategory: "Óleos", packaging: "Garrafa 900ml", unitsPerBox: 20, wholesalePrice: 7.99, promoPrice: 6.99, stock: 400, image: img("1474979266404-7f28e4cf1810"), description: "Óleo de soja refinado", active: true },
  { id: "10", name: "Azeite de Oliva Gallo 500ml", code: "OLE002", ean: "5601252105007", brand: "Gallo", category: "alimentos", subcategory: "Óleos", packaging: "Garrafa 500ml", unitsPerBox: 12, wholesalePrice: 24.90, promoPrice: null, stock: 200, image: img("1474979266404-7f28e4cf1810"), description: "Azeite de oliva extra virgem", active: true },

  // ALIMENTOS - Cereais
  { id: "11", name: "Arroz Tipo 1 Tio João 5kg", code: "CER001", ean: "7893500018506", brand: "Tio João", category: "alimentos", subcategory: "Cereais", packaging: "Pacote 5kg", unitsPerBox: 6, wholesalePrice: 24.90, promoPrice: 21.90, stock: 350, image: img("1586201375761-83865001e8ac"), description: "Arroz agulhinha tipo 1", active: true },
  { id: "12", name: "Feijão Carioca Kicaldo 1kg", code: "CER002", ean: "7896116900012", brand: "Kicaldo", category: "alimentos", subcategory: "Grãos", packaging: "Pacote 1kg", unitsPerBox: 10, wholesalePrice: 7.49, promoPrice: 6.49, stock: 500, image: img("1586201375761-83865001e8ac"), description: "Feijão carioca selecionado", active: true },

  // ALIMENTOS - Chocolates
  { id: "13", name: "Chocolate Nestlé Classic 90g", code: "CHO001", ean: "7891000100103", brand: "Nestlé", category: "alimentos", subcategory: "Chocolates", packaging: "Barra 90g", unitsPerBox: 14, wholesalePrice: 5.99, promoPrice: 4.99, stock: 600, image: img("1511381939415-e44015fb59d3"), description: "Barra de chocolate ao leite", active: true },
  { id: "14", name: "Achocolatado Nescau 400g", code: "CHO002", ean: "7891000100202", brand: "Nestlé", category: "alimentos", subcategory: "Chocolates", packaging: "Lata 400g", unitsPerBox: 24, wholesalePrice: 8.49, promoPrice: 7.49, stock: 400, image: img("1511381939415-e44015fb59d3"), description: "Achocolatado em pó", active: true },

  // ALIMENTOS - Temperos
  { id: "15", name: "Caldo Knorr Galinha 57g", code: "TEM001", ean: "7891150001558", brand: "Knorr", category: "alimentos", subcategory: "Temperos", packaging: "Caixa 57g", unitsPerBox: 10, wholesalePrice: 1.99, promoPrice: null, stock: 1000, image: img("1596040033229-a9821ebd058d"), description: "Caldo de galinha em tablete", active: true },
  { id: "16", name: "Tempero Sazon 60g", code: "TEM002", ean: "7891132001439", brand: "Ajinomoto", category: "alimentos", subcategory: "Temperos", packaging: "Caixa 60g", unitsPerBox: 48, wholesalePrice: 2.79, promoPrice: 2.29, stock: 900, image: img("1596040033229-a9821ebd058d"), description: "Tempero para arroz, feijão e carnes", active: true },

  // ALIMENTOS - Conservas
  { id: "17", name: "Extrato de Tomate Elefante 340g", code: "CON001", ean: "7896036094570", brand: "Elefante", category: "alimentos", subcategory: "Conservas", packaging: "Lata 340g", unitsPerBox: 24, wholesalePrice: 5.99, promoPrice: 4.99, stock: 500, image: img("1534483509821-4e404e712b20"), description: "Extrato de tomate concentrado", active: true },
  { id: "18", name: "Milho Verde Quero 200g", code: "CON002", ean: "7896102500110", brand: "Quero", category: "alimentos", subcategory: "Conservas", packaging: "Lata 200g", unitsPerBox: 24, wholesalePrice: 3.49, promoPrice: null, stock: 400, image: img("1534483509821-4e404e712b20"), description: "Milho verde em conserva", active: true },

  // ALIMENTOS - Farinhas
  { id: "19", name: "Farinha de Trigo Dona Benta 1kg", code: "FAR001", ean: "7896005212547", brand: "Dona Benta", category: "alimentos", subcategory: "Farinhas", packaging: "Pacote 1kg", unitsPerBox: 10, wholesalePrice: 4.99, promoPrice: 4.29, stock: 600, image: img("1574323347407-f5e1ad6d020b"), description: "Farinha de trigo especial", active: true },
  { id: "20", name: "Farinha de Mandioca Pinduca 500g", code: "FAR002", ean: "7896063200017", brand: "Pinduca", category: "alimentos", subcategory: "Farinhas", packaging: "Pacote 500g", unitsPerBox: 20, wholesalePrice: 3.99, promoPrice: null, stock: 350, image: img("1574323347407-f5e1ad6d020b"), description: "Farinha de mandioca torrada", active: true },

  // ALIMENTOS - Laticínios
  { id: "21", name: "Leite Condensado Moça 395g", code: "LAT001", ean: "7891000100400", brand: "Nestlé", category: "alimentos", subcategory: "Laticínios", packaging: "Lata 395g", unitsPerBox: 24, wholesalePrice: 7.99, promoPrice: 6.99, stock: 500, image: img("1550583724-b2692b85b150"), description: "Leite condensado", active: true },
  { id: "22", name: "Creme de Leite Nestlé 200g", code: "LAT002", ean: "7891000100500", brand: "Nestlé", category: "alimentos", subcategory: "Laticínios", packaging: "Caixa 200g", unitsPerBox: 24, wholesalePrice: 3.49, promoPrice: 2.99, stock: 600, image: img("1550583724-b2692b85b150"), description: "Creme de leite UHT", active: true },

  // ALIMENTOS - Refrescos
  { id: "23", name: "Refresco Tang Laranja 25g", code: "REF001", ean: "7622210566980", brand: "Tang", category: "alimentos", subcategory: "Refrescos", packaging: "Sachê 25g", unitsPerBox: 15, wholesalePrice: 0.99, promoPrice: 0.79, stock: 2000, image: img("1534353473418-4cfa6c56fd68"), description: "Refresco em pó sabor laranja", active: true },
  { id: "24", name: "Refresco Tang Maracujá 25g", code: "REF002", ean: "7622210566997", brand: "Tang", category: "alimentos", subcategory: "Refrescos", packaging: "Sachê 25g", unitsPerBox: 15, wholesalePrice: 0.99, promoPrice: null, stock: 1500, image: img("1534353473418-4cfa6c56fd68"), description: "Refresco em pó sabor maracujá", active: true },

  // LIMPEZA - Detergentes
  { id: "25", name: "Detergente Ypê 500ml Neutro", code: "LIM001", ean: "7896098900017", brand: "Ypê", category: "limpeza", subcategory: "Detergentes", packaging: "Frasco 500ml", unitsPerBox: 24, wholesalePrice: 2.29, promoPrice: 1.89, stock: 1000, image: img("1585421514284-fce18d4e2fc4"), description: "Detergente líquido neutro", active: true },
  { id: "26", name: "Detergente Ypê 500ml Limão", code: "LIM002", ean: "7896098900024", brand: "Ypê", category: "limpeza", subcategory: "Detergentes", packaging: "Frasco 500ml", unitsPerBox: 24, wholesalePrice: 2.29, promoPrice: null, stock: 800, image: img("1585421514284-fce18d4e2fc4"), description: "Detergente líquido limão", active: true },
  { id: "27", name: "Sabão em Pó Ypê 1kg", code: "LIM003", ean: "7896098900031", brand: "Ypê", category: "limpeza", subcategory: "Detergentes", packaging: "Caixa 1kg", unitsPerBox: 20, wholesalePrice: 8.99, promoPrice: 7.49, stock: 500, image: img("1585421514284-fce18d4e2fc4"), description: "Sabão em pó multiação", active: true },

  // LIMPEZA - Desinfetantes
  { id: "28", name: "Desinfetante Pinho Sol 500ml", code: "LIM004", ean: "7891024135020", brand: "Pinho Sol", category: "limpeza", subcategory: "Desinfetantes", packaging: "Frasco 500ml", unitsPerBox: 12, wholesalePrice: 4.99, promoPrice: null, stock: 400, image: img("1585421514284-fce18d4e2fc4"), description: "Desinfetante pinho original", active: true },
  { id: "29", name: "Água Sanitária Qboa 1L", code: "LIM005", ean: "7896098920015", brand: "Qboa", category: "limpeza", subcategory: "Desinfetantes", packaging: "Frasco 1L", unitsPerBox: 12, wholesalePrice: 3.49, promoPrice: 2.99, stock: 600, image: img("1585421514284-fce18d4e2fc4"), description: "Água sanitária para limpeza geral", active: true },

  // LIMPEZA - Produtos Higiênicos
  { id: "30", name: "Papel Higiênico Personal 12 rolos", code: "HIG001", ean: "7896110030012", brand: "Personal", category: "limpeza", subcategory: "Produtos Higiênicos", packaging: "Pacote 12 rolos", unitsPerBox: 4, wholesalePrice: 12.90, promoPrice: 10.90, stock: 300, image: img("1585421514284-fce18d4e2fc4"), description: "Papel higiênico folha dupla", active: true },
  { id: "31", name: "Creme Dental Colgate 90g", code: "HIG002", ean: "7891024130025", brand: "Colgate", category: "limpeza", subcategory: "Produtos Higiênicos", packaging: "Tubo 90g", unitsPerBox: 12, wholesalePrice: 3.99, promoPrice: 3.29, stock: 700, image: img("1585421514284-fce18d4e2fc4"), description: "Creme dental máxima proteção", active: true },
  { id: "32", name: "Sabonete Lux 85g", code: "HIG003", ean: "7891150029170", brand: "Lux", category: "limpeza", subcategory: "Produtos Higiênicos", packaging: "Barra 85g", unitsPerBox: 12, wholesalePrice: 2.49, promoPrice: null, stock: 800, image: img("1585421514284-fce18d4e2fc4"), description: "Sabonete em barra fragrâncias", active: true },

  // LIMPEZA - Bombril
  { id: "33", name: "Esponja de Aço Bombril 8un", code: "LIM006", ean: "7891022101089", brand: "Bombril", category: "limpeza", subcategory: "Detergentes", packaging: "Pacote 8un", unitsPerBox: 14, wholesalePrice: 3.49, promoPrice: 2.89, stock: 500, image: img("1585421514284-fce18d4e2fc4"), description: "Lã de aço para limpeza pesada", active: true },

  // BEBIDAS
  { id: "34", name: "Coca-Cola 2L", code: "BEB001", ean: "7894900010015", brand: "Coca-Cola", category: "bebidas", subcategory: "Refrigerantes", packaging: "Garrafa 2L", unitsPerBox: 6, wholesalePrice: 8.99, promoPrice: 7.99, stock: 500, image: img("1629203851122-3726ecdf080e"), description: "Refrigerante Coca-Cola", active: true },
  { id: "35", name: "Guaraná Antarctica 2L", code: "BEB002", ean: "7891991010023", brand: "Antarctica", category: "bebidas", subcategory: "Refrigerantes", packaging: "Garrafa 2L", unitsPerBox: 6, wholesalePrice: 7.49, promoPrice: 6.49, stock: 400, image: img("1629203851122-3726ecdf080e"), description: "Refrigerante guaraná", active: true },
  { id: "36", name: "Água Mineral Indaiá 500ml", code: "BEB003", ean: "7896065885503", brand: "Indaiá", category: "bebidas", subcategory: "Água", packaging: "Garrafa 500ml", unitsPerBox: 12, wholesalePrice: 1.29, promoPrice: null, stock: 2000, image: img("1548839140-29a749e1cf4d"), description: "Água mineral sem gás", active: true },
  { id: "37", name: "Suco Del Valle Uva 1L", code: "BEB004", ean: "7894900530018", brand: "Del Valle", category: "bebidas", subcategory: "Sucos", packaging: "Caixa 1L", unitsPerBox: 12, wholesalePrice: 5.99, promoPrice: 4.99, stock: 350, image: img("1534353473418-4cfa6c56fd68"), description: "Suco de uva integral", active: true },
  { id: "38", name: "Energético Red Bull 250ml", code: "BEB005", ean: "9002490100070", brand: "Red Bull", category: "bebidas", subcategory: "Energéticos", packaging: "Lata 250ml", unitsPerBox: 24, wholesalePrice: 8.99, promoPrice: null, stock: 300, image: img("1629203851122-3726ecdf080e"), description: "Bebida energética", active: true },

  // REFRIGERADOS
  { id: "39", name: "Presunto Cozido Sadia 200g", code: "FRI001", ean: "7893000592018", brand: "Sadia", category: "refrigerados", subcategory: "Carnes Frias", packaging: "Pacote 200g", unitsPerBox: 12, wholesalePrice: 7.99, promoPrice: 6.99, stock: 200, image: img("1551028150-64b9f398f678"), description: "Presunto cozido fatiado", active: true },
  { id: "40", name: "Salsicha Hot Dog Perdigão 500g", code: "FRI002", ean: "7891515437015", brand: "Perdigão", category: "refrigerados", subcategory: "Carnes Frias", packaging: "Pacote 500g", unitsPerBox: 24, wholesalePrice: 5.49, promoPrice: 4.49, stock: 300, image: img("1551028150-64b9f398f678"), description: "Salsicha tipo hot dog", active: true },
  { id: "41", name: "Sorvete Kibon 1.5L Napolitano", code: "FRI003", ean: "7891150045170", brand: "Kibon", category: "refrigerados", subcategory: "Sorvetes", packaging: "Pote 1.5L", unitsPerBox: 4, wholesalePrice: 19.90, promoPrice: 16.90, stock: 150, image: img("1497034825429-c343d7c6a68f"), description: "Sorvete napolitano", active: true },

  // COMBOS
  { id: "42", name: "Combo Família Básico", code: "COM001", ean: "0000000000421", brand: "CODISA", category: "combos", subcategory: "Combos Promocionais", packaging: "Kit", unitsPerBox: 1, wholesalePrice: 89.90, promoPrice: 74.90, stock: 100, image: img("1604719312952-2e3eaaecaaac"), description: "Arroz 5kg + Feijão 1kg + Açúcar 1kg + Óleo 900ml + Macarrão 500g + Farinha 1kg", active: true },
  { id: "43", name: "Combo Limpeza Total", code: "COM002", ean: "0000000000438", brand: "CODISA", category: "combos", subcategory: "Combos Promocionais", packaging: "Kit", unitsPerBox: 1, wholesalePrice: 49.90, promoPrice: 39.90, stock: 80, image: img("1585421514284-fce18d4e2fc4"), description: "Detergente + Sabão em Pó + Desinfetante + Água Sanitária + Esponja", active: true },
  { id: "44", name: "Combo Café da Manhã", code: "COM003", ean: "0000000000445", brand: "CODISA", category: "combos", subcategory: "Combos Promocionais", packaging: "Kit", unitsPerBox: 1, wholesalePrice: 59.90, promoPrice: 49.90, stock: 60, image: img("1558961363-fa8fdf82db35"), description: "Café + Leite + Biscoito + Achocolatado + Açúcar", active: true },

  // LANÇAMENTOS
  { id: "45", name: "Café Especial 3 Corações Gourmet 250g", code: "LAN001", ean: "7896005800256", brand: "3 Corações", category: "lancamentos", subcategory: "Novidades", packaging: "Pacote 250g", unitsPerBox: 10, wholesalePrice: 14.90, promoPrice: 12.90, stock: 200, image: img("1559056199-641a0ac8b55e"), description: "Café torrado e moído gourmet", active: true },
  { id: "46", name: "Biscoito Integral Mabel Granola 130g", code: "LAN002", ean: "7896071025300", brand: "Mabel", category: "lancamentos", subcategory: "Novidades", packaging: "Pacote 130g", unitsPerBox: 40, wholesalePrice: 3.49, promoPrice: null, stock: 400, image: img("1558961363-fa8fdf82db35"), description: "Biscoito integral com granola", active: true },

  // More products for variety
  { id: "47", name: "Leite UHT Parmalat 1L", code: "LAT003", ean: "7891097000016", brand: "Parmalat", category: "alimentos", subcategory: "Laticínios", packaging: "Caixa 1L", unitsPerBox: 12, wholesalePrice: 5.49, promoPrice: 4.79, stock: 800, image: img("1550583724-b2692b85b150"), description: "Leite integral UHT", active: true },
  { id: "48", name: "Café Pilão 500g", code: "ALI001", ean: "7896089011500", brand: "Pilão", category: "alimentos", subcategory: "Cereais", packaging: "Pacote 500g", unitsPerBox: 10, wholesalePrice: 12.90, promoPrice: 10.90, stock: 450, image: img("1559056199-641a0ac8b55e"), description: "Café torrado e moído tradicional", active: true },
  { id: "49", name: "Margarina Qualy 500g", code: "LAT004", ean: "7891515901530", brand: "Qualy", category: "alimentos", subcategory: "Laticínios", packaging: "Pote 500g", unitsPerBox: 12, wholesalePrice: 6.99, promoPrice: 5.99, stock: 400, image: img("1550583724-b2692b85b150"), description: "Margarina cremosa com sal", active: true },
  { id: "50", name: "Molho de Tomate Heinz 340g", code: "CON003", ean: "7896102500202", brand: "Heinz", category: "alimentos", subcategory: "Conservas", packaging: "Sachê 340g", unitsPerBox: 24, wholesalePrice: 3.99, promoPrice: 3.29, stock: 600, image: img("1534483509821-4e404e712b20"), description: "Molho de tomate tradicional", active: true },
];

export const suppliers = [
  { name: "Colgate", logo: "🪥" },
  { name: "Nestlé", logo: "🍫" },
  { name: "Ypê", logo: "🧴" },
  { name: "Bombril", logo: "🧽" },
  { name: "Bauducco", logo: "🍪" },
  { name: "Nissin", logo: "🍜" },
  { name: "Coca-Cola", logo: "🥤" },
  { name: "Sadia", logo: "🍗" },
  { name: "Perdigão", logo: "🌭" },
  { name: "União", logo: "🍬" },
  { name: "Knorr", logo: "🍲" },
  { name: "Tang", logo: "🧃" },
  { name: "Pilão", logo: "☕" },
  { name: "Kibon", logo: "🍦" },
  { name: "3 Corações", logo: "❤️" },
];
