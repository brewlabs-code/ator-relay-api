import type { APIRoute } from "astro";

import { isAddress } from "viem";
import { WarpFactory } from "warp-contracts";
import { EthersExtension } from "warp-contracts-plugin-ethers";
import { responseOutput } from "@utils/responseOutput";

export const POST: APIRoute = async ({ request }) => {
  const address = new URL(request.url).searchParams.get(
    "address"
  ) as `0x${string}`;

  const warp = WarpFactory.forMainnet().use(new EthersExtension());
  const contract = warp.contract(import.meta.env.VITE_WARP_CONTRACT);

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
