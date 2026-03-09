import { useEffect, useState } from "react";
import iconngo from "../assets/images/icon-ngo.svg";
import iconclock from "../assets/images/icon-clock.svg";
import iconaway from "../assets/images/icon-away.svg";
import setclock from "../assets/images/clock.svg";
import playbtn from "../assets/images/play-icon.svg";
import pausebtn from "../assets/images/pause-icon.svg";
import plus from "../assets/images/plus.svg";
import minus from "../assets/images/minus.svg";

interface Props {
  gameStatistics: any;
  setGameStatistics: React.Dispatch<React.SetStateAction<any>>; // ✅ add this
  socketEmit: (event: string, payload: any) => void;
  game: any;
}

export default function ScoreKeeperComponent({ gameStatistics,setGameStatistics, socketEmit,game }: Props) {
  const gameId = gameStatistics?.gameId;
  const [homeScore, setHomeScore] = useState<number>(gameStatistics?.homeTeam?.score || 0);
  const [awayScore, setAwayScore] = useState<number>(gameStatistics?.awayTeam?.score || 0);
  const [quarter, setQuarter] = useState<number>(gameStatistics?.clock?.quarter || 0);
  const [minutes, setMinutes] = useState<number>(gameStatistics?.clock?.minutes || 0);
  const [seconds, setSeconds] = useState<number>(gameStatistics?.clock?.seconds || 0);
  const [running, setRunning] = useState<boolean>(gameStatistics?.clock?.running || false);

  // Listen for updates from parent (which gets them from socket)
  useEffect(() => {
    if (!gameStatistics?.clock) return;
    setQuarter(gameStatistics.clock.quarter);
    setMinutes(gameStatistics.clock.minutes);
    setSeconds(gameStatistics.clock.seconds);
    setRunning(gameStatistics.clock.running);
    setHomeScore(gameStatistics.homeTeam?.score || 0);
    setAwayScore(gameStatistics.awayTeam?.score || 0);
  }, [gameStatistics]);

  // Format mm:ss
  const formatTime = (m: number, s: number) =>
    `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;

  // Score control
  const handleUpdateScore = (team: "home" | "away", delta: number) => {
    let newScore = team === "home" ? homeScore + delta : awayScore + delta;
    if (newScore < 0) newScore = 0;

    if (team === "home") setHomeScore(newScore);
    else setAwayScore(newScore);

    setGameStatistics((prev: any) => ({
      ...prev,
      [team === "home" ? "homeTeam" : "awayTeam"]: {
        ...prev[team === "home" ? "homeTeam" : "awayTeam"],
        score: newScore,
      },
    }));

    socketEmit("setScore", { gameId, team, value: newScore });
  };

  // Score quater
  const handleUpdateQuater = ( delta: number) => {
    let newScore = quarter + delta ;
    if (newScore < 0) newScore = 0;
    setQuarter(newScore);
    setGameStatistics((prev: any) => ({
      ...prev,
      clock: {
        ...prev.clock,
        quarter: newScore,
      },
    }));
    socketEmit("setQuater", { gameId, quarter: newScore });
  };

  // Clock controls
  const handleToggleTimer = () => {
    if (running) {
      socketEmit("pauseClock", { gameId });
    } else {
      socketEmit("startClock", { gameId });
    }
  };

  const handleSetClock = () => {
    socketEmit("setClock", { gameId, minutes, seconds });
  };

  const handleReset = () => {
    socketEmit("resetGame", { gameId });
  };

  return (
    <div className="score-board-otr">
      <div className="row m-0 score-keeper justify-content-center">
        {/* Home */}
        <div className="col-md-4 score-card-innr p-0">
          <div className="score-card">
            <div className="score-icon"><img src={game?.homeTeamLogo?game?.homeTeamLogo:iconngo} alt="home icon" /></div>
            <h3>{game?.homeTeamName}</h3>
            <div className="score-content">
              <div className="quantity">
                <button className="qty-btn" onClick={() => handleUpdateScore("home", -1)}><img src={minus} alt="-" /></button>
                <input type="number" value={homeScore} min={0} onChange={(e) => handleUpdateScore("home", Number(e.target.value) - homeScore)} />
                <button className="qty-btn" onClick={() => handleUpdateScore("home", 1)}><img src={plus} alt="+" /></button>
              </div>
              <ul>
                {gameStatistics?.goals
                  ?.filter((g: any) => g.team.toLowerCase() === "home")
                  .map((g: any, i: number) => (
                    <li key={i}>{g.minute}’ #{g.playerNo}</li>
                  ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Timer */}
        <div className="col-md-4 score-card-innr p-0">
          <div className="score-card">
            <div className="score-icon"><img src={iconclock} alt="clock icon" /></div>
            <h3>Quarter</h3>
            <div className="score-content pb-0">
              <div className="quantity">
                <button className="qty-btn" onClick={() => handleUpdateQuater(-1)}><img src={minus} alt="-" /></button>
                <input type="number" value={quarter} min={1} onChange={(e) => setQuarter(Number(e.target.value))} />
                <button className="qty-btn" onClick={() => handleUpdateQuater(+1)}><img src={plus} alt="+" /></button>
              </div>
              <div className="timer">
                <span>{formatTime(minutes, seconds)}</span>
              </div>
            </div>

            <div className="set-clock">
              <div className="time-select">
                <select  onChange={(e) => setMinutes(Number(e.target.value))} className="form-control">
                  {Array.from({ length: 60 }, (_, i) => <option key={i} value={i}>{i} Min</option>)}
                </select>
                <select  onChange={(e) => setSeconds(Number(e.target.value))} className="form-control">
                  {Array.from({ length: 60 }, (_, i) => <option key={i} value={i}>{i} Sec</option>)}
                </select>
              </div>
              <div className="clock" onClick={handleSetClock} style={{ cursor: "pointer" }}>
                Set Clock <span><img src={setclock} alt="set clock" /></span>
              </div>
              <button className="play-btn" onClick={handleToggleTimer}>
                <img src={running ? pausebtn : playbtn} alt={running ? "pause" : "play"} />
              </button>
            </div>
          </div>
        </div>

        {/* Away */}
        <div className="col-md-4 score-card-innr p-0">
          <div className="score-card">
            <div className="score-icon"><img src={game?.awayTeamLogo?game?.awayTeamLogo:iconaway} alt="away icon" /></div>
            <h3>{game?.awayTeamName}</h3>
            <div className="score-content">
              <div className="quantity">
                <button className="qty-btn" onClick={() => handleUpdateScore("away", -1)}><img src={minus} alt="-" /></button>
                <input type="number" value={awayScore} min={0} onChange={(e) => handleUpdateScore("away", Number(e.target.value) - awayScore)} />
                <button className="qty-btn" onClick={() => handleUpdateScore("away", 1)}><img src={plus} alt="+" /></button>
              </div>
              <ul>
                {gameStatistics?.goals
                  ?.filter((g: any) => g.team.toLowerCase() === "away")
                  .map((g: any, i: number) => (
                    <li key={i}>{g.minute}’ #{g.playerNo}</li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Reset */}
      <div className="text-center mt-30 d-none d-md-block">
        <button type="button" className="btn btn-primary" onClick={handleReset}>Reset Game</button>
      </div>
    </div>
  );
}