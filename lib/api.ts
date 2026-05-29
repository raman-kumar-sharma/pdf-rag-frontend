import { getApiBase } from "./env";
import type {
  AskMode,
  AskResponse,
  DocumentsResponse,
  UploadResponse,
} from "./types";

const base = () => getApiBase();

async function parseError(res: Response): Promise<string> {
  try {
    const data = await res.json();
    if (typeof data.detail === "string") return data.detail;
    if (data.detail) return JSON.stringify(data.detail);
    return res.statusText;
  } catch {
    return res.statusText;
  }
}

export async function checkHealth(): Promise<boolean> {
  const res = await fetch(`${base()}/api/health`);
  return res.ok;
}

export async function fetchDocuments(): Promise<DocumentsResponse> {
  const res = await fetch(`${base()}/api/documents`);
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function uploadPdf(file: File): Promise<UploadResponse> {
  const fd = new FormData();
  fd.append("file", file);
  const res = await fetch(`${base()}/api/upload`, { method: "POST", body: fd });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}

export async function askDocument(
  docId: string,
  question: string,
  mode: AskMode
): Promise<AskResponse> {
  const res = await fetch(`${base()}/api/ask`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ doc_id: docId, question, mode }),
  });
  if (!res.ok) throw new Error(await parseError(res));
  return res.json();
}
