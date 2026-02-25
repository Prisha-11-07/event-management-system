export interface Booking {
    id?: number;
    eventId: number;
    userId?: string;
    userName: string;
    userEmail: string;
    ticketCount: number;
    date: Date;
}