import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import add1 from "../assets/images/add-1.jpg";
import add3 from "../assets/images/add-3.jpg";
import add4 from "../assets/images/add-4.jpg";
import Add from "../components/Add";
import ActivePenalties from "../components/ActivePenalties";
import GameStatistics from "../components/GameStatistics";
import LiveStatsTracker from "../components/LiveStatsTracker";
import ScoreBoardComponent from "../components/ScoreBoardComponent";
import { getField } from "../service/api.service";
import useSocket from "../utils/sockect";

export default function Home() {
  const { fieldslug } = useParams();
  const navigate = useNavigate();
  const [game, setGame] = useState<any>(null);
  const [gameStatistics, setGameStatistics] = useState<any>(null);
  const [loading, setLoading] = useState(false);

   useEffect(() => {
    if (fieldslug) {
      const fetchData = async () => {
        try {
          setLoading(true);
          const res = await getField(fieldslug);
          if (!res || res.status === 404) {
            navigate("/404");
          } else {
            setGame(res?.games);
            setGameStatistics(res?.gameStatistics);
          }
        } catch (err) {
          console.error("Error fetching field:", err);
          navigate("/404");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }
  }, [fieldslug, navigate]);
  useSocket(game?._id, {
    clockUpdated: (clock: any) => {
      setGameStatistics((prev: any) => ({ ...prev, clock }));
    },
    setQuater: (stats: any) => {
      setGameStatistics((prev: any) => ({
        ...prev,
        clock: {
          ...prev.clock,        // keep minutes, seconds, running
          quarter: stats.clock.quarter // update only quarter
        }
      }));
    },
    scoreUpdated: (stats: any) => {
      setGameStatistics(stats);
    },
    statUpdated: (stats: any) => {
      setGameStatistics(stats);
    },
    goalAdded: (stats: any) => {
      setGameStatistics(stats);
    },
    penaltyAdded: (stats: any) => {
      setGameStatistics(stats);
    },
    gameReset: (stats: any) => {
      setGameStatistics(stats);
    },
  });

 
  

  return (
    <div className="wrapper">
            <div className="add-sec">
                <div className="container small-container">
                    <div className="add-otr">
                        <Add img={add1} />
                    </div>
                </div>
            </div>
            <section className="score-board-sec">
                <div className="container small-container">
                    <div className="score-top">
                        <div className="text-center hdr">
                            <h1>Score Board</h1>
                        </div>
                        <ScoreBoardComponent gameStatistics={gameStatistics} game={game} />
                    </div>
                    <div className="add-sec text-center p-0 mb-30 d-block d-xl-none">
                        <div className="add-otr">
                            <Add img={add1} />
                        </div>
                    </div>
                    <div className="cmn-box">
                        <h2>Active Penalties</h2>
                        <ActivePenalties gameStatistics={gameStatistics} game={game} />
                    </div>
                    <div className="cmn-box">
                        <h2>Game Statistics</h2>
                        <GameStatistics  gameStatistics={gameStatistics}  game={game} />
                    </div>

                    <div className="add-sec text-center p-0 mb-30 d-block d-xl-none">
                        <div className="add-otr">
                            <Add img={add1} />
                        </div>
                    </div>
                    <div className="cmn-box mb-0">
                        <h2>Live Stats Tracker</h2>
                        <LiveStatsTracker gameStatistics={gameStatistics} game={game} />
                    </div>
                </div>
                <div className="left d-none d-xl-block">
                    <Add img={add3} />
                </div>
                <div className="right d-none d-xl-block">
                    <Add img={add4} />
                </div>
            </section>
        </div>
  );
}