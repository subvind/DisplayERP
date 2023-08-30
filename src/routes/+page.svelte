<script lang="ts">
	import { onMount } from 'svelte';

  import Slideshow from '$lib/Slideshow.svelte';
  import Categories from '$lib/Categories.svelte';
  import LatestProducts from '$lib/LatestProducts.svelte';

	let categories: any;
  let organization: any;

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

    const responseOrg = await fetch(`https://backend.subvind.com/organizations/hostname/${hostname}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (responseOrg.ok) {
      organization = await responseOrg.json();
    } else {
      const errorData = await responseOrg.json();
      alert(errorData.error);
    }
	})
</script>

<svelte:head>
  {#if organization}
    <title>{organization.displayName} - {organization.description}</title> 
    <meta name="description" content={organization.detail} />
  {/if}
</svelte:head>

<br />
<div class="container">
  <Slideshow />
  
  {#if categories}
    <Categories categories={categories} />
  {/if}
  
  {#if organization}
    <LatestProducts organization={organization} />
  {/if}
</div>

<!-- {JSON.stringify(categories, null, 2)} -->

<style>
	
</style>
