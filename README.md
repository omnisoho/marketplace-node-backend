# Project Title

marketplace-node-backend

## Description

NodeJs backend for marketplace mini project

## Dependencies

### NodeJs and NPM

You need to have NodeJs and NPM on your machine to start the server and install packages needed by the application

- Reference to install Node & NPM on linux: https://www.geeksforgeeks.org/installation-of-node-js-on-linux/
- Reference to install Node & NPM on windows: https://phoenixnap.com/kb/install-node-js-npm-on-windows

### MySql

You need to have MySql on your machine. 
You also need to create a database named 'marketplace' and create a user named 'marketplaceuser' with password 'test'.
If you prefer to use your own configurations, you can edit the connection file under /app/config/db.config.js

- Reference to install MySql on windows: https://www.onlinetutorialspoint.com/mysql/install-mysql-on-windows-10-step-by-step.html
- Reference to install MySql on linux: https://dev.mysql.com/doc/mysql-linuxunix-excerpt/5.6/en/linux-installation-native.html
- Reference to create a databased and add a user via MySql Workbench: http://webvaultwiki.com.au/Default.aspx?Page=Create-Mysql-Database-User-Workbench&NS=&AspxAutoDetectCookieSupport=1


## Installing

After git clone of the repository, run the following in the root folder

```
npm install
```

## Executing

How to start the application

```
node server.js
```
The server will be running on http://localhost:8080
The database tables will be generated upon server start and removed upon server stop.

## Documentation

APIs and database documentation files are under /docs folder
The Apis can also be referenced at http://localhost:8080/api-docs
