import inquirer from "inquirer";

export type Signature = {
    r: string,
    s: string,
    v: number,
}

export const getSignatureFromUser = async (hashForRecovery: string) => {
  console.log("\nTransaction created successfully!");
  console.log("Hash to sign:", hashForRecovery);
  console.log(
    "\nPlease sign this hash with your external tool, then provide the signature components below:\n"
  );

  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "r",
      message: "Enter signature r value (with 0x prefix):",
      validate: (input: string) => {
        if (!input.startsWith("0x")) {
          return "r value must start with 0x";
        }
        if (input.length !== 66) {
          return "r value must be 64 hex characters long (plus 0x prefix)";
        }
        if (!/^0x[0-9a-fA-F]{64}$/.test(input)) {
          return "r value must be a valid hex string";
        }
        return true;
      },
    },
    {
      type: "input",
      name: "s",
      message: "Enter signature s value (with 0x prefix):",
      validate: (input: string) => {
        if (!input.startsWith("0x")) {
          return "s value must start with 0x";
        }
        if (input.length !== 66) {
          return "s value must be 64 hex characters long (plus 0x prefix)";
        }
        if (!/^0x[0-9a-fA-F]{64}$/.test(input)) {
          return "s value must be a valid hex string";
        }
        return true;
      },
    },
    {
      type: "list",
      name: "v",
      message: "Select v value:",
      choices: [
        { name: "27", value: 27 },
        { name: "28", value: 28 },
      ],
      default: 27,
    },
    {
      type: "confirm",
      name: "confirmSignature",
      message: "Confirm signature details and proceed with transaction?",
      default: true,
    },
  ]);

  if (!answers.confirmSignature) {
    throw new Error("Transaction cancelled by user.");
  }

  return {
    r: answers.r,
    s: answers.s,
    v: answers.v,
  };
};
