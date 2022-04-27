<script lang="ts">
	// props
	export let onDrop: svelte.JSX.DragEventHandler<HTMLDivElement>;
	export let onDragOver: svelte.JSX.DragEventHandler<HTMLDivElement>;
</script>

<div on:drop={onDrop} on:dragover={onDragOver} class="trash">
	<span>Trash</span>
</div>

<style>
	.trash {
		position: absolute;
		bottom: 16px;
		right: 16px;
		border-radius: 16px;
		border-style: dotted;
		border-color: var(--var);
		padding: 8px;
		max-width: 300px;
	}
</style>
