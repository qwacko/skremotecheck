<script lang="ts">
	import {
		getAllKeysFunction,
		getValueFunction,
		updateKeyFunction,
		deleteKeyFunction
	} from './test.remote';

	const keys = $derived(getAllKeysFunction());
	const awaitedKeys = $derived((await keys).keys);
</script>

<h1>Remote Functions Test</h1>
<h2>All Items</h2>
<ul>
	{#each awaitedKeys as key}
		{@const updateForm = updateKeyFunction.for('updatekey' + key)}
		{@const deleteForm = deleteKeyFunction.for('deletekey' + key)}
		{@const value = (await getValueFunction({ key })).value}
		<li>
			<strong>{key}</strong>: {value}
			<form {...deleteForm} style="display:inline">
				<input {...deleteForm.fields.key.as('hidden')} value={key} />
				<button type="submit">Delete</button>
			</form>
			<form {...updateForm}>
				<input {...updateForm.fields.key.as('hidden')} value={key} />
				<label for="value-{key}">New Value:</label>
				<input {...updateForm.fields.value.as('text')} {value} placeholder="New Value" />
				<button type="submit">Update</button>
			</form>
		</li>
	{/each}
</ul>

<h2>Add Item</h2>
<form {...updateKeyFunction}>
	<label for="key">Key:</label>
	<input id="key" {...updateKeyFunction.fields.key.as('text')} />
	<label for="value">Value:</label>
	<input id="value" {...updateKeyFunction.fields.value.as('text')} />
	<button type="submit">Add/Update Item</button>
</form>
