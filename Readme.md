# Introduction
This backend for Coding platform where participants can solve questions for the problems provided, run the questions
using the Sphere Engine and the admin can add, edit or delete the questions.

## Tech Stack
<ul>
    <li>ExpressJS</li>
    <li>BcryptJS</li>
    <li>MongoDB</li>
    <li>Winston</li>
    <li>Docker</li>
    <li>nodemailer</li>
    <li>jsonwebtoken</li>
</ul>

## Instructions to run the backend on your machine
<ol>
    <li>Clone this repo</li>
    <li>Run - yarn install</li>
    <li>Create .env file in the root directory</li>
    <li>Add variables to .env file</li>
    <li>To run the backend in development mode, run - yarn dev</li>
    <li>To run the backend in production mode, run - yarn start</li>
</ol>

## Environment Variables

<ul>
    <li>PORT</li>
    <li>MONGO_URI</li>
    <li>SPHERE_ENDPOINT</li>
    <li>SPHERE_TOKEN</li>
    <li>JWT_SECRET_1</li>
    <li>FRONTEND_PORT </li>
    <li>FRONTEND_URL </li>
</ul>