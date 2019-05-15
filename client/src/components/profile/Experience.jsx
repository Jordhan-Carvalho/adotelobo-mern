import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const Experience = ({ profile }) => {
  return (
    <div className="profile-exp bg-white p-2">
      <h2 className="text-primary">Experience</h2>

      {profile.experience.length > 0 ? (
        <>
          {profile.experience.map((exp, index) => (
            <div key={index}>
              <h3 className="text-dark">{exp.company}</h3>
              <p>
                <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{" "}
                {!exp.to ? (
                  "Now"
                ) : (
                  <Moment format="DD/MM/YYYY">{exp.to}</Moment>
                )}{" "}
              </p>
              <p>
                <strong>Position: </strong>
                {exp.title}
              </p>
              {exp.description && (
                <p>
                  <strong>Description: </strong>
                  {exp.description}.
                </p>
              )}
            </div>
          ))}
        </>
      ) : (
        <h4>No experience credentials</h4>
      )}
    </div>
  );
};

Experience.propTypes = {
  profile: PropTypes.object.isRequired
};

export default Experience;
