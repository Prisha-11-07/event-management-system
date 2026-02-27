export interface BookingItem {
  id?: string | number;      // json-server can create id automatically
  eventId: string | number;  // your db.json uses "eventId": "1"
  name: string;
  email: string;
  phone: string;
  ticketCount: number;
  bookedAt: string;          // ISO date string
}