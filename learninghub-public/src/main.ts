import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { CourseList } from './app/course-list/course-list';

bootstrapApplication(CourseList, appConfig)
  .catch((err) => console.error(err));
  