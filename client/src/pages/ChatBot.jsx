import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  List,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles"; // Import styled function
import axios from "axios";
import React, { useState, useEffect } from "react";
import icon from "../assets/icon.png";

const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user"))
  : null;

const ChatContainer = styled(Box)({
  // Create a styled component for ChatContainer
  display: "flex",
  flexDirection: "column",
  height: "100vh",
  padding: "16px",
});

const ChatBox = styled(Box)({
  // Create a styled component for ChatBox
  width: "1000%",
  height: "60%",
  maxHeight: "100vh",
  overflowY: "auto",
  border: "1px solid #ccc",
  padding: "16px",
  borderRadius: "8px",
  flexDirection: "column",

  marginBottom: "16px",
});

const InputContainer = styled(Box)({
  // Create a styled component for InputContainer
  display: "flex",
  alignItems: "center",
});

const TextFieldStyled = styled(TextField)({
  // Create a styled component for TextField
  flexGrow: 1,
  marginRight: "8px",
});

const ButtonStyled = styled(Button)({
  // Create a styled component for Button
  height: "56px",
});

const LoadingText = styled(ListItemText)({
  // Create a styled component for LoadingText
  fontStyle: "italic",
});

const getRandomColor = () => {
  const colors = ["#2196F3", "#4CAF50", "#FFC107", "#9C27B0", "#FF5722"];
  return colors[Math.floor(Math.random() * colors.length)];
};

export default function ChatBot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedMessages = localStorage.getItem("chatMessages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
    }
  }, []);

  // Load chat messages from localStorage
  const handleSend = async () => {
    if (input.trim() === "") return;

    const newMessage = { user: "User", text: input };
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    // Save all messages to localStorage
    localStorage.setItem("chatMessages", JSON.stringify(updatedMessages));

    setInput("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "/rules/generate",
        { prompt: input },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      let botResponseText = "";
      if (Array.isArray(data)) {
        const formattedData = data.map(
          (item) =>
            `<b>NAME: </b>${item.name}. <br /> <b> DESCRIPTION:</b> ${item.description}<br /><br /> <hr>`
        );
        botResponseText = formattedData.join("");
      } else if (typeof data === "object") {
        const name = `<b>NAME:</b>  ${data.name}`;
        const description = `<b>DESCRIPTION: </b> ${data.description}`;

        botResponseText = `${name}<br />${description}<br /><br />`;
      }

      const botMessage = { user: "Bot", text: botResponseText };
      setMessages([...updatedMessages, botMessage]);

      // Save all updated messages to localStorage
      localStorage.setItem(
        "chatMessages",
        JSON.stringify([...updatedMessages, botMessage])
      );
    } catch (error) {
      console.error("Error while generating text", error);
      const errorMessage = {
        user: "Bot",
        text: "Error: Unable to get a response.",
      };
      setMessages([...updatedMessages, errorMessage]);

      // Save error message to localStorage
      localStorage.setItem(
        "chatMessages",
        JSON.stringify([...updatedMessages, errorMessage])
      );
    }

    setLoading(false);
  };

  return (
    <Box sx={{ p: 5, minHeight: "10vh", maxWidth: "1200px", margin: "0 auto" }}>
      <ChatContainer>
        <Typography
          variant="h4"
          sx={{ display: "flex", alignItems: "center" }}
          gutterBottom
        >
          <Avatar src={icon} sx={{ marginRight: 1 }} />{" "}
          {/* Adjust the margin as needed */}
          ChatBot
        </Typography>

        <ChatBox
          sx={{ width: "90.5%", maxHeight: "1000vh", overflowY: "auto" }}
        >
          <List>
            {messages.map((message, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent:
                    message.user === "User" ? "flex-end" : "flex-start",
                  marginBottom: "8px",
                }}
              >
                {message.user === "User" && user && (
                  <Avatar
                    sx={{
                      bgcolor: getRandomColor(),
                      fontSize: 25,
                      margin: "auto 4px auto 0",
                    }}
                  >
                    {user.username && user.username.charAt(0).toUpperCase()}
                  </Avatar>
                )}
                {message.user === "Bot" && (
                  <Avatar src={icon} sx={{ margin: "auto 4px auto 0" }} />
                )}
                <Paper
                  sx={{
                    padding: "8px",
                    borderRadius: "12px",
                    backgroundColor:
                      message.user === "User" ? "#f0f0f0" : "#e0e0e0",
                  }}
                >
                  <Typography
                    variant="body1"
                    dangerouslySetInnerHTML={{ __html: message.text }}
                  ></Typography>
                </Paper>
              </Box>
            ))}
            {loading && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  marginBottom: "8px",
                }}
              >
                <Avatar src={icon} />
                <Paper
                  sx={{
                    padding: "8px",
                    borderRadius: "12px",
                    backgroundColor: "#f0f0f0",
                    marginLeft: "8px", // Add margin for spacing between Avatar and Paper
                  }}
                >
                  <Typography variant="body1">Bot is typing...</Typography>
                  <CircularProgress size={24} />
                </Paper>
              </Box>
            )}
          </List>
        </ChatBox>
        <InputContainer>
          <TextFieldStyled
            label="Type your message"
            variant="outlined"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleSend();
            }}
          />
          <ButtonStyled
            variant="contained"
            color="primary"
            onClick={handleSend}
            disabled={loading}
          >
            Send
          </ButtonStyled>
        </InputContainer>
      </ChatContainer>
    </Box>
  );
}
