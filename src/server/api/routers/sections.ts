import { z } from "zod";
import { faker, fakerEN } from "@faker-js/faker";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import SectionsData from "../../../data/sections.json";

export interface Sections {
  data: Data;
  error: string;
  error_code: string;
  message: string;
  status: string;
  status_code: number;
}
export interface Data {
  rt_update_fields?: null[] | null;
  sections?: SectionsEntity[] | null;
}
export interface SectionsEntity {
  children?: ChildrenEntity[] | null;
  id: number;
  title: string;
  type: string;
}
export interface ChildrenEntity {
  acc: number;
  content?: Content | null;
  doc_id: string;
  format: string;
  format_message: string;
  id: number;
  id_auto_extract?: number | null;
  id_auto_extract_label?: string | null;
  ignore?: boolean | null;
  label: string;
  low_confidence: boolean;
  no_items_row: number;
  order: number;
  org_id?: string | null;
  p_title: string;
  p_type: string;
  parent_id: number;
  time_spent?: number | null;
  type: string;
  user_id?: string | null;
  drop_down_type?: string | null;
  children?: ((ChildrenEntityEntityEntity[] | null)[] | null)[] | null;
  row_count?: number | null;
}
export interface Content {
  confidence: number;
  is_valid_format: boolean;
  orig_value: string | number;
  page: number;
  position?: (number | null)[] | null;
  position_label?: null[] | null;
  review_required: boolean;
  validation_source: string;
  value: string | number;
}
export interface ChildrenEntityEntityEntity {
  acc: number;
  content: Content1;
  doc_id: string;
  format: string;
  format_message: string;
  id: number;
  id_auto_extract: number;
  id_auto_extract_label: string;
  ignore: boolean;
  label: string;
  low_confidence: boolean;
  no_items_row: number;
  order: number;
  p_title: string;
  p_type: string;
  parent_id: number;
  sub_p_id: number;
  sub_p_title: string;
  sub_p_type: string;
  time_spent: number;
  type: string;
}
export interface Content1 {
  is_valid_format: boolean;
  orig_value: string;
  position?: null[] | null;
  value: string;
}

interface post {
  id: string;
  name: string;
  selected: boolean;
}

const sections: Sections = SectionsData;

export const sectionRouter = createTRPCRouter({
  getSections: publicProcedure.query(() => {
    return sections;
  }),
});
