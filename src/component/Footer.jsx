import React from "react";

function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-300 py-4 text-center mt-6">
      <p>© {new Date().getFullYear()} MyBlog. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
