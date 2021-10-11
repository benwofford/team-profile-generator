const inquirer = require('inquirer');
const crypto = require('crypto');
const Employee = require('./lib/employee');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');

// enter team managers name
// enter employee ID, email and office number
// loop menu if adding additional team members

const mainPrompts = [
    {
        type: 'list',
        name: 'menuChoice',
        choices: ['Add new employee', 'Write to html', 'Exit']
    }
]
const empTypes = [
    {
        type: 'list',
        name: 'menuChoice',
        choices: ['Add Engineer', 'Add Intern', 'Finished adding employees']
    }
]
const empInfo = [
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
        name: 'email',
        message: 'Employee email: '
    }
]
async function genEmployee (prompts) {
    // TODO: generate engineer or intern prompt and repeat if necessary
    let prompt = inquirer.createPromptModule();
    let addEmpMenu = await prompt(prompts);
    return addEmpMenu
};

async function userInput (promptData,engArray=[],internArray=[]) {
    // TODO: create prompts specific to each class as a class method if possible
    console.log("-----------------------");
    console.log("Welcome to team creator");
    console.log("-----------------------");
    //let engineerAdded = [];
    //let internAdded = [];

    let prompt = inquirer.createPromptModule();
    let mainMenu = await prompt(promptData);
    if (mainMenu.menuChoice === "Add new employee") {
        // TODO: generate manager first
        // Instantiate classes
        let manager = new Manager();
        let engineer = new Engineer();
        let intern = new Intern();
        console.log("Enter manager's information---")
        let managerData = await genEmployee(empInfo);
        console.log("Add any employees that report to manager---")
        let addEmp = true;
        while (addEmp) {
            let empMenu = await genEmployee(empTypes);
            // TODO: build an external source to push to instead of pushing arrays?
            if (empMenu.menuChoice === "Add Engineer"){
                console.log("Enter engineer's information---");
                let engData = await engineer.engData();
                engData = {role: engineer.getRole(), data: engData};
                // push this to engineerAdded array to write to HTML later
                engArray.push(engData);
            }
            else if (empMenu.menuChoice === "Add Intern"){
                console.log("Enter intern's information---");
                let internData = await intern.internData();
                internData = {role: intern.getRole(), data: internData};
                internArray.push(internData);
            }
            else if (empMenu.menuChoice){
                return userInput(mainPrompts, engArray,internArray);
            }
        }
    }
    else if (mainMenu.menuChoice === "Exit") {
        console.log(engArray);
        console.log(internArray);
        console.log("exiting...")
        return
    }
    // TODO: return objects to pass to Genhtml
}

let myEmployee = new Employee('Hank', 420,'hankhill@stricklandpropane.com');
randID = crypto.randomUUID();
let genUser = {
    //[randId]: myEmployee TODO: generate UUID
}
for (const x in genUser) {
    console.log(genUser[x].name);
}

// TODO: write out HTML to file
userInput(mainPrompts);