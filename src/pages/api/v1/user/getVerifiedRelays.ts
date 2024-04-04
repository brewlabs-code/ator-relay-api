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
      function: "verified",
      address,
    });

    // Construct the response
    const returnedData = (result as string[]).map((data) => {
      return {
        fingerprint: data,
        status: "verified",
        active: true,
        renounceable: true,
        claimable: true,
      };
    });
    const count = Object.keys(result as object).length;
    const message =
      count === 0
        ? "No verified relays found"
        : "Success. All verified relays fetched.";

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
