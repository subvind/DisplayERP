<script lang="ts">
	import { onMount } from 'svelte';

  import Showcase from '$lib/Showcase.svelte';
  import Categories from '$lib/Categories.svelte';
  import LatestProducts from '$lib/LatestProducts.svelte';

	let categories: any;
  let organization: any;

	onMount(async() => {
		let hostname = window.location.hostname
		if (hostname === 'localhost') {
			hostname = 'store.subvind.com'
		}
    const response = await fetch(`https://api.subvind.com/categories/hostname/${hostname}`, {
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

    const responseOrg = await fetch(`https://api.subvind.com/organizations/hostname/${hostname}`, {
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

		// Send a custom dimension with an event (e.g., when a pageview occurs)
		// @ts-ignore
		gtag('event', 'pageview', {
			'organizationId': organization.id, // Replace with the actual tenantId
		});
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
  {#if organization}
    <Showcase organization={organization} />
  {/if}
  
  {#if categories && organization}
    <Categories categories={categories} organization={organization} />
  {/if}
  
  {#if organization}
    <LatestProducts organization={organization} />
  {/if}
</div>

<!-- {JSON.stringify(categories, null, 2)} -->

<style>
	
</style>
