document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".sp button"); // tất cả nút trong .sp

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const productDiv = button.parentElement; // div chứa 1 sản phẩm

            const img = productDiv.querySelector("img").getAttribute("src");
            const name = productDiv.querySelector("a").textContent.trim(); // lấy tên (thẻ a đầu tiên)
            const priceText = productDiv.querySelector("span").textContent.trim();
            const price = parseInt(priceText.replace(/\./g, "")); // bỏ dấu chấm

            const product = {
                img,
                name,
                price,
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

            alert(`Đã thêm "${name}" vào giỏ hàng!`);
            console.log("Giỏ hàng hiện tại:", cart);
        });
    });
});
