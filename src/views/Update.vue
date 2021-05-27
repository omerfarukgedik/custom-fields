<template>
  <div>
    <div v-if="!loading">
      <form @submit.prevent="submit">
        <div
          class="form-group"
          v-for="(field, index) in custom_fields"
          :key="index"
        >
          <CustomField
            :value="field.default_value"
            :data="field"
            v-model="field.default_value"
            @setError="setError"
          >
            <template v-slot:title>
              <div class="header">
                <div>
                  <label>{{ field.name }}</label>
                  <img
                    v-tooltip.right="{
                      content: field.description,
                      offset: 10,
                      delay: { show: 100, hide: 100 },
                    }"
                    src="/information.png"
                    alt="info"
                  />
                </div>
                <!-- <div class="error_msg" v-if="errors[4].message">
                {{ findErrorMessage(field.id) }}
              </div> -->
              </div>
            </template>
          </CustomField>
        </div>

        <button class="button" type="submit">
          Save!
        </button>
      </form>
    </div>

    <div v-else>Loading..</div>
  </div>
</template>

<script>
  import axios from "axios";
  import CustomField from "@/components/CustomField";

  export default {
    name: "Update",
    components: {
      CustomField,
    },
    data() {
      return {
        custom_fields: [],
        errors: [],
        loading: false,
        blog: {},
      };
    },
    methods: {
      async submit() {
        let isFormValid = this.errors.every((e) => e.isValid === true);
        if (isFormValid) {
          this.loading = true;

          const mappedArray = this.custom_fields.map((item) => {
            return [`cf_${item.id}`, item.default_value];
          });

          const request = {
            id: this.blog.id,
            photo: this.blog.photo,
          };

          for (let item of mappedArray) {
            request[item[0]] = item[1];
          }

          await axios.put(
            `http://localhost:3000/blogs/${this.blog.id}`,
            request,
          );

          setTimeout(() => {
            this.loading = false;
          }, 500);
        }
      },
      findErrorMessage(id) {
        let findIndex = this.errors.findIndex((i) => i.id === id);
        return this.errors[findIndex].message;
      },
      setError(data) {
        let findIndex = this.errors.findIndex((i) => i.id === data.id);
        this.errors[findIndex] = data;
      },
    },
    async created() {
      try {
        this.loading = true;
        let res = await axios.get(
          `http://localhost:3000/blogs/${this.$route.params.id}`,
        );

        this.blog = res.data;

        this.custom_fields = [];
        let fields = [];
        Object.keys(this.blog).forEach((key) => {
          if (key.startsWith("cf_")) fields.push(key);
        });

        for (let field of fields) {
          let resp = await axios.get(
            `http://localhost:3000/custom_fields?id=${field.split("_")[1]}`,
          );

          this.custom_fields.push({
            ...resp.data[0],
            default_value: this.blog[field],
          });
        }

        this.errors = this.custom_fields.map((field) => {
          return {
            id: field.id,
            isValid: false,
            message: null,
          };
        });

        setTimeout(() => {
          this.loading = false;
        }, 500);
      } catch (error) {
        this.$router.push("/404");
        console.error(error);
      }
    },
  };
</script>

<style scoped lang="scss">
  form {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem 1rem;

    .form-group {
      display: flex;
      flex-direction: column;

      .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
        label {
          font-size: 0.9rem;
          margin-right: 10px;
        }
        img {
          width: 12px;
          height: 12px;
        }
        .error_msg {
          font-size: 0.6rem;
          color: white;
          float: right;
          background: #2c3e50;
          border-radius: 2px;
          padding: 0 2px;
        }
      }
    }

    button {
      background-color: #2c3e50;
      color: white;
      width: 100px;
      height: 30px;
      align-self: end;
      justify-self: end;
      border: none;
      cursor: pointer;
      text-transform: uppercase;
      font-weight: bold;
      border-radius: 5px;
      letter-spacing: 0.1rem;
      transition: background-color 0.2s ease-in-out;

      &:hover {
        background-color: darkcyan;
      }
    }
  }
</style>
