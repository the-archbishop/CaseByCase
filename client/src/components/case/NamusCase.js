import React, { Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Spinner from "../Layout/Spinner/Spinner";
import { getNamusCase } from "../../actions/namus";
import GMap from "./GMap";
import CaseComments from './CaseComments';
import './Case.css'

const NamusCase = ({ getNamusCase, namus: { namusCase, loading }, match }) => {
  useEffect(() => {
    getNamusCase(match.params.id);
  }, [getNamusCase]);
  console.log("showing namusCase: " + namusCase);

  return (
    <Fragment>
      {namusCase === undefined || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="row">
            <div className="col-md-12">
              <Link to="/results" className="btn btn-secondary back-btn">
                <i id="toggleIcon" className="fa fa-angle-double-down"></i> Back
                to Results
              </Link>
            </div>
          </div>
          <h1 className="page-header">Case #{namusCase.namus2Number}</h1>
          <p className="lead">
            <i className="fas fa-folder-open gold-icon"></i>&nbsp;&nbsp;
            {namusCase.State_Of_Last_Contact} > Missing Person
          </p>
          <h5>
            {namusCase.First_Name} {namusCase.Middle_Name} {namusCase.Last_Name}
          </h5>
          <div className="row no-gutters">
            <div className="col-md-2">
              <img src={namusCase.image} className="card-img" />
            </div>
            <div className="col-md-10">
              <div className="card-body">
                <p className="card-text">
                  <strong>Area of Last Contact: </strong>{" "}
                  {namusCase.City_Of_Last_Contact},{" "}
                  {namusCase.State_Of_Last_Contact}
                </p>
                <p className="card-text">
                  <strong>Date of Last Contact: </strong>{" "}
                  {namusCase.Date_Of_Last_Contact}
                </p>
                <p className="card-text">
                  <strong>Age at Time of Disappearance:</strong>{" "}
                  {namusCase.Computed_Missing_Min_Age}
                </p>
                <p className="card-text">
                  <strong>Current Age:</strong> {namusCase.Current_Age_To}
                </p>
                <p className="card-text">
                  <strong>Race/Ethnicity:</strong> {namusCase.Race_Ethnicity}
                </p>
                <p className="card-text">
                  <strong>Gender:</strong> {namusCase.Gender}
                </p>
                <p className="card-text float-right">
                  <small className="text-muted">
                    Last updated{" "}
                    <Moment format="MM/DD/YYYY hh:mm A">
                      {namusCase.Modified_Date_Time}
                    </Moment>
                  </small>
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-10 spacer">
              <h5>Links</h5>
              <ul>
                <li>
                  <i className="fas fa-link text-muted"></i>&nbsp;&nbsp;
                  <a href={namusCase.link} target="_blank">
                    Official Namus Case File
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <GMap persons={namusCase} />
          <CaseComments caseid={namusCase._id} />
        </Fragment>
      )}
    </Fragment>
  );
};

NamusCase.propTypes = {
  getNamusCase: PropTypes.func.isRequired,
  namus: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  namus: state.namus
});

export default connect(mapStateToProps, { getNamusCase })(NamusCase);
