import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KeenIconComponent } from "@shared/keen-icon/keen-icon.component";
import { fadeInRightOnEnterAnimation } from "angular-animations";
import { ContentHeader } from "@layout/components/content-header/content-header.component";
import { ContentHeaderModule } from "@layout/components/content-header/content-header.module";
import { ButtonModule } from "primeng/button";
import { InputNumberModule } from "primeng/inputnumber";
import { CalendarModule } from "primeng/calendar";
import { TeacherComponent } from "@app/modules/home/dashboard/teacher/teacher.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    KeenIconComponent,
    ContentHeaderModule,
    ButtonModule,
    InputNumberModule,
    CalendarModule,
    TeacherComponent,
  ],
  animations: [
    fadeInRightOnEnterAnimation(),
  ]
})
export class HomeComponent {
  protected getContentHeader(): ContentHeader {
    return {
      headerTitle: 'Menu.Home',
      breadcrumb: {
        links: [
          {
            isLink: true,
            name: 'KEEN.uz',
            link: ''
          }
        ]
      }
    }
  }
}
