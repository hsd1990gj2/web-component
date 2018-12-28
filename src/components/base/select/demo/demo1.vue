<template>
  <div>
    <!--<np-select style="width:400px;" v-model="v" :options="options"></np-select>-->
    <!--<np-select v-model="v2" :options="multipleOptions"></np-select>-->
    <!--<input type="text" v-model="v">-->
    <!--{{v}}-->
    <!--{{v2}}-->
    <!--<div style="height:300px;">-->

    <!--</div>-->

    <np-select v-model="v" :options="options"></np-select>

    <!--测试-->
    <!--测试一-->

  </div>
</template>
<script>
  import npSelect from "../index.vue";
  export default {
    components: {
      npSelect
    },
    data() {
      return {
        v: "",
        // v: "3",
        // v2: "",
        options: {
          // width: 400, //可配置输入框和下拉框的宽度
          placeholder: "请选择一个城市",
          disabled: false, //支持整体禁用
          clearable: true, //支持可清空
          // multiple: false,


          // format(item) {
          //   return item.value + "-" + item.text;
          // },
          // enum : 'SEX'
          data: [
            {
              text: "北京",
              value: 1
            },
            {
              text: "上海",
              value: 2
            },
            {
              text: "广州",
              value: 3,
              disabled:true //某一项禁用
            },
            {
              text: "深圳",
              value: 4
            }
          ]
        },
        // multipleOptions: {
        //   multiple: true,
        //   clearable: true,
        //   filter: false,
        //   // iswrap: false,
        //   placeholder: "请选择一个城市",
        //   data: [
        //     {
        //       text: "北京",
        //       value: "beijing"
        //     },
        //     {
        //       text: "上海",
        //       value: "shanghai"
        //     },
        //     {
        //       text: "深圳",
        //       value: "shenzhen"
        //     },
        //     {
        //       text: "广州",
        //       value: "guangzhou"
        //     }
        //   ]
        // }
      };
    }
  };
</script>
