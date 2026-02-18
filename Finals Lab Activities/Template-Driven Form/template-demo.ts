import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Added for extra safety
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-template-demo',
  standalone: true, // Crucial for modern Angular
  imports: [CommonModule, FormsModule],
  templateUrl: './template-demo.html',
  styleUrl: './template-demo.css',
})
export class TemplateDemo {
  title = 'Register';
  username = '';
  email = '';
  password = '';
  role = '';
  gender = '';
  status = '';
  comments = '';
  submitted = false;

  onSubmit() {
    this.submitted = true;
  }
}
