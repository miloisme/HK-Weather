import { WarningSummary } from '../types/weather';
import { AlertTriangle, Flame, CloudRain, CloudLightning, ThermometerSun, ThermometerSnowflake, Tornado } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { enUS, zhTW, zhCN } from 'date-fns/locale';
import { Lang, Translation } from '../lib/i18n';

interface Props {
  warnings: WarningSummary | null;
  lang: Lang;
  t: Translation;
}

export function WeatherWarnings({ warnings, lang, t }: Props) {
  if (!warnings || Object.keys(warnings).length === 0) return null;

  const dateLocale = lang === 'tc' ? zhTW : lang === 'sc' ? zhCN : enUS;
  const timeFormat = lang === 'en' ? 'h:mm a' : 'HH:mm';

  const getWarningConfig = (code: string) => {
    if (code.startsWith('WFIRE')) return { icon: Flame, color: 'text-orange-400', bg: 'bg-orange-500/20', border: 'border-orange-500/50' };
    if (code.startsWith('WRAIN')) return { icon: CloudRain, color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/50' };
    if (code.startsWith('WTCSGN')) return { icon: Tornado, color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/50' };
    if (code.startsWith('WHOT')) return { icon: ThermometerSun, color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/50' };
    if (code.startsWith('WCOLD')) return { icon: ThermometerSnowflake, color: 'text-blue-400', bg: 'bg-blue-500/20', border: 'border-blue-500/50' };
    if (code.startsWith('WTSTM')) return { icon: CloudLightning, color: 'text-yellow-400', bg: 'bg-yellow-500/20', border: 'border-yellow-500/50' };
    
    return { icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/20', border: 'border-red-500/50' };
  };

  return (
    <div className="flex flex-col gap-3">
      {Object.values(warnings).map((warning, idx) => {
        const config = getWarningConfig(warning.code);
        const Icon = config.icon;
        
        return (
          <div key={idx} className={`${config.bg} border ${config.border} rounded-3xl p-4 md:p-6 flex items-center gap-4 shadow-lg backdrop-blur-md`}>
            <div className={`${config.bg} p-3 rounded-full shrink-0`}>
              <Icon className={`w-8 h-8 ${config.color}`} />
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold text-lg md:text-xl tracking-tight">{warning.name}</h3>
              <p className="text-white/70 text-sm mt-1">
                {t.issuedAt}
                {format(parseISO(warning.issueTime), timeFormat, { locale: dateLocale })}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
