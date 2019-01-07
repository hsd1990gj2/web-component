<template>
	<div>
		<!--<np-datepicker :options="options" @change="changeCallBack" v-model="v"></np-datepicker>-->
		<!--{{v}}-->
    <np-datepicker v-model="v" :options="options"></np-datepicker>
	</div>
</template>

<script>
import npDatepicker from '../index.vue'
export default {
  components:{
    npDatepicker
  },
	data() {
		return {
			v: Date.now(),
			options: {
				// type: "datetime",
				placeholder: "选择日期",
        disabled: false,
        yearRange: [2018, 2020],
				// clearable: true,
				// format: "yyyy-MM-dd",
				// valueFormat: "yyyy-MM-dd HH:mm",
				// clearable: false,


			}
		};
	},
	methods: {
		// changeCallBack(val) {
		// 	console.log(val);
		// }
	}
};
</script>
