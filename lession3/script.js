function makeGETRequest(url, callback) {
    var xhr;

    if (window.XMLHttpRequest) {
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
            callback(xhr.responseText);
        }
    }

    xhr.open('GET', url, true);
    xhr.send();
}

// let getRequest = (url) => {
//     return new Promise((resolve, reject) => {
//         let xhr = new XMLHttpRequest();
//         xhr.open('GET', url, true);
//         xhr.onreadystatechange = () => {
//             if (xhr.readyState === 4) {
//                 if (xhr.status !== 200) {
//                     reject('Error');
//                 } else {
//                     resolve(xhr.responseText);
//                 }
//             }
//         };
//         xhr.send();
//     });
// };

class GoodsItem {
    constructor(id, title, price) {
        this.id = id;
        this.title = title;
        this.price = price;
    }

    render() {
        return `<div class="goods-item" data-id="${this.id}"><h3>${this.title}</h3><p>${this.price}</p><button class="addToCartBtn">Добавить</button></div>`;
    }
}

const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class GoodsList {
    constructor() {
        this.goods = [];
    }
    fetchGoods(cb) {
        makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
            this.goods = JSON.parse(goods);
            console.log('Fetch:', this.goods);
            cb();
        })
    }

    render() {
        let listHtml = '';
        console.log("render = ", this.goods);
        this.goods.forEach(good => {
            const goodItem = new GoodsItem(good.id_product, good.product_name, good.price);
            listHtml += goodItem.render();
        });
        document.querySelector('.goods-list').innerHTML = listHtml;
        document.querySelectorAll('.addToCartBtn').forEach(button => {
            button.addEventListener('click', addToCart);
        });

    }

    totalSum() {
        let totalSum = 0;
        this.goods.forEach(good => {
            totalSum += good.price;
        });
        console.log(totalSum);
    }
}

const list = new GoodsList();
list.fetchGoods(() => list.render())



class cartList {
    constructor() {
        this.cartGoods = {};
    }
    addItem(id, name, price, amount) {
        if (this.cartGoods.id[amount] == undefined) {
            let item = [name, price, amount];
            this.cartGoods[id] = item;
            const newItem = new cartItem(id, name, price, amount = 1);

        } else {
            this.cartGoods.id[amount] += 1;
        }
        document.querySelector('.cart-menu').insertAdjacentHTML('afterbegin', newItem.render());
        document.querySelectorAll('.delete-cart-btn').forEach(button => {
            button.addEventListener('click', removeItem);
        });
        this.cartTotalPrice();
    }
    removeItem(id) {
        delete this.cartGoods[id];
        this.cartTotalPrice();
    }
    cartTotalPrice() {
        let totalPrice = 0;
        for (let key in this.cartGoods) {
            totalPrice += +this.cartGoods[key][1];
        }
        document.querySelector('.total-cart-price').innerText = totalPrice;
    }
    getItemsList() {
        console.log(this.cartGoods);
    }


}

class cartItem {
    constructor(id, title, price) {
        this.id = id;
        this.title = title;
        this.price = price;
    }
    render() {
        return `<div class="cart-item" data-id="${this.id}"><h3>${this.title}</h3><p>${this.price}</p><button class="delete-cart-btn">Удалить</button></div>`;
    }
}

const cartListMenu = new cartList();

document.querySelector('.cart-button').addEventListener('click', showCart);

function showCart() {
    document.querySelector('.cart-menu').classList.toggle('close-cart');
}

function addToCart(event) {
    let itemChilds = event.target.parentNode;
    let name = itemChilds.querySelector('h3').innerText;
    let price = itemChilds.querySelector('p').innerText;
    let id = itemChilds.dataset.id;
    let amount = 1;

    cartListMenu.addItem(id, name, price, amount);
}

function removeItem(event) {
    let itemChilds = event.target.parentNode;
    let id = itemChilds.dataset.id;
    itemChilds.remove();

    cartListMenu.removeItem(id);
}


