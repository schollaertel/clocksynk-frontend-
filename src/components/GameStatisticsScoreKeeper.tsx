import { useState } from "react";
import plus from "../assets/images/plus.svg";
import minus from "../assets/images/minus.svg";

type GameStatsProps = {
  gameStatistics: any;
  setGameStatistics: React.Dispatch<React.SetStateAction<any>>; // ✅ add this
  emit: (event: string, payload: any) => void;
  game:any;
};

// provide safe defaults so stats.homeTeam / stats.awayTeam never undefined
const defaultStats = {
  gameId: null,
  homeTeam: { stats: { penalties: 0, shots: 0, saves: 0, fouls: 0 } },
  awayTeam: { stats: { penalties: 0, shots: 0, saves: 0, fouls: 0 } },
};

export default function GameStatisticsScoreKeeper({ gameStatistics,setGameStatistics, emit, game }: GameStatsProps) {
  const [stats, setStats] = useState(gameStatistics || defaultStats);

  // Generic function to update any stat
  const handleUpdateStat = (team: "home" | "away", field: string, delta: number) => {
    const teamKey = `${team}Team`;
    const currentVal = stats?.[teamKey]?.stats?.[field] || 0;
    let newVal = currentVal + delta;
    if (newVal < 0) newVal = 0;

    // Update local state safely
    setStats((prev: any) => ({
      ...prev,
      [teamKey]: {
        ...prev?.[teamKey],
        stats: {
          ...prev?.[teamKey]?.stats,
          [field]: newVal,
        },
      },
    }));
    setGameStatistics((prev: any) => ({
      ...prev,
      [teamKey]: {
        ...prev?.[teamKey],
        stats: {
          ...prev?.[teamKey]?.stats,
          [field]: newVal,
        },
      },
    }));
    // Emit socket update
    emit("setStat", {
      gameId: stats?.gameId,
      team,
      field,
      value: newVal,
    });
  };

  // Read values safely
  const homePenalties = stats?.homeTeam?.stats?.penalties || 0;
  const awayPenalties = stats?.awayTeam?.stats?.penalties || 0;

  const homeShots = stats?.homeTeam?.stats?.shots || 0;
  const awayShots = stats?.awayTeam?.stats?.shots || 0;

  const homeSaves = stats?.homeTeam?.stats?.saves || 0;
  const awaySaves = stats?.awayTeam?.stats?.saves || 0;

  const homeFouls = stats?.homeTeam?.stats?.fouls || 0;
  const awayFouls = stats?.awayTeam?.stats?.fouls || 0;

  return (
    <div className="cmn-box-wrapper p-36">
      <div className="statictics-wrapper">
        <div className="row statictics-otr align-items-end align-items-md-start">
          {/* Home Score */}
          <div className="col-4 statictics-innr">
            <div className="count-inn">
              <span className="qty-btn" onClick={() => handleUpdateStat("home", "penalties", -1)}>
                <img src={minus} alt="minus" />
              </span>
              <h4>{game?.homeTeamName}</h4>
              <span className="qty-btn" onClick={() => handleUpdateStat("home", "penalties", 1)}>
                <img src={plus} alt="plus" />
              </span>
            </div>
          </div>

          {/* Penalties */}
          <div className="col-4 statictics-innr">
            <p className="green lg">
              {homePenalties} <span>-</span> {awayPenalties}
            </p>
          </div>

          {/* Away Score */}
          <div className="col-4 statictics-innr">
            <div className="count-inn">
              <span className="qty-btn" onClick={() => handleUpdateStat("away", "penalties", -1)}>
                <img src={minus} alt="minus" />
              </span>
              <h4>{game?.awayTeamName}</h4>
              <span className="qty-btn" onClick={() => handleUpdateStat("away", "penalties", 1)}>
                <img src={plus} alt="plus" />
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom stats */}
      <div className="statictics-wrapper bottom">
        <div className="row statictics-otr">
          {/* Shots */}
          <div className="col-md-4 statictics-innr">
            <h4 className="sm">SHOTS</h4>
            <div className="count-inn gap-10">
              <div className="qntity-info">
                <span className="qty-btn sm" onClick={() => handleUpdateStat("home", "shots", -1)}>
                  <img src={minus} alt="" />
                </span>
                <span className="qty-btn sm" onClick={() => handleUpdateStat("home", "shots", 1)}>
                  <img src={plus} alt="" />
                </span>
              </div>
              <p className="blue sm">
                {homeShots} <span>-</span> {awayShots}
              </p>
              <div className="qntity-info">
                <span className="qty-btn sm" onClick={() => handleUpdateStat("away", "shots", -1)}>
                  <img src={minus} alt="" />
                </span>
                <span className="qty-btn sm" onClick={() => handleUpdateStat("away", "shots", 1)}>
                  <img src={plus} alt="" />
                </span>
              </div>
            </div>
          </div>

          {/* Saves */}
          <div className="col-md-4 statictics-innr">
            <h4 className="sm">SAVES</h4>
            <div className="count-inn gap-10">
              <div className="qntity-info">
                <span className="qty-btn sm" onClick={() => handleUpdateStat("home", "saves", -1)}>
                  <img src={minus} alt="" />
                </span>
                <span className="qty-btn sm" onClick={() => handleUpdateStat("home", "saves", 1)}>
                  <img src={plus} alt="" />
                </span>
              </div>
              <p className="green sm">
                {homeSaves} <span>-</span> {awaySaves}
              </p>
              <div className="qntity-info">
                <span className="qty-btn sm" onClick={() => handleUpdateStat("away", "saves", -1)}>
                  <img src={minus} alt="" />
                </span>
                <span className="qty-btn sm" onClick={() => handleUpdateStat("away", "saves", 1)}>
                  <img src={plus} alt="" />
                </span>
              </div>
            </div>
          </div>

          {/* Fouls */}
          <div className="col-md-4 statictics-innr">
            <h4 className="sm">Face Off</h4>
            <div className="count-inn gap-10">
              <div className="qntity-info">
                <span className="qty-btn sm" onClick={() => handleUpdateStat("home", "fouls", -1)}>
                  <img src={minus} alt="" />
                </span>
                <span className="qty-btn sm" onClick={() => handleUpdateStat("home", "fouls", 1)}>
                  <img src={plus} alt="" />
                </span>
              </div>
              <p className="orange sm">
                {homeFouls} <span>-</span> {awayFouls}
              </p>
              <div className="qntity-info">
                <span className="qty-btn sm" onClick={() => handleUpdateStat("away", "fouls", -1)}>
                  <img src={minus} alt="" />
                </span>
                <span className="qty-btn sm" onClick={() => handleUpdateStat("away", "fouls", 1)}>
                  <img src={plus} alt="" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}