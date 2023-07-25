window.addEventListener("load", async (e) => {
    const url = "/updatedetails"
    const res = await fetch(url)
    const data = await res.json()
    console.log(data)
    if (data.user.firstTime) {
        document.getElementById("firstTimeForm").style.display = "block"
    }
})
const btn = document
    .getElementById("fff-btn")
    .addEventListener("click", async (e) => {
        let diaseases = []
        var checkboxes = document.querySelectorAll(
            "input[type=checkbox]:checked"
        )

        for (var i = 0; i < checkboxes.length; i++) {
            diaseases.push(checkboxes[i].value)
        }
        e.preventDefault()
        const body = {
            firstname: document.getElementById("fname").value,
            lastname: document.getElementById("lname").value,
            address: document.getElementById("inputAddress").value,
            phoneno: document.getElementById("tel").value,
            diaseases,
            firstTime: false,
        }
        const url = "/firstupdate"
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
        const data = await res.json()
        console.log(data)
        location.reload()
    })

const qrbtn = document
    .getElementById("qr")
    .addEventListener("click", async (e) => {
        const url = "/qrgen"
        const body = {
            expiryTime: 10,
        }
        const res = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        })
        const data = await res.json()
        console.log(data)
        alert("http://localhost:3000/qr/<your-email>")
    })
// window.open('https://support.wwf.org.uk', '_blank');
