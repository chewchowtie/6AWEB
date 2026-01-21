import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employee } from './employee';
import { Products } from './products';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('Sharing-Local-Data');

  public employees: any[] = [];
  public products: any[] = [];


  constructor(
    private _employeeService: Employee,
    private _productsService: Products
  ) {}


  ngOnInit() {
    this.employees = this._employeeService.getEmployees();
    this.products = this._productsService.getProducts(); // 3. Fixed assignment
  }
}
