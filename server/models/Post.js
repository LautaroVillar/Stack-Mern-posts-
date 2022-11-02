import mongoose from "mongoose"
const postSchema = new mongoose.Schema(
    {
      title: {
        type: String,
        required: true,
        trim: true/* esta propiedad lo que hace es que si el titulo tiene espacios vacios lo acomoda */
      },
      description: {
        type: String,
        required: true,
        trim: true
      },
      image: {
        public_id: String,
        url: String
      }
    });

export default mongoose.model("Post", postSchema)

