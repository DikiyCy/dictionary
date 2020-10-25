const fs = require('fs');
const express = require('express');
const dictionary = require('./dictionary.json');
const bodyParser = require('body-parser');
const port = 3001;


const app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());

app.post('/add', (req, res) => {
    console.log(req.body);
    // создали новое словосочетание
    // req.body.new - новое слово
    // req.body.trans - перевод слова
    if (req.body.new === '') {
        res.status(202);
        console.log('Пустая строка');
        res.end();
    } else if (!(req.body.new in dictionary)) {
        dictionary[req.body.new] = req.body.trans;
        fs.writeFile('dictionary.json', JSON.stringify(dictionary), () => {
        });
        res.status(201);
        console.log('Слово добавлено');
        res.end();
    } else {
        console.log('Такое слово уже есть');
        res.status(208);
        res.end();
    }
    console.log('---------------------------');
})

app.get('/show/:id', (req, res) => {
    res.send(JSON.stringify(dictionary[req.params.id]));
    res.status(200);
    console.log('Запросили из базы');
    console.log('---------------------------');
    res.end();
});


app.listen(port, (err) => {
    if (err) {
        return console.log('something bad happened', err);
    }
    console.log(`server is listening on ${port}`);
})
