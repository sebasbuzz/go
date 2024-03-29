export const TAG_MODEL = 'tag';

export interface Tag {
  id: number;
  name: string;
  display_name: string;
  description_ticket_page?: string;
  type: string;
  updated_at: string;
  created_at: string;
  model_type: typeof TAG_MODEL;
}
