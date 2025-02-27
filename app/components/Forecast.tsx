import Image from "next/image";
import {
  formatToTempInCelsius,
  formatUnixTimeToDayOfWeek,
  formatWeatherIconUrl,
} from "../utils/formatters";
import { SingleDayWeather } from "../types/internal/weather";

interface IForecastProps {
  forecast: SingleDayWeather[];
  timezoneOffset: number;
  visibleDaysCount: number;
}

const Forecast: React.FunctionComponent<IForecastProps> = ({
  forecast,
  timezoneOffset,
  visibleDaysCount,
}) => {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-6">
        {visibleDaysCount}-Day Forecast
      </h3>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
        {forecast.map((day, index) => (
          <ForecastDay day={day} timezoneOffset={timezoneOffset} key={index} />
        ))}
      </div>
    </div>
  );
};

const ForecastDay: React.FC<{
  day: SingleDayWeather;
  timezoneOffset: number;
}> = ({ day, timezoneOffset }) => {
  return (
    <div className="bg-blue-50 rounded-lg p-4 text-center flex flex-col items-center">
      <p className="font-semibold text-xl">
        {formatUnixTimeToDayOfWeek(day.dt, timezoneOffset)}
      </p>
      <div className="flex w-fit items-center justify-center bg-white bg-opacity-100 p-3 m-3 rounded-full">
        <Image
          src={formatWeatherIconUrl(day.iconId)}
          alt="weather conditions"
          width={75}
          height={75}
        />
      </div>
      <p className="text-xl font-semibold m-1">
        {formatToTempInCelsius(day.temp)}
      </p>
      <p>{day.description}</p>
    </div>
  );
};
export default Forecast;
