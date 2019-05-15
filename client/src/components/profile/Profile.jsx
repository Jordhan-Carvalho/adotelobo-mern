import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Top from "./Top";
import About from "./About";
import Experience from "./Experience";
import Education from "./Education";
import Spinner from "../layout/Spinner";
import { getProfileById } from "../../actions/profile";

const Profile = ({
  match,
  getProfileById,
  profile: { profile, loading },
  auth
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
  }, [getProfileById, match.params.id]);

  return (
    <>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <>
          <Link to="/profiles" className="btn btn-light">
            Back To Profiles
          </Link>
          {auth.isAuthenticated &&
          auth.loading === false &&
          auth.user._id === profile.user._id ? (
            <Link to="/edit-profile" className="btn btn-dark">
              Edit profile
            </Link>
          ) : (
            <></>
          )}
          <div className="profile-grid my-1">
            <Top profile={profile} />
            <About profile={profile} />
            <Experience profile={profile} />
            <Education profile={profile} />
          </div>
        </>
      )}
    </>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfileById }
)(Profile);
