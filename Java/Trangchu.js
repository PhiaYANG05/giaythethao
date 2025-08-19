// ====== JS TOÀN BỘ: GIỎ HÀNG + SLIDER + DOT ======
document.addEventListener("DOMContentLoaded", () => {
    // --- Thêm sản phẩm vào giỏ hàng ---
    const buyButtons = document.querySelectorAll(".SP_banchay button");

    function parsePrice(text) {
        const digits = (text || "").toString().replace(/[^\d]/g, "");
        return digits ? parseInt(digits, 10) : 0;
    }

    function getProductName(productDiv) {
        const anchors = productDiv.querySelectorAll("a");
        for (const a of anchors) {
            const t = (a.textContent || "").trim();
            if (t && !/^giá:?$/i.test(t)) return t;
        }
        return "Sản phẩm";
    }

    buyButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const product = btn.closest(".SP_banchay > div") || btn.parentElement;
            const imgEl = product.querySelector("img");
            const img = imgEl ? imgEl.getAttribute("src") : "";
            const name = getProductName(product);
            const priceSpan = product.querySelector("span");
            const price = parsePrice(priceSpan ? priceSpan.textContent : "");
            let cart = [];
            try { cart = JSON.parse(localStorage.getItem("cart")) || []; } catch { cart = []; }

            const existing = cart.find(item => item.name === name);
            if (existing) {
                existing.quantity = (existing.quantity || 1) + 1;
            } else {
                cart.push({ img, name, price, quantity: 1 });
            }

            localStorage.setItem("cart", JSON.stringify(cart));
            alert(`Đã thêm "${name}" vào giỏ hàng!`);
            console.log("Giỏ hàng:", cart);
        });
    });

    // --- SLIDER ---
    const slides = document.querySelectorAll('.slide-wrapper img');
    const slideWrapper = document.querySelector('.slide-wrapper');
    const nextBtn = document.querySelector('.next');
    const prevBtn = document.querySelector('.prev');

    if (slides.length && slideWrapper) {
        let index = 0;

        // --- Tạo chấm dot tự động ---
        const dotContainer = document.createElement('div');
        dotContainer.classList.add('dot-container');
        for (let i = 0; i < slides.length; i++) {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            dotContainer.appendChild(dot);
        }
        document.querySelector('#slide').appendChild(dotContainer);
        const dots = dotContainer.querySelectorAll('.dot');

        function showSlide(i) {
            if(i >= slides.length) index = 0;
            else if(i < 0) index = slides.length - 1;
            else index = i;

            const slideWidth = slides[0].clientWidth;
            slideWrapper.style.transform = `translateX(-${slideWidth * index}px)`;

            // Update dot active
            dots.forEach(dot => dot.classList.remove('active'));
            if(dots[index]) dots[index].classList.add('active');
        }

        if(nextBtn) nextBtn.addEventListener('click', () => showSlide(index + 1));
        if(prevBtn) prevBtn.addEventListener('click', () => showSlide(index - 1));

        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => showSlide(i));
        });

        // Auto slide
        setInterval(() => showSlide(index + 1), 5000);

        showSlide(index); // Hiển thị slide đầu tiên
    }
});
