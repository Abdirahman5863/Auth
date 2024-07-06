import mongoose from "mongoose";


const connectToDb = async () => {
  const url ="mongodb+srv://abdirahmanabdi5863:Dg0aJv8bUxYtftm8@cluster0.abrcpvd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
 mongoose.connect(url).then(()=>console.log("Database successfully connected")).catch((error) => console.log(error))
}
export default connectToDb;