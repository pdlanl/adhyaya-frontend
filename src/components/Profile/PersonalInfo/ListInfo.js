import React, { Component } from 'react';
import moment from 'moment';
import AddIcon from 'mdi-react/AddIcon';

class ListInfo extends Component {
  constructor() {
    super();
  }

  render() {
    const {
      dob,
      father_name,
      mother_name,
      marital_status,
      isNotUpdated,
      toggleEdit
    } = this.props;

    if (isNotUpdated) {
      return (
        <div className='d-flex flex-column justify-content-between align-items-center'>
          <h3>Oops!</h3>
          <p>You haven't added your personal details.</p>
          <button className='btn btn-primary m-5' onClick={toggleEdit}>
            <AddIcon /> Update
          </button>
        </div>
      );
    }

    return (
      <div className='container'>
        <div className='form__form-group'>
          <span className='form__form-group-label'>Date of birth: </span>
          <div className='form__form-group-field'>
            <div>{dob.value && moment(dob.value).format('MMMM DD, YYYY')}</div>
          </div>
        </div>
        <div className='form__form-group'>
          <span className='form__form-group-label'>Father's Name: </span>
          <div className='form__form-group-field'>
            <div>{father_name.value}</div>
          </div>
        </div>
        <div className='form__form-group'>
          <span className='form__form-group-label'>Mother's Name: </span>
          <div className='form__form-group-field'>
            <div>{mother_name.value}</div>
          </div>
        </div>
        <div className='form__form-group'>
          <span className='form__form-group-label'>Marital Status</span>
          <div className='form__form-group-field'>
            <div>{marital_status.value}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ListInfo;
