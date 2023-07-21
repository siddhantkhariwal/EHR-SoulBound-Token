const mongoose = require("mongoose")

const DoctorVisitSchema = mongoose.Schema(
    {
        diaseases: {
            type: String,
        },
        medicine: {
            type: String,
        },

        reasonOfVisit: {
            type: String,
        },
        prescription: {
            id: {
                type: String,
            },
            securedUrl: {
                type: String,
            },
        },
        isRecovered: {
            type: String,
            default: "false",
        },
        sideEffects: {
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
module.exports = mongoose.model("DoctorVisit", DoctorVisitSchema)
