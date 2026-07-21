export interface FeatureLibsGeneratorSchema {
  libTypes: ("feature" | "data-access" | "ui" | "types" | "util")[];
  ressourceNameSingular: string;
  ressourceNamePlural: string;
}
