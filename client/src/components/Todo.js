import { useState } from "react";
import "../styles/Todo.scss";

const Todo = ({ item, deleteItem, updateItem }) => {
  // console.log(item); // {done: false, id:1, title: '저녁먹기'}
  const [todoItem, setTodoItem] = useState(item);
  const [readOnly, setReadOnly] = useState(true);
  // const [btnDisplay, setBtnDisplay] = useState("none");

  const onDeleteButtonClick = () => {
    deleteItem(todoItem);
  };

  // title input을 클릭; readOnly state를 false로 변경
  const offReadOnlyMode = () => {
    setReadOnly(false); // title input이 편집이 가능한 상태
    // setBtnDisplay("inline");
  };
  const onReadOnlyMode = () => {
    setReadOnly(true);
    // setBtnDisplay("none");
  };

  // title input에서 enter키; readOnly state를 true로 변경
  const enterKeyEventHandler = (e) => {
    if (e.key === "Enter") {
      const { done, ...rest } = todoItem;
      const newItem = { done: e.target.checked, ...rest };
      setReadOnly(true);
      updateItem(newItem);

      setTodoItem(newItem);

      // e.target.value;
      // setBtnDisplay("none");
    }
  };
  // 사용자가 키보드 입력할 때마다 item의 title을 입력한 값으로 변경
  const editEventHandler = (e) => {
    console.log("e. >> ", e);
    // title = todoItem.title     rest = id, done
    const { title, ...rest } = todoItem;

    setTodoItem({
      title: e.target.value,
      ...rest,
    });
  };

  const checkboxEventHandler = (e) => {
    const { done, ...rest } = todoItem;
    console.log("checked >> ", e.target.checked);
    const newItem = { done: e.target.checked, ...rest };
    updateItem(newItem);

    setTodoItem(newItem);
  };
  return (
    <div className="Todo">
      <input
        type="checkbox"
        className="checkboxInput"
        id={`todo${item.id}`}
        name={`${item.id}`}
        checked={todoItem.done}
        onChange={checkboxEventHandler}
      />
      <input
        className="titleInput"
        type="text"
        value={todoItem.title}
        onClick={offReadOnlyMode}
        onKeyDown={enterKeyEventHandler}
        onChange={editEventHandler}
        onBlur={onReadOnlyMode}
      />
      <button
        onClick={onDeleteButtonClick}
        // style={{ display: `${btnDisplay}` }}
        className="delButton"
        // onHover={offReadOnlyMode}
      >
        X
      </button>
    </div>
  );
};

export default Todo;
