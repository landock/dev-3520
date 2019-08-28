import React from "react";
import { Field } from "react-final-form";
import Error from "./error";
import Required from "../shared/required";
import {Input} from 'antd';

const InputAdapter = ({ input, meta}) => (
  <Input
    {...input}
    errorText={meta.touched ? meta.error : ''}
  />
);
const Address = () => {
  return (
    <div>
      <div>
        <label>Street</label>
        <Field
          name="street1"
          component={InputAdapter}
          type="text"
          placeholder="123 main st."
          validate={Required}
        />
        <Error name="street1" />
      </div>
      <div>
        <label>Street 2</label>
        <Field
          name="street2"
          component={InputAdapter}
          type="text"
          placeholder="Ste 203"
        />
        <Error name="street2" />
      </div>
      <div>
        <label>City</label>
        <Field
          name="city"
          component={InputAdapter}
          type="text"
          placeholder="Transylvania"
          validate={Required}
        />
        <Error name="city" />
      </div>
      <div>
        <label>State</label>
        <Field
          name="state"
          component={InputAdapter}
          type="text"
          placeholder="ca"
        />
        <Error name="state" />
      </div>
      <div>
        <label>Zipcode</label>
        <Field
          name="zipcode"
          component={InputAdapter}
          type="number"
          placeholder="90210"
          validate={Required}
        />
        <Error name="zipcode" />
      </div>
    </div>
  );
};

export default Address;
