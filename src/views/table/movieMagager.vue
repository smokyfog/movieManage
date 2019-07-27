<template>
  <div class="app-container movielist">
    <div class="filter-container">
      <!-- <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        size="small"
        icon="el-icon-plus"
      > 新增视频
      </el-button> -->
    </div>
    <el-row>
      <el-col :span="24" class="">
        <el-collapse v-model="activeNames">
          <el-collapse-item title=" 筛选" name="1">
            <el-row :gutter="20" class="search_box">
              <el-col :span="6">
                <el-row>
                  <el-col :span="7"><div class="search_title">ID</div></el-col>
                  <el-col :span="17">
                    <el-input
                      v-model="search.id"
                      :span="18"
                      size="medium"
                      placeholder="请输入内容"
                      clearable
                      @input="search_ref"
                    />
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="6">
                <el-row>
                  <el-col :span="7"><div class="search_title">歌词ID</div></el-col>
                  <el-col :span="17">
                    <el-input
                      v-model="search.lyric_id"
                      :span="18"
                      size="medium"
                      placeholder="请输入内容"
                      clearable
                      @input="search_ref"
                    />
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span="6">
                <el-row>
                  <el-col :span="7"><div class="search_title">原始歌词ID</div></el-col>
                  <el-col :span="17">
                    <el-input
                      v-model="search.raw_lyric_id"
                      :span="18"
                      size="medium"
                      placeholder="请输入内容"
                      clearable
                      @input="search_ref"
                    />
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </el-collapse-item>
        </el-collapse>
      </el-col>
    </el-row>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
      @selection-change="handleSelectionChange"
    >
      <el-table-column
        type="selection"
        width="55"
        align="center"
      />
      <el-table-column align="center" label="ID">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="封面" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 60px; height: 60px"
            :src="scope.row.cover"
            :preview-src-list="[scope.row.cover]"
          />
        </template>
      </el-table-column>
      <el-table-column label="海报" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 60px; height: 60px"
            :src="scope.row.poster"
            :preview-src-list="[scope.row.poster]"
          />
        </template>
      </el-table-column>
      <el-table-column label="名称" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.name }}</span>
        </template>
      </el-table-column>
      <el-table-column label="基础信息" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.basicInfo }}</span>
        </template>
      </el-table-column>
      <el-table-column label="评分" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.score }}</span>
        </template>
      </el-table-column>
      <el-table-column label="播放" align="center">
        <template slot-scope="scope">
          <span
            class="el-icon-video-play play"
            @click="play(scope.row.trailer)"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button-group>
            <el-button
              size="small"
              type="primary"
              @click="updateVideo(scope.row._id)"
            >编辑</el-button>
            <el-button
              size="small"
              type="danger"
              @click="deleteVideo(scope.row._id)"
            >删除</el-button>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.page_size"
      @pagination="fetchData"
    />
    <el-dialog
      :visible.sync="dialogTableVisible"
      width="650px"
      @close="closeVideo"
    >
      <div class="video_box">
        <video :src="videoSrc" controls />
      </div>
    </el-dialog>
  </div>
</template>

<script>
// import { getList } from '@/api/table'
import Api from '@/request/api/api'
import Pagination from '@/components/Pagination'
import _ from 'lodash'

export default {
  components: { Pagination },
  filters: {
    wavType(val) {
      var num = parseInt(val)
      switch (num) {
        case 0: return '专业'
        case 1: return '用户'
        case 2: return '上传未知'
        default: return '未知'
      }
    }
  },
  data() {
    return {
      list: null, // 列表
      listLoading: true,
      total: 0,
      activeNames: [],
      listQuery: {
        page: 1,
        page_size: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: undefined
      },
      search: {
        id: undefined,
        lyric_id: undefined,
        raw_lyric_id: undefined
      },
      videoSrc: null,
      selectedData: [],
      dialogTableVisible: false,
      curr_lrc: ''
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 获取列表
    fetchData() {
      this.listLoading = true
      Api.getMovieList({ ...this.listQuery, ...this.search }).then(response => {
        if (response.code === 0) {
          this.total = response.total
          this.list = response.rows
          this.listLoading = false
        } else {
          this.$notify.error({ title: '错误', message: response.message })
        }
      }).catch(() => {
        this.$message({ type: 'error', showClose: true, message: '请求失败！' })
      })
    },
    // 筛选事件
    search_ref: _.debounce(function() {
      this.fetchData()
    }, 300),
    // 选择事件
    handleSelectionChange(rows) {
      this.selectedData = rows
    },
    // 播放视频
    play(url) {
      this.videoSrc = url
      this.dialogTableVisible = true
      const vid = document.querySelector('.video_box video')
      vid.play()
    },
    // 关闭视频
    closeVideo() {
      const vid = document.querySelector('.video_box video')
      vid.pause()
    },
    // 删除视频
    deleteVideo(id) {

    },
    // 编辑视频
    updateVideo(id) {

    }
  }
}
</script>

<style lang="scss" scoped>
  .movielist{
    .filter-container {
      padding-bottom: 10px !important;
    }
    .search_title {
      line-height: 38px;
      text-align: center;
    }
    .search_box {
      min-height: 20px;
      padding: 19px;
      background-color: #fbfbfb;
      border: 1px solid #e3e3e3;
      border-radius: 4px;
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
    }
    /deep/ .el-collapse-item__content {
      padding-bottom: 0px;
    }
    /deep/ .vl-notify-content {
      padding: 0px !important;
    }
    /deep/ .vl-notify-btns {
      display: none;
    }
    /deep/ .vl-notify-mask {
      z-index: 9999 !important;
    }
    /deep/ .vl-notify-main {
      z-index: 10000 !important;
    }
    /deep/ .fa-play-circle {
      font-size: 24px;
      color: #3a8ee6;
      cursor: pointer;
    }
    /deep/ .el-collapse-item__header {
      line-height: 30px;
      height: 30px;
      padding: 0 10px;
      border: 1px solid #EBEEF5;
    }
    /deep/ .el-collapse-item__wrap {
      border-left: 1px solid #EBEEF5;
      border-right: 1px solid #EBEEF5;
    }
    .lrc_box {
      line-height: 30px;
      text-align: center;
      min-height: 20px;
      padding: 19px;
      margin-bottom: 20px;
      background-color: #f5f5f5;
      border: 1px solid #e3e3e3;
      border-radius: 4px;
      -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
      box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.05);
    }
    .play{
      font-size: 25px;
      cursor: pointer;
    }
    .video_box{
      width: 600px;
      height: 350px;
      video{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
