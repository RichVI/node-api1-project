const express = require('express');
const shortId = require('shortid');
const server = express();

let user = []; 
server.use(express.json());

// GET all users
server.get('/api/users', (req, res) => {
    const userInfo = req.body;
    if(userInfo){
        res.status(201).json({
            api: "GET users success",
            user: user
        });
    }
    else{
        res.status(500).json({ errorMessage: ' The users information could not be retrieved '})
    }
});

// GET user by ID
server.get('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const matchedUser = user.find(user => user.id === id);
        if(matchedUser){
            res.status(200).json({
                api: "GET users success",
                user: matchedUser
            })}
        else{
            res.status(404).json({ message: "The user with the specified ID does not exist." });
        }
    });
    

    
// POST user
server.post('/api/users', (req, res) => {
    const userInfo = req.body;
    if (userInfo.name && userInfo.bio){
        userInfo.id = shortId.generate();
        user.push(userInfo)
        res.status(201).json(userInfo);
    }
    else {
        res.json({ errorMessage: "Please provide name and bio for the user." });
    }
});

// DELETE user
server.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const matchedUser = user.find(user => user.id === id);
    if (matchedUser){
        user = user.filter(user => user.id !== matchedUser.id );
        res.status(201).json({ 
            api: "DELETE user success",
            user: user
        })
    }
    else{
        res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
})

const PORT = 5000;
server.listen(PORT, () => console.log (`\n ** API on http://localhost:${PORT} ** \n`));