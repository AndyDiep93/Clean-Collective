import React from "react";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { FormGroup, Button, NavLink } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";





const UserLoginForm = (props) => {
  const validationSchema = Yup.object().shape({
    
   // password: Yup.string().required("Required"),
  });




  console.log(props);
  return (

    
    
    <div className="form-group">
      <h2 classname="first-header">Welcome Back!</h2>
      <Formik {...props} validationSchema={validationSchema}>
        <Form>
          <FormGroup>
            <label htmlFor="login_email_feild">Email: </label>
            <Field id="email" name="login_email_feild" type="text" className="form-control" />
            <ErrorMessage
              name="login_email_feild"
              className="d-block invalid-feedback"
              component={"span"}
            />
            <label htmlFor="login_password_feild">Password: </label>
            <Field id="password" name="login_password_feild" type="password" className="form-control" />
            <ErrorMessage
              name="login_password_feild"
              className="d-block invalid-feedback"
              component={"span"}
            />
          </FormGroup>
          <Button variant="btn btn-primary" size="lg" block="block" onClick={""} type="submit" >
            {props.children}
          </Button>

          <div className="login_links" >
            <p><Link to={"/create-user"}>Register now</Link></p>
            <p><Link to={""}>Forgot Password?</Link></p>
          </div>


        </Form>
      </Formik>
    </div>
  );
};

export default UserLoginForm;