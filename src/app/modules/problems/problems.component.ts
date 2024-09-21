import {Component} from "@angular/core";
import {ProblemFilterComponent} from "@app/modules/problems/components/filter/problem-filter.component";
import {ProblemCatalogComponent} from "@app/modules/problems/components/catalog/problem-catalog.component";
import {KeenIconComponent} from "@shared/keen-icon/keen-icon.component";
import {RouterLink} from "@angular/router";
import {Resources} from "@app/resources";
import {ResourceByIdPipe} from "@shared/pipes/resource-by-id.pipe";

@Component({
    selector: 'kep-problems',
    standalone:true,
    imports: [
        ProblemFilterComponent,
        ProblemCatalogComponent,
        KeenIconComponent,
        RouterLink,
        ResourceByIdPipe
    ],
    templateUrl:'./problems.component.html',
    styleUrl:'./problems.component.scss'
})

export class ProblemsComponent{

    protected readonly Resources = Resources;
}
