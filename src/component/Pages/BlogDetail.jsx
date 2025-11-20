import React from "react";
import { use } from "react";
import { useParams } from "react-router-dom";

function BlogDetail() {
  const { id } = useParams();
  // const api=process.env.api;

  // console.log(api,"api link")

  useEffect(()=>{
    const fetchBlogDetail=async()=>{
      try{
        const res=await axios.get(`http://localhost:8000/blog/${id}`,{withCredentials:true});
        console.log(res.data,"blog detail data");
      }catch(err){
        console.log(err,"error");
      }
    }
    fetchBlogDetail();
  },[])
  return (
    <>
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 my-6">
      <h1 className="text-2xl font-bold mb-2">Blog Detail {id}</h1>
      <p className="text-gray-500 dark:text-gray-400 mb-4">by Author • Aug 2025</p>
      <p className="mb-6">
        This is the full content of blog {id}. Here you can add paragraphs,
        images, and comments section.
      </p>

      <div className="flex space-x-4">
        <button className="text-blue-500">👍 Like</button>
        <button className="text-green-500">💬 Comment</button>
        <button className="text-purple-500">🔗 Share</button>
      </div>
      
    </div>
    </>
  );
}

export default BlogDetail;
