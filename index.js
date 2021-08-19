const inquirer = require("inquirer");
const fs = require("fs");
const generateHTML = require("./util/generateHtml");

const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

let employeeGroup = []; // Fill this maybe?

function startQuestionnaire(){

    inquirer.prompt([
        {
            name: "type",
            type: "list",
            message: "What is the role of this employee?",
            choices: ["Manager","Engineer","Intern","EXIT"]
        }
    ])
    .then(answers => {
        if(answers.type === "EXIT"){
            return;
        }
        else{
            console.log(`Adding a new ${answers.type}`);
            // Follow-up questions are based off the previous response
            addNewEmployee(answers.type);
        }
    })

}

function addNewEmployee(employeeType){

    var fourthParamQuestion = "";
    switch(employeeType){
        case "Manager":
            fourthParamQuestion = "What is the manager's office number?";
            break;
        case "Engineer":
            fourthParamQuestion = "What is the engineer's Github URL?";
            break;
        case "Intern":
            fourthParamQuestion = "In what school is this intern enrolled?";
            break;
        default:
            console.log("Something went wrong - ERROR 001");
            break;
    }

    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What is their name?"
        },
        {
            name: "id",
            type: "number",
            message: "What is their employee ID number?"
        },
        {
            name: "email",
            type: "input",
            message: "What is their email address?"
        },
        {
            name: "fourthParam",
            type: "input",
            message: fourthParamQuestion
        }
    ])
    .then(answers => {

        if(employeeType === "Manager"){
            const newEmployee = new Manager(answers.name, answers.id, answers.email, answers.fourthParam);
            employeeGroup.push(newEmployee);
        }
        else if (employeeType === "Engineer"){
            const newEmployee = new Engineer(answers.name, answers.id, answers.email, answers.fourthParam);
            employeeGroup.push(newEmployee);
        }
        else if(employeeType === "Intern"){
            const newEmployee = new Intern(answers.name, answers.id, answers.email, answers.fourthParam);
            employeeGroup.push(newEmployee);
        }

        // Just testing...
        console.log("Current team:");
        console.log(employeeGroup);

        inquirer.prompt([
            {
                name: "continue",
                type: "confirm",
                message: "Would you like to add another employee?"
            }
        ])
        .then(answers => {
            if(answers.continue){
                startQuestionnaire();
            }
            else{
                console.log("You're all set!");
                fs.writeFile('team.html', generateHTML(employeeGroup), err => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                })
            }
        })
    })
}

// KICK IT OFF I GUESS
startQuestionnaire();