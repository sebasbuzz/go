
export interface TicketRequestType {
  id: number;
  user_id: number;
  created_at?: string;
  updated_at?: string;
  name: string;
  display_name: string;
}

export interface TicketRequestTypeTag extends TicketRequestType {
  id: number;
  user_id: number;
  created_at?: string;
  updated_at?: string;
  name: string;
  display_name: string;
  pivot: {
    tag_id: number;
    request_type_id: number;
    id: number;
  }
}