const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");

const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Rendering function
const render = require("./lib/htmlRenderer");
// Alternative rendering function
// const render = require("./lib/page-template.js");

const teamMembers = [];
// Create an id array to store the ids.
// This array will be used to check the potential duplicate id newly entered by user

const idArray = [];

function appMenu() {
  function createManager() {
    console.log("Please build your team");
    inquirer
      .prompt([
        //Question Objects for manager
        {
          type: "input",
          name: "managerName",
          message: "Enter your name.",
        },
        {
          type: "input",
          name: "managerId",
          message: "Enter your Employee ID."
        },
        {
          type: "input",
          name: "managerEmail",
          message: "Enter your Email ID.",
          default: () => {},
          //Validation for email ID with Regex
          validate: (email) => {
            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            if (valid) {
              console.log("Correct email format!");
              return true;
            } else {
              console.log("Please enter a valid email");
              return false;
            }
          },
        },
        {
          type: "input",
          name: "managerOfficeNumber",
          message: "Enter your Office number",
          //Validate if office number has only digits
          validate: (officeNum) => {
            if (officeNum === NaN) {
              console.error("Enter a valid phone number!");
              return false;
            } if (officeNum.length < 10 || officeNum.length >10) {
              console.error("Phone number should be exactly 10 digits!");
              return false;
            } else {
              console.log("Correct phone number!");
              return true;
            }
          },
        },
      ])
      .then((answers) => {
        const manager = new Manager(
          answers.managerName,
          answers.managerId,
          answers.managerEmail,
          answers.managerOfficeNumber
        );
        teamMembers.push(manager);
        idArray.push(answers.managerId);
        createTeam();
      });
  }

  function createTeam() {
    inquirer
      .prompt([
        {
          type: "list",
          name: "memberChoice",
          message: "Which type of team member would you like to add?",
          choices: [
            "Engineer",
            "Intern",
            "I don't want to add any more team members",
          ],
        },
      ])
      .then((userChoice) => {
        switch (userChoice.memberChoice) {
          case "Engineer":
            addEngineer();
            break;
          case "Intern":
            addIntern();
            break;
          default:
            buildTeam();
        }
      });
  }

  function addEngineer() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "engineerName",
          message: "Enter your name.",
        },
        {
          type: "input",
          name: "engineerId",
          message: "Enter your Employee ID.",
          validate: (id) => {
            if(idArray.indexOf(id) !== -1) {
              console.error('The employee ID is already taken. Enter a new employee ID.');
              return false;
            } else {
              console.log('Valid employee ID.');
              return true;
            }
          }          
        },
        {
          type: "input",
          name: "engineerEmail",
          message: "Enter your Email ID.",
          default: () => {},
          //Validation for email ID with Regex
          validate: (email) => {
            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            if (valid) {
              console.log("Correct email format!");
              return true;
            } else {
              console.log("Please enter a valid email");
              return false;
            }
          },
        },
        {
          type: "input",
          name: "github",
          message: "Enter your Github profile name."
        }
      ])
      .then((answers) => {
        const engineer = new Engineer(
          answers.engineerName,
          answers.engineerId,
          answers.engineerEmail,
          answers.github
        );
        teamMembers.push(engineer);
        idArray.push(answers.engineerId);
        createTeam();
      });
  }

  function addIntern() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "internName",
          message: "Enter your name.",
        },
        {
          type: "input",
          name: "internId",
          message: "Enter your Employee ID.",
          validate: (id) => {
            if(idArray.indexOf(id) !== -1) {
              console.error('The employee ID is already taken. Enter a new employee ID.');
              return false;
            } else {
              console.log('Valid employee ID.');
              return true;
            }
          }
        },
        {
          type: "input",
          name: "internEmail",
          message: "Enter your Email ID.",
          default: () => {},
          //Validation for email ID with Regex
          validate: (email) => {
            valid = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
            if (valid) {
              console.log("Correct email format!");
              return true;
            } else {
              console.log("Please enter a valid email");
              return false;
            }
          },
        },
        {
          type: "input",
          name: "school",
          message: "Enter your school/university name."
        }
      ])
      .then((answers) => {
        const intern = new Intern(
          answers.internName,
          answers.internId,
          answers.internEmail,
          answers.school
        );
        teamMembers.push(intern);
        idArray.push(answers.internId);

        createTeam();
      });
  }

  function buildTeam() {
    // Create the output directory if the output path doesn't exist
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR);
    }
    fs.writeFileSync(outputPath, render(teamMembers), "utf-8");
  }

  createManager();
}

appMenu();
