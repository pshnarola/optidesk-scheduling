import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as Gantt from '../../assets/gantt-master';

@Component({
  selector: 'app-scheduling',
  templateUrl: './scheduling.component.html',
  styleUrls: ['./scheduling.component.scss']
})
export class SchedulingComponent implements OnInit {
  @ViewChild('ganttChart', { static: true }) ganttEle: ElementRef;

  scheduling = [
    {
      // custom_index: 0, // used to display bars in one line
      start: '2018-10-01 00',
      end: '2018-10-01 05',
      name: 'Create Shampoo Liquid',
      operation: 'Dove Green-1',
      resource: 'PML1',
      id: 'Task 0',
      progress: 100,
      custom_class: 'cc-grey',
    },
    {
      // custom_index: 0,
      start: '2018-10-01 05',
      end: '2018-10-01 09',
      name: 'Adding Color and Fragrance',
      operation: 'Dove Green-1',
      resource: 'ML1',
      id: 'Task 1',
      progress: 100,
      custom_class: 'cc-grey',
      dependencies: 'Task 0'
    },
    {
      start: '2018-10-01 09',
      end: '2018-10-01 15',
      name: 'Fill Bottle',
      operation: 'Dove Green-1',
      resource: 'FL1',
      id: 'Task 2',
      progress: 100,
      custom_class: 'cc-grey',
      dependencies: 'Task 1'
    },
    {
      start: '2018-10-01 15',
      end: '2018-10-01 19',
      name: 'Attach Cap and Fill into Box',
      operation: 'Dove Green-1',
      resource: 'PL1',
      id: 'Task 3',
      progress: 100,
      custom_class: 'cc-grey',
      dependencies: 'Task 2'
    },
    {
      start: '2018-10-01 19',
      end: '2018-10-01 22',
      name: 'Dispatch',
      operation: 'Dove Green-1',
      resource: 'DP1',
      id: 'Task 4',
      progress: 100,
      custom_class: 'cc-grey',
      dependencies: 'Task 3'
    },
    {
      start: '2018-10-01 00',
      end: '2018-10-01 05',
      name: 'Create Shampoo Liquid',
      operation: 'Dove Green-2',
      resource: 'PML2',
      id: 'Task 5',
      progress: 100,
      custom_class: 'cc-grey',
    },
    {
      start: '2018-10-01 05',
      end: '2018-10-01 10',
      name: 'Adding Color and Fragrance',
      operation: 'Dove Green-2',
      resource: 'ML2',
      id: 'Task 6',
      progress: 100,
      custom_class: 'cc-grey',
      dependencies: 'Task 5'
    },
    {
      start: '2018-10-01 10',
      end: '2018-10-01 15',
      name: 'Fill Bottle',
      operation: 'Dove Green-2',
      resource: 'FL2',
      id: 'Task 7',
      progress: 100,
      custom_class: 'cc-grey',
      dependencies: 'Task 6'
    },
    {
      start: '2018-10-01 15',
      end: '2018-10-01 20',
      name: 'Attach Cap and Fill into Box',
      operation: 'Dove Green-2',
      resource: 'PL2',
      id: 'Task 8',
      progress: 100,
      custom_class: 'cc-grey',
      dependencies: 'Task 7'
    },
    {
      start: '2018-10-01 20',
      end: '2018-10-01 23',
      name: 'Dispatch',
      operation: 'Dove Green-2',
      resource: 'DP2',
      id: 'Task 9',
      progress: 100,
      custom_class: 'cc-grey',
      dependencies: 'Task 8'
    },
  ];
  taskScheduling = [];
  taskData = [];
  gantt: any;

  constructor() { }

  ngOnInit(): void {
    this.createSchedulingGroup();
  }

  createSchedulingGroup() {
    const statesSeen = {};
    const countiesSeen = {};

    this.taskScheduling = this.scheduling.sort((a, b) => {
      const stateComp = a.operation.localeCompare(b.operation);
      return stateComp ? stateComp : a.operation.localeCompare(b.operation);
    }).map(x => {
      const operationSpan = statesSeen[x.operation] ? 0 :
        this.scheduling.filter(y => y.operation === x.operation).length;
      statesSeen[x.operation] = true;
      countiesSeen[x.operation] = countiesSeen[x.operation] || {};
      countiesSeen[x.operation][x.operation] = true;
      return { ...x, operationSpan };
    });
  }

  addTask(task) {
    if (this.taskData.length) {
      this.taskScheduling.forEach(element => {
        if (element.operation === task.operation) {
          console.log('operation', element);
          this.taskData.push(element);
        }
      });
      this.gantt.refresh(this.taskData);
    } else {
      this.taskScheduling.forEach(element => {
        if (element.operation === task.operation) {
          console.log('operation', element);
          this.taskData.push(element);
        }
      });
      this.gantt = new Gantt.default(this.ganttEle.nativeElement, this.taskData, {
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
        padding: 10,
        view_mode: 'Hour',
        date_format: 'YYYY-MM-DD',
        popup_trigger: 'mouseover',  // dblclick, click, mouseover
        // custom_popup_html: null,
        custom_popup_html: (task) => {
          return `
          <div class="details-container">
            <p> Opertion: ${task.operation}</p>
            <p> Resource: ${task.resource}</p>
            <p>Task: ${task.name}</p>
            <p>Expected to finish by ${task.end}</p>
            <p>${task.progress}% completed!</p>
            <p id="click">Double Click to Remove</p>
          </div>
          `;
        },
        language: 'en',
        on_click: (task) => {
          console.log('double click', task);
          // this.onRemoveTask(task);
        },
        on_date_change: (task, start, end) => {
          const startDate = this.formatDate(start);
          const endDate = this.formatDate(end);
          // this.updateTask(startDate, endDate, task);
        },
        on_progress_change: (task, progress) => {
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
    const time = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    if (month.length < 2) {
      month = '0' + month;
    }
    if (day.length < 2) {
      day = '0' + day;
    }
    return year + '-' + month + '-' + day + ' ' + time;
  }

}
