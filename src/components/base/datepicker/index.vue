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
                <i class="iconfont icon-com-left" @click="goPrevMonth()"></i>
              </th>
              <th align="center" width="98%" nowrap="nowrap">
                <div id="calendarYear">
                  <np-select v-model="year" :options="yearOptions"></np-select>

                  <!--<input class="select_text" min="1968" max="2050" v-model="calendarYear.currentValue" readonly="readonly" />-->
                  <!--<div class="select_arrow" :class="{'open_select_arrow':calendarYear.show_dropDown,'select_arrow':!calendarYear.show_dropDown}" @click="calendarYear.taggleDropDown()"></div>-->
                  <!--<ul class="select_dropDown" v-if="calendarYear.show_dropDown">-->
                    <!--<scroll-bar>-->
                      <!--<li v-for="sel in calendarYear.options" :class="{option_selected:calendarYear.currentValue==sel}" :data-value="sel" @click="clickOption('calendarYear',sel)">{{sel}}</li>-->
                    <!--</scroll-bar>-->
                  <!--</ul>-->
                </div>
                <div id="calendarMonth">
                  <np-select v-model="month" :options="monthOptions"></np-select>

                  <!--<input class="select-text" v-model="calendarMonth.currentValue" readonly="readonly" />-->
                  <!--<div class="select-arrow" :class="{'open-select-arrow':calendarMonth.show,'select-arrow':!calendarMonth.show}"  @click="taggleDropDown"></div>-->
                  <!--<ul class="select-dropDown" v-if="calendarMonth.show">-->
                    <!--&lt;!&ndash;<scroll-bar>&ndash;&gt;-->
                      <!--&lt;!&ndash;<li :class="{option_selected:calendarYear.currentValue==sel}" :data-value="sel" >{{sel}}</li>&ndash;&gt;-->
                      <!--<li v-for="month in calendarMonth.options" @click="clickOption(month)">{{month}}</li>-->
                    <!--&lt;!&ndash;</scroll-bar>&ndash;&gt;-->
                  <!--</ul>-->
                </div>
              </th>
              <th align="right" width="1%">
                <i class="iconfont icon-com-right" @click="goNextMonth()"></i>
              </th>
            </tr>
          </table>
          <table class="calendarTable"  width="100%"  border="0" cellpadding="3" cellspacing="1">
            <tr>
              <th class="th-head" v-for="(item,index) in context.weeks" :key="index">{{item}}</th>
            </tr>
            <tr v-for="(item,index) in rows" :key="index">
              <td v-for="(item,index) in cols"><span></span></td>
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

// function SelectControl() {
//   this.show_dropDown = false;
//   this.options = [];
//   this.currentValue = "";
// }

