const input = document.getElementById("formFileMultiple")

// add event listener
input.addEventListener("change", () => {
    const body = {
        diaseases: document.getElementById("inputEmail4").value,
        medicine: document.getElementById("inputEmail4").value,
        reasonOfVisit: document.getElementById("inputPassword4").value,
        sideEffects: document.getElementById("tel").value,
        isRecovered: document.getElementById("isr").value,
    }
    console.log(body)
    uploadFile(input.files[0], body)
})

const uploadFile = (file, body) => {
    const fd = new FormData()
    fd.append("photo", file)
    console.log(fd)

    // send `POST` request
    fetch("/adddoctorvisit", {
        method: "POST",
        body: JSON.stringify(body),
    })
        .then((res) => res.json())
        .then((json) => console.log(json))
        .catch((err) => console.error(err))
}
