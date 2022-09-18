const toCurrency = (price) => {
    return new  Intl.NumberFormat("uz-Uz", {
        currency: 'uzb',
        style: 'currency',
    }).format(price)
}

document.querySelectorAll(".price").forEach((s) => {
    s.textContent = toCurrency(s.textContent);
})

const $card = document.querySelector("#card");
if($card) {
    $card.addEventListener("click", (e) => {
        if(e.target.classList.contains("count-remove")) {
            const id = e.target.dataset.id;
            
            fetch("/card/remove/" + id, {
                method: "delete"
            })
            .then((res) => res.json())
            .then((card) => {
                if(card.teslaX.length) {
                    const dynamicHtml = card.teslaX.map((s) => {
                        return`
                        <tr>
                            <td>${s.title}</td>
                            <td>${s.count}</td>
                            <td>
                                <button class="btn btn-danger count-remove" data-id="${s.id}">Delete</button>
                            </td>
                        </tr>
                        
                        `;
                    })
                    .join("");
                    $card.querySelector("tbody").innerHTML = dynamicHtml;
                    $card.querySelector(".price").textContent = toCurrency(card.price);
                } else {
                    $card.innerHTML = "<h4>Basket is Empty</h4>"
                }
            })
        }
    })
}











