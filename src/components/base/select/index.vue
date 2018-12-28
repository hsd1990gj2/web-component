<template>
	<!--<div ref="reference" :class="['xui-select xui-select-style',cmultiple?'multiple':'',cdisabled?'disabled':'',notEmpty?'not-empty':'',cclearable?'cclearable':'']" :style="safeOptions.style">-->
		<!--<div class="xui-select-inputwrap" tabindex="0" @keydown.stop.prevent="keydown" @click="toggleDropdown">-->
			<!--<div class="xui-single-text" v-if="!cmultiple" v-show="notEmpty&&!searching" v-html="text(widgetValue)"></div>-->
			<!--<div class="xui-select-placeholder" v-show="!notEmpty&&!searching">{{cplaceholder}}</div>-->
			<!--<div v-if="cmultiple" class="xui-select-tags">-->
				<!--<div v-for="(v,index) in widgetValue" :key="index">-->
					<!--<span v-html="text(v)"></span>-->
					<!--<i class="xui-icon xui-icon-close" @click.stop="selectItem(v,null,true)"></i>-->
				<!--</div>-->
			<!--</div>-->
			<!--<input v-if="filterable" v-show="searching" ref="search" class="xui-select-search" placeholder="请输入" @keydown.stop="keydown" v-model="searchKeyword" @focus="searching=true" @input="filterMethod" @click.stop="toggleDropdown(true)" type="text">-->
			<!--<i v-if="cclearable&&notEmpty" class="select-clear-icon xui-icon xui-icon-delete_fill" @click.stop="clear"></i>-->
			<!--<i :class="['select-trigger-icon xui-icon xui-icon-unfold',showDropdown?'active':'']"></i>-->
		<!--</div>-->
		<!--<select-picker ref="picker" :fixed="true" :class="['xui-select-picker',cmultiple?'multiple':'',cdisabled?'disabled':'',notEmpty?'not-empty':'',cclearable?'cclearable':'']" @visible="pickerVisible">-->
			<!--<ul ref="dropdown" class="xui-select-dropdown" :style="'min-width:'+pickerWidth+'px'">-->
				<!--<li ref="options" :class="['xui-select-option',notEmpty&&(item.value===widgetValue||widgetValue.indexOf(item.value)>=0)?'active':'',disabledOptions(item)?'disabled':'',hoverSelectItem==item?'hover':'']" v-for="(item,index) in filterItems||items" :key="index" v-html="item.text" @click.stop="selectItem(item.value,item)"></li>-->
			<!--</ul>-->
		<!--</select-picker>-->
	<!--</div>-->

  <!--1.先渲染一个input框，初始没有值的时候显示提示，然后点击下拉事件，渲染出来一个下来框组件。-->
  <!--2.下拉组件渲染预制好的选项值展示列表，选择某一项时映射值给input框，并标记选中样式。-->
  <!--3.input框根据选中值对比映射出具体的显示文本名称-->
  <!--4.根据select-picker抛出的事件，监听显示下拉箭头的样式-->
  <div ref="reference" :class="['xui-select xui-select-style',cdisabled?'disabled':'',cclearable&&notEmpty?'clearable':'']" :style="'min-width:'+cpickerWidth+'px'">
    <div class="xui-select-inputwrap" @click.stop="toggleDropdown">
      <div v-show="notEmpty" v-html="text(widgetValue)"></div>
      <div class="xui-select-placeholder" v-show="!notEmpty">{{cplaceholder}}</div>
      <i v-if="cclearable&&notEmpty" :class="['iconfont icon-close','select-clear-icon']" @click.stop="clear"></i>
      <i :class="['iconfont icon-down','select-trigger-icon',showDropdown?'active':'']"></i>
    </div>
    <select-picker ref="picker" :class="['xui-select-picker']"  @visible="pickerVisible">
      <ul ref="dropdown" class="xui-select-dropdown" :style="'min-width:'+cpickerWidth+'px'">
        <li v-for="(item,index) in items" :key="index" v-html="item.text" @click.stop="selectItem(item.value,item)"
            :class="['xui-select-option',widgetValue==item.value?'active':'',item.disabled?'disabled':'']">
        </li>
      </ul>
    </select-picker>
  </div>

