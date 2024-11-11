import "server-only";
import { defineLive } from "next-sanity";
import { client } from "./client";

export const { sanityFetch, SanityLive } = defineLive({
  client: client, // تمرير client كخاصية في كائن الإعدادات
});
