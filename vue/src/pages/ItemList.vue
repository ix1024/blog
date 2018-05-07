<template>
  <table class="">
      <thead>
          <tr>
              <td>title</td>
              <td>content</td>
              <td>缩略图</td>
              <td>操作</td>
          </tr>
      </thead>
      <tbody>
          <tr v-for="items in list">
              <td>{{items.name}}</td>
              <td>{{items.content}}</td>
              <td></td>
              <td>
                  <router-link :to="'/item/'+items._id">编辑</router-link>
                  <a href="javascript:;" :data-id="items._id" @click="del">删除</a>
                  </td>
          </tr>
      </tbody>
  </table>
</template>
<script>
import Vue from "vue";
export default {
  data() {
    return { list: [{ title: "", content: "asdfasf" }] };
  },
  mounted() {
    this.$http.get("/api/admin/item", {}).then(function(res) {
      this.list = res.body;
    });
  },
  methods: {
    del: function(ev) {
      this.$http
        .delete("/api/admin/item/" + ev.target.dataset.id)
        .then(function(res) {
          this.$http.get("/api/admin/item", {}).then(function(res) {
            this.list = res.body;
          });
        });
    }
  }
};
</script>
<style scoped>
table {
  width: 100%;
}
td,
th {
  padding: 5px;
  border: 1px solid #ccc;
}
</style>
