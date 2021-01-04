<template>
  <div>
    <Header />

    <b-container class="p-0" style="max-width: 100%;">
      <!-- side nav -->
      <div class="bg-light sidenav">
        <ul class="text-left sidenav-nav">
          <li class="sidenav-item" @click="showHome">
            <a class="sidenav-link">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="home"
                class="svg-inline--fa fa-home fa-w-18"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M280.37 148.26L96 300.11V464a16 16 0 0 0 16 16l112.06-.29a16 16 0 0 0 15.92-16V368a16 16 0 0 1 16-16h64a16 16 0 0 1 16 16v95.64a16 16 0 0 0 16 16.05L464 480a16 16 0 0 0 16-16V300L295.67 148.26a12.19 12.19 0 0 0-15.3 0zM571.6 251.47L488 182.56V44.05a12 12 0 0 0-12-12h-56a12 12 0 0 0-12 12v72.61L318.47 43a48 48 0 0 0-61 0L4.34 251.47a12 12 0 0 0-1.6 16.9l25.5 31A12 12 0 0 0 45.15 301l235.22-193.74a12.19 12.19 0 0 1 15.3 0L530.9 301a12 12 0 0 0 16.9-1.6l25.5-31a12 12 0 0 0-1.7-16.93z"
                ></path></svg
              ><span class="link-text">Home</span></a
            >
          </li>
          <li class="sidenav-item" @click="showAdd">
            <a class="sidenav-link">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="user-plus"
                class="svg-inline--fa fa-user-plus fa-w-20"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path
                  fill="currentColor"
                  d="M624 208h-64v-64c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v64h-64c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h64v64c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-64h64c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm-400 48c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"
                ></path></svg
              ><span class="link-text">Add new orphan</span>
            </a>
          </li>
          <li class="sidenav-item" @click="showSites">
            <a class="sidenav-link">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="map-marked-alt"
                class="svg-inline--fa fa-map-marked-alt fa-w-18"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M288 0c-69.59 0-126 56.41-126 126 0 56.26 82.35 158.8 113.9 196.02 6.39 7.54 17.82 7.54 24.2 0C331.65 284.8 414 182.26 414 126 414 56.41 357.59 0 288 0zm0 168c-23.2 0-42-18.8-42-42s18.8-42 42-42 42 18.8 42 42-18.8 42-42 42zM20.12 215.95A32.006 32.006 0 0 0 0 245.66v250.32c0 11.32 11.43 19.06 21.94 14.86L160 448V214.92c-8.84-15.98-16.07-31.54-21.25-46.42L20.12 215.95zM288 359.67c-14.07 0-27.38-6.18-36.51-16.96-19.66-23.2-40.57-49.62-59.49-76.72v182l192 64V266c-18.92 27.09-39.82 53.52-59.49 76.72-9.13 10.77-22.44 16.95-36.51 16.95zm266.06-198.51L416 224v288l139.88-55.95A31.996 31.996 0 0 0 576 426.34V176.02c0-11.32-11.43-19.06-21.94-14.86z"
                ></path></svg
              ><span class="link-text">View Sites</span>
            </a>
          </li>
          <li class="sidenav-item" @click="showSocialWorkers">
            <a class="sidenav-link">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="users"
                class="svg-inline--fa fa-users fa-w-20"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 512"
              >
                <path
                  fill="currentColor"
                  d="M96 224c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm448 0c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm32 32h-64c-17.6 0-33.5 7.1-45.1 18.6 40.3 22.1 68.9 62 75.1 109.4h66c17.7 0 32-14.3 32-32v-32c0-35.3-28.7-64-64-64zm-256 0c61.9 0 112-50.1 112-112S381.9 32 320 32 208 82.1 208 144s50.1 112 112 112zm76.8 32h-8.3c-20.8 10-43.9 16-68.5 16s-47.6-6-68.5-16h-8.3C179.6 288 128 339.6 128 403.2V432c0 26.5 21.5 48 48 48h288c26.5 0 48-21.5 48-48v-28.8c0-63.6-51.6-115.2-115.2-115.2zm-223.7-13.4C161.5 263.1 145.6 256 128 256H64c-35.3 0-64 28.7-64 64v32c0 17.7 14.3 32 32 32h65.9c6.3-47.4 34.9-87.3 75.2-109.4z"
                ></path></svg
              ><span class="link-text">View Social-workers</span>
            </a>
          </li>
          <li class="sidenav-item exit">
            <a class="sidenav-link">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="angle-double-right"
                class="svg-inline--fa fa-angle-double-right fa-w-14"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34zm192-34l-136-136c-9.4-9.4-24.6-9.4-33.9 0l-22.6 22.6c-9.4 9.4-9.4 24.6 0 33.9l96.4 96.4-96.4 96.4c-9.4 9.4-9.4 24.6 0 33.9l22.6 22.6c9.4 9.4 24.6 9.4 33.9 0l136-136c9.4-9.2 9.4-24.4 0-33.8z"
                ></path></svg
              ><span class="link-text">Hide</span>
            </a>
          </li>
        </ul>
      </div>
      <!-- main content -->
      <div class="mt-1 main">
        <AddOrphan v-if="Add" />
        <OrphanList v-if="home" />
        <DUMMY_siteList v-if="sites" />
        <DUMMY_socialWorkerList v-if="socialWorkers" />
        <!-- <SocialWorkerList v-if="socialWorkers" /> -->
      </div>
    </b-container>
  </div>
