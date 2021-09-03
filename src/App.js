import TodoList from "./components/TodoList";
import Textfield from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import { useCallback, useEffect, useState } from "react";
import { v4 } from 'uuid';

const TODO_APP_STORAGE_KEY = 'TODO_APP';

function App() {
  //state , prop
  //state-> current component's data
  //prop-> data transfer from element out
  const [todoList, setTodoList] = useState([]); //array 
  const [textInput, setTextInput] = useState("");

  useEffect(() => {
    const storagedTodoList = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storagedTodoList){
      setTodoList(JSON.parse(storagedTodoList)); //convert String Json-> array
    }
  }, []);

  //useEffect used to save data in local storage
  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(todoList)) //convert todoList -> JSON string 
  }, [todoList])

  const onTextInputChange = useCallback((e)=>{
    setTextInput(e.target.value);
  }, []); //do not re-initialize after each rendering

  //onTextInput will re-initialize when variable of array change value [todoList]

  const onAddBtnClick = useCallback((e)=>{
    //add textinput for todoList
    setTodoList([{ id: v4(), name: textInput, isCompleted: false}, ...todoList]);
    //auto set id -> using package uuid

    setTextInput("");

  },[textInput, todoList]);

  //when textInput changing then onAddBtnClick will be re-initialize for update textInput's value

  const onCheckBtnClick = useCallback((id)=>{
    setTodoList((prevState) => 
      prevState.map((todo) => 
        todo.id === id ? {...todo, isCompleted: true} : todo
        )
      );
  }, []);

  return (
    <>    
      <h3>Danh sách cần làm</h3>

      <Textfield 
        name="add-todo" 
        placeholder="Thêm việc cần làm" 
        elemAfterInput={
          <Button isDisabled={!textInput} appearance='primary' onClick={onAddBtnClick}>
            Thêm
          </Button>
        }
        css={{ padding:'2px 4px 2px' }}
        value={textInput}
        onChange={onTextInputChange} //set value data from user for textInput
      ></Textfield>

      <TodoList todoList={todoList} onCheckBtnClick={onCheckBtnClick}/>
    </>
  );
}

export default App;
