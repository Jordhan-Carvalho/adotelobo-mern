import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const Top = ({ animal: { name, image, location, sex, age, createdAt } }) => {
  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={image} alt="profile" />
      <h1 className="large">{name}</h1>
      <p className="lead">
        {sex} - {age}
      </p>
      <p>{location && <span>{location}</span>}</p>
      <p>
        Adicionado em <Moment format="DD/MM/YYYY">{createdAt}</Moment>
      </p>
    </div>
  );
};

Top.propTypes = {
  animal: PropTypes.object.isRequired
};

export default Top;