</template>

<script>
import Header from "@/components/Header";
import AddOrphan from "@/components/AddOrphan";
import OrphanList from "@/components/OrphanList";
import DUMMY_socialWorkerList from "@/components/DUMMY_socialWorkerList";
// import SocialWorkerList from "@/components/SocialWorkerList";
import DUMMY_siteList from "@/components/DUMMY_siteList";
export default {
  data() {
    return {
      Add: false,
      home: true,
      sites: false,
      socialWorkers: false
    };
  },
  components: {
    Header,
    AddOrphan,
    OrphanList,
    DUMMY_socialWorkerList,
    // SocialWorkerList,
    DUMMY_siteList
  },
  methods: {
    showAdd: function() {
      this.Add = true;
      this.home = false;
      this.sites = false;
      this.socialWorkers = false;
    },
    showHome: function() {
      this.Add = false;
      this.home = true;
      this.sites = false;
      this.socialWorkers = false;
    },
    showSites: function() {
      this.Add = false;
      this.home = false;
      this.sites = true;
      this.socialWorkers = false;
    },
    showSocialWorkers: function() {
      this.Add = false;
      this.home = false;
      this.sites = false;
      this.socialWorkers = true;
    }
  }
};
</script>

<style scoped>
.main {
  margin-left: 5rem;
  padding: 0 1em;
}

.sidenav {
  position: fixed;
  padding: 0;
  margin: 0;
  z-index: 3;
}

.sidenav-nav {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 0 0.5rem 0.5rem 0;
  background-color: #343a40;
}

ul :first-child {
  border-radius: 0 0.5rem 0 0;
}

ul :last-child {
  border-radius: 0 0 0.5rem 0;
}
.exit {
  margin-top: 30.5rem;
  background-color: #1491ff;
}

.exit svg {
  transform: rotate(0deg);
  transition: transform 600ms;
}

.sidenav:hover .exit svg {
  transform: rotate(-180deg);
  color: #111;
}

.sidenav:hover .exit {
  background-color: tomato !important;
}

.sidenav-item {
  width: 100%;
}

.sidenav-item:hover {
  background-color: #6c757d;
}

.sidenav-link {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 5rem;
  color: aliceblue;
  text-decoration: none;
}

.sidenav-link svg {
  min-width: 2rem;
  margin: 0 1.5rem;
}

.link-text {
  display: none;
  margin-left: 1rem;
}

/* small screens */
@media only screen and (max-width: 600px) {
  .main {
    margin-left: 0rem;
  }

  .sidenav {
    bottom: 0%;
    width: 100vw;
    height: 5rem;
    border-radius: 0;
  }

  .sidenav-nav {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 0;
  }

  .sidenav-link {
    justify-self: center;
  }

  .sidenav-link svg {
    margin-bottom: 600%;
  }

  ul :first-child {
    border-radius: 0;
  }

  ul :last-child {
    border-radius: 0;
  }

  .sidenav-item .exit {
    margin: 0;
    display: none;
  }

  .exit svg {
    margin: 0;
    display: none;
  }
}

/* large screens */
@media only screen and (min-width: 600px) {
  .sidenav {
    width: 5rem;
    height: 100vh;
  }

  .sidenav:hover {
    width: 16rem;
    transition: width 0.45s ease;
  }

  .sidenav:hover .link-text {
    display: inline;
  }
}
</style>
