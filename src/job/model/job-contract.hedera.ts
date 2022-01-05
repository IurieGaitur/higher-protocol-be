import { Client, PrivateKey, AccountCreateTransaction, Hbar, AccountBalanceQuery, FileCreateTransaction, ContractCreateTransaction, ContractCallQuery, ContractExecuteTransaction, ContractFunctionParameters } from "@hashgraph/sdk";
import { CreateContractDto } from "../dto/create-contract.dto";


export default class JobContractModel {

    client;
    jobContract = require("./../../../config/job_contract.json");
    
    async connectHedera() {
        //Grab your Hedera testnet account ID and private key from your .env file
        const hederaAccountId = process.env.MY_ACCOUNT_ID;
        const hederaPrivateKey = process.env.MY_PRIVATE_KEY;
    
        // If we weren't able to grab it, we should throw a new error
        if (hederaAccountId == null ||
          hederaPrivateKey == null ) {
            throw new Error("Environment variables myAccountId and myPrivateKey must be present");
        }
    
        const client = Client.forTestnet();
        client.setOperator(hederaAccountId, hederaPrivateKey);
        this.client = client;
    
        //Create new keys
        const newAccountPrivateKey = await PrivateKey.generate(); 
        const newAccountPublicKey = newAccountPrivateKey.publicKey;
    
        //Create a new account with 1,000 tinybar starting balance
        const newAccount = await new AccountCreateTransaction()
            .setKey(newAccountPublicKey)
            .setInitialBalance(Hbar.fromTinybars(1000))
            .execute(client);
    
        // Get the new account ID
        const getReceipt = await newAccount.getReceipt(client);
        const newAccountId = getReceipt.accountId;
    
        console.log("The new account ID is: " +newAccountId);
    
        //Verify the account balance
        const accountBalance = await new AccountBalanceQuery()
            .setAccountId(newAccountId)
            .execute(client);
    
        console.log("The new account balance is: " +accountBalance.hbars.toTinybars() +" tinybar.");
    
      }

    async deployJobContract() {
        let bytecodeFileId = await this.storeOnHedera();
        const contractTx = await new ContractCreateTransaction()
            .setBytecodeFileId(bytecodeFileId)
            .setGas(100000);

        const contractResponse = await contractTx.execute(this.client);
        const contractReceipt = await contractResponse.getReceipt(this.client);

        const newContractId = contractReceipt.contractId;

        console.log("Contract is deployed. Contract ID:", newContractId);

        return newContractId;
    }

    private async storeOnHedera() {
        const bytecode = this.jobContract.data.bytecode.object;

        //Create and store on hedera the file in hex format
        const fileCreateTx = new FileCreateTransaction().setContents(bytecode);
        
        //Submit to Hedera test network with transaction fee of the client
        const submitTx = await fileCreateTx.execute(this.client);

        //Get receipt of file create transaction
        const fileReceipt = await submitTx.getReceipt(this.client);

        //Get the file ID from receipt
        const bytecodeFileId = fileReceipt.fileId;

        console.log("The smart contract byte code file id is: ", bytecodeFileId);
        return bytecodeFileId;
    }

    async getJobContract(contractId: string, jobId: number) {
        const contractQuery = await new ContractCallQuery()
            .setGas(100000)
            .setContractId(contractId)
            .setFunction("getContractDetails", new ContractFunctionParameters().addUint256(jobId))
            .setQueryPayment(new Hbar(2));

        const rawMessage = await contractQuery.execute(this.client);
        const message = rawMessage.getString(0);

        console.log("The contract message", message);
    }

    async createJobContract(contractId: string, createContractDto: CreateContractDto) {
        const contractExecTx = await new ContractExecuteTransaction()
            .setGas(100000)
            .setContractId(contractId)
            .setFunction("createContract", this.buildJobCreateBody(contractId, createContractDto))
            

        const submitExecTx = await contractExecTx.execute(this.client);
        const receipt = await submitExecTx.getReceipt(this.client);
        
        console.log("The transaction status is " +receipt.status.toString());

    }

    buildJobCreateBody(contractId:string, createContractDto: CreateContractDto): ContractFunctionParameters {
        return new ContractFunctionParameters().addUint256(parseInt(contractId));
    }

    async sendTransaction() {
        // //Create the transfer transaction
        // const sendHbar = await new TransferTransaction()
        //     .addHbarTransfer(myAccountId, Hbar.fromTinybars(-1000))
        //     .addHbarTransfer(newAccountId, Hbar.fromTinybars(1000))
        //     .execute(client);
    
        // //Verify the transaction reached consensus
        // const transactionReceipt = await sendHbar.getReceipt(client);
        // console.log("The transfer transaction from my account to the new account was: " + transactionReceipt.status.toString());
        
        // //Request the cost of the query
        // const queryCost = await new AccountBalanceQuery()
        //  .setAccountId(newAccountId)
        //  .getCost(client);
    
        // console.log("The cost of query is: " +queryCost);
    
        // //Check the new account's balance
        // const getNewBalance = await new AccountBalanceQuery()
        //     .setAccountId(newAccountId)
        //     .execute(client);
    
        // console.log("The account balance after the transfer is: " +getNewBalance.hbars.toTinybars() +" tinybar.")
    
      }
}