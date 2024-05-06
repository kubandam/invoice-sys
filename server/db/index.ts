import mongoose from 'mongoose';

export default async () => {
    const config = useRuntimeConfig();
    mongoose.connect(config.MONGODB_URI)
            .then(()=>console.log("Connected to DB"))
            .catch((e)=>{console.log(e)})
}