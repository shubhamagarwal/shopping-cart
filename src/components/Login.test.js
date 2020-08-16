import React from "react";
import { mount } from "enzyme";
import { expect } from "chai";
import configureStore from "redux-mock-store";
import sinon from "sinon";
import Login from './Login';

const initialState = {
  loginDetails: sinon.spy()
};
const configure = (initialState) => {
  const mockStore = configureStore()(initialState);
  return mockStore;
};

const setup = (propOverrides) => {
  const props = Object.assign({}, propOverrides);

  const wrapper = mount(
    <Login store={configure(initialState)} {...props} />
  );

  return {
    wrapper,
  };
};

describe('Login Container', () => {
  it('Should render login container', () => {
    const { wrapper } = setup()
    expect(wrapper.exists()).to.equal(true)
  })

  it('submit button', () => {
    const { wrapper } = setup()
    const e = { preventDefault : () => {}}
    // wrapper.instance().handleSubmit(e)
  })
});