</template>
<script>
import selectPicker from "../picker/index.vue";
export default {
	components: {
		selectPicker
	},
	model: {
		prop: "value",
		event: "input"
	},
	props: {
		options: {
			type: Object
		},
		value: {},
    placeholder: {},
		disabled: {},
    clearable: {},
		multiple: {}
	},
	data() {
		return {
			// groupable: false,
			showDropdown: false,  //是否展示下来图标
      widgetValue: undefined,
			// originItems: [],
			items: [],
			// filterItems: null,
			// lock: false,
			// searchKeyword: "",
			pickerWidth: 200
		};
	},
	computed: {
		safeOptions() {
			return this.options || {};
		},
		cdisabled() {
			return this.disabled === true || this.safeOptions.disabled === true;
		},
		cplaceholder() {
			return this.placeholder || this.safeOptions.placeholder || "请选择";
		},
    cpickerWidth(){
      return this.safeOptions.width || this.pickerWidth;
    },
    notEmpty() {
      var widgetValue = this.widgetValue;
      if (widgetValue === undefined || widgetValue === null) {
        return false;
      }
      return true;
    },
		cclearable() {
			return this.clearable === true || this.safeOptions.clearable == true;
		},
		cmultiple() {
			return this.multiple || this.safeOptions.multiple;
		},
		// spliter() {
		// 	return this.safeOptions.spliter || ",";
		// },
		// filterable() {
		// 	return this.safeOptions.filter;
		// },
		// widgetValue: {
		// 	set(v) {
		// 		var value;
		// 		if (Sunset.isArray(v)) {
		// 			if (this.options.max) {
		// 				if (v.length > this.options.max) {
		// 					Sunset.tip(`最多选择${this.options.max}个`);
		// 					v.pop();
		// 				}
		// 			}
		// 			value = v.length ? v.join(this.spliter) : "";
		// 		} else {
		// 			value = v;
		// 		}
		// 		this.$emit("input", value);
		// 		if (value != this.value) {
		// 			this.$emit("change", value);
		// 			this.$nextTick(() => {
		// 				this.$refs.picker && this.$refs.picker.update();
		// 			});
		// 		}
		// 	},
		// 	get() {
		// 		var value = this.value;
		// 		var widgetValue = null;
		// 		if (this.cmultiple) {
		// 			if (Sunset.isArray(value)) {
		// 				widgetValue = value;
		// 			} else {
		// 				widgetValue = !!value ? value.split(this.spliter) : [];
		// 			}
		// 		} else {
		// 			widgetValue = value;
		// 		}
		// 		return widgetValue;
		// 	}
		// }
	},
	methods: {
		init() {
      this.items = this.options.data;
			this.$nextTick(() => {
				// Utils.generateItems(this.options).then(items => {
				// 	var groups = {},
				// 		others = [],
				// 		groupable = false;
				// 	items &&
				// 		items.forEach(item => {
				// 			if (item.group) {
				// 				groupable = true;
				// 				(groups[item.group] || (groups[item.group] = [])).push(item);
				// 			} else {
				// 				others.push(item);
				// 			}
				// 		});
				// 	if ((this.groupable = groupable)) {
				// 		var groupItems = [];
				// 		for (var g in groups) {
				// 			if (groups.hasOwnProperty(g)) {
				// 				groupItems.push({
				// 					group: g,
				// 					items: groups[g]
				// 				});
				// 			}
				// 		}
				// 		others.length &&
				// 			groupItems.push({
				// 				group: "其他",
				// 				items: others
				// 			});
				// 		this.items = groupItems;
				// 	} else {
				// 		this.items = items;
				// 	}
				// 	this.originItems = this.items;
				// 	this.elWidth = this.$el.clientWidth;
				// });
			});
		},
		toggleDropdown() {

			// var visible = this.$refs.picker.toggle();

      if (this.cdisabled) {
        return;
      }

      this.$refs.picker.toggle();



			// if (visible) {
			// 	if (this.filterable) {
			// 		this.searching = true;
			// 	}
      // if (!this.cmultiple) {
      //   this.$nextTick(() => {
      //     this.activeSearchResultItem();
      //   });
      // }
			// 	this.getItemByValue(this.value);
			// } else {
			// 	this.searching = false;
			// 	this.searchKeyword = "";
			// 	this.filterMethod();
			// }
		},
		text(value) {
			var currentItem = this.getItemByValue(value);
			if (currentItem !== null) {
				return currentItem.text;
			} else {
				return "";
			}
		},
		getItemByValue(v) {
			var items = this.items.filter(item => item.value === v);
			return items.length ? items[0] : null;
		},
		selectItem(value, item) {
			if (item.disabled) {
				return;
			}
			// if (!item) {
			// 	item = this.getItemByValue(value);
			// }

      if(!this.cmultiple){  //不是多选
        this.widgetValue = value;
        this.$refs.picker.closeDropdown();  //关闭下拉框
      }



			// if (!this.cmultiple) {
			// 	this.widgetValue = value;
			// 	this.toggleDropdown();
			// } else {
			// 	var index;
			// 	if ((index = this.widgetValue.indexOf(value)) >= 0) {
			// 		this.widgetValue.splice(index, 1);
			// 	} else {
			// 		this.widgetValue.push(value);
			// 	}
			// 	this.widgetValue = this.widgetValue.slice(0);
			// }
		},
		clear() {
			this.widgetValue = undefined;
		},
		pickerVisible(v){
			this.showDropdown = v;
		}
	},
	mounted() {
		this.init();
		// this.$watch("options.data", function() {
		// 	this.init();
		// });
		// this.$watch("options.enum", function() {
		// 	this.init();
		// });
	}
};
</script>

