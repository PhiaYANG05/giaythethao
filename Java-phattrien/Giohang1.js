document.addEventListener("DOMContentLoaded", () => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartBody = document.getElementById("cart-body");
    const totalEl = document.getElementById("total-price") || document.getElementById("cart-total");

    function save() {
        localStorage.setItem("cart", JSON.stringify(cart));
    }
    function fmt(n) {
        return n.toLocaleString("vi-VN") + "đ";
    }

    function render() {
        cartBody.innerHTML = "";

        if (!cart || cart.length === 0) {
            cartBody.innerHTML = `<tr><td colspan="6">Bạn chưa thêm sản phẩm nào vào giỏ hàng</td></tr>`;
            if (totalEl) totalEl.textContent = "0đ";
            return;
        }

        let total = 0;

        cart.forEach((item, index) => {
            const itemTotal = (Number(item.price) || 0) * (Number(item.quantity) || 1);
            total += itemTotal;

            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td><img src="${item.img}" width="80" /></td>
                <td>${item.name}</td>
                <td class="price">${Number(item.price).toLocaleString("vi-VN")}đ</td>
                <td>
                    <button class="qty-btn decrease" data-index="${index}">-</button>
                    <button class="qty-display" disabled>${item.quantity}</button>
                    <button class="qty-btn increase" data-index="${index}">+</button>
                </td>
                <td class="item-total">${itemTotal.toLocaleString("vi-VN")}đ</td>
                <td><button class="delete-btn" data-index="${index}">Xóa</button></td>
            `;
            cartBody.appendChild(tr);
        });

        if (totalEl) totalEl.textContent = total.toLocaleString("vi-VN") + "đ";
    }

    // Xóa sản phẩm
    cartBody.addEventListener("click", (e) => {
        if (e.target.classList.contains("delete-btn")) {
            const idx = Number(e.target.dataset.index);
            if (!Number.isNaN(idx)) {
                cart.splice(idx, 1);
                save();
                render();
            }
        }
    });

    // Tăng / Giảm số lượng
    cartBody.addEventListener("click", (e) => {
        const idx = Number(e.target.dataset.index);
        if (e.target.classList.contains("increase")) {
            cart[idx].quantity++;
            save();
            render();
        }
        if (e.target.classList.contains("decrease")) {
            if (cart[idx].quantity > 1) {
                cart[idx].quantity--;
                save();
                render();
            }
        }
    });

    render();
});
