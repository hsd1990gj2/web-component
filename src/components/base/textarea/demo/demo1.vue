<template>
	<div>
		<!--<np-button @click="clear">CLEAR</np-button>-->
		<!--<np-textarea ref="textarea" v-model="v" :options="options" @change="change"></np-textarea>-->
		<!--{{v}}-->

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
			// this.$refs.textarea.clear();
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
				// disabled: true,
				// rows: 8,
				// lengthTip: true
			}
		};
	}
};
</script>
