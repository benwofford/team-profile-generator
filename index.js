const inquirer = require('inquirer');
const Employee = require('./lib/employee');
const Manager = require('./lib/manager');
const Engineer = require('./lib/engineer');
const Intern = require('./lib/intern');
const Genhtml= require('./lib/generatehtml');


const mainPrompts = [
    {
        type: 'list',
        name: 'menuChoice',
        choices: ['Add new team', 'Write to HTML', 'Exit']
    }
]
const empTypes = [
    {
        type: 'list',
        name: 'menuChoice',
        choices: ['Add Engineer', 'Add Intern', 'Finished adding employees']
    }
]
async function genEmployee (prompts) {
    let prompt = inquirer.createPromptModule();
    let addEmpMenu = await prompt(prompts);
    return addEmpMenu
};

async function userInput (promptData,empArray=[]) {
    console.log("-----------------------");
    console.log("Welcome to team creator");
    console.log("-----------------------");


    let prompt = inquirer.createPromptModule();
    let mainMenu = await prompt(promptData);
    if (mainMenu.menuChoice === "Add new team") {
        let manager = new Manager();
        let engineer = new Engineer();
        let intern = new Intern();

        console.log("Enter manager's information---")
        let managerAnswers = await manager.managerAnswers;
        managerAnswers.role = manager.getRole();
        empArray.push(managerAnswers)

        console.log("Add employees that report to manager---")
        let addEmp = true;
        while (addEmp) {
            let empMenu = await genEmployee(empTypes);
            if (empMenu.menuChoice === "Add Engineer"){
                console.log("Enter engineer's information---");
                let engData = await engineer.engData();
                engData.role = engineer.getRole();
                engArray.push(engData);
            }
            else if (empMenu.menuChoice === "Add Intern"){
                console.log("Enter intern's information---");
                let internData = await intern.internData();
                internData.role = intern.getRole();
                empArray.push(internData);
            }
            else if (empMenu.menuChoice){
                return userInput(mainPrompts,empArray);
            }
        }
    } else if (mainMenu.menuChoice === "Write to HTML") {
        let genHtml = new Genhtml('./dist/index.html', empArray);
        genHtml.writeHtml();
    } else if (mainMenu.menuChoice === "Exit") {
        console.log(empArray);
        console.log("exiting...")
        return
    }
}

userInput(mainPrompts);