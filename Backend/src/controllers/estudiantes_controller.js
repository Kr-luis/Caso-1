import mongoose from "mongoose";
import Estudiantes from "../models/estudiantes.js";
import Usuarios from "../models/usuarios.js";

const CrearEstudiante = async (req,res) => {
    // Solicuitud
    const {nombre, apellido, cedula, fecha_nacimiento, ciudad, direccion, telefono, email} = req.body
    // Validaciones
    if(Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debe llenar todos los datos"})

    const EmailUsuario = await Usuarios.findOne({email})
    if (EmailUsuario) return res.status(400).json({msg:"Lo sentimos el email, parece que ha sido registrado en una cuenta de usuario"})

    const VerificarEmail = await Estudiantes.findOne({email})
    if(VerificarEmail) return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})

    const Verificacion_numeros = /^[0-9]+$/;
    if(!Verificacion_numeros.test(cedula)) return res.status(400).json({msg:"Asegurese de ingresar solo numeros en la cedula"})

    if(!Verificacion_numeros.test(telefono)) return res.status(400).json({msg:"Asegurese de ingresar solo numeros en el telefono"})

    const VerificarCedula = await Estudiantes.findOne({cedula})
    if(VerificarCedula) return res.status(400).json({msg:"Lo sentimos, la cedula ya se encuentra registrada"})

    const Verificartelefono = await Estudiantes.findOne({telefono})
    if(Verificartelefono) return res.status(400).json({msg:"Lo sentimos, el telefono ya se encuentra registrado"})
    // BDD
    const nuevoEstudiante = new Estudiantes(req.body)
    await nuevoEstudiante.save()
    // Respuesta
    res.status(200).json({msg:"El estudiante fue registrado exitosamente"})
}

const VerEstudiante = async (req,res) => {
    try{
        const estudiantes = await Estudiantes.find().select("-createdAt -updatedAt -__v");
        res.json(estudiantes)
    } catch (error) {
        res.status(500).json({msg:"Hubo un error al mostrar los estudiantes", error})
    }
}

const ActualizarEstudiante = async (req,res) => {
    // Solicitud
    const {id} = req.params
    // Validaciones
    if(Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debe llenar todos los datos"})
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({msg:"No se ha encontrado a un estudiante con ese id"})
    // BDD
    await Estudiantes.findByIdAndUpdate(req.params.id, req.body)
    // Respuesta
    res.status(200).json({msg:"Se ha actualizado la informacion del estudiante"})
}

const EliminarEstudiante = async (req,res) => {
    // Solicitud
    const {id} = req.params
    // Validaciones
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg:"Lo sentimos, no se ha encontrado al estudiante"})
    // BDD
    await Estudiantes.findByIdAndDelete(id)
    // Respuesta
    res.status(200).json({msg:"El registro del estudiante ha sido eliminado exitosamente"})
}

export{
    CrearEstudiante,
    VerEstudiante,
    ActualizarEstudiante,
    EliminarEstudiante
}
