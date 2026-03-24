import { Forecast as ForecastType } from '../types/weather';
import { WeatherIcon } from './WeatherIcon';
import { format, parse } from 'date-fns';
import { enUS, zhTW, zhCN } from 'date-fns/locale';
import { Translation, Lang } from '../lib/i18n';

interface Props {
  forecast: ForecastType;
  t: Translation;
  lang: Lang;
}

export function Forecast({ forecast, t, lang }: Props) {
  const dateLocale = lang === 'tc' ? zhTW : lang === 'sc' ? zhCN : enUS;
  const dayFormat = lang === 'en' ? 'EEE' : 'E';
  const dateFormat = lang === 'en' ? 'MMM d' : 'M月d日';

  return (
    <div className="bg-black/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 text-white border border-white/10">
      <h3 className="text-2xl font-light mb-6 tracking-tight">{t.forecast}</h3>
      <div className="flex overflow-x-auto pb-4 gap-4 snap-x snap-mandatory scrollbar-hide">
        {forecast.weatherForecast.map((day, idx) => {
          const date = parse(day.forecastDate, 'yyyyMMdd', new Date());
          return (
            <div 
              key={idx} 
              className="snap-start shrink-0 w-32 bg-white/5 rounded-2xl p-4 flex flex-col items-center justify-center text-center border border-white/5 hover:bg-white/10 transition-colors group relative"
            >
              <p className="text-sm text-white/60 uppercase tracking-widest font-semibold mb-1">
                {format(date, dayFormat, { locale: dateLocale })}
              </p>
              <p className="text-xs text-white/40 mb-3">{format(date, dateFormat, { locale: dateLocale })}</p>
              <WeatherIcon iconId={day.ForecastIcon} className="w-10 h-10 object-contain drop-shadow-lg mb-3" />
              <div className="flex items-center gap-2 text-lg font-medium">
                <span className="text-white/90">{day.forecastMaxtemp.value}°</span>
                <span className="text-white/40">{day.forecastMintemp.value}°</span>
              </div>
              <div className="mt-3 text-[10px] text-white/40 uppercase tracking-widest">
                RH {day.forecastMinrh.value}-{day.forecastMaxrh.value}%
              </div>
              
              {/* Tooltip for description */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 bg-black/90 text-white text-xs p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 text-center shadow-xl border border-white/10">
                {day.forecastWeather}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
