<script lang="ts">
	import { onMount } from 'svelte';

  import Categories from '$lib/Categories.svelte';

	let categories: any;
  let organization: any;

	onMount(async() => {
		let erpHostname = window.location.hostname
		if (erpHostname === 'localhost') {
			erpHostname = 'store.subvind.com'
		}
    const response = await fetch(`https://api.subvind.com/categories/erpHostname/${erpHostname}`, {
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

    const responseOrg = await fetch(`https://api.subvind.com/organizations/erpHostname/${erpHostname}`, {
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

		// @ts-ignore
		gtag('event', 'pageview', {
			'organizationId': organization.id
		});
  })
</script>

<svelte:head>
  {#if organization}
  <title>Categories - {organization.displayName}</title>
  {/if}
</svelte:head>

<nav class="breadcrumbs black">
  <div class="container">
    <div class="nav-wrapper">
      <div class="col s12">
        <a href="/" class="breadcrumb">Home</a>
        {#if organization}
          <a href="/categories" class="breadcrumb">{organization.categoriesName}</a>
        {/if}
      </div>
    </div>
  </div>
</nav>

<div class="container">
  {#if categories && organization}
    <Categories categories={categories} organization={organization} />
  {/if}
</div>