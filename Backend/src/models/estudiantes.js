import mongoose, {Schema,model} from 'mongoose'
const EstudianteSchema = new Schema({
    nombre:{
        type:String,
        require:true,
        trim:true,
        maxlength : 30
    },
    apellido:{
        type:String,
        require:true,
        trim:true,
        maxlength : 30
    },
    cedula:{
        type:String,
        require:true,
        trim:true,
        maxlenght:15
    },
    fecha_nacimiento:{
        type:String,
        require:true,
        maxlenght:50
    },
    ciudad:{
        type:String,
        require:true,
        maxlenght:10,
    },
    direccion:{
        type:String,
        require:true,
        maxlenght:50
    },
    telefono:{
        type:String,
        require:true,
        maxlenght:20
    },
    email:{
        type:String,
        require:true,
        maxlenght:30
    }
},{
    timestamps:true
})


export default model('Estudiantes',EstudianteSchema)
