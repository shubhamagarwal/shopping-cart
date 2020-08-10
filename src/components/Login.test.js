import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import configureStore from "redux-mock-store";
import sinon from "sinon";
import Login from './Login';

const initialState = {};
const configure = (initialState) => {
  const mockStore = configureStore()(initialState);
  return mockStore;
};

const setup = (propOverrides) => {
  const props = Object.assign({}, propOverrides);

  const wrapper = shallow(
    <Login store={configure(initialState)} {...props} />
  ).dive();

  return {
    wrapper,
  };
};

describe('Login Container', () => {
  it('Should render login container', () => {
    const { wrapper } = setup()
    expect(wrapper.exists()).to.equal(true)
  })
});
