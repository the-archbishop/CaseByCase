import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import Spinner from '../Layout/Spinner/Spinner';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const MissingPersonItem = ({ persons, loading }) => {
	return loading && persons === null ? (
		<Spinner />
	) : (
		<Fragment>
			{persons.map(person => (
				<div className='card text-white bg-dark' key={person._id}>
					<div className='d-flex align-items-center'>
						<h5 className='highlight card-header mx-auto w-100'>
							{person.First_Name} {person.Middle_Name} {person.Last_Name}
							<a
								href={person.link}
								target='_blank'
								className='btn float-right ext-btn'
							>
								<i className='fas fa-external-link-alt'></i>
							</a>
						</h5>
					</div>
					<div className='row no-gutters'>
						<div className='col-md-2'>
							<img src={person.image} className='card-img' />
						</div>
						<div className='col-md-10'>
							<div className='card-body'>
								<p className='card-text'>
									<strong>Area of Last Contact: </strong> {person.City_Of_Last_Contact}
									, {person.State_Of_Last_Contact}
								</p>
								<p className='card-text'>
									<strong>Date of Last Contact: </strong> {person.Date_Of_Last_Contact}
								</p>
								<p className='card-text'>
									<strong>Age at Time of Disappearance:</strong>{' '}
									{person.Computed_Missing_Min_Age}
								</p>
								<br />
								<p className='card-text'>
									<strong>Current Age:</strong> {person.Current_Age_To}
								</p>
								<p className='card-text'>
									<strong>Race/Ethnicity:</strong> {person.Race_Ethnicity}
								</p>
								<p className='card-text'>
									<strong>Gender:</strong> {person.Gender}
								</p>
								<p className='card-text float-right'>
									<small className='text-muted'>
										Last updated{' '}
										<Moment format='MM/DD/YYYY hh:mm A'>
											{person.Modified_Date_Time}
										</Moment>
									</small>
								</p>
							</div>
						</div>
					</div>
				</div>
			))}
		</Fragment>
	);
};

MissingPersonItem.propTypes = {
	person: PropTypes.object.isRequired
};

export default MissingPersonItem;