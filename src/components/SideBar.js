import React from "react";
import * as FaIcons from "react-icons/fa6";
import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import * as RiIcons from "react-icons/ri";
import * as GIIcons from "react-icons/gi";
import "./NavBar.css";
const style = { color: "black", fontSize: "25px" };
export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <AiIcons.AiFillHome style={style} />,
    cName: "nav-text",
  },
  {
    title: "Fields",
    path: "/fields",
    icon: <RiIcons.RiPlantFill style={style} />,
    cName: "nav-text",
  },

  {
    title: "Chatbot",
    path: "/Chatbot",
    icon: <FaIcons.FaUserDoctor style={style} />,
    cName: "nav-text",
  },
  {
    title: "Farmer Quest",
    path: "/game",
    icon: <FaIcons.FaGamepad style={style} />,
    cName: "nav-text",
  },
  {
    title: "Learning",
    path: "/Learning",
    icon: <GIIcons.GiTeacher style={style} />,
    cName: "nav-text",
  },
  {
    title: "Market",
    path: "/Market",
    icon: <AiIcons.AiFillShop style={style} />,
    cName: "nav-text",
  },
  {
    title: "Forum",
    path: "/Forum",
    icon: <FaIcons.FaForumbee style={style} />,
    cName: "nav-text",
  },

  {
    title: "Scheduler",
    path: "/Scheduler",
    icon: <AiIcons.AiFillCalendar style={style} />,
    cName: "nav-text",
  },
];
