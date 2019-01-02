<template>
	<div>
    <np-textarea ref="textarea" v-model="v" :options="options" @change="change"></np-textarea>
	</div>
</template>
<script>
import npTextarea from "../index.vue";
export default {
  components:{
    npTextarea
  },
	methods: {
		clear() {
			this.$refs.textarea.clear();
		},
		change(v) {
      console.log(v);
    }
	},
	data() {
		return {
			v: "",
			options: {
			  // placeholder: '请输入内容'
        maxlength: 20,
				disabled: false,
        readonly: false,
				rows: 8,
        style: "width:300px",
				lengthTip: true
			}
		};
	}
};
</script>
