import { Link } from "react-router-dom";
import "./ErrorPage.css";

const ErrorPage = () => {
  return (
    <section className="error-section">

      <div>
        <div className="error-title">
          Hang on,{" "}
          <span className="work-sans">
            you probab<span className="italic">l</span>y d<span className="italic">i</span>dn't mean to end up here.
          </span>
        </div>
      </div>

      <div className="error-code work-sans">
        404
      </div>

      <div className="work-sans error-subtitle">
        Seems like we couldn't find that page. Here's your way back to <Link to={"/"}>homepage</Link>
      </div>
    </section>
  );
};

export default ErrorPage;
