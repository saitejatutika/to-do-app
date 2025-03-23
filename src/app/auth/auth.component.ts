import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})

export class AuthComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  async login() {
    try {
      await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
      this.router.navigate(['/todo']);
    } catch (error) {
      this.error = 'Failed to login: ' + error;
    }
  }

  async register() {
    try {
      await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
      this.router.navigate(['/todo']);
    } catch (error) {
      this.error = 'Failed to register: ' + error;
    }
  }

  async logout() {
    await this.afAuth.signOut();
    this.router.navigate(['/auth']);
  }
}
