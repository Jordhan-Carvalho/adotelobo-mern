import React from "react";
import PropTypes from "prop-types";

const About = ({ animal }) => {
  return (
    <div className="profile-about bg-light p-2">
      {animal.description && (
        <>
          <h2 className="text-primary">História de {animal.name}</h2>
          <p>{animal.description}</p>
          <div className="line" />
        </>
      )}

      <h2 className="text-primary">Contato</h2>
      <div className="skills">
        <div className="p-1">
          <i className="fab fa-whatsapp fa-2x" /> {animal.zap}
        </div>
        <div className="p-1">
          <i className="far fa-envelope fa-2x" /> {animal.email}
        </div>
        <div className="p-1">
          <i className="fas fa-phone fa-2x" /> {animal.tel}
        </div>
      </div>
    </div>
  );
};

About.propTypes = {
  animal: PropTypes.object.isRequired
};

export default About;
