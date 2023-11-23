<script lang="ts">
	import { onMount } from 'svelte';

	export let organization: any;
  let products: any;
  let formatter: any;

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
    const response = await fetch(`https://api.subvind.com/products/latestOrgRelated/${organization.id}`, {
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
  {#if products.data.length}
    <h4>LATEST PRODUCTS</h4>
  {/if}
  <!-- {JSON.stringify(categories)} -->
  <div class="row categories">
    <div class="col s12 cards-container">
      {#each products.data as product}
        <div class="card hoverable">
          <div class="card-image">
            <div class="photo">
              {#if product.coverPhoto}
                <img src={`https://s3.us-east-2.amazonaws.com/${organization.orgname}.${product.coverPhoto.bucket.name}/${product.coverPhoto.filename}`} alt="product">
              {:else}
                <img src="/placeholder.png" alt="product">
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
{/if}

<style>
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