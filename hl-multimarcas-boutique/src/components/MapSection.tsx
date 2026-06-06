import React, { useState, useEffect, useRef } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin, useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { Compass, MapPin, Navigation, Car, Footprints, Bike, AlertCircle, RefreshCw } from 'lucide-react';
import { STORE_LOCATION } from '../data';

// Read API environment key safely
const API_KEY =
  process.env.GOOGLE_MAPS_PLATFORM_KEY ||
  (import.meta as any).env?.VITE_GOOGLE_MAPS_PLATFORM_KEY ||
  (globalThis as any).GOOGLE_MAPS_PLATFORM_KEY ||
  '';

const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY' && API_KEY !== 'MY_GOOGLE_MAPS_PLATFORM_KEY';

// Auxiliary component to draw routes and set fit bounds
interface RouteDisplayProps {
  origin: string | google.maps.LatLngLiteral | null;
  destination: google.maps.LatLngLiteral;
  travelMode: 'DRIVING' | 'WALKING' | 'BICYCLING';
  onCalculate: (details: { distance: string; duration: string } | null) => void;
  onError: (msg: string | null) => void;
}

function RouteDisplay({ origin, destination, travelMode, onCalculate, onError }: RouteDisplayProps) {
  const map = useMap();
  const routesLib = useMapsLibrary('routes');
  const polylinesRef = useRef<google.maps.Polyline[]>([]);

  useEffect(() => {
    if (!routesLib || !map || !origin) {
      // Clear any previous polylines if origin is removed
      polylinesRef.current.forEach(p => p.setMap(null));
      polylinesRef.current = [];
      return;
    }

    // Clear previous route polylines
    polylinesRef.current.forEach(p => p.setMap(null));
    polylinesRef.current = [];
    onError(null);

    routesLib.Route.computeRoutes({
      origin,
      destination,
      travelMode: travelMode,
      fields: ['path', 'distanceMeters', 'durationMillis', 'viewport'],
    })
      .then(({ routes }) => {
        if (routes && routes[0]) {
          const mainRoute = routes[0];
          
          // Draw new polylines
          const newPolylines = mainRoute.createPolylines();
          newPolylines.forEach(p => {
            // Style the route line beautifully
            p.setOptions({
              strokeColor: travelMode === 'WALKING' ? '#10B981' : '#E11D48',
              strokeOpacity: 0.8,
              strokeWeight: 5,
            });
            p.setMap(map);
          });
          polylinesRef.current = newPolylines;

          // Adjust map viewport to show whole route
          if (mainRoute.viewport) {
            map.fitBounds(mainRoute.viewport);
          }

          // Format results
          const distanceKm = (mainRoute.distanceMeters / 1000).toFixed(1);
          
          let durationMs = 0;
          if (typeof mainRoute.durationMillis === 'number') {
            durationMs = mainRoute.durationMillis;
          } else if (typeof mainRoute.durationMillis === 'string') {
            durationMs = parseInt((mainRoute.durationMillis as string).replace('s', '')) * 1000;
          } else if (mainRoute.durationMillis) {
            durationMs = parseInt(String(mainRoute.durationMillis).replace('s', '')) * 1000;
          }

          let durationStr = '';
          if (durationMs > 0) {
            const minutes = Math.ceil(durationMs / 60000);
            durationStr = minutes >= 60 
              ? `${Math.floor(minutes / 60)}h ${minutes % 60}m` 
              : `${minutes} min`;
          } else {
            durationStr = '10 min';
          }

          onCalculate({
            distance: `${distanceKm} km`,
            duration: durationStr
          });
        } else {
          onError('Nenhuma rota encontrada para este local de origem.');
          onCalculate(null);
        }
      })
      .catch((err) => {
        console.error('Route evaluation failed:', err);
        onError('Falha ao calcular rota. Verifique o endereço digitado ou tente outra opção.');
        onCalculate(null);
      });

    return () => {
      polylinesRef.current.forEach(p => p.setMap(null));
    };
  }, [routesLib, map, origin, destination, travelMode]);

  return null;
}

