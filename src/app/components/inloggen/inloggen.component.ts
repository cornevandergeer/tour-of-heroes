import {Component, OnInit} from '@angular/core';
import {Account} from "../model/account";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";
import {InlogService} from "../../services/inlog/inlog.service";


@Component({
  selector: 'app-inloggen',
  templateUrl: './inloggen.component.html',
  styleUrls: ['./inloggen.component.css']
})
export class InloggenComponent implements OnInit {

  accounts: Account[] = [];
  account: Account = {
    id: undefined,
    isIngelogd: false,
    gebruikersnaam: "",
    wachtwoord: ""

  }

  constructor(
    private route: ActivatedRoute,
    private inlogService: InlogService,
  ) {
  }
  submitted = false;

  ngOnInit(): void {
    this.getAccounts();
  }


  onSubmit() {
    this.submitted = true;
  }

  getAccounts(): void {
    this.inlogService.getAccounts()
      .subscribe(accounts => this.accounts = accounts);
  }


  inloggen(): void {
    const { gebruikersnaam, wachtwoord } = this.account;

    this.inlogService.login(gebruikersnaam, wachtwoord).subscribe(
      // data => {
      //   this.tokenStorage.saveToken(data.accessToken);
      //   this.tokenStorage.saveUser(data);
      //
      //   this.isLoginFailed = false;
      //   this.isLoggedIn = true;
      //   this.roles = this.tokenStorage.getUser().roles;
      //   this.reloadPage();
      // },
      // err => {
      //   this.errorMessage = err.error.message;
      //   this.isLoginFailed = true;
      // }
    );
  }



  // inloggen()  {
  //   for (const acc of this.accounts) {
  //     if (this.account.gebruikersnaam === acc.gebruikersnaam && this.account.wachtwoord === acc.wachtwoord) {
  //       acc.isIngelogd = true
  //       this.inlogService.updateAccount(acc)
  //         .subscribe();
  //     }
  //   }
  //
  // }

//
//
//
}
