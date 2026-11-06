import { Component, signal } from '@angular/core';
import type { Course } from '../course';
import { CourseLevelPipe } from '../course-level-pipe';

@Component({
  selector: 'app-course-list',
  imports: [CourseLevelPipe],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css'
})
export class CourseList {
  readonly courseName = signal('Web Development');

  readonly courses = signal<Course[]>([
  {
    _id: '1',
    name: 'Web Development',
    description: 'Learn HTML, CSS, JavaScript and modern web development.',
    level: 'beginner'
  },
  {
    _id: '2',
    name: 'Python',
    description: 'Learn Python programming from the basics.',
    level: 'beginner'
  },
  {
    _id: '3',
    name: 'Databases',
    description: 'Learn database design and management.',
    level: 'intermediate'
  },
  {
    _id: '4',
    name: 'Node.js',
    description: 'Build server-side applications with Node.js.',
    level: 'advanced'
  }
]);
}
