import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { Skills } from "./skills/skills";
import { Footer } from "./footer/footer";
import { EducationalBackground } from './educational-background/educational-background';
import { Professional } from "./professional/professional";
import { DataBindingDemo } from './data-binding-demo/data-binding-demo';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DataBindingDemo, Header, Skills, EducationalBackground, Footer, Professional],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-first-app');
}