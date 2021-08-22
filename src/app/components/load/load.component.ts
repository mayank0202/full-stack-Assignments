import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-load',
  templateUrl: './load.component.html',
  styleUrls: ['./load.component.css']
})
export class LoadComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  load() {
    this.router.navigateByUrl('/dashboard');
};

}
