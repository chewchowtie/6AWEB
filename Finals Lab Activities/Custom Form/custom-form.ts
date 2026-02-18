import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './custom-form.html',
  styleUrl: './custom-form.css'
})
export class CustomForm {
  title = 'Skill Mastery';
  availableSkills = ['Angular', 'TypeScript', 'Tailwind', 'UI/UX', 'Firebase'];
  selectedSkills: string[] = [];
  rating = 0;
  submitted = false;

  // Manual logic to handle the "Custom" selection
  toggleSkill(skill: string) {
    if (this.selectedSkills.includes(skill)) {
      this.selectedSkills = this.selectedSkills.filter(s => s !== skill);
    } else {
      this.selectedSkills.push(skill);
    }
  }

  setRating(value: number) {
    this.rating = value;
  }

  onSubmit() {
    this.submitted = true;
    console.log('Custom Submission:', {
      skills: this.selectedSkills,
      experience: this.rating
    });

    // Reset after success
    setTimeout(() => {
      this.selectedSkills = [];
      this.rating = 0;
      this.submitted = false;
    }, 3000);
  }
}
