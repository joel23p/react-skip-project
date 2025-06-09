import React, { useState, useEffect } from 'react';
import { Check, ChevronLeft, ChevronRight, Calendar, MapPin, Trash2, FileCheck, CreditCard, Loader2, AlertTriangle, Menu } from 'lucide-react';
import { Skip } from './model/Skip';

const steps = [
  { id: 'postcode', label: 'Postcode', icon: MapPin },
  { id: 'waste-type', label: 'Waste Type', icon: Trash2 },
  { id: 'select-skip', label: 'Select Skip', icon: Check },
  { id: 'permit-check', label: 'Permit Check', icon: FileCheck },
  { id: 'choose-date', label: 'Choose Date', icon: Calendar },
  { id: 'payment', label: 'Payment', icon: CreditCard },
];

function App() {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSkip, setSelectedSkip] = useState<number | null>(null);
  const currentStepIndex = 2;

  useEffect(() => {
    const fetchSkips = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft');
        
        if (!response.ok) {
          throw new Error('Failed to fetch skip data');
        }
        const data: Skip[] = await response.json();
        const availableSkips = data.filter(skip => !skip.forbidden);
        
        setSkips(availableSkips);
        if (availableSkips.length > 0) {
          setSelectedSkip(availableSkips[0].id);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load skip data');
        console.error('Error fetching skips:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchSkips();
  }, []);

  const formatPrice = (priceBeforeVat: number, vat: number) => {
    const totalPrice = priceBeforeVat + vat;
    return totalPrice.toFixed(2);
  };

  const getSkipImage = (size: number) => {
    const imageMap: { [key: number]: string } = {
      4: '/assets/waste4.png',
      6: '/assets/waste4.png',
      8: '/assets/waste4.png',
      10: '/assets/waste5.png',
      12: '/assets/waste5.png',
      14: '/assets/waste5.png',
      16: '/assets/waste6.png',
      20: '/assets/waste6.png',
      40: '/assets/waste6.png',
    };
    
    return imageMap[size];
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center px-4">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600 text-sm sm:text-base">Loading skip options...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="text-center bg-white rounded-2xl p-6 sm:p-8 shadow-lg max-w-md w-full">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" />
          </div>
          <h2 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">Unable to Load Skips</h2>
          <p className="text-slate-600 mb-4 text-sm sm:text-base">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 sm:px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm sm:text-base"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200/60 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                <Trash2 className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent">
                We Want Waste
              </h1>
            </div>
            <div className="hidden sm:block text-xs sm:text-sm text-slate-600">
              Step {currentStepIndex + 1} of {steps.length}
            </div>
            <div className="sm:hidden">
              <span className="text-xs text-slate-600 bg-slate-100 px-2 py-1 rounded-full">
                {currentStepIndex + 1}/{steps.length}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white/60 backdrop-blur-sm border-b border-slate-200/40">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6">
          <div className="sm:hidden">
            <div className="flex items-center justify-center space-x-2 mb-3">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStepIndex
                      ? 'bg-blue-600'
                      : index < currentStepIndex
                      ? 'bg-green-500'
                      : 'bg-slate-300'
                  }`}
                />
              ))}
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <Check className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-blue-600">Select Skip</span>
              </div>
            </div>
          </div>
          <div className="hidden sm:flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === currentStepIndex;
              const isCompleted = index < currentStepIndex;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center space-x-2 ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                    <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive 
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25' 
                        : isCompleted 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                        : 'bg-slate-200 text-slate-500'
                    }`}>
                      {isCompleted ? (
                        <Check className="w-4 h-4 lg:w-5 lg:h-5" />
                      ) : (
                        <Icon className="w-4 h-4 lg:w-5 lg:h-5" />
                      )}
                    </div>
                    <span className={`text-xs lg:text-sm font-medium transition-colors ${
                      isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-slate-500'
                    }`}>
                      {step.label}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 lg:mx-4 transition-colors ${
                      index < currentStepIndex ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-slate-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-800 mb-3 sm:mb-4 px-2">
            Choose Your Skip Size
          </h2>
          <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto px-4">
            Select the skip size that best suits your needs.
          </p>
        </div>
        {skips.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {skips.map((skip) => {
              const isSelected = selectedSkip === skip.id;
              const totalPrice = formatPrice(skip.price_before_vat, skip.vat);
              return (
                <div
                  key={skip.id}
                  className={`group relative bg-white rounded-xl sm:rounded-2xl border-2 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer ${
                    isSelected 
                      ? 'border-blue-500 shadow-lg shadow-blue-500/20 ring-2 sm:ring-4 ring-blue-500/10' 
                      : 'border-slate-200 hover:border-blue-300'
                  }`}
                  onClick={() => setSelectedSkip(skip.id)}
                >
                  {isSelected && (
                    <div className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3 w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center shadow-lg z-10">
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-2 py-1 sm:px-3 sm:py-1 rounded-full text-xs sm:text-sm font-semibold z-10">
                    {skip.size} Yard{skip.size !== 1 ? 's' : ''}
                  </div>
                  {!skip.allowed_on_road && (
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-1.5 py-1 sm:px-2 sm:py-1 rounded-full text-xs font-semibold z-10 flex items-center space-x-1">
                      <AlertTriangle className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      <span className="hidden lg:inline">Private Land Only</span>
                    </div>
                  )}
                  <div className="relative h-32 sm:h-40 lg:h-48 overflow-hidden rounded-t-xl sm:rounded-t-2xl">
                    <img 
                      src={getSkipImage(skip.size)} 
                      alt={`${skip.size} Yard Skip`}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2">
                      {skip.size} Yard Skip
                    </h3>
                    {!skip.allowed_on_road && (
                      <div className="mb-3 p-2 sm:p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start space-x-2">
                        <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs sm:text-sm font-medium text-amber-800">Not Allowed on Road</p>
                          <p className="text-xs text-amber-700">Must be placed on private property</p>
                        </div>
                      </div>
                    )}
                    <div className="space-y-1.5 sm:space-y-2 mb-4">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-slate-500">Hire Period:</span>
                        <span className="font-medium text-slate-700">{skip.hire_period_days} day{skip.hire_period_days !== 1 ? 's' : ''}</span>
                      </div>
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="text-slate-500">Location:</span>
                        <span className="font-medium text-slate-700 truncate ml-2">{skip.area}</span>
                      </div>
                      {skip.allows_heavy_waste && (
                        <div className="flex items-center justify-between text-xs sm:text-sm">
                          <span className="text-slate-500">Heavy Waste:</span>
                          <span className="font-medium text-green-600">✓ Allowed</span>
                        </div>
                      )}
                      {skip.transport_cost && (
                        <div className="flex items-center justify-between text-xs sm:text-sm">
                          <span className="text-slate-500">Transport:</span>
                          <span className="font-medium text-slate-700">£{skip.transport_cost.toFixed(2)}</span>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-xl sm:text-2xl font-bold text-slate-800">
                          £{totalPrice}
                        </div>
                        <div className="text-xs text-slate-500">
                          Inc. VAT (£{skip.vat.toFixed(2)})
                        </div>
                      </div>
                      <button
                        className={`px-3 py-1.5 sm:px-6 sm:py-2 rounded-lg sm:rounded-xl text-sm sm:text-base font-semibold transition-all duration-200 ${
                          isSelected
                            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/25'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {isSelected ? 'Selected' : 'Select'}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6 sm:w-8 sm:h-8 text-slate-400" />
            </div>
            <p className="text-slate-600 text-sm sm:text-base">No skip options available for this location.</p>
          </div>
        )}
        {selectedSkip && skips.length > 0 && (
          <div className="bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-slate-200/60 p-4 sm:p-6 mb-6 sm:mb-8">
            {(() => {
              const skip = skips.find(s => s.id === selectedSkip);
              if (!skip) return null;  
              return (
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-slate-800 mb-1">
                      Selected: {skip.size} Yard Skip
                    </h3>
                    <div className="flex flex-col sm:flex-row sm:items-center text-sm sm:text-base text-slate-600">
                      <span>{skip.hire_period_days} day hire period • {skip.area}</span>
                      {!skip.allowed_on_road && (
                        <span className="mt-1 sm:mt-0 sm:ml-2 inline-flex items-center space-x-1 text-amber-600">
                          <AlertTriangle className="w-3 h-3" />
                          <span className="text-xs">Private land only</span>
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-left sm:text-right">
                    <div className="text-xl sm:text-2xl font-bold text-slate-800">
                      £{formatPrice(skip.price_before_vat, skip.vat)}
                    </div>
                    <div className="text-xs sm:text-sm text-slate-500">Including VAT</div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-0">
          <button className="flex items-center justify-center space-x-2 px-4 sm:px-6 py-3 bg-white border border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 transition-colors order-2 sm:order-1">
            <ChevronLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
          
          <button 
            disabled={!selectedSkip}
            className={`flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg order-1 sm:order-2 ${
              selectedSkip 
                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/30' 
                : 'bg-slate-300 text-slate-500 cursor-not-allowed'
            }`}
          >
            <span>Continue</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="bg-white/60 backdrop-blur-sm border-t border-slate-200/40 mt-12 sm:mt-16">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center sm:text-left">
              <h4 className="font-semibold text-slate-800 mb-2 sm:mb-3 text-sm sm:text-base">Need Help?</h4>
              <p className="text-slate-600 text-xs sm:text-sm">
                Contact our expert team for personalized recommendations
              </p>
            </div>
            <div className="text-center sm:text-left">
              <h4 className="font-semibold text-slate-800 mb-2 sm:mb-3 text-sm sm:text-base">Free Delivery</h4>
              <p className="text-slate-600 text-xs sm:text-sm">
                All orders include free delivery and collection within 24 hours
              </p>
            </div>
            <div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
              <h4 className="font-semibold text-slate-800 mb-2 sm:mb-3 text-sm sm:text-base">Licensed & Insured</h4>
              <p className="text-slate-600 text-xs sm:text-sm">
                Fully licensed waste carriers with comprehensive insurance
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;