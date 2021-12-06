import {Component, Input, OnInit} from '@angular/core';
import {PackageModel} from "../../../../@core/data/PackageModel";

@Component({
  selector: 'app-package-card',
  templateUrl: './package-card.component.html',
  styleUrls: ['./package-card.component.css']
})
export class PackageCardComponent implements OnInit {

  @Input() packageModel: PackageModel;

  constructor() {
  }

  ngOnInit(): void {
  }

}
