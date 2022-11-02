import Post from "../models/Post.js"
import { uploadImage, deleteImage } from "../libs/cloudinary.js"
import fs from "fs-extra"

export const getPosts = async (req,res)=> {
    try {
        const posts = await Post.find() /* este metodo busca todas las publicaciones que hemos cargado, esto es asincrono */
        res.send(posts)
    } catch (error) {
        console.log(error)
        return res.status(500).json({message: error.message})
    }
}

export const createPost = async (req, res) => {
    try {
      const { title, description } = req.body;
      let image = null;
      if (req.files?.image) {
        const result = await uploadImage(req.files.image.tempFilePath);
        await fs.remove(req.files.image.tempFilePath);
        image = {
          url: result.secure_url,
          public_id: result.public_id,
        };
      }
      const newPost = new Post({ title, description, image });
      await newPost.save();
      return res.json(newPost);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  };

export const updatePost = async (req,res)=> {
   try {
     /* para este caso que la actulizacion no le vamos a estar pasando algun paramentro en especifico como el titulo o la descripcion, sino que directamente se lo vamos a pasar a la consulta, una pregunta seria como se que publicacion me quiere actualizar, para esto deberemos usar el id, para esto en donde esta la ruta le vamos aagregar el id seria "/posts/:id", entonces necesitamos dos datos, el id que viene de req.params y los nuevos datos que vienen a traves de req.body */
    /* vamos hacer una consulta a traves del modelo post y utlizamos el comando findByIdAndUpdate, este comando busca un id y lo actualiza */
   /*  para actualizar a un nuevo dato que cargo debo añadir otra propiedad que se llama {new: true}, esto me devuleve el objeto nuevo */
   const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true})
   console.log(updatePost)
   return res.send(updatePost)
   } catch (error) {
    return res.status(500).json({message: error.message})
   }

}

export const deletePost = async(req,res)=> {
try {
     /* para eliminar solo necesitamos el id    */
     const postRemove = await Post.findByIdAndDelete(req.params.id)
     /*  hacemos una validacion para ver si elimino la publicacion o si no encontro esa publicacion y no elimino nada, ademas usamos codigos estados segun sea el caso*/
     if (!postRemove) return res.sendStatus(404)
     /* aca agregamos una funcion para que elimine la imagen de cloudinary(la logica la ejecutamos dentro del archivo cloudinary.js), si no hacemos este paso borra lo demas pero no la imagen */
    if(postRemove.image.public_id) {
        await deleteImage(postRemove.image.public_id)
    }
     return res.sendStatus(204)
} catch (error) {
    return res.status(500).json({message: error.message})
}
}

export const getPost = async(req,res)=> {
   try {
    const post = await Post.findById(req.params.id)
    if(!post) return res.sendStatus(404)
    return res.json(post)
   } catch (error) {
    return res.status(500).json({message: error.message})
}
   }

