window.addEventListener('load', () => {
    const slider = document.querySelector('.slide-wrapper');
    const images = document.querySelectorAll('.slide-wrapper img');
    const totalImages = images.length;
    let index = 0;
    let interval;

    // Tạo chấm tròn
    function createDots() {
        const container = document.createElement('div');
        container.classList.add('dot-container');
        for (let i = 0; i < totalImages; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => {
                index = i;
                updateSlider();
            });
            container.appendChild(dot);
        }
        document.getElementById('slide').appendChild(container);
    }

    // Cập nhật slider và chấm tròn
    function updateSlider() {
        slider.style.transform = `translateX(-${index * 700}px)`;
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    // Tự động chuyển ảnh
    function moveSlider() {
        index = (index + 1) % totalImages;
        updateSlider();
    }

    // Gán sự kiện nút trái/phải
    document.querySelector('.prev').addEventListener('click', () => {
        index = (index - 1 + totalImages) % totalImages;
        updateSlider();
    });
    document.querySelector('.next').addEventListener('click', moveSlider);

    // Hover để dừng slider
    const sliderElement = document.getElementById('slide');
    sliderElement.addEventListener('mouseenter', () => clearInterval(interval));
    sliderElement.addEventListener('mouseleave', () => {
        interval = setInterval(moveSlider, 3000);
    });

    // Khởi động slider
    createDots();
    updateSlider();
    interval = setInterval(moveSlider, 3000);
});
function timKiem() {
    const keyword = document.querySelector('input[type="text"]').value.trim();
    if (keyword) {
        alert("Bạn đã tìm: " + keyword);
    } else {
        alert("Vui lòng nhập từ khóa.");
    }
}