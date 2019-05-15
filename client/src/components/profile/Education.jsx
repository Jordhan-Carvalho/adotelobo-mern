import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const Education = ({ profile }) => {
  return (
    <div className="profile-edu bg-white p-2">
      <h2 className="text-primary">Education</h2>

      {profile.education.length > 0 ? (
        <>
          {profile.education.map((edu, index) => (
            <div key={index}>
              <h3 className="text-dark">{edu.school}</h3>
              <p>
                <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{" "}
                {!edu.to ? (
                  "Now"
                ) : (
                  <Moment format="DD/MM/YYYY">{edu.to}</Moment>
                )}{" "}
              </p>
              <p>
                <strong>Degree: </strong>
                {edu.degree}
              </p>
              <p>
                <strong>Field Of Study: </strong>
                {edu.fieldofstudy}
              </p>
              {edu.description && (
                <p>
                  <strong>Description: </strong>
                  {edu.description}.
                </p>
              )}
            </div>
          ))}
        </>
      ) : (
        <h4>No education credentials</h4>
      )}
    </div>
  );
};

Education.propTypes = {
  profile: PropTypes.object.isRequired
};

export default Education;
