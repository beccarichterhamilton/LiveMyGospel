export interface Event {
  id: string;
  title: string;
  date: Date;
  startTime?: string;
  endTime?: string;
  type: string;
  color: string;
  notes?: string;
  preNotes?: string;
  postNotes?: string;
}