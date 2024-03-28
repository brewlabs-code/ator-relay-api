import type { APIRoute } from "astro";
import { WarpFactory } from "warp-contracts";
import { EthersExtension } from "warp-contracts-plugin-ethers";
import { responseOutput } from "@utils/responseOutput";

export const POST: APIRoute = async () => {
  // Query the contract
  const warp = WarpFactory.forMainnet().use(new EthersExtension());
  const contract = warp.contract(import.meta.env.VITE_WARP_CONTRACT);

  const { sortKey, cachedValue } = await contract.readState();

  try {
    const { result } = await contract.viewState({
      function: "verified",
    });

    if (!result) {
      return responseOutput({
        status: 400,
        message: "No relays found",
      });
    }

    const addresses = Object.values(result);
    const uniqueAddresses = addresses.filter(
      (addr, index, self) => self.indexOf(addr) === index
    );

    const verifiedKeysCount = Object.keys(result).length;

    return responseOutput({
      data: {
        totalVerifiedRelays: verifiedKeysCount,
        totalUsers: uniqueAddresses.length,
      },
      status: 200,
      message: "Success. All relays fetched.",
    });
  } catch (error) {
    return responseOutput({
      data: error,
      status: 500,
      message: JSON.stringify(cachedValue.errorMessages) || "Error",
    });
  }
};
