import React from 'react';
import Task from "../Model/ITask";

interface TodoProps {
    task: Task;
    generazione: number;
    removeTodo: (id: number) => void;
    addTodo: (id: number,value: string) => void;
    editTodo: (id: number, value: string) => void;
}


function Todo(props: TodoProps) {
    let enteredTask  =  React.useRef<HTMLInputElement>(null);

    let generazioneTodo = props.generazione;
    generazioneTodo++;
    function handleClick(id: number, enteredTask: React.RefObject<HTMLInputElement>) {
        if (enteredTask.current) {
            console.log(enteredTask.current.value);
            props.addTodo(id,enteredTask.current.value);
            enteredTask.current.value = "";
        }
    }

    return <div className="todo">

        {React.createElement('h' + (generazioneTodo+2), {}, props.task.description)}
        <div className="todo-buttons" style={{marginLeft: props.generazione * 100}}>
            <button className="todo-edit">Edit</button>
            <button onClick={() => props.removeTodo(props.task.id)} className="todo-delete">Delete</button>

            {props.generazione < 2 &&
                <><input ref={enteredTask}/>
                    <button onClick={() => handleClick(props.task.id, enteredTask)}
                            className="todo-add">Add
                    </button>
                </>
        }

    </div>
    <div>
            {props.task.children && props.task.children.map(
                (t: Task, index: number) => (
                    <Todo
                        key={t.id}
                        task={t}
                        generazione={generazioneTodo}
                        addTodo={props.addTodo}
                        editTodo={props.editTodo}
                        removeTodo={props.removeTodo}
                    />
                )
            )}
        </div>
    </div>
}
export default Todo;