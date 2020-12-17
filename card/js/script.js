class Card {
    #_src;
    #_alt;
    #_titleProduct;
    #_descr;
    #_price;
    #_category = {};
    #_parent;

    constructor(src, alt, titleProduct, descr, price, category, parent) {
        this.src = src;
        this.alt = alt;
        this.titleProduct = titleProduct;
        this.descr = descr;
        this.price = price;
        this.category = category;
        this.parent = document.querySelector(parent);
    }

    get src() {
        return this.#_src;
    }

    set src(srcVal) {
        this.#_src = srcVal;
    }

    get alt() {
        return this.#_alt;
    }

    set alt(altVal) {
        this.#_alt = altVal;
    }

    get titleProduct() {
        return this.#_titleProduct;
    }

    set titleProduct(titleVal) {
        this.#_titleProduct = titleVal;
    }

    get descr() {
        return this.#_descr;
    }

    set descr(descrVal) {
        this.#_descr = descrVal;
    }

    get price() {
        return this.#_price;
    }

    set price(priceVal) {
        this.#_price = priceVal;
    }

    get category() {
        return this.#_category;
    }

    set category(categoryVal) {
        this.#_category = categoryVal;
    }

    get parent() {
        return this.#_parent;
    }

    set parent(parentVal) {
        this.#_parent = parentVal;
    }

    createCard() {
        let elem = document.createElement('div');
        elem.classList.add('card__item');
        elem.setAttribute('data-category', `${this.category['name']}`);
        elem.setAttribute('data-price', `${this.price}`);
        elem.innerHTML = `
        <img class='card__item-image' src='${this.src}' alt='${this.alt}'>
        <h2 class='card__item-title'>${this.titleProduct}</h2>
        <p class='card__item-descr'>${this.descr}</p>
        <div class='card__item__price'>
            <span class='card__item__price-title'>Цена:</span>
            <b class='card__item__price-value'>${this.price} руб.</b> 
        </div>
        `;

        this.parent.append(elem);
    }
}


let cards = [
    {
        src: 'img/headphones-1.jpg',
        alt: 'Наушники',
        title: 'Наушники',
        descr: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, voluptatem?',
        price: 1300,
        category: {
            id: 'headphones',
            name: 'Наушники'
        }
    },
    {
        src: 'img/headphones-2.jpg',
        alt: 'Наушники',
        title: 'Наушники',
        descr: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, voluptatem?',
        price: 2000,
        category: {
            id: 'headphones',
            name: 'Наушники'
        }
    },
    {
        src: 'img/soundspeaker-1.jpg',
        alt: 'Колонки',
        title: 'Колонки',
        descr: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, voluptatem?',
        price: 3000,
        category: {
            id: 'soundspeakers',
            name: 'Колонки'
        }
    },
    {
        src: 'img/telephone-1.jpg',
        alt: 'Смартфон',
        title: 'Смартфон',
        descr: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, voluptatem?',
        price: 20000,
        category: {
            id: 'telephone',
            name: 'Телефоны'
        }
    },
    {
        src: 'img/soundspeaker-2.jpg',
        alt: 'Колонки',
        title: 'Колонки',
        descr: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, voluptatem?',
        price: 5000,
        category: {
            id: 'soundspeakers',
            name: 'Колонки'
        }
    },
    {
        src: 'img/headphones-3.jpg',
        alt: 'Наушники',
        title: 'Наушники',
        descr: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aperiam, voluptatem?',
        price: 900,
        category: {
            id: 'headphones',
            name: 'Наушники'
        }
    }
]

let card;

for (let i = 0; i < cards.length; i++) {
    card = new Card(cards[i]['src'],
        cards[i]['alt'],
        cards[i]['title'],
        cards[i]['descr'],
        cards[i]['price'],
        cards[i]['category'],
        '.cards .container').createCard();
}

let listCategories = document.querySelector('.filters__category-list');
let listCards = document.querySelectorAll('.card__item');
let minPrice = document.querySelector('#minPrice');
let maxPrice = document.querySelector('#maxPrice');
let buttonShow = document.querySelector('.filters-button');

minPrice.addEventListener('change', function () {
    if (+minPrice.value <= +minPrice.dataset.min) {
        minPrice.classList.add('filters-error');
    }
    else {
        minPrice.classList.remove('filters-error');
    }
});

maxPrice.addEventListener('change', function () {
    if (+maxPrice.value >= +maxPrice.dataset.max) {
        maxPrice.classList.add('filters-error');
    }
    else {
        maxPrice.classList.remove('filters-error');
    }
});

buttonShow.addEventListener('click', () => { filterCards(); });

function showAllCards() {
    for (let listcard of listCards) {
        listcard.classList.remove('card__item_hidden');
    }
}

function filterCards() {

    showAllCards();

    for (let listcard of listCards) {
        if (listcard.dataset.category != listCategories.value && listCategories.value !== 'Все' && minPrice.value == "" && maxPrice.value == "") {
            listcard.classList.add('card__item_hidden');
        }
        else if (listcard.dataset.category != listCategories.value && listCategories.value !== 'Все' && minPrice.value != "" && maxPrice.value != "" && !minPrice.classList.contains('filters-error') && !maxPrice.classList.contains('filters-error')) {
            if (+listcard.dataset.price >= +minPrice.value && +listcard.dataset.price <= +maxPrice.value) {
                listcard.classList.add('card__item_hidden');
            }
        }
    }
}

// listCategories.addEventListener('input', function () {
//     for (let listcard of listCards) {
//         if (listcard.dataset.category !== listCategories.value && listCategories.value !== 'Все') {
//             listcard.classList.add('card__item_hidden');
//         }
//         else {
//             listcard.classList.remove('card__item_hidden');
//         }
//     }
// });