import { Component, OnInit } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Todo {
  id?: string;
  description: string;
  completed: boolean;
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  description = '';
  btn = 'Add';
  todo: Todo = {
    description: '',
    completed: false
  };
  todoList: AngularFirestoreCollection<Todo>;
  todo$: Observable<Todo[]>;

  constructor(private afs: AngularFirestore) {

    this.todoList = this.afs.collection('todos');
    this.todo$ = this.todoList.snapshotChanges().pipe(
      map(actions => {
        return actions.map( action => {
          const data = action.payload.doc.data() as Todo;
          const id = action.payload.doc.id;
          return { id, ...data };
        });
      })
    );

  }

  addToDo(todoDesc: string) {
    if (todoDesc && todoDesc.trim().length) {
      this.todoList.add({ description: todoDesc, completed: false });
    }
    this.description = '';
  }

  selectItemToDo(todo: Todo) {
    this.description = todo.description;
    this.btn = 'Update';
    this.todo = todo;
  }

  updateToDo(todoDesc: String) {
    const todo = this.todo;
    this.todoList.doc(todo.id).update({
      description: todoDesc
    });
    this.reset();
  }

  deleteToDo(todo: Todo) {
    this.todoList.doc(todo.id).delete();
    this.reset();
  }

  completedToDo(todo: Todo) {
    console.log(todo.completed);
    this.todoList.doc(todo.id).update({
      completed: !todo.completed
    });
  }

  cancel() {
    this.reset();
  }

  reset() {
    this.btn = 'Add';
    this.description = '';
  }

  ngOnInit() {
  }

}
