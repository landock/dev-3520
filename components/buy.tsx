import React from "react";
import { Field } from "react-final-form";
import { Select, Input } from "antd";
import Error from "./error";
import Required from "../shared/required";

const InputAdapter = ({ input, meta }) => (
  <Input {...input} errorText={meta.touched ? meta.error : ""} />
);

const Buy = () => {
  return (
    <div>
      <div>
        <label>Buy Amount</label>
        <Field
          name="amount"
          component={InputAdapter}
          type="number"
          placeholder="10"
          validate={Required}
        />
        <Error name="amount" />
      </div>
      <div>
        <Field name="currency" label="currency">
          {props => (
            <Select
              defaultValue={props.input.value}
              onChange={props.input.onChange}
            >
              <Select.Option key={0} />
              <Select.Option key={1} title="eth" value="eth">
                ❤️ ETH
              </Select.Option>
              <Select.Option key={2} title="btc" value="btc">
                💚 BTC
              </Select.Option>
              <Select.Option key={3} title="dai" value="dai">
                💙 DAI
              </Select.Option>
              <Select.Option key={4} title="usdc" value="usdc">
                💙 USDC
              </Select.Option>
            </Select>
          )}
        </Field>
        <Error name="currency" />
      </div>
    </div>
  );
};

export default Buy;
