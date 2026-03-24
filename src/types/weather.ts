export interface CurrentWeather {
  temperature: {
    data: { place: string; value: number; unit: string }[];
  };
  humidity: {
    data: { place: string; value: number; unit: string }[];
  };
  rainfall: {
    data: { place: string; max: number; unit: string }[];
  };
  uvindex?: {
    data: { place: string; value: number; desc: string }[];
  };
  icon: number[];
  iconUpdateTime: string;
  warningMessage: string[];
}

export interface LocalForecast {
  generalSituation: string;
  tcInfo: string;
  fireDangerWarning: string;
  forecastPeriod: string;
  forecastDesc: string;
  outlook: string;
  updateTime: string;
}

export interface WarningItem {
  name: string;
  code: string;
  actionCode: string;
  issueTime: string;
  updateTime: string;
}

export interface WarningSummary {
  [key: string]: WarningItem;
}

export interface Forecast {
  weatherForecast: {
    forecastDate: string;
    forecastWeek: string;
    forecastMintemp: { value: number; unit: string };
    forecastMaxtemp: { value: number; unit: string };
    forecastMinrh: { value: number; unit: string };
    forecastMaxrh: { value: number; unit: string };
    ForecastIcon: number;
    PSR: string;
    forecastWeather: string;
  }[];
}

export interface AirQuality {
  current: {
    european_aqi: number;
    pm10: number;
    pm2_5: number;
    carbon_monoxide: number;
    nitrogen_dioxide: number;
    sulphur_dioxide: number;
    ozone: number;
  };
}

export interface Wind {
  current: {
    wind_speed_10m: number;
    wind_direction_10m: number;
    wind_gusts_10m: number;
  };
}
