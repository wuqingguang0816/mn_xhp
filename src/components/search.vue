<template>
    <!-- 市场监督管理总局风险监测计划 -->
    <div class="list_view">
        <!-- 查询条件 -->
        <div class="top_view" ref="topView">
            <el-form ref="form" label-position="right" style="    width: 80%;" size="mini">
                <el-row :gutter="5" class="elRow">
                    <div v-for="(t, i) in formArr" :key="i">
                        <el-col v-if="(t.DATALENGTH >= 100 && t.DEFAULT_TYPE == 'S')" :span="24">
                            <el-form-item :required="t.MANDATORY_FLAG == 'T'" :label="t.TEXT_PROMPT"
                                v-if="t.DEFAULT_TYPE != 'F' && t.DEFAULT_TYPE != 'D' && t.HIDDEN_FLAG != 'T'"
                                label-width="130px">
                                <el-input v-model="t.DEFAULT_VALUE" type="textarea" :rows="4" resize="none"
                                    :readonly="t.DISPLAY_FLAG == 'T'" v-if="t.DEFAULT_TYPE == 'S'"
                                    :placeholder="t.TEXT_PROMPT"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8" v-else>
                            <el-form-item :label="t.TEXT_PROMPT + ':'"
                                v-if="t.DEFAULT_TYPE != 'F' && t.DEFAULT_TYPE != 'D'">
                                <el-input style="width: 180px;" v-model="t.DEFAULT_VALUE" v-if="t.DEFAULT_TYPE == 'K'"
                                    disabled :placeholder="t.TEXT_PROMPT"></el-input>
                                <el-input style="width: 180px;" v-model="t.DEFAULT_VALUE" v-if="t.DEFAULT_TYPE == 'S'"
                                    :placeholder="t.TEXT_PROMPT"></el-input>

                                <el-select style="width: 180px;" v-model="t.DEFAULT_VALUE" v-if="
                                    t.DEFAULT_TYPE == 'C' ||
                                    t.DEFAULT_TYPE == 'SC' ||
                                    t.DEFAULT_TYPE == 'Q'
                                " :placeholder="t.TEXT_PROMPT">
                                    <el-option v-for="op in t.LINKCONTENT" :key="op.ID" :label="op.TEXT" :value="op.ID">
                                    </el-option>
                                </el-select>
                                <el-input style="width: 180px" v-model="t.DEFAULT_VALUE" type=" number"
                                    v-if="t.DEFAULT_TYPE == 'N'" :placeholder="t.TEXT_PROMPT"></el-input>
                                <el-input style="width: 180px" v-model="t.DEFAULT_VALUE" v-if="t.DEFAULT_TYPE == 'T'"
                                    :placeholder="t.TEXT_PROMPT"></el-input>
                            </el-form-item>
                            <el-form-item :required="t.MANDATORY_FLAG == 'T'" :label="t.TEXT_PROMPT"
                                v-if="t.DEFAULT_TYPE == 'D'" >
                                <el-date-picker style="width: 180px;"
                                    v-if="t.EXT1 == '/' || !t.EXT1 || t.EXT1 == '%Y-%m-%d'" v-model="t.DEFAULT_VALUE"
                                    type="date" value-format="yyyy-MM-dd" :placeholder="t.TEXT_PROMPT"
                                    :disabled="t.DISPLAY_FLAG == 'T'">
                                </el-date-picker>
                                <el-date-picker style="width: 180px;" v-else-if="t.EXT1 == '%Y-%m-%d %H:%M:%S'"
                                    v-model="t.DEFAULT_VALUE" value-format="yyyy-MM-dd hh:mm:ss" type="datetime"
                                    :placeholder="t.TEXT_PROMPT" :disabled="t.DISPLAY_FLAG == 'T'">
                                </el-date-picker>
                                <el-date-picker style="width: 180px;" v-else-if="t.EXT1 == '%Y-%m-%d %H:%M'"
                                    v-model="t.DEFAULT_VALUE" value-format="yyyy-MM-dd hh:mm" type="datetime"
                                    :placeholder="t.TEXT_PROMPT" :disabled="t.DISPLAY_FLAG == 'T'">
                                </el-date-picker>
                                <el-date-picker style="width: 180px;" v-else-if="t.EXT1 == '%Y'"
                                    v-model="t.DEFAULT_VALUE" value-format="yyyy" type="year"
                                    :disabled="t.DISPLAY_FLAG == 'T'" :placeholder="t.TEXT_PROMPT">
                                </el-date-picker>
                                <el-date-picker style="width: 180px;" v-else-if="t.EXT1 == '%Y-%m'"
                                    v-model="t.DEFAULT_VALUE" value-format="yyyy-MM" type="month"
                                    :disabled="t.DISPLAY_FLAG == 'T'" :placeholder="t.TEXT_PROMPT">
                                </el-date-picker>
                            </el-form-item>
                        </el-col>

                    </div>

                </el-row>
            </el-form>
            <div class="btn_view">
                <el-button size="mini" type="primary" icon="el-icon-search" @click="inquireTap">查询</el-button>

                <el-button size="mini" v-if="ADDshow" @click="aDD" type="primary">新增</el-button>

                <el-button size="mini" v-if="REMOVEshow" @click="rEMOVE" type="danger">删除</el-button>

                <el-button v-if="inquireTaps" size="mini" @click="inquireTap">刷新</el-button>
                <el-button v-if="ExcelTaps" class="Excel" size="mini" @click="ExcelTap">Excel导出</el-button>
            </div>
        </div>
    </div>
