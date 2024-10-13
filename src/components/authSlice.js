import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  loginUser,
  createUser,
  checkAuth,
  getAllResponses,
  signOut,
  saveResponse,
  getAllUsers

} from "./authAPI";

const initialState = {
  loggedInUser: null,
  status: "idle",
  error: null,
  responses:[],
  users:[]
};

export const createUserAsync = createAsyncThunk(
  "user/createUser",

  
  async (userData, { rejectWithValue }) => {
    try {
      const response = await createUser(userData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.data);
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  "user/loginUser",
  async (loginInfo, { rejectWithValue }) => {
    try {
      const response = await loginUser(loginInfo);
      
      return response.data;
    } catch (error) {
      return rejectWithValue(error.data);
    }
  }
);

export const checkAuthAsync = createAsyncThunk("user/checkAuth", async () => {
  try {
    const response = await checkAuth();
    return response.data;
  } catch (error) {}
});

export const getAllResponsesAsync = createAsyncThunk("user/getAllResponses", async (userId) => {
  try {
    const response = await getAllResponses(userId);
    return response.data;
  } catch (error) {}
});

export const signOutAsync = createAsyncThunk(
  'user/signOut',
  async () => {
    const response = await signOut();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const saveResponseAsync = createAsyncThunk(
  'user/saveResponse',
  async ({userId,newResponse}) => {
    
    const response = await saveResponse(userId,newResponse);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const getAllUsersAsync = createAsyncThunk(
  'user/getUsers',
  async () => {
    
    const response = await getAllUsers();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);



export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
        
      })
      .addCase(loginUserAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
        state.responses = state.loggedInUser.data.responses;
      })

      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })

      .addCase(checkAuthAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.loggedInUser = action.payload;
        // state.responses = state.loggedInUser.data?.responses;
      })
      .addCase(checkAuthAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(getAllResponsesAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.responses = action.payload;
      })
      .addCase(getAllResponsesAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(saveResponseAsync.fulfilled, (state, action) => {
        state.status = "idle"; 
        state.responses.push(action.payload.data);
      })
      .addCase(saveResponseAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      .addCase(getAllUsersAsync.fulfilled, (state, action) => {
        state.status = "idle";  
        state.users = action.payload.data;
        
      })
      .addCase(getAllUsersAsync.rejected, (state, action) => {
        state.status = "idle";
        state.error = action.payload;
      })
      ;
  },
});

export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;
export const selectUserChecked = (state) => state.auth.userChecked;
export const selectLoggedInUserSavedResponses = (state)=>state.auth.responses;


// export const { } = authSlice.actions;

export default authSlice.reducer;
