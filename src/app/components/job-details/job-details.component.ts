import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLinkWithHref } from '@angular/router';
import { JobsService } from '../../services/jobs.service';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { JobDetails } from '../../interfaces/job-details.interface';
import { EMPTY, Observable } from 'rxjs';

@Component({
    selector: 'app-job-details',
    templateUrl: './job-details.component.html',
    styleUrls: ['./job-details.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        HttpClientModule,
        RouterLinkWithHref,
        LazyLoadImageModule,
    ],
    providers: [JobsService],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobDetailsComponent implements OnInit {
    protected jobDetails$: Observable<JobDetails> = EMPTY;

    constructor(
        private jobsService: JobsService,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.fetchJobDetails();
    }

    private fetchJobDetails(): void {
        const jobId = this.route.snapshot.paramMap.get('id');
        if (jobId) {
            this.jobDetails$ = this.jobsService.getJobDetailsById(jobId);
        }
    }
}
