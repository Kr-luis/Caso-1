import Matriculas from "../models/matriculas.js"
import Estudiantes from "../models/estudiantes.js"
import Materias from "../models/materias.js"
import mongoose from "mongoose"
const CrearMatricula = async (req, res) => {
    try {
        const { codigo, descripcion, id_estudiante, id_materias } = req.body;

        if (Object.values(req.body).includes("")) 
            return res.status(400).json({ msg: "Debes de llenar los campos obligatorios" });

        const verificarCodigo = await Matriculas.findOne({ codigo });
        if (verificarCodigo) 
            return res.status(400).json({ msg: "Lo sentimos, el codigo ingresado ya esta en uso" });

        const permitidoCodigo = /^[A-Z0-9]+$/;
        if (!permitidoCodigo.test(codigo)) 
            return res.status(400).json({ msg: "El codigo solo puedo contener mayusculas y numeros" });

        const Verificarestudiante = await Estudiantes.findById(id_estudiante);
        if (!Verificarestudiante) 
            return res.status(400).json({ msg: "No se encontró al estudiante" });

        console.log("Estudiante encontrado:", Verificarestudiante); // Verificar que el estudiante tiene datos

        const materiasCompletas = [];
        for (let id of id_materias) {
            const Verificarmateria = await Materias.findById(id);
            if (!Verificarmateria) {
                return res.status(400).json({ msg: `No se encontró la materia con id: ${id}` });
            }
            console.log("Materia encontrada:", Verificarmateria); // Verificar que cada materia tiene datos
            materiasCompletas.push(Verificarmateria);
        }

        console.log("Materias completas:", materiasCompletas); // Verificar que el array no está vacío

        // Reemplazar los IDs con la información completa
        const nuevaMatricula = new Matriculas({
            codigo,
            descripcion,
            estudiante: Verificarestudiante,  // Aquí se guarda la información completa del estudiante
            materias: materiasCompletas       // Aquí se guarda la información completa de las materias
        });

        await nuevaMatricula.save();

        res.status(200).json({ msg: "La matrícula fue creada con éxito" });
    } catch (error) {
        console.error("Error al crear la matrícula:", error);
        res.status(500).json({ msg: "Error interno del servidor" });
    }
};


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