import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService) {}

  register(): void {
    const user = { username: this.username, email: this.email, password: this.password };
    this.authService.register(user).subscribe({
      next: (response: any) => {
        console.log('Registration successful', response);
      },
      error: (error: any) => {
        console.error('Registration failed', error);
      },
      complete: () => {
        console.log('Registration completed');
      }
    });
  }
}
