<template>
  <div class="item">
    <slot name="title" />

    <input
      v-if="data.input_type === 'textbox'"
      type="text"
      :class="`${data.css_style} ${validClass}`"
      v-model="value"
      :placeholder="data.place_holder"
      :disabled="!data.active"
      @input="setValue(value)"
    />

    <select
      v-if="data.input_type === 'smart_ddl'"
      name="items"
      :class="`${data.css_style} ${validClass}`"
      id="items"
      v-model="value"
      :disabled="!data.active"
      @input="setValue($event.target.value)"
    >
      <option
        v-for="(item, index) in data.smart_ddl_items"
        :key="index"
        :value="item.id"
        :selected="data.default_value === item.id"
        >{{ item.name }}</option
      >
    </select>

    <input
      v-if="data.input_type === 'checkbox'"
      type="checkbox"
      :class="`${data.css_style} ${validClass}`"
      v-model="value"
      :disabled="!data.active"
      @change="setValue(value)"
    />

    <Datepicker
      v-if="data.input_type === 'calendar'"
      v-model="value"
      :class="`${data.css_style} ${validClass}`"
      :disabled="!data.active"
      @input="setValue(value)"
      :placeholder="data.place_holder"
    >
      <input type="text" :class="validClass" />
    </Datepicker>

    <textarea
      v-if="data.input_type === 'text'"
      type="text"
      :class="`${data.css_style} ${validClass}`"
      v-model="value"
      :placeholder="data.place_holder"
      :disabled="!data.active"
      @input="setValue(value)"
    />
  </div>
</template>

<script>
  import Datepicker from "vuejs-datepicker";

  export default {
    components: {
      Datepicker,
    },
    props: {
      data: {
        type: Object,
        required: true,
      },
    },
    computed: {
      validClass() {
        if (!this.data.is_required) {
          return "";
        } else if (
          (this.data.required && !this.value) ||
          !this.errorData.isValid
        ) {
          return "error";
        } else {
          return "success";
        }
      },
    },
    data() {
      return {
        value: this.data.default_value,
        errorData: {},
      };
    },
    methods: {
      setValue(value) {
        this.value = value;

        this.errorData = {
          id: this.data.id,
          isValid: value === "" ? false : true,
          message: value === "" ? "Field is required" : null,
        };

        if (this.data.input_type === "textbox") {
          let testIt = null;
          switch (this.data.input_validator) {
            case "Integer":
              testIt = /^([+-]?[1-9]\d*|0)$/;
              break;
            case "Decimal":
              testIt = /^[+-]?((\d+(\.\d*)?)|(\.\d+))$/;
              break;
            case "text":
              testIt = /[a-zA-Z]+/;
              break;
            default:
              testIt = null;
              break;
          }

          if (testIt) {
            this.errorData.isValid =
              value === "" ? false : true && testIt.test(value);
          }
        }

        this.$emit("setError", this.errorData);
        this.$emit("input", value);
      },
    },
    created() {
      this.setValue(this.data.default_value);
    },
  };
</script>
