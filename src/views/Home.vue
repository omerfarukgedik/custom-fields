<template>
  <div>
    <div class="blogs-wrapper" v-if="!loading">
      <Blog
        v-for="(blog, index) in blogs"
        :key="index + blog"
        :blog="blog"
        @deleteBlog="deleteBlog"
      />
    </div>
    <div v-else>Loading..</div>
  </div>
</template>

<script>
  import axios from "axios";
  import Blog from "@/components/Blog";

  export default {
    name: "Home",
    components: {
      Blog,
    },
    data() {
      return {
        blogs: [],
        loading: false,
      };
    },
    methods: {
      async deleteBlog(id) {
        try {
          this.loading = true;
          await axios.delete(`http://localhost:3000/blogs/${id}`);
          let findIndex = this.blogs.findIndex((b) => b.id === id);
          this.blogs.splice(findIndex, 1);

          setTimeout(() => {
            this.loading = false;
          }, 500);
        } catch (error) {
          console.error(error);
        }
      },
    },
    async created() {
      try {
        this.loading = true;
        let res = await axios.get(`http://localhost:3000/blogs`);
        this.blogs = res.data;

        setTimeout(() => {
          this.loading = false;
        }, 500);
      } catch (error) {
        console.error(error);
      }
    },
  };
</script>

<style scoped lang="scss">
  .blogs-wrapper {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    justify-content: center;
    align-items: center;
    padding: 20px 0px;
    border-radius: 10px;
  }
</style>
