const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const idArray = [101, 102, 103, 104, 105, 106, 107, 108, 109, 110];

function createManager() {
    console.log("Please build your team");
    inquirer.prompt([
      //
      // YOUR CODE HERE:
      // CREATE OBJECTS OF QUESTIONS HERE FOR MANAGER
      // Strongly recommend to add validate property function for id and email
      //
      { 
        type: "input",
        name: "managerName",
        message: "Enter your name.",
      },
      {
        type: "list",
        name: "managerID",
        message: "Select your Employee ID.",
        choices: idArray,
      },
      {
        type: "input",
        name: "managerEmail",
        message: "Enter your Email ID.",
        default: () => {},
        validate: (email) => {
          valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
            if (valid) {
              console.log("Correct email format!");
                return true;
            } else {
                console.log("Please enter a valid email")
                return false;
            }
        }
      },
      {
        type: "input",
        name: "managerOfficeNumber",
        message: "Enter your Office number",
        validate: (officeNum) => {
          if(officeNum === NaN) {
            console.log("Enter a valid phone number!");
          } else {
            console.log("Correct phone number!");
            return true;
          }
        },
      },
     
    ]).then(answers => {
        const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
        teamMembers.push(manager);
        idArray.push(answers.managerId);
        createTeam();
      });
    }

    createManager();
