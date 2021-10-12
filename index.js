const inquirer = require('inquirer');
const Employee = require('./lib/employee');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
const Genhtml= require('./lib/generatehtml');


let managerData;
const mainPrompts = [
    {
        type: 'list',
        name: 'menuChoice',
        choices: ['Add new employee', 'Write to HTML', 'Exit']
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
    let prompt = inquirer.createPromptModule();
    let addEmpMenu = await prompt(prompts);
    return addEmpMenu
};

async function userInput (promptData,engArray=[],internArray=[]) {
    console.log("-----------------------");
    console.log("Welcome to team creator");
    console.log("-----------------------");


    let prompt = inquirer.createPromptModule();
    let mainMenu = await prompt(promptData);
    if (mainMenu.menuChoice === "Add new employee") {
        // let engineer = new Engineer();
        let intern = new Intern();
        console.log("Enter manager's information---")
        let managerAnswers = await genEmployee(empInfo);
        managerData = new Manager(managerAnswers.name,managerAnswers.id,managerAnswers.email,managerAnswers.officeNumber);
        console.log("Add any employees that report to manager---")
        let addEmp = true;
        while (addEmp) {
            let empMenu = await genEmployee(empTypes);
            if (empMenu.menuChoice === "Add Engineer"){
                console.log("Enter engineer's information---");
                let engData = await Engineer.engData();
                const eng = new Engineer(engData.name, engData.id,engData.email,engData.github);
                engArray.push(eng);
            }
            else if (empMenu.menuChoice === "Add Intern"){
                console.log("Enter intern's information---");
                let internData = await intern.internData();
                //internData = {role: intern.getRole(), data: internData};
                internArray.push(intern);
            }
            else if (empMenu.menuChoice){
                return userInput(mainPrompts,engArray,internArray);
            }
        }
    } else if (mainMenu.menuChoice === "Write to HTML") {
        const generate = new Genhtml('team.html', {managerData,engArray,internArray})
        // console.log(generate.writeHtml());
    } else if (mainMenu.menuChoice === "Exit") {
        console.log(managerData);
        console.log(engArray);
        console.log(internArray);
        console.log("exiting...")
        return
    }
    // TODO: return objects to pass to Genhtml
}

let myEmployee = new Employee('Hank', 7,'hankhill@stricklandpropane.com');

userInput(mainPrompts);