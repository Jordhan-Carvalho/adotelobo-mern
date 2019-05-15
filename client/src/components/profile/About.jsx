import React from "react";
import PropTypes from "prop-types";

const About = ({ profile }) => {
  return (
    <div className="profile-about bg-light p-2">
      {profile.bio && (
        <>
          <h2 className="text-primary">
            {profile.user.name.trim().split(" ")[0]}s Bio
          </h2>
          <p>{profile.bio}</p>
          <div className="line" />
        </>
      )}

      <h2 className="text-primary">Skill Set</h2>
      <div className="skills">
        {profile.skills.map((skill, index) => (
          <div className="p-1" key={index}>
            <i className="fa fa-check" /> {skill}
          </div>
        ))}
      </div>
    </div>
  );
};

About.propTypes = {
  profile: PropTypes.object.isRequired
};

export default About;
