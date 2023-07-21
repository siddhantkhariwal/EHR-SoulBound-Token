const express = require("express")
const router = express.Router()

const { requiresAuth } = require("express-openid-connect")
const {
    homeController,
    dashboard,
    doctorVisit,
    labReport,
    history,
} = require("../controllers/homeController")
router.route("/").get(homeController)
router.route("/dashboard").get(requiresAuth(), dashboard)
router.route("/dr").get(requiresAuth(), doctorVisit)
router.route("/lab").get(requiresAuth(), labReport)
router.route("/history").get(requiresAuth(), history)
module.exports = router
