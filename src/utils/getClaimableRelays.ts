import { isAddress } from "viem";
import { WarpFactory } from "warp-contracts";
import { EthersExtension } from "warp-contracts-plugin-ethers";
import { responseOutput } from "@utils/responseOutput";

export const getClaimableRelays = async (address: `0x${string}`) => {
  const warp = WarpFactory.forMainnet().use(new EthersExtension());
  const contract = warp.contract("LYtr_ztHqd4nFFSZyYN9_BWIinESJNBVzOJwo1u5dU0");

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
