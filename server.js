const express = require('express')
const cors = require('cors')
const mysql = require('mysql2')

const connection = mysql.createConnection({
  host: '157.245.59.56',
  user: 'u6402199',
  password: '6402199',
  database: 'u6402199',
  port: 3366
})

var app = express()
app.use(cors())
app.use(express.json())


app.get('/', function(req, res) {
    res.json({
      "status": "ok",
      "message": "Hello World"
    })
  })
  
app.get('/customers', function(req, res) {
    connection.query(
      'SELECT * FROM a1_customer',
      function(err, results) {
        console.log(results) //แสดงผลที่ console
        res.json(results) //ตอบกลับ request
      }
    )
  })

app.get('/electrics', function(req, res) {
    connection.query(
      'SELECT * FROM a1_electronicshop',
      function(err, results) {
        console.log(results) //แสดงผลที่ console
        res.json(results) //ตอบกลับ request
      }
    )
  })

app.get('/orders', function(req, res) {
    connection.query(
      'SELECT * FROM a1_order',
      function(err, results) {
        console.log(results) //แสดงผลที่ console
        res.json(results) //ตอบกลับ request
      }
    )
  })

app.get('/top_products', function(req, res) {
    connection.query(
      'SELECT a1_electronicshop.* , sum(quantity) as quantity_sum FROM a1_electronicshop,a1_order WHERE a1_order.pid = a1_electronicshop.pid GROUP BY a1_order.pid ORDER BY quantity_sum desc;',
      function(err, results) {
        console.log(results) //แสดงผลที่ console
        res.json(results) //ตอบกลับ request
      }
    )
})


app.get('/top_customers', function(req, res) {
  connection.query(
    'SELECT a1_customer.*, sum(quantity*price) as price_sum FROM a1_customer,a1_order,a1_electronicshop WHERE a1_order.cid = a1_customer.cid AND a1_order.pid = a1_electronicshop.pid GROUP BY a1_order.cid ORDER BY price_sum DESC;',
    function(err, results) {
      console.log(results) //แสดงผลที่ console
      res.json(results) //ตอบกลับ request
    }
  )
})


app.post('/orders', function(req, res) {
  const values = req.body
  console.log(values)
  connection.query(
    'INSERT INTO a1_order (oid, pid, cid, quantity) VALUES ?', [values],
    function(err, results) {
      console.log(results) //แสดงผลที่ console
      res.json(results) //ตอบกลับ request
    }
  )
})

  
// app.get('/pets', function(req, res) {
//     connection.query(
//       'SELECT pet.id,pet.petName,user.fullname as owner FROM pet LEFT JOIN user ON pet.userId = user.id;',
//       function(err, results) {
//         console.log(results) //แสดงผลที่ console
//         res.json(results) //ตอบกลับ request
//       }
//     )
//   })
  
// app.post('/users', function(req, res) {
//     const email = req.body.email
//     const fullname = req.body.fullname
//     const city = req.body.city
//     connection.query(
//       `INSERT INTO user (email, fullname, city) VALUES (?, ?, ?)`,
//       [email, fullname, city],
//       function(err, results) {
//         if (err) { res.json(err) }
//         res.json(results)
//       }
//     )
//   })





app.listen(5000, () => {
  console.log('Server is started.')
})

app.get('/', function(req, res) {
  res.json({
    "status": "ok",
    "message": "Hello World"
  })
})

// app.get('/pets_price', function(req, res){
//   connection.query(
//     `SELECT id, petName, price
//      FROM pet
//      ORDER BY price;`,
//      function(err, results) {
//       res.json(results)
//      }
//   )
// })

// app.get('/pets_price_chart', function(req, res){
//   connection.query(
//     `SELECT id, petName, price
//      FROM pet
//      ORDER BY price;`,
//      function(err, results) {
//       const petNames = []
//       const prices = []
//       for (let i = 0; i < results.length; i++) {
//         petNames.push(results[i]['petName'])
//         prices.push(parseFloat(results[i]['price']))
//       }
//       res.json({petNames, prices})
//      }
//   )
// })