# ale-canvas10

This is a test project. It's a Canvas to allow Ethereum accounts (metamask) put a block of color on the board. It also allows watching a history of the canvas since its deployment.

A demo can be found at https://ale-canvas10.herokuapp.com/

## Installation

The project requires [Node.js](https://nodejs.org/) to run.

Install the dependencies and start the server.

```sh
npm i
node server
```

## Deploy a new Contract

To deploy a new contract it is necessary to install devDependencies and create a config.json file at the root of the project. It is used to provide the account (It needs to have funds) which will be used to deploy the new contract.

Example of config.json file

```sh
{
    "ACCOUNT_ADDRESS":"0xAAAAAAAAAAAAAAAAAAA",
    "PRIVATE_KEY":"BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"
}
```

Then run the deploy script as follow

```sh
node deploy.js
```

The result of the script will show the information of the compiled contract as well as the deployed address
