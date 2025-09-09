import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  differenceInYears,
  format,
  formatDistanceToNow,
  isValid,
  parseISO,
} from "date-fns";
import { enUS, Locale, nl } from "date-fns/locale";
import { DriverGroup, Role } from "@/app/generated/prisma/enums";
import { TFunction } from "i18next";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getFullName<T extends { firstName: string; lastName: string }>(
  user: T
): string {
  return `${user.firstName} ${user.lastName}`;
}

const dateFnsLocales: Record<string, Locale> = {
  en: enUS,
  nl: nl,
};

export function formatTimeAgo(date: Date | string): string {
  try {
    let dateObj: Date;

    // If it's already a Date object (from Prisma), use it directly
    if (date instanceof Date) {
      dateObj = date;
    } else {
      // Handle string dates
      if (date.includes("T") || date.includes("Z")) {
        dateObj = parseISO(date);
      } else {
        dateObj = new Date(date);
      }
    }

    // Check if the date is valid
    if (!isValid(dateObj)) {
      console.error("Invalid date:", date);
      return "Invalid date";
    }

    // Use date-fns which handles timezone conversion properly
    return formatDistanceToNow(dateObj, { addSuffix: true });
  } catch (error) {
    console.error("Error formatting date:", error);
    return "";
  }
}

export function getDriverGroup(birthdate: Date): DriverGroup | null {
  const age = differenceInYears(new Date(), birthdate);

  if (age >= 6 && age <= 11) return "MINI";
  if (age >= 12 && age <= 14) return "JUNIOR";
  if (age >= 15 && age <= 99) return "SENIOR";
  return null;
}

export function isPrismaEnumValue<
  T extends Record<string, string>,
  V extends T[keyof T] = T[keyof T],
>(enumObj: T, value: string): value is V {
  return Object.values(enumObj).includes(value as V);
}

export function isEmail(emailOrUsername: string) {
  // Check if it's an email using regex
  const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return EMAIL_REGEX.test(emailOrUsername);
}

// Function that force translates role and driverGroup enums into localized strings
export function overrideWithTEnums<
  T extends { role?: Role; driverGroup?: DriverGroup | null },
>(user: T, t: TFunction<["common"]>): T {
  const translate = (key?: Role | DriverGroup | null) =>
    key ? t(`common:enums.${key}`) : key;

  return {
    ...user,
    role: translate(user.role),
    driverGroup: translate(user.driverGroup),
  };
}
