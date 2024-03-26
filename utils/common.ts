import Cookies from "js-cookie";
import { format, parseISO } from "date-fns";

export function setCookie(key: string, value: string, options?: object) {
  Cookies.set(key, value, options);
}

export function getCookie(key: string): string | undefined {
  return Cookies.get(key);
}

export function removeCookie(key: string): void {
  Cookies.remove(key);
}

export const generateTimeOptions = () => {
  const timeOptions = [];
  for (let hour = 8; hour <= 22; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const formattedHour = hour.toString().padStart(2, "0");
      const formattedMinute = minute.toString().padStart(2, "0");
      const time = `${formattedHour}:${formattedMinute}`;
      timeOptions.push(time);
    }
  }
  return timeOptions;
};

export const formatDateTime = (isoDateString: string) => {
  const parsedDate = parseISO(isoDateString);
  const formattedDate = format(parsedDate, "dd/MM/yyyy 'lúc' HH:mm");
  return formattedDate;
};

export const updateSearchParams = (type: string, value: string) => {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(type, value);
  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

export const updateMutilpleSearchParams = (paramsToUpdate: any) => {
  const searchParams = new URLSearchParams(window.location.search);

  Object.entries(paramsToUpdate).forEach(([type, value]: any) => {
    searchParams.set(type, value);
  });

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

export const clearAllSearchParams = () => {
  const searchParams = new URLSearchParams(window.location.search);

  // Xóa tất cả các tham số tìm kiếm
  searchParams.forEach((value, key) => {
    searchParams.delete(key);
  });

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};

export const clearSearchParams = (paramsToDelete: string[]) => {
  const searchParams = new URLSearchParams(window.location.search);

  paramsToDelete.forEach((param) => {
    searchParams.delete(param);
  });

  const newPathname = `${window.location.pathname}?${searchParams.toString()}`;

  return newPathname;
};
