import dayjs from "dayjs";
import WeekDayPlugin from "dayjs/plugin/weekday";
import updateLocale from "dayjs/plugin/updateLocale";
import isToday from "dayjs/plugin/isToday";
import isYesterday from "dayjs/plugin/isYesterday";

// Extend Day.js with the plugins
dayjs.extend(WeekDayPlugin);
dayjs.extend(updateLocale);
dayjs.extend(isToday);
dayjs.extend(isYesterday);
// Update locale if needed (replace with your preferred locale data)
// dayjs.updateLocale("en", {
//   weekStart: 1, // Start the week on Monday
// });

export class DateUtils {
  static isToday(value: dayjs.Dayjs) {
    return dayjs(value).isToday();
  }

  static isYesterday(value: dayjs.Dayjs) {
    return dayjs(value).isYesterday();
  }
}
