var db = require('./db')

let getAktivnost = (req, res) =>{
  let cursor = db.cursor()
  let sql = `SELECT * FROM v_aktivnosti`
  console.log("ENTERED GET AKTIVNOSTI")
  cursor.query(sql , (err, result) => {
    if(err){
      console.trace(err)
      return res.status(404).send(err)
    }
    let recordSet = result.recordset
    res.send(recordSet)
  })
}

let deleteAktivnost = (req, res) => {
  console.log("ENTERED DELETE");
  let cursor = db.cursor()
  let aktivnost_id = req.params.id
  let sql = `exec sp_obrisi_aktivnost ${aktivnost_id}`
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
  app.get('/aktivnosti' , getAktivnost)
  app.post('/delete_aktivnost/:id', deleteAktivnost)
}
