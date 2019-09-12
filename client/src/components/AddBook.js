import React, { Component } from "react";
import { graphql, Mutation } from "react-apollo";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery
} from "../queries/queries";

import { compose } from "redux";

class AddBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      genre: "",
      authorId: ""
    };
  }

  displayAuthors() {
    var data = this.props.getAuthorsQuery;
    // console.log(data);
    if (data.loading) {
      return <option disabled>Loading Authors...</option>;
    } else {
      return data.authors.map(author => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  }

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  render() {
    // console.log(this.props);
    return (
      <Mutation mutation={addBookMutation}>
        {addBook => (
          <div>
            <form
              id="add-book"
              onSubmit={e => {
                e.preventDefault();
                addBook({
                  variables: {
                    name: this.state.name,
                    genre: this.state.genre,
                    authorId: this.state.authorId
                  },
                  refetchQueries: [
                    {
                      query: getBooksQuery
                    }
                  ]
                });
              }}
            >
              <h1>Add Book:</h1>
              <div className="field">
                <label>Book name:</label>
                <input type="text" id="name" onChange={this.handleChange} />
              </div>

              <div className="field">
                <label>Genre:</label>
                <input type="text" id="genre" onChange={this.handleChange} />
              </div>

              <div className="field">
                <label>Authors:</label>
                <select
                  onChange={e => {
                    this.setState({ authorId: e.target.value });
                  }}
                >
                  <option>Select Author</option>
                  {this.displayAuthors()}
                </select>
              </div>

              <button>Submit</button>
            </form>
          </div>
        )}
      </Mutation>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, { name: "getAuthorsQuery" }),
  graphql(addBookMutation, { name: "addBookMutation" })
)(AddBook);
