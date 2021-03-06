import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import EyeIcon from 'mdi-react/EyeIcon';
import KeyVariantIcon from 'mdi-react/KeyVariantIcon';
import AccountOutlineIcon from 'mdi-react/AccountOutlineIcon';
import ROUTES from '../../constants/Routes';

class LogInForm extends PureComponent {
  constructor() {
    super();
    this.state = {
      showPassword: false,
    };
  }

  showPassword = (e) => {
    e.preventDefault();
    this.setState(prevState => ({ showPassword: !prevState.showPassword }));
  };

  render() {
    const { email, password, handleSubmit, handleChange } = this.props;
    const { showPassword } = this.state;
    return (
      <Form className="form" onSubmit={handleSubmit}>
        <FormGroup className="form__form-group">
          <Label className="form__form-group-label">Email</Label>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <AccountOutlineIcon />
            </div>
            <Input 
              onChange={handleChange} 
              type="text" 
              placeholder="Email" 
              value={email} 
              name="email" 
            />
          </div>
        </FormGroup>
        <FormGroup className="form__form-group">
          <Label htmlFor="password" className="form__form-group-label">Password</Label>
          <div className="form__form-group-field">
            <div className="form__form-group-icon">
              <KeyVariantIcon />
            </div>
            <Input
              name="password"
              value={password}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
            />
            <button
              type="button"
              className={`form__form-group-button${showPassword ? ' active' : ''}`}
              onClick={e => this.showPassword(e)}
            >
              <EyeIcon />
            </button>
          </div>
          <div className="account__forgot-password">
            <Link to={ROUTES.FORGOT_PASSWORD}>Forgot a password?</Link>
          </div>
        </FormGroup>
        <button className="btn btn-primary account__btn account__btn--small" onClick={handleSubmit}>
          Sign In
        </button>
      </Form>
    );
  }
}

export default LogInForm;

