import  express  from "express"
import fileUpload from "express-fileupload"
import postsRoutes from "./routes/posts.routes.js"
import {dirname, join} from "path"
import { fileURLToPath } from "url"

const app=express()
const __dirname = dirname(fileURLToPath(import.meta.url))

//middlewares
app.use(express.json())
/* a fileUpload le ponemos un objeto al cual le vamos a pasar algunas propiedades, entre ellas va estar usetempfiles que es para cuando subimos una imagen no la mantenga en memoria, sino que lo guarde aca dentro de una carpeta, luego utilizamos tempfiledir que es la carpeta donde vamos a guardar las imagenes, con esto ya tenemos la subida de archivos */
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir:"./upload"
}))

//routes
app.use(postsRoutes)

app.use(express.static(join(__dirname, "../client/build")))


export default app