import { useEffect, useState } from "react";
import { authThunks } from "../features/auth/auth.slice";
import { useAppDispatch, useAppSelector } from "../app/hooks";

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  const isAuthenticated = useAppSelector((state) => state.auth.profile);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
