// load the things we need
var express = require('express');
const server = 'http://192.168.0.29:8083/'
const db = require("./views/db/db");
var app = express();

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page
app.get('/', async function(req, res) {
    const conn = await db.connect();
    const [rows] = await conn.query('select numero_atendimento,nome_tec,atend_nome_cliente ,nome_cliente,atend_telefone,atend_comentarios, atend_comentarios_apos from atendimentos inner join setor on nome_tec = nome_tec_setor where atend_status = "Fechado"  and  dt_fechamento > CURDATE()-INTERVAL 1 DAY and atend_nota = "X_X" and cidade = "Manaus"  and (atend_tipo = "ATENDIMENTO TÉCNICO" OR atend_tipo = "RETORNO_CHAMADO" OR atend_tipo = "MANUTENÇÃO_PREVENTIVA") ')
    res.render('pages/index',{row:rows});
});

// about page
app.get('/nota', async function(req, res) {
        if(req.query.nota!="-"){
            try {
            const conn = await db.connect();
            console.log(req.query.nota)
            console.log(req.query.numero_atendimento)
            await conn.query('update atendimentos set atend_nota ="'+req.query.nota+'", atend_nota_aval = "'+ req.query.avaliacao+'" where numero_atendimento = '+  req.query.numero_atendimento)

            } catch (error) {
                console.log(error)    
            }
        }
    res.redirect(server)
});

app.listen(8083);
console.log('8083 is the magic port');  