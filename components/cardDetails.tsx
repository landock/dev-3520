import React from "react";
import { Field } from "react-final-form";
import { Input } from "antd";
import Error from "./error";
import Required from "../shared/required";

const InputAdapter = ({ input, meta }) => (
  <Input {...input} errorText={meta.touched ? meta.error : ""} />
);
const CardDetails = () => {
  return (
    <div>
      <div>
        <label>First Name</label>
        <Field
          name="firstName"
          component={InputAdapter}
          type="text"
          placeholder="First Name"
          validate={Required}
        />
        <Error name="firstName" />
      </div>
      <div>
        <label>Last Name</label>
        <Field
          name="lastName"
          component={InputAdapter}
          type="text"
          placeholder="Last Name"
          validate={Required}
        />
        <Error name="lastName" />
      </div>
      <div>
        <label>Card Number</label>
        <Field
          name="cardNumber"
          component={InputAdapter}
          type="number"
          placeholder="992928181282"
        />
        <Error name="cardNumber" />
      </div>
      <div>
        <label>Expiration Date</label>
        <Field
          name="expirationDate"
          component={InputAdapter}
          type="month"
          placeholder="10/22"
          validate={Required}
        />
        <Error name="expirationDate" />
      </div>
      <div>
        <label>CVC</label>
        <Field
          name="cvc"
          component={InputAdapter}
          type="text"
          placeholder="024"
          validate={Required}
        />
        <Error name="cvc" />
      </div>
    </div>
  );
};

export default CardDetails;
