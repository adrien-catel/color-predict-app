import SunCalc from "suncalc";

export const GetSunTimeInfo = (date, position) => {
    return SunCalc.getTimes(date, position.latitude, position.longitude);
}

export const GetOrderedListSunTimeInfo = (date, position) => {
  var ordered_date_list = new Array();
  // today's date
  var today = new Date();
  // get today's sun info
  var sun_today_info = GetSunTimeInfo(today, position);
  // if we already pass the sunrise
  if (sun_today_info.sunrise < today){
    // we need the tomorrow's info
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    var sun_tomorrow_info = GetSunTimeInfo(tomorrow, position);
    // then we determine which info we display in which order
    if(sun_today_info.sunset > today) {
      // today and tomorrow info
      ordered_date_list[0] = sun_today_info.sunset;
      ordered_date_list[1] = sun_tomorrow_info.sunrise;
    } else {
      // today and tomorrow info
      ordered_date_list[0] = sun_tomorrow_info.sunrise;
      ordered_date_list[1] = sun_tomorrow_info.sunset;
    }
  } else {
    // only today info
    ordered_date_list[0] = sun_today_info.sunrise;
    ordered_date_list[1] = sun_today_info.sunset;
  }
  return ordered_date_list;
}

// https://github.com/mourner/suncalc
// https://github.com/deanbot/dark-sky-api