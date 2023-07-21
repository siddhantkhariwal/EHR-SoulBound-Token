window.addEventListener("load", (e) => {
    getAllHistory()
})
async function getAllHistory() {
    try {
        const res = await fetch("/getAllVisit", {
            method: "GET",
        })
        const data = await res.json()
        historyCards(data.visit)
        // console.log(data.visit)
    } catch (e) {
        console.log(e)
    }
}
getAllHistory()
function historyCards(data) {
    console.log(data)
    const inputElm = document.getElementById("card")
    let html = ""
    data.forEach(function (value, index, array) {
        html += ` <div class="cardPrescription" style="width: 18rem;">
        <img src="${value.prescription.securedUrl}" class="card-img-top" alt="...">
        <div class="card-body">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">Reason Of Visit: ${value.reasonOfVisit}</li>
            <li class="list-group-item">Diseases: ${value.diaseases}</li>
            <li class="list-group-item">Medicines: ${value.medicine}</li>
            <li class="list-group-item">Recovered: ${value.isRecovered}</li>
            <li class="list-group-item">Date: ${value.createdAt}</li>
          </ul>
        </div>
      </div>`
    })
    inputElm.innerHTML = html
}
