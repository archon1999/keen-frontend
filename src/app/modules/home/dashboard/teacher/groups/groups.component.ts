import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseTablePageComponent } from "@app/common/classes/base-table-page.component";
import { Group } from "@app/modules/home/dashboard/teacher/groups/group.interface";
import { Observable } from "rxjs";
import { PageResult } from "@app/common/classes/page-result";
import { PaginationComponent } from "@shared/pagination/pagination.component";
import { NgbAccordionModule } from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-groups',
  standalone: true,
  imports: [CommonModule, PaginationComponent, NgbAccordionModule],
  templateUrl: './groups.component.html',
  styleUrl: './groups.component.scss'
})
export class GroupsComponent extends BaseTablePageComponent<Group>{
  getPage(): Observable<PageResult<Group>> | null {
    return this.api.get('groups')
  }
}
