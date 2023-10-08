const express = require("express");
const MongoClient = require("mongodb").MongoClient;
const cors = require("cors");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(express.json());

const CONNECTION_STRING =
  "mongodb+srv://41071119h:O200617985@irene.9urfdjd.mongodb.net/?retryWrites=true&w=majority";
const DATABASE_NAME = "Ideadb";
let database;

app.listen(5038, () => {
  MongoClient.connect(CONNECTION_STRING, (error, client) => {
    database = client.db(DATABASE_NAME);
    console.log("Mongo DB Connected!");
  });
});

app.get("/HW3/server/GetNotes", (request, response) => {
  database.collection("Ideashare").find({}).toArray((error, result) => {
    response.send(result);
  });
});

app.post("/HW3/server/AddNotes", multer().none(), (request, response) => {
  database.collection("Ideashare").countDocuments({}, function (
    error,
    numOfDocs
  ) {
    database.collection("Ideashare").insertOne({
      user_id: (numOfDocs + 1).toString(),
      Progress: request.body.Progress,
      Workstyle: request.body.Workstyle,
      title: request.body.title,
    });
    response.json("Add Successfully!");
  });
});

app.delete("/HW3/server/DeleteNotes/:id", (request, response) => {
  database.collection("Ideashare").deleteOne(
    {
      user_id: request.params.id,
    },
    (error, result) => {
      if (result.deletedCount === 1) {
        response.json("Delete Successfully!");
      } else {
        response.status(404).json("User not found");
      }
    }
  );
});

app.patch("/HW3/server/UpdateNotes/:id", (request, response) => {
  database.collection("Ideashare").updateOne(
    {
      user_id: request.params.id,
    },
    {
      $set: {
        Progress: request.body.Progress,
        Workstyle: request.body.Workstyle,
        title: request.body.title,
      },
    },
    (error, result) => {
      if (result.modifiedCount === 1) {
        response.json("Update Successfully!");
      } else {
        response.status(404).json("User not found");
      }
    }
  );
});

// 启动服务器
app.listen(3000, () => {
  MongoClient.connect(CONNECTION_STRING, (error, client) => {
    database = client.db(DATABASE_NAME);
    console.log("Mongo DB Connected!");
  });
});
