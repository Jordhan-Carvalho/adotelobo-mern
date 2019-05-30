import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import Top from "./Top";
import About from "./About";
import Spinner from "../layout/Spinner";
import { getAnimalById } from "../../actions/animal";

const Animal = ({
  getAnimalById,
  animal: { animal, loading },
  match,
  auth
}) => {
  useEffect(() => {
    getAnimalById(match.params.id);
  }, [getAnimalById, match.params.id]);

  return loading || animal === null ? (
    <Spinner />
  ) : (
    <>
      <Link to="/animals" className="btn">
        Voltar
      </Link>

      {auth.isAuthenticated &&
      auth.loading === false &&
      auth.user._id === animal.author ? (
        <Link to="/animals" className="btn btn-dark">
          Editar pet
        </Link>
      ) : (
        <></>
      )}
      <div className="profile-grid my-1">
        <Top animal={animal} />
        <About animal={animal} />
      </div>

      <CommentForm animalId={animal._id} />
      <div className="comments">
        {animal.comments.map(comment => (
          <CommentItem
            key={comment._id}
            comment={comment}
            animalId={animal._id}
          />
        ))}
      </div>
    </>
  );
};

Animal.propTypes = {
  getAnimalById: PropTypes.func.isRequired,
  animal: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  animal: state.animal,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getAnimalById }
)(Animal);
