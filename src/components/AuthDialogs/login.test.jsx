import React from "react";
import { Provider } from "react-redux";
import { mount, configure } from "enzyme";
import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import Login from "./signInForm";
import Adapter from "enzyme-adapter-react-16";
import TextField from "@material-ui/core/TextField";

configure({ adapter: new Adapter() });
const mockStore = configureMockStore([thunk]);

describe("Login tests", () => {
  const store = mockStore({});
  const wrapper = mount(
    <Provider store={store}>
      <Login />
    </Provider>
  );
  it("should have a login button", () => {
    expect(wrapper.find("button").length).toEqual(1);
  });

  it("should render the form", () => {
    expect(wrapper.find(TextField).length).toEqual(2);
  });
});
