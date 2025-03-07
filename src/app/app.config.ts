import {
	type ApplicationConfig,
	provideExperimentalZonelessChangeDetection,
	provideZoneChangeDetection,
} from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";

import { routes } from "./app.routes";
import {
	provideClientHydration,
	withEventReplay,
} from "@angular/platform-browser";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { provideServerRendering } from "@angular/platform-server";

export const appConfig: ApplicationConfig = {
	providers: [
		provideExperimentalZonelessChangeDetection(),
		provideRouter(routes, withComponentInputBinding()),
		provideClientHydration(withEventReplay()),
		provideHttpClient(withFetch()),
	],
};
