import { useState } from 'react';
import { useWeatherData } from './hooks/useWeatherData';
import { CurrentWeather } from './components/CurrentWeather';
import { Forecast } from './components/Forecast';
import { AirQuality } from './components/AirQuality';
import { WeatherMap } from './components/WeatherMap';
import { WeatherWarnings } from './components/WeatherWarnings';
import { Loader2, CloudRain, Globe } from 'lucide-react';
import { format } from 'date-fns';
import { enUS, zhTW, zhCN } from 'date-fns/locale';
import { translations, Lang } from './lib/i18n';

const getDefaultLang = (): Lang => {
  if (typeof navigator === 'undefined') return 'en';
  const browserLang = navigator.language.toLowerCase();
  
  if (browserLang.includes('zh-tw') || browserLang.includes('zh-hk') || browserLang.includes('zh-hant')) {
    return 'tc';
  }
  if (browserLang.includes('zh-cn') || browserLang.includes('zh-sg') || browserLang.includes('zh-hans') || browserLang === 'zh') {
    return 'sc';
  }
  return 'en';
};

export default function App() {
  const [lang, setLang] = useState<Lang>(getDefaultLang);
  const t = translations[lang];
  const { current, forecast, localForecast, warnings, airQuality, wind, loading, error } = useWeatherData(lang);

  const dateLocale = lang === 'tc' ? zhTW : lang === 'sc' ? zhCN : enUS;
  const dateFormat = lang === 'en' ? 'EEEE, MMMM d' : 'M月d日 EEEE';

  if (loading) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white">
        <Loader2 className="w-12 h-12 animate-spin text-blue-400 mb-4" />
        <p className="text-white/60 uppercase tracking-widest text-sm font-medium">{t.loading}</p>
      </div>
    );
  }

  if (error || !current || !forecast || !airQuality || !wind) {
    return (
      <div className="min-h-screen bg-zinc-950 flex flex-col items-center justify-center text-white p-6 text-center">
        <div className="bg-red-500/10 border border-red-500/30 p-6 rounded-3xl max-w-md">
          <p className="text-red-400 font-medium mb-2">{t.failed}</p>
          <p className="text-red-300/60 text-sm">{error?.message || 'Unknown error occurred'}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-colors"
          >
            {t.tryAgain}
          </button>
        </div>
      </div>
    );
  }

  // Determine background based on current icon or time
  const isDay = current.icon[0] < 60 || current.icon[0] >= 90; // Rough estimation
  const bgGradient = isDay 
    ? 'bg-gradient-to-br from-blue-900 via-slate-900 to-zinc-950'
    : 'bg-gradient-to-br from-slate-950 via-zinc-950 to-black';

  return (
    <div className={`min-h-screen ${bgGradient} font-sans selection:bg-white/30`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div className="flex items-center gap-3">
            <div className="bg-white/10 p-3 rounded-2xl border border-white/10 backdrop-blur-md">
              <CloudRain className="w-8 h-8 text-blue-300" />
            </div>
            <div>
              <h1 className="text-3xl font-light text-white tracking-tight">{t.title}</h1>
              <p className="text-white/50 text-sm font-medium uppercase tracking-widest mt-1">{t.hko}</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 text-left md:text-right">
            {/* Language Switcher */}
            <div className="flex items-center gap-2 bg-white/10 rounded-full p-1 border border-white/10">
              <Globe className="w-4 h-4 text-white/60 ml-2" />
              <button onClick={() => setLang('en')} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${lang === 'en' ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}>EN</button>
              <button onClick={() => setLang('tc')} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${lang === 'tc' ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}>繁</button>
              <button onClick={() => setLang('sc')} className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${lang === 'sc' ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}>简</button>
            </div>
            <div>
              <p className="text-white/90 text-xl font-light">{format(new Date(), dateFormat, { locale: dateLocale })}</p>
              <p className="text-white/50 text-sm font-medium uppercase tracking-widest mt-1">
                {format(new Date(), 'h:mm a')}
              </p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            <WeatherWarnings warnings={warnings} lang={lang} t={t} />
            <CurrentWeather current={current} wind={wind} localForecast={localForecast} t={t} />
            <Forecast forecast={forecast} t={t} lang={lang} />
          </div>

          {/* Right Column */}
          <div className="lg:col-span-4 flex flex-col">
            <AirQuality airQuality={airQuality} t={t} />
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-8">
          <WeatherMap t={t} lang={lang} />
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-white/10 text-center text-white/40 text-sm pb-8">
          <p>{t.providedBy}</p>
          <p className="mt-2">{t.builtFor}</p>
        </footer>
      </div>
    </div>
  );
}
