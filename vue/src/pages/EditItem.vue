<template>
  <div class="item-box">
    <div class="item">
      <Input ref="inputName" :name="name"/>
    </div>
    <div class="item">
      <Textarea ref="textarea" :textareaValues="20"></Textarea>
    </div>
     <div class="item">
      <AddTag ref="tagInput" :tags="tags"/>
    </div>
    <div class="item">
      <button v-on:click="addItem">保存</button>
      <button v-on:click="goBack">返回</button>
    </div>
  </div>
</template>
<script>
import utils from "../assets/utils";
import Textarea from "../components/Textarea.vue";
import ArticeTypeSelect from "../components/ArticeTypeSelect.vue";
import Input from "../components/Input.vue";
import AddTag from "../components/AddTag.vue";

export default {
  name: "Item",
  components: { Textarea, Input, AddTag, ArticeTypeSelect },
  data() {
    return {
      name: "",
      tags: "",
      textareaValue: ""
    };
  },
  mounted: function() {
    var id = this.$route.params.id;
    this.$http.get("/api/admin/item/" + id).then(function(res) {
      var item = res.body.result;
      this.$refs.tagInput.tags = item.tags || "";
      this.$refs.inputName.name = item.name;
      this.$refs.textarea.editor.html(item.content);
    });
  },
  methods: {
    goBack: function() {
      history.back();
    },
    addItem: function() {
      //this.$emit("test");
      var name = this.$refs.inputName.getName();
      var tag = this.$refs.tagInput.getTitle();
      var content = this.$refs.textarea.getHtml();
      var tags = utils.removeArr(utils.splitTags(tag));
      var save = { name: name, content: content, tags: tags.join(",") };

      console.log(save);

      this.$http.put("/api/admin/item/" + this.$route.params.id, save).then(
        response => {
          if (response.body) {
            alert(response.body.message);
          }
        },
        response => {
          if (response.body) {
            alert(response.body.message);
          }
        }
      );

      //console.log(window.store.state.title)
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.item-box {
  width: 750px;
  margin: auto;
}
.item {
  margin: 20px 0;
}
</style>