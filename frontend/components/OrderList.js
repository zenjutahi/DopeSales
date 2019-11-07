import React, { Component } from "react";
import { Query } from "react-apollo";
import { formartDistance } from "date-fns";
import Link from "next/link";
import gql from "graphql-tag";
import styled from "styled-components";
import formatMoney from "../lib/formatMoney";
import OrderItemStyles from "./styles/OrderItemStyles";

const USERS_ORDER_LIST_QUERY = gql`
  query USERS_ORDER_LIST_QUERY {
    orders(orderBy: createdAt_DESC) {
      id
      total
      createdAt
      items {
        id
        title
        price
        description
        quantity
        image
      }
    }
  }
`;

const OrderUl = styled.ul`
  display: grid;
  grid-gap: 4rem;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
`;

class OrderList extends React.Component {
  render() {
    return (
      <Query query={USERS_ORDER_LIST_QUERY}>
        {({ data: { orders }, loading, error }) => {
          if (loading) return <p>Loading...</p>;
          if (error) return <Error error={error} />;
          console.log(orders);
          return (
            <div>
              <h4>You have {orders.length} Orders 💁‍♂️ </h4>
              <OrderUl>
                {orders.map(order => (
                  <OrderItemStyles>
                    <Link
                      href={{
                        pathname: "/order",
                        query: { id: order.id }
                      }}
                    >
                      <a>Hi</a>
                    </Link>
                  </OrderItemStyles>
                ))}
              </OrderUl>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default OrderList;
