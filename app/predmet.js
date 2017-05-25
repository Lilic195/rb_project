var db = require('./db')

let getPredmeti = (req, res) => {
  let cursor = db.cursor()
  let query = req.query
  let sql = `select * from Predmet`
  cursor.query(sql, (err, result) => {
    if (err) {
      console.trace(err)
      return res.status(404).send(err)
    }
    let recordSet = result.recordset
    console.log(recordSet)
    // res.send(recordSet
    //   .filter(record => record.Smer_ID === Number(query.smer))
    //   .map(record => ({ id: record.ID, name: record.Naziv }))
    // )
    res.send(recordSet)
  })
}

let getPredmet = (req, res) => {
  let cursor = db.cursor()
  let id = req.params.id
  let sql = `SELECT p.Naziv, Semestar, Ime, Prezime, s.Naziv as 'Smer'
             FROM Predmet p JOIN Profesor pr ON p.Profesor_ID = pr.ID
                  JOIN Smer s ON p.Smer_ID = s.ID
             WHERE p.ID =${id}`
  cursor.query(sql , (err, result) => {
    if (err) {
      console.trace(err)
      return res.status(404).send(err)
    }
    let recordSet = result.recordset[0]

    cursor.query(`SELECT * FROM Aktivnost WHERE Predmet_ID = ${id}`, (err, result) => {
     if (err) {
       console.trace(err)
       return res.status(404).send(err)
     }
     let data = result.recordset
     recordSet.Aktivnost = data
     res.send(recordSet)
    })
  })
}

let postAktivnost = (req, res) => {
  let cursor = db.cursor()
  let predmet_id = req.body.predmet_id
  let naziv = req.body.naziv
  let bodovi = req.body.bodovi
  let uslov = req.body.uslov

  let sql = `exec sp_aktivnost ${predmet_id},'${naziv}',${bodovi},${uslov}`
  console.log(sql)
  cursor.query(sql, (err, result) => {
    if(err){
      console.trace(err)
      return res.status(404).send(err)
    }
    res.send({ok: true})
  })
}

let getStudenti = (req, res) => {
  let cursor = db.cursor()
  let id = req.params.id
  let sql = `SELECT * FROM Student WHERE ID IN (SELECT Student_id FROM Student_Predmet WHERE Predmet_id = ${id})`
  console.log(sql)
  cursor.query(sql, (err, result) => {
    if(err){
      console.trace(err)
      return res.status(404).send(err)
    }
    let recordSet = result.recordset
    res.send(recordSet)
  })
}

module.exports = (app) => {
    app.get('/predmeti', getPredmeti)
    app.get('/predmet/:id', getPredmet)
    app.get('/predmet_student/:id', getStudenti)
    app.post('/aktivnost', postAktivnost)
}
