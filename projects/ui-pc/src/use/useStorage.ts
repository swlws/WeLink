import { useEffect, useState } from "react";
const NAMESPACE = "_WeLink_";

type useStorageReturnType = [
  (key?: string) => any,
  (key: string, value: any) => void
];

function useStorage(): useStorageReturnType {
  const [cache, setCache] = useState(() => {
    try {
      const str = localStorage.getItem(NAMESPACE);
      const data = JSON.parse(str || "{}");
      return data;
    } catch {
      return {};
    }
  });

  const getItem = (key?: string) => {
    return !key ? cache : cache[key];
  };

  const setItem = (key: string, value: any) => {
    cache[key] = value;
    setCache({ ...cache });
  };

  useEffect(() => {
    localStorage.setItem(NAMESPACE, JSON.stringify(cache));
  }, [cache]);

  return [getItem, setItem];
}

export default useStorage;
