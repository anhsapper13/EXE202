import React from 'react'

const ForumTips = () => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Tips for a Great Discussion</h2>
        <ul className="space-y-3">
          <li className="flex items-start">
            <div className="mr-2 mt-1 text-blue-500">•</div>
            <p>Be specific in your title to attract the right audience</p>
          </li>
          <li className="flex items-start">
            <div className="mr-2 mt-1 text-blue-500">•</div>
            <p>Add relevant details to help others understand your question</p>
          </li>
          <li className="flex items-start">
            <div className="mr-2 mt-1 text-blue-500">•</div>
            <p>Use appropriate tags to categorize your discussion</p>
          </li>
          <li className="flex items-start">
            <div className="mr-2 mt-1 text-blue-500">•</div>
            <p>Be respectful and follow community guidelines</p>
          </li>
        </ul>
        
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium text-blue-700 mb-2">Need more help?</h3>
          <p className="text-sm text-blue-600">
            Check out our <span className="underline cursor-pointer">forum guide</span> or 
            contact a <span className="underline cursor-pointer">community moderator</span>.
          </p>
        </div>
      </div>
  )
}

export default ForumTips