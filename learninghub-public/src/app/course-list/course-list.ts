import { Component, signal, inject } from '@angular/core';
import { CourseData } from '../course-data';
import type { Course } from '../course';

@Component({
  selector: 'app-course-list',
  imports: [],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList {
  private courseData = inject(CourseData);
  readonly courseName = signal('Web Development');

  readonly courses = signal<Course[]>([]);

  private async getCourses(): Promise<void> {
    try {
      const courses = await this.courseData.getCourses();

      this.courses.set(courses);

      console.log('Fetched courses:', courses);
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }

  ngOnInit(): void {
    this.getCourses();
  }
}
