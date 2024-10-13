import React, { useEffect } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import { useDispatch, useSelector } from "react-redux";
import ErrorPage from "./components/ErrorPage";
import ChatBotInterface from "./components/ChatBotInterface";
import Protected from "./components/Protected";
import LoginPage from "./components/LoginPage";
import { selectLoggedInUser } from "./components/authSlice";
import SignUpPage from "./components/SignUpPage";
import Logout from "./components/Logout";
import SavedResponses from "./components/SavedResponses";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protected>
        <ChatBotInterface></ChatBotInterface>
      </Protected>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  }, 
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: '/logout',
    element: <Logout></Logout>,
  },
  {
    path:'/saved-responses',
    element:<Protected><SavedResponses></SavedResponses></Protected>
  },
  {
    path: "*",
    element: <ErrorPage></ErrorPage>,
  },
]);

function App() {
  const dispatch = useDispatch();
  let user = useSelector(selectLoggedInUser);

  useEffect(() => {
    // if (user) {
    //   dispatch(fetchItemsByUserIdAsync());
    // }
  }, [dispatch, user]);
  return <RouterProvider router={router} />;
}

export default App;
