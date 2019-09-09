import React, { Component } from 'react'
import { Mutation } from 'react-apollo';
import Router from 'next/router';
import gql from 'graphql-tag';
import Form from './styles/Form';
import Error from './ErrorMessage';
import formatMoney from '../lib/formatMoney';


const CREATE_ITEM_MUTATION = gql`
    mutation CREATE_ITEM_MUTATION(
        $title: String!
        $price: Int!
        $description: String!
        $image: String
        $largeImage: String
    ) {
        createItem(
            title: $title
            price: $price
            description: $description
            image: $image
            largeImage: $largeImage
        )
        {
            id
            title
        }
    }
`;


class CreateItem extends Component {
    state = {
        title: 'Cool Socks',
        description: 'In general, the details of Aristotles life are not well-established',
        image: 'dog.jpeg',
        largeImage: 'large-dog.jpeg',
        price: 96730,
    };
    handleChage = e => {
        const { name, type, value } = e.target;
        const val = type === 'number' ? parseFloat(value) :
        value; 
        this.setState({ [name]: val });
    }


    render() {
        return (
            <Mutation mutation={CREATE_ITEM_MUTATION} variables=
                {this.state} >
                    { (createItem, {loading, error }) => (
                //implicit return        
                <Form onSubmit={ async e=> {
                    // stop the form from submiting
                    e.preventDefault();
                    // call the mutation
                    const res = await createItem();
                    // change/redirect to single Item page
                    Router.push({
                        pathname: '/item',
                        query : {id: res.data.createItem.id},
                    });
                }}>
                    <Error error={error} />
                    <fieldset disabled={loading} aria-busy={loading}>
                        <label htmlFor="title">
                            Title
                            <input type="text" 
                            id="title" 
                            name="title"
                            placeholder="Title" 
                            required
                            value= {this.state.title}
                            onChange={this.handleChage}
                            />
                        </label>
                        <label htmlFor="price">
                            Price
                            <input type="number" 
                            id="price" 
                            name="price"
                            placeholder="Price" 
                            required
                            value= {this.state.price}
                            onChange={this.handleChage}
                            />
                        </label>
                        <label htmlFor="description">
                            Description
                            <textarea  
                            id="description" 
                            name="description"
                            placeholder="Enter a Description" 
                            required
                            value= {this.state.description}
                            onChange={this.handleChage}
                            />
                        </label>
                        <button type="submit">Submit</button>
                    </fieldset>
                    </Form> 
                )}
            </Mutation>
        );
    }
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
