import { Component, ChangeDetectionStrategy } from '@angular/core';
import {
    Router,
    RouterLinkWithHref,
    RouterModule,
} from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, RouterLinkWithHref, CommonModule, RouterModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'ng-job-search';

    constructor(private router: Router) {}

    protected isActive(path: string): boolean {
        const currentUrl = this.router.url;
        return currentUrl.startsWith(path) && currentUrl !== '/jobs/favorites';
    }
}
