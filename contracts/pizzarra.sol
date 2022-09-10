pragma solidity >=0.7.0 <0.9.0;

contract Pizzarra{

    uint constant size = 10;
    bytes3[size][size] public pizarra;

    event changeColor(address user, uint8 i, uint8 j, bytes3 value, uint256 time);

    constructor () {
    }

    function set(uint8 i, uint8 j, bytes3 value) public {
        require(i < size && j < size);
        pizarra[j][i]=value;
        emit changeColor(msg.sender, i, j, value, block.timestamp);
    }

    function get() public view returns (bytes3[size][size] memory){
        return pizarra;
    }

}
