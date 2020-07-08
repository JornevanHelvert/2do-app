import React from 'react';
import './App.css';
import {MainNavigator} from "./navigation/MainNavigator/MainNavigator";
import {Provider} from "react-redux";
import store from "./redux/store";

function App() {
  return (
      <Provider store={store}>
        <MainNavigator />
      </Provider>
  );
}

export default App;
