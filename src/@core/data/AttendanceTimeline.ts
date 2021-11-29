import {Default} from "./Default";
import {addMinutes} from "date-fns"

export class AttendanceTimeline extends Default {
  public start: Date;
  public end: Date;
  public status: string;

  constructor() {
    super();
  }

  generateTimeline(start: string, end: string, avg: number): AttendanceTimeline[] {
    const startDate = new Date(start);
    const endDate = new Date(end);

    let counter = startDate;
    let attendanceTimeline: AttendanceTimeline[] = [];

    do {
      attendanceTimeline = [
        ...attendanceTimeline,
        {
          start: counter,
          end: addMinutes(counter, avg),
          status: 'open'
        } as AttendanceTimeline
      ]
      counter = addMinutes(counter, avg);
    } while (counter < endDate);

    return attendanceTimeline;
  }
}
