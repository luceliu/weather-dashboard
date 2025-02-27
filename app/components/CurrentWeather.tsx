import Image from "next/image";
import { SingleDayWeather } from "../types/internal/weather";

interface ICurrentWeatherProps {
  currentWeather: SingleDayWeather;
}

const CurrentWeather: React.FunctionComponent<ICurrentWeatherProps> = ({
  currentWeather,
}) => {
  return (
    <div className="mb-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-lg p-6 text-white">
      <div className="flex justify-between items-center p-4">
        <div>
          <div className="">
            <p className="text-2xl">Today</p>
            <h3 className="text-6xl font-bold my-2">
              {Math.round(currentWeather.temp)} °C
            </h3>
            <p className="text-xl">{currentWeather.description}</p>
          </div>
        </div>
        <div className="flex items-center justify-center bg-white bg-opacity-20 p-3 rounded-full">
          <Image
            src={`https://openweathermap.org/img/wn/${currentWeather.iconId}@2x.png`}
            alt="current conditions"
            width={100}
            height={100}
          />
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
