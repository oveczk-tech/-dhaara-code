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


    function initDhaaraButtons() {

        if (document.querySelector('.dhaara-size-buttons')) return;

        [
            ['#parameter-id-5', '.dhaara-size-buttons', ['S','M','L','XL']],
            ['select[data-parameter-name="Tloušťka v mm"]', '.dhaara-thickness-buttons'],
            ['select[data-parameter-name="Délka"]', '.dhaara-length-buttons']
        ].forEach(function (x) {

            var s = document.querySelector(x[0]);

            if (!s) return;

            if (s.parentNode.querySelector(x[1])) return;

            var w = document.createElement('div');
            w.className = x[1].slice(1);

            Array.from(s.options)
                .filter(function (o) {
                    return o.value;
                })
                .sort(function (a, b) {
                    return x[2]
                        ? x[2].indexOf(a.text.trim()) - x[2].indexOf(b.text.trim())
                        : a.index - b.index;
                })
                .forEach(function (o) {

                    var b = document.createElement('button');

                    b.type = 'button';
                    b.dataset.value = o.value;
                    b.textContent = o.textContent.trim().replace(/\s*mm$/i, '');

                    if (o.selected) {
                        b.classList.add('active');
                    }

                    b.onclick = function () {

                        if (b.classList.contains('is-unavailable')) return;

                        s.value = o.value;
                        s.dispatchEvent(new Event('change', { bubbles: true }));

                        w.querySelectorAll('button').forEach(function (button) {
                            button.classList.remove('active');
                        });

                        b.classList.add('active');
                    };

                    w.appendChild(b);
                });

            s.parentNode.insertBefore(w, s.nextSibling);

            s.style.position = 'absolute';
            s.style.left = '-9999px';

            function updateAvailability() {

                var data =
                    window.shoptet &&
                    window.shoptet.variantsSplit &&
                    window.shoptet.variantsSplit.necessaryVariantData;

                if (typeof data === 'string') {
                    try {
                        data = JSON.parse(data);
                    } catch (e) {
                        return;
                    }
                }

                if (!data) return;

                Array.from(s.options)
                    .filter(function (o) {
                        return o.value;
                    })
                    .forEach(function (o) {

                        var v = data[
                            (s.getAttribute('data-parameter-id') || '5') +
                            '-' +
                            o.value
                        ];

                        var b = Array.from(w.querySelectorAll('button'))
                            .find(function (button) {
                                return button.dataset.value === o.value;
                            });

                        if (b && v) {
                            b.classList.toggle(
                                'is-unavailable',
                                v.isNotSoldOut === false
                            );
                        }
                    });
            }

            updateAvailability();

            s.addEventListener('change', function () {
                setTimeout(updateAvailability, 100);
            });
        });
    }


    function waitForShoptet() {

        if (
            document.querySelector('#parameter-id-5') ||
            document.querySelector('select[data-parameter-name="Tloušťka v mm"]') ||
            document.querySelector('select[data-parameter-name="Délka"]')
        ) {
            initDhaaraButtons();
            return;
        }

        setTimeout(waitForShoptet, 200);
    }

    waitForShoptet();

})();
/* DHAARA – doplnění kategorie Legíny do drobečkové navigace */
(function () {
  function fixLeggingsBreadcrumb() {
    const breadcrumbs = document.querySelector('.breadcrumbs');
    if (!breadcrumbs) return;

    // Pouze produkty, jejichž URL začíná /leginy-
    const path = window.location.pathname;
    if (!/^\/leginy-/.test(path)) return;

    // Pokud už kategorie Legíny existuje, nic nedělat
    if (breadcrumbs.querySelector('#dhaara-breadcrumb-leginy')) return;
    if (breadcrumbs.querySelector('a[href="/leginy/"]')) return;

    const clothing = breadcrumbs.querySelector('#navigation-1');
    const product = breadcrumbs.querySelector('[data-testid="breadcrumbsLastLevel"]');

    if (!clothing || !product) return;

    const category = document.createElement('span');
    category.id = 'dhaara-breadcrumb-leginy';
    category.setAttribute('itemprop', 'itemListElement');
    category.setAttribute('itemscope', '');
    category.setAttribute('itemtype', 'https://schema.org/ListItem');

    category.innerHTML = `
      <a href="/leginy/" itemprop="item">
        <span itemprop="name">Legíny</span>
      </a>
      <span class="navigation-bullet">/</span>
      <meta itemprop="position" content="3">
    `;

    product.id = 'navigation-3';

    const position = product.querySelector('meta[itemprop="position"]');
    if (position) position.setAttribute('content', '4');

    clothing.after(category);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fixLeggingsBreadcrumb);
  } else {
    fixLeggingsBreadcrumb();
  }
})();
