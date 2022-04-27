<script lang="ts">
	// props
	export let name: string;
	export let onClick: (name: string) => void;
	export let onDragStart: svelte.JSX.DragEventHandler<HTMLDivElement>;
</script>

<div on:click={() => onClick(name)} class="list" draggable="true" on:dragstart={onDragStart}>
	<span>{name}</span>
</div>

<style>
	.list {
		border-radius: 16px;
		border-style: solid;
		border-color: var(--var);
		padding: 8px;
		max-width: 300px;
	}
</style>
