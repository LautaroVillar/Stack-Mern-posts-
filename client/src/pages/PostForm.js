import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { usePosts } from "../context/postContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import {AiOutlineLoading3Quarters} from "react-icons/ai"

export function PostForm() {
  const { createPost, getPost, updatePost } = usePosts();
  const navigate = useNavigate();
  const params = useParams();
  const [post, setPost] = useState({
    title: "",
    description: "",
    image: null,
  });

  /*  Aca lo que hacemos en pedir datos al backend, para eso creamos una funcion en el context y a su vez otra funcion en la carpeta dentro del archivo post. Resumiendo: lo que hace es en la funcion getPost que se encuentra dentro del archivo postContext hace una peticion de la publicacion, trae la respuesta (res) y retornamos res.data que luego es recibido por PostForm  y lo guardamos en otro estado que se llama post.A su vez no podemos utilizar el async y await dentro del useEffect, para eso creamos una funcion indirecta(RARO)*/
  useEffect(() => {
    (async () => {
      if (params.id) {
        const post = await getPost(params.id);
        setPost(post);
      }
    })();
  }, [params.id]);

  return (
    <div className=" flex items-center justify-center">
      <div className="bg-zinc-800 p-10 shadow-md shadow-black">
        <header className="flex justify-between items-center py-4 text-white">
          <h3 className="text-xl">New Post</h3>
          <Link to="/" className="text-gray-400 text-sm hover:text-gray-300">
            Go back
          </Link>
        </header>
        <Formik
          initialValues={post}
          validationSchema={Yup.object({
            title: Yup.string().required("Title is Required"),
            description: Yup.string().required("Description is required"),
          })}
          onSubmit={async (values, actions) => {
            if (params.id) {
              await updatePost(params.id, values);
            } else {
              await createPost(values);
            }
            actions.setSubmitting(false);
            navigate("/");
          }}
          enableReinitialize
        >
          {({ handleSubmit, setFieldValue, isSubmitting }) => (
            <Form onSubmit={handleSubmit}>
              <label
                className="text-sm block font-bold text-gray-400"
                htmlFor="title"
              >
                Title
              </label>
              <Field
                name="title"
                placeholder="title"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full mb-4"
              />
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm"
                name="title"
              />
              <label
                className="text-sm block font-bold text-gray-400"
                htmlFor="description"
              >
                Description
              </label>
              <Field
                component="textarea"
                name="description"
                placeholder="description"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                rows={3}
              />
              <ErrorMessage
                component="p"
                className="text-red-400 text-sm"
                name="description"
              />
              <label
                className="text-sm block font-bold text-gray-400"
                htmlFor="description"
              >
                Description
              </label>
              <input
                type="file"
                className="px-3 py-2 focus:outline-none rounded bg-gray-600 text-white w-full"
                name="image"
                onChange={(e) => setFieldValue("image", e.target.files[0])}
              />
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded mt-2 text-white focus:outline-none disabled:bg-indigo-400"
                disabled={isSubmitting}
              >
                {isSubmitting ? <AiOutlineLoading3Quarters className="animate-spin h-5 w-5"/> : "Save"}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
