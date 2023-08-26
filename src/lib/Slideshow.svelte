<script>
  import Carousel from 'svelte-carousel';
  import { browser } from '$app/environment';

  let carousel; // for calling methods of the carousel instance
  
  const handleNextClick = () => {
    carousel.goToNext()
  }
</script>

{#if browser}
  <Carousel
    bind:this={carousel}
  >
    <div class="card">
      <div class="card-image">
        <div class="banner">
          <img src="/IMG-1255.jpg" alt="logo">
        </div>
      </div>
      <div class="card-action">
        <a href="#">This is a link</a>
      </div>
    </div>
    <div class="card">
      <div class="card-image">
        <div class="banner">
          <img src="/2.jpg" alt="logo">
        </div>
      </div>
      <div class="card-action">
        <a href="#">This is a link</a>
      </div>
    </div>
    <div class="card">
      <div class="card-image">
        <div class="banner">
          <img src="/3.jpg" alt="logo">
        </div>
      </div>
      <div class="card-action">
        <a href="#">This is a link</a>
      </div>
    </div>
    <div class="card">
      <div class="card-image">
        <div class="banner">
          <img src="/4.jpg" alt="logo">
        </div>
      </div>
      <div class="card-action">
        <a href="#">This is a link</a>
      </div>
    </div>
  </Carousel>
{/if}

<!-- <button on:click={handleNextClick}>Next</button> -->

<style>
  .banner {
    max-height: 400px;
    width: 100%;
    overflow: hidden;
    display: flex;
    justify-content: center; /* Horizontally center the image */
    align-items: center; /* Vertically center the image */
  }

  .banner img {
    width: auto;
    max-width: 100%;
    object-fit: contain; /* This ensures the image maintains its aspect ratio and fits within the container */
  }

  .card-action {
    text-align: center;
  }
  .card-action a {
    /* color: #000 !important; */
    margin-right: 0 !important;
  }
</style>