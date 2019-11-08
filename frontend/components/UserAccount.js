import React from "react";
import User, { CURRENT_USER_QUERY } from "./User";

class UserAccount extends React.Component {
  render() {
    return <User>{({ data: { me } }) => <p>Show me this {me.id}</p>}</User>;
  }
}

export default UserAccount;
