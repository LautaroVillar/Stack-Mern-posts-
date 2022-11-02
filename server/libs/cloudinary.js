import cloudinary from "cloudinary"

cloudinary.config({
    cloud_name:"dsg0sezal",
    api_key:"155369897759875",
    api_secret:"CAWfOfiaGOcgLpEUNR8ihrkZcbQ"
})

/* 
ponemos v2 porque importamos la version del modulo y a su vez utilizamos uploader que es una propiedad que nos permite llamar un metodo que se llama upload y este metodo nos permite subir finalmente el archivo a los servicios de cloudinary, todo esto lo colocamos dentro de una funcion que voy a exportar, a su vez a upload le pasamos una ruta de un archivo que este caso se llama filePath, ademas vamos a definir donde lo va subir, para esto creamos un obejto con opciones en definimos el nombre de la carpeta donde vamos a colocarlo, no utlizamos try y catch porque el error lo maneja donde lo subimos. Antes de todo esto debemos utilizar el metodo config de cloudinary, al cual le vamos a pasar los parametros de nuestra cuenta  para que el sistema sepa en cuenta va a subir los archivos, estos datos deben mantenerse seguros  */
export const uploadImage = async filePath => {
  return await cloudinary.v2.uploader.upload(filePath, {
        folder:"posts"
    })
}

export const deleteImage = async id => {
  return await cloudinary.uploader.destroy(id)
}