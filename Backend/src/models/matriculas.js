import mongoose, {Schema, model} from "mongoose";

const MatriculaSchema = new Schema({
    codigo:{
        type:String,
        require:true,
        maxlength:20
    },
    descripcion:{
        type:String,
        require:true,
        maxlength:50
    },
    id_estudiante:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Estudiante"
    },
    id_materia:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Materia"
    }]
},{
    timestamps:true
})

export default model("Matriculas", MatriculaSchema)