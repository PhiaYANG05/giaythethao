function formatPrice(price) {
  return price.toLocaleString('vi-VN') + 'đ';
}

function updateTotal() {
  const rows = document.querySelectorAll("#cart-body tr");
  let total = 0;
  rows.forEach(row => {
    const quantity = parseInt(row.querySelector(".quantity").innerText);
    const price = parseInt(row.querySelector(".price").innerText);
    const itemTotal = price * quantity;
    row.querySelector(".item-total").innerText = formatPrice(itemTotal);
    total += itemTotal;
  });
  document.getElementById("total-price").innerText = formatPrice(total);
}
function checkEmptyCart() {
  const cartBody = document.getElementById("cart-body");
  const emptyMessage = document.getElementById("empty-message");
  if (cartBody.children.length === 0) {
    emptyMessage.style.display = "block";
    document.querySelector(".total").style.display = "none";
  } else {
    emptyMessage.style.display = "none";
    document.querySelector(".total").style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const cartBody = document.getElementById("cart-body");

  cartBody.addEventListener("click", function (e) {
    const target = e.target;

    if (target.classList.contains("plus") || target.classList.contains("minus")) {
      const quantitySpan = target.parentElement.querySelector(".quantity");
      let quantity = parseInt(quantitySpan.innerText);

      if (target.classList.contains("plus")) {
        quantity++;
      } else if (target.classList.contains("minus") && quantity > 0) {
        quantity--;
      }

      quantitySpan.innerText = quantity;
      updateTotal();
    }

    if (target.classList.contains("delete-btn")) {
      const row = target.closest("tr");
      row.remove();
      updateTotal();
      checkEmptyCart();
    }
  });

  updateTotal();
  checkEmptyCart();
});
