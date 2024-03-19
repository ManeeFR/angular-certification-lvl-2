import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JobDetails } from '../interfaces/job-details.interface';

const BASE_URL = '/jobs';
const BASE_HEADERS = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
};

@Injectable({
    providedIn: 'root',
})
export class JobsService {
    constructor(private http: HttpClient) {}

    getJobDetailsById(jobId: string): Observable<JobDetails> {
        const url = `${BASE_URL}/${jobId}`;
        const headers = new HttpHeaders(BASE_HEADERS);
        return this.http.get<JobDetails>(url, { headers });
    }

    getAllJobs(): Observable<JobDetails[]> {
        const headers = new HttpHeaders(BASE_HEADERS);
        return this.http.get<JobDetails[]>(BASE_URL, { headers });
    }
}
