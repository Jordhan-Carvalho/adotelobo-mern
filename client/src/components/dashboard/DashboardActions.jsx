import React from "react";
import { Link } from "react-router-dom";

const DashboardActions = () => {
  return (
    <div className="dash-buttons">
      <Link to="/edit-profile" className="btn btn-light">
        <i className="fas fa-user-circle text-primary" /> Editar Perfil{" "}
      </Link>
      <Link to="/add-experience" className="btn btn-light">
        <i className="fab fa-black-tie text-primary" /> Adicione Experiência
      </Link>
      <Link to="/add-education" className="btn btn-light">
        <i className="fas fa-graduation-cap text-primary" /> Adicione
        Escolaridade
      </Link>
      <Link to="/add-animal" className="btn btn-light">
        <i className="fas fa-paw text-primary" /> Adicione Animal
      </Link>
    </div>
  );
};

export default DashboardActions;
