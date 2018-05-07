<template>
    <div class="">
        <input class="input" type="text" placeholder="请输入标题" @change="changeVal" v-model="name" />
    </div>
</template>

<script>
export default {
  name: 'Input',
  //props: ["name"],
  //mounted() {},
  data() {
    return {
      name: ''
    };
  },
  methods: {
    getName: function() {
      return this.name;
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
