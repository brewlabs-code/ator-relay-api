import type { APIRoute } from "astro";
import { getRelays } from "@utils/getRelays";

export const GET: APIRoute = async ({ request }) => {
  const address = new URL(request.url).searchParams.get(
    "address"
  ) as `0x${string}`;
  // Get the data
  const response = await getRelays(address);
  return response;
};
