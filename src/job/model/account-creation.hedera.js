import { PrivateKey } from "@hashgraph/cryptography";
import { AccountCreateTransaction, Hbar, Client } from "@hashgraph/sdk";

export default class AccountCreation {

    async createAccount() {

        const myAccountId = process.env.MY_ACCOUNT_ID;
        const myPrivateKey = process.env.MY_PRIVATE_KEY;
    
        // If we weren't able to grab it, we should throw a new error
        if (myAccountId == null ||
            myPrivateKey == null ) {
            throw new Error("Environment variables myAccountId and myPrivateKey must be present");
        }

        const client = Client.forTestnet();

        client.setOperator(myAccountId, myPrivateKey);

        const newAccountPrivateKey = await PrivateKey.generate();
        const newAccountPublicKey = newAccountPrivateKey.publicKey;

        const newAccount = await new AccountCreateTransaction()
            .setKey(newAccountPublicKey)
            .setInitialBalance(Hbar.fromTinybars(1000))
            .execute(client);

    }

}