https://github.com/orgs/supabase/discussions/13364

My solution to that "problem" is the following helper types:

export type Row<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type InsertDto<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type UpdateDto<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];
So you can extract the types as needed with

import { InsertDto, Row, UpdateDto } from '@src/interfaces/database';

export type Location = Row<'location'>;
export type LocationInsertDto = InsertDto<'location'>;
export type LocationUpdateDto = UpdateDto<'location'>;
