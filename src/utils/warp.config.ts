import { WarpFactory } from "warp-contracts";
import { EthersExtension } from "warp-contracts-plugin-ethers";

const warpDev = WarpFactory.forMainnet({
  inMemory: true,
  dbLocation: "./cache/warp",
}).use(new EthersExtension());

const warpProd = WarpFactory.forMainnet().use(new EthersExtension());

const warp = import.meta.env.MODE === "development" ? warpDev : warpProd;

export const contract = warp.contract(import.meta.env.VITE_WARP_CONTRACT);
