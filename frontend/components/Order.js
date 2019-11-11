import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import { format } from "date-fns";
import Head from "next/head";
import gql from "graphql-tag";
import formartMoney from "../lib/formatMoney";
import Error from "./ErrorMessage";
import OrderStyles from "./styles/OrderStyles";

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      id
      charge
      total
      createdAt
      user {
        id
      }
      items {
        id
        title
        description
        price
        image
        quantity
      }
    }
  }
`;

class Order extends React.Component {
  static propTypes = {
    id: PropTypes.string.isRequired
  };
  render() {
    return (
      <Query query={SINGLE_ORDER_QUERY} variables={{ id: this.props.id }}>
        {({ data, error, loading }) => {
          if (error) return <Error error={error} />;
          if (loading) return <p>Loading...</p>;
          const order = data.order;
          return (
            <OrderStyles>
              <Head>
                <title>Dope Sales - Order</title>
              </Head>
              <p>
                <span>Order ID :</span>
                <span>{this.props.id}</span>
              </p>
              <p>
                <span>Charge :</span>
                <span>{order.charge}</span>
              </p>
              <p>
                <span>Date :</span>
                <span>{format(order.createdAt, "MMM d, YYY h:mm a")}</span>
              </p>
              <p>
                <span>Order Total :</span>
                <span>{formartMoney(order.total)}</span>
              </p>
              <p>
                <span>Item Count :</span>
                <span>{order.items.length}</span>
              </p>
              <div className="items">
                {order.items.map(item => (
                  <div className="order-item" key={item.id}>
                    <img src={item.image} alt={item.title} />
                    <div className="item-deatails">
                      <h4>{item.title}</h4>
                      <p>Qty : {item.quantity}</p>
                      <p>Each : {formartMoney(item.price)}</p>
                      <p>Qty : {formartMoney(item.price * item.quantity)}</p>
                      <p>{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </OrderStyles>
          );
        }}
      </Query>
    );
  }
}

export default Order;
