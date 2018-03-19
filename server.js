var app = require('./app');
// set port bisa kaya gini
// app.listen(3000);
// console.log('asd')

// app.set('port', process.env.PORT || 3000);
// process.env.PORT || 3000 artinya port dapat berapa saja, akan tetapi bila tidak ada akan di set jadi 3000
var port = process.env.PORT || 3000;
var server = app.listen(port,function(){
  console.log('Listening on port ' + port)
});
