/** Shared request shapes used by the DOM writers. */
export interface StyleUpdateRequest {
  selector: string;
  property: string;
  newStyleValue?: string | null;
  temporaryId: string;
}
