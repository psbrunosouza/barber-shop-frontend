import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ScheduleService } from 'src/@core/api/schedule/schedule.service';
import { Schedule } from 'src/@core/data/Schedule';
import { User } from 'src/@core/data/User';
import { ToasterHelper } from 'src/@core/helpers/toaster.helper';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
  providers: [ScheduleService, ToasterHelper],
})
export class ScheduleComponent implements OnInit {
  schedules: Schedule;
  currentTab: string;
  scheduleExists = true;
  schedule: Schedule;
  constructor(
    private scheduleService: ScheduleService,
    private toastHelper: ToasterHelper
  ) {}

  ngOnInit(): void {
    this.schedule = new Schedule();
    this.schedule.user = new User();
    this.loadSchedule();
  }

  tabOnClick(current: string) {
    this.currentTab = current;
  }
  loadSchedule() {
    this.scheduleService.list().subscribe(
      (schedule) => {
        this.schedules = schedule;
      },
      (error) => {
        this.scheduleExists = false;
      }
    );
  }

  save(form: NgForm) {
    if (form.valid) {
      this.scheduleService.create(this.schedule).subscribe(
        (response) => {
          this.loadSchedule();
        },
        (error) => {
          this.loadSchedule();
        }
      );
    } else {
      this.toastHelper.showError('Erro', 'Por favor verifique seus campos!');
    }
  }
}
