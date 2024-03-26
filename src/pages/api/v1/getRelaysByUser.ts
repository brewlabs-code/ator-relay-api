import type { APIRoute } from "astro";
import { getRelaysByUser } from "@utils/getRelaysByUser";

export const POST: APIRoute = async ({ request }) => {
  const address = new URL(request.url).searchParams.get(
    "address"
  ) as `0x${string}`;

  // Get the data
  const response = await getRelaysByUser(address);
  return response;
};
