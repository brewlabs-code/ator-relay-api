import type { APIRoute } from "astro";
import { getRelays } from "@utils/getRelays";

export const GET: APIRoute = async () => {
  // Get the data
  const response = await getRelays();
  return response;
};
