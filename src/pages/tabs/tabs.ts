import { Component } from '@angular/core';

import { CandyPage } from '../candy/candy';
import { HistoryPage } from '../history/history';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  candy = CandyPage;
  history = HistoryPage;

  constructor() {

  }
}
