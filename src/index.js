import connectDB from './db/index.js';
import express from 'express';
import dotenv from 'dotenv'

dotenv.config({
    path:'./env'
})


connectDB()
.then(() => {
    
    app.on('error', () => {
        console.log('Error:' + error);
        throw error
    })

    app.listen(process.env.PORT || 8000, () => {
        console.log("App listening on port " + process.env.PORT);
    })

})
.catch((err) => {
    console.log("MongoDB connection error: " + err);
})








// ;(async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`)
        
//         app.on('error', () => {
//             console.log('Error:' + error);
//             throw error
//         })

//         app.listen(process.env.PORT, () => {
//             console.log("App listening on port " + process.env.PORT);
//         })
//     }
//     catch(error) {
//         console.log("Error in Database Connection");
//     }
// })()
