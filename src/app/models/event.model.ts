export interface EventItem {
  id: string | number;          // ✅ allow both
  title: string;
  category: string;
  date: string;
  location: string;
  description: string;
  price: number;
  availableTickets: number;
  imageUrl?: string;
  featured?: boolean;
}