<script lang="ts">
	import { onMount } from 'svelte';

	export let organization: any;
  let products: any;

	onMount(async() => {
		let hostname = window.location.hostname
		if (hostname === 'localhost') {
			hostname = 'store.subvind.com'
		}
    const response = await fetch(`https://backend.subvind.com/products/latestOrgRelated/${organization.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      products = await response.json();

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


{#if products}
  <h4>LATEST PRODUCTS</h4>
  <!-- {JSON.stringify(categories)} -->
  <div class="row categories">
    {#each products.data as product}
      <div class="col s12 m6 l4">
        <div class="card hoverable">
          <div class="card-image">
            <div class="category">
              <img src="/IMG-1258.jpg" alt="logo">
            </div>
            <span class="card-title black-text">$15</span>
          </div>
          {#if product.description}
            <div class="card-content">
              <p>{product.description}</p>
            </div>
          {/if}
          <div class="card-action">
            <a href={`/products/${product.stockKeepingUnit}`}>{product.name}</a>
          </div>
        </div>
      </div>
    {/each}
  </div>
{/if}

<style>
  .categories {
    width: 100%;
  }

  .category {
    /* max-height: 200px; */
    overflow: hidden;
    display: flex;
    justify-content: center; /* Horizontally center the image */
    align-items: center; /* Vertically center the image */
  }

  .category img {
    width: auto;
    max-width: 100%;
    object-fit: contain; /* This ensures the image maintains its aspect ratio and fits within the container */
  }
</style>