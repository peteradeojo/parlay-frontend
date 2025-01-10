import { format, parse } from "date-fns";

/**
 *
 * @param {string|object|Date} date
 */
export const formatDate = (date, format_string = undefined) => {
  if (!date) return "";
  if (typeof date == "string") {
    return format(new Date(date), "yyyy-MM-dd");
  }

  return format(date, format_string);
};

export const formatTime = (time) => {
  if (!time) return "";
  return format(parse(time, "HH:mm:ss", new Date()), "hh:mm a");
};

export const formatDateTime = (date) => {
  return format(date, "yyyy-MM-dd hh:mm a");
};

export const combineDateAndTime = (date, time) => {};
