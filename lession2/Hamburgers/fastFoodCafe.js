class Hamburger {
    constructor(size, stuffing) {
        this.size = size;
        this.stuffing = stuffing;
        this.toppings = {
            mayonnaise: false,
            seasoning: false
        };
    }
    addTopping(topping) {
        this.toppings[topping] = true;
    }  // Добавить добавку
    removeTopping(topping) {
        this.toppings[topping] = false;
    }// Убрать добавку
    getToppings() {
        console.log(this.toppings);
    } // Получить список добавок
    getSize() {
        console.log(this.size);
    }      // Узнать размер гамбургера
    getStuffing() {
        console.log(this.stuffing);
    }     // Узнать начинку гамбургера
    calculatePrice() {
        let price = 0;
        if (this.size == 'small') {
            price += 50;
        }
        if (this.size == 'big') {
            price += 100;
        }
        if (this.stuffing == 'cheese') {
            price += 10;
        }
        if (this.stuffing == 'salad') {
            price += 20;
        }
        if (this.stuffing == 'potato') {
            price += 15;
        }
        if (this.toppings.mayonnaise == true) {
            price += 20;
        }
        if (this.toppings.seasoning == true) {
            price += 15;
        }
        console.log(price);
    }   // Узнать цену
    calculateCalories() {
        let calories = 0;
        if (this.size == 'small') {
            calories += 20;
        }
        if (this.size == 'big') {
            calories += 40;
        }
        if (this.stuffing == 'cheese') {
            calories += 20;
        }
        if (this.stuffing == 'salad') {
            calories += 5;
        }
        if (this.stuffing == 'potato') {
            calories += 10;
        }
        if (this.toppings.mayonnaise == true) {
            calories += 5;
        }
        if (this.toppings.seasoning == true) {
            calories += 0;
        }
        console.log(calories);
    }// Узнать калорийность
}


const Hamburger1 = new Hamburger('small', 'cheese');
Hamburger1.addTopping('mayonnaise');
Hamburger1.addTopping('seasoning');
Hamburger1.removeTopping('mayonnaise');
Hamburger1.getToppings();
Hamburger1.getSize();
Hamburger1.getStuffing();
Hamburger1.calculateCalories();
Hamburger1.calculatePrice();
console.log(Hamburger1);