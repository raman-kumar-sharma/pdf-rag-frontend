export type AskMode = "answer" | "summarize";

export interface Document {
  doc_id: string;
  filename: string;
  chunks: number;
  pages?: number;
  created_at?: string;
}

export interface DocumentsResponse {
  documents: Document[];
}

export interface UploadResponse {
  doc_id: string;
  filename: string;
  chunks: number;
  pages: number;
}

export interface Source {
  source: number;
  page: number | null;
  score: number;
  snippet: string;
}

export interface AskResponse {
  answer: string;
  sources: Source[];
}
