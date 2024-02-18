----server using express js----

1. create a folder for server
2. create package.json file :using npm init -y
3. install external packages to create server :using npm,npm i express cors dotenv
4. create .env file :to hold environmental variable
5. create .gitignore file, and add node_modules,.env
6. create index.js file
7. create express server in index.js
    - import dotenv package,call config method: to load content of .env file into process.env
    - import express to a variable
    - import cors to a variable
    - create express server : call express()
    - use cors in express server :
    - create a port to host server app
    - server must listen the port for client request
    - to resolve client request (http get/post/put/delete request)
       -server.httpMethod(path,request handler fn (req,res)=>{})
    - create a controllers folder in server app
       -create a js file for user management
         -Define logic for each request handlers
    - create a routes folder in server app
       -create a router.js file inside the folder
         -import express
         -to set up Routes for express use Router class
8. to run server app : use command ,node index.js and also update it as start command in package.json server