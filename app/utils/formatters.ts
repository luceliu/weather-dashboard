import { format, fromUnixTime, addSeconds } from "date-fns";

export const formatUnixTimeToDayOfWeek = (
  unixTime: number,
  timezoneOffset: number
) => {
  // 1. Convert Unix time to Date object (this will be in your local timezone)
  const date = fromUnixTime(unixTime);

  // 2. Get the difference between UTC and local timezone in seconds
  const localOffset = date.getTimezoneOffset() * 60; // getTimezoneOffset returns minutes

  // 3. Adjust the date by applying both offsets
  // This adds the city's offset and removes the local offset
  const adjustedDate = addSeconds(date, timezoneOffset + localOffset);

  return format(date, "E");
};
