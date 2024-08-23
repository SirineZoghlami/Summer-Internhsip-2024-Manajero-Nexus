import 'zone.js/dist/long-stack-trace-zone';
import 'zone.js/dist/proxy.js';
import 'zone.js/dist/sync-test';
import 'zone.js/dist/jasmine-patch';
import 'zone.js/dist/async-test';
import 'zone.js/dist/fake-async-test';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting,
} from '@angular/platform-browser-dynamic/testing';

// Import your test files
import './app/pages/agile/nexus/tutorial/tutorial.component.spec';
import './app/pages/agile/nexus/nexus-dashboard/nexus-dashboard.component.spec';


// Initialize the Angular testing environment
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting(), {
    teardown: { destroyAfterEach: false },
  },
);

// Start Karma
declare const __karma__: any;
__karma__.loaded = function () {};
__karma__.start();
