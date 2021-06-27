const goods = [
    { title: 'Shirt', price: 150, imageNumber: 1 },
    { title: 'Socks', price: 50, imageNumber: 2 },
    { title: 'Jacket', price: 350, imageNumber: 3 },
    { title: 'Shoes', price: 250, imageNumber: 4 },
];

const renderGoodsItem = (title = 'title', price = 'price', imageNumber = 'noImg.png') => {
    return `<div class="goods-item">
    <img class='goods-item-img' src="img/productImage${imageNumber}.png" alt="image">
    <h3 class='goods-item-name'>${title}</h3>
    <p class='goods-item-price'>${price}</p>
    <button class="addToCartBtn">Добавить</button>
    </div>`;
};

const renderGoodsList = (list) => {
    let goodsList = '';
    list.forEach(item => {
        goodsList += renderGoodsItem(item.title, item.price, item.imageNumber);
    });
    document.querySelector('.goods-list').innerHTML = goodsList;
}

renderGoodsList(goods);

document.querySelector('.cart-button').addEventListener('click', showCart);

function showCart() {
    document.querySelector('.cart-menu').classList.toggle('close-cart');
}

const itemsButtons = document.querySelectorAll('.addToCartBtn');
itemsButtons.forEach(item => {
    item.addEventListener('click', addToCart);
});

function addToCart(event) {
    let cart = document.querySelector('.cart-menu'),
        item = event.target.parentNode,
        itemName = item.querySelector('h3').innerText,
        itemPrice = item.querySelector('p').innerText,
        cartItem = `<div class="cart-item"><h3>${itemName}</h3><p>${itemPrice}</p><button class="delete-cart-item"> Удалить</button></div>`

    cart.insertAdjacentHTML('beforeend', cartItem);
    document.querySelectorAll('.delete-cart-item').forEach(button => {
        button.addEventListener('click', removeCartItem)
    });;

}

function removeCartItem(event) {
    let cartItem = event.target.parentNode;
    cartItem.remove();
}