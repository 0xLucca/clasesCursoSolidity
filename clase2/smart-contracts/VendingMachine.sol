// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract VendingMachine {
    address owner;
    uint price;
    uint totalAmount;
    mapping(address => uint) customerAmount;

    event PriceUpdated(uint price);
    event MachineRestocked(uint amount);
    event FundsWithdrawn(uint funds);
    event ProductPurchased(uint unitPrice, uint amount);

    constructor() {
        owner = msg.sender;
        price = 0.1 ether;
    }

    // Obtener la cantidad restante de producto dentro de la maquina
    function getAmountLeft() public view returns (uint) {
        return totalAmount;
    }

    // Obtener el dinero dentro de la maquina
    function getBalance() public view returns (uint) {
        return address(this).balance;
    }

    // Permite ver cuantos productos compro un determinado cliente
    function getUserAmount(address _customer) public view returns (uint) {
        return customerAmount[_customer];
    }

    // Permite ver el precio unitario por producto
    function getPrice() public view returns (uint) {
        return price;
    }

    // Solo el dueno de la maquina puede definir el precio
    function setPrice(uint _newPrice) public {
        require(msg.sender == owner, "Only the owner can set the price");

        price = _newPrice;

        emit PriceUpdated(_newPrice);
    }

    // Solo el dueno de la maquina puede reponer el stock
    function restock(uint _amount) public {
        require(msg.sender == owner, "Only the owner can restock the machine");

        totalAmount += _amount;

        emit MachineRestocked(_amount);
    }

    // Solo el dueno de la maquina puede retirar el dinero
    function withdraw() public {
        require(msg.sender == owner, "Only the owner can withdraw funds");

        address payable receiver = payable(msg.sender);
        uint machineBalance = address(this).balance;
        receiver.transfer(machineBalance);

        emit FundsWithdrawn(machineBalance);
    }

    // Comprar determinada cantidad de producto
    function purchase(uint _amount) public payable {
        require(msg.value >= price * _amount, "Not enough ETH");
        require(totalAmount >= _amount, "Not enough product");

        totalAmount -= _amount;
        customerAmount[msg.sender] += _amount;

        emit ProductPurchased(price, _amount);
    }
}
