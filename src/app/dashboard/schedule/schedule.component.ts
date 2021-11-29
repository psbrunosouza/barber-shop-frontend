import {Component, OnInit} from '@angular/core';
import {ToasterHelper} from 'src/@core/helpers/toaster.helper';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  providers: [ToasterHelper],
})
export class ScheduleComponent implements OnInit {
  currentTab: string = 'calls';
  scheduleExists: boolean;

  constructor(
    private toastHelper: ToasterHelper
  ) {
  }

  ngOnInit(): void {
  }

  tabOnClick(current: string) {
    this.currentTab = current;
  }

}
