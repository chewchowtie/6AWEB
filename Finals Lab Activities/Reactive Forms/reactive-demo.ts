import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reactive-demo',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reactive-demo.html',
  styleUrl: './reactive-demo.css',
})
export class ReactiveDemo {
  roles = ['Admin', 'User', 'Guest'];
  form: FormGroup;
  submitted = false; // Fixed: Declaring the property to resolve the TS error

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]{4,12}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)]],
      role: ['Admin', Validators.required],
      gender: ['', Validators.required],
      bio: ['', [Validators.maxLength(200)]],
      agreeToTerms: [false, Validators.requiredTrue]
    });
  }

  // --- Password Strength Logic ---
  get passwordStrength(): number {
    const p = this.form.get('password')?.value || '';
    if (!p) return 0;
    let score = 0;
    if (p.length >= 8) score++;
    if (/[A-Z]/.test(p)) score++;
    if (/[0-9]/.test(p)) score++;
    if (/[a-z]/.test(p)) score++;
    return score;
  }

  getStrengthColor(): string {
    const s = this.passwordStrength;
    if (s <= 1) return '#fecaca'; // Pastel Red
    if (s <= 3) return '#fef08a'; // Pastel Yellow
    return '#bbf7d0';             // Pastel Green
  }

  onSubmit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched(); // Highlights all errors if the user clicks too early
    } else {
      console.log('Form Submitted Successfully:', this.form.value);
      this.submitted = true;

      // Clears the form and resets validation states
      this.form.reset({
        role: 'Admin',
        gender: '',
        agreeToTerms: false
      });

      setTimeout(() => {
        this.submitted = false;
      }, 3000);
    }
  }

  isInvalid(name: string) {
    const control = this.form.get(name);
    return control?.touched && control?.invalid; // Error shows only after interaction
  }
}
