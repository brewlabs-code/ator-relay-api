import type { APIRoute } from "astro";
import { contract } from "@utils/warp.config";
import { responseOutput } from "@utils/responseOutput";

export const POST: APIRoute = async () => {
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

    // Manipulate the data
    const addresses = Object.values(result);
    const uniqueAddresses = addresses.filter(
      (addr, index, self) => self.indexOf(addr) === index
    );
    const verifiedKeysCount = Object.keys(result).length;

    return responseOutput({
      data: {
        totalVerifiedRelays: verifiedKeysCount,
        totalUsers: uniqueAddresses.length,
        relays: result,
      },
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
