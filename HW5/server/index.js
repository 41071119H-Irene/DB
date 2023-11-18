const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Irene.Chang0207",
  database: "idea",
});

app.post("/create", (req, res) => {
  const user_id = req.body.user_id;
  const progress = req.body.progress;
  const workstyle = req.body.workstyle;



  db.query(
    "INSERT INTO idea (user_id, progress, workstyle) VALUES (?,?,?)",
    [user_id, progress, workstyle],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values Inserted");
      }
    }
  );
});

app.get("/ideas", (req, res) => {
  db.query("SELECT * FROM idea", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update/:id", (req, res) => {
  const id = req.params.id;
  const progress = req.body.progress;
  db.query(
    "UPDATE idea SET progress = ? WHERE id = ?",
    [progress, id],
    (err, result) => {
      if (err) {
        console.log(err);
        res.send("Update failed");
      } else {
        res.send("Update successful");
      }
    }
  );
});


app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM idea WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
