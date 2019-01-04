<template>
	<!--<np-date-picker class="xui-datepicker xui-datepicker-style" :type="type" v-model="widgetValue" :picker-options="dateOptions" :startTimeValue="startTimeValue"
	:format="safeOptions.format" :safeOptions="dateOptions" :disabled="cdisabled"
	:clearable="safeOptions.clearable===false?false:true" :placement="safeOptions.placement" :editable="false" :placeholder="safeOptions.placeholder" :year-range="safeOptions.yearRange">-->
	<!--</np-date-picker>-->

  <div class="xui-datepicker xui-datepicker-style np-date-picker-panel"  ref="dateContainer">
    <div :class="['date-input',{'disabled':cdisabled,'active':isShowTime}]">
      <i class="date_icon iconfont icon-riqi" @click="showView()"></i>
      <input type="text" :class="['time-input',{'disabled':cdisabled}]" v-model="dateControl" :placeholder="cplaceholder" readonly="readonly" @click="showView()"/>
    </div>
    <transition name="toggle">
      <div class="calendarPanel" v-show="isShowTime">
        <!--&lt;!&ndash;<iframe scroll="none" src="about:blank" class="picker-panel__iframe"></iframe>&ndash;&gt;-->
        <div name="calendarForm" style="margin: 0px; position: relative;">
          <table width="100%" border="0" cellpadding="0" cellspacing="1" class="tableHeader">
            <tr>
              <th align="left" width="1%">
                <button type="button" class="el-picker-panel__icon-btn el-date-picker__prev-btn el-icon-arrow-left" id="prevMonth" @click="goPrevMonth()"></button>
              </th>
              <th align="center" width="98%" nowrap="nowrap">
                <!--<div id="calendarYear" class="select_main">-->
                  <!--<input class="select_text" min="1968" max="2050" v-model="calendarYear.currentValue" readonly="readonly" />-->
                  <!--<div class="select_arrow" :class="{'open_select_arrow':calendarYear.show_dropDown,'select_arrow':!calendarYear.show_dropDown}" @click="calendarYear.taggleDropDown()"></div>-->
                  <!--<ul class="select_dropDown" v-if="calendarYear.show_dropDown">-->
                    <!--<scroll-bar>-->
                      <!--<li v-for="sel in calendarYear.options" :class="{option_selected:calendarYear.currentValue==sel}" :data-value="sel" @click="clickOption('calendarYear',sel)">{{sel}}</li>-->
                    <!--</scroll-bar>-->
                  <!--</ul>-->
                <!--</div>-->
                <!--<div id="calendarMonth" class="select_main">-->
                  <!--<input min="1" max="12" class="select_text" v-model="calendarMonth.currentValue" readonly="readonly" />-->
                  <!--<div class="select_arrow" :class="{'open_select_arrow':calendarMonth.show_dropDown,'select_arrow':!calendarMonth.show_dropDown}" @click="calendarMonth.taggleDropDown()"></div>-->
                  <!--<ul class="select_dropDown" v-if="calendarMonth.show_dropDown">-->
                    <!--<scroll-bar>-->
                      <!--<li v-for="sel in calendarMonth.options" :class="{option_selected:calendarYear.currentValue==sel}" :data-value="sel" @click="clickOption('calendarMonth',sel)">{{sel}}</li>-->
                    <!--</scroll-bar>-->
                  <!--</ul>-->
                <!--</div>-->
              </th>
              <th align="right" width="1%">
                <button type="button" aria-label="下个月" id="nextMonth" class="el-picker-panel__icon-btn el-date-picker__next-btn el-icon-arrow-right" @click="goNextMonth()"></button>
              </th>
            </tr>
          </table>
          <table class="calendarTable"  width="100%"  border="0" cellpadding="3" cellspacing="1">
            <tr>
              <th class="th-head" v-for="(item,index) in context.weeks" :key="index">{{item}}</th>
            </tr>
          </table>
        </div>
        <!--<div v-if="!isOnlyDay" class="select_container">-->
					<!--<span style="float:left">-->
						<!--</i>时 间 :</span>-->
          <!--<div id="calendarHour" class="select_main calendarHour" style="width: 55px">-->
            <!--<input class="select_text" min="0" max="23" v-model="calendarHour.currentValue" readonly="readonly" />-->
            <!--<div class="select_arrow" :class="{'open_select_arrow':calendarHour.show_dropDown,'select_arrow':!calendarHour.show_dropDown}" @click="calendarHour.taggleDropDown()"></div>-->
            <!--<ul class="select_dropDown" v-if="calendarHour.show_dropDown">-->
              <!--<scroll-bar>-->
                <!--<li style="cursor: pointer;" v-for="sel in calendarHour.options" :class="{option_selected:calendarYear.currentValue==sel.value}" :data-value="sel" @click="calendarHour.optionClick(sel)">{{sel.value}}</li>-->
              <!--</scroll-bar>-->
            <!--</ul>-->
          <!--</div>-->
          <!--<em style="float:left;font-style: normal">:</em>-->
          <!--<div id="calendarMinute" class="select_main calendarMinute" style="width: 55px">-->
            <!--<input class="select_text" min="0" max="59" v-model="calendarMinute.currentValue" readonly="readonly" />-->
            <!--<div class="select_arrow" :class="{'open_select_arrow':calendarMinute.show_dropDown,'select_arrow':!calendarMinute.show_dropDown}" @click="calendarMinute.taggleDropDown()"></div>-->
            <!--<ul class="select_dropDown" v-if="calendarMinute.show_dropDown">-->
              <!--<scroll-bar>-->
                <!--<li style="cursor: pointer;" v-for="sel in calendarMinute.options" :class="{option_selected:calendarYear.currentValue==sel.value}" :data-value="sel" @click="calendarMinute.optionClick(sel)">{{sel.value}}</li>-->
              <!--</scroll-bar>-->
            <!--</ul>-->
          <!--</div>-->
          <!--<em style="float:left;font-style: normal">:</em>-->
          <!--<div id="calendarSecond" class="select_main calendarSecond" style="width: 55px">-->
            <!--<input class="select_text" min="0" max="59" v-model="calendarSecond.currentValue" readonly="readonly" />-->
            <!--<div class="select_arrow" :class="{'open_select_arrow':calendarSecond.show_dropDown,'select_arrow':!calendarSecond.show_dropDown}" @click="calendarSecond.taggleDropDown()"></div>-->
            <!--<ul class="select_dropDown" v-if="calendarSecond.show_dropDown">-->
              <!--<scroll-bar>-->
                <!--<li style="cursor: pointer;" v-for="sel in calendarSecond.options" :class="{option_selected:calendarYear.currentValue==sel.value}" :data-value="sel" @click="calendarSecond.optionClick(sel)">{{sel.value}}</li>-->
              <!--</scroll-bar>-->
            <!--</ul>-->
          <!--</div>-->
        <!--</div>-->
        <!--<div class="date_picker_bottom">-->
          <!--<datepicker-button @click="clearTime" v-show="clearable" color="info" size="mini" >{{context.clear}}</datepicker-button>-->
          <!--<datepicker-button @click="currentTime" color="info" size="mini"  :class="{clearableStyle:!clearable}">{{context.current}}</datepicker-button>-->
          <!--<datepicker-button @click="confirmTime" color="primary" size="mini" class="blue">{{context.confirm}}</datepicker-button>-->
        <!--</div>-->
      </div>
    </transition>
    <!--<div class="datePickerCover" v-if="isShowTime" @click="hideCover"></div>-->
  </div>


