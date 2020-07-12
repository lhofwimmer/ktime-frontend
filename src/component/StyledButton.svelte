<script>
  export let buttonStyle;
  export let href = "#";
</script>

<a
  {href}
  class={buttonStyle === 'fill' ? 'text-white hover:bg-indigo-500 bg-indigo-400 text-xs font-semibold rounded-md px-8 py-2 mt-2 leading-normal text-center' : 'text-indigo-400 hover:text-indigo-500 text-xs font-semibolkd text-center'}
  on:click>
  <slot>{href}</slot>
</a>
