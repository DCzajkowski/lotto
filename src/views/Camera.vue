<template>
  <div>
    <video
      ref="video"
      :width="windowWidth"
      :height="windowHeight"
      playsinline
      autoplay
    ></video>
    <!-- <canvas ref="canvas" :width="windowWidth" :height="windowHeight"></canvas> -->
    <img ref="photo" src="">
    <!-- <button type="button" @click="takePicture">Take Picture</button> -->
    <div v-if="!cameraOpen" @click="openCamera" class="open-camera">
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="12" r="3.2"/><path d="M9 2L7.17 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2h-3.17L15 2H9zm3 15c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
      <p>Open Camera</p>
    </div>
    <div v-if="cameraOpen" @click="toggleCamera" class="toggle-camera">
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/></svg>
    </div>
    <!-- <select v-model="selectedCameraOption">
      <option :value="option" v-for="option in cameraOptions">{{ option.name }}</option>
    </select> -->
  </div>
</template>

<script>
  export default {
    data() {
      return {
        video: null,
        photo: null,
        cameraOptions: [],
        selectedCameraOption: null,
        cameraOpen: false,
        // context: null,
        // canvas: null,
      }
    },
    computed: {
      windowWidth() {
        return window.innerWidth
      },
      windowHeight() {
        return window.innerHeight
      },
    },
    methods: {
      toggleCamera() {
        let index = this.cameraOptions.indexOf(this.selectedCameraOption) + 1

        if (index >= this.cameraOptions.length) {
          index = 0
        }

        console.log(index)

        this.selectedCameraOption = this.cameraOptions[index]

        console.log(this.selectedCameraOption)

        this.openCamera()
      },
      async openCamera() {
        if (window.stream) {
          window.stream.getTracks().forEach(track => track.stop())
        }

        const videoSource = this.selectedCameraOption.deviceId

        window.stream = await navigator.mediaDevices
          .getUserMedia({
            audio: false,
            video: {
              deviceId: videoSource ? { exact: videoSource } : undefined,
            },
          })

        console.log(window.stream)

        this.$refs.video.srcObject = window.stream

        this.cameraOpen = true
      },
      takePicture() {
        // this.context.drawImage(this.video, 0, 0, 400, 300)
        // this.$refs.photo.setAttribute('src', this.canvas.toDataUrl('image/png'))
      },
      async init() {
        const cameraOptions = await navigator.mediaDevices.enumerateDevices()

        this.cameraOptions = cameraOptions.filter(option => option.kind === 'videoinput')
        this.selectedCameraOption = this.cameraOptions[0] // this.cameraOptions.length - 1

        console.log(this.cameraOptions)
        console.log(this.selectedCameraOption)
      },
    },
    mounted() {
      this.init()

      // this.canvas = this.$refs.canvas
      // this.context = this.$refs.canvas.getContext('2d')
    },
  }
</script>

<style scoped>
  /*video {
    outline: 1px solid red;
  }*/

  .open-camera {
    position: absolute;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: #ffd500;
  }

  .open-camera p {
    font-size: 27px;
    margin: 0;
  }

  .open-camera .icon {
    width: 128px;
    fill: #2249ac;
  }

  .toggle-camera {
    position: absolute;
    top: 20px;
    right: 20px;
  }

  .toggle-camera .icon {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    fill: #fff;
    padding: 16px;
  }
</style>
