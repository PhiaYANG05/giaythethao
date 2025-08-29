// Lấy tất cả ảnh sản phẩm
const images = document.querySelectorAll(".product-img");
const overlay = document.getElementById("overlay");
const overlayImg = document.getElementById("overlayImg");
const closeBtn = document.querySelector(".close");

// Khi click ảnh → mở overlay
images.forEach(img => {
  img.addEventListener("click", () => {
    overlay.style.display = "block";
    overlayImg.src = img.src;
  });
});

// Khi click nút đóng → ẩn overlay
closeBtn.addEventListener("click", () => {
  overlay.style.display = "none";
});

// Khi click ra ngoài ảnh → cũng đóng overlay
overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.style.display = "none";
  }
});
