# CarCar

Team:

* Jay Santana - Service
* Junhan Moses An - Sales

## Design
CarCar is a Web application that is designed to manage an automobile dealership by tracking the inventory, sales, and service of cars. The application consists of 3 microservices: inventory, sales, and service. These microservices utilize RESTful API in the back-end that is then brought to the user interface on the front-end to dynamically display data and allow user interaction with the application. Both the sales and service microservices have their own Automobile value object (`AutomobileVO`), which is created and updated through their own poll application that requests and gets `Automobile` data from the Inventory.

Docker is used to run the application. To use the app, follow the steps for the installation below and refer to each microservice's section as needed.

## Installation
1. Open up your terminal to the desired directory on your local computer
2. Clone the repository
```
git clone
```
3. Change your working directory to the project's directory
```
cd project-beta
```
4. Open up Docker Desktop and run the following commands in your terminal:
```
docker volume create beta-data
docker-compose build
docker-compose up
```
**macOS users:** When you run `docker-compose up` you may see a warning about an environment variable named OS being missing. Don't worry about it! **You can ignore this.**

5. After Docker is done loading, access the application on your browser (Google Chrome recommended) at http://localhost:3000/
6. (Optional) To import a complete Insomnia collection for this project, open Insomnia and within Insomnia:
- Make a new project 
- Within that project, click the Create dropdown at the top right and click File under IMPORT FROM
- Select the Insomnia.yaml file from the project-beta folder and import
- A new collection called **Shayne/Jordan CarCar** should show up, and that should contain **all of the RESTful API URLs and example inputs** to use for each microservice!
