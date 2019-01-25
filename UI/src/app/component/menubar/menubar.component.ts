import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../model/security/User';
import { Child } from '../../model/security/Child';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})

export class MenuBarComponent implements OnInit {

  @Input() Show: boolean;
  @Output() MenuAction = new EventEmitter<boolean>();
  @Output() CallAddingKid = new EventEmitter<boolean>();
  @Output() SaleRequestCaller = new EventEmitter<boolean>();
  @Output() CallLoggedUser = new EventEmitter<User>();
  @Output() CallCurrentChild = new EventEmitter<Child>();

  LoggedUser: User;
  SelectedChild: Child;

  constructor(private router: Router) {
    this.LoggedUser = new User();
    this.SelectedChild = this.LoggedUser.Childs[0];

    this.CallLoggedUser.emit(this.LoggedUser);
    this.CallCurrentChild.emit(this.SelectedChild);
  }

  ngOnInit() {
  }

  ChangeChild() {
    this.CallLoggedUser.emit(this.LoggedUser);
    this.CallCurrentChild.emit(this.SelectedChild);
  }

  handleMenu(value) {
    this.Show = value;
    this.MenuAction.emit(this.Show);
  }

  addingKid() {
    this.handleMenu(false);
    this.CallAddingKid.emit(true);
  }

  CallSaleRequest() {
    this.handleMenu(false);
    this.SaleRequestCaller.emit(true);
  }

  LogOut() {
    sessionStorage.clear();
    this.router.navigateByUrl('/IniciarSesion');
  }
}
