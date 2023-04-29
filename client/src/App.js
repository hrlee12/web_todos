import { useState } from "react";
import Todo from "./components/Todo";
import AddTodo from "./components/AddTodo";
import "./styles/App.scss";
function App() {
  const [todoItems, setTodoItems] = useState([
    {
      id: 1,
      title: "저녁먹기",
      done: false,
    },
    {
      id: 2,
      title: "잠자기",
      done: false,
    },
    {
      id: 3,
      title: "집가기",
      done: true,
    },
  ]);

  // Todo 추가하는 함수
  const addItem = (newItem) => {
    newItem.id = todoItems.length + 1;
    newItem.done = true;
    //newItem => {title: 'xxx', id: n, done: false}
    setTodoItems([...todoItems, newItem]);
  };

  // Todo 삭제하는 함수
  const deleteItem = (targetItem) => {
    // targetItem => { title: 'xxx', id: n, done: false }
    // 1. filter()
    // : targetItem의 id와 todoItems state의 id가 같지 않은 애들을 새로운 배열로 반환
    const newTodoItems = todoItems.filter(
      (todoItem) => todoItem.id != targetItem.id
    );
    // 2. state 변경
    setTodoItems(newTodoItems);
  };
  return (
    <div className="App">
      <div className="innerContainer"></div>
      <div className="innerContainer" id="main">
        <div className="title">Todo List</div>
        {/* todo 목록 보이기 */}
        {todoItems.map((item) => {
          return <Todo key={item.id} item={item} deleteItem={deleteItem} />;
        })}
        {/* todo 추가 input */}
        {/* prop으로 함수도 넘기기 가능 */}
        <AddTodo addItem={addItem} />
        <div className="countTodos">총 {todoItems.length}개 </div>
        <div class="triangle"></div>
      </div>
      <div className="innerContainer"></div>
    </div>
  );
}

export default App;