<style lang="scss">
/*@import "~style/variable.scss";*/
@import "../../../style/variable.sass";

.xui-select {
	display: inline-block;
	color: $color-content;
	z-index: 10;
	min-width: 50px;
	font-size: 12px;
	.xui-select-inputwrap {
		outline: none;
		position: relative;
		min-height: $select-height;
		line-height: $select-height;
    padding-left: 10px;
		padding-right: 25px;
		border: 1px solid $color-border;
		border-radius: 2px;
		cursor: pointer;
		display: table;
		width: 100%;
		box-sizing: border-box;
		& > * {
			display: inline-block;
		}
	}
	.xui-select-placeholder {
		color: $color-disabled;
	}
	.xui-select-tags {
		flex-grow: 1;
		& > div {
			display: inline-block;
			border: 1px solid $color-border;
			background: $color-background;
			padding: 3px 5px;
			line-height: 1;
			border-radius: 2px;
			margin-right: 5px;
			i {
				font-size: 12px;
				&:hover {
					color: $color-primary;
				}
			}
			&:last-child {
				margin-right: 0px;
			}
		}
	}
	.xui-select-search {
		height: $select-height;
		border: none;
		outline: none;
		font-size: 14px;
		font-family: 微软雅黑;
		flex: 10;
		padding: 0 0 0 5px;
		margin: 0;
		line-height: $select-height;
	}
	.select-trigger-icon {
		position: absolute;
		right: 5px;
		top: 0px;
		transition: all 0.3s;
		&.active {
			transform: rotate(180deg);
		}
	}
	.select-clear-icon {
		position: absolute;
		right: 3px;
		top: 0px;
		color: lighten($color-subcolor, 25%);
		cursor: pointer;
		&:hover {
			color: $color-subcolor;
		}
	}
	/*&.not-empty.cclearable:not(.disabled) {*/
	&.clearable{
		&:hover {
			.select-clear-icon {
				display: block;
			}
			.select-trigger-icon {
				display: none;
			}
		}
	}
	.select-clear-icon {
		visibility: hidden;
	}
	&:hover {
		.select-clear-icon {
			visibility: visible;
		}
	}
	&.disabled {
		cursor: not-allowed;
		* {
			cursor: not-allowed;
		}
		.xui-select-inputwrap {
			background: $color-divider;
			.select-clear-icon {
				display: none;
			}
		}
	}
}
.xui-select-picker {
	max-height: 200px;
	display: flex;
	font-size: 12px;
	& > * {
		width: 100%;
	}
	.xui-select-dropdown {
		list-style-type: none;
		padding: 0;
		margin: 0;
	}
	.xui-select-option {
		list-style-type: none;
		padding: 8px 10px;
		margin: 0px;
		cursor: pointer;
		&:hover,
		&.hover {
			background: darken($color-background, 2%);
		}
		&.active {
			color: $color-primary;
		}
		&.disabled {
			color: $color-disabled;
			cursor: not-allowed;
			&:hover,
			&.hover {
				background: inherit;
			}
		}
	}
	&.multiple {
		.xui-select-option {
			&.active {
				background: #fff;
				color: $color-primary;
				&:after {
					content: "\E750";
					font-family: "iconfont" !important;
					float: right;
					font-size: 18px;
				}
				&:hover,
				&.hover {
					background: $color-background;
				}
			}
		}
	}
}
</style>
