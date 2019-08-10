import React from 'react';
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import rootReducer from './rootReducer'
import ProductList from './productList'
import './App.css';

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

function ProductPage() {
  
  return (
    <div className="App">
      <ProductList />
    </div>
  )
}

function App() {
  
  return (
    <Provider store={store}>
      <ProductPage/>
    </Provider>
    
  );
}

export default App;
