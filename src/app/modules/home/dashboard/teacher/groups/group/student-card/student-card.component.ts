import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Student } from "@app/modules/home/dashboard/teacher/groups/student.interface";

@Component({
  selector: 'app-student-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-card.component.html',
  styleUrl: './student-card.component.scss'
})
export class StudentCardComponent {
  @Input() student: Student;
}
