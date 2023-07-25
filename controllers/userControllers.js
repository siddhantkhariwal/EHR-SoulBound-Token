const User = require("../models/User")
const DoctorVisit = require("../models/DocterVisit")
const LabReport = require("../models/labReport")
const cloudinary = require("cloudinary").v2

exports.updateDetails = async (req, res) => {
    let user = await User.findOne({ email: req.oidc.user.email })
    if (!user) {
        user = await User.create({
            firstname: req.oidc.user.nickname,
            email: req.oidc.user.email,
        })
    }
    res.json({
        status: "ok",
        user,
    })
}
exports.firstTimeUpdate = async (req, res) => {
    const {
        firstName,
        lastName,
        email,
        address,
        phoneNumber,
        diaseases,
        firstTime,
    } = req.body
    const user = await User.findOneAndUpdate(
        { email: req.oidc.user.email, firstTime: true },
        {
            firstName,
            lastName,
            email,
            address,
            phoneNumber,
            diaseases,
            firstTime,
        }
    )
    res.json({
        status: "ok",
        user,
    })
}
exports.addDoctorVisit = async (req, res) => {
    const user = await User.findOne({ email: req.oidc.user.email })
    console.log(req.files)
    console.log(req.body)
    const { photo } = req.files
    try {
        const result = await cloudinary.uploader.upload(photo.tempFilePath, {
            folder: "prescription",
        })
        const { secure_url, public_id } = result
        const doctorVisit = await DoctorVisit.create({
            ...req.body,
            prescription: { id: public_id, securedUrl: secure_url },
            user: user._id,
        })
        res.redirect("/dashboard")
    } catch (error) {
        console.error(error)
        res.status(500).send("Something went wrong")
    }
}
exports.addLabReport = async (req, res) => {
    const user = await User.findOne({ email: req.oidc.user.email })
    const { photo } = req.files
    const result = await cloudinary.uploader.upload(photo.tempFilePath, {
        folder: "labReport",
    })
    const { secure_url, public_id } = result
    const labReport = await LabReport.create({
        ...req.body,
        report: { id: public_id, securedUrl: secure_url },
        user: user._id,
    })
    res.redirect("/dashboard")
}
exports.updateDoctorVisit = async (req, res) => {
    const { oid } = req.body
    const doctorVisit = await DoctorVisit.findByIdAndUpdate(oid, {
        ...req.body,
    })
    res.json({
        status: "ok",
        doctorVisit,
    })
}
exports.deleteDoctorVisit = async (req, res) => {
    const { oid } = req.body
    const doctorVisit = await DoctorVisit.findById(oid)
    await cloudinary.uploader.destroy(doctorVisit.prescription.id)
    await DoctorVisit.deleteOne({ _id: oid })
    res.json({ status: "ok", doctorVisit })
}
exports.deleteLabReport = async (req, res) => {
    const { oid } = req.body
    const labReport = await LabReport.findById(oid)
    await cloudinary.uploader.destroy(labReport.report.id)
    await LabReport.deleteOne({ _id: oid })
    res.json({ status: "ok", labReport })
}
exports.getAllvisits = async (req, res) => {
    const user = await User.findOne({ email: req.oidc.user.email })
    const visit = await DoctorVisit.find({ user: user._id })
    res.json({ status: "ok", visit })
}
exports.getAllLab = async (req, res) => {
    const user = await User.findOne({ email: req.oidc.user.email })
    const lab = await LabReport.find({ user: user._id })
    res.json({ status: "ok", lab })
}
exports.qrGenerator = async (req, res) => {
    const { expiryTime } = req.body
    const user = await User.findOne({ email: req.oidc.user.email })
    // await user.save({
    //     qrGenerated: Date.now(),
    //     qrExpiry: new Date(Date.now() + expiryTime * 60 * 1000),
    // })
    res.json({ status: "ok" })
}
exports.qrLink = async (req, res) => {
    const { email } = req.params
    const user = User.findOne({ email })
    if (user.qrExpiry > Date.now()) {
        return res.json({ status: "qr expires" })
    }
    const doctorVisit = DoctorVisit.find({ user: user._id })
    res.json({ doctorVisit })
}