export default function MapSection() {
  const [addressInput, setAddressInput] = useState('');
  const [routeOrigin, setRouteOrigin] = useState<string | google.maps.LatLngLiteral | null>(null);
  const [travelMode, setTravelMode] = useState<'DRIVING' | 'WALKING' | 'BICYCLING'>('DRIVING');
  const [routeDetails, setRouteDetails] = useState<{ distance: string; duration: string } | null>(null);
  const [isLoadingGeo, setIsLoadingGeo] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleUseGeolocation = () => {
    if (!navigator.geolocation) {
      setErrorMessage('Seu navegador não suporta geolocalização por GPS.');
      return;
    }

    setIsLoadingGeo(true);
    setErrorMessage(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setRouteOrigin(coords);
        setAddressInput('Sua Localização Atual (GPS)');
        setIsLoadingGeo(false);
      },
      (error) => {
        console.error('Geo error:', error);
        setIsLoadingGeo(false);
        setErrorMessage(
          'Permissão de GPS negada ou sinal indisponível. Digite seu endereço de origem manualmente.'
        );
      },
      { timeout: 8000 }
    );
  };

  const handleCalculateRoute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!addressInput.trim()) {
      setErrorMessage('Por favor, informe seu endereço ou use a localização atual.');
      return;
    }
    
    if (addressInput === 'Sua Localização Atual (GPS)') {
      // routeOrigin already set via geolocation
      return;
    }

    setErrorMessage(null);
    // Google API Route endpoint also supports plain-text addresses as origin query string
    setRouteOrigin(addressInput);
  };

  const handleClearRoute = () => {
    setRouteOrigin(null);
    setAddressInput('');
    setRouteDetails(null);
    setErrorMessage(null);
  };

  // If Key is Missing: Show beautiful splash details panel + instructions
  if (!hasValidKey) {
    return (
      <section id="location-section" className="bg-stone-50 py-16 px-4 md:px-8 border-t border-stone-200">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-rose-700 text-xs tracking-[0.25em] font-semibold uppercase">Como nos encontrar</span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 mt-2">Nossa Localização</h2>
            <p className="text-stone-600 font-sans mt-3 max-w-xl mx-auto">
              Estamos ansiosos para receber você em nossa maravilhosa boutique na charmosa Vila Harmonia. Veja como encontrar nosso espaço!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Store Information */}
            <div className="lg:col-span-5 bg-white p-8 rounded-2xl shadow-sm border border-stone-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-rose-700 mb-4">
                  <MapPin size={24} className="shrink-0" />
                  <span className="font-serif text-xl font-medium text-stone-900">HL | Multimarcas</span>
                </div>
                <div className="space-y-4 border-b border-stone-100 pb-6">
                  <p className="text-stone-700 leading-relaxed font-sans text-sm">
                    {STORE_LOCATION.address}
                  </p>
                  <div>
                    <span className="text-stone-400 text-xs uppercase tracking-wider block font-sans">Contato Direto</span>
                    <p className="text-stone-900 font-medium font-sans text-sm">{STORE_LOCATION.phone}</p>
                    <p className="text-stone-600 text-sm font-sans">{STORE_LOCATION.email}</p>
                  </div>
                </div>

                <div className="pt-6">
                  <span className="text-stone-400 text-xs uppercase tracking-wider mb-3 block font-sans">Horário de Atendimento</span>
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm font-sans">
                      <span className="text-stone-600">Segunda a Sexta:</span>
                      <span className="text-stone-900 font-medium">09:00 às 18:30</span>
                    </div>
                    <div className="flex justify-between text-sm font-sans">
                      <span className="text-stone-600">Sábado:</span>
                      <span className="text-stone-900 font-medium">09:00 às 13:00</span>
                    </div>
                    <div className="flex justify-between text-sm font-sans text-rose-600">
                      <span>Domingo:</span>
                      <span className="font-medium">Fechado</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-stone-100 text-center">
                <p className="text-xs text-stone-500 font-sans italic">
                  *Venha saborear um delicioso café expresso e pão de queijo quentinho enquanto conhece nossa nova coleção!
                </p>
              </div>
            </div>

            {/* API Key Instructions */}
            <div className="lg:col-span-7 bg-white p-8 rounded-2xl shadow-sm border border-stone-200 flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 rounded-full bg-rose-50 flex items-center justify-center text-rose-700 mb-6">
                <Compass className="animate-spin-slow" size={32} />
              </div>
              <h3 className="font-serif text-2xl text-stone-900 mb-3">Visualização de Mapa Interativo</h3>
              <p className="text-stone-600 font-sans text-sm max-w-md mb-6 leading-relaxed">
                Para explorar o mapa interativo em tempo real e calcular direções personalizadas (carro, a pé, bicicleta) até a nossa boutique física, é necessário fornecer uma chave de API do Google Maps.
              </p>

              <div className="bg-stone-50 border border-stone-200 rounded-xl p-5 text-left w-full max-w-md mb-6 text-xs text-stone-700 font-sans space-y-3">
                <p className="font-medium text-stone-900">Como configurar sua API Key:</p>
                <ol className="list-decimal list-inside space-y-1.5 text-stone-600">
                  <li>
                    <a 
                      href="https://console.cloud.google.com/google/maps-apis/start?utm_campaign=gmp-code-assist-ais" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-rose-700 font-semibold underline hover:text-rose-900"
                    >
                      Obtenha uma Chave de API Google Maps
                    </a>
                  </li>
                  <li>Abra as <span className="font-semibold">Configurações (ícone ⚙️ de engrenagem)</span> no canto superior direito do seu painel do AI Studio.</li>
                  <li>Selecione <span className="font-semibold">Secrets</span>.</li>
                  <li>Adicione um novo segredo com o nome exacto: <code className="bg-stone-200 px-1 py-0.5 rounded text-rose-700">GOOGLE_MAPS_PLATFORM_KEY</code></li>
                  <li>Cole sua chave de API gerada no campo valor e pressione <span className="font-semibold">Enter</span>.</li>
                </ol>
                <div className="flex gap-2 items-start bg-rose-50 text-rose-800 p-2.5 rounded border border-rose-100 mt-2">
                  <AlertCircle size={14} className="shrink-0 mt-0.5 text-rose-700" />
                  <p className="leading-normal">
                    O aplicativo será recompilado na hora. Não é necessário atualizar a página!
                  </p>
                </div>
              </div>

              <span className="text-xs text-stone-400 max-w-xs font-sans">
                R. Humaitá, 1785 - Vila Harmonia, Araraquara/SP.
              </span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // If Key is Active: Show Elegant Google Map + Realtime Directions Routes Finder
  return (
    <APIProvider apiKey={API_KEY} version="weekly">
      <section id="location-section" className="bg-stone-100 py-16 px-4 md:px-8 border-t border-stone-200">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-10">
            <span className="text-rose-700 text-xs tracking-[0.25em] font-semibold uppercase">Visite Nossa Loja</span>
            <h2 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 mt-2">Venha nos Visitar</h2>
            <p className="text-stone-600 font-sans mt-3 max-w-xl mx-auto">
              Localizados na charmosa Vila Harmonia em Araraquara, oferecemos estacionamento gratuito e atendimento super consultivo.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Interactive Directions Control Side Panel */}
            <div className="lg:col-span-4 bg-white p-6 rounded-2xl shadow-sm border border-stone-200 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-lg text-stone-950 font-medium pb-3 border-b border-stone-100 mb-4 flex items-center gap-2">
                  <Navigation size={18} className="text-rose-700" />
                  Traçar Rota Direta
                </h3>

                <form onSubmit={handleCalculateRoute} className="space-y-4">
                  <div>
                    <label className="text-xs text-stone-500 font-sans font-medium block mb-1">Informe seu Local de Partida:</label>
                    <div className="relative">
                      <input
                        type="text"
                        value={addressInput}
                        onChange={(e) => setAddressInput(e.target.value)}
                        placeholder="Ex: Aeroclube Araraquara ou R. São Bento"
                        className="w-full text-sm font-sans bg-stone-50 border border-stone-200 rounded-lg pl-3 pr-10 py-2.5 outline-none focus:border-rose-600 focus:bg-white transition"
                      />
                      <button
                        type="button"
                        onClick={handleUseGeolocation}
                        title="Usar minha localização atual via GPS"
                        className="absolute right-2 top-2 text-stone-400 hover:text-rose-700 transition"
                      >
                        {isLoadingGeo ? (
                          <RefreshCw className="animate-spin text-rose-700" size={18} />
                        ) : (
                          <Compass size={18} />
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-stone-500 font-sans font-medium block mb-1">Meio de Transporte:</label>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setTravelMode('DRIVING')}
                        className={`flex flex-col items-center justify-center p-2 rounded-lg border text-xs font-sans transition ${
                          travelMode === 'DRIVING'
                            ? 'bg-rose-50 border-rose-700 text-rose-700 font-medium'
                            : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                        }`}
                      >
                        <Car size={16} className="mb-1" />
                        Carro
                      </button>
                      <button
                        type="button"
                        onClick={() => setTravelMode('WALKING')}
                        className={`flex flex-col items-center justify-center p-2 rounded-lg border text-xs font-sans transition ${
                          travelMode === 'WALKING'
                            ? 'bg-rose-50 border-rose-700 text-rose-700 font-medium'
                            : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                        }`}
                      >
                        <Footprints size={16} className="mb-1" />
                        A Pé
                      </button>
                      <button
                        type="button"
                        onClick={() => setTravelMode('BICYCLING')}
                        className={`flex flex-col items-center justify-center p-2 rounded-lg border text-xs font-sans transition ${
                          travelMode === 'BICYCLING'
                            ? 'bg-rose-50 border-rose-700 text-rose-700 font-medium'
                            : 'bg-stone-50 border-stone-200 text-stone-600 hover:bg-stone-100'
                        }`}
                      >
                        <Bike size={16} className="mb-1" />
                        Bicicleta
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="submit"
                      disabled={!addressInput.trim()}
                      className="w-full bg-stone-900 hover:bg-stone-950 text-white font-sans font-medium text-xs py-2.5 rounded-lg my-1 transition disabled:opacity-50"
                    >
                      Calcular Rota
                    </button>
                    {routeOrigin && (
                      <button
                        type="button"
                        onClick={handleClearRoute}
                        className="bg-stone-100 hover:bg-stone-200 text-stone-700 font-sans font-medium text-xs px-3 rounded-lg transition"
                      >
                        Limpar
                      </button>
                    )}
                  </div>
                </form>

                {errorMessage && (
                  <div className="mt-4 p-3 bg-rose-50 border border-rose-100 text-rose-800 text-xs font-sans rounded-lg flex items-start gap-2">
                    <AlertCircle size={14} className="shrink-0 mt-0.5 text-rose-700" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {routeDetails && (
                  <div className="mt-6 p-4 bg-stone-50 rounded-xl border border-stone-200 space-y-3">
                    <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-sans">Resultado da Rota</span>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-xs text-stone-500 font-sans">Distância Estimada</span>
                        <p className="text-lg font-serif font-semibold text-stone-900">{routeDetails.distance}</p>
                      </div>
                      <div>
                        <span className="text-xs text-stone-500 font-sans">Tempo de Viagem</span>
                        <p className="text-lg font-serif font-semibold text-stone-900">{routeDetails.duration}</p>
                      </div>
                    </div>
                    <div className="text-[11px] text-stone-500 font-sans flex items-center gap-1">
                      <span className="inline-block w-2.5 h-2.5 rounded-full bg-rose-700 pb-0.5 mr-1 align-middle"></span>
                      <span>Trajeto exibido no mapa à direita.</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Direct Store Contact summary */}
              <div className="mt-8 pt-4 border-t border-stone-100 space-y-2">
                <span className="text-[10px] text-stone-400 uppercase tracking-widest block font-sans">Endereço da Boutique</span>
                <p className="text-xs text-stone-800 leading-normal font-sans">
                  {STORE_LOCATION.address}
                </p>
                <div className="flex gap-2">
                  <span className="text-xs text-stone-950 font-sans font-semibold">Fone:</span>
                  <span className="text-xs text-stone-600 font-sans">{STORE_LOCATION.phone}</span>
                </div>
              </div>
            </div>

            {/* Interactive Map Wrapper (CF2 rule met with explicit layout container of 100vh or absolute bounds) */}
            <div className="lg:col-span-8 relative min-h-[400px] lg:min-h-full rounded-2xl overflow-hidden shadow-sm border border-stone-200">
              <Map
                defaultCenter={{ lat: STORE_LOCATION.lat, lng: STORE_LOCATION.lng }}
                defaultZoom={16}
                mapId="DEMO_MAP_ID"
                internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
                style={{ width: '100%', height: '100%', minHeight: '400px' }}
              >
                {/* AdvancedMarker & Custom Pin for Store Destination Location */}
                <AdvancedMarker position={{ lat: STORE_LOCATION.lat, lng: STORE_LOCATION.lng }} title={STORE_LOCATION.name}>
                  <Pin background="#E11D48" glyphColor="#ffffff" borderColor="#9F1239" scale={1.2}>
                    <span className="font-serif font-black text-[9px] text-white">HL</span>
                  </Pin>
                </AdvancedMarker>

                {/* Draw directions route overlay onto the active map dynamically */}
                <RouteDisplay
                  origin={routeOrigin}
                  destination={{ lat: STORE_LOCATION.lat, lng: STORE_LOCATION.lng }}
                  travelMode={travelMode}
                  onCalculate={setRouteDetails}
                  onError={setErrorMessage}
                />
              </Map>
            </div>
          </div>
        </div>
      </section>
    </APIProvider>
  );
}
