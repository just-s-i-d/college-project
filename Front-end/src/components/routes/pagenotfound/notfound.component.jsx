import "./notfound.styles.scss"
const NotFound = () => {
    return (
      <div className="body">
        <h1>404</h1>
        <div className="cloak__wrapper">
          <div className="cloak__container">
            <div className="cloak"></div>
          </div>
        </div>
        <div className="info">
          <h2>What more do you expect from an error page! </h2>
          <p>
            We're fairly sure that page used to be here, but seems to have gone missing. We do apologize on its behalf.
          </p>
          <a href="http://localhost:3000">Home</a>
        </div>
      </div>
    );
  };
  
  export default NotFound;