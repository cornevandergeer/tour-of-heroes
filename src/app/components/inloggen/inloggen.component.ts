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

  currentAccountId?: number;

  accounts: Account[] = [];
  account: Account = {
    id: undefined,
    isIngelogd: false,
    naam: "",
    wachtwoord: ""

  }

  constructor(
    private route: ActivatedRoute,
    private inlogService: InlogService,
  ) {
  }

  ngOnInit(): void {
    this.getAccounts();
    this.getAccount();
  }

  submitted = false;

  onSubmit() {
    this.submitted = true;
  }

  getAccounts(): void {
    this.inlogService.getAccounts()
      .subscribe(accounts => this.accounts = accounts);
  }


  getAccount(): void {
    if (this.currentAccountId !== undefined) {
      const id = this.currentAccountId
      this.inlogService.getAccount(id)
        .subscribe(account => this.account = account);
      this.currentAccountId = this.account.id;
    }
  }

  inloggen() {
    for (const acc of this.accounts) {
      if (this.account.naam === acc.naam && this.account.wachtwoord === acc.wachtwoord) {
        acc.isIngelogd = true
        this.inlogService.updateAccount(acc)
          .subscribe();
        this.currentAccountId = acc.id;
      }
    }

  }

//
//
//
}
