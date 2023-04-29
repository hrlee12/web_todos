import { useState, useEffect } from "react";
import axios from "axios";
import Todo from "./components/Todo";
import AddTodo from "./components/AddTodo";
import "./styles/App.scss";
import { API_BASE_URL } from "./app-config";
function App() {
  const [todoItems, setTodoItems] = useState([]);
  useEffect(() => {
    console.log("mount 완료");
    const getTodos = async () => {
      const res = await axios.get(`${API_BASE_URL}/api/todos`);
      // console.log(res);
      setTodoItems(res.data);
    };
    getTodos();
  }, []);
  // Todo 추가하는 함수
  const addItem = async (newItem) => {
    // newItem.id = todoItems.length + 1;
    // newItem.done = true;
    // //newItem => {title: 'xxx', id: n, done: false}
    // setTodoItems([...todoItems, newItem]);
    console.log("데이터 입력");
    const res = await axios.post(`${API_BASE_URL}/api/todo`, newItem);
    console.log("입력한 데이터 >> ", res);
    const newTodoItems = [...todoItems, res.data];
    setTodoItems(newTodoItems);
  };

  // Todo 삭제하는 함수
  const deleteItem = async (targetItem) => {
    // targetItem => { title: 'xxx', id: n, done: false }
    // 1. filter()
    // : targetItem의 id와 todoItems state의 id가 같지 않은 애들을 새로운 배열로 반환
    // const newTodoItems = todoItems.filter(
    //   (todoItem) => todoItem.id != targetItem.id
    // );

    const res = await axios.delete(`${API_BASE_URL}/api/todo/${targetItem.id}`);
    // 2. state 변경
    console.log(res);

    // 1. filter()
    // : targetItem의 id와 todoItems state의 id가 같지 않은 애들을 새로운 배열로 반환
    if (!res.data) return;

    const newTodoItems = todoItems.filter(
      (todoItem) => todoItem.id != targetItem.id
    );

    setTodoItems(newTodoItems);
  };

  const updateItem = async (targetItem) => {
    const res = await axios.patch(
      `${API_BASE_URL}/api/todo/${targetItem.id}`,
      targetItem
    );
    console.log(targetItem.id);
    console.log("res.data >> ", res.data);
    if (res.data) {
      const newTodoItems = todoItems.map((todoItem) => {
        if (todoItem.id == targetItem.id) {
          console.log("타켓 리턴");
          return targetItem;
        } else {
          return todoItem;
        }
      });
      console.log(newTodoItems);
      setTodoItems(newTodoItems);
    }
  };
  return (
    <div className="App">
      <div className="innerContainer"></div>
      <div className="innerContainer" id="main">
        <div className="title">Todo List</div>
        {/* todo 목록 보이기 */}
        {todoItems.map((item) => {
          return (
            <Todo
              key={item.id}
              item={item}
              deleteItem={deleteItem}
              updateItem={updateItem}
            />
          );
        })}
        {/* todo 추가 input */}
        {/* prop으로 함수도 넘기기 가능 */}
        <AddTodo addItem={addItem} />
        <div className="countTodos">총 {todoItems.length}개 </div>
        <div className="triangle"></div>
      </div>
      <div className="innerContainer"></div>
    </div>
  );
}

export default App;
