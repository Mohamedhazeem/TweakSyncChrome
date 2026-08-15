export interface StyleRule {
  property: string;
  value: string;
}

export interface StyleModel {
  languageId: string;
  rules: StyleRule[];
  metadata?: Record<string, unknown>;
}

export const sampleStyleModel: StyleModel = {
  languageId: "css",
  rules: [
    { property: "color", value: "red" },
    { property: "display", value: "flex" },
  ],
};

export const sampleSerialized = "color: red; display: flex;";
