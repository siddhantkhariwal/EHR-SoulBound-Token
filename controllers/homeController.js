exports.homeController = (req, res) => {
    res.render("index1")
}
exports.dashboard = (req, res) => {
    res.render("index")
}
exports.doctorVisit = (req, res) => {
    res.render("dr")
}
exports.labReport = (req, res) => {
    res.render("lab")
}
exports.history = (req, res) => {
    res.render("history")
}
exports.qr = (req, res) => {
    res.render("qr")
}
