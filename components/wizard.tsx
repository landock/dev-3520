import * as React from "react";

import { Form } from "react-final-form";

interface Props {
  initialValues: any;
  onSubmit: any;
}
interface State {
  page: number;
  values: DomainModel;
}
type Stooge = "larry" | "moe" | "curly";
type Toppings = "ham" | "mushrooms" | "cheese" | "chicken";
interface DomainModel {
  firstName?: string;
  employed?: string;
  stooge: Stooge;
  toppings: Array<Toppings>;
}

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
      page: Math.min(
        state.page + 1,
        React.Children.count(this.props.children) - 1
      ),
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
            {activePage}
            <div className="buttons">
              {page > 0 && (
                <button type="button" onClick={this.previous}>
                  « Previous
                </button>
              )}
              {!isLastPage && <button type="submit">Next »</button>}
              {isLastPage && (
                <button type="submit" disabled={submitting}>
                  Submit
                </button>
              )}
            </div>

            <pre>{JSON.stringify(values, null, 1)}</pre>
          </form>
        )}
      </Form>
    );
  }
}
