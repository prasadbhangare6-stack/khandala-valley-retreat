"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { addDaysISO, todayISO } from "./utils";

type BookingState = {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: number;
  setCheckIn: (v: string) => void;
  setCheckOut: (v: string) => void;
  setAdults: (v: number) => void;
  setChildren: (v: number) => void;
  setRooms: (v: number) => void;
  reset: () => void;
};

const BookingContext = createContext<BookingState | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [checkIn, setCheckIn] = useState(() => addDaysISO(todayISO(), 7));
  const [checkOut, setCheckOut] = useState(() => addDaysISO(todayISO(), 9));
  const [adults, setAdults] = useState(2);
  const [childrenCount, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);

  const reset = useCallback(() => {
    setCheckIn(addDaysISO(todayISO(), 7));
    setCheckOut(addDaysISO(todayISO(), 9));
    setAdults(2);
    setChildren(0);
    setRooms(1);
  }, []);

  const value = useMemo(
    () => ({
      checkIn,
      checkOut,
      adults,
      children: childrenCount,
      rooms,
      setCheckIn,
      setCheckOut,
      setAdults,
      setChildren,
      setRooms,
      reset,
    }),
    [checkIn, checkOut, adults, childrenCount, rooms, reset]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}
