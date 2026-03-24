interface WeatherIconProps {
  iconId: number;
  className?: string;
}

export function WeatherIcon({ iconId, className }: WeatherIconProps) {
  return (
    <img
      src={`https://www.hko.gov.hk/images/wxicon/pic${iconId}.png`}
      alt={`Weather Icon ${iconId}`}
      className={className}
      referrerPolicy="no-referrer"
    />
  );
}
