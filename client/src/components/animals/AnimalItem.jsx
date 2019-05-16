import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { connect } from "react-redux";
import { addLike, removeLike, deleteAnimal } from "../../actions/animal";

const AnimalItem = ({ animal, auth, removeLike, addLike, deleteAnimal }) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`profile/${animal.author}`}>
          <img className="round-img" src={animal.avatar} alt="user profile" />
          <h4>{animal.authorName}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{animal.description}</p>
        <p className="post-date">
          Posted on <Moment format="DD/MM/YYYY">{animal.createdAt}</Moment>
        </p>

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
        <Link to={`/animals/${animal._id}`} className="btn btn-primary">
          Discussion{" "}
          {animal.comments.length > 0 && (
            <span className="comment-count">{animal.comments.length}</span>
          )}
        </Link>
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

AnimalItem.propTypes = {
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
)(AnimalItem);
