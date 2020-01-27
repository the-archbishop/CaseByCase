import React, { Fragment } from 'react';
import Moment from 'react-moment';
import PropTypes from "prop-types";
import Spinner from "../Layout/Spinner/Spinner";
import { Link } from "react-router-dom";

const SavedCaseItem = ({ favorites }) => {
    return favorites === undefined ? (
        <Spinner />
    ) : (
            <Fragment>
                {favorites.map(favorite => (
                    <tr>
                        <td><Link to={favorite.Link}>{favorite.Case_Number}</Link></td>
                        <td><Moment format='MM/DD/YYYY hh:mm A'>{favorite.Date_Of_Incident}</Moment></td>
                        <td>{favorite.Description}</td>
                        <td>{favorite.State}</td>
                        <td>Users</td>
                    </tr>
                ))}
            </Fragment>
        )
}

SavedCaseItem.propTypes = {
    favorites: PropTypes.object.isRequired
};

export default SavedCaseItem;