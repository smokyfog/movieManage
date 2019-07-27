<template>
  <div class="set_movie">
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="影片ID">
        <el-input v-model="form.id" />
      </el-form-item>
      <el-row :gutter="20" class="upload_box">
        <el-col :span="8">
          <el-form-item label="影片">
            <el-upload
              class="upload-poster avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-success="movieSuccess"
              :show-file-list="false"
              multiple
            >
              <img v-if="form.movieUrl" :src="form.movieUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="影片封面:">
            <el-upload
              class="upload-poster avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-success="coverSuccess"
              :show-file-list="false"
              multiple
            >
              <img v-if="form.coverUrl" :src="form.coverUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="影片剧照">
            <el-upload
              class="upload-poster avatar-uploader"
              action="https://jsonplaceholder.typicode.com/posts/"
              :on-preview="handlePreview"
              :on-success="posterSuccess"
              :show-file-list="false"
              multiple
            >
              <img v-if="form.posterUrl" :src="form.posterUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon" />
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
      <el-form-item label="basicInfo">
        <el-input v-model="form.prisedCounts" />
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
        <el-input v-model="form.plotDesc" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        id: '',
        name: '',
        score: '',
        prisedCounts: '',
        basicInfo: '2018 / 美国 / 科幻 / 超级英雄',
        originalName: '原名：xman: The New Mutants',
        releaseDate: '上映时间：2019-08-02(美国)',
        totalTime: '影片时长：未知',
        plotDesc: '',
        directors: '[""]',
        actors: '[""]',
        plotPics: '[""]',
        Pics: [],
        movieUrl: '',
        coverUrl: '',
        posterUrl: ''
      },
      
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
    movieSuccess(res, file) {
      this.form.movieUrl = URL.createObjectURL(file.raw)
    },
    coverSuccess(req, file) {
      this.form.coverUrl = URL.createObjectURL(file.raw)
    },
    posterSuccess(req, file) {
      this.form.posterUrl = URL.createObjectURL(file.raw)
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
}

</style>

