const Employee = require("./Employee");

class Engineer extends Employee {
  constructor(name, id, email, githubProfile) {
    super(name, id, email);
    this.githubProfile = githubProfile;
  }

  getRole() {
    return "Engineer";
  }

  getGithubProfile() {
    return this.githubProfile;
  }
}

module.exports = Engineer;
