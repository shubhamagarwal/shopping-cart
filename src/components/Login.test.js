import React from "react";
import { mount } from "enzyme";
import configureStore from "redux-mock-store";
import sinon from "sinon";
import Login from './Login';

const initialState = {
  user : {
      isLoggedIn : true
  }
};
const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useHistory: () => ({
    push: mockHistoryPush,
  }),
}));

const configure = () => {
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
  const setState = jest.fn();
  const useStateSpy = jest.spyOn(React, 'useState')
  useStateSpy.mockImplementation((init) => [init, setState]);

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Should render login container', () => {
    const { wrapper } = setup()
    expect(wrapper.exists()).toBeTruthy()
  })

  it('should call history function', ()=> {
    const { wrapper } = setup()
    expect(mockHistoryPush).toHaveBeenCalled
    expect(setState).toHaveBeenCalled
  })

  it('call signIn method', () => {
    const { wrapper } = setup()
    wrapper.find('.MuiButtonBase-root').simulate('click');
    const fetchUsersDetails = jest.fn();
    expect(fetchUsersDetails).toHaveBeenCalled
  })
});


