<template>
  <div class="set_movie">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="文件存放路径">
        <el-input v-model="form.path" placeholder="请先输入文件路径" />
      </el-form-item>
      <el-row :gutter="20" class="upload_box">
        <el-col :span="8">
          <el-form-item label="影片">
            <el-upload
              class="upload-poster avatar-uploader"
              :action="basehost+'/admin/movie/putMovie'"
              :data="{'path':form.path}"
              :on-preview="handlePreview"
              :on-success="movieSuccess"
              :show-file-list="false"
              multiple
            >
              <img v-if="form.trailer" :src="form.trailer" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="影片封面:">
            <el-upload
              class="upload-poster avatar-uploader"
              :action="basehost+'/admin/movie/putMovie'"
              :data="{'path':form.path}"
              :on-preview="handlePreview"
              :on-success="coverSuccess"
              :show-file-list="false"
              multiple
            >
              <img v-if="form.cover" :src="form.cover" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="影片海报">
            <el-upload
              class="upload-poster avatar-uploader"
              :action="basehost+'/admin/movie/putMovie'"
              :data="{'path':form.path}"
              :on-preview="handlePreview"
              :on-success="posterSuccess"
              :show-file-list="false"
              multiple
            >
              <img v-if="form.poster" :src="form.poster" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20" class="upload_box">
        <el-col :span="24">
          <el-form-item label="影片剧照">
            <el-upload
              :action="basehost+'/admin/movie/putMovie'"
              :data="{'path':form.path}"
              list-type="picture-card"
              :on-success="plotPicsSuccess"
              :before-remove="plotPicsRemove"
            >
              <i class="el-icon-plus" />
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="影片名称">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="影片评分">
        <el-input v-model="form.score" />
      </el-form-item>
      <el-form-item label="prisedCounts">
        <el-input v-model="form.prisedCounts" />
      </el-form-item>
      <el-form-item label="标签">
        <el-input v-model="form.basicInfo" />
      </el-form-item>
      <el-form-item label="原名">
        <el-input v-model="form.originalName" />
      </el-form-item>
      <el-form-item label="上映时间">
        <el-input v-model="form.releaseDate" />
      </el-form-item>
      <el-form-item label="影片时长">
        <el-input v-model="form.totalTime" />
      </el-form-item>
      <el-form-item label="影片描述">
        <el-input
          v-model="form.plotDesc"
          type="textarea"
          :autosize="{ minRows: 5, maxRows: 8}"
          placeholder="影片描述"
        />
      </el-form-item>
      <el-col :span="24">
        <el-row :span="24" class="submit_box">
          <el-button type="primary" @click="submitMovie">提交</el-button>
        </el-row>
      </el-col>
    </el-form>
  </div>
</template>

<script>
import Api from '@/request/api/api'
export default {
  data() {
    return {
      form: {
        id: '',
        path: '',
        name: '',
        score: '',
        prisedCounts: '',
        basicInfo: '2018 / 美国 / 科幻 / 超级英雄',
        originalName: '原名：xman: The New Mutants',
        releaseDate: '上映时间：2019-08-02(美国)',
        totalTime: '影片时长：未知',
        plotDesc: '',
        plotPics: [],
        trailer: '',
        cover: '',
        poster: ''
      }
    }
  },
  methods: {
    onSubmit() {
      this.$message('submit!')
    },
    onCancel() {
      this.$message({
        message: 'cancel!',
        type: 'warning'
      })
    },
    handlePreview(file) {
      console.log(file)
    },
    movieSuccess(req, file) {
      if (req.code === 0) {
        this.form.trailer = req.path
        this.$message({ message: req.message, type: 'success' })
      } else {
        this.$message.error(req.message)
      }
    },
    coverSuccess(req, file) {
      if (req.code === 0) {
        this.form.cover = req.path
        this.$message({ message: req.message, type: 'success' })
      } else {
        this.$message.error(req.message)
      }
    },
    posterSuccess(req, file) {
      if (req.code === 0) {
        this.form.poster = req.path
        this.$message({ message: req.message, type: 'success' })
      } else {
        this.$message.error(req.message)
      }
    },
    plotPicsSuccess(req, file) {
      if (req.code === 0) {
        this.form.plotPics.push({ name: file.name, 'url': req.path })
        this.$message({ message: req.message, type: 'success' })
      } else {
        this.$message.error(req.message)
      }
    },
    async plotPicsRemove(data) {
      const url = data.response.path
      const res = await Api.delPlotPics({ path: url })
      if (res.code === 0) {
        this.$message({ message: '删除成功', type: 'success' })
        this._.pullAllBy(this.form.plotPics, [{ url: url }], 'url')
      } else {
        this.$message.error('删除失败！')
        return false
      }
    },
    async submitMovie() {
      const res = await Api.createMovie({ ...this.form })
      console.log(res)
    }
  }
}
</script>

<style lang='scss'>
.set_movie{
  padding: 30px;
  .line{
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .upload_box {
    .el-form-item {
      display: flex;
      align-items: center;
    }
  }
  .submit_box{
    display: flex;
    justify-content: center;
  }
}

</style>

