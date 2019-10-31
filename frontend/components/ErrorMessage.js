import styled from "styled-components";
import React from "react";
import FlashMessage from "react-flash-message";
import PropTypes from "prop-types";

const ErrorStyles = styled.div`
  border: 1px solid #d8d8d8;
  border-radius: 5px;
  font-family: Arial;
  font-size: 11px;
  text-transform: uppercase;
  background-color: rgb(255, 249, 242);
  text-align: center;
  padding: 1rem;
  background: white;
  margin: 2rem 0;
  border-left: 5px solid red;
  p {
    margin: 0;
    font-weight: 100;
  }
  strong {
    margin-right: 1rem;
  }
`;

const DisplayError = ({ error }) => {
  if (!error || !error.message) return null;
  if (
    error.networkError &&
    error.networkError.result &&
    error.networkError.result.errors.length
  ) {
    return error.networkError.result.errors.map((error, i) => (
      <ErrorStyles key={i}>
        <p data-test="graphql-error">
          <strong>Shoot!</strong>
          {error.message.replace("GraphQL error: ", "")}
        </p>
      </ErrorStyles>
    ));
  }
  return (
    <FlashMessage duration={100000}>
      <ErrorStyles>
        <p data-test="graphql-error">
          <strong>Shoot!</strong>
          {error.message.replace("GraphQL error: ", "")}
        </p>
      </ErrorStyles>
    </FlashMessage>
  );
};

DisplayError.defaultProps = {
  error: {}
};

DisplayError.propTypes = {
  error: PropTypes.object
};

export default DisplayError;
