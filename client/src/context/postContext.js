import { useState, createContext, useContext, useEffect } from "react"
import { createPostRequests, deletePostRequests, getPostRequests, getPostsRequests, updatePostRequests } from "../api/posts"

const postContext = createContext()

export const usePosts = () => {
    const context = useContext(postContext)
    return context
}


export const PostProvider = ({children}) => {

    const [posts, setPosts] = useState([])



    const getPosts = async () => {
       const res = await getPostsRequests()
       setPosts(res.data) /* utilizamos .data porque es donde se encuentran los datos */
    }

    const createPost = async (post) => {
       const res =  await createPostRequests(post)
       setPosts([...posts, res.data]) /* lo que hago aca es añadir una nueva publicacion a las demas que ya estan, sin necesidad de andar actulizando la pagina principal */
    }

    const deletePost = async id => {
        const res = await deletePostRequests(id)
        if ( res.status === 204) {
            setPosts(posts.filter(post => post._id !== id)) /* utilizamos un filter, le digo por cada publicacion vamos estar devolviendo un post.id y cada post.id lo vamos a comparar y vamos a decir que pasen todos los que no coincidan con este id que han elimiando  */
        }
        
    }

    const getPost = async (id) => {
        const res = await getPostRequests(id)
        return res.data
    }

    const updatePost = async (id, post) => {
       const res = await updatePostRequests(id, post)
       setPosts(posts.map(post => post._id === id ? res.data : post))
    }

    useEffect(() => {
        getPosts()
      }, [])
      
    return (
    <postContext.Provider value={{
        posts,
        getPosts,
        createPost,
        deletePost,
        getPost,
        updatePost
    }}>
        {children}
    </postContext.Provider>
)}