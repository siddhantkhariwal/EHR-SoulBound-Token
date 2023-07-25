const mongoose = require("mongoose")
const connect = mongoose
    .connect(process.env.CONN_STR)
    .then(() => {
        console.log("DB CONNECTED")
    })
    .catch((error) => {
        console.log("DB NOT CONNECTED", error)
    })

module.exports = connect
