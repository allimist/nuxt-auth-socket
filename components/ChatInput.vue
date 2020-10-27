<template>
  <div class="row">
    <div class="col-md-10 col-8">
<!--      <b-form-input-->
      <input
        v-model="inputMsg"
        @keyup.enter="$emit('sendMsg')"
        type="text"
        style="background-color: #ccc"
      />
    </div>
    <div class="col-md0 col-1">
      <button @click="$emit('sendMsg')" type="button">Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: () => ''
    }
  },
  computed: {
    inputMsg: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>
