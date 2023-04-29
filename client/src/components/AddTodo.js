import { useState } from "react";
import "../styles/AddTodo.scss";

const AddTodo = ({ addItem }) => {
  const [todoItem, setTodoItem] = useState({
    title: "",
  });

  const saveTodo = () => {
    // 1. props addItem 함수 실행
    const newTodo = todoItem;
    console.log(todoItem);
    console.log(todoItem.title.trim.length);
    if (newTodo.title.trim().length > 0) {
      addItem(todoItem);
    }
    // 2. input 초기화
    setTodoItem({ title: "" });
  };

  const onEnterKeyDown = (e) => {
    if (e.key === "Enter") {
      saveTodo();
    }
  };
  return (
    <div className="AddTodo">
      <input
        type="text"
        className="textInput"
        value={todoItem.title}
        onChange={(e) => setTodoItem({ title: e.target.value })}
        onKeyDown={onEnterKeyDown}
        onBlur={saveTodo}
      />
      {/* <button onClick={onButtonClick}>ADD</button> */}
    </div>
  );
};

export default AddTodo;
