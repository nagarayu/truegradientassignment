export function createUser(userData) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/auth/signup", {
        method: "POST",
        body: JSON.stringify(userData),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      if (response.ok) {
        resolve({ data: data });
      } else {
        reject(data);
      }
    } catch (err) {
      reject(err);
    }
  });
}
export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {
    try {
      
      const response = await fetch("http://localhost:8080/auth/signin", {
        method: "POST",
        body: JSON.stringify(loginInfo),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();

      if (response.ok) {
        resolve({ data: data });
      } else {
        reject(data);
      }
    } catch (error) {
      reject(error);
    }
  });
}


export function checkAuth() {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/check");
      const data = await response.json();
      if (response.ok) {
        resolve({ data: data });
      } else {
        reject(data);
      }
    } catch (error) {
      reject(error);
    }
  });
}

export function getAllResponses(userId){
  return new Promise(async(resolve,reject)=>{
    try{
      const response = await fetch("http://localhost:8080/responses/"+userId);
      const data = await response.json();
      if(response.ok){
        resolve({data})
      }
      else{
        reject(data)
      }
    }
    catch(error){
      reject(error)
    }
  })
}

export function signOut(userId) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch('/auth/logout');
      if (response.ok) {
        resolve({ data:'success' });
      } else {
        const error = await response.text();
        reject(error);
      }
    } catch (error) {
      console.log(error)
      reject( error );
    }
  });
}

export function saveResponse(userId,newResponse) {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("http://localhost:8080/saveResponse/"+userId,{
        method:"POST",
        body:JSON.stringify(newResponse),
        headers:{
          'Content-Type':'application/json'
        },

      })
     
      const data = await response.json();
      resolve({data})
    } catch (error) {
      console.log(error)
      reject( error );
    }
  });
}
