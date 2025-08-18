// Giohang.js
function formatCurrency(num) {
    return num.toLocaleString("vi-VN") + "đ";
}

function loadCart() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartBody = document.getElementById("cart-body");
    const emptyMsg = document.getElementById("empty-message");
    const totalPriceEl = document.getElementById("total-price");
    cartBody.innerHTML = "";
    let total = 0;

    if (cart.length === 0) {
        emptyMsg.style.display = "block";
        totalPriceEl.textContent = "0đ";
        return;
    }

    emptyMsg.style.display = "none";

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td><img src="${item.img}" /></td>
            <td>${item.name}</td>
            <td class="price">${item.price}</td>
            <td>
                <div class="quantity-control">
                    <button class="minus" data-index="${index}">-</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="plus" data-index="${index}">+</button>
                </div>
            </td>
            <td class="item-total">${formatCurrency(itemTotal)}</td>
            <td><button class="delete-btn" data-index="${index}">X</button></td>
        `;
        cartBody.appendChild(tr);
    });

    totalPriceEl.textContent = formatCurrency(total);

    document.querySelectorAll(".plus").forEach(btn =>
        btn.addEventListener("click", function () {
            const index = btn.getAttribute("data-index");
            cart[index].quantity += 1;
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart();
        })
    );

    document.querySelectorAll(".minus").forEach(btn =>
        btn.addEventListener("click", function () {
            const index = btn.getAttribute("data-index");
            if (cart[index].quantity > 1) {
                cart[index].quantity -= 1;
            } else {
                cart.splice(index, 1);
            }
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart();
        })
    );

    document.querySelectorAll(".delete-btn").forEach(btn =>
        btn.addEventListener("click", function () {
            const index = btn.getAttribute("data-index");
            cart.splice(index, 1);
            localStorage.setItem("cart", JSON.stringify(cart));
            loadCart();
        })
    );
}

document.addEventListener("DOMContentLoaded", loadCart);
