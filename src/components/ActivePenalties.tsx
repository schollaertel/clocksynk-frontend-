interface ActivePenaltiesProps {
  gameStatistics: any;
  game:any;
}

export default function ActivePenalties({ gameStatistics,game }: ActivePenaltiesProps) {
  const penalties = gameStatistics?.penalties || [];

  return (
    <div className="cmn-box-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Team</th>
            <th>Type</th>
            <th>Player No</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {penalties.length > 0 ? (
            penalties.map((penalty: any, index: number) => (
              <tr key={index}>
                <td>{ (penalty?.team==='home')?game?.homeTeamName : game?.awayTeamName}</td>
                <td>{ penalty?.type}</td>
                <td><span className="number">{penalty?.playerNo}</span></td>
                <td>
                  <span className="time">
                    {String(penalty?.minutes).padStart(2, '0')} : {String(penalty?.seconds).padStart(2, '0')}
                  </span>
                </td>
                
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center">No active penalties</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
