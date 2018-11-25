<template>
  <div class="bg">
    <video
      ref="video"
      :width="windowWidth"
      :height="windowHeight"
      playsinline
      autoplay
    ></video>
    <canvas ref="canvas" class="canvas" :width="windowWidth" :height="windowHeight"></canvas>
    <img ref="photo" :src="imageURL" v-show="showPicture" class="picture">
    <div v-if="!cameraOpen" class="open-camera">
      <div @click="openCamera" class='begin'>Begin</div>
    </div>
    <div v-if="showPicture" @click="send" class="send-button">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
    </div>
    <div v-if="showPicture" @click="closePicture" class="close-button">
      <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/></svg>
    </div>
    <div v-if="cameraOpen && !showPicture && cameraOptions.length > 1" @click="toggleCamera" class="toggle-camera">
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M7 7h10v3l4-4-4-4v3H5v6h2V7zm10 10H7v-3l-4 4 4 4v-3h12v-6h-2v4z"/></svg>
    </div>
    <div v-if="!showPicture" @click="takePicture" class="capture-image">
      <div class="capture-image-2">
        <div class="capture-image-3"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
  export default {
    data() {
      return {
        cameraOptions: [],
        selectedCameraOption: null,
        cameraOpen: false,
        showPicture: false,
        imageURL: null,
        context: null,
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
      closePicture() {
        this.context.clearRect(0, 0, this.$refs.canvas.width, this.$refs.canvas.height);
        this.showPicture = false
        this.imageURL = null
      },
      async sendPhoto() {
        const data = new FormData();
        const blob = this.dataURItoBlob(this.imageURL)
        data.append('photo', blob);

        let lat = this.$store.state.location.lat
        let lon = this.$store.state.location.lon
        
        const response = await fetch(`https://backend.photolotto.tk/frontend/v1/tasks/current/solutions/?lat=${lat}&lon=${lon}&username=${'Romek'}`, {
          method: 'POST',
          body: data,
          })
        
        const text = await response.text()
        this.$store.state.success = text.slice(1,-1) 
      },
      dataURItoBlob(dataURI) {
          // convert base64/URLEncoded data component to raw binary data held in a string
          var byteString;
          if (dataURI.split(',')[0].indexOf('base64') >= 0)
              byteString = atob(dataURI.split(',')[1]);
          else
              byteString = unescape(dataURI.split(',')[1]);

          // separate out the mime component
          var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

          // write the bytes of the string to a typed array
          var ia = new Uint8Array(byteString.length);
          for (var i = 0; i < byteString.length; i++) {
              ia[i] = byteString.charCodeAt(i);
          }

          return new Blob([ia], {type:mimeString});
      },
      async send() {
        // make a request with this.imageURL
        this.sendPhoto();
        this.$store.state.phase = 3
        this.$router.push({name: 'home'})
      },
      toggleCamera() {
        let index = this.cameraOptions.indexOf(this.selectedCameraOption) + 1

        if (index >= this.cameraOptions.length) {
          index = 0
        }

        this.selectedCameraOption = this.cameraOptions[index]

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

        this.$refs.video.srcObject = window.stream

        this.cameraOpen = true
      },
      takePicture() {
        this.showPicture = true

        this.context.drawImage(this.$refs.video, 0, 0, this.windowWidth, this.windowWidth * this.$refs.video.videoHeight / this.$refs.video.videoWidth)
        this.imageURL = this.$refs.canvas.toDataURL('image/jpeg')
      },
      async init() {
        const cameraOptions = await navigator.mediaDevices.enumerateDevices()

        this.cameraOptions = cameraOptions.filter(option => option.kind === 'videoinput')
        this.selectedCameraOption = this.cameraOptions[0] // this.cameraOptions.length - 1
      },
    },
    mounted() {
      this.init()
      this.context = this.$refs.canvas.getContext('2d')

       navigator.geolocation.getCurrentPosition(  position => {
          this.$store.state.location.lat = position.coords.latitude
          this.$store.state.location.lon = position.coords.longitude
        })
    },
  }
</script>

<style scoped lang="scss">
  $black: #000;
  $yellow: #ffd500;
  $blue: #2249ac;

  .canvas {
    display: none;
  }

  .bg {
    background: $black;
  }
  .begin{
    width: 200px;
    height: 100px;
    background-color: white;
    border-radius: 50px;
    text-align: center;
    line-height: 100px;
    font-size: 40px;
    color: black;

  }
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
    background: transparent;
    z-index: 1;
  }

  .open-camera p {
    font-size: 27px;
    margin: 0;
  }

  .open-camera .icon {
    width: 128px;
    fill: $blue;
  }

  .toggle-camera {
    position: absolute;
    top: 10px;
    right: 10px;
  }

  .toggle-camera .icon {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    fill: #fff;
    padding: 16px;
  }

  .capture-image {
    position: absolute;
    left: 50%;
    bottom: 25px;
    transform: translateX(-50%);
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 6px solid #fff;
  }

  .capture-image-2 {
    width: 100%;
    height: 100%;
    padding: 5px;
    box-sizing: border-box;
  }

  .capture-image-3 {
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 50%;
  }

  .picture {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .send-button {
    background: $yellow;
    border-radius: 50%;
    bottom: 30px;
    right: 30px;
    position: absolute;
    width: 48px;
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .send-button .icon {
    fill: $blue;
    width: 24px;
    height: 24px;
    transform: translateX(1px);
  }

  .close-button {
    position: absolute;
    top: 10px;
    left: 10px;
  }

  .close-button .icon {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    fill: #fff;
    padding: 16px;
    width: 24px;
    height: 24px;
  }
</style>
