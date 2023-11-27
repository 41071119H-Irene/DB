var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Ideadb = new Schema({
    user_id: {
        type: String, // 使用 String 类型，因为你的 user_id 似乎是字符串
        required: true
    },
    Progress: {
        type: String,
        required: true
    },
    Workstyle: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Ideashare', Ideadb);
