import React, { ReactComponentElement } from "react";
import { Field } from "react-final-form";
import {Input} from 'antd';
import Error from "./error";
import Required from "../shared/required";
import formatString from "format-string-by-pattern";

const mask = { name: "phone-1", parse: "999-999-9999" };

const InputAdapter = ({ input, meta}) => (
  <Input
    {...input}
    errorText={meta.touched ? meta.error : ''}
  />
);

const PersonalDetails = () : React.ReactComponentElement<any> => {
  return (
    <div>
      <div>
        <label>Date of Birth</label>
        <Field
          name="dob"
          component={InputAdapter}
          type="date"
          placeholder="12/10/2012"
          validate={Required}
        />
        <Error name="dob" />
       <div>
        <label>phone</label>
        <Field
          name="phone"
          component={InputAdapter}
          type="text"
          placeholder={mask.parse}
          parse={formatString(mask.parse)}
          validate={Required}
        />
        <Error name="email" />
      </div>     </div>
      <div>
        <label>Email</label>
        <Field
          name="email"
          component={InputAdapter}
          type="email"
          placeholder="mike@mail.com"
          validate={Required}
        />
        <Error name="email" />
      </div>
    </div>
  );
};

export default PersonalDetails;
