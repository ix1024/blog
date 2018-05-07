<template>
    <div>
        <textarea name="editor" id="editor" cols="30" rows="10" v-model="textareaValue">{{textareaValue}}</textarea>
    </div>
</template>

<script>
export default {
  name: "Textarea",
  props: ["textareaValues"],
  mounted() {
    this.textareaValue = this.textareaValues;
    this.editor = KindEditor.create("#editor", {
      width: 700,
      height: 450
    });
    window.editor = this.editor;
  },
  data() {
    return {
      textareaValue: ""
    };
  },
  watch: {
    textareaValue: function() {
      //console.log('asdfasdf');
    }
  },
  methods: {
    setHtml: function() {
      
    },
    getHtml: function() {
      var html = this.editor.html();
      return html;
    }
  }
};
</script>
<style>

</style>
