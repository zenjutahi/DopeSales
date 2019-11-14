import { mount } from "enzyme";
import wait from "waait";
import toJSON from "enzyme-to-json";
import { MockedProvider } from "react-apollo/test-utils";
import { ApolloConsumer } from "react-apollo";
import Signup, { SIGNUP_MUTATION } from "../components/Signup";
import { CURRENT_USER_QUERY } from "../components/User";
import { fakeUser } from "../lib/testUtils";

function findType(wrapper, name, value) {
  wrapper
    .find(`input[name="${name}"]`)
    .simulate("change", { target: { name, value } });
}

const me = fakeUser();
const mocks = [
  // Signup mock mutation
  {
    request: {
      query: SIGNUP_MUTATION,
      variables: {
        name: me.name,
        email: me.email,
        password: "1224ht5"
      }
    },
    result: {
      data: {
        signup: {
          __typename: "User",
          id: me.id,
          email: me.email,
          name: me.name
        }
      }
    }
  },
  // Current user query mock
  {
    request: { query: CURRENT_USER_QUERY },
    result: { data: { me } }
  }
];

describe("<Signup />", () => {
  it("renders and matches snapshot", async () => {
    const wrapper = mount(
      <MockedProvider>
        <Signup />
      </MockedProvider>
    );
    expect(toJSON(wrapper.find("form"))).toMatchSnapshot();
  });

  it("calls the mutation as expected", async () => {
    let apolloClient;
    const wrapper = mount(
      <MockedProvider mocks={mocks}>
        <ApolloConsumer>
          {client => {
            apolloClient = client;
            return <Signup />;
          }}
        </ApolloConsumer>
      </MockedProvider>
    );
    await wait();
    wrapper.update();
    findType(wrapper, "name", me.name);
    findType(wrapper, "email", me.email);
    findType(wrapper, "password", "1224ht5");
    wrapper.update();
    wrapper.find("form").simulate("submit");
    await wait();
    // Query the user out of the apollo client
    const user = await apolloClient.query({ query: CURRENT_USER_QUERY });
    console.log(user);
    expect(user.data.me).toMatchObject(me);
  });
});
