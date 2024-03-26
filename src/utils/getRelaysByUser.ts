import { WarpFactory } from "warp-contracts";
import { EthersExtension } from "warp-contracts-plugin-ethers";
import { responseOutput } from "@utils/responseOutput";

export const getRelaysByUser = async (address?: `0x${string}`) => {
  const warp = WarpFactory.forMainnet().use(new EthersExtension());
  const contract = warp.contract("LYtr_ztHqd4nFFSZyYN9_BWIinESJNBVzOJwo1u5dU0");

  if (!address) {
    return responseOutput({
      status: 400,
      message: "Error: No address provided xx",
    });
  }

  try {
    const { result } = await contract.viewState({
      function: "verified",
      address: address,
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
      message: `Success. All relays fetched for ${address}`,
    });
  } catch (error) {
    return responseOutput({
      data: error,
      status: 500,
      message: "Error",
    });
  }
};
