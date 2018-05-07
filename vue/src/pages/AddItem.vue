<template>
  <div class="item-box">
    <div class="item">
      <Input ref="nameInput" :name="name"/>
    </div>
    <div class="item">
      <Textarea ref="textarea" :textareaValues="20"></Textarea>
    </div>
     <div class="item">
      <AddTag ref="tagInput" :tags="tags"/>
    </div>
    <div class="item">
      <button v-on:click="addItem">添加</button>
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
  methods: {
    addItem: function() {
      //this.$emit("test");
      var name = this.$refs.nameInput.getName();
      var tag = this.$refs.tagInput.getTitle();
      var content = this.$refs.textarea.getHtml();
      var tags = utils.removeArr(utils.splitTags(tag));
      var save = { name: name, content: content, tags: tags.join(",") };

      console.log(save);

      this.$http.post("/api/admin/item", save).then(
        response => {
          if (response.body) {
            utils.toast(response.body.message);
            if (response.body.success) {
              this.$refs.nameInput.name = "";
              this.$refs.tagInput.tags = "";
              this.$refs.textarea.editor.html("");
            }
          }
        },
        response => {
          if (response.body) {
            utils.toast(response.body.message);
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