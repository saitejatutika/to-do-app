import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

@Component({
  selector: 'app-todo',
  imports: [FormsModule, CommonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.css'
})


export class TodoComponent implements OnInit {
  userId: string = '';
  todos: any[] = [];
  newTodo: string = '';

  firestoreCollection: AngularFirestoreCollection;

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore
  ) {
    this.firestoreCollection = firestore.collection('todos');
  }

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged(user => {
      if (user) {
        this.userId = user.uid;
        this.loadTodos();
      }
    });
  }

  loadTodos() {
    this.firestoreCollection.valueChanges()
      .subscribe(todos => {
        this.todos = todos;
      });
  }

  addTodo() {
    if (this.newTodo.trim()) {
      this.firestoreCollection.add({
        text: this.newTodo,
        completed: false,
        userId: this.userId,
      });
      this.newTodo = '';
    }
    this.loadTodos();
  }

  deleteTodo(id: string) {
    this.firestoreCollection.doc(id).delete();
    this.loadTodos();
  }

  toggleComplete(todo: any) {
    this.firestoreCollection
      .doc(todo.id)
      .update({ completed: !todo.completed });
  }
}
