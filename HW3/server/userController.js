var userService = require('./userService');

var getDataConntrollerfn = async (req, res) =>
{
    var Ideashare = await userService.getDataFromDBService();
    res.send({ "status": true, "data": Ideashare });
}

var createUserControllerFn = async (req, res) => 
{
    var status = await userService.createUserDBService(req.body);
    if (status) {
        res.send({ "status": true, "message": "created successfully" });
    } else {
        res.send({ "status": false, "message": "Error creating idea" });
    }
}

var updateUserController = async (req, res) => 
{
    console.log(req.params.id);
    console.log(req.body);
     
    var result = await userService.updateUserDBService(req.params.id,req.body);

     if (result) {
        res.send({ "status": true, "message": "Updateeeedddddd"} );
     } else {
         res.send({ "status": false, "message": "Updateeeedddddd Faileddddddd" });
     }
}

var deleteUserController = async (req, res) => 
{
     console.log(req.params.id);
     var result = await userService.removeUserDBService(req.params.id);
     if (result) {
        res.send({ "status": true, "message": "Deleteddd"} );
     } else {
         res.send({ "status": false, "message": "Deleteddd Faileddddddd" });
     }
}
module.exports = { getDataConntrollerfn, createUserControllerFn,updateUserController,deleteUserController };