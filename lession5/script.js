const API_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        goods: [],
        // filteredGoods: [],
        cartProducts: [],
        searchLine: '',
        isVisibleCart: false
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
        // filterGoods() {
        //     const searchRegExp = new RegExp(this.searchLine, 'i');
        //     this.filteredGoods = this.goods.filter((good) => good.product_name.match(searchRegExp));
        // }
        addToCart(good) {
            if (!this.cartProducts.some(product => {
                if (product.id_product == good.id_product) {
                    product.amount++
                    return true;
                }
            })) {
                this.cartProducts.push({ ...good, amount: 1 });
            }



        },
        deleteFromCart(idx) {
            this.cartProducts.splice(idx, 1);
        }
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