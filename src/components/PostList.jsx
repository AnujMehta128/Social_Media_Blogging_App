import { useContext, useEffect, useState } from "react";
import Post from "./Post";
import { PostList as PostListData } from "../store/post-list-store";
import WelcomeMessage from "./WelcomeMessage";
import LoadingSpinner from "./LoadingSpinner";

const PostList = () => {
  const { postList, addInitialPosts } = useContext(PostListData);
  const [fetching, setFetching] = useState(false);

  useEffect(() => {
    setFetching(true);
    const controller = new AbortController();
    const signal = controller.signal;

    fetch(" https://mocki.io/v1/498abd0a-3e68-4349-ba1e-95e6bcd038f0 ", { signal })
      .then((res) => res.json())
      .then((data) => {
        addInitialPosts(data.posts);
        setFetching(false);
      });

    return () => {
      console.log("Cleaning up UseEffect.");
      controller.abort();
    };
  }, []);


/* const handleGetPostsClick=()=>{
        fetch("https://mocki.io/v1/498abd0a-3e68-4349-ba1e-95e6bcd038f0").
        then((res)=>res.json()).
        then(data=>{
            addInitialPost(data.posts)
        });
       }*/

  return (
    <>
      {fetching && <LoadingSpinner />}
      {!fetching && postList.length === 0 && <WelcomeMessage />}
      {!fetching && postList.map((post) => <Post key={post.id} post={post} />)}
    </>
  );
};

export default PostList;
