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
import PostList from "./PostList.js";
import SearchPostList from "./SearchPostList.js";
import AddPost from "./AddNewPost.js";
import Irrigation from "./Irrigation.js";
import Scheduler from "./Scheduler.js";
import Encyclopedia from "./Encyclopedia.js";
import Details from "./CropDetails/Details";
import Weather from "./Weather.js";
import Accounting from "./Accounting.js";
import CartPage from "./CartPage.js";
import CropSummary from "./CropSummary.js";
import Quiz from "./Quiz.js";
import { useState } from "react";
function App() {
  const [name, setName] = useState("");
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Accounting />} />
          <Route path="/fields" element={<Map />} />
          <Route path="/SmartDoctor" element={<SmartDoctor />} />
          <Route path="/ChatBot" element={<ChatBot />} />
          <Route path="/Chatbot/ChatBotAnswer" element={<ChatBotAnswer />} />
          <Route path="/game" element={<Gamification />} />

          <Route
            path="/Encyclopedia"
            element={<Encyclopedia setName={setName} />}
          />
          <Route path="/Irrigation" element={<Irrigation />} />
          <Route path="CropDetails/Details/:name" element={<Details name={name} />} />
          <Route path="/Learning" element={<Learning />} />
          <Route path="/Learning2" element={<Learning2 />} />
          <Route path="/Learning3" element={<Learning3 />} />
          <Route path="/Quiz" element={<Quiz />} />
          <Route path="/Market" element={<MarketStore />} />
          <Route exact path="/cart" component={CartPage} />
          <Route path="/Forum" element={<PostList />} />
          <Route path="/SearchPostList" element={<SearchPostList />} />
          <Route path="/AddNewPost" element={<AddPost />} />
          <Route path="/Scheduler" element={<Scheduler />} />
          <Route path="/Weather" element={<Weather />} />
          <Route path="/Accounting" element={<Accounting />} />
          <Route path="/CropSummary" element={<CropSummary />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
