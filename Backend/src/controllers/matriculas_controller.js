import Matriculas from "../models/matriculas.js"
import Estudiantes from "../models/estudiantes.js"
import Materias from "../models/materias.js"
import mongoose from "mongoose"
const CrearMatricula = async (req,res) =>{
    const {codigo, descripcion, id_estudiante, id_materias} = req.body

    if(Object.values(req.body).includes("")) return res.status(400).json({msg:"Debes de llenar los campos obligatorios"})

    const verificarCodigo = await Matriculas.findOne({codigo})
    if(verificarCodigo) return res.status(400).json({msg:"Lo sentimos, el codigo ingresado ya esta en uso"})

    const permitidoCodigo = /^[A-Z0-9]+$/;
    if(!permitidoCodigo.test(codigo)) return res.status(400).json({msg:"El codigo solo puedo contener mayusculas y numeros"})
    
    const Verificarestudiante = await Estudiantes.findById(id_estudiante)
    if(!Verificarestudiante) return res.status(400).json({msg:"No se encontro al estudiante"})

    for (let id of id_materias) {
        const Verificarmateria = await Materias.findOne({ _id: id });
        if (!Verificarmateria) {
            return res.status(400).json({ msg: `No se encontró la materia con id: ${id}` });
        }
    }

    const nuevaMatricula = new Matriculas(req.body);
    await nuevaMatricula.save();

    res.status(200).json({ msg: "La matrícula fue creada con éxito" });
}

const VerMatricula = async (req,res) =>{
    try{
        const matriculas = await Matriculas.find().select("-createdAt -updatedAt -__v")
        res.json(matriculas)
    }catch(error){
        res.status(500).json({msg:"Lo sentimos ocurrio un error", error})
    }
}

const detalleMatricula = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({msg:`Lo sentimos, no se encuentra registrado el estudiante`});
    const matricula = await Matriculas.findById(id).select("-createdAt -updatedAt -__v")
    res.status(200).json(matricula)
}

const ActualizarMatricula = async (req,res) =>{
    const {id} = req.params

    if(Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({msg:"Lo sentimos, no se encuentra una matricula registrada con ese id"})

    await Matriculas.findByIdAndUpdate(req.params.id , req.body)

    res.status(200).json({msg:"La matricula fue actualizada con exito"})
}

const EliminarMatricula = async (req,res) =>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) return res.status(400).json({msg:"Lo sentimos, no existe una matricula registrada con ese id"})
    
    await Matriculas.findByIdAndDelete(id)

    res.status(200).json({msg:"La matricula fue elminada correctamente"})
}

export{
    CrearMatricula,
    VerMatricula,
    ActualizarMatricula,
    EliminarMatricula,
    detalleMatricula
}