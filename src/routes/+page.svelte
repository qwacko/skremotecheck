<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import {
		getAllKeysFunction,
		getValueFunction,
		updateKeyFunction,
		deleteKeyFunction
	} from './test.remote';

	const keys = $derived(await getAllKeysFunction());
	const awaitedKeys = $derived(keys.keys);
	$inspect('Awaited Keys', awaitedKeys);
</script>

<main class="container">
	<header class="page-header">
		<h1 style="display: inline;">Remote Key/Value Store</h1>
		<button
			class="contrast"
			onclick={() => invalidateAll()}
			style="display: inline; margin-left: 1rem;"
		>
			Refresh
		</button>
	</header>

	<section aria-labelledby="items-heading" class="items-section">
		<h2 id="items-heading">All Items</h2>
		<h3>There are {awaitedKeys ? awaitedKeys.length : 0} Values</h3>
		{#if awaitedKeys?.length}
			<table>
				<thead><tr><th>Key</th><th>Value</th><th>Value</th><th>Actions</th></tr></thead>
				<tbody>
					{#each awaitedKeys as key (key)}
						{@const value = (await getValueFunction({ key })).value}
						{@const updateForm = updateKeyFunction.for('updatekey' + key)}
						{@const deleteForm = deleteKeyFunction.for('deletekey' + key)}
						<tr>
							<td>{key}</td>
							<td class="value">{value}</td>
							<td>
								<form {...updateForm} class="update-form" aria-label="Update {key}">
									<!-- svelte-ignore a11y_no_redundant_roles -->
									<fieldset role="group">
										<input {...updateForm.fields.key.as('hidden', key)} />
										<input
											id="value-{key}"
											{...updateForm.fields.value.as('text')}
											{value}
											placeholder="New value"
										/>
										<button type="submit" class="secondary" style="margin: 0;">Save</button>
									</fieldset>
								</form>
							</td>
							<td>
								<form {...deleteForm} class="inline-form" aria-label="Delete {key}">
									<input {...deleteForm.fields.key.as('hidden', key)} />
									<button type="submit" class="contrast outline" aria-label="Delete {key}"
										>Delete</button
									>
								</form>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		{:else}
			<p><em>No items yet.</em></p>
		{/if}
	</section>

	<section aria-labelledby="add-heading" class="add-section">
		<h2 id="add-heading">Add or Update Item</h2>
		<form {...updateKeyFunction} class="add-form">
			<fieldset>
				<legend>Item data</legend>
				<div class="grid">
					<label>
						<span>Key</span>
						<input
							{...updateKeyFunction.fields.key.as('text')}
							placeholder="e.g. username"
							required
						/>
					</label>
					<label>
						<span>Value</span>
						<input {...updateKeyFunction.fields.value.as('text')} placeholder="Value" required />
					</label>
				</div>
			</fieldset>
			<button type="submit">Save Item</button>
		</form>
	</section>
</main>

<style>
	/* Pico is already loaded globally; add light custom tweaks scoped to this page */
	main.container {
		margin-top: 2rem;
	}
	.page-header .lede {
		margin-top: -0.5rem;
		color: var(--muted-color);
	}
	.grid {
		align-items: stretch;
	}

	form.inline-form {
		margin: 0;
	}

	.update-form {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
		margin-top: 0.5rem;
	}
	.update-form input[type='text'] {
		flex: 1 1 12ch;
	}
	.add-form fieldset {
		margin-bottom: 1rem;
	}
	.sr-only {
		position: absolute;
		width: 1px;
		height: 1px;
		padding: 0;
		margin: -1px;
		overflow: hidden;
		clip: rect(0 0 0 0);
		white-space: nowrap;
		border: 0;
	}
	@media (prefers-color-scheme: dark) {
		.page-header .lede {
			color: var(--muted-color);
		}
	}
</style>
