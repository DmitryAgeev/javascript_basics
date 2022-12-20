'use strict';

let fitlerPopup = document.querySelector('.filterPopup');
let fitlerLabel = document.querySelector('.filterLabel');
let filterIcon = document.querySelector('.filterIcon');

fitlerLabel.addEventListener('click', function () {
    fitlerPopup.classList.toggle('hidden');
    fitlerLabel.classList.toggle('filterLabelPink');
    filterIcon.classList.toggle('filterIconPink');

    if (filterIcon.getAttribute('src') === 'images/filter.svg') {
        filterIcon.setAttribute('src', 'images/filterHover.svg')
    } else {
        filterIcon.setAttribute('src', 'images/filter.svg')
    }
});

let filterHeaders = document.querySelectorAll('.filterCategoryHeader');
filterHeaders.forEach(function (header) {
    header.addEventListener('click', function (event) {
        event.target.nextElementSibling.classList.toggle('hidden');
    })
});

let filterSizes = document.querySelector('.filterSizes');
let filterSizeWrap = document.querySelector('.filterSizeWrap');
filterSizeWrap.addEventListener('click', function () {
    filterSizes.classList.toggle('hidden');
});

let cartIconWrap = document.querySelector('.cartIconWrap');
let basketEl = document.querySelector('.basket');
cartIconWrap.addEventListener('click', event => {
    basketEl.classList.toggle('hidden');
});

let basket = {};
let totalSum = 0;
let basketFooterEl = document.querySelector('.basketFooter');
let totalSumEl = basketFooterEl.querySelector('span');

document.querySelector('.featuredItems').addEventListener('click', event => {
    if (event.target.classList.contains('addToCart')) {
        let parent = event.target.parentElement.parentElement.parentElement;
        let parentId = parent.dataset.id;
        if (parentId in basket) {
            let productItem = basket[parentId];
            productItem.count++;
            let productItemCountEl = document.querySelector(`#product${productItem.id} .productItemCount`);
            productItemCountEl.textContent = productItem.count;
            let productItemSumEl = document.querySelector(`#product${productItem.id} .productItemSum`);
            productItemSumEl.textContent = productItem.count * productItem.price;
            totalSum += productItem.count * productItem.price;
        } else {
            let productItem = { id: parentId, name: parent.dataset.name, price: parent.dataset.price, count: 1 };
            totalSum += productItem.count * productItem.price;
            basket[parentId] = productItem;
            let newProduct = document.createElement('div');
            newProduct.classList.add('basketRaw');
            newProduct.id = `product${productItem.id}`;
            newProduct.innerHTML = `<div>${productItem.name}</div>
            <div class="productItemCount">${productItem.count}</div>
            <div>${productItem.price}</div>
            <div class="productItemSum">${productItem.count * productItem.price}</div>`
            basketFooterEl.before(newProduct);
            totalSum += productItem.count * productItem.price;
        }

        totalSumEl.textContent = `Товаров в корзине на сумму $${totalSum}`;
        let totalCountEl = document.querySelector('.cartIconWrap span');
        totalCountEl.textContent = ++totalCountEl.textContent;
    };
});


