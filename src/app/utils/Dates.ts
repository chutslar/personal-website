import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

const easterDatesMap = new Map();
easterDatesMap.set(2024, [3, 31]);
easterDatesMap.set(2025, [4, 20]);
easterDatesMap.set(2026, [4, 5]);
easterDatesMap.set(2027, [3, 28]);
easterDatesMap.set(2028, [4, 16]);
easterDatesMap.set(2029, [4, 1]);
easterDatesMap.set(2030, [4, 21]);
easterDatesMap.set(2031, [4, 13]);
easterDatesMap.set(2032, [3, 28]);
easterDatesMap.set(2033, [4, 17]);
easterDatesMap.set(2034, [4, 9]);
easterDatesMap.set(2035, [3, 25]);
easterDatesMap.set(2036, [4, 13]);
easterDatesMap.set(2037, [4, 5]);
easterDatesMap.set(2038, [4, 25]);
easterDatesMap.set(2039, [4, 10]);
easterDatesMap.set(2040, [4, 1]);
easterDatesMap.set(2041, [4, 21]);
easterDatesMap.set(2042, [4, 6]);
easterDatesMap.set(2043, [3, 29]);
easterDatesMap.set(2044, [4, 17]);
easterDatesMap.set(2045, [4, 9]);
easterDatesMap.set(2046, [3, 25]);
easterDatesMap.set(2047, [4, 14]);
easterDatesMap.set(2048, [4, 5]);
easterDatesMap.set(2049, [4, 18]);
easterDatesMap.set(2050, [4, 10]);
easterDatesMap.set(2051, [4, 2]);
easterDatesMap.set(2052, [4, 21]);
easterDatesMap.set(2053, [4, 6]);
easterDatesMap.set(2054, [3, 29]);
easterDatesMap.set(2055, [4, 18]);
easterDatesMap.set(2056, [4, 2]);
easterDatesMap.set(2057, [4, 22]);
easterDatesMap.set(2058, [4, 14]);
easterDatesMap.set(2059, [3, 30]);
easterDatesMap.set(2060, [4, 18]);
easterDatesMap.set(2061, [4, 10]);
easterDatesMap.set(2062, [3, 26]);
easterDatesMap.set(2063, [4, 15]);
easterDatesMap.set(2064, [4, 6]);
easterDatesMap.set(2065, [3, 29]);
easterDatesMap.set(2066, [4, 11]);
easterDatesMap.set(2067, [4, 3]);
easterDatesMap.set(2068, [4, 22]);
easterDatesMap.set(2069, [4, 14]);
easterDatesMap.set(2070, [3, 30]);
easterDatesMap.set(2071, [4, 19]);
easterDatesMap.set(2072, [4, 10]);
easterDatesMap.set(2073, [3, 26]);
easterDatesMap.set(2074, [4, 15]);
easterDatesMap.set(2075, [4, 7]);
easterDatesMap.set(2076, [4, 19]);
easterDatesMap.set(2077, [4, 11]);
easterDatesMap.set(2078, [4, 3]);
easterDatesMap.set(2079, [4, 23]);
easterDatesMap.set(2080, [4, 7]);
easterDatesMap.set(2081, [3, 30]);
easterDatesMap.set(2082, [4, 19]);
easterDatesMap.set(2083, [4, 4]);
easterDatesMap.set(2084, [3, 26]);
easterDatesMap.set(2085, [4, 15]);
easterDatesMap.set(2086, [3, 31]);
easterDatesMap.set(2087, [4, 20]);
easterDatesMap.set(2088, [4, 11]);
easterDatesMap.set(2089, [4, 3]);
easterDatesMap.set(2090, [4, 16]);
easterDatesMap.set(2091, [4, 8]);
easterDatesMap.set(2092, [3, 30]);
easterDatesMap.set(2093, [4, 12]);
easterDatesMap.set(2094, [4, 4]);
easterDatesMap.set(2095, [4, 24]);
easterDatesMap.set(2096, [4, 15]);
easterDatesMap.set(2097, [3, 31]);
easterDatesMap.set(2098, [4, 20]);
easterDatesMap.set(2099, [4, 12]);

dayjs.extend(isSameOrAfter);

export function isEaster(date: dayjs.Dayjs): Boolean {
  const monthDay = easterDatesMap.get(date.year());
  if (monthDay != null) {
    return monthDay.first == date.month() && monthDay.second == date.date();
  }
  return false;
}

export function isLent(date: dayjs.Dayjs): Boolean {
  const easterDate = easterForYear(date.year());
  if (easterDate) {
    const daysUntilEaster = dayjs(date).diff(easterDate, "days");
    return daysUntilEaster >= 4 && daysUntilEaster <= 46;
  }
  return false;
}

export function isAdvent(date: dayjs.Dayjs): Boolean {
  const christmasDate = dayjs()
    .year(date.year())
    .month(12)
    .date(25)
    .startOf("day");
  if (date.isSame(christmasDate, "day")) {
    return true;
  }
  const sundayBeforeChristmas =
    christmasDate.day() == 0
      ? christmasDate.subtract(1, "week")
      : christmasDate.day(0);
  const adventStart = sundayBeforeChristmas.subtract(3, "weeks");
  return date.isSameOrAfter(adventStart) && date.isBefore(christmasDate);
}

export function easterForYear(year: number): dayjs.Dayjs | undefined {
  const monthDay = easterDatesMap.get(year);
  if (monthDay) {
    const date = dayjs()
      .year(year)
      .month(monthDay.first)
      .date(monthDay.second)
      .startOf("day");
    return date;
  }
  return undefined;
}

export function startOfDay(date: Date): dayjs.Dayjs {
  return dayjs(date).startOf("day");
}
