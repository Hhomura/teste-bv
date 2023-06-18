const express = require('express')
const app = express();
const database = require('./models/DbConnection');
const PORT = 8080;
const session = require("express-session");
const handlebars = require('express-handlebars');
const bodyParser = require("body-parser");
const flash = require("connect-flash");

//CONFIGURAÇÕES PASSPORT
//const passport = require("passport");
//require("./controllers/Auth")(passport);

const passport2 = require("passport");
require("./controllers/AuthUser")(passport2);

// Sessão
app.use(session({
    secret: "chavesessao",
    resave: true,
    saveUninitialized: true
}));
//app.use(passport.initialize())
//app.use(passport.session())

app.use(passport2.initialize())
app.use(passport2.session())

app.use(flash());

//Middleware
app.use((req, res, next) =>{
    //VARIAÁVEIS GLOBAIS
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.empresas = req.user || null;
    res.locals.usuario = req.user || null;
    next()
})

//PATH
const path = require('path')

//Databse
database.testeConexão();

//Configurações bodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Configurações Handlebars
app.engine('handlebars', handlebars.engine({defaultLayout: 'main', runtimeOptions:{
    allowProtoPropertiesByDefault: true,
    allowedProtoMethods: true
}}))
app.set('view engine', 'handlebars');

//Configurações PATH
app.use(express.static(path.join(__dirname, "public")));

//rotas
const empresas = require('./routes/EmpresasRoute')
const vagas = require('./routes/Vagas')
const usuario = require('./routes/Usuarios')

app.use('/empresa', empresas);
app.use('/vagas', vagas);
app.use('/usuario', usuario);


app.get('/', (req, res) =>{
    res.render("HomePage")
});


app.listen(PORT, () =>{
    console.log(`Servidor Rodando na Porta ${PORT}`);
});