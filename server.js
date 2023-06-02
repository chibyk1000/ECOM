const express = require('express'); 
const app = express();
require('dotenv').config()
const cookie = require('cookie-parser')
const connection = require('./utils/db')
const cors = require('cors')
const userRoute = require('./routes/userRoutes')
const adminRoute = require('./routes/adminRoutes')
const cartRoute = require('./routes/cartRoutes')
const productRoute = require('./routes/productRoutes')
const PORT = process.env.PORT
app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))
app.use(function (req, res, next) { 
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, HEAD, OPTIONS")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization")
    next()
})
connection()
app.use(cookie())
app.use(express.json())
app.use('/user', userRoute)
app.use('/admin', adminRoute)
app.use('/products', productRoute)
app.use('/cart', cartRoute)
app.use('/uploads', express.static('static'))
app.all('**', (req, res) => {
    return res.status(404).json({message: 'page not found'})
})

app.listen(PORT, ()=> console.log('server is listening on port ' + PORT))