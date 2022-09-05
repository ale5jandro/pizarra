const Web3 = require('web3');
const solc = require('solc');
const fs = require('fs')
const config = require('./config.json')

const ACCOUNT_ADDRESS=config.ACCOUNT_ADDRESS
const PRIVATE_KEY=config.PRIVATE_KEY

// For localhost
//const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// For Ropsten
var web3 = new Web3(new Web3.providers.HttpProvider(
    'https://ropsten.infura.io/v3/85c404ea8dc3485eb5c5b95933153711 '
));

let source = fs.readFileSync("contracts/pizzarra.sol", {encoding:'utf8'});
console.log(source)

const input = {
    language: 'Solidity',
    sources: {
        'pizzarra.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
}

let compiled = JSON.parse(solc.compile(JSON.stringify(input))).contracts['pizzarra.sol']//.contracts[':Hello'];

// ABI
let abi = compiled.Pizzarra.abi;

// Smart contract EVM bytecode as hex
let bytecode = '0x'+compiled.Pizzarra.evm.bytecode.object;

console.log({abi})
console.log({bytecode})

//https://ethereum.stackexchange.com/questions/59692/deploying-contract-with-arguments-using-raw-transaction
async function send(transaction) {
    let gas = await transaction.estimateGas({from: ACCOUNT_ADDRESS});
    let options = {
        to  : transaction._parent._address,
        data: transaction.encodeABI(),
        gas : gas
    };
    let signedTransaction = await web3.eth.accounts.signTransaction(options, PRIVATE_KEY);
    return await web3.eth.sendSignedTransaction(signedTransaction.rawTransaction);
}

async function deploy(contractName, contractArgs) {

    let contract = new web3.eth.Contract(abi);
    let handle = await send(contract.deploy({data: bytecode, arguments: contractArgs}));
    console.log(`${contractName} contract deployed at address ${handle.contractAddress}`);
    return new web3.eth.Contract(abi, handle.contractAddress);
}

deploy('ALEE TEST')

//DIRECCIONNNNN::: 0x947E20631327E3Ee5Ae1D9311A02C793861Ec322