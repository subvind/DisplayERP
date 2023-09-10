<script lang="ts">
  import { onMount } from "svelte";
  
  import PhotoSwipeLightbox from 'photoswipe/lightbox';
  import 'photoswipe/style.css';

  export let data: any;
  let organization: any;
  let product: any;
  let galleryID: string = 'product_images';
  let images: any = null;
  let formatter: any;
  
	onMount(async() => {
    formatter = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD', // Change this to the desired currency code
      minimumFractionDigits: 2,
    });

		let hostname = window.location.hostname
		if (hostname === 'localhost') {
			hostname = 'store.subvind.com'
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

    const responseProduct = await fetch(`https://api.subvind.com/products/sku/${data.productId}/${organization.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    });

    if (responseProduct.ok) {
      product = await responseProduct.json();
      console.log('product', product)
      if (product.bucket) {
        images = [];
        product.bucket.files.forEach((image: any) => {
          images.push({
            largeURL: `https://s3.us-east-2.amazonaws.com/${organization.orgname}.${product.bucket.name}/${image.filename}`,
            thumbnailURL: `https://s3.us-east-2.amazonaws.com/${organization.orgname}.${product.bucket.name}/${image.filename}`,
            width: image.width,
            height: image.height,
          })
        })
      }
      console.log('images', images)
    } else {
      const errorData = await responseProduct.json();
      alert(errorData.error);
    }

    setTimeout(() => {
      let lightbox = new PhotoSwipeLightbox({
        gallery: '#' + galleryID,
        children: 'a',
        pswpModule: () => import('photoswipe'),
      });
      lightbox.init();
    }, 0)
  })
</script>

<svelte:head>
  {#if product && organization}
    <title>{product.name} - {product.category.name} - {organization.displayName}</title> 
    <meta name="description" content={product.description} />
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
        {#if product && product.category}
          <a href={`/categories/${product.category.slug}`} class="breadcrumb">{product.category.name}</a>
        {/if}
        {#if product}
          <a href={`/products/${product.stockKeepingUnit}`} target="_self" class="breadcrumb">{product.name}</a>
        {/if}
      </div>
    </div>
  </div>
</nav>

<br />

<div class="container">
  <div class="row categories">
    <div class="col s12 m6 l4">
      {#if product}
        <div class="card hoverable">
          <div class="card-image">
            <div class="category">
              {#if product && product.coverPhoto}
                <img src={`https://s3.us-east-2.amazonaws.com/${organization.orgname}.${product.coverPhoto.bucket.name}/${product.coverPhoto.filename}`} alt="">
              {:else}
                <img src="/IMG-1258.jpg" alt="">
              {/if}
            </div>
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
        {#if product.isArchive === false}
          <div class="card hoverable">
            <div class="card-content">
              <span class="card-title">
                Price: <span class="right">{formatter.format(product.price / 100)}</span><br />
                Shipping: <span class="right">{formatter.format(product.shippingCost / 100)}</span><br />
                <hr>
                Totoal: <span class="right">{formatter.format((product.price + product.shippingCost) / 100)}</span>
              </span>
            </div>
            {#if product.ebayItem}
              <div class="card-action">
                <a href={`https://www.ebay.com/itm/${product.ebayItem}`} target="_blank" class="btn grey darken-2" style="width: 100%;">for sale at ebay</a>
              </div>
            {/if}
          </div>
        {/if}
      {/if}
    </div>
    <div class="col s12 m6 l8">
      {#if images}
        <div class="pswp-gallery" id={galleryID}>
          {#each images as image}
            <a
              href={image.largeURL}
              data-pswp-width={image.width}
              data-pswp-height={image.height}
              target="_blank"
              rel="noreferrer"
            >
              <img src={image.thumbnailURL} alt="" style="max-width: 100px;" />
            </a>
          {/each}
        </div>
      {/if}
      {#if product}
        <p>{product.detail || ''}</p>
      {/if}
    </div>
  </div>
</div>
