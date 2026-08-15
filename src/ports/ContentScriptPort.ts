export interface InjectOptions {
  target: { tabId: number; frameId?: number };
  files: string[];
}

export interface ContentScriptPort {
  inject(options: InjectOptions): Promise<void>;
  remove(options: InjectOptions): Promise<void>;
}
