const express = require("express");
const server = express();

server.use(express.json());

const users = ["David", "Paloma", "Livia"];

function checkNameInRequest(req, res, next){
    if(!req.body.name) {
        return res.status(400).json({ error: "User name is required" });
    }

    return next();
}

function checkUserInArray(req, res, next){
    const user = users[req.params.index];

    if(!user){
        return res.status(400).json({ error: "User does not exist" });
    }

    req.user = user;

    return next();
}

server.use((req, res, next) => {
    console.time("Request");
    console.log(`Method: ${req.method}; URL: ${req.url}`);

    next();

    console.log(`Response: ${res.statusMessage}`);
    console.timeEnd("Request");
});

server.get("/users", (req, res) => {
    return res.json(users);
})

server.get("/users/:index", checkUserInArray, (req, res) => {
    return res.json(req.user);
})

server.post("/users", checkNameInRequest, (req, res) => {
    const { name } = req.body;

    users.push(name);

    return res.json(users);
});

server.put("/users/:index", checkNameInRequest, checkUserInArray, (req, res) => {
    const { index } = req.params;
    const { name } = req.body;

    users[index] = name;

    return res.json(users);
})

server.delete("/users/:index", checkUserInArray, (req, res) => {
    const { index } = req.params;

    users.splice(index, 1);

    return res.json(users);
})

server.listen(3000);