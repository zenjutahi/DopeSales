import React from "react";
import Head from "next/head";
import { format, formatDistance } from "date-fns";
import Error from "./ErrorMessage";
import User, { CURRENT_USER_QUERY } from "./User";
import OrderStyles from "./styles/OrderStyles";

class UserAccount extends React.Component {
  render() {
    return (
      <User>
        {({ data: { me }, error, loading }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          return (
            <OrderStyles>
              <Head>
                <title>Dope Sales - {me.name}</title>
              </Head>
              <p>
                <span>First Name :</span>
                <span>{me.name}</span>
              </p>
              <p>
                <span>Account Email :</span>
                <span>{me.email}</span>
              </p>
              <p>
                <span>My Permissions :</span>
                <span>
                  {me.permissions.map(perm => (
                    <span key={perm}>{perm}</span>
                  ))}
                </span>
              </p>
              <p>
                <span>Date Joined :</span>
                <span>{formatDistance(me.createdAt, new Date())}</span>
              </p>
            </OrderStyles>
          );
        }}
      </User>
    );
  }
}

export default UserAccount;
