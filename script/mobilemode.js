function toggleCategoryContainer() {
    var screenWidth = window.innerWidth;

    var categoryContainer = document.querySelector('.div-header');
    var mobileCategoryContainer = document.querySelector('.div-header.mobile');

    if (screenWidth > 768) {
        categoryContainer.style.display = 'none';
        mobileCategoryContainer.style.display = 'block';
    } else {
        categoryContainer.style.display = 'block';
        mobileCategoryContainer.style.display = 'none';
    }
}

window.onload = toggleCategoryContainer;

window.onresize = toggleCategoryContainer;
