var configValue = require("./config.json");
module.exports = {
    getConnectionString: function() {
        return `mongodb+srv://${configValue.database.username}:${configValue.database.password}@cluster0-9aidu.mongodb.net/DataMining?retryWrites=true&w=majority`
    }
}