// SelectControl.prototype.optionClick = function(sel) {
//   if (sel.isDisabled) {
//     return;
//   }
//   this.currentValue = sel.value ? sel.value : sel;
//   this.show_dropDown = false;
// };
import npSelect from '../select/index.vue'
export default {
	model: {
		prop: "value",
		event: "input"
	},
	components: {
    npSelect
		// npDatePicker: npDatePicker
	},
	props: {
		options: {
			type: Object,
      yearRange: {
        type: Array,
        default() {
          return [new Date().getFullYear() - 20, new Date().getFullYear() + 20];
        }
      }
		},
    placeholder: {},
		disabled: {},
		value: {},
	},
	data() {
		return {
      myValue: this.value,
      isShowTime: false,
      context : {
        year: [""],
        weeks: ["日", "一", "二", "三", "四", "五", "六"],
        abort: "时间",
        clear: "清空",
        current: "当前",
        confirm: "确定"
      },
      rows:[1,2,3,4,5,6],
      cols:[1,2,3,4,5,6,7],
      year: new Date().getFullYear(),
      yearOptions:{
        width: 70,
        data:[]
      },
      month:  new Date().getMonth()+1,
      monthOptions:{
        width: 55,
        data:[]
      },


      // calendarYear: new SelectControl(),
      calendarMonth: {
        options : [],
        currentValue: "",
        show : false,
      }
    };
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
    currentTime: function() {
      this.date = new Date();
      // this.hour = this.date.getHours();
      // this.minute = this.date.getMinutes();
      // this.second = this.date.getSeconds();
      // this.dateValue = this.date.getDate();
      // this.calendarYear.currentValue = this.year;
      // this.bindData();
      // this.confirmTime(true);
    },
    taggleDropDown(){
      this.calendarMonth.show = !this.calendarMonth.show;
    },
    clickOption(value){
      this.calendarMonth.currentValue = value;
      this.calendarMonth.show = false;
    },
    goPrevMonth: function(clickVal) {
      // this.getShowValue();
      if (this.year === this.options.yearRange[0] && this.month == 1) {
        return;
      }
      this.month--;
      if (this.month < 1) {
        this.year--;
        this.month = 12;
      }
      this.getMonthViewArray();
      // this.dateValue = clickVal ? clickVal : 1;
      // this.date = new Date(this.year, this.month, this.dateValue, this.hour, this.minute, this.second);
      // this.bindData();
    },
    goNextMonth() {
      // this.getShowValue();
      if (this.year == this.options.yearRange[1] && this.month == 12) {
        return;
      }
      this.month++;
      if (this.month > 12) {
        this.year++;
        this.month = 1;
      }
      this.getMonthViewArray();
      // this.dateValue = clickVal ? clickVal : 1;
      // this.date = new Date(this.year, this.month, this.dateValue, this.hour, this.minute, this.second);
      // this.bindData();
    },
    getMonthViewArray: function(year, month) {
      //获取日历数据
      var mvArray = [];
      var cont = 1;
      var firstDay = new Date(this.year, this.month-1, 1).getDay();  // 获取当前月第一天是周几,以此为基准进行前后推算，因为周的标题是不变的
      var preMonthDay = new Date(this.year, this.month-1, 0).getDate();  //获取上个月的最后一天是多少号，因为要往前推算
      var endMonthDay = new Date(this.year, this.month , 0).getDate();  //获取当前月的最后一天是多少号，因为要往后推算
      for (var i = firstDay - 1; i >= 0; --i) {
        mvArray[i] = {
          value: preMonthDay,
          type: "preMonth"
        };
        --preMonthDay;
      }
      for (var i = 0; i < endMonthDay; i++) {
        mvArray[i + firstDay] = {
          value: i + 1,
          type: "currentMonth"
        };
      }
      for (var i = mvArray.length; i < 42; i++) {
        mvArray[i] = {
          value: cont,
          type: "nextMonth"
        };
        cont++;
      }
      // 渲染日历视图
      var dayTds = document.getElementsByClassName("calendarTable")[0].getElementsByTagName("span");
      for(var i = 0; i<dayTds.length; i++){
        dayTds[i].innerHTML = mvArray[i].value;
        dayTds[i].setAttribute("class",mvArray[i].type);
        if(new Date().getDate() == mvArray[i].value && i<32){
          dayTds[i].className = 'date-normal-checked'
        }
      }
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
	  var mvArray = this.getMonthViewArray();

  },
  created(){
    // this.month = this.date.getMonth();
    // this.currentTime();
    for(var i = this.options.yearRange[0]; i<=this.options.yearRange[1]; i++){
      this.yearOptions.data.push({
        text: i,
        value: i
      })
    }
    for(var i = 1; i<=12; i++){
      this.monthOptions.data.push({
        text: i,
        value: i
      })
    }



    // for (var i = 0; i < 60; i++) {
    //   if (i < 12) {
    //     this.calendarMonth.options.push(this.context.months[i]);
    //   }
    //   if (i < 24 && !this.isOnlyDay) {
    //     this.calendarHour.options.push({ value: i < 10 ? "0" + i : i, isDisabled: false });
    //   }
    //   if (!this.isOnlyDay) {
    //     this.calendarMinute.options.push({ value: i < 10 ? "0" + i : i, isDisabled: false });
    //     this.calendarSecond.options.push({ value: i < 10 ? "0" + i : i, isDisabled: false });
    //   }
    // }


  },
  watch:{
    myValue: function(val) {
      // this.$emit('',val);
      // console.log(val);
    },
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
    .tableHeader {
      padding: 18px 14px 5px 14px;
      border-collapse: separate;
      border-spacing: inherit;
      th{
        font-weight: normal;
        line-height: 0;
      }
      .icon-com-left,.icon-com-right{
        font-size: 12px;
        color: #303133;
        cursor: pointer;
      }
      #calendarYear {
        width: 70px;
        display: inline-block;
        padding: 0 5px;

      }
      #calendarMonth {
        width: 55px;
        display: inline-block;
        padding: 0 5px;
      }
    }
    .calendarTable {
      padding: 0 15px;
      border-collapse: separate;
      border-spacing: inherit;
      .th-head {
        padding: 5px;
        border-bottom: 1px solid #ebeef5;
        color: #606266;
      }
      tr td {
        text-align: center;
        cursor: pointer;
        position: relative;
        padding: 5px;
        span {
          font-size: 12px;
          display: block;
          border-radius: 50%;
        }
        .preMonth,.nextMonth{
          color: #c0c4cc;
        }
        .date-normal-checked {
          color: #fff;
          background-color: #40a4ff;
        }
      }
    }
  }
  .xui-select-style{
    font-weight: normal;
  }
/*  .select-main {
    display: inline-block;
    position: relative;
    height: 26px;
    float: left;
    margin-left: 50px;
    .select-text {
      width: 100%;
      height: 26px;
      line-height: 26px;
      text-indent: 10px;
      box-sizing: border-box;
      border: #ddd 1px solid;
      &:hover {
        border-color: #aaa;
      }
    }
    .select-arrow {
      position: absolute;
      top: 2px;
      right: 0;
      height: 24px;
      cursor: pointer;
      text-align: center;
      width: 20px;
      color: #999;
    }
    .select-arrow:before {
      content: " ";
      border-left: 5px solid transparent;
      border-right: 5px solid transparent;
      border-top: 5px solid #cccccc;
      display: block;
      width: 0;
      height: 0;
      top: 0;
      right: 5px;
      bottom: 0;
      position: absolute;
      margin: auto 0;
    }
    .select-arrow:hover:before {
      border-top-color: #999;
    }
    .open-select-arrow {
      border-color: #51a7e8;
    }
    .open-select-arrow:before {
      border-top: none;
      border-bottom: 5px solid #cccccc;
    }
    .select-dropDown {
      position: absolute;
      z-index: 1;
      top: 100%;
      left: 0;
      width: 100%;
      max-height: 300px;
      margin: 0;
      padding: 0;
      overflow-y: auto;
      background: #fff;
      border: 1px solid #ccc;
      box-shadow: 6px 6px 0px rgba(34, 34, 34, 0.1);
      transition: top 0.3s;
    }
  }*/

/*	.calendarPanel .select_main .select_dropDown {
		overflow: hidden;
		.xui-scroll {
			height: 300px;
		}
	}*/
}
</style>