</template>
<script>
// import npDatePicker from "./np_datePicker/datePicker";
// import Sunset from "../../../common/sunset";


export default {
	model: {
		prop: "value",
		event: "input"
	},
	components: {
		// npDatePicker: npDatePicker
	},
	props: {
		options: {
			type: Object
		},
    placeholder: {},
		disabled: {},
		value: {}
	},
	data() {
		return {
      myValue: this.value,
      isShowTime: false,
      context : {
        year: [""],
        months: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
        weeks: ["日", "一", "二", "三", "四", "五", "六"],
        abort: "时间",
        clear: "清空",
        current: "当前",
        confirm: "确定"
      }
    };
	},
	computed: {

    safeOptions(){
      return this.options || {}
    },
    dateControl: function() { //只要时间发生变化，就会重新计算出时间戳
      if(this.myValue){
        return $toolkit.formatDate(this.myValue);
      }
    },
    cplaceholder(){
      return this.placeholder || this.safeOptions.placeholder;
    },
    cdisabled() {
      return this.disabled || this.safeOptions.disabled;
    },

		// widgetValue: {
		// 	set(v) {
		// 		var value = void 0;
		// 		if (v) {
		// 			value = this.formatDateValue(v);
		// 		}
		// 		this.$emit("input", value);
		// 		if (value != this.value) {
		// 			this.$emit("change", value);
		// 			if (this.safeOptions.changeCallBack) {
		// 				this.safeOptions.changeCallBack(val);
		// 			}
		// 		}
		// 	},
		// 	get() {
		// 		var data;
		// 		if (this.value) {
		// 			data = new Date(this.value);
		// 		} else {
		// 			data = "";
		// 		}
		// 		return data;
		// 	}
		// },


		// type() {
		// 	return this.safeOptions.type || "date";
		// },
		// dateOptions() {
		// 	var op = {};
		// 	if (this.safeOptions.disabledDate) {
		// 		op.disabledDate = this.safeOptions.disabledDate;
		// 	} else {
		// 		return;
		// 	}
		// 	return op;
		// },
		// valueFormat() {
		// 	return this.safeOptions.valueFormat;
		// },
		// startTimeValue() {
		// 	return this.safeOptions.startTimeValue;
		// },
		// yearRange() {
		// 	return this.safeOptions.yearRange;
		// }
	},
  mounted(){




    // this.container = this.$el;  //this.$el就是当前vue实例
    // this.panel = this.container.getElementsByClassName("calendarPanel")[0];
    // var mvAry = [];
    // mvAry[mvAry.length] = " <tr>";
    // for (var i = 0; i < 7; i++) {
    //   mvAry[mvAry.length] = ' <th class = "th_head">' + context["weeks"][i] + "</th>";
    // }
    // mvAry[mvAry.length] = " </tr>";
    // for (var i = 0; i < 6; i++) {
    //   mvAry[mvAry.length] = ' <tr align="center">';
    //   for (var j = 0; j < 7; j++) {
    //     mvAry[mvAry.length] = " <td ><span></span></td>";
    //   }
    //   mvAry[mvAry.length] = " </tr>";
    // }
    // this.container.getElementsByClassName("calendarTable")[0].innerHTML = mvAry.join("");
  },
  created(){

  },
  watch:{
    myValue: function(val) {
      // this.$emit('',val);
      // console.log(val);
    },
  },
	methods: {

    showView: function() {
      if (this.cdisabled) {
        return;
      }
      // var b = this.myValue;
      // if (b) {
      //   this.year = b.substring(0, 4) - 0;
      //   this.month = b.substring(5, 7) - 1;
      //   this.dateValue = b.substring(8, 11) - 0;
      //   this.hour = b.substring(11, 13) - 0;
      //   this.minute = b.substring(14, 16) - 0;
      //   this.second = b.substring(17, 19) - 0;
      // }
      // this.getTime();
      // this.bindData();
      this.isShowTime = !this.isShowTime;
    },

		// formatDateValue(v) {
		// 	var value = new Date(v);
		// 	if (this.valueFormat === "timestamp") {
		// 		return value.getTime();
		// 	} else if (Sunset.isString(this.valueFormat)) {
		// 		return Sunset.Dates.format(value, this.valueFormat);
		// 	} else {
		// 		return value;
		// 	}
		// }
	}
};
</script>
<style lang="scss">
.xui-datepicker {
  min-width: 172px;
  max-width: 100%;
  height: 28px;
  display: inline-block;
  vertical-align: middle;
  .date-input {
    width: 100%;
    display: inline-block;
    border: 1px solid #d1dbe5;
    height: 28px;
    background-color: white;
    .time-input {
      -webkit-appearance: none;
      background-image: none;
      width: calc(100% - 20px);
      height: 28px;
      line-height: 28px;
      display: inline-block;
      border: 1px solid #fff;
      box-sizing: border-box;
      color: #333;
      font-size: 12px;
      background-color: #fff;
      outline: none;
      padding: 0 8px;
      float: left;
    }
    .date_icon {
      display: block;
      float: right;
      text-align: center;
      font-size: 18px;
      width: 20px;
      height: 28px;
      line-height: 26px;
      cursor: pointer;
      color: #409eff;
    }
    .disabled,&.disabled {
      background-color: #eef1f6;
      border: 1px solid #eef1f6;
      color: #bbb;
      cursor: not-allowed;
    }
    &:hover{
      border-color: #8391a5;
    }
    &.active {
      border-color: #40a4ff;
    }
  }
  .toggle-enter,.toggle-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  .toggle-enter-active,.toggle-leave-active {
    transition: all ease 0.2s;
  }
  .calendarPanel {
    position: fixed;
    z-index: 999;
    background-color: #fff;
    border: 1px solid #ccc;
    width: 320px;
    font-size: 12px;
    border-radius: 5px;
    line-height: 30px;
    min-height: 30px;
    box-shadow: 5px 5px 0 rgba(0, 0, 0, 0.1);
  }
  .tableHeader {
    padding: 18px 14px 5px 14px;
    border-collapse: separate;
    border-spacing: inherit;
  }
  .calendarTable {
    padding: 0 15px;
    border-collapse: separate;
    border-spacing: inherit;
  }
  .th-head {
    padding: 5px;
    border-bottom: 1px solid #ebeef5;
    color: #606266;
  }

/*	.calendarPanel .select_main .select_dropDown {
		overflow: hidden;
		.xui-scroll {
			height: 300px;
		}
	}*/
}
</style>
