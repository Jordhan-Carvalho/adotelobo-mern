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
      <h1 className="large text-primary">Adicione Um Pet</h1>
      <p className="lead">
        <i className="fas fa-paw" /> Adicione as informações necessárias
      </p>
      <small>* = campo obrigatório</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Nome"
            name="name"
            value={name}
            onChange={e => onChange(e)}
          />
          <small className="form-text">Qual nome do pet ?</small>
        </div>
        <div className="form-group">
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={e => uploadImage(e)}
          />
          <small className="form-text">Selecione a foto para upload</small>
        </div>
        <div className="form-group">
          <select name="type" value={type} onChange={e => onChange(e)}>
            <option value="0">* Selecione o tipo de Pet</option>
            <option value="Cachorro">Cachorro</option>
            <option value="Gato">Gato</option>
            <option value="Peixe">Peixe</option>
            <option value="Ave">Ave</option>
            <option value="Répteis">Répteis</option>
          </select>
          <small className="form-text">
            Qual tipo do pet? Cachorro? Gato? Peixe?
          </small>
        </div>
        <div className="form-group">
          <select name="age" value={age} onChange={e => onChange(e)}>
            <option value="0">* Idade aproximada</option>
            <option value="Filhote">Filhote</option>
            <option value="Adulto">Adulto</option>
            <option value="Idoso">Idoso</option>
          </select>
          <small className="form-text">Idade aproximada</small>
        </div>
        <div className="form-group">
          <select name="sex" value={sex} onChange={e => onChange(e)}>
            <option value="0">* Sexo</option>
            <option value="Fêmea">Fêmea</option>
            <option value="Macho">Macho</option>
          </select>
          <small className="form-text">Sexo</small>
        </div>

        <div className="form-group">
          <input
            type="text"
            placeholder="Localização"
            name="location"
            value={location}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            Cidade & estado (ex. Barreiras, BA)
          </small>
        </div>

        <div className="form-group">
          <textarea
            name="description"
            value={description}
            onChange={e => onChange(e)}
            cols="30"
            rows="5"
            placeholder="Descrição ou historia"
          />
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleContactInputs(!displayContactInputs)}
            type="button"
            className="btn btn-light"
          >
            Adicione Contato
          </button>
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
                placeholder="Tel"
                name="tel"
                value={tel}
                onChange={e => onChange(e)}
              />
            </div>
          </>
        )}

        <input type="submit" className="btn btn-primary my-1" value="Enviar" />
        <Link className="btn btn-light my-1" to="/animals">
          Voltar
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
