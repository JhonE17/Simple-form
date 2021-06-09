//Inizalisation APP
const app = require("./app");
const PORT = process.env.PORT || 3000;

function bootstrap(){
    const DataFactory = new (DataProvider(MongoProvider))();
    DataFactory.initialize((_connection, error)=>{
        if(error) throw error;
        app.listen(PORT, ()=> logger(`App listen in: port ${PORT}`))
    })
}

module.exports = bootstrap;