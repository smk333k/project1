import { useReducer, useRef, useCallback } from 'react';
import './App.css';
import Header from './component/Header';
import TodoEditor from './component/TodoEditor';
import TodoList from './component/TodoList';
import TestComp from './component/TestComp';

const mockTodo = [
  { id: 0, isDone: false, content: "React 공부하기", createdDate: new Date().getTime() },
  { id: 1, isDone: false, content: "빨래 널기", createdDate: new Date().getTime() },
  { id: 2, isDone: false, content: "노래 연습하기", createdDate: new Date().getTime() },
];

// 리듀서 함수 정의 (할 일 추가, 수정, 삭제)
function reducer(state, action) {
  switch(action.type) {
    case "CREATE": 
      return [action.newItem, ...state];
    case "UPDATE":
      return state.map((it) =>
        it.id === action.targetId ? { ...it, isDone: !it.isDone } : it
      );
    case "DELETE":
      return state.filter((it) => it.id !== action.targetId);
    default:
      return state;
  }
}

function App() {
  const idRef = useRef(3);
  const [todo, dispatch] = useReducer(reducer, mockTodo);

  // 할 일 생성 함수에 useCallback 적용
  const onCreate = useCallback((content) => {
    console.log("onCreate 호출a");
    dispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current,
        content,
        isDone: false,
        createdDate: new Date().getTime(),
      }
    });
    idRef.current += 1;
  }, []);

  // 할 일 업데이트 함수에 useCallback 적용
  const onUpdate = useCallback((targetId) => {
    console.log("onUpdate 호출");
    dispatch({
      type: "UPDATE",
      targetId,
    });
  }, []);

  // 할 일 삭제 함수에 useCallback 적용
  const onDelete = useCallback((targetId) => {
    console.log("onDelete 호출");
    dispatch({
      type: "DELETE",
      targetId,
    });
  }, []);

  return (
    <div className="App">
      <TestComp />
      <Header />
      <TodoEditor onCreate={onCreate}/>
      <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete}/>
    </div>
  );
}

export default App;

