import React from "react";
import BlogCard from "../BlogCard";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

function Home() {
  const [popup, setPopup] = useState(false);
  const [user, setUser]=useState();
  const [id,setId]=useState();
  const[blogdata,setBlogdata]=useState();
  const [postdata,setPostdata]=useState({
    heading:"",
    description:""
  })

  useEffect(()=>{
    const fetchUser=async()=>{
      try {
        const res=await axios.get("http://localhost:8000/profile",{withCredentials:true});
        console.log(res.data.user,"user data");
        console.log(res.data.user.name,"user name");
        console.log(res.data.user._id,"user id");
        // setUser(res.data)

        setUser(res.data.user);
        setId(res.data.user._id);
      } catch (error) {
        console.log(error,"error to fetch user"); 
      }
    }
    fetchUser();
  },[])

  const handlepopup=()=>{
    setPopup(!popup);
  }

  const handlecreatepost=(e)=>{
    setPostdata({
      ...postdata,[e.target.name]:e.target.value
    })
  }

  const createBlogDetail=async()=>{
      try{
        const blogdetail=await axios.post("http://localhost:8000/createpost",postdata,{withCredentials:true});
        console.log(blogdetail,"blogdetail");
        setPopup(false);
        window.location.reload(); 
      }catch(err){
        console.log(err,"error");
      }
    }

  return (
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 px-4 py-6 h-screen">
      
      {/* Left Sidebar */}
      <aside className="hidden md:block md:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 h-fit sticky top-6 self-start">
        <h3 className="font-semibold mb-3">User Info</h3>
        <div className="bg-gray-300 w-20 h-20 rounded-full mx-auto mb-2"></div>
        <p className="text-center">{user?.name}</p>
        <p className="text-center text-sm text-gray-500 dark:text-gray-400">Blogger</p>
        <div className="mt-4 text-center">
          <button
            className="border-2 rounded-4xl bg-blue-500 px-3 py-1 text-center font-bold hover:bg-blue-600"
            onClick={handlepopup}
          >
            Create Post
          </button>
        </div>
      </aside>

      {/* Blogs (scrollable center feed) */}
      <main className="md:col-span-2 h-[calc(100vh-3rem)] overflow-y-auto pr-2">
        <BlogCard />
        {/* <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard /> */}
      </main>

      {/* Right Sidebar */}
      <aside className="hidden md:block md:col-span-1 bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 h-fit sticky top-6 self-start">
        <h3 className="font-semibold mb-3">Sponsored</h3>
        <div className="bg-gray-200 dark:bg-gray-700 h-32 mb-3 flex items-center justify-center">
          Ad 1
        </div>
        <div className="bg-gray-200 dark:bg-gray-700 h-32 mb-3 flex items-center justify-center">
          Ad 2
        </div>
      </aside>

      {/* Popup */}
      {popup && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Create Post</h2>
            <input
              name="heading"
              type="text"
              onChange={handlecreatepost}
              placeholder="Enter heading"
              className="w-full mb-3 p-2 border rounded"
            />
            <textarea
              name="description"
              onChange={handlecreatepost}
              placeholder="Enter description"
              className="w-full mb-3 p-2 border rounded h-24"
            ></textarea>
            <div className="flex justify-end gap-3">
              <button
                onClick={handlepopup}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                onClick={createBlogDetail}
              >
                Send Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

}

export default Home;
