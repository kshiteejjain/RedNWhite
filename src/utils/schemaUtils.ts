export type Schema<T extends Record<string, unknown>> = {
  name: string;
  storageKey: string;
  columns: T;
};

export const createRecordFromSchema = <T extends Record<string, unknown>>(
  schema: Schema<T>
): T => ({
  ...schema.columns,
});

export const syncRecordWithSchema = <T extends Record<string, unknown>>(
  schema: Schema<T>,
  record: Partial<T>
): T => {
  const synced = { ...schema.columns } as T;
  (Object.keys(schema.columns) as (keyof T)[]).forEach((key) => {
    const value = record[key];
    if (value !== undefined) {
      synced[key] = value as T[keyof T];
    }
  });
  return synced;
};

export const syncRecordsWithSchema = <T extends Record<string, unknown>>(
  schema: Schema<T>,
  records: Partial<T>[]
): T[] => records.map((record) => syncRecordWithSchema(schema, record));

export const loadSchemaRecords = <T extends Record<string, unknown>>(
  schema: Schema<T>,
  fallback: T[]
): T[] => {
  if (typeof window === "undefined") {
    return fallback;
  }

  const stored = localStorage.getItem(schema.storageKey);
  if (!stored) {
    return fallback;
  }

  try {
    const parsed = JSON.parse(stored) as Partial<T>[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return fallback;
    }
    return syncRecordsWithSchema(schema, parsed);
  } catch {
    return fallback;
  }
};

export const saveSchemaRecords = <T extends Record<string, unknown>>(
  schema: Schema<T>,
  records: T[]
) => {
  if (typeof window === "undefined") {
    return;
  }
  localStorage.setItem(schema.storageKey, JSON.stringify(records));
};
