import { Product, StoreHours } from './types';

export const STORE_LOCATION = {
  lat: -21.7669432,
  lng: -48.178177,
  address: 'R. Humaitá, 1785 - Vila Harmonia, Araraquara - SP, 14801-385',
  name: 'HL | Multimarcas - Vila Harmonia',
  phone: '+55 (16) 99762-3841',
  email: 'contato@hlmultimarcas.com.br'
};

export const STORE_HOURS: StoreHours[] = [
  { day: 'Segunda a Sexta', hours: '09:00 às 18:30' },
  { day: 'Sábado', hours: '09:00 às 13:00' },
  { day: 'Domingo', hours: 'Fechado' }
];

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Blazer Alfaiataria Cremoso Rose',
    price: 389.90,
    category: 'formal',
    brand: 'Morena Rosa',
    description: 'Blazer de alfaiataria premium estruturado com ombreiras sutis e corte acinturado. Ideal para transitar do ambiente corporativo para um evento casual elegante.',
    imageUrl: 'https://picsum.photos/seed/roseblazer/600/800',
    colors: ['Rosê', 'Off-White', 'Preto'],
    sizes: ['P', 'M', 'G'],
    isFeatured: true
  },
  {
    id: 'p2',
    name: 'Vestido Midi Fluido Floral Harmonia',
    price: 429.90,
    category: 'casual',
    brand: 'Le Lis Blanc',
    description: 'Vestido midi em crepe com estampa floral exclusiva Vila Harmonia, decote em V transpassado e cinto faixa para ajuste perfeito na cintura.',
    imageUrl: 'https://picsum.photos/seed/floralmidi/600/800',
    colors: ['Floral Lavanda', 'Floral Peach'],
    sizes: ['PP', 'P', 'M', 'G'],
    isFeatured: true
  },
  {
    id: 'p3',
    name: 'Calça Clochard Linho Premium',
    price: 269.90,
    category: 'casual',
    brand: 'Cantão',
    description: 'Calça modelo clochard em tecido plano de linho e viscose. Acompanha cinto do mesmo tecido, bolsos faca funcionais e bainha dobrável estilosa.',
    imageUrl: 'https://picsum.photos/seed/linhopants/600/800',
    colors: ['Areia', 'Verde Oliva', 'Preto'],
    sizes: ['36', '38', '40', '42'],
    isFeatured: false
  },
  {
    id: 'p4',
    name: 'Camisa Seda Pura Gola Laço',
    price: 349.90,
    category: 'formal',
    brand: 'Morena Rosa',
    description: 'Camisa confeccionada em toque de seda pura de alta gramatura, caimento levemente transparente com gola de amarração em laço clássico e punhos franceses.',
    imageUrl: 'https://picsum.photos/seed/silkshirt/600/800',
    colors: ['Off-White', 'Azul Serenity', 'Vinho'],
    sizes: ['P', 'M', 'G', 'GG'],
    isFeatured: true
  },
  {
    id: 'p5',
    name: 'Vestido Longo Plissado Festa Imperial',
    price: 789.90,
    category: 'festa',
    brand: 'Le Lis Blanc',
    description: 'Vestido longo de festa com saia plissada exuberante, busto estruturado drapeado e alças finas reguláveis. Peça dos seus sonhos para casamentos e formaturas.',
    imageUrl: 'https://picsum.photos/seed/festa-plissado/600/800',
    colors: ['Esmeralda', 'Royal Blue', 'Marsala'],
    sizes: ['P', 'M', 'G'],
    isFeatured: true
  },
  {
    id: 'p6',
    name: 'Brinco Cascata de Pérolas Barrocas',
    price: 129.90,
    category: 'acessorios',
    brand: 'HL Acessórios',
    description: 'Brinco banhado a ouro 18k com acabamento escovado, decorado com pérolas barrocas naturais pendentes em cascata orgânica de alta joalheria.',
    imageUrl: 'https://picsum.photos/seed/baroquepearls/600/800',
    colors: ['Dourado/Branco'],
    sizes: ['Único'],
    isFeatured: false
  },
  {
    id: 'p7',
    name: 'Sandália Salto Bloco Couro Soft',
    price: 319.90,
    category: 'calcados',
    brand: 'Schutz',
    description: 'Sandália salto grosso bloco (7cm) em couro legítimo extremamente macio, palmilha anatômica inteligente Confort e tira elástica de ajuste traseiro.',
    imageUrl: 'https://picsum.photos/seed/leatherheels/600/800',
    colors: ['Nude', 'Caramelo', 'Preto'],
    sizes: ['35', '36', '37', '38', '39'],
    isFeatured: false
  },
  {
    id: 'p8',
    name: 'Blusa Crepe Decote Degagê',
    price: 189.90,
    category: 'casual',
    brand: 'Cantão',
    description: 'Blusa delicada em crepe toque suave, com charmosa gola boba degagê e alças duplas acetinadas. Uma obra curinga e fresca para qualquer combinação.',
    imageUrl: 'https://picsum.photos/seed/crepeshirt/600/800',
    colors: ['Nude', 'Preto', 'Coral'],
    sizes: ['P', 'M', 'G'],
    isFeatured: false
  }
];
