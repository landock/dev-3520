import * as React from "react";

import { Steps, Button,Divider, Row, Col } from "antd";
import { Form } from "react-final-form";

//TODO: Move all these to shared/models or something and add actual form params to DomainModel
interface Props {
  initialValues: DomainModel;
  onSubmit: Function;
}
interface State {
  page: number;
  values: DomainModel;
}
type Stooge = "larry" | "moe" | "curly";
type Toppings = "ham" | "mushrooms" | "cheese" | "chicken";

interface DomainModel {
  firstName?: string;
  employed?: boolean;
  stooge?: Stooge;
  toppings?: Array<Toppings>;
  lastName?: string;
  favoriteColor?: string;
  notes?: string;
  amount?: number;
}
const { Step } = Steps;
export default class Wizard extends React.Component<Props, State> {
  static Page: any = ({ children }: { children: React.ReactChildren }) =>
    children;

  constructor(props: Props) {
    super(props);
    this.state = {
      page: 0,
      values: props.initialValues || {}
    };
  }
  next = (values: DomainModel) =>
    this.setState(state => ({
      page: Math.min(state.page + 1, (this.props.children as any).length - 1),
      values
    }));

  previous = () =>
    this.setState(state => ({
      page: Math.max(state.page - 1, 0)
    }));

  /**
   * NOTE: Both validate and handleSubmit switching are implemented
   * here because 🏁 Redux Final Form does not accept changes to those
   * functions once the form has been defined.
   */

  validate = (values: DomainModel) => {
    const activePage: any = React.Children.toArray(this.props.children)[
      this.state.page
    ];
    return activePage.props.validate ? activePage.props.validate(values) : {};
  };

  handleSubmit = (values: DomainModel) => {
    const { children, onSubmit } = this.props;
    const { page } = this.state;
    const isLastPage = page === React.Children.count(children) - 1;
    if (isLastPage) {
      return onSubmit(values);
    } else {
      this.next(values);
    }
  };

  render() {
    const { children } = this.props;
    const { page, values } = this.state;
    const activePage = React.Children.toArray(children)[page];
    const isLastPage = page === React.Children.count(children) - 1;
    return (
      <Form
        initialValues={values}
        validate={this.validate}
        onSubmit={this.handleSubmit}
      >
        {({ handleSubmit, submitting, values }) => (
          <form onSubmit={handleSubmit}>
            <Row>
              <Col span={24}>
                <Divider />
                <Steps progressDot current={page}>

                  <Step title="Finished" description="This is a description." />
                  <Step
                    title="In Progress"
                    description="This is a description."
                  />
                  <Step title="Waiting" description="This is a description." />
                  <Step title="" description="This is a description." />
                </Steps>
              </Col>
            </Row>
            <Row>
              <Col span={24}>

                <Divider />
                {activePage}
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <div className="buttons">
                  {page > 0 && (
                    <Button onClick={this.previous}>« Previous</Button>
                  )}
                  {!isLastPage && (
                    <Button type="primary" htmlType="submit">
                      Next »
                    </Button>
                  )}
                  {isLastPage && (
                    <Button
                      type="primary"
                      htmlType="submit"
                      disabled={submitting}
                    >
                      Submit
                    </Button>
                  )}
                </div>
              </Col>
            </Row>
            <pre>{JSON.stringify(values, null, 1)}</pre>
          </form>
        )}
      </Form>
    );
  }
}
