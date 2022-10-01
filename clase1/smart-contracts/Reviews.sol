// SPDX-License-Identifier: MIT

//pragma solidity 0.8.8;
pragma solidity ^0.8.0;

// pragma solidity >=0.8.0 <0.9.0;

contract Reviews {
    int256 number;
    uint256 totalReviews;
    string message;

    struct Review {
        address flixer;
        uint8 rating;
        string comment;
    }

    event NumberUpdated(int256 number);
    event MessageUpdated(string message);
    event ReviewAdded(address flixer, uint8 rating, string comment);

    Review[] public reviews;

    mapping(address => uint256) public lastReviewed;

    // Funcion que permite actualizar el numero
    function writeNumber(int256 _number) public {
        number = _number;

        emit NumberUpdated(_number);
    }

    // Funcion que permite leer el numero
    function readNumber() public view returns (int) {
        return number;
    }

    // Funcion que permite actualizar el mensaje
    function writeMessage(string calldata _message) public {
        message = _message;

        emit MessageUpdated(_message);
    }

    // Funcion que permite leer el mensaje
    function readMessage() public view returns (string memory) {
        return message;
    }

    // Funcion que permite obtener la cantidad de reviews
    function getTotalReviews() public view returns (uint) {
        return totalReviews;
    }

    // Funcion que permite agregar una review
    function addReview(uint8 _rating, string calldata _comment) public {
        require(_rating <= 5, "Rating must be between 0 and 5");

        reviews.push(Review(msg.sender, _rating, _comment));
        lastReviewed[msg.sender] = block.timestamp;
        totalReviews++;

        emit ReviewAdded(msg.sender, _rating, _comment);
    }

    // Funcion que permite obtener todas las reviews
    function getReviews() public view returns (Review[] memory) {
        return reviews;
    }
}
