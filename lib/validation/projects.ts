export type CreateProjectPayload = {
  title: string;
  sourceType: 'PASTE' | 'TXT';
  sourceText: string;
  language?: string;
};

export function parseCreateProjectPayload(payload: unknown): CreateProjectPayload | null {
  if (!payload || typeof payload !== 'object') return null;
  const body = payload as Record<string, unknown>;

  if (typeof body.title !== 'string' || body.title.trim().length < 1 || body.title.trim().length > 200) {
    return null;
  }

  if (body.sourceType !== 'PASTE' && body.sourceType !== 'TXT') {
    return null;
  }

  if (typeof body.sourceText !== 'string') {
    return null;
  }

  const sourceText = body.sourceText.trim();
  if (sourceText.length < 1 || sourceText.length > 200000) {
    return null;
  }

  const result: CreateProjectPayload = {
    title: body.title.trim(),
    sourceType: body.sourceType,
    sourceText,
  };

  if (typeof body.language === 'string' && body.language.trim().length > 0) {
    result.language = body.language.trim().slice(0, 10);
  }

  return result;
}
