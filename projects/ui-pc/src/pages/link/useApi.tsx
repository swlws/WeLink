import { SiteRecord } from "@/typing";
import useStorage from "@/use/useStorage";
import dayjs from "dayjs";

const CACHE_KEY_SITE = "site_list";

export default function useApi() {
  const [getItem, setItem] = useStorage();

  const getCategoryList: () => Promise<string[]> = async () => {
    return getLinkList().then((list) => {
      const set = new Set<string>();
      set.add("All");

      list.forEach((item) => set.add(item.category || ""));

      return Array.from(set).sort((a: any, b: any) => (a < b ? -1 : 1));
    });
  };

  const addOneCateGory = async (title: string) => {
    return getCategoryList().then((list) => {
      const index = list.findIndex((name) => name === title);
      if (index === -1) {
        list.push(title);
      }

      return list;
    });
  };

  const getLinkList: (category?: string) => Promise<SiteRecord[]> = async (
    category?: string
  ) => {
    const data: SiteRecord[] = getItem(CACHE_KEY_SITE) || [];
    const list = data.sort((a, b) => (a.count < b.count ? 1 : -1));

    list.forEach((item) => {
      if (!item.category) item.category = "All";
      if (!item.create_time) item.create_time = dayjs().toISOString();
    });

    if (!category || category === "All") return list;

    return list.filter((item) => item.category === category);
  };

  const delOneLink = async (row: SiteRecord) => {
    return getLinkList().then((list) => {
      const index = list.findIndex(
        (item) => item.title === row.title && item.url === row.url
      );
      if (index !== -1) list.splice(index, 1);
      setItem(CACHE_KEY_SITE, list);

      return list;
    });
  };

  const addOneLink = async (row: SiteRecord) => {
    return getLinkList().then((list) => {
      list.push(row);
      setItem(CACHE_KEY_SITE, list);

      return list;
    });
  };

  const updateOneLink = async (row: SiteRecord) => {
    return getLinkList().then((list) => {
      const index = list.findIndex(
        (item) => item.title === row.title && item.url === row.url
      );
      if (index !== -1) list.splice(index, 1, row);
      setItem(CACHE_KEY_SITE, list);

      return list;
    });
  };

  return {
    getCategoryList,
    addOneCateGory,
    getLinkList,
    delOneLink,
    addOneLink,
    updateOneLink,
  };
}
