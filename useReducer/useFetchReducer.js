import React, {useEffect, useReducer} from "react";
import ReactDOM from "react-dom";

import "./styles.css";

/*
  Instructions:
    Refactor `useFetch` to use `useReducer` instead of
    `useState`.
*/
const reducer = (state, action) => {
  if (action.type === 'loading') {
    return {
      ...state,
      loading: true,
    }
  } else if (action.type === 'data') {
    return {
      data: action.data,
      error: null,
      loading: false,
    }
  } else if(action.type === 'error'){
    return {
      ...state,
      loading: false,
      error: 'error, please try again'
    }
  } else {
    throw new Error('you done messed up')
  }
};

function useFetch (url) {
  const initialState = {
    data: null,
    error: null,
    loading: true,
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  React.useEffect(() => {
    // dispatch loading
    dispatch({type: 'loading'});

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        // dispatch for setting data
        dispatch({
          type: 'data',
          data: data,
        })
      })
      .catch((e) => {
        console.warn(e.message)
        //dispatch for error
        dispatch({type: 'error'});
      })
  }, [url])

  return state;
}

const postIds = [1,2,3,4,5,6,7,8]

function App() {
  const [index, setIndex] = React.useState(0)

  const { loading, data: post, error } = useFetch(
    `https://jsonplaceholder.typicode.com/posts/${postIds[index]}`
  )

  const incrementIndex = () => {
    setIndex((i) =>
      i === postIds.length - 1
        ? i
        : i + 1
    )
  }

  if (loading === true) {
    return <p>Loading</p>
  }

  if (error) {
    return (
      <React.Fragment>
        <p>{error}</p>
        <button onClick={incrementIndex}>Next Post</button>
      </React.Fragment>
    )
  }

  return (
    <div className="App">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
      {error && <p>{error}</p>}
      {index === postIds.length - 1
        ? <p>No more posts</p>
        : <button onClick={incrementIndex}>
            Next Post
          </button>}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
