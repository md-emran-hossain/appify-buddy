import { format, differenceInMinutes, differenceInHours, differenceInCalendarDays } from "date-fns";

export function formatPostTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const mins = differenceInMinutes(now, date);
  const hours = differenceInHours(now, date);
  const days = differenceInCalendarDays(now, date);

  if (mins < 1) return "now";
  if (mins < 60) return `${mins}m`;
  if (hours < 24) return `${hours}h`;
  if (days === 1) return "Yesterday";
  return format(date, "MMM d, yyyy 'at' h:mm a");
}
