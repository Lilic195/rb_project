var express = require('express'),
    db = require('./db'),
    bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req, res, next){

  res.header('Access-Control-Allow-Origin','*');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next()
})

// app.get('/', function (req, res) {
//   let request = db.cursor()
//   sql = 'SELECT Ime, Prezime, Broj_indeksa, Naziv as "Smer" FROM Student st JOIN Smer sm ON st.Smer_ID = sm.ID '
//   request.query(sql, function (err, recordset) {
//     if (err) console.log(err)
//     // send records as a response
//     res.send(recordset)
//   })
// })

require('./predmet')(app)
require('./student')(app)

let callback = () => {
  port = 3030
  var server = app.listen(port, function (err) {
    if (err) {
      return console.log('something bad happened', err)
    }
    console.log(`server is listening on ${port}`)
  })
}

db.connect(callback)
