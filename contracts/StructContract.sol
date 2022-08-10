// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract StructsContract {

    struct house {
        uint8 portal;
        uint8 floor;
        bytes1 letter;
    }

    // Family
    struct Family {
        bytes32 lastName;
        house houseInfo;
        uint16 age;
    }

    // Creating an array of type family..which is a struct
    Family[] myFamily;

    // Getting a lastName, and returning complete family details
    // We cannot compare 2 strings in solidity... that's why we use byte32
    function getName(bytes32 name) public view returns (bytes32, uint16) {
        // Search the array
        for(uint8 i = 0; i < myFamily.length; i++){
            if(name == myFamily[i].lastName) {
                return (myFamily[i].lastName, myFamily[i].age);
            }
        }
        return('',0);
    }

    // Structs Cannot be passed as argument so we are passing all elements/attributes of struct as args
    function addName(bytes32 _lastName, uint8 _value, uint16 _age) public returns (bool) {
        // Declare the struct variable in memory...
        Family memory newFamily;
        //  use the . notation to access members of a struct
        newFamily.lastName = _lastName;
        newFamily.houseInfo.portal = _value;
        newFamily.age = _age;
        // Push the newFamily struct...into our myFamily array
        myFamily.push(newFamily);
        return true;
    }
}