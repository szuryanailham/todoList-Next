======= Welcome to Todo list project ( Asistens Tools) ======

App Name : Todo list verion 1.0

Description:

A full-stack to-do list application where users can add, view, update, and delete tasks. The app will help people or student to managing they task with simple and easy as a time process , not only todo list fiture that provided , but also app will serving people or student : - remender tasks - pomodoro time - advistor for managing of time
-etc ...

purpose :
the purpose of this application is to help people manage their time and tasks effectively , using tools based on soft skills theory for better organization and productivity

Development Team :

Ilham Suryana (web developer : May 2021 - June 2024),

Design Team : -

Management :-

Web URL : https://todo-list-next-beta.vercel.app/

About this file :

    the perpose of this file to provide overview setup instructions and background information of this project, if you gave joined this project as a part of the development team , please ensure file is up to date

Flow aplication :https://lucid.app/lucidchart/de2b266a-eda7-46e4-8a79-ff1d08a93395/edit? viewport_loc=-377%2C-372%2C3208%2C1401%2C0_0&invitationId=inv_5fff199e-6931-4b00-bf3c-b908c390603c

arcitecture patten :

The pattern used in this project follows the MVC (Model-View-Controller) concept, providing clear folder segmentation based on functionality.

    - M (Model): This folder contains all files and source code related to database interactions or API connections, handling data structure and business logic.

    - V (View): This folder contains the user interface components and presentation logic, responsible for displaying data to the user.

    - C (Controller): This folder contains files that manage the flow between the Model and View, handling user input, processing requests, and returning responses.

This structure ensures organized code management, easier maintenance, and a clear separation of concerns across different parts of the application.

hirarki folder :
https://lucid.app/lucidchart/de2b266a-eda7-46e4-8a79-ff1d08a93395/edit?viewport_loc=-1278%2C-244%2C5905%2C2130%2C0_0&invitationId=inv_5fff199e-6931-4b00-bf3c-b908c390603c

Data Model :

tasks :

- id
- title task
- description task
- duedate tasks
- created_at

Software requirements :

1.  Development environment :

    - Node JS
    - NPM or Yarn

2.  Backend (Server)

    - Express Js
    - MongoDB (optimazed with Mongoose)
    - Nodemon
    - Dotenv

3.  Frontend (Client)

    - React JS
    - Next JS

4.  Styling
    - Tailwinds CSS
    - Daisy UI
5.  Additional Tools

    - VS code
    - Git
    - Postman

    Setup Instructions (front end) :

    1. The first step is fetching repositories in github into a local environment with clone project from the link below:
       (Front-end ) Github : https://github.com/szuryanailham/API-todoList-project
       (Back-end ) Github : https://github.com/szuryanailham/todoList-Next

    2. second step is to install project dependency nodes inside the local environment with the comment "npm install."

    3. asking owner project about url API and credential token API and make file .env with variable bellow :

       NEXT_PUBLIC_API_URL= URL API (BACKEND )

       NEXT_API_TOKEN = TOKEN API

    4. after completing environment , run next js inside terminal vs code with comment bellow "npm run build"

    5. aplication running in localhost port:3000

    Setup Instructions (back end) :

    1.  The first step is fetching repositories in github into a local environment with clone project from the link below:
        (Front-end ) Github : https://github.com/szuryanailham/API-todoList-project
        (Back-end ) Github : https://github.com/szuryanailham/todoList-Next

    2.  install and open mongodb compas and create a new model in it

    3.  create ne file with name '.env" and write new access url mongodb server in mongodb compass with url bellow
        example :
        URL_MONGODB = url mongodb server
        TOKEN = token mongodb server

    4.  After connected , run aplication back end with commend "npm start" inside terminal vs code and server api already run in port localhost:3001
