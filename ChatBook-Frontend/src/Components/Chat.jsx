import { Button } from "@mui/material";
import { Send } from "@mui/icons-material";
import { useEffect, useState } from "react";
import openSocket from "socket.io-client";

export default function Chat() {
  const [myMessages, setMyMessages] = useState(null);
  const [userName, setUserName] = useState("User1");
  const [text, setText] = useState("");
  const [isChangingUserName, setIsChangingUserName] = useState(false);

  useEffect(() => {
    const socket = openSocket("http://localhost:3000");
    async function getMessages() {
      const response = await fetch("http://localhost:3000");
      if (!response.ok) {
        console.log("Error ocured while fetching messages!");
      } else {
        const data = await response.json();
        setMyMessages(data);

        console.log("Messages arrived!");
      }
    }
    try {
      getMessages();
    } catch (error) {
      throw new Error(error);
    }
    socket.on("allMessages", (data) => {
      if (data.action === "sent") {
        setMyMessages((prevMessages) => {
          return [...prevMessages, data.text];
        });
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  async function submitHandler(e) {
    e.preventDefault();
    const message = {
      userName,
      message: text,
    };
    try {
      const response = await fetch("http://localhost:3000/", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });
      if (!response.ok) {
        throw new Error("Bad response!");
      } else {
        console.log("Message sent!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function onChangeHandler(e) {
    const id = e.target.id;
    const val = e.target.value;
    switch (id) {
      case "userName":
        setUserName(val);
        break;
      case "message":
        setText(val);
        break;
      default:
        console.log("wrong case");
        break;
    }
  }
  return (
    <>
      <form onSubmit={(e) => submitHandler(e)}>
        <div>
          <label htmlFor="userName"></label>
          <input
            id="userName"
            disabled={!isChangingUserName}
            onChange={onChangeHandler}
            type="text"
            value={userName}
            placeholder="Your Name"
          ></input>
          <Button
            variant="text"
            onClick={() => {
              setIsChangingUserName((prevState) => !prevState);
            }}
          >
            {isChangingUserName ? "Done" : "Change"}
          </Button>
        </div>
        <label htmlFor="message">Your message</label>
        <input
          id="message"
          onChange={onChangeHandler}
          value={text}
          type="text"
          placeholder="Type here"
        ></input>
        <Button
          type="submit"
          variant="outlined"
          sx={{ margin: "1rem" }}
          endIcon={<Send />}
        >
          Send
        </Button>
      </form>
      <section>
        <div>
          <h3>Your Chat</h3>
        </div>
        <div>
          {myMessages === null ? (
            <p>No new messages!</p>
          ) : (
            <ol>
              {myMessages.map((eachMessage) => {
                return (
                  <li key={Math.random()}>
                    {eachMessage.username}:{eachMessage.message}
                  </li>
                );
              })}
            </ol>
          )}
        </div>
      </section>
    </>
  );
}
