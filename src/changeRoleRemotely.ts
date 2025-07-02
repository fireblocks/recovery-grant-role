import { ethers, Interface } from "ethers";
import { abi } from "./abi";
import { getSignatureFromUser } from "./utils/getSigFromUser";
import { verifySignature } from "./utils/verifySig";
import { getRoleGrantParams } from "./utils/getRoleGrantParams";


interface ChainData {
  nonce: number;
  feeData: ethers.FeeData;
  network: ethers.Network;
}
const getChainData = async (
  provider: ethers.JsonRpcProvider,
  address: string
): Promise<ChainData> => {
  try {
    const [nonce, feeData, network] = await Promise.all([
      provider.getTransactionCount(address, "pending"),
      provider.getFeeData(),
      provider.getNetwork(),
    ]);

    return { nonce, feeData, network };
  } catch (e) {
    console.error(e);
    throw e;
  }
};

const main = async () => {
  try {
    // Prompt user for contract, from, to, and role
    const { contractAddress, fromAddress, toAddress, role } = await getRoleGrantParams();

    const contractInterface = new Interface(abi);
    const provider = new ethers.JsonRpcProvider("https://eth.drpc.org");

    const contract = new ethers.Contract(
      contractAddress,
      contractInterface,
      provider
    );
    const data = await contract.grantRole.populateTransaction(role, toAddress);

    const { nonce, feeData, network } = await getChainData(
      provider,
      fromAddress
    );

    let gasLimit = await provider.estimateGas({
      to: contractAddress,
      from: fromAddress,
      data: data.data,
    });

    gasLimit = BigInt((Number(gasLimit) * 1.2).toFixed(0));

    const tx = {
      to: contractAddress,
      data: data.data,
      nonce,
      gasLimit,
      maxFeePerGas: feeData.maxFeePerGas,
      maxPriorityFeePerGas: feeData.maxPriorityFeePerGas,
      chainId: network.chainId,
      type: 2,
    };
    const unsignedTx = ethers.Transaction.from(tx);
    const hashForRecovery = unsignedTx.unsignedHash.slice(2);
    console.log("Hash for recovery:", hashForRecovery);

    const signature = await getSignatureFromUser(hashForRecovery);

    verifySignature(hashForRecovery, signature, fromAddress);

    const signedTx = ethers.Transaction.from({
      ...tx,
      signature: signature,
    });
    const signedTxData = signedTx.serialized;
    console.log("\nSigned Transaction Data:", signedTxData);

    const txResponse = await provider.broadcastTransaction(signedTxData);
    console.log("\nTransaction sent successfully!");
    console.log("Transaction hash:", txResponse.hash);
    console.log(
      "View on Etherscan: https://etherscan.io/tx/" + txResponse.hash
    );

    // Wait for confirmation
    console.log("\nWaiting for confirmation...");
    const receipt = await txResponse.wait();

    if (receipt && receipt.status === 1) {
      console.log("\nTransaction confirmed successfully!");
      console.log("Block number:", receipt.blockNumber);
      console.log("Gas used:", receipt.gasUsed.toString());
    } else {
      console.log("Transaction failed!");
    }
  } catch (error: any) {
    console.error("Transaction broadcast failed:", error.message);
  }
};

main().catch(console.error);
