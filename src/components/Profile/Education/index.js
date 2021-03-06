import React, { Component } from 'react';
import { Table, Input } from 'reactstrap';
import AddIcon from 'mdi-react/AddIcon';

import Panel from '../../Panel/Panel';
import EducationTableRow from './EducationTableRow';
import InputRow from './InputRow';
import EducationApi from '../../../apis/User/Education';
import { getUserObject } from '../../../constants/LocalStorageManager';
import Toaster from '../../Toaster/ToastManager';
import DeleteModal from './DeleteModal';

const newData = {
  institution: '',
  level: 'SLC/SEE',
  passed_year: '',
  board: ''
};

class EducationInfo extends Component {
  constructor() {
    super();
    this.state = {
      educations: [],
      inputField: {},
      errors: {},
      isAddRowVisible: false,
      isDeleteModalVisible: false,
      deleteId: null
    };
  }

  componentDidMount() {
    this.fetchAll();
  }

  fetchAll() {
    const { userId } = this.props;

    EducationApi.getAll(userId)
      .then(({ data }) => {
        this.setState({ educations: data });
      })
      .catch(() => {
        Toaster.getErrorToaster('Error fetching data');
      });
  }

  handleEdit = education => {
    this.setState(prevState => {
      const inputField = prevState.inputField.id ? {} : education;
      return {
        inputField,
        isAddRowVisible: false,
        errors: {}
      };
    });
  };

  updateEducationField = () => {
    const { inputField } = this.state;
    const { id } = inputField;

    const { passed_year, ...other } = inputField;
    const updateData = passed_year
      ? inputField
      : { ...other, passed_year: null };

    EducationApi.update(updateData, id)
      .then(() => {
        Toaster.getSuccessToaster('Successfully updated education');
        this.clearEdit();
        this.fetchAll();
      })
      .catch(e => {
        Toaster.getErrorToaster('Failed to update education');
      });
  };

  addNewEducation = () => {
    const { inputField } = this.state;
    const { userId } = this.props;

    const { passed_year, ...other } = inputField;
    const addData = passed_year ? inputField : other;

    EducationApi.addNew(addData, userId).then(({ data }) => {
      Toaster.getSuccessToaster('Successfully added education');
      this.toggleAddNew();
      this.fetchAll();
    });
  };

  confirmEdit = () => {
    const { inputField } = this.state;
    const isValid = this.validateFields(inputField);
    if (isValid) {
      this.updateEducationField();
    }
  };

  handleChange = e => {
    const { value, name } = e.target;
    const { inputField } = this.state;
    const updatedField = { ...inputField };
    updatedField[name] = value;
    this.setState({
      inputField: updatedField
    });
  };

  clearEdit = () => {
    this.setState({ inputField: {} });
  };

  toggleAddNew = () => {
    this.setState(({ isAddRowVisible }) => ({
      isAddRowVisible: !isAddRowVisible,
      inputField: newData,
      errors: {}
    }));
  };

  addNew = () => {
    const { inputField } = this.state;
    const isValid = this.validateFields(inputField);

    if (isValid) {
      this.addNewEducation();
    }
  };

  handleBlur = e => {
    const { value, name } = e.target;
    const { inputField } = this.state;
    const updatedField = { ...inputField };
    updatedField[name] = value.trim();
    this.setState({
      inputField: updatedField
    });
  };

  validateFields = inputField => {
    const errors = {};
    const { level, institution, board, passed_year } = inputField;
    const data = { level, institution, board, passed_year };
    let isValid = true;
    const keys = Object.keys(data);
    keys.forEach(key => {
      if (key == 'passed_year') {
        if (!inputField[key]) return;
      }
      const value = inputField[key];
      let currentFieldIsValid = !!value;
      if (!currentFieldIsValid) errors[key] = 'Enter valid details';
      if (key == 'passed_year') {
        if (inputField[key] < 1956 || inputField[key] > 2020){
          errors[key] = 'Enter valid date ';
          currentFieldIsValid = false;
        }
      }
      isValid = isValid && currentFieldIsValid;
    });

    this.setState({ errors });

    return isValid;
  };

  toggleDeleteModal = id => {
    const idType = typeof id;
    const deleteId = idType == 'string' || idType == 'number' ? id : undefined;
    this.setState(prevState => ({
      deleteId,
      isDeleteModalVisible: !prevState.isDeleteModalVisible
    }));
  };

  confirmDelete = () => {
    const { deleteId } = this.state;
    if (deleteId) {
      EducationApi.delete(deleteId)
        .then(() => {
          Toaster.getSuccessToaster('Education deleted successfully');
          this.fetchAll();
          this.toggleDeleteModal();
        })
        .catch(() => {
          Toaster.getErrorToaster('Error deleting field');
          this.toggleDeleteModal();
        });
    }
  };

  render() {
    const {
      educations,
      inputField,
      isAddRowVisible,
      errors,
      deleteId,
      isDeleteModalVisible
    } = this.state;

    const hasEducationList = educations.length > 0;

    return (
      <Panel title='Education' table>
        <DeleteModal
          deleteId={deleteId}
          confirmDelete={this.confirmDelete}
          toggleModal={this.toggleDeleteModal}
          isVisible={isDeleteModalVisible}
        />
        <Table
          responsive
          className={!(hasEducationList || isAddRowVisible) && 'd-none'}
        >
          <thead>
            <tr>
              <td></td>
              <td>Institution</td>
              <td>Level</td>
              <td>Board</td>
              <td>Passed Year (AD)</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {educations.map((education, index) => {
              return (
                <EducationTableRow
                  key={index}
                  count={++index}
                  handleChange={this.handleChange}
                  confirmEdit={this.confirmEdit}
                  clearEdit={this.clearEdit}
                  handleEdit={this.handleEdit}
                  education={education}
                  inputField={inputField}
                  toggleDeleteModal={this.toggleDeleteModal}
                  errors={errors}
                />
              );
            })}
            <InputRow
              isVisible={isAddRowVisible}
              clearEdit={this.toggleAddNew}
              handleChange={this.handleChange}
              confirmEdit={this.addNew}
              data={inputField}
              errors={errors}
            />
          </tbody>
        </Table>
        {!isAddRowVisible && (
          <div className='w-100 d-flex justify-content-center border-top pt-4'>
            <button className='btn btn-primary' onClick={this.toggleAddNew}>
              <AddIcon /> Add new
            </button>
          </div>
        )}
      </Panel>
    );
  }
}

export default EducationInfo;
