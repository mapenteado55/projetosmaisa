import React, { useState } from 'react';
import { Sparkles, Heart, ShoppingBag as BagIcon, MapPin, Phone, Clock, MessageSquare, Compass, ArrowDown, ChevronRight, Check } from 'lucide-react';
import { PRODUCTS, STORE_LOCATION, STORE_HOURS } from './data';
import { Product } from './types';
import ProductCard from './components/ProductCard';
import ProductDetailModal from './components/ProductDetailModal';
import MapSection from './components/MapSection';
import StylistChat from './components/StylistChat';
import ShoppingBag from './components/ShoppingBag';

export default function App() {
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [bag, setBag] = useState<{ product: Product; size: string }[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isBagOpen, setIsBagOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterJoined, setNewsletterJoined] = useState(false);

  // Filter products based on selected category tag
  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeCategory);

  const handleToggleWishlist = (productId: string) => {
    setWishlist(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToBag = (product: Product, size: string) => {
    setBag(prev => [...prev, { product, size }]);
  };

  const handleRemoveFromBag = (index: number) => {
    setBag(prev => prev.filter((_, idx) => idx !== index));
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterJoined(true);
      setTimeout(() => {
        setNewsletterEmail('');
      }, 3000);
    }
  };

  // Triggers chat question suggesting a product
  const handleOpenStylistWithProduct = (productName: string) => {
    setIsChatOpen(true);
  };

  return (
    <div className="min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-rose-500 selection:text-white">
      
      {/* Upper Announcement Rail */}
      <div className="bg-stone-900 text-stone-200 text-center py-2 px-4 text-xs tracking-wider uppercase font-medium">
        ✨ Atendimento Especial de Outono • Conheça nossa loja na Vila Harmonia, Araraquara ✨
      </div>

      {/* Primary Navigation Ribbon */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 py-4 px-6 md:px-12 flex items-center justify-between">
        {/* Brand Mark */}
        <div className="flex flex-col">
          <a href="#" className="font-serif text-2xl font-semibold tracking-[0.12em] text-stone-950 inline-flex items-center gap-2">
            HL <span className="text-stone-300 font-sans font-extralight">|</span> MULTIMARCAS
          </a>
          <span className="text-[9px] text-stone-400 font-sans tracking-[0.25em] uppercase font-medium">
            Vila Harmonia • Araraquara
          </span>
        </div>

        {/* Center menu categories */}
        <nav className="hidden md:flex gap-8 text-xs font-sans tracking-widest uppercase font-medium text-stone-600">
          <a href="#welcome-section" className="hover:text-rose-700 transition">Início</a>
          <a href="#curadoria-section" className="hover:text-rose-700 transition">Coleções</a>
          <a href="#location-section" className="hover:text-rose-700 transition">Localização</a>
        </nav>

        {/* Action Widgets Icons */}
        <div className="flex items-center gap-4">
          
          {/* AI Stylest Shortcut Button */}
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-rose-50 text-rose-800 border border-rose-150 px-3.5 py-2 rounded-xl flex items-center gap-2 text-xs font-sans font-semibold hover:bg-rose-700 hover:text-white transition-all shadow-sm"
            title="Abrir Estilista Virtual"
          >
            <Sparkles size={14} className="animate-pulse shrink-0" />
            <span className="hidden sm:inline">Consultar Estilista</span>
          </button>

          {/* Wishlist toggle summary */}
          <div className="relative" title="Lista de Desejos">
            <Heart size={20} className="text-stone-700 hover:text-rose-700 cursor-pointer transition" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-rose-700 text-white text-[9px] font-sans font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </div>

          {/* Shopping bag trigger summary */}
          <div className="relative cursor-pointer" onClick={() => setIsBagOpen(true)} title="Sua sacola virtual">
            <BagIcon size={20} className="text-stone-700 hover:text-rose-700 transition" />
            {bag.length > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-stone-900 text-white text-[9px] font-sans font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {bag.length}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="welcome-section" className="relative bg-stone-900 text-white py-24 md:py-32 px-6 md:px-12 flex flex-col justify-center items-center overflow-hidden">
        
        {/* Aesthetic background mesh styling */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute -top-1/4 -left-1/4 w-[700px] h-[700px] rounded-full bg-rose-500/30 blur-3xl"></div>
          <div className="absolute -bottom-1/4 -right-1/4 w-[700px] h-[700px] rounded-full bg-amber-500/30 blur-3xl"></div>
        </div>

        <div className="relative z-10 max-w-4xl text-center space-y-6">
          <span className="text-rose-400 text-xs tracking-[0.3em] font-semibold uppercase block">
            Curadoria Multimarcas Premium
          </span>
          
          <h1 className="font-serif text-4xl md:text-6xl font-medium tracking-tight text-stone-100 max-w-3xl mx-auto leading-tight">
            Sofisticação, Essência e Conforto na Vila Harmonia - Maísa Penteado
          </h1>

          <p className="text-stone-300 font-sans text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Reunimos as marcas mais nobres da moda brasileira (Morena Rosa, Le Lis Blanc, Cantão e Schutz) para vestir sua autenticidade. Visite nossa boutique física ou planeje seus looks agora.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center pt-4">
            <a
              href="#curadoria-section"
              className="w-full sm:w-auto bg-rose-700 hover:bg-rose-800 text-white text-xs uppercase tracking-wider font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition"
            >
              Explorar Coleção
              <ArrowDown size={14} />
            </a>
            
            <button
              onClick={() => setIsChatOpen(true)}
              className="w-full sm:w-auto bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700 text-xs uppercase tracking-wider font-semibold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition"
            >
              <Sparkles size={14} className="text-rose-400" />
              IA Personal Stylist
            </button>
          </div>
        </div>
      </section>

      {/* CORE BRANDS FOCUS BLOCK */}
      <section className="bg-white py-12 border-b border-stone-200 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center md:text-left space-y-1">
              <span className="text-xs text-rose-700 uppercase font-semibold tracking-wider font-sans">Nossa Seleção</span>
              <h3 className="font-serif text-xl font-medium text-stone-900">Grifes Nobres</h3>
              <p className="text-xs text-stone-500 font-sans leading-relaxed">Multimarcas escolhidas à dedo por nosso time de estilistas.</p>
            </div>
            
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-150 flex items-center justify-between">
              <div>
                <span className="block font-serif text-sm font-semibold text-stone-900">Le Lis Blanc</span>
                <span className="text-[10px] text-stone-400 font-sans">Elegância e Festas</span>
              </div>
              <ChevronRight size={14} className="text-stone-300" />
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-150 flex items-center justify-between">
              <div>
                <span className="block font-serif text-sm font-semibold text-stone-900">Morena Rosa</span>
                <span className="text-[10px] text-stone-400 font-sans">Atitude e Alfaiataria Fina</span>
              </div>
              <ChevronRight size={14} className="text-stone-300" />
            </div>

            <div className="p-4 rounded-xl bg-stone-50 border border-stone-150 flex items-center justify-between">
              <div>
                <span className="block font-serif text-sm font-semibold text-stone-900">Cantão & Schutz</span>
                <span className="text-[10px] text-stone-400 font-sans">Despojado e Couro Soft</span>
              </div>
              <ChevronRight size={14} className="text-stone-300" />
            </div>
          </div>
        </div>
      </section>

      {/* CURATORSHIP CATALOG SECTION */}
      <section id="curadoria-section" className="py-20 px-6 md:px-12 max-w-6xl mx-auto space-y-12">
        
        {/* Header content and filters */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 pb-6 border-b border-stone-200">
          <div>
            <span className="text-rose-700 text-xs tracking-widest uppercase font-semibold block font-sans">Catalogo Exclusivo</span>
            <h2 className="font-serif text-3xl md:text-4xl text-stone-950 font-medium mt-1">Curadoria de Looks</h2>
            <p className="text-sm text-stone-500 font-sans mt-2 max-w-lg">
              Estilo sofisticado estruturado de marcas prontas para você brilhar. Converse com a Estilista HL IA no chat para darmos conselhos integrados!
            </p>
          </div>

          {/* Category Filtering Chips */}
          <div className="flex flex-wrap gap-1.5 font-sans">
            <button
              onClick={() => setActiveCategory('all')}
              className={`text-xs px-4 py-2 rounded-full transition ${
                activeCategory === 'all'
                  ? 'bg-stone-950 text-white font-medium'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              Todos os Itens
            </button>
            <button
              onClick={() => setActiveCategory('casual')}
              className={`text-xs px-4 py-2 rounded-full transition ${
                activeCategory === 'casual'
                  ? 'bg-stone-950 text-white font-medium'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              Casual & Linho
            </button>
            <button
              onClick={() => setActiveCategory('formal')}
              className={`text-xs px-4 py-2 rounded-full transition ${
                activeCategory === 'formal'
                  ? 'bg-stone-950 text-white font-medium'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              Alfaiataria
            </button>
            <button
              onClick={() => setActiveCategory('festa')}
              className={`text-xs px-4 py-2 rounded-full transition ${
                activeCategory === 'festa'
                  ? 'bg-stone-950 text-white font-medium'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              Festa VIP
            </button>
            <button
              onClick={() => setActiveCategory('calcados')}
              className={`text-xs px-4 py-2 rounded-full transition ${
                activeCategory === 'calcados'
                  ? 'bg-stone-950 text-white font-medium'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              Calçados & Acessórios
            </button>
          </div>
        </div>

        {/* Curator Grid mapping cards */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-white border border-stone-200 rounded-2xl">
            <p className="text-sm font-sans text-stone-500">Nenhum look catalogado nesta seção específica no momento.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onViewDetails={setSelectedProduct}
                onToggleWishlist={handleToggleWishlist}
                isWishlisted={wishlist.includes(prod.id)}
                onAddToBag={handleAddToBag}
              />
            ))}
          </div>
        )}
      </section>

      {/* INTERACTIVE GEOGRAPHIC MAP COMPONENT */}
      <MapSection />

      {/* COZY NEWSLETTER PROMOTION BANNER */}
      <section className="bg-stone-950 text-white py-16 px-6 md:px-12 text-center relative overflow-hidden">
        <div className="max-w-2xl mx-auto space-y-6 relative z-10">
          <span className="text-rose-400 text-xs tracking-widest uppercase block font-sans font-semibold">Informativo Particular</span>
          <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight">Inscreva-se na nossa Lista VIP</h3>
          <p className="text-xs md:text-sm text-stone-400 font-sans leading-relaxed max-w-lg mx-auto">
            Receba catálogos exclusivos de pré-venda, convites para coquetéis na Vila Harmonia e conselhos sazonais de personal stylists da nossa equipe.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
            <input
              type="email"
              required
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              placeholder="Seu e-mail predileto..."
              className="flex-1 bg-stone-900 border border-stone-800 rounded-xl px-4 py-3 placeholder:text-stone-600 text-sm font-sans outline-none focus:border-rose-400 transition"
            />
            <button
              type="submit"
              className="bg-rose-700 hover:bg-rose-800 text-white font-sans text-xs tracking-wider uppercase font-semibold px-6 py-3.5 rounded-xl transition flex items-center justify-center gap-2 shrink-0"
            >
              {newsletterJoined ? <Check size={14} /> : 'Fazer Parte'}
            </button>
          </form>

          {newsletterJoined && (
            <p className="text-xs text-rose-400 font-sans animate-fade-in">
              Inscrição confirmada, maravilhosa! Em breve você receberá as novidades. 💖
            </p>
          )}
        </div>
      </section>

      {/* BRAND FOOTER SKELETON */}
      <footer className="bg-white border-t border-stone-200 py-16 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Store Intro summary */}
          <div className="space-y-4">
            <h4 className="font-serif text-lg font-semibold tracking-[0.10em] text-stone-950">
              HL | MULTIMARCAS
            </h4>
            <p className="text-xs text-stone-500 font-sans leading-relaxed">
              Curadoria requintada e acolhimento singular em Araraquara, SP. Elevando sua experiência de vestir e sintonizando marcas consagradas.
            </p>
          </div>

          {/* Col 2: Useful categories */}
          <div className="space-y-3">
            <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-sans font-medium">Marcas Catalogas</span>
            <ul className="space-y-1.5 text-xs text-stone-600 font-sans">
              <li>Morena Rosa</li>
              <li>Le Lis Blanc</li>
              <li>Cantão</li>
              <li>Schutz</li>
              <li>HL Acessorios</li>
            </ul>
          </div>

          {/* Col 3: Business addresses info */}
          <div className="space-y-3">
            <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-sans font-medium">Nosso Espaço</span>
            <div className="space-y-2 text-xs text-stone-600 font-sans leading-normal">
              <p className="flex items-start gap-1.5">
                <MapPin size={12} className="text-rose-700 shrink-0 mt-0.5" />
                <span>R. Humaitá, 1785 - Vila Harmonia, Araraquara - SP, 14801-385</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Phone size={12} className="text-rose-700 shrink-0" />
                <span>{STORE_LOCATION.phone}</span>
              </p>
              <p className="flex items-center gap-1.5">
                <Clock size={12} className="text-rose-700 shrink-0" />
                <span>Seg a Sex: 09h às 18h30 | Sab: 09h às 13h</span>
              </p>
            </div>
          </div>

          {/* Col 4: Technology credit rules met */}
          <div className="space-y-3">
            <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-sans font-medium">Moda & IA</span>
            <p className="text-xs text-stone-500 font-sans leading-relaxed">
              Utilizamos nossa inteligência artificial personalizada da Estilista Virtual baseada no modelo Gemini da Google para compilar sugestões refinadas para o seu estilo!
            </p>
          </div>
        </div>

        {/* Bottom copyright ribbon */}
        <div className="max-w-6xl mx-auto mt-12 pt-8 border-t border-stone-100 flex flex-col md:flex-row justify-between text-xs text-stone-400 font-sans gap-4 text-center md:text-left">
          <p>© 2026 HL | Multimarcas - Vila Harmonia. Todos os direitos reservados. Araraquara, SP.</p>
          <div className="flex justify-center gap-4">
            <a href="#" className="hover:text-stone-650">Termos de Uso</a>
            <a href="#" className="hover:text-stone-650">Privacidade</a>
          </div>
        </div>
      </footer>

      {/* MODULAR OVERLAYS */}

      {/* View Details modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProduct ? wishlist.includes(selectedProduct.id) : false}
        onAddToBag={handleAddToBag}
      />

      {/* Shopping bag drawer */}
      <ShoppingBag
        items={bag}
        isOpen={isBagOpen}
        onClose={() => setIsBagOpen(false)}
        onRemoveItem={handleRemoveFromBag}
        onClearBag={() => setBag([])}
      />

      {/* Floating chatbot assistant */}
      <StylistChat
        onSuggestOffer={handleOpenStylistWithProduct}
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      {/* Global Quick Floating Action Button for triggers when Chat is Closed */}
      {!isChatOpen && (
        <button
          onClick={() => setIsChatOpen(true)}
          className="fixed bottom-6 right-6 z-40 bg-stone-950 hover:bg-rose-750 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition duration-300 hover:scale-105 active:scale-95 group"
          title="Falar com a Estilista HL Virtual"
        >
          <Sparkles size={22} className="text-rose-400 group-hover:rotate-12 transition duration-300" />
        </button>
      )}

    </div>
  );
}
