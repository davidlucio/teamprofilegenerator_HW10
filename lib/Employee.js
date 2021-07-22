// TODO: Write code to define and export the Employee class

class Employee{

    constructor(name, id, email, github){
        this.name = name;
        this.id = id;
        this.email = email;
        this.github = github;
    }

    getName(){
        return this.name;
    }

    getId(){
        return this.id;
    }

    getEmail(){
        return this.email;
    }

    getRole(){
        return "Employee";
    }

}

module.exports = Employee;