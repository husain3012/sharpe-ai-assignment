import axios from "axios";
import PostsChart from "components/PostsChart";
import PostsTable from "components/PostsTable";
import { API_LINK, USER } from "content/config";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IPost } from "types/common";



interface IPostState {
  loading: boolean;
  posts: IPost[];
}

const Data = () => {
  const [posts, setPosts] = useState<IPostState>({
    loading: false,
    posts: [],
  });


  useEffect(() => {
    const fetchData = async () => {
      setPosts((prev) => ({ ...prev, loading: true }));
      try {
        const response = await axios.get(API_LINK);
        const allPosts = response.data as IPost[];

        setPosts((prev) => ({
          ...prev,
          posts: allPosts,
        }));
      } catch (error) {
        toast.error(error?.toString() || "Unknown Error Occurred");
      } finally {
        setPosts((prev) => ({
          ...prev,
          loading: false,
        }));
      }
    };

    fetchData();
  }, []);

  const userPosts = posts.posts.filter(post=>post.userId==USER.id)

  return (
    <div className="flex flex-col ">
      <div className="card w-full bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">Posts Data</h2>
          <div className="divider"></div>
          {posts.loading ? (
            <div className="w-full h-60 flex items-center justify-center">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-4">
             
              <PostsTable posts={userPosts} />

              <div className="divider">Charts</div>
            <PostsChart allPosts={posts.posts}  />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Data;
