import  express  from 'express';
import route from './routes/route'
import path from 'path'

const app = express()
app.use(express.json())
app.use(route)

const PORT = process.env.PORT || 3500
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})

app.get('/', (req,res) =>{
    res.status(200).send('Welcome')
})
app.get('register', (req,res) =>{
    const formPath = path.join(__dirname, '../form/form.html')
    res.status(200).sendFile(formPath);
})