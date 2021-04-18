var express = require('express');
var app = express();
var database = require('../config/database');
var moment = require('moment');

// Para obtener todas las tareas de un usuario específico
app.get('/tasks/user/:id', (req, res) => {
    let sql = `SELECT * FROM task WHERE user_id = ${req.params.id}`;

    database.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({
                message: err
            });
            return;
        }

        if (result.length) res.json(result);
        else res.json({});
    });
});

// Por agregar tareas
app.post('/tasks', (req, res) => {
    let sql = `INSERT INTO task (user_id, content, date_time) VALUES (
        '${req.body.user_id}',
        '${req.body.content}',
        '${moment().utc().format("YYYY-MM-DD hh:mm:ss")}'
    )`;

    database.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({
                message: err
            });
            return;
        }

        // Si no hay error
        res.status(200).json({
            status: 200,
            success: true
        });

    });
});

app.delete('/tasks/:id', (req, res) => {
    let sql = `DELETE FROM task WHERE id = ${req.params.id}`;

    database.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({
                status: 400,
                success: false
            });
        } else {
            res.status(200).json({
                status: 200,
                success: true
            });
        }
    });
});


app.put('/tasks/:id', (req, res) => {

    let sql = `UPDATE task SET content = '${req.body.content}' WHERE id = ${req.params.id}`;
    database.query(sql, (err, result) => {
        if (err) {
            res.status(400).json({
                status: 400,
                success: false
            });
        } else {
            res.status(200).json({
                status: 200,
                success: true
            });
        }console.log(req.body.content)
    });
});


module.exports = app;
