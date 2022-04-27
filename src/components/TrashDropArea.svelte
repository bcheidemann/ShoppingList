<script lang="ts">
    // icons
    import FaIcons from '@fortawesome/free-solid-svg-icons'

    // components
    import Fa from 'svelte-fa/src/fa.svelte';

    // props
    export let onDrop: svelte.JSX.DragEventHandler<HTMLDivElement>;
    export let onDragOver: svelte.JSX.DragEventHandler<HTMLDivElement>;
</script>

<div
    on:drop={onDrop}
    on:dragover={onDragOver}
    class="trash"
>
	<span>Trash</span>
    <Fa icon={FaIcons.faTrash} />
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
