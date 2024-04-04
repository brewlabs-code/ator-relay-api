import type { APIRoute } from "astro";

import { isAddress } from "viem";
import { responseOutput } from "@utils/responseOutput";

const getClaimableRewards = async (address: `0x${string}`) => {
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
    // const { result } = await contract.viewState({
    //   function: "claimable",
    //   address,
    // });

    // Mocking return value
    let result = { claimableRewards: 453.547 };

    return responseOutput({
      data: result,
      status: 200,
      message: "Success. All relays fetched.",
    });
  } catch (error) {
    return responseOutput({
      data: error,
      status: 500,
      message: "Error",
    });
  }
};

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const address = body.address as `0x${string}`;
  // Get the data
  const response = await getClaimableRewards(address);
  return response;
};
