<script lang="ts">
	import { onMount } from 'svelte';

	export let category: any;
  let limit: number = 2;
  let search: string;
  let products: any;
  let totalPages: number;

  let currentPage = 1;

  function goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      currentPage = pageNumber;
    }
  }

	onMount(async() => {
		let hostname = window.location.hostname
		if (hostname === 'localhost') {
			hostname = 'store.subvind.com'
		}
    const response = await fetch(`https://backend.subvind.com/products/categoryRelated/${category.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (response.ok) {
      products = await response.json();
      totalPages = Math.ceil(products.total / limit);

      setTimeout(() => {
        let elms = document.querySelectorAll('.tabs')
        var instance = M.Tabs.init(elms, {});
      }, 0)
    } else {
      const errorData = await response.json();
      alert(errorData.error);
    }

    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
	})
</script>


{#if products}
  <h4>BROWSE PRODUCTS</h4>
  <nav class="grey">
    <div class="nav-wrapper">
      <form>
        <div class="input-field">
          <input id="search" type="search" required bind:value={search}>
          <label class="label-icon" for="search"><i class="material-icons">search</i></label>
          <i class="material-icons">close</i>
        </div>
      </form>
    </div>
  </nav>
  <br />
  <div class="row">
    <div class="col s6 m6">
      1-15 of {products.total} results.
    </div>
    <div class="col s6 m6">
      <select class="browser-default">
        <option value="1" selected>Latest Products</option>
        <option value="2">Price (Low to High)</option>
        <option value="3">Price (High to Low)</option>
        <option value="4">Archive</option>
      </select>
    </div>
  </div>
  <!-- {JSON.stringify(categories)} -->
  {#if products.data.length}
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
    <div class="pagination">
      <li class="disabled">
        <button class="btn-flat" on:click={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
          <i class="material-icons">chevron_left</i>
        </button>
      </li>
      {#each Array.from({ length: totalPages }, (_, i) => i + 1) as page}
        <li>
          <button 
            class="btn-flat waves-effect"
            class:active-page-number={currentPage === page}
            on:click={() => goToPage(page)}>
            {page}
          </button>
        </li>
      {/each}
      <li>
        <button class="btn-flat" on:click={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
          <i class="material-icons">chevron_right</i>
        </button>
      </li>
    </div>
  {:else}
    <div class="card">
      <div class="card-content">
        <p>There are no results to show.</p>
      </div>
    </div>
  {/if}
  <br />
{/if}

<style>
  .active-page-number {
    background: #000;
    color: #fff;
  }

  .categories {
    width: 100%;
  }

  .card-action a {
    color: #000 !important;
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