const toCurrency = price => {
  return new Intl.NumberFormat('en-EN', {
    currency: "EUR",
    style: "currency"
  }).format(price);
};

const toDate = date => {
  return new Intl.DateTimeFormat('ru-RU', {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }).format(new Date(date));
};

document.querySelectorAll(".prices").forEach(item => {
  item.textContent = toCurrency(item.textContent);
});

document.querySelectorAll(".date").forEach(item => {
  item.textContent = toDate(item.textContent);
});

const $cart = document.querySelector("#cart");
if ($cart) {
  $cart.addEventListener("click", event => {
    if (event.target.classList.contains("js-remove")) {
      const id = event.target.dataset.id;
      const csrf = event.target.dataset.csrf;

      fetch(`cart/remove/${id}`, {
        method: "delete",
        headers: {
          "X-XSRF-TOKEN": csrf
        }
      }).then(res => res.json())
        .then(cart => {
          if (cart.courses.length) {
            const html = cart.courses.map(item => {
              return `
                <tr>
                  <td>${item.title}</td>
                  <td>${item.count}</td>
                  <td>
                    <button class="btn btn-small js-remove" data-id="${item.id}">Remove</button>
                  </td>
                </tr>
              `;
            }).join("");
            $cart.querySelector("tbody").innerHTML = html;
            $cart.querySelector(".prices").textContent = toCurrency(cart.price);
          }
          else {
            $cart.innerHTML = "<p>Cart is empty</p>";
          }
        });
    }
  });
}

M.Tabs.init(document.querySelectorAll(".tabs"));