const express = require('express')
const bodyParser = require('body-parser');
const sql = require("./db.js");
const fs = require('fs')
const app = express()
const port = 3000
app.use(bodyParser.urlencoded({ extended: false }))


let replace = '<ul id="show-peoples"> Ainda não tem ninguem cadastrado!</ul>'

app.get('/', (req, res) => {
    fs.readFile('./index.html', function (err, html) {
        if (err) {
            throw err;
        }

        sql.query(`SELECT name FROM people`, function (err, result, fields) {
            if (err) throw err;
            if (result.length == 0) {
                res.send(html.toString())
            } else {
                var peoples = '<ul>'
                for (let i = 0; i < result.length; i++) {
                    peoples += `<li style='text-transform: capitalize;'>${result[i].name}</li>`
                }
                peoples += '</ul>'
                let response = html.toString().replace(replace, peoples)

                res.send(response)
            }
        })

    });
})

app.post('/', (req, res) => {
    if (req.body.people) {
        console.log(req.body.people)
        sql.query(`INSERT INTO people VALUES('${req.body.people}')`, function (err, result, fields) {
            if (err) throw err;
            res.redirect('/')
        });
    }
    else {
        res.redirect('/')
    }
})

app.listen(port, () => {
    console.log('Rodando na porta ' + port)
})