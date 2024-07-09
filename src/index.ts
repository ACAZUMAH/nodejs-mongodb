import  express  from 'express';
import route from './routes/route'
import session from 'express-session';
import { v4 } from 'uuid';
import path from 'path'
import bodyParser from 'body-parser';
import { connectToDB } from "./Models/mongoconfig";
declare global {
    namespace Express{
        interface Request {
            user?: string | any
        }
    }
}
const app = express()

app.use(express.json())

app.use("*", bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(session({
    secret: 'ismydev',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000
    },
    genid: () => v4()
}))
app.use(route)
connectToDB()

const PORT = process.env.PORT || 3500
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})

app.use('/static', express.static(path.join(__dirname, '../public')))

app.get('/home', (req,res) =>{
    const formPath = path.join(__dirname, '../public', 'home.html')
    res.status(200).sendFile(formPath);
})
