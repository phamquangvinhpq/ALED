import { createStore } from "redux";
  
  function reducer(state = [], action) {
      switch(action.type) {
          case "GET_DATA":
              return action.payload
      }
    return state;
  };
  

const store = createStore(reducer);

export default store;