import { mongoose } from "mongoose";
import Materias from "../models/materias.js"

const CrearMateria = async (req,res) => {
    // Solicitud
    const {nombre, codigo, descripcion, creditos} = req.body
    const nombremin = nombre.toLowerCase();
    // Validaciones
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Debe llenar todos los campos"})

    const verificarNombre = await Materias.findOne({nombre:nombremin})
    if(verificarNombre) return res.status(400).json({msg:"Ya existe una materia con ese nombre"})
    
    const verificarCodigo = await Materias.findOne({codigo})
    if(verificarCodigo) return res.status(400).json({msg:"Ya existe una materia con ese codigo"})

    const permitido = /^[a-zA-ZÀ-ÿ\s]+$/; // Permite letras, espacios y acentos
    if(!permitido.test(nombre)) return res.status(400).json({msg:"No se permiten el uso de caracteres especiales, intente de nuevo"})

    const permitidoCodigo = /^[A-Z0-9]+$/; // Permite letras mayúsculas y números
    if (!permitidoCodigo.test(codigo)) return res.status(400).json({ msg: "El código debe contener solo letras mayúsculas y números, intente de nuevo" });
    
    // BDD

    const nuevaMateria = new Materias({nombre: nombremin, codigo, descripcion, creditos})
    await nuevaMateria.save()

    res.status(200).json({msg:"La materia fue creada con exito"})
}

const VerMaterias = async (req, res) => {
    try {
        const materias = await Materias.find().select("-createdAt -updatedAt -__v");
        res.json(materias);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las materias", error });
    }
};

const detalleMateria = async(req,res)=>{
    const {id} = req.params
    if( !mongoose.Types.ObjectId.isValid(id) ) return res.status(404).json({msg:`Lo sentimos, no existe esta materia`});
    const materia = await Materias.findById(id).select("-createdAt -updatedAt -__v")
    res.status(200).json(materia)
}

const ActualizarMateria = async (req,res) => {
    // Solicitud
    const {id} = req.params
    // Validaciones
    if(Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg:`Lo sentimos no existe o no se encontró esa materia`})
    await Materias.findByIdAndUpdate(req.params.id, req.body)
    res.status(200).json({msg:"La materia se actualizo correctamente"})
}

const EliminarMateria = async (req,res) => {
    // Solicitud
    const {id} = req.params
    // Validaciones
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg:"Lo sentimos no existe o no se encontró esa materia"})
    // BDD
    await Materias.findByIdAndDelete(req.params.id)
    // Respuesta
    res.status(200).json({msg:"La materia se elimino correctamente"})
}


export{
    CrearMateria,
    VerMaterias,
    ActualizarMateria,
    EliminarMateria,
    detalleMateria
}