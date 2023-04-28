import { useState } from "react";

const Todo = ({ item, deleteItem }) => {
  console.log(item); // {done: false, id:1, title: '저녁먹기'}
  const [todoItem, setTodoItem] = useState(item);
  const [readOnly, setReadOnly] = useState(true);

  const onDeleteButtonClick = () => {
    deleteItem(todoItem);
  };

  // title input을 클릭; readOnly state를 false로 변경
  const offReadOnlyMode = () => {
    setReadOnly(false); // title input이 편집이 가능한 상태
  };

  // title input에서 enter키; readOnly state를 true로 변경
  const enterKeyEventHandler = (e) => {
    if (e.key === "Enter") {
      setReadOnly(true);
    }
  };
  // 사용자가 키보드 입력할 때마다 item의 title을 입력한 값으로 변경
  const editEventHandler = (e) => {
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
    setTodoItem({ done: e.target.checked, ...rest });
  };
  return (
    <div className="Todo">
      <input
        type="checkbox"
        id={`todo${item.id}`}
        name={`${item.id}`}
        value={`todo${item.id}`}
        defaultChecked={item.false}
        onChange={checkboxEventHandler}
      />
      <input
        className="titleInput"
        type="text"
        value={todoItem.title}
        onClick={offReadOnlyMode}
        onKeyDown={enterKeyEventHandler}
        onChange={editEventHandler}
      />
      <button onClick={onDeleteButtonClick}>DELETE</button>
    </div>
  );
};

export default Todo;
