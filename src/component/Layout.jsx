// Layout.jsx
import React from "react";
import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <div className="bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-white min-h-screen">
      <Navbar />
      <main className="p-4">{children}</main>
    </div>
  );
}

export default Layout;
