<template>
  <div class="upload-avatar" style="margin-left:180px;">
    <!-- <a-upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      list-type="picture"
      :showUploadList="false"
      @preview="handlePreview"
      @change="handleChange"
      :headers="headers"
    >
      <img :src="user_gender==='1'?'@/assets/images/man.png':'@/assets/images/woman.png'" title="点击上传头像" class="avatar"/>
    </a-upload>
    <a-modal :visible="previewVisible" :footer="null" @cancel="handleCancel">
      <img alt="example" style="width: 100%" :src="previewImage" />
    </a-modal> -->
    
    <img v-if="user_gender==='1'" src="@/assets/images/man.jpg" class="avatar"/>
    <img v-else src="@/assets/images/woman.jpg" class="avatar"/>
  </div>
</template>
<script>
import { getToken } from '@/utils/request'

function getBase64(file) {
return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}
export default {
  props:{
    user_gender:{
      type: String,
      required: true
    }
  },
  data() {
    return {
      previewVisible: false,
      previewImage: '',
      headers: {
        'Authorization': getToken()
      },
    };
  },
  methods: {
    handleCancel() {
      this.previewVisible = false;
    },
    async handlePreview(file) {
      if (!file.url && !file.preview) {
        file.preview = await getBase64(file.originFileObj);
      }
      this.previewImage = file.url || file.preview;
      this.previewVisible = true;
    },
    handleChange({ fileList }) {
      this.fileList = fileList;
    },
  },
};
</script>
<style rel="stylesheet/scss" lang="scss">
.upload-avatar{
    .avatar{
      width: 120px;
      height: 120px;
      display: block;
      border-radius: 50%
    }
  }
</style>
