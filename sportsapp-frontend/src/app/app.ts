import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./components/navbar/navbar"
import { Dashboard } from "./components/dashboard/dashboard";
import { Footer } from './components/footer/footer';
// import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [Navbar, Dashboard, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Frontend');
}
