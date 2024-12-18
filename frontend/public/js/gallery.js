document.addEventListener('DOMContentLoaded', () => {
    const galleryGrid = document.querySelector('.gallery-grid');
    fetch('/data/gallery.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(category => {
                const categoryDiv = document.createElement('div');
                categoryDiv.classList.add('category');
                const categoryTitle = document.createElement('h2');
                categoryTitle.textContent = category.category;
                categoryDiv.appendChild(categoryTitle);
                const imageGrid = document.createElement('div');
                imageGrid.classList.add('image-grid');
                category.images.forEach((image, index) => {
                    const img = document.createElement('img');
                    img.src = image.src;
                    img.alt = image.alt;
                    if (index === category.images.length - 1) {
                        const imageContainer = document.createElement('div');
                        imageContainer.classList.add('image-container');

                        const overlay = document.createElement('a');
                        overlay.href = category.link;
                        overlay.textContent = 'View more';
                        overlay.classList.add('view-more-overlay');

                        imageContainer.appendChild(img);
                        imageContainer.appendChild(overlay);
                        imageGrid.appendChild(imageContainer);
                    } else {
                        imageGrid.appendChild(img);
                    }
                });

                categoryDiv.appendChild(imageGrid);
                galleryGrid.appendChild(categoryDiv);
            });
        })
        .catch(error => {
            console.error('Error loading gallery data:', error);
        });
});
