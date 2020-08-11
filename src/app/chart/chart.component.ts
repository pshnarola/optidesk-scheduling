import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as Gantt from 'frappe-gantt';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @ViewChild('gantt', { static: true }) ganttEl: ElementRef;

  task = [
    {
      start: '2018-10-01 00',
      end: '2018-10-01 10',
      name: 'Redesign website',
      id: 'Task 0',
      progress: 100,
      custom_class: 'cc-grey'
    },
    {
      start: '2018-10-01 10',
      end: '2018-10-01 20',
      name: 'Write new content',
      id: 'Task 1',
      progress: 100,
      dependencies: 'Task 0'
    },
    {
      start: '2018-10-01 10',
      end: '2018-10-01 15',
      name: 'Apply new styles',
      id: 'Task 2',
      progress: 100
      // dependencies: 'Task 1'
    },
    {
      start: '2018-10-01 05:00:00',
      end: '2018-10-01 06:00:00',
      name: 'Review',
      id: 'Task 3',
      progress: 100,
      dependencies: 'Task 2'
    },
    {
      start: '2018-10-01 04:00:00',
      end: '2018-10-01 07:00:00',
      name: 'Deploy',
      id: 'Task 4',
      progress: 100,
      dependencies: 'Task 2'
    },
    {
      start: '2018-10-01 05:00:00',
      end: '2018-10-01 09:00:00',
      name: 'Go Live!',
      id: 'Task 5',
      progress: 100,
      // dependencies: 'Task 4',
      custom_class: 'bar-milestone'
    }
  ];
  taskTable = [
    {
      start: '2018-10-01 00',
      end: '2018-10-01 10',
      name: 'Redesign website',
      id: 'Task 0',
      progress: 100
    },
    {
      start: '2018-10-01 10',
      end: '2018-10-01 20',
      name: 'Write new content',
      id: 'Task 1',
      progress: 100,
      dependencies: 'Task 0'
    },
    {
      start: '2018-10-01 10',
      end: '2018-10-01 15',
      name: 'Apply new styles',
      id: 'Task 2',
      progress: 100
      // dependencies: 'Task 1'
    },
    {
      start: '2018-10-01 05:00:00',
      end: '2018-10-01 06:00:00',
      name: 'Review',
      id: 'Task 3',
      progress: 100,
      dependencies: 'Task 2'
    },
    {
      start: '2018-10-01 04:00:00',
      end: '2018-10-01 07:00:00',
      name: 'Deploy',
      id: 'Task 4',
      progress: 100,
      dependencies: 'Task 2'
    },
    {
      start: '2018-10-01 05:00:00',
      end: '2018-10-01 09:00:00',
      name: 'Go Live!',
      id: 'Task 5',
      progress: 100,
      // dependencies: 'Task 4',
    },
    {
      start: '2018-10-01 20',
      end: '2018-10-01 23',
      name: 'Live!',
      id: 'Task 6',
      progress: 100,
      dependencies: 'Task 5',
      custom_class: 'bar-milestone'
    }
  ];
  ganttChart: any;
  taskDetails = [];
  constructor() { }

  ngOnInit(): void {
    this.taskDetails = this.task;
    if (this.taskDetails.length) {
      this.ganttChart = new Gantt.default(this.ganttEl.nativeElement, this.taskDetails, {
        header_height: 100,
        column_width: 30,
        step: 24,
        view_modes: [
          'Quarter Day',
          'Half Day',
          'Day',
          'Week',
          'Month',
          'Year'
        ],
        bar_height: 30,
        bar_corner_radius: 3,
        arrow_curve: 5,
        padding: 18,
        view_mode: 'Hour',
        date_format: 'YYYY-MM-DD',
        popup_trigger: 'mouseover',  // dblclick, click, mouseover
        // custom_popup_html: null,
        custom_popup_html: (task) => {
          return `
          <div class="details-container">
            <p>${task.name}</p>
            <p>Expected to finish by ${task.end}</p>
            <p>${task.progress}% completed!</p>
            <p id="click">Double Click to Remove</p>
          </div>
          `;
        },
        language: 'en',
        on_click: (task) => {
          console.log('double click', task);
          this.onRemove(task);
        },
        on_date_change: (task, start, end) => {
          const startDate = this.formatDate(start);
          const endDate = this.formatDate(end);
          this.updateTask(startDate, endDate, task);
        },
        on_progress_change: (task, progress) => {
          console.log('clicked me', task);
          console.log(task, progress);
        },
        on_view_change: (mode) => {
          console.log(mode);
        },
      });
    }
  }

  formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return year + '-' + month + '-' + day;
  }

  onRemove(task) {
    console.log('remove', task);
    this.taskDetails.forEach((element, index) => {
      if (element.id === task.id) {
        console.log('yes match', element)
        this.taskDetails.splice(index, 1);
        this.ganttChart.refresh(this.taskDetails);
      }
    });
  }

  addTaskToChart(task) {
    this.taskDetails.push(task);
    this.ganttChart.refresh(this.taskDetails);
  }

  updateTask(startDate, endDate, task) {
    console.log('task', task);
    task.start = startDate;
    task.end = endDate;
    console.log('update', task);
    this.taskTable.forEach(element => {
      if (element.id === task.id) {
        element.start = startDate;
        element.end = endDate;
      }
    });
    // this.taskDetails.push(task);
    // this.ganttChart.refresh(this.taskDetails);
  }
}
