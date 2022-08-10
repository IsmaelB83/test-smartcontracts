// Node imports
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
// Own imports
const EnumContractJson = require('../build/contracts/EnumContract.json');

// Constants 
const interface = EnumContractJson['abi'];
const bytecode = EnumContractJson['bytecode'];

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract('EnumContract', function () {

    // Variables
    let accounts, EnumContract;

    before(async () => {
        accounts = await web3.eth.getAccounts();
        EnumContract = await new web3.eth.Contract(interface)
            .deploy({ data: bytecode })
            .send({ from: accounts[0], gas: '1000000' });
    });
    
    it('get enum index 0', async () => {
        const aux = await EnumContract.methods.getNames(0).call();
        assert.equal('Joe', aux, 'Get Names work with enum');
    });
});
