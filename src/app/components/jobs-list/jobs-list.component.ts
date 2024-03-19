import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
    RouterOutlet,
    ActivatedRoute,
} from '@angular/router';
import { of, Observable, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JobsService } from '../../services/jobs.service';
import { JobComponent } from '../job/job.component';
import { JobDetails } from '../../interfaces/job-details.interface';

@Component({
    selector: 'app-jobs-list',
    templateUrl: './jobs-list.component.html',
    styleUrls: ['./jobs-list.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        HttpClientModule,
        RouterOutlet,
        JobComponent
    ],
    providers: [JobsService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobsListComponent implements OnInit {
    protected allJobsList$: Observable<JobDetails[]> = EMPTY;
    protected favoritesJobsIds: number[] = [];
    protected isInFavoritesPage: boolean = false;

    constructor(
        private jobsService: JobsService,
        private activatedRoute: ActivatedRoute,
        private cdr: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.allJobsList$ = this.jobsService.getAllJobs().pipe(
            catchError((error) => {
                console.error('There was an error: ', error);
                return of([]);
            })
        );
        this.loadFavorites();
        this.isInFavoritesPage = this.activatedRoute.snapshot.url
            .join('/')
            .includes('jobs/favorites');
    }

    private loadFavorites(): void {
        const storedFavorites = localStorage.getItem('favoritesJobsList');
        if (storedFavorites) {
            this.favoritesJobsIds = JSON.parse(storedFavorites);
            this.cdr.detectChanges();
        }
    }

    protected handleFavoriteChange({
        jobId,
        isFavorite,
    }: {
        jobId: number;
        isFavorite: boolean;
    }): void {
        const favoriteJobIndex: number = this.favoritesJobsIds.findIndex(
            (favoriteJobId: number) => jobId === favoriteJobId
        );
        if (favoriteJobIndex === -1 && isFavorite) {
            this.favoritesJobsIds.push(jobId);
        } else if (favoriteJobIndex !== -1 && !isFavorite) {
            this.favoritesJobsIds = this.favoritesJobsIds.filter(
                (favoriteJobId: number) => jobId !== favoriteJobId
            );
        }
        localStorage.setItem(
            'favoritesJobsList',
            JSON.stringify(this.favoritesJobsIds)
        );
        this.cdr.detectChanges();
    }
}
