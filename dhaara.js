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
    `;
    document.head.appendChild(style);
})();
