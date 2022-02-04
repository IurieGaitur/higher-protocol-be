import { Client, PrivateKey, AccountCreateTransaction, Hbar, AccountBalanceQuery, FileCreateTransaction, ContractCreateTransaction, ContractCallQuery, ContractExecuteTransaction, ContractFunctionParameters, ContractId } from "@hashgraph/sdk";
import { HttpException, HttpStatus } from "@nestjs/common";
import { CreateContractDto } from "../dto/create-contract.dto";
import { JobContract } from "../entities/job_contract.entity";
import * as fs from 'fs';

export default class JobContractModel {

    client;
    jobContract = require("../../../config/job_contract.json");
    
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
    
        console.log("The new account ID is: ", newAccountId);
    
        //Verify the account balance
        const accountBalance = await new AccountBalanceQuery()
            .setAccountId(newAccountId)
            .execute(client);
    
        console.log("The new account balance is: " +accountBalance.hbars.toTinybars() +" tinybar.");
      }

    tryLoadContract() {
        const key = fs.readFileSync('config/hedera_contract.txt', 'utf8')
        console.log("Contract ID:", key);
        const contractId = ContractId.fromString(key);
        console.log("Try load contractID:", contractId);
        return contractId;
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

        return {contractObj: newContractId, contractString: newContractId.toStringWithChecksum(this.client)};
    }

    async storeOnHedera() {
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

    async getJobContract(contractId, jobId) {
        const contractQuery = await new ContractCallQuery()
            .setGas(100000)
            .setContractId(contractId)
            .setFunction("getContractDetails", new ContractFunctionParameters().addUint256(jobId))
            .setQueryPayment(new Hbar(2));

        try {
            const rawMessage = await contractQuery.execute(this.client);
            const jobContract = new JobContract().fromHedera(rawMessage);
            return jobContract;
        } catch (ex) {
            throw new HttpException("Could not get job contract.Internal error", HttpStatus.SERVICE_UNAVAILABLE);
        }
    }

    async createHederaContract(contractId, createContractDto) {
        console.log(contractId);
        const contractExecTx = await new ContractExecuteTransaction()
            .setContractId(contractId)    
            .setGas(100000)
            .setFunction("createContract", this.buildJobCreateBody(createContractDto.job_id.toString(), createContractDto))
            
        const submitExecTx = await contractExecTx.execute(this.client);
        try {
            const hash = Buffer.from(submitExecTx.transactionHash).toString('base64')
            const receipt = await submitExecTx.getReceipt(this.client);
            console.log("The transaction status is " +receipt.status.toString(), receipt, receipt.topicSequenceNumber, receipt.topicRunningHash, receipt.serials, hash);
            return hash;
        } catch(ex) {
            console.log(ex);
            throw new HttpException("Could not get job contract.Internal error:" + ex, HttpStatus.SERVICE_UNAVAILABLE);
        }
        return null;
    }

    buildJobCreateBody(contractId, createContractDto) {

        const response = new ContractFunctionParameters()
                .addUint256(parseInt(contractId))
                .addString(createContractDto.condition)
                .addUint256(parseInt(createContractDto.value))
                .addUint256(createContractDto.min_points)
                .addString(createContractDto.task)
                .addString(createContractDto.description);

        return response;
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


      async createJobContractTest(contractId) {
        const contractExecTx = await new ContractExecuteTransaction()
            .setContractId(contractId)    
            
            .setFunction("setCandidate", new ContractFunctionParameters().addString("Hanz"))
            
        
        const submitExecTx = await contractExecTx.execute(this.client);
        try {
            console.log(submitExecTx)
            const receipt = await submitExecTx.getReceipt(this.client);
            console.log("The transaction status is " +receipt.status.toString(), receipt);
        } catch(ex) {
            console.log(ex);
        }
    }

    async getJobContractTest(contractId) {
        const contractQuery = await new ContractCallQuery()
            .setGas(300000)
            .setContractId(contractId)
            .setFunction("getCandidate")
            .setQueryPayment(new Hbar(2));

        try {
            const rawMessage = await contractQuery.execute(this.client);
            const message = rawMessage.getString(0);
            console.log("The contract message", message);
        } catch(ex) {
            console.log(ex);
        }
    }
}