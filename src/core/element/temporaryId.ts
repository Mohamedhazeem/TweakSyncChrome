/** Generates the opaque id used to address an element across layers. */
export function generateTemporaryId(): string {
  return (
    Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
  );
}
