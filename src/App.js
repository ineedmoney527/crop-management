import React from "react";
import "./App.css";
import Navbar from "./components/NavBar.js";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Map from "./Map.js";
import SmartDoctor from "./SmartDoctor.js";
import ChatBot from "./ChatBot.js";
import ChatBotAnswer from "./ChatBotAnswer.js";
import Gamification from "./Gamification.js";
import Learning from "./Learning.js";
import Learning2 from "./Learning2.js";
import Learning3 from "./Learning3.js";
import MarketStore from "./MarketStore.js";
import Post from "./Post.js";
import WithNavigate from "./PostList.js";
import SearchPostList from "./SearchPostList.js";
import AddPost from "./AddNewPost.js";
import Scheduler from "./Scheduler.js";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/fields" element={<Map />} />
          <Route path="/SmartDoctor" element={<SmartDoctor />} />
          <Route path="/ChatBot" element={<ChatBot />} />
          <Route path="/Chatbot/ChatBotAnswer" element={<ChatBotAnswer />} />
          <Route path="/game" element={<Gamification />} />
          <Route path="/Learning" element={<Learning />} />
          <Route path="/Learning2" element={<Learning2 />} />
          <Route path="/Learning3" element={<Learning3 />} />
          <Route path="/Market" element={<MarketStore />} />
          <Route path="/Forum" element={<WithNavigate />} />
          <Route path="/SearchPostList" element={<SearchPostList />} />
          <Route path="/AddNewPost" element={<AddPost />} />
          <Route path="/Scheduler" element={<Scheduler />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
