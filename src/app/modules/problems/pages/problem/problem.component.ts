import {Component} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NgClass } from "@angular/common";
import { ContentHeaderModule } from "@layout/components/content-header/content-header.module";
import { ContentHeader } from "@layout/components/content-header/content-header.component";
import {
    ProblemCardComponent
} from "@app/modules/problems/pages/problem/components/problem-card/problem-card.component";

@Component({
    selector: 'kep-problem',
    standalone: true,
    imports: [
        NgClass,
        ContentHeaderModule,
        ProblemCardComponent
    ],
    templateUrl: './problem.component.html',
    styleUrl: './problem.component.scss',
})

export class ProblemComponent {
    activeTab: string = 'problem';

    constructor(private route: ActivatedRoute, private router: Router) { }

    ngOnInit(): void {
        this.route.queryParams.subscribe(params => {
            this.activeTab = params['tab'] || 'problem';
        });
    }

    selectTab(tab: string): void {
        this.activeTab = tab;
        // Query param orqali tabni saqlash
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { tab: this.activeTab },
            queryParamsHandling: 'merge'
        });
    }

    protected getContentHeader(): ContentHeader {
        return {
            headerTitle: 'Masalalar',
            breadcrumb: {
                links: [
                    {
                        isLink: true,
                        name: 'Masalalar',
                        link: '/problems'
                    }
                ]
            }
        }
    }
}
