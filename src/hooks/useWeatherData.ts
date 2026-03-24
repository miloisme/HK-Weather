import { useState, useEffect } from 'react';
import { CurrentWeather, Forecast, AirQuality, Wind, LocalForecast, WarningSummary } from '../types/weather';
import { Lang } from '../lib/i18n';

export function useWeatherData(lang: Lang) {
  const [current, setCurrent] = useState<CurrentWeather | null>(null);
  const [forecast, setForecast] = useState<Forecast | null>(null);
  const [localForecast, setLocalForecast] = useState<LocalForecast | null>(null);
  const [warnings, setWarnings] = useState<WarningSummary | null>(null);
  const [airQuality, setAirQuality] = useState<AirQuality | null>(null);
  const [wind, setWind] = useState<Wind | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const [currentRes, forecastRes, localRes, warnRes, aqRes, windRes] = await Promise.all([
          fetch(`https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=rhrread&lang=${lang}`).then(r => r.json()),
          fetch(`https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=fnd&lang=${lang}`).then(r => r.json()),
          fetch(`https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=flw&lang=${lang}`).then(r => r.json()),
          fetch(`https://data.weather.gov.hk/weatherAPI/opendata/weather.php?dataType=warnsum&lang=${lang}`)
            .then(r => r.text())
            .then(text => text ? JSON.parse(text) : {}),
          fetch('https://air-quality-api.open-meteo.com/v1/air-quality?latitude=22.3193&longitude=114.1694&current=european_aqi,pm10,pm2_5,carbon_monoxide,nitrogen_dioxide,sulphur_dioxide,ozone&timezone=Asia%2FSingapore').then(r => r.json()),
          fetch('https://api.open-meteo.com/v1/forecast?latitude=22.3193&longitude=114.1694&current=wind_speed_10m,wind_direction_10m,wind_gusts_10m&timezone=Asia%2FSingapore').then(r => r.json())
        ]);

        setCurrent(currentRes);
        setForecast(forecastRes);
        setLocalForecast(localRes);
        setWarnings(typeof warnRes === 'object' ? warnRes : {});
        setAirQuality(aqRes);
        setWind(windRes);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch weather data'));
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [lang]);

  return { current, forecast, localForecast, warnings, airQuality, wind, loading, error };
}
