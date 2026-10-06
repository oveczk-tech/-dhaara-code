(function () {
    var style = document.createElement('style');
    style.textContent = `
        @media (min-width: 768px) {
            .h4.homepage-group-title,
            .products-related-header {
                font-size: 1.5em !important;
                text-align: center;
            }

            .p-detail-inner h1 {
                font-size: 1.5em !important;
            }
        }

        @media (min-width: 992px) {
            .thumbnail-slider .splide__list {
                display: flex !important;
                gap: 10px !important;
            }

            .thumbnail-slider li {
                height: 150px !important;
                flex: 1 !important;
                width: auto !important;
            }

            .thumbnail-slider li img {
                width: 100% !important;
                height: 100% !important;
                object-fit: cover !important;
            }
        }
    `;
    document.head.appendChild(style);
})();
