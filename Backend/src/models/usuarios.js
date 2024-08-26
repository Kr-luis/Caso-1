import mongoose, {Schema,model} from 'mongoose'
import bcrypt from "bcryptjs"

const UsuarioSchema = new Schema({
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
    email:{
        type:String,
        require:true,
        trim:true
    },
    password:{
        type:String,
        require:true
    },
    token:{
        type:String,
        default:null
    }
},{
    timestamps:true
})

// * Método para cifrar el password del paciente
UsuarioSchema.methods.encrypPassword = async function(password){
    const salt = await bcrypt.genSalt(10)
    const passwordEncryp = await bcrypt.hash(password,salt)
    return passwordEncryp
}
// * Método para verificar si el password ingresado es el mismo de la BDD
UsuarioSchema.methods.matchPassword = async function(password){
    const response = await bcrypt.compare(password,this.password)
    return response
}
UsuarioSchema.methods.crearToken = function(){
    const tokenGenerado = this.token = Math.random().toString(36).slice(2)
    return tokenGenerado
}
export default model('Usuario',UsuarioSchema)
