import { useParams } from "react-router-dom"
import { Post } from "../../components/post/Post"

export const PostPage=()=>{
const id= useParams()

return(
    <Post id={id.postId}/>
)
}