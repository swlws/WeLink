import { SiteRecord } from "@/typing";
import { v4 } from "uuid";
import { getDBTable } from "./db/driver";
import { SITE_LINK } from "./db/table";

const tableSiteLink = getDBTable(SITE_LINK);

export function getCategoryList() {
  return getLinkList().then((list) => {
    const set = new Set<string>();
    set.add("All");

    list.forEach((item) => set.add(item.category || ""));

    const rt = Array.from(set).sort((a: any, b: any) => (a < b ? -1 : 1));
    return ["精选", ...rt];
  });
}

export function addOneCateGory(title: string) {
  return getCategoryList().then((list) => {
    const index = list.findIndex((name) => name === title);
    if (index === -1) {
      list.push(title);
    }

    return list;
  });
}

function autoFixRecord(row: SiteRecord) {
  if (!row.category) row.category = "All";
  if (!row.create_time) row.create_time = +new Date();
  if (!row.uuid) row.uuid = v4();
}

export function getLinkList(category?: string) {
  const data: SiteRecord[] = [];
  return tableSiteLink
    .iterate(function (value: SiteRecord) {
      data.push(value);
    })
    .then(() => {
      const list = data.sort((a, b) => (a.count < b.count ? 1 : -1));

      list.forEach(autoFixRecord);

      if (!category || category === "All") return list;
      if (category === "精选") return list.filter((item) => item.star);

      return list.filter((item) => item.category === category);
    });
}
export function getScheduleLinkList() {
  return getLinkList().then((list) => {
    return list
      .filter((item) => !!item.schedule)
      .sort((a, b) => (a.count < b.count ? 1 : -1));
  });
}

export function delOneLink(row: SiteRecord) {
  return tableSiteLink.removeItem(row.uuid);
}

export function upsertOneLink(row: SiteRecord) {
  return tableSiteLink.setItem(row.uuid, row);
}

export async function batchAddLinks(rows: SiteRecord[]) {
  rows.forEach((row) => {
    autoFixRecord(row);
    tableSiteLink.setItem(row.uuid, row);
  });
}

export function clearLinks() {
  return tableSiteLink.dropInstance();
}
