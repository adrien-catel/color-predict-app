// images location
import ImgClearDay from "/img/climacons/svg/Sun.svg";
import ImgClearNight from "/img/climacons/svg/Moon.svg";
import ImgRain from "/img/climacons/svg/Cloud-Rain.svg";
import ImgSnow from "/img/climacons/svg/Cloud-Snow.svg";
import ImgSleet from "/img/climacons/svg/Cloud-Drizzle.svg";
import ImgWind from "/img/climacons/svg/Wind.svg";
import ImgFog from "/img/climacons/svg/Cloud-Fog.svg";
import ImgCloudy from "/img/climacons/svg/Cloud-Sun.svg";
import ImgCloudyDay from "/img/climacons/svg/Cloud-Sun.svg";
import ImgCloudyNight from "/img/climacons/svg/Cloud-Moon.svg";
import ImgTornado from "/img/climacons/svg/Tornado.svg";
import ImgHail from "/img/climacons/svg/Cloud-Hail.svg";
import ImgThunderstorm from "/img/climacons/svg/Cloud-Lightning.svg";
import ImgDefault from "/img/climacons/svg/Umbrella.svg";

// values from Dark Sky API
export const IconsBase = {
    clear_day: "clear_day",
    clear_night: "clear_night",
    rain: "rain",
    snow: "snow",
    sleet: "sleet",
    wind: "wind",
    fog: "fog",
    cloudy: "cloudy",
    partly_cloudy_day: "partly-cloudy-day",
    partly_cloudy_night: "partly-cloudy-night",
    tornado: "tornado",
    hail: "hail",
    thunderstorm: "thunderstorm",
};

// return icon from dark sky api icon name
export const getIcon = function(icon_name) {
  switch(icon_name) {
    case IconsBase.clear_day:
      return ImgClearDay;
    case IconsBase.clear_night:
      return ImgClearNight;
    case IconsBase.rain:
      return ImgRain;
    case IconsBase.snow:
      return ImgSnow;
    case IconsBase.sleet:
      return ImgSleet;
    case IconsBase.wind:
      return ImgWind;
    case IconsBase.fog:
      return ImgFog;
    case IconsBase.cloudy:
      return ImgCloudy;
    case IconsBase.partly_cloudy_day:
      return ImgCloudyDay;
    case IconsBase.partly_cloudy_night:
      return ImgCloudyNight;
    case IconsBase.tornado:
      return ImgTornado;
    case IconsBase.hail:
      return ImgHail;
    case IconsBase.thunderstorm:
      return ImgThunderstorm;
    default:
      return ImgDefault;
  }
}
