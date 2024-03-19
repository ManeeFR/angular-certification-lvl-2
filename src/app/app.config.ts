import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import {
    PreloadAllModules,
    provideRouter,
    withDebugTracing,
    withPreloading,
} from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
    providers: [
        importProvidersFrom(HttpClientModule),
        provideRouter(
            routes,
            withPreloading(PreloadAllModules),
            withDebugTracing()
        ),
    ],
};
