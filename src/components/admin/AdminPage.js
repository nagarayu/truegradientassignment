import React, { useEffect, useState } from "react";
import UserResponses from "./UserResponses"; // Import your component if it's separate
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersAsync } from "../authSlice";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const dispatch = useDispatch();
  const [selectedResponse, setSelectedResponse] = useState([]); // Track selected responses
  const navigate=  useNavigate();
  useEffect(() => {
    dispatch(getAllUsersAsync());
  }, [dispatch]);
  const handleGetResponse = (responses) => {
    navigate('/admin-user-responses', { state: { responsesArray: responses } });
  };

  
  const users = useSelector((state) => state.auth.users);

  return (
    <>
      <h1 style={{ textAlign: "center", fontSize: 40, fontStyle: "bold" }}>
        All Users
      </h1>
      <div className="max-w-6xl mx-auto p-4">
        <div className="grid grid-cols-1 gap-6">
          {users.map(
            (user, index) =>
              user.role !== "admin" && (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md"
                  onClick={() => {
                    console.log("clicked");
                    handleGetResponse(user?.responses); // Set selected responses
                  }}
                >
                  <div className="flex items-center space-x-4">
                    <div>
                      <h2 className="text-md font-semibold">Id: {user._id}</h2>
                      <h2 className="text-md font-semibold">
                        Name: {user.name}
                      </h2>
                      <p className="text-sm text-gray-500">
                        Email: {user.email}
                      </p>
                      <p className="text-sm text-gray-500">Role: {user.role}</p>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </div>

      {/* Conditionally render UserResponses component when a response is selected */}
      {/* {selectedResponse && <UserResponses responses={selectedResponse} />} */}
    </>
  );
};

export default AdminPage;
