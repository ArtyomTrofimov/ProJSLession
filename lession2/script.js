document.querySelector('.cart-button').addEventListener('click', showCart);

function showCart() {
    document.querySelector('.cart-menu').classList.toggle('close-cart');
}

class GoodsItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="goods-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods() {
        this.goods = [
            { title: 'Shirt', price: 150 },
            { title: 'Socks', price: 50 },
            { title: 'Jacket', price: 350 },
            { title: 'Shoes', price: 250 },
        ];
    }
    render() {
        let listHtml = '';
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.title, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
    }
    totalSum() {
        let totalSum = 0;
        this.goods.forEach(good => {
            totalSum += good.price;
        });
        console.log(totalSum);
    }
}

class cartList {
    constructor() {
        this.goods = [];
    }
}

class cartItem {
    constructor(title, price) {
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="cart-item"><h3>${this.title}</h3><p>${this.price}</p></div>`;
    }
}

const list = new GoodsList();
list.fetchGoods();
list.render();
list.totalSum();