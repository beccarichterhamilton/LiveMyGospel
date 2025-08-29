export interface Person {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  instagram?: string;
  facebook?: string;
  dotColor: string;
  lastContact?: Date;
  dateCount: number;
  notes: PersonNote[];
  isFamily?: boolean;
  isPlatonic?: boolean;
}

export interface PersonNote {
  id: string;
  content: string;
  type: 'pre' | 'post' | 'general';
  createdAt: Date;
  eventId?: string;
}