<template>
  <div  class="xui-textarea xui-textarea-style" :style="options.style">
    <textarea v-model="widgetValue" :placeholder="cplaceholder" :maxlength="cmaxlength" :disabled="cdisabled" :readonly="creadonly" :rows="safeOptions.rows"
              :class="[cdisabled?'disabled':'']"></textarea>
    <div v-if="cmaxlength&&options.lengthTip" style="padding:2px;font-size:14px;color:#ababab;text-align:right;">
        {{inputlength}}&nbsp;/&nbsp;{{cmaxlength}}
    </div>
  </div>
</template>
<script>
export default {
	model: {
		prop: "value",
		event: "change"
	},
	props: {
		options: {
			type: Object
		},
		placeholder: {},
    maxlength: {},
    disabled: {},
		readonly: {},
		value: {}
	},
	data() {
		return {
			widgetValue: this.value
		};
	},
	computed: {
		safeOptions() {
			return this.options || {};
		},
		inputlength() {
			return (this.value && this.value.length) || 0;
		},
		creadonly() {
			return this.readonly || this.safeOptions.readonly;
		},
		cdisabled() {
			return this.disabled || this.safeOptions.disabled;
		},
		cplaceholder() {
			return this.placeholder || this.safeOptions.placeholder;
		},
		cmaxlength() {
			return this.maxlength || this.safeOptions.maxlength;
		}
	},
	methods: {
		clear() {
			this.widgetValue = "";
		}
	},
	watch: {
		widgetValue(v) {    //子组件textarea修改往外抛一个修改值
			this.$emit("change", v);
		},
		value(v) {  //父组件修改改变子组件的值
			this.widgetValue = v;
		}
	}
};
</script>
<style lang="scss">
.xui-textarea {
	textarea {
		border: 1px solid #dddee1;
		width: 100%;
		font-family: 微软雅黑;
		outline: none;
		box-sizing: border-box;
    &.disabled{
      cursor: not-allowed;
    }
	}
  textarea::-webkit-input-placeholder {
    color: #bbbec4;
  }
}
</style>
