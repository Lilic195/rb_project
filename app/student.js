var db = require('./db')

let getStudenti = (req, res) => {
  let cursor = db.cursor()
  let sql = `SELECT * FROM v_studenti`

  cursor.query(sql , (err, result) => {
    if(err){
      console.trace(err)
      return res.status(404).send(err)
    }
    let recordSet = result.recordset
    console.log(recordSet)
    res.send(recordSet)
  })
}

let getStudent = (req, res) => {
  let cursor = db.cursor()
  let id = req.params.id
  let sql = `SELECT s.Ime, s.Prezime, sm.Naziv as 'Smer', Broj_indeksa
             FROM Student s JOIN Smer sm ON s.Smer_ID = sm.ID
             WHERE s.ID = ${id}`

  cursor.query(sql, (err, result) => {
    if(err){
      console.trace(err)
      return res.status(404).send(err)
    }
    let recordSet = result.recordset[0]

    cursor.query(`SELECT * FROM Predmet WHERE ID IN (SELECT Predmet_ID FROM Student_Predmet WHERE Student_ID = ${id})`, (err, result) => {
      if (err) {
        console.trace(err)
        return res.status(404).send(err)
      }
     let data = result.recordset
     recordSet.Predmeti = data
     res.send(recordSet)
   })
  })
}


let getAktivnost = (req, res) => {
  let cursor = db.cursor()
  let student_id = req.query.student_id
  let predmet_id = req.query.predmet_id

  let sql = `SELECT * FROM Student_Predmet WHERE Student_ID = ${student_id} AND Predmet_ID = ${predmet_id}`
  cursor.query(sql, (err, result) => {
    if (err) {
      console.trace(err)
      return res.status(404).send(err)
    }
      let recordSet = result.recordset[0]

      let sql = `SELECT a.Naziv, s.Osvojeni_bodovi, a.Maks_bodova, a.Uslov, s.Uslov as 'Polozio'
                 FROM Aktivnost a JOIN Student_Aktivnost s ON a.ID = s.Aktivnost_ID
                 WHERE s.Student_ID = ${student_id} AND a.Predmet_ID IN (SELECT ID FROM Predmet WHERE ID = ${predmet_id})`
      cursor.query(sql, (err, result) => {
        if (err) {
          console.trace(err)
          return res.status(404).send(err)
        }
        let data = result.recordset
        recordSet.Aktivnosti = data
        res.send(recordSet)
      })

  })
}

let postAktivnost = (req, res) => {
  let cursor = db.cursor()
  let student_id = req.body.student_id
  let aktivnost_id = req.body.aktivnost_id
  let bodovi = req.body.bodovi
  let polozio = req.body.polozio

  let sql = `exec sp_bodovi ${student_id},${aktivnost_id},${bodovi},${polozio}`
  console.log(sql)
  cursor.query(sql, (err, result) => {
    if(err){
      console.trace(err)
      return res.status(404).send(err)
    }
    res.send({ok: true})
  })
}

module.exports = (app) => {
  app.get('/studenti', getStudenti)
  app.get('/student/:id', getStudent)
  app.get('/student_aktivnost', getAktivnost)
  app.post('/student_aktivnost', postAktivnost)
}
