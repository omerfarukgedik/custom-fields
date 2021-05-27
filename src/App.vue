<template>
  <div class="wrapper">
    <div class="home">
      <div class="title">
        {{ $route.name }}
      </div>

      <div class="content">
        <router-view />
      </div>

      <router-link v-if="$route.name === 'home'" to="/create" class="create_new"
        >+ create new blog</router-link
      >

      <router-link v-else to="/" class="create_new">-> go home</router-link>
    </div>
  </div>
</template>

<style lang="scss">
  @import url("https://fonts.googleapis.com/css2?family=Nunito:wght@200&display=swap");
  body {
    margin: 0;
    background: #2c3e50;
    display: flex;
    justify-content: center;
    font-size: 1rem;
    height: 100vh;
    align-items: center;

    html::-webkit-scrollbar {
      display: none;
    }

    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;

    ::-webkit-scrollbar {
      width: 3px;
    }
    /* Track */
    ::-webkit-scrollbar-track {
      background: #ddd;
    }
    /* Handle */
    ::-webkit-scrollbar-thumb {
      background: #2c3e50;
      border-radius: 20px;
    }

    a {
      text-decoration: none;
    }

    a:visited {
      color: transparent;
    }

    .wrapper {
      font-family: "Nunito", Avenir, Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      width: 70vw;
      height: 80vh;
      overflow: auto;
      .home {
        border: 1px solid #ddd;
        background: white;
        padding: 1rem 1rem 0 1rem;
        border-radius: 10px;
        border: 5px solid #dfdfdf;
        position: relative;
        height: 96%;

        .title {
          font-weight: bold;
          font-size: 1.2rem;
          border-bottom: 2px solid #2c3e50;
          padding-bottom: 0.2rem;
          color: #2c3e50;
          width: 140px;
          text-transform: capitalize;
        }

        .content {
          padding: 1rem 0;
        }
      }

      .create_new {
        position: absolute;
        right: 20px;
        top: 20px;
        background: #a9f1df;
        color: black;
        padding: 3px 6px;
        font-size: 0.8rem;
        user-select: none;
        cursor: pointer;
        border-radius: 5px;
        transition: all 0.2s ease-in-out;

        &:hover {
          background: #1eae98;
          color: white;
        }
      }
    }
  }

  .item {
    display: flex;
    flex-direction: column;

    textarea {
      resize: none;
      height: 50px;
    }

    input,
    select,
    textarea {
      padding: 10px;
      border: 1px solid #dfdfdf;
      border-radius: 3px;
      outline-color: #dfdfdf;
    }
  }

  .error {
    outline-color: red !important;
    border: 1px solid red !important;
  }

  .success {
    outline-color: green !important;
    border: 1px solid green !important;
  }

  .vdp-datepicker {
    input {
      width: 100%;
    }
  }

  .tooltip {
    display: block !important;
    z-index: 10000;

    .tooltip-inner {
      background: #ddd;
      color: white;
      border-radius: 5px;
      padding: 5px 10px;
      font-size: 0.7rem;
      color: #000;
      border: 1px solid #000;
    }

    .tooltip-arrow {
      width: 0;
      height: 0;
      border-style: solid;
      position: absolute;
      margin: 5px;
      border-color: #000;
      z-index: 1;
    }

    &[x-placement^="top"] {
      margin-bottom: 5px;

      .tooltip-arrow {
        border-width: 5px 5px 0 5px;
        border-left-color: transparent !important;
        border-right-color: transparent !important;
        border-bottom-color: transparent !important;
        bottom: -5px;
        left: calc(50% - 5px);
        margin-top: 0;
        margin-bottom: 0;
      }
    }

    &[x-placement^="bottom"] {
      margin-top: 5px;

      .tooltip-arrow {
        border-width: 0 5px 5px 5px;
        border-left-color: transparent !important;
        border-right-color: transparent !important;
        border-top-color: transparent !important;
        top: -5px;
        left: calc(50% - 5px);
        margin-top: 0;
        margin-bottom: 0;
      }
    }

    &[x-placement^="right"] {
      margin-left: 5px;

      .tooltip-arrow {
        border-width: 5px 5px 5px 0;
        border-left-color: transparent !important;
        border-top-color: transparent !important;
        border-bottom-color: transparent !important;
        left: -5px;
        top: calc(50% - 5px);
        margin-left: 0;
        margin-right: 0;
      }
    }

    &[x-placement^="left"] {
      margin-right: 5px;

      .tooltip-arrow {
        border-width: 5px 0 5px 5px;
        border-top-color: transparent !important;
        border-right-color: transparent !important;
        border-bottom-color: transparent !important;
        right: -5px;
        top: calc(50% - 5px);
        margin-left: 0;
        margin-right: 0;
      }
    }

    &.popover {
      $color: #f9f9f9;

      .popover-inner {
        background: $color;
        color: black;
        padding: 24px;
        border-radius: 5px;
        box-shadow: 0 5px 30px rgba(black, 0.1);
      }

      .popover-arrow {
        border-color: $color;
      }
    }

    &[aria-hidden="true"] {
      visibility: hidden;
      opacity: 0;
      transition: opacity 0.15s, visibility 0.15s;
    }

    &[aria-hidden="false"] {
      visibility: visible;
      opacity: 1;
      transition: opacity 0.15s;
    }
  }
</style>
