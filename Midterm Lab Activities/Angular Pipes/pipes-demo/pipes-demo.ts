import { Component, OnInit } from '@angular/core';
import { DatePipe, LowerCasePipe, UpperCasePipe, AsyncPipe, CurrencyPipe, SlicePipe, DecimalPipe, JsonPipe, PercentPipe, TitleCasePipe } from '@angular/common';
import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pipes-demo',
  imports: [AsyncPipe, DatePipe, UpperCasePipe, LowerCasePipe, CurrencyPipe, SlicePipe, DecimalPipe, JsonPipe, PercentPipe, TitleCasePipe],
  templateUrl: './pipes-demo.html',
  styleUrl: './pipes-demo.css',
})
export class PipesDemo {
   presentDate = new Date();
   price : number = 20000;
   Fruits = ["Apple", "Orange", "Grapes", "Mango", "Kiwi", "Pomegranate"];
   decimalNum1: number = 8.7589623;
   decimalNum2: number = 5.43;
   identification = ['Arianne Meg', '20'];
   message: string = 'I LOVE ANGULAR';
   numA: number = 0.25;
   numB: number = 2.59;
   numC: number = 0.123456;

   time$ = interval(1000).pipe(
    map(val => new Date())
  );
   ngOnInit() : void {
}
}


