import { useEffect, useState } from "react";
import { apiGet } from "./api";

export function useApiList<T>(path: string, role = "user") {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    setLoading(true);
    apiGet<T[]>(path, role)
      .then((items) => {
        if (active) {
          setData(items);
          setError(null);
        }
      })
      .catch((err: unknown) => {
        if (active) {
          setError(err instanceof Error ? err.message : "Unable to load data");
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [path, role]);

  return { data, setData, loading, error };
}
