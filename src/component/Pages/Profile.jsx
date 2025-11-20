import React, { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);

const api = import.meta.env.VITE_API;

  console.log(api,"api link")

  useEffect(() => {
    const fetchProfileAndPosts = async () => {
      try {
        const res = await axios.get(`${api}/profile`, {
          withCredentials: true,
        });

        if (res.data.success) {
          setUser(res.data.user);

          const userId = res.data.user._id;
          const postsRes = await axios.get(
            `${api}/getuserposts/${userId}`,
            { withCredentials: true }
          );
          console.log(postsRes,"post responses")

          const sortedPosts = postsRes.data.posts.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
          setPosts(sortedPosts);
        } else {
          setError(res.data.message || "Something went wrong");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch profile or posts");
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndPosts();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto my-6">
      {/* Profile Info - NON SCROLLABLE */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4">
        <div className="flex items-center space-x-6">
          <div className="bg-gray-300 w-24 h-24 rounded-full flex items-center justify-center text-gray-600 text-2xl">
            {user?.name?.charAt(0) || "U"}
          </div>
          <div>
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-gray-500 dark:text-gray-400">
              {user?.role || "Blogger • Developer"}
            </p>
            <p className="mt-2">
              Followers: {user?.followers?.length || 0} | Following:{" "}
              {user?.following?.length || 0}
            </p>
          </div>
        </div>
      </div>

      {/* User's Posts - SCROLLABLE */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 h-[500px] overflow-y-auto">
        <h3 className="text-lg font-semibold mb-4">Your Posts</h3>

        {posts.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">
            You have not created any posts yet.
          </p>
        ) : (
          posts.map((post) => {
            const date = new Date(post.createdAt).toDateString();
            return (
              <div key={post._id} className="mb-8 border-b pb-4">
                <h4 className="text-xl font-semibold">{post.heading}</h4>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  {post.description.length > 150
                    ? post.description.substring(0, 150) + "..."
                    : post.description}
                </p>
                <p className="text-xs text-gray-500 mt-1">{date}</p>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default Profile;
