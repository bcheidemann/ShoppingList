<script lang="ts">
	// styles
	import '../styles/global.scss';

	// components
	import ListItem from '../components/ListItem.svelte';
	import TrashDropArea from '../components/TrashDropArea.svelte';

	// types
	import type { ListData } from '../utils/types';

	// imports
	import { LocalStorage } from '../utils/local_storage';
	import { onMount } from 'svelte';
	import { to_alphanumeric } from '../utils/sanitizers';
	import { validate_list_name } from '../utils/validators';
	import { DragDropController } from '../utils/controllers/drag_drop';

	// state
	let initialized = false;
	$: your_lists = new Array() as LocalStorage.Item[LocalStorage.Key['YOUR_LISTS']];
	$: your_lists,
		initialized && LocalStorage.setItemJson(LocalStorage.Key.JSON.YOUR_LISTS, your_lists);

	// controllers
	const drag_drop_controller = new DragDropController<ListData, null>();

	// refs
	let input: HTMLInputElement;

	// logic
	function submit() {
		sanitize();
		const is_valid = validate_list_name(input.value);
		if (!is_valid) {
			// TODO: Handle validation failure
			return;
		}
		if (your_lists.includes(input.value)) {
			// TODO: Handle validation failure
			return;
		}
		your_lists = [...your_lists, input.value];
		input.value = '';
	}

	function sanitize() {
		input.value = to_alphanumeric(input.value);
	}

	function handle_delete_list(list_name: string) {
		your_lists = your_lists.filter((name) => name !== list_name);
	}

	// setup
	function setup_your_lists() {
		your_lists = LocalStorage.getItemJson(LocalStorage.Key.JSON.YOUR_LISTS, []);
	}

	function setup_drop_handler() {
		drag_drop_controller.addDropEventListener((dragData) => {
			handle_delete_list(dragData.name);
		});
	}

	// lifecycles
	onMount(() => {
		setup_drop_handler();
		setup_your_lists();
		initialized = true;
	});
</script>

<svelte:head>
  <title>Your Lists</title>
</svelte:head>

<div class="column">
	<h1>Your ToDo Lists</h1>

	<form on:submit|preventDefault={submit}>
		<input
			on:input={sanitize}
			bind:this={input}
			type="text"
			placeholder="Enter a list name"
			required
		/>
	</form>

	{#if your_lists.length === 0}
		<span>You have no lists</span>
	{/if}

	{#each your_lists as list_name}
		<a class="item" href={`/list/${list_name}`}>
			<ListItem
				onDragStart={drag_drop_controller.createOnDragStartHandler({
					name: list_name
				})}
				name={list_name}
				onClick={console.log}
			/>
		</a>
	{/each}
</div>

<TrashDropArea
	onDrop={drag_drop_controller.createOnDropHandler(null)}
	onDragOver={drag_drop_controller.onDragOverAllowDrop}
/>

<style>
	.column {
		display: flex;
		align-items: center;
		flex-direction: column;
		row-gap: 8px;
	}

	a.item {
		color: unset;
	}
</style>
