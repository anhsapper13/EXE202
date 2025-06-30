import React from "react";

const PostComment = () => {
  return <div>
    <h2 className="text-lg font-semibold mb-4">Post a Comment</h2>
    <form className="bg-white p-4 rounded shadow-md">
      <textarea
        className="w-full h-24 p-2 border border-gray-300 rounded mb-4"
        placeholder="Write your comment here..."
      ></textarea>
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
      >
        Submit Comment
      </button>
    </form>
  </div>;
};

export default PostComment;
