import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
  
})

export class HeaderComponent implements OnInit {
  title="Angular con Spring";
  autor= "Alexander Espitia";
  constructor() { }

  ngOnInit(): void {
  }

}
