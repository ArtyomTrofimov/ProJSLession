const express = require('express');
const fs = require('fs');

const app = express();

const moment = require('moment');
moment.locale('ru');
/**
 * Активируем мидлвары
 */
app.use(express.json()); // Даем знать приложению, что работаем с json'ом
app.use('/', express.static('../public')); // запросы в корень нашего сайт отдают содержимое public
/**
 * API Каталога
 */
app.get('/api/products', (req, res) => {
  fs.readFile('./db/products.json', 'utf-8', (err, data) => {
    if (err) {
      res.send(JSON.stringify({ result: 0, text: err }));
    } else {
      res.send(data);
    }
  });
});

/**
 * API Корзины
 */
app.get('/api/cart', (req, res) => {
  fs.readFile('./db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      res.send(data);
    }
  });
});

// Добавление нового товара в корзине
app.post('/api/cart', (req, res) => {
  fs.readFile('./db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      // парсим текущую корзину
      const cart = JSON.parse(data);
      // добавляем новый товар
      cart.contents.push(req.body);
      //Изменяем общее количество товара в корзине
      cart.amount += req.body.quantity;
      //Изменяем ценность корзины
      cart.countGoods += req.body.price;
      // пишем обратно
      fs.writeFile('./db/userCart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      })

    }
  });
  fs.readFile('./db/stats.json', 'utf-8', (err, data) => {
    const stats = JSON.parse(data);
    var now = moment();
    const currentTime = now.format('HH:mm:ss DD MMMM YYYY');
    stats.push(`Добавил товар ${req.body.product_name} в корзину. Время: ${currentTime}`);
    //Запись о действии с товаром
    fs.writeFile('./db/stats.json', JSON.stringify(stats), (err) => {
      if (err) throw error; // если возникла ошибка
      console.log("Асинхронная запись файла завершена. Содержимое файла:");
    })
  });
});

// Изменяем количество товара
app.put('/api/cart/:id', (req, res) => {
  fs.readFile('./db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      // парсим текущую корзину
      const cart = JSON.parse(data);
      // ищем товар по id
      const find = cart.contents.find(el => el.id_product === +req.params.id);
      // изменяем количество
      find.quantity += req.body.quantity; // 1 || -1 => 5 + -1 = 4;
      //Изменяем общее количество товара в корзине
      cart.amount += req.body.quantity;
      //Изменяем ценность корзины
      cart.countGoods += req.body.price * req.body.quantity;
      // пишем обратно
      fs.writeFile('./db/userCart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      })
    }
  });
  fs.readFile('./db/stats.json', 'utf-8', (err, data) => {
    const stats = JSON.parse(data);
    var now = moment();
    const currentTime = now.format('HH:mm:ss DD MMMM YYYY');
    if (req.body.quantity > 0) {
      stats.push(`Увеличил количество товара ${req.body.product_name} в корзине на 1 единицу. Время: ${currentTime}`);
    } else {
      stats.push(`Уменьшил количество товара ${req.body.product_name} в корзине на 1 единицу. Время: ${currentTime}`);
    }

    //Запись о действии с товаром
    fs.writeFile('./db/stats.json', JSON.stringify(stats), (err) => {
      if (err) throw error; // если возникла ошибка
      console.log("Асинхронная запись файла завершена. Содержимое файла:");
    })
  });

});

app.delete('/api/cart/:id', (req, res) => {
  fs.readFile('./db/userCart.json', 'utf-8', (err, data) => {
    if (err) {
      res.sendStatus(404, JSON.stringify({ result: 0, text: err }));
    } else {
      const cart = JSON.parse(data);
      //Находим индекс элемента в API
      let index = cart.contents.findIndex((el) => {
        if (el.id_product == req.body.id_product) {
          return el;
        }
      });
      //Удаляем элемент товара из API
      cart.contents.splice(index, 1);
      //Изменяем общее количество товара в корзине
      cart.amount -= req.body.quantity;
      //Изменяем ценность корзины
      cart.countGoods -= req.body.price;
      fs.writeFile('./db/userCart.json', JSON.stringify(cart), (err) => {
        if (err) {
          res.send('{"result": 0}');
        } else {
          res.send('{"result": 1}');
        }
      })
    }
  });
  fs.readFile('./db/stats.json', 'utf-8', (err, data) => {
    const stats = JSON.parse(data);
    var now = moment();
    const currentTime = now.format('HH:mm:ss DD MMMM YYYY');
    stats.push(`Удалил товар ${req.body.product_name} из корзины. Время: ${currentTime}`);
    //Запись о действии с товаром
    fs.writeFile('./db/stats.json', JSON.stringify(stats), (err) => {
      if (err) throw error; // если возникла ошибка
      console.log("Асинхронная запись файла завершена. Содержимое файла:");
    })
  });
});


/**
 * Запуск сервера
 * @type {string|number}
 */
// const port = process.env.PORT || 555;
const port = 5555; // чтобы не смущало process.env.PORT (если не стартует на 3000, то меняем на другой 8080 или 8888)
app.listen(port, () => {
  console.log(`Listening ${port} port`);
});

// CRUD
// app.get(); // READ
// app.post(); // CREATE
// app.put(); // UPDATE
// app.delete(); // DELETE
