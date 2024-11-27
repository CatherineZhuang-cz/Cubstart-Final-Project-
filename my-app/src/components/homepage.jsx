import React from "react";

const Homepage = () => {
  return (
        <div className="row align-items-center">
          <div className="col-lg-6">
            <h1>"TAP INTO YOUR KNOWLEDGE!"</h1>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat cupidatat non proident,
              sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
          <div className="col-lg-6 text-center">
          <img
              src="imgs\brain1.png"
              alt="Brain"
              className="img-fluid"
              style={{ maxWidth: "105%" }}
            />
          </div>
        </div>
      
   

  );
};

export default Homepage;