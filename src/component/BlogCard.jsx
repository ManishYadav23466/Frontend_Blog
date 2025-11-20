import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function BlogCard() {
  const [blogData, setBlogData] = useState([]);
  const [followedBlogs, setFollowedBlogs] = useState({}); // Follow state per blog
  const[commentFlag,setCommentFlag]=useState({});

  useEffect(()=>{
    console.log(commentFlag,"comment flag")
  },[commentFlag])

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/getpost`, { withCredentials: true });
        setBlogData(res.data.allpost);
      } catch (err) {
        console.log(err, "error");
      }
    };
    fetchBlogDetail();
  }, []);

  const commentFlagHandle=(id)=>{
    setCommentFlag((prev)=>({
      ...prev,[id]:!prev[id],
    }));
  }

  // Sort newest blogs first
  const sortedBlogs = blogData
    ? [...blogData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    : [];

  return (
    <div className="bg-white dark:bg-gray-800 dark:text-white rounded-lg shadow-md p-4 mb-4">
      {sortedBlogs.map((blog) => {
        const date = new Date(blog.createdAt).toDateString();

        return (
          <div key={blog._id} className="mb-6 border-b pb-4">
            {/* Header: Profile + Name + Date + Follow */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <img
                  src={blog.user?.profileImage || "https://images.unsplash.com/photo-1602233158242-3ba0ac4d2167?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{blog.user?.name}</p>
                  <p className="text-xs text-gray-500">{date}</p>
                </div>
              </div>

              {/* Follow button */}
              <button
                onClick={() =>
                  setFollowedBlogs((prev) => ({
                    ...prev,
                    [blog._id]: !prev[blog._id],
                  }))
                }
                className={`text-sm px-3 py-1 border rounded-full ${
                  followedBlogs[blog._id]
                    ? "text-gray-500 border-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700"
                    : "text-blue-600 border-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700"
                }`}
              >
                {followedBlogs[blog._id] ? "Following" : "+ Follow"}
              </button>
            </div>

            {/* Blog Content */}
            <h2 className="text-xl font-semibold">{blog.heading}</h2>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              {blog.description.length > 150
                ? blog.description.substring(0, 150) + "..."
                : blog.description}
            </p>

            {/* Actions */}
            <div className="flex space-x-6 mt-3 text-sm font-medium">
              <button className="text-blue-500 hover:underline">👍 Like</button>
              <button onClick={()=>commentFlagHandle(blog._id)} className="text-green-500 hover:underline">💬 Comment</button>
              <button className="text-purple-500 hover:underline">🔗 Share</button>
            </div>

           {
              commentFlag[blog._id] && (
              <div className="my-5 border-2 p-2 rounded-lg border-gray-100 relative flex justify-center items-center">
                <textarea name="comment" id="comment" placeholder="write comment" rows={1} autoFocus className="w-full outline-none resize-none "></textarea>
                <button className="absolute right-4 cursor-pointer">send</button>
            </div>
            )
           }

            {/* Read More */}
            <Link
              // to={`/blog/${blog._id}`}
              className="mt-3 inline-block text-blue-600 hover:underline"
            >
              Read More →
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default BlogCard;
