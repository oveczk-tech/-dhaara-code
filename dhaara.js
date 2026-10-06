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
.dhaara-size-buttons,
.dhaara-thickness-buttons,
.dhaara-length-buttons {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 8px;
}

.dhaara-size-buttons button,
.dhaara-thickness-buttons button,
.dhaara-length-buttons button {
    min-width: 52px;
    height: 42px;
    padding: 0 14px;
    background: #fff !important;
    color: #222 !important;
    border: 1px solid #222 !important;
    border-radius: 0;
    cursor: pointer;
}

.dhaara-size-buttons button.active,
.dhaara-thickness-buttons button.active,
.dhaara-length-buttons button.active {
    background: #222 !important;
    color: #fff !important;
}

#parameter-id-5,
#parameter-id-18 {
    position: absolute !important;
    left: -9999px !important;
}

.dhaara-size-buttons > button,
.dhaara-thickness-buttons > button {
    width: 40px !important;
    min-width: 40px !important;
    max-width: 40px !important;
    height: 40px !important;
    min-height: 40px !important;
    max-height: 40px !important;
    padding: 0 !important;
    border-radius: 50% !important;
}

.dhaara-size-buttons > button.is-unavailable,
.dhaara-thickness-buttons > button.is-unavailable {
    position: relative !important;
    color: #999 !important;
    border-color: #bbb !important;
    cursor: not-allowed !important;
}

.dhaara-size-buttons > button.is-unavailable:after,
.dhaara-thickness-buttons > button.is-unavailable:after {
    content: "";
    position: absolute;
    width: 1px;
    height: 55px;
    background: #bbb;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotate(-45deg);
    pointer-events: none;
}    
        
    `;
    document.head.appendChild(style);
})();
