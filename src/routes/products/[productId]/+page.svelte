<script lang="ts">
    import Categories from "$lib/Categories.svelte";
  import { onMount } from "svelte";

  export let data: any;
  let organization: any;
  let product: any;

	onMount(async() => {
		let hostname = window.location.hostname
		if (hostname === 'localhost') {
			hostname = 'store.subvind.com'
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

    const responseProduct = await fetch(`https://backend.subvind.com/products/sku/${data.productId}/${organization.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (responseProduct.ok) {
      product = await responseProduct.json();
    } else {
      const errorData = await responseProduct.json();
      alert(errorData.error);
    }
  })

</script>

<nav class="breadcrumbs black">
  <div class="container">
    <div class="nav-wrapper">
      <div class="col s12">
        <a href="/" class="breadcrumb">Home</a>
        {#if organization}
          <a href="/categories" class="breadcrumb">{organization.categoriesName}</a>
        {/if}
        {#if product && product.category}
          <a href={`/categories/${product.category.slug}`} target="_self" class="breadcrumb">{product.category.name}</a>
        {/if}
        {#if product}
          <a href={`/products/${product.stockKeepingUnit}`} target="_self" class="breadcrumb">{product.name}</a>
        {/if}
      </div>
    </div>
  </div>
</nav>

{JSON.stringify(product)}