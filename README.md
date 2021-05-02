# dynamic corona event qr

Auf der Seite https://www.coronawarn.app/de/eventregistration gibt es die Möglichkeit sich manuell QR-Codes für Veranstaltungen zu erstellen, die mit der Corona-Warn-App gelesen werden können. Leider bietet die Seite keine API oder ähnliches um automatisiert QR-Codes zu erstellen. Deshalb habe ich dieses Projekt erstellt um eine Schaukasten ähnliche Möglichkeit für Unternehmen/Vereine zu bieten automatisiert QR-Codes bereitzustellen.

Das Projekt stellt eine minimale Internetseite bereit, die den QR-Code der Corona Warnapp auf Basis der in der index.html hinterlegten Daten erzeugt. Diese minimale Website kann man dann auf einem Monitor im Schaufenster laufen lassen, um Besuchern das Einschecken an einem Ort oder einer Veranstaltung zu ermöglichen.

https://user-images.githubusercontent.com/6512765/116814204-e9537f80-ab57-11eb-9480-d82470f6b6c9.mp4

Fährt man mit der Maus über den Generierten QR-Code erscheien 2 Button über die der QR-Code bei Bedarf angepasst, bzw. in den Vollbild-Modus des Browsers gewechselt werden kann.

Auf Basis des Projektes ist es auch auf einfache Weise möglich einen sich selbst aktualisierenden QR-Code zu erstellen. Alles was dazu nötig ist, ist ein AJAX Request oder eine zeitgesteuerte Javascript in der index.html zu hinterlegen, welches neue Veranstaltungs-Informationen liefert.

# Hinweise und Ideen zur Nutzung
Nach dem Herunterladen oder auschecken des Projektes muss der Inhalt des `dist` Ordners von einem Webserver ausgespielt werden. Man könnte den Ordner z.B. in einem einfachen PHP-Hosting hochladen (und den Zugriff per htaccess schützen) oder die Seite mit lite-server ausführen.

In der `dist\index.html` sind Beispiele enthalten, wie man die Werte ändern kann und wie auch dynamisch Änderungen möglich sind.

## Project setup
The corona-event-qr project is based on vue app (build with vue-cli). If you want do build or modify the project on your own feel free to do so.
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
