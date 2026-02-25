export interface EventItem {
  id: number;
  title: string;
  category: string;
  date: string;
  location: string;
  price: number;
  availableTickets: number;
  featured?: boolean;
  description: string;
  imageUrl?: string;   // ⭐ ADD THIS LINE
}