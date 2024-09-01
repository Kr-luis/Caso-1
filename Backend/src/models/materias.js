import mongoose, { Schema, model } from "mongoose";

const MateriasSchema = new Schema({
    nombre: {
        type: String,
        require: true,
        maxlength: 50
    },
    codigo: {
        type: String,
        require: true,
        maxlenght: 10
    },
    descripcion: {
        type: String,
        require: true,
        maxlenght: 50
    },
    creditos: {
        type: Number,
        require: true
    }
}, {
    timestamps: true
})
export default model("Materias", MateriasSchema)