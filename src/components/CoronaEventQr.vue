<template>
  <div class="CoronaEventQr">
    <form v-show="showInput" class="py-3" @submit.prevent="doGenerate">
      <div class="row">
        <div class="col-md-4">
          <p class="input-group">
            <label for="locationtype">Veranstaltungstyp</label>
            <select id="locationtype" class="form-control" v-model="locationType" required="">
              <option value="">Bitte auswählen</option>
              <option v-for="type in locationTypes" v-bind:value="type.value" :key="type.value">{{type.name}}</option>
            </select>
          </p>
        </div>
        <div class="col-md-4">
          <p class="input-group">
            <label for="description">Event-Beschreibung</label>
            <input class="form-control" id="description" v-model="description" type="text" />
          </p>
        </div>
        <div class="col-md-4">
          <p class="input-group">
            <label for="address">Ort / Anschrift</label>
            <input class="form-control" id="address" v-model="address" type="text" />
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p class="input-group">
            <label for="defaultcheckinlength">auto. Abmelden nach</label>
            <input class="form-control" id="defaultcheckinlength" v-model="defaultCheckInLength" type="text" />
          </p>
        </div>
        <div class="col" v-if="needTimeValue">
          <p class="input-group">
            <label for="starttime-date">Start-Datum</label>
            <input class="form-control" id="starttime-date" v-model="startDate" type="text" />
          </p>
        </div>
        <div class="col" v-if="needTimeValue">
          <p class="input-group">
            <label for="starttime-time">Start-Zeit</label>
            <input class="form-control" id="starttime-time" v-model="startTime" type="text" />
          </p>
        </div>
        <div class="col" v-if="needTimeValue">
          <p class="input-group">
            <label for="endtime-date">Ende-Datum</label>
            <input class="form-control" id="endtime-date" v-model="endDate" type="text" />
          </p>
        </div>
        <div class="col" v-if="needTimeValue">
          <p class="input-group">
            <label for="endtime-time">Ende-Zeit</label>
            <input class="form-control" id="endtime-time" v-model="endTime" type="text" />
          </p>
        </div>
      </div>

      <div class="d-flex justify-content-end">
        <button type="submit" class="btn btn-primary btn-sm">erstelle QR-Code</button>
      </div>
    </form>
    

    <div class="qrResultWrap">
      <nav class="toolbar" :class="{showInput: showInput}">
        <button type="button" class="showInputs btn btn-secondary btn-sm" @click="showInput = !showInput">Zeige Eingabe</button>
        <button type="button" class="toggleFullscreen btn btn-secondary btn-sm" @click="toggleFullscreen">Vollbild</button>
      </nav>
      <canvas id="eventqrcode" class="eventqr-preview"></canvas>
    </div>
  </div>
</template>

<script>
import FullscreenHelper from '../modules/FullscreenHelper';
import QRCodeSystemCopy from '../modules/QRCodeSystemCopy';
import moment from 'moment';
export default {
  name: 'CoronaEventQr',
  mounted() {
    this.loadExistingData();
    if(!window.CORONA_EVENT_QR_EXTERN) window.CORONA_EVENT_QR_EXTERN = {}
    window.CORONA_EVENT_QR_EXTERN.load = this.loadExistingData;
    window.CORONA_EVENT_QR_EXTERN.getFormatedDate = this.getFormatedDate;
    window.CORONA_EVENT_QR_EXTERN.getFormatedTime = this.getFormatedTime;
  },
  computed: {
    needTimeValue() {
      let needTimeValueIds = [9,10,11,12,2];
      return needTimeValueIds.includes(this.locationType);
    }
  },
  data: () =>({
    showInput: false,

    description: '',
    address: '',
    defaultCheckInLength: '',
    locationType: 0,
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',

    qrCodeBgPath: 'assets/img/pt-poster-1.0.0.png',

    locationTypes: [
      { value: 3, name: 'Einzelhandel' },
      { value: 4, name: 'Gastronomiebetrieb' },
      { value: 5, name: 'Handwerksbetrieb' },
      { value: 6, name: 'Arbeitsstätte' },
      { value: 7, name: 'Bildungsstätte' },
      { value: 8, name: 'öffentliche Gebäude' },
      { value: 1, name: 'anderer Ort' },
      { value: 9, name: 'Kulturveranstaltung' },
      { value: 10, name: 'Vereinsaktivität' },
      { value: 11, name: 'private Feier' },
      { value: 12, name: 'Gottesdienst' },
      { value: 2, name: 'anderes Event' },
    ]
  }),
  methods:{
    getFormatedDate(dateObj) {
      return moment(dateObj).format('DD.MM.YYYY');
    },
    getFormatedTime(dateObj) {
      return moment(dateObj).format('hh:mm');
    },
    loadExistingData() {
      if(window.CORONA_EVENT_QR) {
        this.description = window.CORONA_EVENT_QR.description;
        this.address = window.CORONA_EVENT_QR.address;
        this.defaultCheckInLength = window.CORONA_EVENT_QR.defaultCheckInLength;
        this.locationType = window.CORONA_EVENT_QR.locationType;
        this.startDate = window.CORONA_EVENT_QR.startDate;
        this.startTime = window.CORONA_EVENT_QR.startTime;
        this.endDate = window.CORONA_EVENT_QR.endDate;
        this.endTime = window.CORONA_EVENT_QR.endTime;
        if(window.CORONA_EVENT_QR.qrCodeBgPath) {
          this.qrCodeBgPath = window.CORONA_EVENT_QR.qrCodeBgPath;
        }
      }
      setTimeout(() => {
        QRCodeSystemCopy.GenerateQRCode(this.qrCodeBgPath);
      },10);//needed in order to take vue-cycle 
    },
    doGenerate() {
      QRCodeSystemCopy.GenerateQRCode(this.qrCodeBgPath);
    },
    toggleFullscreen() {
      if(FullscreenHelper.isFullscreen()) {
        FullscreenHelper.exitFullscreen();
      } else {
        FullscreenHelper.doFullscreen();
      }
    }
    
  }
}
</script>