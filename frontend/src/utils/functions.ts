export const RelativeTimeDisplay = (prevDate: Date) => {
  const now = new Date();
  const diffMs = prevDate.getTime() - now.getTime();

  const seconds = Math.round(diffMs / 1000);
  const minutes = Math.round(diffMs / (1000 * 60));
  const hours = Math.round(diffMs / (1000 * 60 * 60));
  const days = Math.round(diffMs / (1000 * 60 * 60 * 24));
  const months = Math.round(diffMs / (1000 * 60 * 60 * 24 * 30.44)); // Average days in a month
  const years = Math.round(diffMs / (1000 * 60 * 60 * 24 * 365.25)); // Average days in a year

  const rtf = new Intl.RelativeTimeFormat("en-US", { numeric: "auto" });

  if (Math.abs(years) > 0) {
    return rtf.format(years, "year");
  } else if (Math.abs(months) > 0) {
    return rtf.format(months, "month");
  } else if (Math.abs(days) > 0) {
    return rtf.format(days, "day");
  } else if (Math.abs(hours) > 0) {
    return rtf.format(hours, "hour");
  } else if (Math.abs(minutes) > 0) {
    return rtf.format(minutes, "minute");
  } else {
    return rtf.format(seconds, "second");
  }
};
