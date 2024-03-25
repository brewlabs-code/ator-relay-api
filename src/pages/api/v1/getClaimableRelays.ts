import type { APIRoute } from "astro";
import { getClaimableRelays } from "@utils/getClaimableRelays";

export const GET: APIRoute = async ({ request }) => {
  const address = new URL(request.url).searchParams.get(
    "address"
  ) as `0x${string}`;
  const response = await getClaimableRelays(address);
  return response;
};
