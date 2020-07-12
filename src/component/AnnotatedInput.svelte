<script>
  export let label;
  export let value;
  export let type = "text";

  //array supplied to select
  export let selectValues = [];

  //input type="date" doesn't autmotically return a date - so this workaround should suffice
  let dateInput;

  function valueChange() {
    value = new Date(dateInput.valueAsNumber);
  }

  function logValue() {
    console.log(value);
    value = value;
  }
</script>

<style>
  input,
  select {
    @apply bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full
    py-2 px-4 text-gray-700 leading-tight mb-4;
  }

  input:focus {
    @apply outline-none bg-white border-indigo-400;
  }
</style>

<h4
  class="uppercase tracking-wide text-xs text-gray-700 font-bold mb-2
  leading-tight">
  {label}
</h4>

<!-- Cannot set type dynamically - svelte can't handle this yet apparently -->
{#if type === 'text'}
  <input type="text" placeholder={label} bind:value />
{:else if type === 'password'}
  <input type="password" placeholder={label} bind:value />
{:else if type === 'date'}
  <input type="date" bind:this={dateInput} on:blur={valueChange} />
{:else if type === 'datetime'}
  <input type="datetime-local" bind:this={dateInput} on:blur={valueChange} />
{:else if type === 'select'}
  <select bind:value on:change={logValue}>
    {#each selectValues as choice}
      <option value={choice.id}>{choice.value}</option>
    {/each}
  </select>
{/if}
