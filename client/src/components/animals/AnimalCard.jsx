import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deleteAnimal } from "../../actions/animal";

const AnimalCard = ({ animal, auth, removeLike, addLike, deleteAnimal }) => {
  return (
    <div className="card">
      <div className="bg-img">
        <img src={animal.image} alt="pet" />
      </div>
      <div className="content ">
        <h4>
          {animal.name} <span> - {animal.sex}</span>
        </h4>

        <div className="inner-content">
          <button
            onClick={() => addLike(animal._id)}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-up" />
            {animal.likes.length > 0 && <span> {animal.likes.length}</span>}
          </button>

          <button
            onClick={() => removeLike(animal._id)}
            type="button"
            className="btn btn-light"
          >
            <i className="fas fa-thumbs-down" />
          </button>
        </div>
        <p className="inner-content post-date">
          Adicionado por{" "}
          <Link to={`profile/${animal.author}`}>{animal.authorName}</Link> on{" "}
          <Moment fromNow locale="pt-br">
            {animal.createdAt}
          </Moment>
        </p>
        <div className="inner-content">
          <Link to={`/animals/${animal._id}`} className="btn btn-primary">
            Mais informações{" "}
            {animal.comments.length > 0 && (
              <span className="comment-count">({animal.comments.length})</span>
            )}
          </Link>
        </div>
        {!auth.loading &&
          auth.user !== null &&
          animal.author === auth.user._id && (
            <button
              onClick={() => deleteAnimal(animal._id)}
              type="button"
              className="btn btn-danger"
            >
              <i className="fas fa-times" />
            </button>
          )}
      </div>
    </div>
  );
};

AnimalCard.propTypes = {
  animal: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deleteAnimal: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { addLike, removeLike, deleteAnimal }
)(AnimalCard);
