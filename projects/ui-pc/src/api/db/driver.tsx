import localforage from "localforage";

const DRIVER_MAP = new Map();

export function getDBTable(storeName: string): LocalForage {
  if (!DRIVER_MAP.has(storeName)) {
    DRIVER_MAP.set(
      storeName,
      localforage.createInstance({
        name: "WeLink",
        storeName,
      })
    );
  }

  return DRIVER_MAP.get(storeName);
}
