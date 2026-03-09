import img404 from "../assets/images/Oops_404.svg"
export default function NotFound() {
  return (
    <div className="wrapper no-data">
      <section className="score-board-sec">
        <div className="container small-container">
          <div className="score-top pd cmn-box text-center pt-30">
            <h1>404 page not found.</h1>
            <img src={img404} alt='404 page' width={200} />
          </div>
        </div>
      </section>
    </div>
  );
}
