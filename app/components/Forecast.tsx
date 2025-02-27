import Image from "next/image";
import { formatUnixTimeToDayOfWeek } from "../utils/formatters";
import { SingleDayWeather } from "../types/internal/weather";

interface IForecastProps {
  forecast: SingleDayWeather[];
  timezoneOffset: number;
}

const Forecast: React.FunctionComponent<IForecastProps> = ({
  forecast,
  timezoneOffset,
}) => {
  return (
    <div>
      <h3 className="text-2xl font-semibold mb-6">5-Day Forecast</h3>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
        {forecast.map((day, index) => (
          <div
            key={index}
            className="bg-blue-50 rounded-lg p-4 text-center flex flex-col items-center"
          >
            <p className="font-semibold text-xl">
              {formatUnixTimeToDayOfWeek(day.dt, timezoneOffset)}
            </p>
            <div className="flex w-fit items-center justify-center bg-white bg-opacity-100 p-3 m-3 rounded-full">
              <Image
                src={`https://openweathermap.org/img/wn/${day.iconId}@2x.png`}
                alt="weather conditions"
                width={75}
                height={75}
              />
            </div>
            <p className="text-xl font-semibold m-1">
              {Math.round(day.temp)}°C
            </p>
            <p className="">{day.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
