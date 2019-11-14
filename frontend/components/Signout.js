import React, { Component } from "react";
import Router from "next/router";
import { Mutation } from "react-apollo";
import FlashMessage from "react-flash-message";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

class Signout extends Component {
  render() {
    return (
      <Mutation
        mutation={SIGN_OUT_MUTATION}
        refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      >
        {signout => {
          return (
            <a
              onClick={async e => {
                e.preventDefault();
                const res = await signout();
                const message = res.data.signout.message;
                if (message) {
                  Router.push(`/signup`);
                }
              }}
            >
              Sign Out
            </a>
          );
        }}
      </Mutation>
    );
  }
}

export default Signout;
