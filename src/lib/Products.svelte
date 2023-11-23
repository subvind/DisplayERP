<script lang="ts">
	import { onMount } from 'svelte';

	export let category: any;
  export let organization: any;
  let limit: number = 15;
  let search: string = '';
  let products: any;
  let totalPages: number;
  let currentPage = 1;
  let type: string = 'LatestProducts'
  let formatter: any;

  function goToPage(pageNumber: number) {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      currentPage = pageNumber;
    }
    getProducts()
  }

  async function getProducts () {
    let searchParams = ''
    if (search !== '') {
      searchParams = `&search=${search}`
    }
    let typeParams = `&type=${type}`
    const response = await fetch(`https://api.subvind.com/products/categoryRelated/${category.id}?limit=${limit}&page=${currentPage}${searchParams}${typeParams}`, {
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
  }

	onMount(async() => {
    formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD', // Change this to the desired currency code
      minimumFractionDigits: 2,
    });

		let erpHostname = window.location.hostname
		if (erpHostname === 'localhost') {
			erpHostname = 'store.subvind.com'
		}

    getProducts()

    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
	})
</script>


{#if products}
  <h4>BROWSE PRODUCTS</h4>
  <nav class="grey">
    <div class="nav-wrapper">
      <form on:submit={() => getProducts()}>
        <div class="input-field">
          <input id="search" type="search" bind:value={search}>
          <label class="label-icon" for="search"><i class="material-icons">search</i></label>
          <i class="material-icons">close</i>
        </div>
      </form>
    </div>
  </nav>
  <br />
  <div class="row">
    <div class="col s6 m6">
      1-{limit} of {products.total} results.
    </div>
    <div class="col s6 m6">
      <select class="browser-default" bind:value={type} on:change={() => getProducts()}>
        <option value="LatestProducts">Latest Products</option>
        <option value="PriceLowToHigh">Price (Low to High)</option>
        <option value="PriceHighToLow">Price (High to Low)</option>
        <option value="Archive">Archive</option>
      </select>
    </div>
  </div>
  <!-- {JSON.stringify(categories)} -->
  {#if products.data.length}
    <div class="row categories">
      <div class="col s12 cards-container">
        {#each products.data as product}
          <div class="card hoverable">
            <div class="card-image">
              <div class="photo">
                {#if product.coverPhoto}
                  <img src={`https://s3.us-east-2.amazonaws.com/${organization.orgname}.${product.coverPhoto.bucket.name}/${product.coverPhoto.filename}`} alt="product">
                {:else}
                  <img src="/IMG-1258.jpg" alt="product">
                {/if}
              </div>
              {#if product.isArchive === false}
                <span class="card-title black-text">{formatter.format(product.price / 100)}</span>
              {:else}
                <span class="card-title black-text">NFS</span>
              {/if}
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
        {/each}
      </div>
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

  .photo {
    /* max-height: 200px; */
    overflow: hidden;
    display: flex;
    justify-content: center; /* Horizontally center the image */
    align-items: center; /* Vertically center the image */
  }

  .photo img {
    width: auto;
    max-width: 100%;
    object-fit: contain; /* This ensures the image maintains its aspect ratio and fits within the container */
  }

  .cards-container {
    column-break-inside: avoid;
  }
  .cards-container .card {
    display: inline-block;
    overflow: visible;
  }

  @media only screen and (max-width : 600px) {
    .cards-container {
      -webkit-column-count: 1;
      -moz-column-count: 1;
      column-count: 1;
    }
  }
  @media only screen and (min-width : 601px) {
    .cards-container {
      -webkit-column-count: 2;
      -moz-column-count: 2;
      column-count: 2;
    }
  }
  @media only screen and (min-width : 993px) {
    .cards-container {
      -webkit-column-count: 3;
      -moz-column-count: 3;
      column-count: 3;
    }
  }
</style>