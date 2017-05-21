var sql = require('mssql/msnodesqlv8');

// config for your database
var config = {
  driver: 'msnodesqlv8',
  connectionString: 'Driver={SQL Server Native Client 11.0};Server={LILIC-PC\\SQL2014};Database={Predispitne_obaveze};Trusted_Connection={yes};'
};

module.exports = {
  connect: (next) => {
    // connect to your database
    sql.connect(config, (err, result) => {
      if (err) {
        return console.trace(err)
      }
      next()
    })
  },
  close: () => {

  },
  cursor: () => {
    return new sql.Request()
  }
}
