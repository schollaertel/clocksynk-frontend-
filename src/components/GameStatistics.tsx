interface Props {
  gameStatistics: any;
  game: any;
}
export default function GameStatistics({ gameStatistics,game }: Props) {
    const homePenalties = gameStatistics?.homeTeam?.stats?.penalties || 0;
    const awayPenalties = gameStatistics?.awayTeam?.stats?.penalties || 0;

    const homeShots = gameStatistics?.homeTeam?.stats?.shots || 0;
    const awayShots = gameStatistics?.awayTeam?.stats?.shots || 0;

    const homeSaves = gameStatistics?.homeTeam?.stats?.saves || 0;
    const awaySaves = gameStatistics?.awayTeam?.stats?.saves || 0;

    const homeFouls = gameStatistics?.homeTeam?.stats?.fouls || 0;
    const awayFouls = gameStatistics?.awayTeam?.stats?.fouls || 0;
    return (
        <div className="cmn-box-wrapper p-36">
            <div className="statictics-wrapper">
                <div className="row statictics-otr align-items-end align-items-md-start">
                    <div className="col-4 statictics-innr">
                        <div className="count-inn">
                            <h4>{game?.homeTeamName}</h4>
                        </div>
                    </div>
                    <div className="col-4 statictics-innr">
                        <div className="count-inn">
                            <h4>Penalties</h4>
                        </div>
                        <p className="green lg">{homePenalties} <span>-</span> {awayPenalties}</p>
                    </div>
                    <div className="col-4 statictics-innr">
                        <div className="count-inn">
                            <h4>{game?.awayTeamName}</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="statictics-wrapper">
                <div className="row statictics-otr">
                    <div className="col-4 statictics-innr">
                        <h4 className="sm">SHOTS</h4>
                        <div className="count-inn gap-10">
                            <p className="blue sm">{homeShots} <span>-</span> {awayShots}</p>
                        </div>
                    </div>
                    <div className="col-4 statictics-innr">
                        <h4 className="sm">SAVES</h4>
                        <div className="count-inn gap-10">
                            <p className="green sm">{homeSaves} <span>-</span> {awaySaves}</p>
                        </div>
                    </div>
                    <div className="col-4 statictics-innr">
                        <h4 className="sm">Face Off</h4>
                        <div className="count-inn gap-10">
                            <p className="orange sm"> {homeFouls} <span>-</span> {awayFouls}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}