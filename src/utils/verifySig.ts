import { ethers } from "ethers";
import { Signature } from "./getSigFromUser";

export const verifySignature = (
  unsignedHash: string,
  signature: Signature,
  expectedAddress: string
): boolean => {
  console.log("\nVerifying signature...");

  try {
    const recoveredAddress = ethers.recoverAddress(
      Buffer.from(unsignedHash, "hex"),
      signature
    );
    console.log("Recovered address:", recoveredAddress);
    console.log("Expected address:", expectedAddress);

    if (recoveredAddress.toLowerCase() !== expectedAddress.toLowerCase()) {
      throw new Error(
        `Invalid signature! Recovered address ${recoveredAddress} doesn't match expected ${expectedAddress}`
      );
    }

    console.log("✅ Signature verified successfully!");
    return true;
  } catch (error: any) {
    console.error("Signature verification failed:", error.message);
    throw error;
  }
};
