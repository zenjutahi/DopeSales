import React from "react";
import styled from "styled-components";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";

const CartButton = styled.button`
  cursor: pointer;
`;

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

class AddToCart extends React.Component {
  render() {
    const { id } = this.props;
    return (
      <Mutation mutation={ADD_TO_CART_MUTATION} variables={{ id }}>
        {addToCart => (
          <CartButton onClick={addToCart}>Add To Cart 🛒</CartButton>
        )}
      </Mutation>
    );
  }
}

export default AddToCart;
