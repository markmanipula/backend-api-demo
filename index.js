//require express
const express = require("express");
const app = express();

//use json to help access the body. this serves as a middlewear
app.use(express.json());

const PORT = 3000;

//require the database
let { listOfDestinations } = require("./database");

//require generate ID
const { randomID } = require("./idGenerator");

//listen
app.listen(PORT, () => {
  console.log(`Server started. Listening to port ${PORT}`);
});

//get all the list of destinations from the database
app.get("/destinations", (req, res) => {
  res.send(listOfDestinations);
});

//read file of the form
// app.get("/destinations", (req, res) => {
//   res.sendFile(__dirname + "/index.html");
// });

//CREATE -> READ -> UPDATE -> DELETE
//POST-> GET -> PUT-> DELETE
//post destination so users can search first arg should be the same action for the form in html.
//html has to have a method POST
app.post("/destinations", (req, res) => {
  //input that post route taht accept {destination, location, photo, description}

  const { id, name, location, url, description } = req.body;

  if (
    name === "" ||
    name === undefined ||
    location === "" ||
    location === undefined
  ) {
    return res.status(400).json({ error: "must put name and location" });
  }

  listOfDestinations.push({
    id: randomID(),
    name: name,
    location: location,
    url: url,
    description: description,
  });

  res.send("Sucessfully submitted!");
});

app.delete("/destination/:id", (req, res) => {
  //idk what to do here
  const idToGetDeleted = req.params.id;

  let newArray = [];

  //loops through the array and check if the id that needs to be deleted is there.
  //if so, dont push it to the new array
  for (let i = 0; i < listOfDestinations.length; i++) {
    if (listOfDestinations[i].id != idToGetDeleted) {
      newArray.push(listOfDestinations[i]);
    }
  }

  listOfDestinations = newArray;

  res.send(`Object with the id ${idToGetDeleted} is deleted`);
});

//implement update
app.put("/destination/", (req, res) => {
  res.send("Updated!");
});
