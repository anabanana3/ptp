//Pruaba de modificacion
require('dotenv').config();//Esto no se muy bine para que es
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors=require('cors');
var jwt = require('jsonwebtoken');

//Incluimos todas la rutas que va a poder realizar la API RESTFul
var asociacion = require('./routes/asociacion');
var routes = require('./routes/index');
var usuario = require('./routes/usuario');
var solicitantes = require('./routes/solicitantes');
var registrados = require('./routes/registrados');
var cancelados = require('./routes/cancelados');
var profesion = require('./routes/profesion');
var mutilacion = require('./routes/mutilacion');
var lugares = require('./routes/lugares');
var rol = require('./routes/rol');
var permiso = require('./routes/permiso');
var tienepermiso = require('./routes/tienePermiso');
var etnia = require('./routes/etnia');
var sexo = require('./routes/sexo');
var familiar = require('./routes/familiar.js');
var actividades = require('./routes/actividadL');
var persona = require('./routes/persona');
var familiar = require('./routes/familiar');
var expediente = require('./routes/expedientes');
var edita = require('./routes/edita');
var camposb1 = require('./routes/camposb1');
var privados = require('./routes/privados');
var pendientesV = require('./routes/pendientesV');

var http = require('https');
var fs = require('fs');
var app = express();
 
http.createServer({
	key: fs.readFileSync('/etc/letsencrypt/live/www.aisha.ovh/privkey.pem'),
	cert: fs.readFileSync('/etc/letsencrypt/live/www.aisha.ovh/cert.pem')
}, app).listen(8080);



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Le decimos a la API que use todas la rutas
app.use('/api/asociacion', asociacion);
app.use('/api/usuario', usuario);
app.use('/api/solicitantes', solicitantes);
app.use('/api/registrados', registrados);
app.use('/api/cancelados', cancelados);
app.use('/api/profesion', profesion);
app.use('/api/mutilacion', mutilacion);
app.use('/api/lugares', lugares);
app.use('/api/rol', rol);
app.use('/api/permiso', permiso);
app.use('/api/tienePermiso', tienepermiso);
app.use('/api/etnia', etnia);
app.use('/api/sexo', sexo);
app.use('/api/actividad', actividades);
app.use('/api/persona', persona);
app.use('/api/familiar', familiar);
app.use('/api/expedientes', expediente);
app.use('/api/edita', edita);
app.use('/api/camposb1', camposb1);
app.use('/api/privados', privados);
app.use('/api/pendientesV');

app.set('trust proxy', true);
//app.use('/Tasks',Tasks);
//Por defecto usa el puerto 3000
//app.listen(22);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
var err = new Error('Not Found');
err.status = 404;
next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
app.use(function(err, req, res, next) {
res.status(err.status || 500);
res.render('error', {
message: err.message,
error: err
});
});
}


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
res.status(err.status || 500);
res.render('error', {
message: err.message,
error: {}
});
});
module.exports = app;
