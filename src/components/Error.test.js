import React from "react";
import { shallow } from "enzyme";
import { expect } from "chai";
import Error from "./Error";

const wrapper = shallow(<Error />);

describe("Error component", () => {
  it("Should have server error", () => {
    const text = wrapper.find("h2").text();
    expect(text).to.have.string("Looks Like Server is down");
  });
});
