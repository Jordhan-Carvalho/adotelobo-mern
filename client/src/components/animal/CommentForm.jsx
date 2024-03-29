import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { addComment } from "../../actions/animal";

const CommentForm = ({ addComment, animalId }) => {
  const [text, setText] = useState("");

  const onSubmit = async e => {
    e.preventDefault();
    addComment({ text }, animalId);
    setText("");
  };

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Deixe um comentário</h3>
      </div>
      <form className="form my-1" onSubmit={e => onSubmit(e)}>
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Criar comentário"
          value={text}
          onChange={e => setText(e.target.value)}
          required
        />
        <input type="submit" className="btn btn-dark my-1" value="Enviar" />
      </form>
    </div>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired
};

export default connect(
  null,
  { addComment }
)(CommentForm);
