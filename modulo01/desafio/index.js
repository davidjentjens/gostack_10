const express = require("express");
const server = express();

server.use(express.json());

let reqsCount = 0;

const projects = [ 
    {id: 1, title: "Projeto 1", tasks: ["Criar", "Ler"]},
    {id: 2, title: "Projeto 2", tasks: ["Remover"]},
    {id: 3, title: "Projeto 3", tasks: ["Criar"]},
    {id: 4, title: "Projeto 4", tasks: ["Editar"]}
];

server.use((req, res, next) => {
    reqsCount++;
    console.log(`Number of requests: ${reqsCount}`);

    return next();
});

function checkId(req, res, next){
    const { id } = req.body;

    if(!id){
        return res.status(400).json({ error: "Id param undefined or invalid" })
    }

    req.id = id;

    return next();
}

function checkTitle(req, res, next){
    const { title } = req.body;

    if(!title){
        return res.status(400).json({ error: "Title param undefined or invalid" })
    }

    req.title = title;

    return next();
}

function checkTask(req, res, next){
    const { task } = req.body;

    if(!task){
        return res.status(400).json({ error: "Task param undefined or invalid" })
    }

    req.task = task;

    return next();
}

function checkIfProjectExists(req, res, next){
    let index = undefined;
    const { id } = req.params;

    for(let i = 0; i < projects.length; i++){
        if(projects[i].id == id){
            index = i;
            break;
        }
    }

    if(index == undefined){
        return res.status(400).json({ error: "Project does not exist" })
    }

    req.index = index;

    return next();
}

//Create
server.post("/projects", checkId, checkTitle, (req, res) => {
    const { id } = req.body;

    const project = {
        id: id,
        title: req.title,
        tasks: []
    }

    projects.push(project);

    return res.json(projects);
});

//Read all
server.get("/projects", (req, res) => {
    return res.json(projects);
});

//Read by id
server.get("/projects/:id", checkIfProjectExists, (req, res) => {
    const { id } = req.params;

    return res.json(projects[req.index]);
});

//Update
server.put("/projects/:id", checkTitle, checkIfProjectExists, (req, res) => {
    const { id } = req.params;
    
    projects[req.index].title = req.title;

    return res.json(projects[req.index]);
});

//Update tasks
server.post("/projects/:id/tasks", checkTask, checkIfProjectExists, (req, res) => {
    const { id } = req.params;
    
    projects[req.index].tasks.push(req.task);

    return res.json(projects[req.index]);
});

//Delete
server.delete("/projects/:id", checkIfProjectExists, (req, res) => {
    const { id } = req.params;
    
    projects.splice(req.index, 1);

    return res.json(projects);
});

server.listen(3000);