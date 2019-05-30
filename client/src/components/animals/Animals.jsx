import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AnimalCard from "./AnimalCard";
import Spinner from "../layout/Spinner";
import { getAnimals } from "../../actions/animal";

const Animals = ({ getAnimals, animal: { animals, loading } }) => {
  useEffect(() => {
    getAnimals();
  }, [getAnimals]);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="large text-primary">
            Lista de animais esperando adoção
          </h1>
          <p className="lead">
            <i className="fas fa-user" /> Seja bem-vindo(a) a comunidade!
          </p>
          <Link to="/add-animal" className="btn btn-primary">
            <i className="fas fa-plus" /> Adicione um novo pet
          </Link>

          <div className="grid-container">
            {animals.map(animal => (
              <AnimalCard key={animal._id} animal={animal} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

Animals.propTypes = {
  getAnimals: PropTypes.func.isRequired,
  animal: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  animal: state.animal
});

export default connect(
  mapStateToProps,
  { getAnimals }
)(Animals);
