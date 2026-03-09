import iconngo from "../assets/images/icon-ngo.svg"
import iconclock from "../assets/images/icon-clock.svg"
import iconaway from "../assets/images/icon-away.svg"
interface Props {
  gameStatistics: any;
  game: any;
}
export default function ScoreBoardComponent({ gameStatistics,game }: Props) {
    const homeScore = gameStatistics?.homeTeam?.score || 0;
    const awayScore = gameStatistics?.awayTeam?.score || 0;
    const quarter = gameStatistics?.clock?.quarter || 0;
    const minutes = gameStatistics?.clock?.minutes || 0;
    const seconds = gameStatistics?.clock?.seconds || 0;
    const formatTime = (m: number, s: number) =>
    `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
    return (
        <div className="score-board-otr">
            <div className="row m-0 justify-content-center">
                <div className="col-md-4 score-card-innr p-0">
                    <div className="score-card">
                        <div className="score-icon"><img src={game?.homeTeamLogo?game?.homeTeamLogo:iconngo} alt="home icon" /></div>
                        <h3>{game?.homeTeamName}</h3>
                        <div className="score-content">
                            <h2 className="score">{homeScore}</h2>
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
                <div className="col-md-4 score-card-innr p-0">
                    <div className="score-card">
                        <div className="score-icon"><img src={iconclock} alt="" /></div>
                        <h3>Quarters</h3>
                        <div className="score-content">
                            <h2 className="score">{quarter}</h2>
                            <div className="timer">
                                <span>{formatTime(minutes, seconds)}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 score-card-innr p-0">
                    <div className="score-card">
                        <div className="score-icon"><img src={game?.awayTeamLogo?game?.awayTeamLogo:iconaway} alt="" /></div>
                        <h3>{game?.awayTeamName}</h3>
                        <div className="score-content">
                            <h2 className="score">{awayScore}</h2>
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
        </div>
    )
}