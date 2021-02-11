import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-tab',
  templateUrl: './user-tab.component.html',
  styleUrls: ['./user-tab.component.scss']
})
export class UserTabComponent implements OnInit {
role:any;
  constructor() { }

  ngOnInit() {
  	this.role=localStorage.getItem('role')
  }

}
