// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract StringContract {

    address public manager;

    constructor() {
        manager = msg.sender;
    }

    function subString(string memory str, uint startIndex, uint endIndex) public pure returns(string memory) {
        bytes memory strBytes = bytes(str);
        bytes memory result = new bytes(endIndex-startIndex);
        for(uint i = startIndex; i < endIndex; i++) {
            result[i-startIndex] = strBytes[i];
        }
        return string(result);
    }
}
