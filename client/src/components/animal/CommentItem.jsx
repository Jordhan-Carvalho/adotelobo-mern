import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { deleteComment } from "../../actions/animal";

const CommentItem = ({
  comment: { _id, text, name, avatar, user, date },
  animalId,
  auth,
  deleteComment
}) => {
  return (
    <div className="post bg-white p-1 my-1">
      <div>
        <Link to={`/profile/${_id}`}>
          <img className="round-img" src={avatar} alt="profile" />
          <h4>{name}</h4>
        </Link>
      </div>
      <div>
        <p className="my-1">{text}</p>
        <p className="post-date">
          Postado em <Moment format="DD/MM/YYYY">{date}</Moment>
        </p>
        {!auth.loading && auth.user !== null && user === auth.user._id && (
          <button
            onClick={e => deleteComment(animalId, _id)}
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

CommentItem.propTypes = {
  animalId: PropTypes.number.isRequired,
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { deleteComment }
)(CommentItem);
