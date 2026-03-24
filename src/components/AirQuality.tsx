import { AirQuality as AirQualityType } from '../types/weather';
import { Leaf, Activity } from 'lucide-react';
import { Translation } from '../lib/i18n';

interface Props {
  airQuality: AirQualityType;
  t: Translation;
}

export function AirQuality({ airQuality, t }: Props) {
  const aqi = airQuality.current.european_aqi;
  
  let aqiColor = 'text-green-400';
  let aqiBg = 'bg-green-400/20';
  let aqiLabel = t.good;
  
  if (aqi > 20) { aqiColor = 'text-yellow-400'; aqiBg = 'bg-yellow-400/20'; aqiLabel = t.fair; }
  if (aqi > 40) { aqiColor = 'text-orange-400'; aqiBg = 'bg-orange-400/20'; aqiLabel = t.moderate; }
  if (aqi > 60) { aqiColor = 'text-red-400'; aqiBg = 'bg-red-400/20'; aqiLabel = t.poor; }
  if (aqi > 80) { aqiColor = 'text-purple-400'; aqiBg = 'bg-purple-400/20'; aqiLabel = t.veryPoor; }

  return (
    <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 text-white border border-white/10 h-full">
      <div className="flex items-center gap-3 mb-6">
        <Leaf className="w-6 h-6 text-green-300" />
        <h3 className="text-2xl font-light tracking-tight">{t.airQuality}</h3>
      </div>
      
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-sm text-white/60 uppercase tracking-widest font-semibold mb-1">European AQI</p>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-light tracking-tighter">{aqi}</span>
            <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${aqiBg} ${aqiColor}`}>
              {aqiLabel}
            </span>
          </div>
        </div>
        <Activity className={`w-12 h-12 ${aqiColor} opacity-50`} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
          <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-2">PM2.5</p>
          <p className="text-xl font-medium">{airQuality.current.pm2_5} <span className="text-xs text-white/40">µg/m³</span></p>
        </div>
        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
          <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-2">PM10</p>
          <p className="text-xl font-medium">{airQuality.current.pm10} <span className="text-xs text-white/40">µg/m³</span></p>
        </div>
        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
          <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-2">NO₂</p>
          <p className="text-xl font-medium">{airQuality.current.nitrogen_dioxide} <span className="text-xs text-white/40">µg/m³</span></p>
        </div>
        <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
          <p className="text-xs text-white/40 uppercase tracking-widest font-semibold mb-2">O₃</p>
          <p className="text-xl font-medium">{airQuality.current.ozone} <span className="text-xs text-white/40">µg/m³</span></p>
        </div>
      </div>
    </div>
  );
}
