import { WarpFactory } from "warp-contracts";
import { EthersExtension } from "warp-contracts-plugin-ethers";

const warp = WarpFactory.forMainnet({
  inMemory: true,
  dbLocation: "./cache/warp",
}).use(new EthersExtension());

export const contract = warp.contract(import.meta.env.VITE_WARP_CONTRACT);
