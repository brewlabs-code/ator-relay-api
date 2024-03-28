import type { APIRoute } from "astro";
import { WarpFactory } from "warp-contracts";
import { EthersExtension } from "warp-contracts-plugin-ethers";
import { responseOutput } from "@utils/responseOutput";

const mockData = [
  {
    relay: "05532D97C632B62DF89E783BBF0A02BB2A192179",
    fingerprint: "0x0B72FE559B08D65B9ED64936EB52D28DD2C12B4D",
    status: "verified",
    active: true,
  },
  {
    relay: "065624A930062AB264E96CD524BD9F5BAD339BA8",
    fingerprint: "0x0B72FE559B08D65B9ED64936EB52D28DD2C12B4D",
    status: "verified",
    active: true,
  },
  {
    relay: "082A9668B82BC67DAB81819F5B1C9F5A48049FB3",
    fingerprint: "0x0B72FE559B08D65B9ED64936EB52D28DD2C12B4D",
    status: "verified",
    active: true,
  },
  {
    relay: "09DC138DAEDD1CC461950E9FAA7779586E429974",
    fingerprint: "0x0B72FE559B08D65B9ED64936EB52D28DD2C12B4D",
    status: "verified",
    active: true,
  },
  {
    relay: "0B4A2A488E2B5772A1FB96638C7FAA7F790117B2",
    fingerprint: "0x0B72FE559B08D65B9ED64936EB52D28DD2C12B4D",
    status: "verified",
    active: true,
  },
  {
    relay: "0B72FE559B08D65B9ED64936EB52D28DD2C12B4D",
    fingerprint: "0x0B72FE559B08D65B9ED64936EB52D28DD2C12B4D",
    status: "verified",
    active: true,
  },
  {
    relay: "0C7C783A1B8CA59C6E7336F0CA3686DC20E7C8DC",
    fingerprint: "0x0B72FE559B08D65B9ED64936EB52D28DD2C12B4D",
    status: "verified",
    active: true,
  },
  {
    relay: "0DE9BB713F628E5AAC0300B7C4CD5365589B4DFC",
    fingerprint: "0x0B72FE559B08D65B9ED64936EB52D28DD2C12B4D",
    status: "verified",
    active: true,
  },
  {
    relay: "1119479099A2CB33CEF47DE40986ED79D8BC9065",
    fingerprint: "0x0B72FE559B08D65B9ED64936EB52D28DD2C12B4D",
    status: "verified",
    active: true,
  },
];

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const address = body.address as `0x${string}`;

  // Query the contract
  const warp = WarpFactory.forMainnet().use(new EthersExtension());
  const contract = warp.contract(import.meta.env.VITE_WARP_CONTRACT);

  if (!address)
    return responseOutput({
      status: 400,
      message: "No address provided",
    });

  try {
    // const { result } = await contract.viewState({
    //   function: "verified",
    // });

    const result = mockData;

    if (!result) {
      return responseOutput({
        status: 400,
        message: "No relays found",
      });
    }

    return responseOutput({
      data: {
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
