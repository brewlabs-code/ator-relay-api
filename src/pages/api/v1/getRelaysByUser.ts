import type { APIRoute } from "astro";
import { getRelays } from "@utils/getRelays";

export const GET: APIRoute = async (address: `0x${string}`) => {
  // Get the data
  const response = await getRelays();
  return response;
};
