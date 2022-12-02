<template>
  <div class="index">
    <div class="body1">
      <div class="body_top">
        <div class="title">筛选条件</div>
        <div class="fold_right" @click="open_fold">
          <span>{{open_folds?'折叠':'展开'}}</span>
          <i :class="open_folds?'el-icon-arrow-up':'el-icon-arrow-down'"></i>
        </div>
      </div>
      <div class="body_bottom" v-if="open_folds">
        <el-form ref="forms" :model="formData" label-width="130px">
          <el-row>
            <el-col :span="8">
              <el-form-item label="数据来源" style="margin:0">
                <el-select v-model="formData.data_sources" placeholder="请选择" style="width: 100%">
                  <el-option
                    v-for="item in sourcesData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="日期类型" style="margin:0">
                  <el-radio v-model="formData.date_type" label="1">生产日期</el-radio>
                  <el-radio v-model="formData.date_type" label="2">检验日期</el-radio>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="日期范围" style="margin:0">
                <el-date-picker
                  v-model="formData.times"
                  style="width: 100%"
                  type="daterange"
                  range-separator="至"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  @change="timeChange"
                />
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="区域" style="margin:10px 0">
                <el-select v-model="formData.data_sources" placeholder="请选择" style="width: 100%">
                  <el-option
                    v-for="item in sourcesData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="检出/未检出" style="margin:10px 0">
                <el-select v-model="formData.data_sources" placeholder="请选择" style="width: 100%">
                  <el-option
                    v-for="item in sourcesData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item label="判定结果" style="margin:10px 0">
                <el-select v-model="formData.data_sources" placeholder="请选择" style="width: 100%">
                  <el-option
                    v-for="item in sourcesData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="8">
              <el-form-item label="不合格分类" style="margin:0">
                <el-select v-model="formData.data_sources" placeholder="请选择" style="width: 100%">
                  <el-option
                    v-for="item in sourcesData"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item style="margin:0;color: #fff;">s
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item class="btn">
                <el-button type="primary" class="btns">查询</el-button>
                <el-button class="btns">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
    <div class="body2">
      <div class="body_top">
        <div class="title">
          <span>定量结果</span>
          <span>（*检查结果为数值）</span>
        </div>
      </div>
      <div class="body_bottom">
        <el-table
          :data="tableData"
          :header-cell-style="{'text-align':'center','background':'#f8f8f8','height':'54px'}"
          :cell-style="{'text-align':'center','height':'54px'}"
          height="270"
          style="width: 100%">
          <el-table-column
            fixed
            prop="ypfl"
            label="样品分类"
            width="180">
          </el-table-column>
          <el-table-column
            prop="ybsl"
            label="样本数量(份)">
          </el-table-column>
          <el-table-column
            prop="jcl"
            label="检出率(%)">
          </el-table-column>
          <el-table-column
            prop="jcsl"
            label="检出数量(>0)">
          </el-table-column>
          <el-table-column
            prop="pjz"
            label="平均值">
          </el-table-column>
          <el-table-column
            prop="zxz"
            label="最小值">
          </el-table-column>
          <el-table-column
            prop="zdz"
            label="最大值">
          </el-table-column>
          <el-table-column
            prop="p50"
            label="p50">
          </el-table-column>
          <el-table-column
            prop="p75"
            label="p75">
          </el-table-column>
          <el-table-column
            prop="p90"
            label="p90">
          </el-table-column>
          <el-table-column
            prop="p95"
            label="p95">
          </el-table-column>
          <el-table-column
            prop="p975"
            label="p97.5">
          </el-table-column>
        </el-table>
      </div>
    </div>
    <div class="body2">
      <div class="body_top">
        <div class="title">
          <span>定性结果</span>
          <span>（*检查结果为阴性、阳性）</span>
        </div>
      </div>
      <div class="body_bottom">
        <el-table
          :data="tableData"
          :header-cell-style="{'text-align':'center','background':'#f8f8f8','height':'54px'}"
          :cell-style="{'text-align':'center','height':'54px'}"
          height="270"
          style="width: 100%">
          <el-table-column
            fixed
            prop="ypfl"
            label="样品分类"
            width="180">
          </el-table-column>
          <el-table-column
            prop="ybsl"
            label="样本数量(份)">
          </el-table-column>
          <el-table-column
            prop="yxfs"
            label="阴性份数(-)">
          </el-table-column>
          <el-table-column
            prop="Yxfs"
            label="阳性份数(-)">
          </el-table-column>
          <el-table-column
            prop="Yxl"
            label="阳性率(%)">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      open_folds: true,
      formData:{
        data_sources:'',
        date_type:'1',
        times:[]
      },
      sourcesData:[{
          value: '选项1',
          label: '生乳样品信息表1'
        }, {
          value: '选项2',
          label: '生乳样品信息表2'
        }, {
          value: '选项3',
          label: '生乳样品信息表3'
      }],
      tableData:[
        {ypfl: '发酵乳',ybsl: '10',jcl: '10',jcsl: '1',pjz: '',zxz: '',zdz: '',p50: '',p75: '',p90: '',p95: '',p975: '',
          yxfs: '9',Yxfs: '1',Yxl: '10'
        },{ypfl: '发酵乳',ybsl: '10',jcl: '10',jcsl: '1',pjz: '',zxz: '',zdz: '',p50: '',p75: '',p90: '',p95: '',p975: '',
          yxfs: '9',Yxfs: '1',Yxl: '10'
        },{ypfl: '发酵乳',ybsl: '10',jcl: '10',jcsl: '1',pjz: '',zxz: '',zdz: '',p50: '',p75: '',p90: '',p95: '',p975: '',
          yxfs: '9',Yxfs: '1',Yxl: '10'
        },{ypfl: '发酵乳',ybsl: '10',jcl: '10',jcsl: '1',pjz: '',zxz: '',zdz: '',p50: '',p75: '',p90: '',p95: '',p975: '',
          yxfs: '9',Yxfs: '1',Yxl: '10'
        },{ypfl: '发酵乳',ybsl: '10',jcl: '10',jcsl: '1',pjz: '',zxz: '',zdz: '',p50: '',p75: '',p90: '',p95: '',p975: '',
          yxfs: '9',Yxfs: '1',Yxl: '10'
        }
      ]
    }
  },
  mounted(){
    this.TabbleCommon()
  },
  methods: {
    open_fold () {
      this.open_folds = !this.open_folds
    },
    timeChange(e) {
      this.formData.times = e
    },
    TabbleCommon(){
      let json = {
        SType:'GetTableData',
        UserId:'88800000',
        ExcelID:'',
        TreeID:'1000194',
        PageIndex:'1',
        PageSize:'10',
        Filter:{
          SYB:"冷饮事业部111",
          WLLB:"原料",
          YPMC:"*",
          DOC_ID:"*",
          ITEM_ID:"*"
        }
      }
      this.$store
        .dispatch('index/TabbleCommon', json)
        .then((res) => {
          console.log(res)
          if (Number(res.code) === 200) {
            
          }
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }
}
</script>

<style scoped lang="scss">
.index{background-color: #edf0f2;position: absolute;width: 100%;height: 100%;top: 0;left: 0;overflow-y: auto;}
.index .body1{margin: 20px 20px 14px 20px;background: #fff;border-radius: 4px;
  .body_top{height: 58px;display: flex;justify-content: space-between;
    .fold_right{font-size: 14px;height: 14px;margin-top: 23px;line-height: 14px;color: #abbccb;margin-right: 20px;}
  }
  .body_bottom{border-top: 1px solid #eff4f5;padding:20px 46px 20px 0;
  }
}

.body2{margin: 0 20px 14px 20px;background: #fff;border-radius: 4px;
    .body_top{height: 58px;display: flex;justify-content: space-between;}
    .body_bottom{text-align: center;}
}
.index{
  .title{font-size: 14px;font-weight: bold;margin-left: 20px;padding-left: 10px;border-left: 4px solid #0083d6;height: 14px;
    margin-top: 23px;line-height: 14px;}
  .title span:last-child{font-weight: 500;}
}

.btn{float:right;margin:0;
  .btns{width: 88px;}
}
</style>
