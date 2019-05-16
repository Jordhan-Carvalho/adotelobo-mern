import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import PropTypes from "prop-types";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
import Spinner from "../layout/Spinner";
import { getAnimalById } from "../../actions/animal";

const Animal = ({ getAnimalById, animal: { animal, loading }, match }) => {
  useEffect(() => {
    getAnimalById(match.params.id);
  }, [getAnimalById, match.params.id]);

  return loading || animal === null ? (
    <Spinner />
  ) : (
    <>
      <Link to="/animals" className="btn">
        Back To Animals
      </Link>
      <div className="post bg-white p-1 my-1">
        <div>
          <Link to={`/profile/${animal.author}`}>
            <img className="round-img" src={animal.avatar} alt="profile" />
            <h4>{animal.name}</h4>
          </Link>
        </div>
        <div>
          <p className="my-1">{animal.description}</p>
          <p className="post-date">
            Posted on <Moment format="DD/MM/YYYY">{animal.createdAt}</Moment>
          </p>
        </div>
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
