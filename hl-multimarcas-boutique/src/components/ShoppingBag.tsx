import React from 'react';
import { Product } from '../types';
import { X, Trash2, ShoppingBag as BagIcon, MessageSquare } from 'lucide-react';

interface BagItem {
  product: Product;
  size: string;
}

interface ShoppingBagProps {
  items: BagItem[];
  isOpen: boolean;
  onClose: () => void;
  onRemoveItem: (index: number) => void;
  onClearBag: () => void;
}

export default function ShoppingBag({
  items,
  isOpen,
  onClose,
  onRemoveItem,
  onClearBag
}: ShoppingBagProps) {
  
  if (!isOpen) return null;

  const total = items.reduce((acc, curr) => acc + curr.product.price, 0);

  // Compile full cart summary for whatsapp
  const compileWhatsAppMessage = () => {
    let msg = `Olá HL Multimarcas! Montei uma sacola de compras no site de vocês e gostaria de reservar estes looks:\n\n`;
    items.forEach((item, idx) => {
      msg += `${idx + 1}. ${item.product.name} (${item.product.brand}) - Tam: ${item.size} - R$ ${item.product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n`;
    });
    msg += `\n*Total Estimado:* R$ ${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}\n`;
    msg += `\nEstes looks estão disponíveis para eu experimentar na loja da Vila Harmonia? Obrigado!`;
    return msg;
  };

  const whatsappPhone = '5516997623841';
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(compileWhatsAppMessage())}`;

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-sm flex items-center justify-end">
      {/* Background click close helper */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Bag Drawer */}
      <div className="relative w-full max-w-md h-full bg-white border-l border-stone-200 shadow-2xl flex flex-col justify-between animate-slide-in">
        <div>
          {/* Header */}
          <div className="px-6 py-5 border-b border-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-2 text-stone-900 shrink-0">
              <BagIcon size={20} className="text-rose-700" />
              <h4 className="font-serif text-lg font-medium">Sua Sacola Virtual</h4>
              <span className="bg-rose-100 text-rose-800 text-xs font-semibold px-2 py-0.5 rounded-full font-sans">
                {items.length}
              </span>
            </div>
            <button
              onClick={onClose}
              className="text-stone-400 hover:text-stone-700 p-1 rounded-full transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* Items Log */}
          <div className="p-6 overflow-y-auto max-h-[60vh] space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-12 space-y-3">
                <div className="w-12 h-12 rounded-full bg-stone-50 border border-stone-200 flex items-center justify-center text-stone-400 mx-auto">
                  <BagIcon size={20} />
                </div>
                <h5 className="font-serif text-sm text-stone-800 font-medium">Sacola Vazia</h5>
                <p className="text-xs text-stone-500 font-sans max-w-[200px] mx-auto leading-relaxed">
                  Navegue pela curadoria e adicione peças ao seu carrinho para planejar suas combinações!
                </p>
              </div>
            ) : (
              items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 p-3 bg-stone-50 rounded-xl border border-stone-150 relative group animate-fade-in"
                >
                  {/* Thumb image */}
                  <div className="w-16 h-20 bg-stone-200 rounded-lg overflow-hidden shrink-0">
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Descriptions */}
                  <div className="flex-1 flex flex-col justify-between py-1">
                    <div>
                      <span className="text-[9px] text-rose-700 font-sans tracking-wide uppercase font-semibold">
                        {item.product.brand}
                      </span>
                      <h5 className="font-sans text-xs font-semibold text-stone-900 line-clamp-1">
                        {item.product.name}
                      </h5>
                      <span className="inline-block text-[10px] bg-stone-200 text-stone-700 font-sans font-medium px-2 py-0.5 rounded-full mt-1.5">
                        Tamanho: {item.size}
                      </span>
                    </div>

                    <div className="font-serif text-sm font-semibold text-stone-900 pt-1.5 border-t border-stone-150/50">
                      R$ {item.product.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => onRemoveItem(idx)}
                    className="absolute top-2 right-2 text-stone-300 hover:text-rose-700 opacity-100 md:opacity-0 group-hover:opacity-100 transition p-1 rounded-full"
                    title="Remover item"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer actions and total */}
        {items.length > 0 && (
          <div className="p-6 border-t border-stone-100 bg-stone-50/70 space-y-4">
            <div className="flex justify-between items-end">
              <div className="space-y-0.5">
                <span className="text-xs text-stone-500 font-sans">Reservar Tudo</span>
                <span className="block text-xs text-stone-400 font-sans italic">Na loja da Vila Harmonia</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-stone-400 font-sans">Total</span>
                <div className="font-serif text-2xl font-bold text-stone-950">
                  R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-sans font-semibold text-sm py-3.5 rounded-xl flex items-center justify-center gap-2 transition text-center shadow"
              >
                <MessageSquare size={16} />
                Enviar Sacola por WhatsApp
              </a>
              
              <button
                onClick={onClearBag}
                className="w-full bg-transparent text-stone-500 hover:text-stone-800 font-sans text-xs py-2 text-center transition"
              >
                Limpar Sacola
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
