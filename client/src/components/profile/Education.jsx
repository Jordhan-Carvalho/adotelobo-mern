import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const Education = ({ profile }) => {
  return (
    <div className="profile-edu bg-white p-2">
      <h2 className="text-primary">Escolaridade</h2>

      {profile.education.length > 0 ? (
        <>
          {profile.education.map((edu, index) => (
            <div key={index}>
              <h3 className="text-dark">{edu.school}</h3>
              <p>
                <Moment format="DD/MM/YYYY">{edu.from}</Moment> -{" "}
                {!edu.to ? (
                  "Presente"
                ) : (
                  <Moment format="DD/MM/YYYY">{edu.to}</Moment>
                )}{" "}
              </p>
              <p>
                <strong>Grau: </strong>
                {edu.degree}
              </p>
              <p>
                <strong>Campo de estudo: </strong>
                {edu.fieldofstudy}
              </p>
              {edu.description && (
                <p>
                  <strong>Descrição: </strong>
                  {edu.description}.
                </p>
              )}
            </div>
          ))}
        </>
      ) : (
        <h4>Sem escolaridade fornecida...</h4>
      )}
    </div>
  );
};

Education.propTypes = {
  profile: PropTypes.object.isRequired
};

export default Education;
