import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const Experience = ({ profile }) => {
  return (
    <div className="profile-exp bg-white p-2">
      <h2 className="text-primary">Experiências</h2>

      {profile.experience.length > 0 ? (
        <>
          {profile.experience.map((exp, index) => (
            <div key={index}>
              <h3 className="text-dark">{exp.company}</h3>
              <p>
                <Moment format="DD/MM/YYYY">{exp.from}</Moment> -{" "}
                {!exp.to ? (
                  "Presente"
                ) : (
                  <Moment format="DD/MM/YYYY">{exp.to}</Moment>
                )}{" "}
              </p>
              <p>
                <strong>Cargo: </strong>
                {exp.title}
              </p>
              {exp.description && (
                <p>
                  <strong>Descrição: </strong>
                  {exp.description}.
                </p>
              )}
            </div>
          ))}
        </>
      ) : (
        <h4>Sem experiências fornecidas</h4>
      )}
    </div>
  );
};

Experience.propTypes = {
  profile: PropTypes.object.isRequired
};

export default Experience;
