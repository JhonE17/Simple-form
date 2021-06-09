//Asignation global fields
require("dotenv-flow").config();
Object.assign(global, require("./src/utils"));
Object.assign(global, require("./src/factories"));
Object.assign(global, require("./src/interfaces"));
Object.assign(global, require("./src/database"));
Object.assign(global, require("./src/libs"));
require("./src/bootstrap")();