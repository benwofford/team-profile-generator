const Employee = require('./employee');
const inquirer = require('inquirer');

class Intern extends Employee {
    constructor (name,id,email,school) {
    super(name,id,email);
    this.role = "Intern";
    this.school = school
    this.internPrompts =
      [
          {
              type: 'input',
              name: 'name',
              message: 'Employee name: '
          },
          {
              type: 'input',
              name: 'id',
              message: 'Employee ID: '
          },
          {
              type: 'input',
              name: 'school',
              message: 'Employee school: '
          }
      ]
    }

    async internData () {
        let prompt = inquirer.createPromptModule();
        let addEmpMenu = await prompt(this.internPrompts);
        this.name = addEmpMenu.name;
        this.id = addEmpMenu.id;
        this.email = addEmpMenu.email;
        this.school = addEmpMenu.school;
        this.confirm = addEmpMenu.addMore;
        return addEmpMenu
    }
}

module.exports = Intern;