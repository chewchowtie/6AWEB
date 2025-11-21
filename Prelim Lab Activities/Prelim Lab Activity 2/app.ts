import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./header/header";
import { Skills } from "./skills/skills";
import { Footer } from "./footer/footer";
import { EducationalBackground } from './educational-background/educational-background';
import { Professional } from "./professional/professional";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Skills, EducationalBackground, Footer, Professional],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('my-first-app');
}