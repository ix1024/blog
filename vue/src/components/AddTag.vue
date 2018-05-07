<template>
    <div class="">
        <input class="input" type="text" placeholder="请输入标题" @change="changeVal" v-model="tags" />
    </div>
</template>

<script>
export default {
  name: "AddTag",
  //props: ['title'],
  //mounted() {},
  data() {
    return {
      tags: ""
    };
  },
  methods: {
    getTitle: function() {
      return this.tags;
    },
    changeVal: function(ev) {
      // var value = ev.target.value;
      // window.store.commit("getInputValue", value);
      // console.log(value);
    }
  }
};
</script>
<style scoped>
.input {
  display: block;
  width: 680px;
  padding: 10px;
  border: 1px solid #ccc;
}
</style>
