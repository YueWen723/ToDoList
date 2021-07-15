var typeorm = require("typeorm");
var EntitySchema = typeorm.EntitySchema;
mysql = {
    name:'todoConnection',
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "todo",
    synchronize: true,
    entities:[
        new EntitySchema(require("../db/entity/Todo")),
    ]
}
module.exports = mysql; //用module.exports暴露出这个接口，
