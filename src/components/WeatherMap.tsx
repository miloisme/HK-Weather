import { useState } from 'react';
import { Map, Wind, CloudRain, AlertCircle } from 'lucide-react';
import { cn } from '../lib/utils';
import { Translation, Lang } from '../lib/i18n';

type MapOverlay = 'radar' | 'wind' | 'clouds' | 'hurricane';

interface Props {
  t: Translation;
  lang: Lang;
}

export function WeatherMap({ t, lang }: Props) {
  const [overlay, setOverlay] = useState<MapOverlay>('radar');

  const tabs = [
    { id: 'radar', label: t.radar, icon: Map },
    { id: 'wind', label: t.windTab, icon: Wind },
    { id: 'clouds', label: t.clouds, icon: CloudRain },
    { id: 'hurricane', label: t.typhoon, icon: AlertCircle },
  ];

  // Map our lang to Windy's lang
  const windyLang = lang === 'tc' ? 'zh-TW' : lang === 'sc' ? 'zh' : 'en';

  return (
    <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 text-white border border-white/10 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-2xl font-light tracking-tight">{t.interactiveMap}</h3>
        <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = overlay === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setOverlay(tab.id as MapOverlay)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                  isActive ? "bg-white text-black shadow-lg" : "text-white/60 hover:text-white hover:bg-white/10"
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="relative w-full flex-1 min-h-[400px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black/50">
        <iframe
          width="100%"
          height="100%"
          src={`https://embed.windy.com/embed.html?type=map&location=coordinates&metricRain=mm&metricTemp=%C2%B0C&metricWind=km%2Fh&zoom=7&overlay=${overlay}&product=ecmwf&level=surface&lat=22.303&lon=114.177&detailLat=22.303&detailLon=114.177&detail=true&marker=true&lang=${windyLang}`}
          frameBorder="0"
          className="absolute inset-0"
          title="Windy Weather Map"
        />
      </div>
    </div>
  );
}
