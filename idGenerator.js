function generateID() {
  let id = "";

  for (let i = 0; i < 10; i++) {
    let rand = Math.floor(Math.random() * 10);
    id = id + rand;
  }
  return id;
}

exports.randomID = generateID;
