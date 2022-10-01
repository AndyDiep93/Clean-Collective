import React, { useState } from "react";
import axios from "axios";
import CompanyForm from "./CompanyForm";
import { useNavigate } from "react-router-dom";

const CreateUser = () => {
  const navigate = useNavigate();
  const [formValues] = useState({
    companyName: "",
    type: "",
    file: "",
    companyType: "",
    stage: "",
    employees: "",
    website: "",
    check: false
  });


  

  return(
    <CompanyForm
      initialValues={formValues}
      onSubmit={OnSubmit}
      enableReinitialize
    >
      Sign Up
    </CompanyForm>

  )

}