import type { APIRoute } from "astro";
import { isAddress } from "viem";

import { contract } from "@utils/warp.config";
import { responseOutput } from "@utils/responseOutput";

export const POST: APIRoute = async ({ request }) => {
  const address = new URL(request.url).searchParams.get(
    "address"
  ) as `0x${string}`;

  if (!address)
    return responseOutput({
      status: 400,
      message: "No address provided",
    });

  if (!isAddress(address))
    return responseOutput({
      status: 400,
      message: "Invalid address provided",
    });

  try {
    const { result } = await contract.viewState({
      function: "claimable",
      address,
    });

    // Construct the response
    const returnedData = (result as string[]).map((data) => {
      return {
        fingerprint: data,
        status: "claimable",
        active: false,
        renounceable: false,
        claimable: true,
      };
    });
    const count = Object.keys(result as object).length;
    const message =
      count === 0
        ? "No claimable relays found"
        : "Success. All claimable relays fetched.";

    return responseOutput({
      data: {
        count,
        relays: returnedData,
      },
      message,
      status: 200,
    });
  } catch (error) {
    return responseOutput({
      data: error,
      status: 500,
      message: "Error",
    });
  }
};
