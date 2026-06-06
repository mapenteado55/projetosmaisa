import React from 'react';
import { Product } from '../types';
import { ShoppingBag, Eye, Heart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onViewDetails: (p: Product) => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
  onAddToBag: (product: Product, size: string) => void;
  key?: string;
}

export default function ProductCard({
  product,
  onViewDetails,
  onToggleWishlist,
  isWishlisted,
  onAddToBag
}: ProductCardProps) {
  
  // Choose first size as default for quick bag addition
  const defaultSize = product.sizes[0] || 'M';

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-stone-200 hover:border-rose-400 transition-all duration-300 shadow-sm hover:shadow-md flex flex-col">
      {/* Product Image Stage */}
      <div className="relative aspect-[3/4] bg-stone-100 overflow-hidden shrink-0">
        <img
          src={product.imageUrl}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Feature Tag */}
        {product.isFeatured && (
          <div className="absolute top-3 left-3 bg-stone-900/90 text-white text-[9px] font-sans font-medium uppercase tracking-[0.16em] py-1 px-2.5 rounded-full backdrop-blur-sm">
            Curadoria Especial
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={() => onToggleWishlist(product.id)}
          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
            isWishlisted
              ? 'bg-rose-50 border-rose-100 text-rose-600'
              : 'bg-white/80 backdrop-blur-sm border-stone-200 text-stone-600 hover:bg-white hover:text-rose-600'
          }`}
        >
          <Heart size={15} fill={isWishlisted ? 'currentColor' : 'none'} className="transition-transform duration-300 active:scale-125" />
        </button>

        {/* Quick hover panel actions */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-stone-900/40 to-transparent translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex gap-2">
          <button
            onClick={() => onViewDetails(product)}
            className="flex-1 bg-white hover:bg-rose-50 text-stone-900 font-sans font-medium text-xs py-2 px-3 rounded-lg flex items-center justify-center gap-1.5 transition shadow"
          >
            <Eye size={14} className="text-stone-700" />
            Ver Detalhes
          </button>
          
          <button
            onClick={() => onAddToBag(product, defaultSize)}
            className="bg-stone-900 hover:bg-stone-950 text-white p-2 rounded-lg transition shadow"
            title="Adicionar à sacola rápida"
          >
            <ShoppingBag size={15} />
          </button>
        </div>
      </div>

      {/* Item metadata details */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1">
          <span className="text-[10px] text-rose-700 uppercase tracking-widest font-sans font-medium">
            {product.brand}
          </span>
          <h4
            onClick={() => onViewDetails(product)}
            className="font-serif text-sm font-medium text-stone-900 hover:text-rose-700 cursor-pointer transition line-clamp-1"
          >
            {product.name}
          </h4>
          <p className="text-xs text-stone-500 font-sans line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>

        <div className="pt-2 border-t border-stone-100 flex items-center justify-between">
          <div className="space-y-0.5">
            <span className="text-xs text-stone-400 font-sans">Valor</span>
            <div className="font-serif text-base font-semibold text-stone-950">
              R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>
          
          <div className="flex gap-1">
            {product.colors.slice(0, 2).map((col, idx) => (
              <span
                key={idx}
                className="inline-block px-1.5 py-0.5 rounded text-[8px] font-sans font-medium uppercase border bg-stone-50 border-stone-200 text-stone-500"
              >
                {col}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
