import type { StyleModel } from "./sampleStyleModel";

export interface SampleStylingLanguage {
  readonly id: string;
  readonly label: string;
  parse(raw: string): StyleModel;
  serialize(model: StyleModel): string;
}

export const sampleLanguage: SampleStylingLanguage = {
  id: "sample",
  label: "Sample",
  parse(raw: string): StyleModel {
    return { languageId: "sample", rules: [], metadata: { raw } };
  },
  serialize(model: StyleModel): string {
    return model.rules.map((r) => `${r.property}: ${r.value};`).join(" ");
  },
};
