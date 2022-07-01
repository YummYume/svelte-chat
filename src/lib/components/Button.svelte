<script lang="ts">
    export let additionalClasses: string = '';
    export let disabled: boolean = false;
    export let colored: boolean = true;
</script>

<button
    on:click
    {disabled}
    class={`rounded border-solid border-2 p-2 my-2 transition-all duration-150 hover:rounded-lg ${
        colored && 'text-pink-800 border-pink-800 hover:text-white hover:bg-pink-800'
    } ${additionalClasses}`}
>
    <slot />
</button>
