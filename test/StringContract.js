// Node imports
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
// Own imports
const StringContractJson = require('../build/contracts/StringContract.json');

// Constants 
const interface = StringContractJson['abi'];
const bytecode = StringContractJson['bytecode'];

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract('StringContract', function () {

    // Variables
    let accounts, manager, StringContract;

    before(async () => {
        accounts = await web3.eth.getAccounts();
        manager = accounts[0];
        StringContract = await new web3.eth.Contract(interface)
            .deploy({ data: bytecode })
            .send({ from: manager, gas: '1000000' });
    });
    
    it('deploys a contract', async () => {
        const StringContractManager = await StringContract.methods.getManager().call();
        assert.equal(manager, StringContractManager, 'The manager is the one who launches the smart contract.');
    });

    it('get index string returns expected result', async () => {
        const message = 'Hello World';
        const aux = await StringContract.methods.subString(message, 0, 5).call();
        assert.equal(message.substring(0, 5), aux, 'Substring works as js substring');
    });
});
