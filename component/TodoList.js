import React, { useState, useMemo } from "react";
import TodoItem from "./TodoItem";
import "./TodoList.css";

const TodoList = ({ todo, onUpdate, onDelete }) => {
  console.log("TodoList 렌더링");

  const [search, setSearch] = useState("");
  const [done, setDone] = useState(false);

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  const onChangeDone = () => {
    setDone(!done);
  };

  const getSearchResult = useMemo(() => {
    console.log("검색어에 따른 필터링 수행");
    return search === ""
      ? todo
      : todo.filter((it) => it.content.toLowerCase().includes(search.toLowerCase()));
  }, [search, todo]);

  const getNotDoneResult = useMemo(() => {
    console.log("완료 항목 필터링 수행");
    return done === false
      ? getSearchResult
      : getSearchResult.filter((it) => !it.isDone);
  }, [done, getSearchResult]);

  const analyzeTodo = useMemo(() => {
    console.log("할 일 분석 수행");
    const totalCount = todo.length;
    const doneCount = todo.filter((it) => it.isDone).length;
    const notDoneCount = totalCount - doneCount;
    return { totalCount, doneCount, notDoneCount };
  }, [todo]);

  return (
    <div className="TodoList">
      <h4>Todo List ☘</h4>
      <div>전체: {analyzeTodo.totalCount} | 완료: {analyzeTodo.doneCount} | 미완료: {analyzeTodo.notDoneCount}</div>
      <input
        value={search}
        onChange={onChangeSearch}
        className="searchbar"
        placeholder="검색어를 입력하세요"
      />
      <label>
        <input className="done" type="checkbox" onChange={onChangeDone} checked={done} />
        완료된 할 일 숨기기
      </label>
      <div className="list_wrapper">
        {getNotDoneResult.map((it) => (
          <TodoItem key={it.id} {...it} onUpdate={onUpdate} onDelete={onDelete} />
        ))}
      </div>
    </div>
  );
};

export default React.memo(TodoList);
