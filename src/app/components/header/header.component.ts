import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
  
})

export class HeaderComponent implements OnInit {
  curso="Angular con Spring";
  estudiante= "Alexander Espitia";
  constructor() { }

  ngOnInit(): void {
  }

}
