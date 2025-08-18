// Sanpham.js
document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll("button");

    buttons.forEach(button => {
        if (button.textContent.trim().toLowerCase() === "mua ngay") {
            button.addEventListener("click", function () {
                const parent = button.parentElement;
                const img = parent.querySelector("img").getAttribute("src");
                const name = parent.querySelectorAll("a")[0].textContent;
                const price = parent.querySelector("span").textContent.replace(/\./g, "").trim();

                const product = {
                    img,
                    name,
                    price: parseInt(price),
                    quantity: 1
                };

                let cart = JSON.parse(localStorage.getItem("cart")) || [];

                const existing = cart.find(item => item.name === product.name);
                if (existing) {
                    existing.quantity += 1;
                } else {
                    cart.push(product);
                }

                localStorage.setItem("cart", JSON.stringify(cart));
                alert("Đã thêm vào giỏ hàng!");
            });
        }
    });
});
