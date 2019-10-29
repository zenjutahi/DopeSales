import React, { Component } from "react";
import { Mutation } from "react-apollo";
import gql from "graphql-tag";
import styled from "styled-components";
import { ALL_ITEMS_QUERY } from "./Items";

const DeleteButton = styled.button`
  cursor: pointer;
`;

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

class DeleteItem extends Component {
  update = (cache, payload) => {
    // manually update the cache on the client, so it matches the server
    // 1. Read the cache for the items we want
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    console.log(data, payload);
    // 2. Filter the deleted item out of the page
    data.items = data.items.filter(
      item => item.id !== payload.data.deleteItem.id
    );
    // Put the Item back
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };
  render() {
    return (
      <Mutation
        mutation={DELETE_ITEM_MUTATION}
        variables={{ id: this.props.id }}
        update={this.update}
      >
        {(deleteItem, { error }) => (
          <DeleteButton
            onClick={() => {
              if (confirm("Are you sure you want to delete this Item")) {
                deleteItem().catch(err => {
                  alert(err.message);
                });
              }
            }}
          >
            {this.props.children}
          </DeleteButton>
        )}
      </Mutation>
    );
  }
}

export default DeleteItem;
