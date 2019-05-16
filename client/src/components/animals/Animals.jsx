import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AnimalItem from "./AnimalItem";
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
          <h1 className="large text-primary">Animals</h1>
          <p className="lead">
            <i className="fas fa-user" /> Welcome to the community!
          </p>
          <Link to="/add-animal" className="btn btn-primary">
            Add a new animal
          </Link>
          <div className="posts">
            {animals.map(animal => (
              <AnimalItem key={animal._id} animal={animal} />
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
