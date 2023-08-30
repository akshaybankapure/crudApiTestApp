# NODEJSTESTAPP

Welcome to NOdejs Test App, This App is to implement the basic CRUD functions API to demonstrate CRUD operations with in-memory database / data structure.

## Prerequisites

- Node.js (v14.17.3 or higher) is required. You can download it from [here](https://nodejs.org/).
    (I am using npm here to manage the packages), So, I assume you are using npm as well.
- TypeScript (`tsc`) is globally installed. If not, you can install it using:

            npm install -g typescript
## Dependencies

This project requires the following packages:

- Node.js (v14.17.3 or higher)
- Express (v4.17.1)
- Express Validator (v6.12.0)
- UUID (v8.3.2)

## Installation

1. Extract this zipfile.
2. Navigate to the directory folder using the terminal.
3. Run the following command to install the dependencies:

   npm install

////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
## Getting Started Checklist

Before you start testing the application, make sure you have completed the following steps:

- [ ] Installed Node.js (v14.17.3 or higher), and npm.
- [ ] Extracted the "crudApiTestApp.zip" to a specific location.
- [ ] Installed the required dependencies using `npm install`.
- [ ] Verified that the required packages are installed.
- [ ] Reviewed the README instructions thoroughly.


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

## Running the Application:

1. (In the same folder, in the commandprompt/terminal) enter:

    node dist/app.js


## Testing Endpoints 
        //It is advisible to use git Bash to test the below operations.

    ### Create Employee
            
        curl -X POST -H "Content-Type: application/json" -d '{"employeeName": "ABCD QWEARTY", "age": 28, "salaryAmount": 50000, "email": "abcdet@example.com", "degreeDetails": ["BAS", "MS"]}' http://localhost:3000/api/employees

            OR
        
    ## Create Employee Using a JSON List
    If you want to use an existing data I am attaching in this directory itself as "employeedataTEST.json", you may use it.


        curl -X POST -H "Content-Type: application/json" -d @employeedataTEST.json http://localhost:3000/api/employees/multiple


    ### Get All the employees

        curl http://localhost:3000/api/employees

    ### Get Employee by ID
    
        curl http://localhost:3000/api/employees/ {empId}

                            #### in the above line replace "{empId}" with the actual employee id
    ### Update employee

    Update employee by the id :

        curl -X PUT -H "Content-Type: application/json" -d '{"employeeName": "Updated Name"}' http://localhost:3000/api/employees/{empId}

                            #### in the above line replace "{empId}" with the actual employee id

    ###Delete Employee by ID:
        
        curl -X DELETE http://localhost:3000/api/employees/{empId}

                            #### in the above line replace "{empId}" with the actual employee id