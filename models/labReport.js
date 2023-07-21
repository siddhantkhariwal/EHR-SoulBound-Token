const mongoose = require("mongoose")

const labReportSchema = mongoose.Schema(
    {
        report: {
            id: {
                type: String,
            },
            securedUrl: {
                type: String,
            },
        },
        testName: {
            type: String,
        },

        user: {
            type: mongoose.Schema.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
)
module.exports = mongoose.model("labReport", labReportSchema)
