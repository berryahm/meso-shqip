# Mëso shqip! – installierbare App (PWA)

Lernspiel für Kinder (5–10 Jahre): Standard-Albanisch mit Bilderquiz, Anfangsbuchstaben,
Silbenpuzzle, ky/kjo und Pronomen-Würfelspiel in 7 Themen, dazu ein gesprochener Modus für 1–4 Jahre.
Läuft nach dem ersten Öffnen komplett offline.

## Inhalt des Ordners

| Datei | Zweck |
|---|---|
| `index.html` | Das ganze Spiel (Inhalte, Design, Logik) |
| `manifest.webmanifest` | Name, Farben und Icons für die Installation |
| `sw.js` | Service Worker: speichert alles auf dem Gerät, damit es offline läuft |
| `icons/` | App-Icons (192, 512, maskable für Android, 180 für iPhone) |
| `fonts/` | Schriften Grandstander und Andika, lokal eingebunden (offline, keine Anfragen an Google) |

## 1. Online stellen

Eine PWA braucht eine **HTTPS-Adresse**. Kostenlose Möglichkeiten:

- **Netlify:** Auf app.netlify.com/drop den ganzen Ordner `meso-shqip-app` ins Fenster ziehen.
- **GitHub Pages:** Ordnerinhalt in ein Repository hochladen, unter *Settings → Pages* aktivieren.
- **Cloudflare Pages:** Ordner als neues Projekt hochladen („Direct Upload“).

Wichtig: Es muss der **Inhalt** des Ordners hochgeladen werden, also `index.html` liegt ganz oben.

## 2. Auf dem Gerät installieren

- **Android (Chrome):** Seite öffnen → oben erscheint der Knopf **„Instalo“**
  (oder Menü ⋮ → „App installieren“).
- **iPhone / iPad (Safari):** Seite öffnen → Teilen-Symbol → **„Zum Home-Bildschirm“**.
  Die App zeigt diesen Hinweis selbst an.
- **Computer (Chrome / Edge):** Installations-Symbol rechts in der Adressleiste.

Nach dem ersten Öffnen funktioniert die App ohne Internet. Fortschritt (Sterne) und
Einstellungen bleiben auf dem Gerät gespeichert.

## 3. Neue Version veröffentlichen

1. Dateien ändern (z. B. neue Wörter in `index.html`).
2. In `sw.js` die Zeile `const VERSION = 'meso-shqip-v1';` hochzählen (`v2`, `v3`, …).
3. Alles neu hochladen.

Beim nächsten Öffnen lädt die App die neue Version im Hintergrund und zeigt
„Ka një version të ri. · Rifresko“. Ein laufendes Spiel wird nicht unterbrochen.

## Stimmen für die Kleinen (1–4 Jahre)

Im Modus **1–4 vjeç** spricht die App: „Prek & dëgjo“, „Ku është?“ und „Si quhet?“.
Die meisten Handys haben keine albanische Computerstimme, deshalb werden die Wörter
einmal von einem Menschen aufgenommen (36 kurze Aufnahmen, ca. 10 Minuten).

1. App öffnen → **1–4 vjeç** → „Për prindërit: incizo zërat“ (Rechenaufgabe als Eltern-Sperre).
2. Bei jedem Wort 🎙 antippen, Wort sagen, ⏹ antippen. Die App schneidet Stille ab und gleicht die Lautstärke an.
3. Diese Aufnahmen hört nur das Kind auf **diesem Gerät**.
4. Damit **alle** Kinder die Stimme hören: „Shkarko zërat (ZIP)“ → den Ordner `audio/` aus dem ZIP
   hier ins Projekt kopieren (ersetzt `audio/index.json`), `VERSION` in `sw.js` hochzählen, hochladen.

Reihenfolge beim Abspielen: eigene Aufnahme auf dem Gerät → mitgelieferte Datei in `audio/` →
albanische Gerätestimme (falls vorhanden). Fehlt alles, zeigt die App das Wort als Text für die Eltern.

## 4. Weg in die App-Stores (später)

- **Google Play / Microsoft Store:** Mit pwabuilder.com aus der Online-Adresse ein Store-Paket
  erzeugen (Google-Play-Entwicklerkonto nötig, einmalig 25 USD).
- **Apple App Store:** Braucht eine native Hülle (z. B. Capacitor oder das iOS-Paket von PWABuilder),
  einen Mac mit Xcode und ein Apple-Developer-Konto (99 USD pro Jahr). Für die Kategorie „Kinder“
  gelten strenge Regeln: keine Werbung von Drittanbietern, kein Tracking.

## Lizenzen

Schriften: Grandstander und Andika, SIL Open Font License 1.1 (siehe `fonts/OFL-*.txt`).
Bilder im Spiel sind System-Emojis des jeweiligen Geräts.
