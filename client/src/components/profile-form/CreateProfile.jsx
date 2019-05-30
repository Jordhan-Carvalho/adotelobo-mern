import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { createProfile } from "../../actions/profile";

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    company: "",
    website: "",
    location: "",
    status: "",
    skills: "",
    bio: "",
    twitter: "",
    facebook: "",
    linkedin: "",
    youtube: "",
    instagram: ""
  });

  const [displaySocialInputs, toggleSocialInputs] = useState(false);

  const {
    company,
    website,
    location,
    status,
    skills,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram
  } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    createProfile(formData, history);
  };

  return (
    <>
      <h1 className="large text-primary">Crie Seu Perfil</h1>
      <p className="lead">
        <i className="fas fa-user" /> Forneça as informações necessárias
      </p>
      <small>* = Campo obrigatório</small>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <select name="status" value={status} onChange={e => onChange(e)}>
            <option value="0">* Professional Status</option>
            <option value="Junior">Júnior</option>
            <option value="Pleno">Pleno</option>
            <option value="Senior">Sênior</option>
            <option value="Outro">Outro</option>
          </select>
          <small className="form-text">
            Seu grau de experiência em seu campo de trabalho
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Empresa"
            name="company"
            value={company}
            onChange={e => onChange(e)}
          />
          <small className="form-text">Empresa</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Website"
            name="website"
            value={website}
            onChange={e => onChange(e)}
          />
          <small className="form-text">O website seu ou da empresa.</small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Localidade"
            name="location"
            value={location}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            Cidade & Estado (eg. Barreiras, BA)
          </small>
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Habilidades"
            name="skills"
            value={skills}
            onChange={e => onChange(e)}
          />
          <small className="form-text">
            Use virgula para separá-las (ex. Construção, Mapeamento,
            Gerenciamento, AutoCad)
          </small>
        </div>
        <div className="form-group">
          <textarea
            placeholder="Uma bio resumida sobre você"
            name="bio"
            value={bio}
            onChange={e => onChange(e)}
          />
          <small className="form-text">Nos conte um pouco sobre você</small>
        </div>

        <div className="my-2">
          <button
            onClick={() => toggleSocialInputs(!displaySocialInputs)}
            type="button"
            className="btn btn-light"
          >
            Adicione suas Redes Sociais
          </button>
          <span>Opcional</span>
        </div>

        {displaySocialInputs && (
          <>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x" />
              <input
                type="text"
                placeholder="Twitter URL"
                name="twitter"
                value={twitter}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x" />
              <input
                type="text"
                placeholder="Facebook URL"
                name="facebook"
                value={facebook}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x" />
              <input
                type="text"
                placeholder="YouTube URL"
                name="youtube"
                value={youtube}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x" />
              <input
                type="text"
                placeholder="Linkedin URL"
                name="linkedin"
                value={linkedin}
                onChange={e => onChange(e)}
              />
            </div>

            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x" />
              <input
                type="text"
                placeholder="Instagram URL"
                name="instagram"
                value={instagram}
                onChange={e => onChange(e)}
              />
            </div>
          </>
        )}

        <input type="submit" className="btn btn-primary my-1" value="Enviar" />
        <Link className="btn btn-light my-1" to="/dashboard">
          Voltar
        </Link>
      </form>
    </>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired
};

// with router get access to the history object’s properties
export default connect(
  null,
  { createProfile }
)(withRouter(CreateProfile));
