// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract BiddingContract {

    struct HighBid {
        address account;
        string name;
        uint256 value;
    }
    
    uint256 public minBidValue;
    HighBid public highBid;
    uint biddingEnds = block.timestamp + 5 days;

    event NewHighBid(address indexed who, string name, uint howmuch);
    event BidFailed(address indexed who, string name, uint howmuch);

    modifier minBid(string memory name) {
        if (msg.value < minBidValue) {
            emit BidFailed(msg.sender, name, msg.value);
            revert("Bid value too low");
        }
        if (msg.value < highBid.value) {
            emit BidFailed(msg.sender, name, msg.value);
            revert("Current bid is higher than yours");
        } 
        _;
    }

    // Ensures that bid can be received i.e, auction not ended
    modifier timed {
        if(block.timestamp > biddingEnds) {
            revert("The Bid has expire");
        } 
        _;
    }
    constructor(uint256 bidValue) {
        require(bidValue > 0, "Minimum bid value should be higher than 0");
        minBidValue = bidValue;
    }

    function bid(string memory name) public payable timed minBid(name) {
        highBid.account = msg.sender;
        highBid.name = name;
        highBid.value = msg.value;
        emit NewHighBid(msg.sender, name, msg.value);
    }
}