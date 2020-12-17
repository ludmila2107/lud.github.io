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
            <b class='card__item__price-value'>${this.price} €.</b> 
        </div>
        `;

        this.parent.append(elem);
    }
}


let cards = [
    {
        src: 'img/krit.jpg',
        alt: 'Крит',
        title: 'Крит',
        descr: 'Таинственная родина минотавра, самый большой греческий остров',
        price: 1300,
        category: {
            id: 'excursion',
            name: 'Экскурсионные'
        }
    },
    {
        src: 'img/rodos.jpg',
        alt: 'Родос',
        title: 'Родос',
        descr: 'Остров рыцарей. Средневековые стены и Византийские  церкви.',
        price: 1000,
        category: {
            id: 'weekend',
            name: 'Туры выходного дня'
        }
    },
    {
        src: 'img/korfy.jpg',
        alt: 'Корфу',
        title: 'Корфу',
        descr: 'Один из самых дорогих греческих курортов. Множество бухт и заливов.',
        price: 3000,
        category: {
            id: 'beach',
            name: 'Пляжные'
        }
    },
    {
        src: 'img/halkidiki.jpg',
        alt: 'Халкидики',
        title: 'Халкидики',
        descr: 'Чрезвычайно популярный курорт в летние месяцы. ',
        price: 20000,
        category: {
            id: 'children',
            name: 'Отдых с детьми'
        }
    },
    {
        src: 'img/santorini.jpg',
        alt: 'Санторини',
        title: 'Санторини',
        descr: 'Черный песок на вулканических пляжах, белоснежные стены домов.Голубые церкви',
        price: 10000,
        category: {
            id: 'beach',
            name: 'Пляжные'
        }
    },
    {
        src: 'img/zakinf.jpg',
        alt: 'Закинф',
        title: 'Закинф',
        descr: 'Этот ионический остров славится своей пышной растительностью.',
        price: 60000,
        category: {
            id: 'wedding',
            name: 'Свадебные'
        }
    },
    {
        src: 'img/kos.jpg',
        alt: 'Кос',
        title: 'Кос',
        descr: 'Славится великолепной природой, уютными пляжами, чистым морем и условиями для виндсерфинга.',
        price: 10000,
        category: {
            id: 'weekend',
            name: 'Туры выходного дня'
        }
    },
    {
        src: 'img/miconos.jpg',
        alt: 'Миконос',
        title: 'Миконос',
        descr: 'Самый космополитичный курорт Греции, Миконос, часто посещают известные голливудские звезды.',
        price: 90000,
        category: {
            id: 'beach',
            name: 'Пляжные'
        }
    },
    {
        src: 'img/paros.jpg',
        alt: 'Парос',
        title: 'Парос',
        descr: 'Прекрасный курорт, славится часовнями, чистыми пляжами.',
        price: 90000,
        category: {
            id: 'beach',
            name: 'Пляжные'
        }
    },
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







