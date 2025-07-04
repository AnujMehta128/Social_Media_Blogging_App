import { useReducer } from "react";
import { createContext } from "react";





 export const PostList=  createContext(
     {
    postList :[],
    addPost : ()=>{},
    deletePost : ()=>{},
    addInitialPost :()=>{}
    }
);



const postListReducer=(currPostList,action)=>{

  let newPostList=currPostList;
  if(action.type==="DELETE_POST")
  {
       newPostList=currPostList.filter((post)=>{
        return post.id !==action.payload.id
    })
  }

 else if(action.type==="ADD_INITIAL_POST")
  {
    newPostList=action.payload.posts
  }


  else if(action.type==="ADD_POST")
  {
    newPostList=[action.payload,...currPostList]
  }
  
  
  
  
    return  newPostList;
}


function PostListProvider({children})
{
   
   const [postList,dispatchPostList]=useReducer(
    postListReducer,
    []
   )
   
   const addPost=(newuserId,newpostTitle,newpostbody,newreactions,newtags)=>{
    
    dispatchPostList({
        type: "ADD_POST",
        payload:{
            id : Date.now,
    title :  newpostTitle,
    body :newpostbody ,
    reactions : newreactions,
    userId : newuserId,
    tags : newtags
        }

    })

   }



   const addInitialPost=(posts)=>{
    
    dispatchPostList({
        type: "ADD_INITIAL_POST",
        payload:{
            posts :posts
        }

    })

   }

   const deletePost=(id)=>{
        dispatchPostList({
            type : "DELETE_POST",
            payload :{
                id :id,
            }
        })
   }
   
    return (
        <PostList.Provider value={
            {
            postList: postList,
            addPost : addPost,
            deletePost: deletePost,
            addInitialPost:addInitialPost
            }
        }>

         {children}

        </PostList.Provider>
    );
}



export default PostListProvider;