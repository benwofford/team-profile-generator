const Employee = require('./employee');
const inquirer = require('inquirer');

class Manager extends Employee {
    constructor (name,id,email,officeNumber) {
    super (name,id,email)
        this.officeNumber = officeNumber;
        this.role = "Manager";
        this.managerPrompts = 
        [
            {
                type:'input',
                name: 'name',
                message: 'Office number: '
            }
        ]
    }

    getRole(){
        return this.role
    }
}

module.exports = Manager;