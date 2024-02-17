import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

// Make sure PRIVATE_KEY and API_KEY are provided in your .env file
const PRIVATE_KEY: string | undefined = process.env.PRIVATE_KEY;
const API_KEY: string | undefined = process.env.API_KEY;

if (!PRIVATE_KEY || !API_KEY) {
  throw new Error("PRIVATE_KEY and API_KEY must be defined in the .env file.");
}

const config: HardhatUserConfig = {
  solidity: "0.8.9",
  networks: {
    hardhat: {
      chainId: 31337,
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${API_KEY}`,
      accounts: [PRIVATE_KEY]
    }
  }
};

export default config;
