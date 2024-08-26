import moongose from "mongoose"

moongose.set("strictQuery" , true)

const connection = async() => {
    try{
        const {connection} = await moongose.connect(process.env.MONGODB_URI)
        console.log(`Database is connected on ${connection.host} - ${connection.port}`)
    } catch (error) {
        console.log(error);
    }
}

export default connection