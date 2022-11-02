import React from 'react'
import {HomePage, PostForm, NotFoundPage} from "./pages"
import {Routes, Route} from "react-router-dom"
import { PostProvider } from './context/postContext'
import {Toaster} from "react-hot-toast"


function App() {
  return (
   <div className='bg-neutral-900 min-h-screen flex item-center'>
     <div className='px-10 container m-auto'>
     <PostProvider>
        <Routes>
            <Route path='/' element={<HomePage/>}></Route>
            <Route path='/new' element={<PostForm/>}></Route>
            <Route path='/posts/:id' element={<PostForm/>}></Route>
            <Route path='*' element={<NotFoundPage/>}></Route> {/* utilizamos el asterisco en el path porque cuando piden cualquier cosa te redirige asi ahi  */}
        </Routes>
        <Toaster/>
     </PostProvider>
     </div>
   </div>
  )
}

export default App