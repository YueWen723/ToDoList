const typeorm = require("typeorm");
const cdbConfig = require("../config/mysqlConfig");

const connection = await this._getConnection();
const todoRepository = connection.getRepository("todo");
class DbServices {

    constructor() {
        //初始化连接
        this._connection = null
    }

    //格式化时间戳
    // _formatDate(datetime) {
    //     //格式化时间戳为2021-07-13 00:00:00的格式
    //     const dateStamp = new Date(datetime);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    //     const year = dateStamp.getFullYear(),
    //         month = ("0" + (dateStamp.getMonth() + 1)).slice(-2),
    //         date = ("0" + dateStamp.getDate()).slice(-2),
    //         hour = ("0" + dateStamp.getHours()).slice(-2),
    //         minute = ("0" + dateStamp.getMinutes()).slice(-2),
    //         second = ("0" + dateStamp.getSeconds()).slice(-2);
    //     // 拼接
    //     const result = year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    //     // 返回
    //     return result;
    // }
    /**
     * 获取mysql连接
     * @returns {Promise<unknown>}
     */
    async _getConnection() {
        let that = this;
        if (this._connection) {
            return this._connection;
        }
        return new Promise(resolve => {
            typeorm.createConnection(cdbConfig).then(function (connection) {
                that._connection = connection;
                resolve(connection);
            }).catch(function (error) {
                console.log("Error: ", error);
            });
        })
    }

    /**
     * 插入数据
     * @param obj
     */
    insertData(obj) {
        return new Promise(async resolve => {
            // obj.created_at=this._formatDate(new Date().getTime())
            todoRepository.save(obj)
                .then(function (savedtodo) {
                    resolve(savedtodo);
                }, function (e) {
                    console.log(e)
                })
        })
    }

    /**
     * 删除数据
     * @param obj
     */
    deleteData(obj) {
        return new Promise(async resolve => {
            // obj.deleted_at=this._formatDate(new Date().getTime())
            todoRepository.save(obj)
                .then(function (rmdtodo) {
                    resolve(rmdtodo);
                }, function (e) {
                    console.log(e)
                })
        })
    }

    /**
     * 更新数据
     * @param obj
     */
    updateData(obj) {
        return async resolve => {
            todoRepository.save(obj)
                .then(function (obj) {
                    resolve(obj);
                }, function (e) {
                    console.log(e)
                })
        }
    }

    /**
     * 获取数据数据
     * @param obj
     */
    listData(obj) {
        return async resolve => {
            todoRepository.find({ deleted_at: null })
                .then(function (alltodo) {
                    resolve(alltodo);
                }, function (e) {
                    console.log(e)
                })
        }
    }

}

let dbServices = new DbServices();
module.exports = dbServices;
