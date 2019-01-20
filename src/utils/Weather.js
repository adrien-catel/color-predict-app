import SunCalc from "suncalc";

export const GetSunTimeInfo = function(date, position) {
    return SunCalc.getTimes(date, position.latitude, position.longitude);
}

// https://github.com/mourner/suncalc
// https://github.com/deanbot/dark-sky-api