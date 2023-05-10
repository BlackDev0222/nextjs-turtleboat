import { State } from "zustand";

export type Question = {
  question: string,
  subquestions?: string[],
  name?: string,
  type: string,
  required?: boolean,
  candidates?: string[],
  column?: number,
  inline?: boolean,
  placeholder?: string,
  setValue?: Function,
  getValue?: Function,
};