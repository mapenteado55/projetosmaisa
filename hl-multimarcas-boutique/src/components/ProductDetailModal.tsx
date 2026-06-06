import React, { useState } from 'react';
import { Product } from '../types';
import { ShoppingBag, X, MessageSquare, Heart, ShieldCheck, Truck, RefreshCw } from 'lucide-react';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onToggleWishlist: (productId: string) => void;
  isWishlisted: boolean;
  onAddToBag: (product: Product, size: string) => void;
}

export default function ProductDetailModal({
  product,
  onClose,
  onToggleWishlist,
  isWishlisted,
  onAddToBag
}: ProductDetailModalProps) {
  
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [successMsg, setSuccessMsg] = useState(false);

  if (!product) return null;

  // Pre-select first options
  if (!selectedSize && product.sizes.length > 0) {
    setSelectedSize(product.sizes[0]);
  }
  if (!selectedColor && product.colors.length > 0) {
    setSelectedColor(product.colors[0]);
  }

  // Construct direct WhatsApp URL for ordering
  const phoneNumber = '5516997623841'; // Store phone number formatted
  const whatsappMessage = `Olá HL Multimarcas! Amei o "${product.name}" (${product.brand}) que vi no site no valor de R$ ${product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}. Gostaria de verificar a disponibilidade no tamanho ${selectedSize || 'M'} e cor ${selectedColor || 'padrão'}.`;
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  const handleAddToBagClick = () => {
    onAddToBag(product, selectedSize);
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 2500);
  };

  // Curated matches
  const getStylistMatch = () => {
    switch (product.id) {
      case 'p1': return 'Combina perfeitamente com: Calça Clochard Linho Premium (R$ 269,90) e Blusa Crepe Decote Degagê (R$ 189,90)';
      case 'p2': return 'Combina perfeitamente com: Sandália Salto Bloco Couro Soft Schutz (R$ 319,90)';
      case 'p3': return 'Combina perfeitamente com: Blazer Alfaiataria Rose Cantão (R$ 389,90) ou Camisa Seda Gola Laço';
      case 'p4': return 'Combina perfeitamente com: Calça Clochard Linho (R$ 269,90) e Brinco Cascata de Pérolas';
      case 'p5': return 'Combina perfeitamente com: Brinco Cascata de Pérolas Barrocas (R$ 129,90) de alta joalheria';
      default: return 'Fale com nossa Estilista HL IA no chat lateral para planejar um look personalizado com esta peça!';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-center p-4">
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-100 grid grid-cols-1 md:grid-cols-12 max-h-[90vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-stone-950/20 hover:bg-stone-950/40 text-stone-800 md:text-stone-500 hover:text-stone-900 w-10 h-10 rounded-full flex items-center justify-center transition"
        >
          <X size={20} />
        </button>

        {/* Left Side: Gorgeous product portrait */}
        <div className="md:col-span-6 bg-stone-50 relative aspect-[4/5] md:aspect-auto md:h-full min-h-[300px]">
          <img
            src={product.imageUrl}
            alt={product.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side: Specifications and Actions */}
        <div className="md:col-span-6 p-6 md:p-8 overflow-y-auto flex flex-col justify-between h-full bg-white space-y-6">
          <div className="space-y-4">
            {/* Brand Header */}
            <div>
              <span className="text-rose-700 text-xs tracking-widest uppercase font-sans font-semibold">
                {product.brand}
              </span>
              <h3 className="font-serif text-2xl font-medium text-stone-950 mt-1">
                {product.name}
              </h3>
            </div>

            {/* Price */}
            <div>
              <span className="text-xs text-stone-400 font-sans">Preço Especial</span>
              <div className="font-serif text-3xl font-semibold text-stone-900">
                R$ {product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-stone-600 font-sans leading-relaxed">
              {product.description}
            </p>

            {/* Color grid */}
            <div className="space-y-2">
              <span className="text-xs text-stone-500 font-sans font-medium block">Cores Disponíveis:</span>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((c, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedColor(c)}
                    className={`font-sans text-xs px-3.5 py-1.5 rounded-full border transition-all ${
                      selectedColor === c
                        ? 'bg-rose-50 border-rose-700 text-rose-800 font-medium'
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Sizes selector */}
            <div className="space-y-2">
              <span className="text-xs text-stone-500 font-sans font-medium block">Selecione o seu Tamanho:</span>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSize(s)}
                    className={`font-sans text-xs w-10 h-10 rounded-lg border transition-all flex items-center justify-center ${
                      selectedSize === s
                        ? 'bg-stone-900 border-stone-900 text-white font-medium'
                        : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Stylest Recommendation */}
            <div className="bg-rose-50/70 border border-rose-150 rounded-2xl p-4 mt-3">
              <span className="text-[10px] text-rose-800 uppercase tracking-widest font-semibold block font-sans mb-1">💡 DICA DA PERSONAL STYLIST HL</span>
              <p className="text-xs text-rose-950 font-sans leading-relaxed">
                {getStylistMatch()}
              </p>
            </div>
          </div>

          {/* Checkout & Wishlist Actions */}
          <div className="space-y-3 pt-4 border-t border-stone-100">
            <div className="flex gap-2">
              {/* Add to Bag */}
              <button
                onClick={handleAddToBagClick}
                className="flex-1 bg-stone-900 hover:bg-stone-950 text-white font-sans font-medium text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 transition"
              >
                <ShoppingBag size={16} />
                Adicionar à Sacola
              </button>

              {/* Heart Wishlist toggler */}
              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`w-12 h-12 rounded-xl flex items-center justify-center border transition ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-150 text-rose-600'
                    : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                }`}
                title="Favoritar"
              >
                <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* WhatsApp CTA Action */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-semibold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 transition text-center"
            >
              <MessageSquare size={16} />
              Reservar e Comprar via WhatsApp
            </a>

            {/* Small reassurance block */}
            <div className="grid grid-cols-3 gap-1.5 text-[10px] text-stone-400 font-sans pt-2 text-center">
              <div className="flex flex-col items-center">
                <ShieldCheck size={14} className="text-stone-500 mb-0.5" />
                <span>Garantia Original</span>
              </div>
              <div className="flex flex-col items-center">
                <Truck size={14} className="text-stone-500 mb-0.5" />
                <span>Retirada Exclusiva</span>
              </div>
              <div className="flex flex-col items-center">
                <RefreshCw size={14} className="text-stone-500 mb-0.5" />
                <span>Troca Facilitada</span>
              </div>
            </div>

            {/* Toast feedback addition */}
            {successMsg && (
              <div className="text-center text-xs font-semibold text-rose-700 font-sans bg-rose-50 border border-rose-100 p-2.5 rounded-lg animate-fade-in">
                Adicionado à sua Sacola de Estilo com sucesso! 💖
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
