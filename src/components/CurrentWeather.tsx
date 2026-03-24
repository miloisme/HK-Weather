import { CurrentWeather as CurrentWeatherType, Wind, LocalForecast } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';
import { Droplets, Wind as WindIcon, Umbrella } from 'lucide-react';
import { Translation } from '../lib/i18n';

interface Props {
  current: CurrentWeatherType;
  wind: Wind;
  localForecast: LocalForecast | null;
  t: Translation;
}

export function CurrentWeather({ current, wind, localForecast, t }: Props) {
  const hkoTemp = current.temperature.data.find(d => d.place === 'Hong Kong Observatory' || d.place === '香港天文台')?.value || current.temperature.data[0]?.value;
  const humidity = current.humidity.data[0]?.value;
  const iconId = current.icon[0];
  const rainfall = current.rainfall.data.find(d => d.place === 'Yau Tsim Mong' || d.place === '油尖旺')?.max || 0;
  
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 md:p-8 text-white shadow-2xl border border-white/20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex items-center gap-6">
          <div className="bg-white/20 p-4 rounded-2xl shrink-0">
            <WeatherIcon iconId={iconId} className="w-16 h-16 object-contain drop-shadow-lg" />
          </div>
          <div>
            <h2 className="text-6xl font-light tracking-tighter">{hkoTemp}°C</h2>
            <p className="text-white/70 text-lg mt-1 font-medium">{t.hko}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
          <div className="bg-black/20 rounded-2xl p-4 flex items-center gap-3">
            <Droplets className="w-6 h-6 text-blue-300 shrink-0" />
            <div>
              <p className="text-xs text-white/60 uppercase tracking-wider font-semibold">{t.humidity}</p>
              <p className="text-xl font-medium">{humidity}%</p>
            </div>
          </div>
          <div className="bg-black/20 rounded-2xl p-4 flex items-center gap-3">
            <WindIcon className="w-6 h-6 text-teal-300 shrink-0" />
            <div>
              <p className="text-xs text-white/60 uppercase tracking-wider font-semibold">{t.wind}</p>
              <p className="text-xl font-medium">{wind.current.wind_speed_10m} <span className="text-sm">km/h</span></p>
            </div>
          </div>
          <div className="bg-black/20 rounded-2xl p-4 flex items-center gap-3">
            <Umbrella className="w-6 h-6 text-purple-300 shrink-0" />
            <div>
              <p className="text-xs text-white/60 uppercase tracking-wider font-semibold">{t.rainfall}</p>
              <p className="text-xl font-medium">{rainfall} <span className="text-sm">mm</span></p>
            </div>
          </div>
          <div className="bg-black/20 rounded-2xl p-4 flex items-center gap-3">
            <WindIcon className="w-6 h-6 text-orange-300 shrink-0" style={{ transform: `rotate(${wind.current.wind_direction_10m}deg)` }} />
            <div>
              <p className="text-xs text-white/60 uppercase tracking-wider font-semibold">{t.direction}</p>
              <p className="text-xl font-medium">{wind.current.wind_direction_10m}°</p>
            </div>
          </div>
        </div>
      </div>

      {localForecast && (
        <div className="mt-8 pt-6 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-sm text-white/60 uppercase tracking-widest font-semibold mb-2">{t.generalSituation}</h3>
              <p className="text-white/90 text-sm leading-relaxed">{localForecast.generalSituation}</p>
            </div>
            <div>
              <h3 className="text-sm text-white/60 uppercase tracking-widest font-semibold mb-2">{t.localForecast}</h3>
              <p className="text-white/90 text-sm leading-relaxed">{localForecast.forecastDesc}</p>
              {localForecast.outlook && (
                <p className="text-white/80 text-sm leading-relaxed mt-2">{localForecast.outlook}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
