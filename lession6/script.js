const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const hostBus = new Vue();

Vue.component('goods-item', {
    props: ['good'],
    template: `
    <div>
        <h3>{{ good.product_name }}</h3>
        <p>{{ good.price }}</p>
        <button class='add-to-cart-btn' type='button' @click='addToCart'>В корзину</button>
    </div>
    `,
    methods: {
        addToCart() {
            this.$emit('add-to-cart');
            // hostBus.$emit('add-to-cart', this.good);
        }
    }
});

Vue.component('goods-list', {
    props: ['filteredGoods'],
    template: `
    <div class="goods-list">
        <div class="goods-item" v-for="good in filteredGoods">
            <goods-item :good='good' @add-to-cart='addToCart(good)'></goods-item>
        </div>
    </div>
    `,
    methods: {
        addToCart(good) {
            this.$emit('add-to-cart', good);
        }
    }

});

Vue.component('goods-search', {
    props: ['value'],
    template: `
    <input type="text" :value='value'  v-on:input="$emit('input', $event.target.value)" class="goods-search"/>
    `
});

Vue.component('cart-list', {
    props: ['cartProducts', 'isVisibleCart', 'cartSum'],
    template: `
    <div class="cart-list" v-show='isVisibleCart'>
            <h2 v-if='cartProducts.length === 0'>Корзина пуста</h2>
            <div v-else>
                <h2>Общая сумма товаров {{cartSum}} руб.</h2>
                <div class="good-item" v-for='(good,idx) in cartProducts'>
                    <cart-item :good='good' :idx='idx' @delete-from-cart='deleteFromCart(idx)'></cart-item>
                </div>
            </div>
        </div>
    `,
    methods: {
        deleteFromCart(idx) {
            this.$emit('delete-from-cart', idx);
        }
    }
});

Vue.component('cart-item', {
    props: ['good', 'idx'],
    template: `
    <div>
        <h3>{{good.product_name}}</h3>
        <p>Цена: {{good.price}}</p>
        <p>Количество: {{good.amount}}</p>
        <p>Общая сумма товара: {{good.amount * good.price}}</p>
        <button @click='deleteFromCart(idx)'>Удалить из корзины</button>
    </div>
    `,
    methods: {
        deleteFromCart() {
            this.$emit('delete-from-cart');
        }
    }
});

Vue.component('errorMsg', {
    template: `
    <div>Ошибка загрузки данных каталога с сервера</div>
    `
});


const app = new Vue({
    el: '#app',
    template: `<div>
        <header>
            <goods-search v-model='searchLine'></goods-search>
            <button class="cart-button" type="button" @click='isVisibleCart = !isVisibleCart'>Корзина</button>
        </header>
        <main>
            <cart-list :cartProducts='cartProducts' :isVisibleCart='isVisibleCart' :cartSum='cartSum' @delete-from-cart='deleteFromCart'></cart-list>
            <hr>
            <goods-list :filteredGoods="filteredGoods" @add-to-cart="addToCart"></goods-list>
        </main></div>`,
    data: {
        goods: [],
        // filteredGoods: [],
        cartProducts: [],
        searchLine: '',
        isVisibleCart: false,
    },
    mounted() {
        this.makeGETRequest(`${API_URL}/catalogData.json`, (goods) => {
            this.goods = JSON.parse(goods);
            // this.filteredGoods = JSON.parse(goods);
        });
    },
    methods: {
        makeGETRequest(url, callback) {


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
        },
        addToCart(good) {
            if (!this.cartProducts.some((gd) => {
                if (gd.id_product === good.id_product) {
                    gd.amount++;
                    return true;
                }
            })) {
                this.cartProducts.push({ ...good, amount: 1 });
            }
        },
        deleteFromCart(idx) {
            this.cartProducts.splice(idx, 1);
        },
    },
    computed: {
        filteredGoods() {
            const searchRegExp = new RegExp(this.searchLine, 'i');
            return this.goods.filter((good) => good.product_name.match(searchRegExp));
        },
        cartSum() {
            return this.cartProducts.reduce((sum, good) => sum + good.amount * good.price, 0);
        }
    }
});