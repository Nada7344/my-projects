const express = require("express")
const { randomUUID } = require("crypto")
const path = require("node:path")
const fs = require("node:fs")
const app = express();
port = 3000;
app.use(express.json())

function getUsersInfo() {
    const users = fs.readFileSync(path.resolve("./Users.json"), { encoding: "utf-8" })
    console.log(typeof users);
    return JSON.parse(users);
}

function writeUsers(users) {
    fs.writeFileSync(path.resolve("./Users.json"), JSON.stringify(users, null, 2));
}

app.post("/user", (req, res, next) => {
    console.log(req.body);
    const { name, age, email } = req.body;
    let users = getUsersInfo();
    console.log(users);
    const checkUserExist = users.find((user) => {
        return user.email == email;
    })
    if (checkUserExist) {
        return res.status(409).json({ mesaage: "email is already exist" })
    } else {
        const user = { id: randomUUID(), name, age, email };
        users.push(user);
        writeUsers(users);
        return res.status(201).json({ mesaage: "User added successfully.", user });
    }
})

app.get("/user/:id", (req, res, next) => {
    console.log(req.params);
    const { id } = req.params;

    let users = getUsersInfo();

    const user = users.find((user) => {

        return user.id == id;
    })

    if (!user) {
        return res.status(404).json("user not found")
    } else {


        return res.status(200).json({ user });
    }

})


app.delete("/user/{:id}", (req, res, next) => {
    console.log(req.params);
    console.log(req.body);

    const id = req.params.id ?? req.body.id;
    let users = getUsersInfo();
    const usersLength = users.length;


    const newUsers = users.filter((user) => {
        return user.id !== id;
    })
    console.log(newUsers);


    if (newUsers.length == usersLength) {
        return res.status(404).json("user id not exist")
    } else {

        writeUsers(newUsers);
        return res.status(200).json("User deleted successfully.");
    }

})

app.get("/user/getByName", (req, res, next) => {
    console.log(req.query);
    const { name } = req.query;
    let users = getUsersInfo();
    const user = users.find((user) => {
        return user.name == name;
    })
    if (!user) {
        return res.status(404).json({ mesaage: "user name not found" })
    } else {

        return res.status(200).json({ user });
    }
})

app.get("/user", (req, res, next) => {

    let users = getUsersInfo();
    console.log(users);

    if (!users) {
        return res.status(404).json({ mesaage: "no users found for display" })
    } else {

        return res.status(200).json({ users });
    }
})

app.get("/user/filter", (req, res, next) => {
    console.log(req.req);

    const { minAge } = req.query;
    console.log(minAge);
    let users = getUsersInfo();

    const newUsers = users.filter((user) => {
        return user.age >= minAge;
    })
    console.log(newUsers);


    if (!newUsers) {
        return res.status(404).json("no user found")
    } else {

        return res.status(200).json(newUsers);
    }

})

app.all("{/*du}", (req, res, next) => {
    return res.json("invalid routing");
})

app.listen(port, () => {
    console.log(`server running on port ${port}`);

})