import React from "react";

function UserResponses(responses) {
    
    
  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="grid grid-cols-1 gap-6">
        {responses.map((response, index) => (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center space-x-4">
              <div>
                <h2 className="text-md font-semibold">
                  Query:- {response.query}
                </h2>
                <p className="text-sm text-gray-500">
                  Summary:- {response.summary}
                </p>
                <p className="text-sm text-gray-500">
                  Result Text:- {response.result_text}
                </p>
                <p className="text-sm text-gray-500">
                  Result Table Path:- {response.result_table}
                </p>
                <p className="text-sm text-gray-500">
                  Result visualiztion Path:- {response.result_viz}
                </p>
                <p className="text-sm text-gray-500">
                  Error:- {response.error}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserResponses;
