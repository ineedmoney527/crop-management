import React, { useState } from "react";
import "./Gamification.css";
import jessi from "./images/jessi.jpg";
import badges from "./images/badges-icon-1.png";
import badges2 from "./images/badges-icon-2.png";
import badges3 from "./images/badges-icon-3.png";
import badges4 from "./images/badges-icon-4.png";
import icon from "./images/ion_person-circle-sharp.png";

const Gamification = () => {
  const [showAllGoals, setShowAllGoals] = useState(false);

  const toggleView = () => {
    setShowAllGoals(!showAllGoals);
  };

  const goalsData = [
    { image: badges, title: "Quizzes badge" },
    { image: badges2, title: "Learning hours badge" },
    { image: badges3, title: "Project badge" },
    { image: badges4, title: "Plant badge" },
  ];

  const renderGoalItems = () => {
    return goalsData.map((goal, index) => (
      <div key={index} className={"goal-1-info"}>
        <img src={goal.image} alt={"badges"} className={"goal-1-info-icon"} />
        <div className={"goal-1-info-title"}>
          <label>{goal.title}</label>
        </div>
      </div>
    ));
  };

  return (
    <div className="chat-container">
      <div className={"gamification-row"}>
        <div className={"gamification-content"}>
          <div className={"personal"}>
            <div className={"personal-icon"}>
              <img src={jessi} alt={"icon"} className={"personal-icon"} />
            </div>
            <div className={"personal-information"}>
              <label>User ID: ykkkkk</label>
              <label>Level: 15</label>
              <progress
                value="5"
                max="10"
                className={"level-progress"}
              ></progress>
              <label>Ranking: Silver</label>
            </div>
          </div>

          <div className={"accomplishment-button"}>
            <button
              className={
                showAllGoals
                  ? "accomplishment-button-not-select"
                  : "accomplishment-button"
              }
              onClick={toggleView}
            >
              Current
            </button>
            <button
              className={
                showAllGoals
                  ? "accomplishment-button"
                  : "accomplishment-button-not-select"
              }
              onClick={toggleView}
            >
              All Goals
            </button>
          </div>

          {showAllGoals ? (
            <div className={"all-goals"}>
              <div className={"goals-1"}>
                <div className={"goal-1-info-row"}>
                  {renderGoalItems().slice(0, 3)}
                </div>
                <div className={"goal-1-info-row"}>
                  {renderGoalItems().slice(3, 4)}
                </div>
              </div>
            </div>
          ) : (
            <div className={"current-accomplishment"}>
              <div className={"current-1"}>
                <div className={"current-1-info"}>
                  <img
                    src={badges}
                    alt={"badges"}
                    className={"current-1-info-icon"}
                  />
                  <div className={"current-1-info-column"}>
                    <div className={"current-1-info-title"}>
                      <label> Complete 10 quizzes </label>
                      <label> 3/10 </label>
                    </div>
                    <progress value="3" max="10"></progress>
                  </div>
                </div>

                <div className={"current-1-info"}>
                  <img
                    src={badges2}
                    alt={"badges"}
                    className={"current-1-info-icon"}
                  />
                  <div className={"current-1-info-column"}>
                    <div className={"current-1-info-title"}>
                      <label> Complete 10 hours of learning </label>
                      <label> 8/10 </label>
                    </div>
                    <progress value="8" max="10"></progress>
                  </div>
                </div>

                <div className={"current-1-info"}>
                  <img
                    src={badges3}
                    alt={"badges"}
                    className={"current-1-info-icon"}
                  />
                  <div className={"current-1-info-column"}>
                    <div className={"current-1-info-title"}>
                      <label> Complete 5 projects </label>
                      <label> 2/5 </label>
                    </div>
                    <progress value="2" max="5"></progress>
                  </div>
                </div>

                <div className={"current-1-info"}>
                  <img
                    src={badges4}
                    alt={"badges"}
                    className={"current-1-info-icon"}
                  />
                  <div className={"current-1-info-column"}>
                    <div className={"current-1-info-title"}>
                      <label> Plant 6 crops </label>
                      <label> 2/6 </label>
                    </div>
                    <progress value="2" max="6"></progress>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className={"ranking-bar"}>
          <label className={"ranking-title"}>Ranking</label>

          <div className={"ranking-person"}>
            <label>1</label>
            <img src={icon} alt={"icon"} className={"ranking-icon"} />
            <label>Olivia</label>
            <label className={"ranking-level"}>lvl 46</label>
          </div>

          <div className={"ranking-person"}>
            <label>2</label>
            <img src={icon} alt={"icon"} className={"ranking-icon"} />
            <label>Ke Xin</label>
            <label className={"ranking-level"}>lvl 45</label>
          </div>

          <div className={"ranking-person"}>
            <label>3</label>
            <img src={icon} alt={"icon"} className={"ranking-icon"} />
            <label>Xin Win</label>
            <label className={"ranking-level"}>lvl 44</label>
          </div>
          <div className={"ranking-person"}>
            <label>4</label>
            <img src={icon} alt={"icon"} className={"ranking-icon"} />
            <label>Shu ao</label>
            <label className={"ranking-level"}>lvl 43</label>
          </div>
          <div className={"ranking-person"}>
            <label>5</label>
            <img src={icon} alt={"icon"} className={"ranking-icon"} />
            <label>Hana</label>
            <label className={"ranking-level"}>lvl 42</label>
          </div>
          <div className={"ranking-person"}>
            <label>6</label>
            <img src={icon} alt={"icon"} className={"ranking-icon"} />
            <label>Zi Han</label>
            <label className={"ranking-level"}>lvl 41</label>
          </div>
          <div className={"ranking-person"}>
            <label>7</label>
            <img src={icon} alt={"icon"} className={"ranking-icon"} />
            <label>Yi Kiat</label>
            <label className={"ranking-level"}>lvl 40</label>
          </div>
          <div className={"ranking-person"}>
            <label>8</label>
            <img src={icon} alt={"icon"} className={"ranking-icon"} />
            <label>Shao Ai</label>
            <label className={"ranking-level"}>lvl 39</label>
          </div>
          <div className={"ranking-person"}>
            <label>9</label>
            <img src={icon} alt={"icon"} className={"ranking-icon"} />
            <label>Samson</label>
            <label className={"ranking-level"}>lvl 38</label>
          </div>
          <div className={"ranking-person"}>
            <label>10</label>
            <img src={icon} alt={"icon"} className={"ranking-icon"} />
            <label>Charlotte</label>
            <label className={"ranking-level"}>lvl 37</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Gamification;
