import mongoose from 'mongoose';

export default async () => {
    const config = useRuntimeConfig();
    const connectionOptions = {
        maxPoolSize: 10, // Adjust pool size based on your requirements
        socketTimeoutMS: 60000, // 60 seconds
        connectTimeoutMS: 60000 // 60 seconds
     };
    await mongoose.connect(config.MONGODB_URI,connectionOptions)
                .then(()=>console.log("Connected to DB"))
                .catch((e)=>{console.log(e)})

}