</template>
    
    
    
<script>
import { form } from "@/linbs/formData";

import msg from "@/linbs/mesAge";
import * as XLSX from "xlsx";
// import FileSaver from "file-saver";

export default {
    name: "Search",
    props: [],
    components: {},
    props: {
        // 父名称
        name: {
            type: String,
            default: ''
        },
        // 刷新按钮
        inquireTaps: {
            type: Boolean,
            default: false
        },
        // 导出按钮
        ExcelTaps: {
            type: Boolean,
            default: false
        },
        // 用户id
        UserId: {
            type: String,
            default: ''
        },
        // 页面查询id
        tableId: {
            type: String,
            default: ''
        },
    },
    data() {
        return {
            tableData: [], //
            labelArr: [], //
            formArr: [], //表单数据
            GridMenu: [], //按钮
            tableHeight: 500,
            merageArr: [],
            meragePos: 0,
            rowspan: [],
            ADDshow: false,
            MODIFYshow: false,
            REMOVEshow: false
        };
    },
    mounted() {
        this.tablewach();
    },
    created() {
        // this.UserId = this.$route.query.userId;
        // this.tableId = this.$route.query.tableId;
        // this.getData();
    },
    computed: {
        // currentTabComponent: function () {
        //   return  "testItem";
        // },
    },
    methods: {

        aDD() {
            console.log(1)
            var data = this.GridMenu.filter(r => r.RIGHTMENUNAME == 'ADD')
            this.$router.push({
                name: "test",
                query: {
                    userId: this.UserId,
                    Params: "",
                    id: data[0].RIGHTMENUID,
                    VALUE: '',
                    callback: true,
                    name: this.name
                },
            });
        },
        mODIFY() {
            var data = this.GridMenu.filter(r => r.RIGHTMENUNAME == 'MODIFY')
        },
        rEMOVE() {
            var data = this.GridMenu.filter(r => r.RIGHTMENUNAME == 'REMOVE')
            this.$emit('remove', data[0])
        },
        //操作按钮 修改及修改内容
        handleClick(row, item) { },
        merage(tableData) {
            let that = this;
            let s = 0;

            let rowspan = this.rowspan;
            let idx = 1,
                ids = 1; //存储相同下班
            for (var i = 0; i < tableData.length; i++) {
                this.meragePos = i;
                let isTrue = rowspan
                    .map((item) => {
                        if ((i + 1) <= tableData.length - 1) {
                            return (
                                tableData[i][this.labelArr[item].prop] ==
                                tableData[i + 1][this.labelArr[item].prop]
                            );
                        } else {
                            return false;
                        }
                    })
                    .every((item) => item == true);
                if (isTrue) {
                    idx++;
                    this.merageArr.push(ids + 1);
                    this.merageArr[i + 1] = 0;
                } else {
                    ids = i;
                    if (this.merageArr[i] || this.merageArr[i] >= 0) {
                        ids = i;
                        if (this.merageArr[ids - 1] != 0) {
                            this.merageArr[ids - 1] = idx;
                        }
                    } else {
                        this.merageArr[i] = 1;
                        idx = 1;
                    }
                }
            }
        },
        ExcelTap() {
            let excelName = "Excel";
            this.$confirm("请问是否要导出Excel?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning",
                center: true,
            })
                .then(() => {
                    try {
                        const $e = this.$refs["totalTableData"].$el;
                        let $table = $e.querySelector(".el-table__fixed-right");
                        if (!$table) {
                            $table = $e;
                        }
                        const wb = XLSX.utils.table_to_book($table, { raw: true });
                        const wbout = XLSX.write(wb, {
                            bookType: "xlsx",
                            bookSST: true,
                            type: "array",
                        });
                        FileSaver.saveAs(
                            new Blob([wbout], { type: "application/octet-stream" }),
                            `${excelName}.xlsx`
                        );
                        this.$message({
                            type: "success",
                            message: "导出成功!",
                        });
                    } catch (e) {
                        if (typeof console !== "undefined")
                            this.$message({
                                type: "error",
                                message: "导出失败!",
                            });
                    }
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消",
                    });
                });
        },
        //合拼表格
        objectSpanMethod({ row, column, rowIndex, columnIndex }) {
            let rowspan = this.rowspan.join(',');
            if (rowspan.indexOf(columnIndex) != -1) {
                const _row_1 = this.merageArr[rowIndex];
                const _col_1 = _row_1 > 0 ? 1 : 0; //如果被合并了_row=0则它这个列需要取消
                return {
                    rowspan: _row_1,
                    colspan: 1,
                };
            }
        },

        getData() {
            let messger = {
                SType: "GetGridDefine",
                UserId: this.UserId,
                TREEID: this.tableId,
                // PageSize: this.PageSize,
                // PageIndex: this.PageIndex,
            };
            this.$getReq("/ashx/Common.ashx", "POST", form(messger)).then((res) => {
                if (res.Success) {
                    let tableD = res.Result.GridDefine;
                    if (tableD.length > 0) {
                        tableD.forEach((itm) => {
                            if (itm.DEFAULT_TYPE == "C") {
                                let LINKCONTENT = itm.LINKCONTENT;
                                if (LINKCONTENT.length > 0) {
                                    itm.DEFAULT_VALUE = LINKCONTENT[0].ID;
                                }
                            }
                            if (itm.DEFAULT_TYPE == "C"||itm.DEFAULT_TYPE == "Q"||itm.DEFAULT_TYPE == "SC") {
                                itm.LINKCONTENT.unshift({
                                    ID: "*", TEXT: "全部"
                                })
                            }
                            
                        });
                        this.formArr = tableD;
                        this.GridMenu = res.Result.GridMenu;
                        var _that = this
                        this.GridMenu.map(r => {
                            switch (r.RIGHTMENUNAME) {
                                case 'ADD':
                                    _that.ADDshow = true
                                    break;
                                case 'MODIFY':
                                    _that.MODIFYshow = true
                                    _that.$emit('modify', r)
                                    break;
                                case 'REMOVE':
                                    _that.REMOVEshow = true
                                    break;
                                default:
                                    break;
                            }

                        })

                    }
                    this.inquireTap(); //
                } else {
                    msg.msgError("暂无数据");
                }
            });
        },
        // 获取表格数据
        getList(Filter) {
            let messger = {
                SType: "GetTableData",
                UserId: this.UserId,
                ExcelID: "",
                TreeID: this.tableId,
                PageSize: this.PageSize,
                PageIndex: this.PageIndex,
                Filter: JSON.stringify(Filter),
            };
            this.$getReq("/ashx/Common.ashx", "POST", form(messger)).then((res) => {
                if (res.Success) {
                    let tableD = res.Result.data;
                    let labelArr = [];
                    let label = res.Result.showtitle.split(",");
                    if (tableD.length > 0) {
                        let b = 0;

                        for (let key in tableD[0]) {
                            if (label[b]) {
                                labelArr.push({
                                    prop: key,
                                    label: label[b],
                                });
                                b++;
                            } else {
                                break;
                            }
                        }
                        this.labelArr = labelArr;
                        this.tableData = tableD;
                    } else {
                        label.forEach((itm) => {
                            labelArr.push({
                                prop: "",
                                label: itm,
                            });
                        });
                        this.labelArr = labelArr;
                        this.tableData = [];
                    }
                    this.total = res.Result.recordsTotal;

                    if (res.Result.rowspan != "") {
                        this.rowspan = res.Result.rowspan.split(",");
                        this.merage(this.tableData);
                    }
                } else {
                    msg.msgError("暂无数据");
                }
            });
        },
        // 获取数据及刷新数据
        inquireTap() {
            let Filter = {};
            this.formArr.forEach((itm) => {
                Filter[itm.FIELD_NAME] = itm.DEFAULT_VALUE;
            });
            this.$emit('getList', Filter)
            // this.getList(Filter);
        },
        tablewach() {
            let innerHeight = window.innerHeight; //屏幕的高度
            let topView = this.$refs.topView.clientHeight;
            setTimeout(() => {
                this.tableHeight = innerHeight - topView - 90;
            }, 500);
        },
        handleCurrentChange() {
            this.inquireTap();
        },
    },
};
</script>
<style lang="scss" scoped>
.list_view {
    padding: 20px;

    .top_view {
        display: flex;
        border-radius: 5px;
        background-color: #fff;
        margin-bottom: 10px;

        .delete {
            background-color: #da1709;
            color: #fff;

            &:active {
                border: 1px solid #ff4b3e;
            }
        }

        .add {
            background-color: #1075da;
            color: #fff;

            &:active {
                border: 1px solid #2389ee;
            }
        }

        .Excel {
            background-color: #09c05b;
            color: #fff;

            &:active {
                border: 1px solid #16d46b;
            }
        }
    }
}

.pagination {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;

    .total {
        font-size: 15px;
        color: #333;
    }
}

.btn_view {
    display: flex;

    align-items: flex-start;
    flex: 1;
    justify-content: right;

    .sx {
        margin-left: 10px;
    }
}

.el-form-item--mini.el-form-item,
.el-form-item--small.el-form-item {
    margin-bottom: 0;
}

.addView {
    position: relative;
    top: 5px;
}

.btn_box-view {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>
          