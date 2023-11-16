import mongoose from "mongoose"

const mongoose = require("mongoose");

const profissionalSchema = new mongoose.Schema({
    nome: {type: String, required: true},
    cpf: {type: String, required: true},
    rg: {type: String, required: true},
    dataNascimento: {type: Date, required: true},
    telefone: {type: String, required: true},
    email: {type: String, required: true},
    formacao: {type: String, required: true},
    experiencia: {type: String, required: true},
});

module.exports = mongoose.model("Profissional", profissionalSchema);

const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb: //localhost/agronomia", {useNewUrlParser: true});

const profissionalModel = require("./models/profissional");

app.get("/profissionais", (req, res) => {
    profissionalModel.find({}, (err, profissionais) => {
        if (err) {
            res.status(500).send(err);
            } else {
            res.send(profissionais);
        }
    });
});

app.post("/profissionais", (req, res) => {
    const novoProfissional = new profissionalModel({
        nome: req.body.nome,
        cpf: req.body.cpf,
        rg: req.body.rg,
        dataNascimento: req.body.dataNascimento,
        telefone: req.body.email,
        formacao: req.body.formacao,
        experiencia: req.body.experiencia,
    });

    novoProfissional.save((err) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(novoProfissional);
        }
    });
});

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
