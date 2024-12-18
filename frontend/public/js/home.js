
console.log("Script is running!");
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    const images = [
        "https://images.pexels.com/photos/41076/winter-ice-clouds-41076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/417173/pexels-photo-417173.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        "https://images.pexels.com/photos/585759/pexels-photo-585759.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    ];

    let currentImageIndex = 0;

    function changeBackgroundImage() {
        heroSection.style.backgroundImage = `url(${images[currentImageIndex]})`;
        currentImageIndex = (currentImageIndex + 1) % images.length;
    }

    changeBackgroundImage();
    setInterval(changeBackgroundImage, 2000);
});
