import React from 'react'
import { connect } from 'react-redux'

import { fetchProductsBegin, fetchProductsSuccess, fetchProductsFailure } from './productActions'

function fetchProducts() {
    return dispatch => {
        dispatch(fetchProductsBegin());
        fetch("http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline")
            .then(handleErrors)
            .then(res => res.json())
            .then(json => {
                if(json.error) {
                    throw(json.error);
                }
                dispatch(fetchProductsSuccess(json));
                console.log(json)
                return json
            })
            .catch(error => dispatch(fetchProductsFailure(error)));
  };
}
  
  // Handle HTTP errors since fetch won't.
  function handleErrors(response) {
    if (!response.ok) {
      throw Error(response.statusText);
    }
    return response;
  }

class ProductList extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            listOpen: false,
        }
    }
    componentDidMount() {
        this.props.dispatch(fetchProducts());
    }
    render () {
        console.log(this.props)
        const { error, loading, products } = this.props;

        if (error) {
            return <div>
                Error! {error.message}
            </div>
        }

        if (loading) {
            return <div>
                Loading...
            </div>
        }
        return (
            
            <div>
             <div className="container">
              <br/>
              <div className="row">
                <div className="input-group">
                  <div className="custom-select">
                   <option selected>Choose Product...</option>
                   <option value="1">One</option>
                   <option value="2">Two</option>
                   <option value="3">Three</option>
                  </div>
                </div>
              </div>
              <br/>
              <hr/>
              <br/>

             </div>
             <div className="container">
                <div className="row text-justify">
                  <ul>
                    {products.map(product => (
                        <li key={product.id}>{product.name}</li>
                    ))}
                  </ul>
                </div>
             </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    products: state.products.items,
    loading: state.products.loading,
    error: state.products.error
});

export default connect(mapStateToProps)(ProductList)