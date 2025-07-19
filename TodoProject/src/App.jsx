import { createContext, use, useCallback, useMemo, useReducer, useRef, useState } from 'react';
import './App.css';
import Editor from './components/Editor';
import Header from './components/Header';
import List from './components/List';


const mockData = [
  {
    id: 0,
    isDone: false,
    content: "React 공부하기",
    date: new Date().toDateString(),
  },
  {
    id: 1,
    isDone: false,
    content: "빨래하기",
    date: new Date().toDateString(),
  },
  {
    id: 2,
    isDone: false,
    content: "노래 연습하기",
    date: new Date().toDateString(),
  },
];

function reducer(state, action) {
  switch (action.type) {
    case "CREATE":
      return [action.data, ...state];

    case "UPDATE":
      return state.map((item) => {
        return item.id === action.targetId ? { ...item, isDone: !item.isDone } : item;
      });

    case "DELETE":
      return state.filter((item) => {
        return item.id !== action.targetId;
      });

    default:
      return state;
  }
}

// eslint-disable-next-line react-refresh/only-export-components
export const TodoDispatchContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const TodoStateContext = createContext();


function App() {
  const [todos, dispatch] = useReducer(reducer, mockData);
  const idRef = useRef(3);

  const onCreate = useCallback((content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        isDone: false,
        content: content,
        date: new Date().toDateString(),
      },
    });
  }, []);

  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      targetId: targetId,
    });
  }, []);

  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      targetId: targetId,
    });
  }, []);


  const contextValue = useMemo(() => {
    return { onCreate, onUpdate, onDelete };
  }, [onCreate, onUpdate, onDelete]);


  return (
    <>
      <h1>오늘 할 일 앱</h1>
      <Header />
      <TodoStateContext value={todos}>
        <TodoDispatchContext.Provider value={contextValue}>
          <Editor />
          <List />
        </TodoDispatchContext.Provider>
      </TodoStateContext>
    </>
  )
}

export default App
