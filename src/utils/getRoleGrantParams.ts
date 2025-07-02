import inquirer from "inquirer";

export const ROLES = [
  {
    name: "DEFAULT_ADMIN_ROLE",
    value: "0x0000000000000000000000000000000000000000000000000000000000000000",
  },
  {
    name: "MINTER_ROLE",
    value: "0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6",
  },
  {
    name: "BURNER_ROLE",
    value: "0x3c11d16cbaffd01df69ce1c404f6340ee057498f5f00246190ea54220576a848",
  },
  {
    name: "PAUSER_ROLE",
    value: "0x65d7a28e3265b37a6474929f336521b332c1681b933f6cb9f3376673440d862a",
  },
  {
    name: "RECOVERY_ROLE",
    value: "0x0acf805600123ef007091da3b3ffb39474074c656c127aa68cb0ffec232a8ff8",
  },
];

export interface RoleGrantParams {
  contractAddress: string;
  fromAddress: string;
  toAddress: string;
  role: string;
}

export async function getRoleGrantParams(): Promise<RoleGrantParams> {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "contractAddress",
      message: "Enter the contract address:",
      validate: (input: string) =>
        /^0x[a-fA-F0-9]{40}$/.test(input) ? true : "Invalid Ethereum address",
    },
    {
      type: "input",
      name: "fromAddress",
      message: "Enter the sender (from) address:",
      validate: (input: string) =>
        /^0x[a-fA-F0-9]{40}$/.test(input) ? true : "Invalid Ethereum address",
    },
    {
      type: "input",
      name: "toAddress",
      message: "Enter the account to grant the role to (to address):",
      validate: (input: string) =>
        /^0x[a-fA-F0-9]{40}$/.test(input) ? true : "Invalid Ethereum address",
    },
    {
      type: "list",
      name: "role",
      message: "Select the role to grant:",
      choices: ROLES.map((role) => ({
        name: `${role.name} (${role.value})`,
        value: role.value,
      })),
    },
  ]);
  return answers as RoleGrantParams;
}