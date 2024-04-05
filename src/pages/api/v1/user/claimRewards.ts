import type { APIRoute } from "astro";
import { contract } from "@utils/warp.config";
import { responseOutput } from "@utils/responseOutput";

export const POST: APIRoute = async ({ request }) => {
  const fingerprint = new URL(request.url).searchParams.get(
    "fingerprint"
  ) as `0x${string}`;

  if (!fingerprint)
    return responseOutput({
      status: 400,
      message: "No fingerprint provided",
    });

  try {
    const { result, type, errorMessage } = await contract.viewState({
      function: "claim",
      fingerprint,
    });

    if (type === "error" || type === "exception")
      return responseOutput({
        status: 400,
        message: `Error. ${errorMessage}`,
      });

    return responseOutput({
      data: result,
      message: "Success. Claimed rewards.",
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
