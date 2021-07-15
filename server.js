//创建服务器
const Hapi = require('hapi')
const path = require('path');
const inert = require('inert');
let dbServices = require("./db/DbServices");


const server = Hapi.server({
    port: 3002,
    host: 'localhost',
    routes: {
        files: {
            relativeTo: path.join(__dirname, 'public')
        }, cors: {
            origin: ['*']
        }
    }

})

const init = async () => {
    await server.register(inert)
    server.route({
        path: '/{param*}',
        method: 'GET',
        handler: {
            directory: {
                path: '.',
                index: true,
            }
        }
    })

    //插入数据路由
    server.route({
        path: '/api/todo/insert',
        method: 'POST',
        async handler(request) {
            //获取请求数据
            let todo = request.payload
            if (todo.completed) {
                todo.status = "completed"
            } else {
                todo.status = "active"
            }
            delete todo.completed;
            let insertTodo = await dbServices.insertData(todo);
            return {code: 200, data: insertTodo}
        }
    })
    //列出数据路由
    server.route({
        path: '/api/todo/list',
        method: 'get',
        async handler(request) {
            let allData = await dbServices.listData();
            for (let i = 0; i < allData.length; i++) {
                let todo = allData[i];
                if (todo.status == "completed") {
                    todo.completed = true
                } else {
                    todo.completed = false
                }
            }
            return {code: 200, data: allData}
        }
    })
    //更新数据路由
    server.route({
        path: '/api/todo/update',
        method: 'post',
        async handler(request) {
            //获取请求数据
            let todo = request.payload
            if (todo.completed) {
                todo.status = "completed"
            } else {
                todo.status = "active"
            }
            delete todo.completed;
            console.log(todo)
            let updateTodo = await dbServices.updateData(todo);
            return {code: 200, data: updateTodo}
        }
    })
    //删除数据路由
    server.route({
        path: '/api/todo/delete',
        method: 'post',
        async handler(request) {
            //获取请求数据
            let todo = request.payload
            if (todo.completed) {
                todo.status = "completed"
            } else {
                todo.status = "active"
            }
            delete todo.completed;
            let deleteTodo = await dbServices.deleteData(todo);
            return {code: 200, data: deleteTodo}
        }
    })
    await server.start()
    console.log(`Server running at: ${server.info.uri}`)
}
init()

