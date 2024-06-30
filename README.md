# Restarunt Mangment System POS
### (VueJs - VueX - Bootstrap - axios)

## Project Description 

#### After learning the VueJs framework and working on some small projects, I developed this large-scale project. The idea and implementation of the project started as a tutorial on a YouTube channel. Initially, I followed the tutorial but soon noticed poor design and poorly written code, making the website uncomfortable for me as a user. Therefore, I decided to rebuild the project from scratch, incorporating my own design and significantly improving the user experience and code quality.

I will provide a link to the original project on YouTube so you can see the initial version and compare it to my implementation.

The website serves as a system for managing multiple restaurants or branches of a restaurant chain. The features include:

- **Restaurant Management:** 
  - Create
  - Delete
  - Modify restaurants
  - View restaurant menus
- **Category Management:** 
  - Add
  - Delete
  - Modify categories
  - View categories
- **Meal Management:** 
  - Add
  - Delete
  - Modify meals under each category

You can check the link below for the original project and my improved version.

 [![Original Project](https://github.com/majdroses21/restarunt-mangment-system-2024/assets/112196607/be10cdb5-b559-41da-9fa9-0f146a5c6b79)](https://youtu.be/TeAotZlxs7E?si=vURz_yjJ8g0OMScM)

## Photos From The Project
<div>
  <img src="https://github.com/majdroses21/restarunt-mangment-system-2024/assets/112196607/62336ccc-dd26-4c64-83fb-f7e2924aedb4" width="300">
  <img src="https://github.com/majdroses21/restarunt-mangment-system-2024/assets/112196607/50edbcba-6751-4cf5-ad5b-244b91c51595" width="300">
</div>

## Project setup
#### Follow these steps to set up and run the project on your local machine:

##### Step 1: Set Up the Database
###### I used Fake API with JSON Server. You need to install JSON Server globally on your machine

```
npm install -g json-server
```

##### Step 2: Navigate to the Database Directory
######  Open your terminal and navigate to the database directory with the following command:

```
cd ./src/DB/
```
###### Make sure you are using the Bash command line. You can select Bash from your code editor by clicking on the plus sign (+) or, if you are on Windows, open the command prompt as an administrator and then run the command:

```
json-server --watch db.json
```
###### If you are already using port 3000, you can run the server on a different port using:

```
json-server --watch db.json --port 5000
```
###### Now the database is ready.

##### Step 3: Start the Project
###### Open a new terminal in the root directory of the project and run the following command:

```
npm run serve
```
###### This will start the project and you can now access it in your browser.

