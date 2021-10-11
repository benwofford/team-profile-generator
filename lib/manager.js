const Employee = require('./employee');
const inquirer = require('inquirer');

class Manager extends Employee {
    constructor (name,id,email,officeNumber) {
    super (name,id,email)
        this.officeNumber = officeNumber;
        this.role = "Manager";
    }

    getRole(){
        return this.role
    }
}

module.exports = Manager;