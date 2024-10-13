import "./chatBot.css";
import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import NavBar from "./Navbar";import { saveResponseAsync, selectLoggedInUser } from "./authSlice";
import { useDispatch, useSelector } from "react-redux";

function ChatBotInterface() {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);
  const [responseTemp, setResponseTemp] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [saveResponseBtn,setSaveResponseBtn] = useState(false)
  const user = useSelector(selectLoggedInUser)
  
  
  const handleSubmit = async (evt) => {
    evt.preventDefault();

    if (inputMessage !== "") {
      // setInputMessage("");
      let response = await fetch("https://truegradientbackend.onrender.com/response");
      response = await response.json();   
      
      const data = response.data;
      
      if (data) {
        const response_temp = {};

        response_temp["summary"] = data.summary;
        response_temp["result_text"] = data.result_text;
        if (data.result_table_path) {
          response_temp["result_table"] = data.result_table_path;
        }
        if (data.result_visualization_path) {
          response_temp["result_viz"] = data.result_visualization_path;
        }
        if (data.error) {
          setError(data.error);
          response_temp["error"] = data.error;
        }

        setResponseTemp(response_temp);
        setSaveResponseBtn(true);
      }
    } else {
      window.alert("Please enter valid query");
    }
  };


  const handleSaveResponse = async(userId,responseTemp)=>{

    try{
      let newResponse = responseTemp;
      newResponse['query'] = inputMessage
      
      dispatch(saveResponseAsync({userId,newResponse}))
      setSaveResponseBtn(false);
    }
    catch(err){
      console.log(err);
    }
  }

  return (
   <>
   <NavBar/>
   <div>
      <div className="container">
        <div className="row justify-content-center">
          <div
            className="card"
            style={{
              border: "1px solid black",
              marginLeft:'auto',
              marginRight:'auto',
              borderRadius: "30px",
              width:400,
              boxShadow: "0 16px 20px 0 rgba(0,0,0,0.4)",
            }}
          >
            <div
              className="cardHeader text-white"
              style={{
                height: "4rem",
                borderBottom: "1px solid black",
                borderRadius: "30px 30px 0px 0px",
                backgroundColor: "#8012c4",
              }}
            >
              <h1 style={{ textAlign:'center',paddingTop:15,fontSize:25}}>AI Assistant</h1>
            </div>
            <div
              className="cardBody"
              id="messageArea"
              style={{
                height: "20rem",
                overflowY: "a",
                overflowX: "hidden",
              }}
            >
              <div
                className="row msgarea"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginLeft:5
                }}
              >
                <div
                  className="msgalignend"
                  style={{ display: "flex", flexDirection: "column", }}
                >
                  {Object.entries(responseTemp).map(([key, value]) => (
                    <div key={key}>
                      <strong>
                        {key}: {value}
                      </strong>
                    </div>
                  ))}
                  {saveResponseBtn?<button type="button" className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-sm text-sm px-2.5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={()=>handleSaveResponse(user.data._id,responseTemp)}>Save Response</button>:null}
                </div>
              </div>
            </div>
            <div
              className="cardFooter text-white"
              style={{
                borderTop: "1px solid black",
                borderRadius: "0px 0px 30px 30px",
                backgroundColor: "#8012c4",
              }}
            >
              <div className="row" >
                <form
                  style={{ display: "flex", flexDirection: "row" ,justifyContent:'space-between'}}
                  onSubmit={handleSubmit}
                >
                  <div  style={{ paddingRight: "0px" ,width:300,color:'black'}}>
                    <input
                      onChange={(e) => setInputMessage(e.target.value)}
                      value={inputMessage}
                      type="text"
                      className="msginp"
                    ></input>
                  </div>
                  <div style={{marginRight:0}}>
                    <button type="submit" className="circleBtn" style={{justifyContent:'center' ,display:'flex',alignItems:'center'}}>
                      <IoMdSend className="sendBtn" />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
   </>
  );
}

export default ChatBotInterface;
