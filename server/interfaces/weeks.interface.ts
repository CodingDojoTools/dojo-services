export interface Weeks {
  weeks: Week[];
}

export interface Week {
  week: string;
  days: Day[];
}

export interface Day {
  day: string;
  date: string;
  segment: string;
}
