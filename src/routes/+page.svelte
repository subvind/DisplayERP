<script lang="ts">
	import { onMount } from 'svelte';

  import Slideshow from '$lib/Slideshow.svelte';
  import Categories from '$lib/Categories.svelte'

	let categories: any;

	onMount(async() => {
		let hostname = window.location.hostname
		if (hostname === 'localhost') {
			hostname = 'store.subvind.com'
		}
    const response = await fetch(`https://backend.subvind.com/categories/hostname/${hostname}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      categories = await response.json();

      setTimeout(() => {
        let elms = document.querySelectorAll('.tabs')
        var instance = M.Tabs.init(elms, {});
      }, 0)
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }
	})
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<br />
<Slideshow />

{#if categories}
  <Categories categories={categories} />
{/if}

{JSON.stringify(categories, null, 2)}

<style>
	
</style>
