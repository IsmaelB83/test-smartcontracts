// Node imports
const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
// Own imports
const MappingContractJson = require('../build/contracts/MappingContract.json');

// Constants 
const interface = MappingContractJson['abi'];
const bytecode = MappingContractJson['bytecode'];

/*
 * uncomment accounts to access the test accounts made available by the
 * Ethereum client
 * See docs: https://www.trufflesuite.com/docs/truffle/testing/writing-tests-in-javascript
 */
contract('MappingContract', function () {

    // Variables
    let accounts, MappingContract;

    before(async () => {
        accounts = await web3.eth.getAccounts();
        MappingContract = await new web3.eth.Contract(interface)
            .deploy({ data: bytecode })
            .send({ from: accounts[0], gas: '1000000' });
    });
    
    it('add ES mapping', async () => {
        await MappingContract.methods.addRelation('ES', 'Spain').send({ from: accounts[0], gas: '1000000' });
        const aux = await MappingContract.methods.getRelation('ES').call();
        assert.equal('Spain', aux, 'The relation is Spain');
    });

    it('get UK as non-existing mapping ', async () => {
        const aux = await MappingContract.methods.getRelation('UK').call();
        assert.equal('', aux, 'The relation does not exist');
    });

    it('remove ES mapping ', async () => {
        await MappingContract.methods.removeRelation('ES').send({ from: accounts[0], gas: '1000000' });
        const aux = await MappingContract.methods.getRelation('ES').call();
        assert.equal('', aux, 'The relation ES does not exist');
    }); 
});
