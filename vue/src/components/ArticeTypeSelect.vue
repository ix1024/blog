<template>
    <div class="">        
        <select name="" id="" v-model="value">
                <option value="">请选择</option>
               <option v-for="item in list" :value="item.value" :selected="item.selected">{{item.text}}</option>
         </select>
    </div>
</template>

<script>
export default {
  name: "Select",
  //props: ["title"],
  //mounted() {},
  data() {
    return {
      value: '',
      list: [
        {
          value: "1",
          text: "HTML",
          selected: false
        },
        {
          value: "2",
          text: "CSS",
          selected: false
        },
        {
          value: "3",
          text: "Javascript",
          selected: false
        }
      ]
    };
  },
  methods: {
    getTitle: function() {
      return this.title;
    },
    changeVal: function(ev) {
      // var value = ev.target.value;
      // window.store.commit("getInputValue", value);
      // console.log(value);
    }
  }
};
</script>
<style>
select {
  display: block;
  width: 700px;
  padding: 10px;
  border: 1px solid #ccc;
}
</style>
