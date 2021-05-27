<template>
  <div class="blog">
    <div>
      <img :src="blog.photo" :alt="blog.id" />
      <div class="blog_title">
        {{ blog.cf_6099a2aea0d0960004268fd8 }}
        <span>
          {{
            new Date(blog.cf_6099a52ca0d0960004269ca7)
              .toLocaleString()
              .split(" ")[0]
          }}
        </span>
      </div>
      <div class="description">{{ blog.cf_6099a538a0d0960004269e98 }}</div>
    </div>

    <div class="footer">
      <span
        :style="{
          color: blog.cf_6099a511a0d0960004269ab6 ? 'green' : 'red',
        }"
      >
        {{
          blog.cf_6099a511a0d0960004269ab6
            ? "Allow comments"
            : "Disallow comments"
        }}</span
      >

      <div style="display: flex; align-items: center">
        <img
          @click="$router.push(`/update/${blog.id}`)"
          src="/edit.png"
          alt="edit"
        />

        <img
          @click="$emit('deleteBlog', blog.id)"
          src="/trash.png"
          alt="trash"
        />
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      blog: {
        type: Object,
        required: true,
      },
    },
  };
</script>

<style scoped lang="scss">
  .blog {
    width: 240px;
    height: 270px;
    border: 1px solid #ddd;
    border-radius: 5px;
    user-select: none;
    transition: box-shadow 0.2s ease-in-out;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-y: auto;

    &:hover {
      -webkit-box-shadow: 0px 3px 24px -11px rgba(0, 0, 0, 0.48);
      box-shadow: 0px 3px 24px -11px rgba(0, 0, 0, 0.48);
    }

    .blog_title {
      margin: 0;
      font-size: 0.7rem;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      padding: 10px 10px 3px 10px;
      border-bottom: 1px solid #ddd;

      span {
        font-size: 0.6rem;
        font-weight: normal;
      }
    }

    .description {
      padding: 10px 10px 0 10px;
      font-size: 0.7rem;
      overflow-y: auto;
      height: 90px;
    }

    .footer {
      padding: 3px 10px;
      font-size: 0.8rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #ddd;

      span {
        font-size: 0.6rem;
      }

      img {
        margin-left: 5px;
        cursor: pointer;
      }
    }
  }
</style>
