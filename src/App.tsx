import React from 'react';
import './App.css';
import Todo from "./Components/Todo";
import Task from "./Model/ITask";

function App() {
    const [tasks, setTasks] = React.useState<Task[]>([]); // [tasks, setTasks
    let enteredTask  =  React.useRef<HTMLInputElement>(null);

    function buildTodo(value: string, id?:number) : Task {
        return {
            id: Math.floor(Math.random() * (100 + 20) + 20),
            userId: id ?? 1,
            completed: false,
            createdAt: new Date(),
            updatedAt: new Date(),
            description: value,
            children: []
        };
    }
    function removeTodo(id: number){
        tasks.forEach((task: Task, index: number) => {
            if (task.id === id) {
                tasks.splice(index, 1);
                setTasks([...tasks]);
                return
            }
        });
    }

    function editTodo(id: number, value: string) {
        tasks.forEach((task: Task, index: number) => {
            if (task.id === id) {
                task.description = value;
                task.updatedAt = new Date();
                setTasks([...tasks]);
            }
        });

    }
    function addTodo (id: number, value: string) {
        tasks.forEach((task: Task, index: number) => {
            if (task.id === id) {
                task.children.push(buildTodo(value));
                setTasks([...tasks]);
                return;
            }
            if (task.children.length > 0) {
                task.children.forEach((child: Task) => {
                    if (child.id === id) {
                        child.children.push(buildTodo(value));
                        setTasks([...tasks]);
                        return;
                    }
                });
            }
        });
        console.log(tasks);
    }

    function handleClick(event : React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        if (enteredTask.current) {
            setTasks([...tasks,  buildTodo(enteredTask.current.value)]);
            enteredTask.current.value = "";
        }
    }

  return (
    <div className="App">
      <h1>Inserisci i tuoi tasks</h1>
      <h4>Questa applicazione salva i task con possibilità di sotto-task fino a un massimo di 3 generazioni</h4>
        <div>
            <input
                ref={enteredTask}
                type="text"
                placeholder="Inserisci il task" />
            <button onClick={handleClick}>Aggiungi</button>
        </div>
        <div>
            <ul>
                {tasks.map(
                    (task : Task, index : number) => (
                    <li className="noDecoration" key={index}>
                        <Todo
                            key={index}
                            task={task}
                            generazione={0}
                            addTodo={addTodo}
                            editTodo={editTodo}
                            removeTodo={removeTodo}
                        />
                    </li>
                ))}
            </ul>
        </div>
    </div>
  );
}

export default App;
