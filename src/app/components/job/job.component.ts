import {
    ChangeDetectionStrategy,
    Component,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    RouterLinkWithHref
} from '@angular/router';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { JobDetails } from '../../interfaces/job-details.interface';

@Component({
    selector: 'app-job',
    templateUrl: './job.component.html',
    styleUrls: ['./job.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        RouterLinkWithHref,
        LazyLoadImageModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobComponent {
    @Input() job: JobDetails | null = null;
    @Input() showStar: boolean = false;
    @Input() isFavorite: boolean = false;
    @Output() toggleFavorite = new EventEmitter<{
        jobId: number;
        isFavorite: boolean;
    }>();

    protected toggleStarClick(): void {
        if (!this.isFavorite) {
            this.isFavorite = true;
        } else {
            this.isFavorite = false;
        }
        this.handleFavoriteChange(this.isFavorite);
    }

    protected handleFavoriteChange($event: boolean) {
        if (this.job?.id) {
            this.toggleFavorite.emit({
                jobId: this.job.id,
                isFavorite: $event,
            });
        }
    }
}
