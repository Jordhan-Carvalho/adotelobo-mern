import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import S3 from "aws-s3";
import { setAlert } from "../../actions/alert";
import { addAnimal } from "../../actions/animal";

const config = {
  bucketName: process.env.REACT_APP_AWS_BUCKET_NAME,
  dirName: "photos" /* optional */,
  region: "sa-east-1",
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY
};

const S3Client = new S3(config);

const AddAnimal = ({ addAnimal, history, setAlert }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    sex: "",
    type: "",
    age: "",
    description: "",
    location: "",
    tel: "",
    email: "",
    zap: ""
  });

  const [displayContactInputs, toggleContactInputs] = useState(false);

  const {
    name,
    sex,
    type,
    age,
    description,
    location,
    tel,
    email,
    zap
  } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const uploadImage = async e => {
    try {
      const resp = await S3Client.uploadFile(e.target.files[0]);
      setFormData({ ...formData, image: resp.location });
      setAlert("Image Upload Success", "success");
    } catch (error) {
      console.log(error);
      setAlert("Image Upload Failed", "danger");
    }
  };

  const onSubmit = async e => {
    e.preventDefault();
    addAnimal(formData, history);
  };

  return (
    <>
      <h1 className="large text-primary">Add An Animal</h1>
      <p className="lead">
        <i className="fas fa-paw" /> Let's get some information to make your
        animal stand out
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
          />
          <small className="form-text">What`s the pet name ?</small>
        </div>
        <div className="form-group">
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={e => uploadImage(e)}
          />
          <small className="form-text">
            Wait untill the image upload success image show up
          </small>
        </div>
        <div className="form-group">
          <select name="type" value={type} onChange={e => onChange(e)}>
            <option value="0">* Select Pet Type</option>
            <option value="Dog">Dog</option>
            <option value="Cat">Cat</option>
            <option value="Fish">Fish</option>
            <option value="Bird">Bird</option>
            <option value="Reptile">Reptile</option>
          </select>
          <small className="form-text">
            Whats the type of the pet? dog? cat? fish?
          </small>
        </div>
        <div className="form-group">
          <select name="age" value={age} onChange={e => onChange(e)}>
            <option value="0">* Select Age</option>
            <option value="Puppy">Puppy</option>
            <option value="Adult">Adult</option>
            <option value="Old">Old</option>
          </select>
          <small className="form-text">Pet Age</small>
        </div>
        <div className="form-group">
          <select name="sex" value={sex} onChange={e => onChange(e)}>
            <option value="0">* Select Sex</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
          </select>
          <small className="form-text">Pet Sex</small>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            City & state suggested (eg. Boston, MA)
          </small>
        </div>

        <div className="form-group">
          <textarea
            name="description"
            value={description}
            onChange={e => onChange(e)}
            cols="30"
            rows="5"
            placeholder="Pet Description"
          />
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleContactInputs(!displayContactInputs)}
            type="button"
            className="btn btn-light"
          >
            Add Contact
          </button>
          <span>Optional</span>
        </div>

        {displayContactInputs && (
          <>
            <div className="form-group social-input">
              <i className="fab fa-whatsapp fa-2x" />
              <input
                type="text"
                placeholder="WhatsApp"
                name="zap"
                value={zap}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="far fa-envelope fa-2x" />
              <input
                type="text"
                placeholder="Email"
                name="email"
                value={email}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fas fa-phone fa-2x" />
              <input
                type="text"
                placeholder="Phone"
                name="tel"
                value={tel}
                onChange={e => onChange(e)}
              />
            </div>
          </>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/animals">
          Go Back
        </Link>
      </form>
    </>
  );
};

AddAnimal.propTypes = {
  addAnimal: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default connect(
  null,
  { addAnimal, setAlert }
)(withRouter(AddAnimal));
