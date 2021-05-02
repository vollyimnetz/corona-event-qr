import QRCode from 'qrcode';
import { proto } from './trace_location_pb';
import { encode } from 'uint8-to-base64';
import moment from 'moment';

export default {
  /**
   * copy of GenerateQRCode from https://github.com/corona-warn-app/cwa-website/blob/master/src/assets/js/eventregistration.js#L136
   */
  GenerateQRCode(imagePath) {
    let description = document.getElementById('description').value;
    let address = document.getElementById('address').value;
    let defaultcheckinlength = document.getElementById('defaultcheckinlength').value;
    let locationtype = +document.getElementById('locationtype').value;

    let locationData = new proto.CWALocationData();
    locationData.setVersion(1);
    locationData.setType(locationtype);
    locationData.setDefaultcheckinlengthinminutes(+defaultcheckinlength);

    let crowdNotifierData = new proto.CrowdNotifierData();
    crowdNotifierData.setVersion(1);
    crowdNotifierData.setPublickey('gwLMzE153tQwAOf2MZoUXXfzWTdlSpfS99iZffmcmxOG9njSK4RTimFOFwDh6t0Tyw8XR01ugDYjtuKwjjuK49Oh83FWct6XpefPi9Skjxvvz53i9gaMmUEc96pbtoaA');

    let seed = new Uint8Array(16);
    crypto.getRandomValues(seed);
    crowdNotifierData.setCryptographicseed(seed);

    let traceLocation = new proto.TraceLocation();
    traceLocation.setVersion(1);
    traceLocation.setDescription(description);
    traceLocation.setAddress(address);

    if (locationtype >= 9 || locationtype === 2) {
      let startdate = document.getElementById('starttime-date').value.split('.');
      let starttime = document.getElementById('starttime-time').value;
      traceLocation.setStarttimestamp(moment(startdate.reverse().join('-') + ' ' + starttime).format('X'));

      let enddate = document.getElementById('endtime-date').value.split('.');
      let endtime = document.getElementById('endtime-time').value;
      traceLocation.setEndtimestamp(moment(enddate.reverse().join('-') + ' ' + endtime).format('X'));
    }

    let payload = new proto.QRCodePayload();
    payload.setLocationdata(traceLocation);
    payload.setCrowdnotifierdata(crowdNotifierData);
    payload.setVendordata(locationData.serializeBinary());
    payload.setVersion(1);

    let qrContent = encode(payload.serializeBinary()).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    let canvas = document.getElementById('eventqrcode');
    let ctx = canvas.getContext('2d');
    QRCode.toDataURL('https://e.coronawarn.app?v=1#' + qrContent, {
      margin: 0,
      width: 1100
    }, function (err, qrUrl) {
      if (err) {
        console.error(err);
        return;
      }

      let img = new Image();
      img.onload = function() {
        ctx.width = 1654;
        ctx.height = 2339;
        canvas.width = 1654;
        canvas.height = 2339;
        canvas.style.maxWidth = "100%"

        ctx.drawImage(img, 0, 0);
        let qrImg = new Image();
        qrImg.onload = function() {
          ctx.drawImage(qrImg, 275, 230);
          ctx.font = "30px sans-serif";
          ctx.fillStyle = "black";
          ctx.fillText(description, 225, 1460);
          ctx.fillText(address, 225, 1510);
        }
        qrImg.src = qrUrl;
      }
      img.src = '/assets/img/pt-poster-1.0.0.png';
      //added
      if(imagePath) img.src = imagePath;
    });
  }
}