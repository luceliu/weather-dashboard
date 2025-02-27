import { format, fromUnixTime } from "date-fns";

export const formatUnixTimeToDayOfWeek = (unixTime: number) => {
  const date = fromUnixTime(unixTime);
  return format(date, "E");
};
