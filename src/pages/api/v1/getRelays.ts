import type { APIRoute } from "astro";
import { getRelays } from "@utils/getRelays";

export const POST: APIRoute = async () => {
  // Get the data
  const response = await getRelays();
  return response;
};
