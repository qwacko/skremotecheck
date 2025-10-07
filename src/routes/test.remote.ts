import { form, query } from '$app/server';
import z from 'zod';

const schema = z.object({
	key: z.string().min(1, 'Key is required'),
	value: z.string().min(1, 'Value is required')
});

const kvStore = new Map<string, string>();

export const updateKeyFunction = form(schema, async (data) => {
	kvStore.set(data.key, data.value);
	return { success: true };
});

export const deleteKeyFunction = form(schema.pick({ key: true }), async (data) => {
	kvStore.delete(data.key);
	return { success: true };
});

export const getValueFunction = query(schema.pick({ key: true }), async (data) => {
	const value = kvStore.get(data.key) || null;
	return { value };
});

export const getAllKeysFunction = query(async () => {
	const keys = Array.from(kvStore.keys());
	return { keys };
});

export const getAllKeysDataFunction = query(async () => {
	const data = Array.from(kvStore.keys()).map((item) => ({ key: item, value: kvStore.get(item) }));
	return { data };
});
