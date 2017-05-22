import { Component } from '@angular/core';

import { CandyPage } from '../candy/candy';
import { LoginPage } from '../login/login';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  candy = CandyPage;

  constructor() {

  }
}
