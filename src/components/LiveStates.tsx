import { useState } from "react";
import goal from "../assets/images/goal.svg";
import penalty from "../assets/images/penalty.svg";

interface Goal {
  team: "Home" | "Away";
  playerNo: number;
  minute: number;
}

interface Penalty {
  team: "Home" | "Away";
  type: string; // "illegal" | "legal"
  playerNo: number;
  minutes: number;
  seconds: number;
}

interface AddProps {
  title: "home" | "away";
  goals?: Goal[];
  penalties?: Penalty[];
  name:any
}

export default function LiveStatsTracker({
  title,
  goals = [],
  penalties = [],
  name,
}: AddProps) {
  const [activeTab, setActiveTab] = useState<"goal" | "penalty">("goal");

  // filter only this team's events
  const teamGoals = goals.filter((g) => g.team.toLowerCase() === title);
  const teamPenalties = penalties.filter((p) => p.team.toLowerCase() === title);

  const events = activeTab === "goal" ? teamGoals : teamPenalties;

  return (
    <>
      <div className="traker-top">
        <div
          className={`btn btn-secendary ${activeTab === "goal" ? "active" : ""}`}
          onClick={() => setActiveTab("goal")}
        >
          <span>
            <img src={goal} alt="goal" />
          </span>
          Goal
        </div>

        <h6>{name?name.toUpperCase():""}</h6>

        <div
          className={`btn btn-primary ${activeTab === "penalty" ? "active" : ""}`}
          onClick={() => setActiveTab("penalty")}
        >
          <span>
            <img src={penalty} alt="penalty" />
          </span>
          Penalty
        </div>
      </div>

      <ul className="traker-list">
        {events.length === 0 ? (
          <li className="no-datatrac">
            <div className="traker-content">
              <p>
                {activeTab === "goal" ? "No goals yet" : "No penalties yet"}
              </p>
            </div>
          </li>
        ) : activeTab === "goal" ? (
          events.map((g:any, i) => (
            <li key={i}>
              <div className="traker-icon green">
                <img src={goal} alt="goal" />
              </div>
              <div className="traker-content">
                <h5>Goal by #{g.playerNo}</h5>
                <p>
                  {title.toUpperCase()} - {g.minute}:00
                </p>
              </div>
            </li>
          ))
        ) : (
          events.map((p:any, i) => (
            <li key={i}>
              <div className="traker-icon orange">
                <img src={penalty} alt="penalty" />
              </div>
              <div className="traker-content">
                <h5>
                  {p.type} - #{p.playerNo}
                </h5>
                <p>
                  {title.toUpperCase()} - {p.minutes}:{p.seconds}
                </p>
              </div>
            </li>
          ))
        )}
      </ul>
    </>
  );
}
