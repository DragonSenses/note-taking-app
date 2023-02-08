# Simple Note Taking Application

Personally use this often as a: 

- clipboard (to save links)
- to-do list
- vocabulary list
- quote saver
- reminders 

# Description

This is a simple and lightweight CRUD application made with just pure 
HTML5, CSS3, and JavaScript. 

The app's purpose is to help the user jot down notes
during their browser session, study or even use as a
clipboard to store information.

This app uses [local storage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) to save notes right in the browser! 
  - More details about [Local Storage](#local-storage) 

---

## The app satisfies the following use cases:

**User can perform CRUD operations**

- User can ***C**reate* notes
- User can ***R**ead* notes
- User can ***U**pdate* notes
- User can ***D**elete* notes

Notes are stored in the browser so it can be accessed across different browser sessions using the same web browser (Chrome, FireFox, Edge, Opera). 

# Technologies:
HTML5, CSS3, JavaScript

# How to use

1. **Create** a note by adding a title where *Name&mldr;* is located, and add your note text where *Start writing&mldr;* is located 
2. **Read** Notes
3. **Update** the note by hovering over the top right of the field to see the control panel to `Edit` or `Delete`
4. After pressing `Edit`, the note can be changed by typing into the fields highlighted with a different color, then go back to the control panel in the top right and press `Save`
5. **Delete** a note by hovering over the top right of it and press `Delete` and a window message will pop up to confirm, then press `OK`

# Instructions to run a local copy

1. Clone this repository and save to a folder on a laptop (or on GitHub click `Code` > `Download Zip`)

2. Go to the directory (folder) where code is stored 

    ```powershell
    cd /note-taking-app
    ```

3. Open up `index.html` in any browser
    * bookmark the page to use later

---

## Color Customization

You can change the colors to suit your preferences, all located in `styles.css` file under the
`:root`. 
- Colors are saved under a css variable
- e.g., to change background color of the
page modify the hexadecimal value after `--bg:` and replace `#02001D` to color of your choice.

## Local Storage

- Shared between all tabs and windows from the same origin 
  - If data is set in one window, the change becomes visible in another one.
- The data does not expire. It remains after the browser restart and even after OS reboot
- Only have to be on the same origin (domain/port/protocol), the URL path can be different
- Limit is around ~5mb, depending on the browser

So closing/opening the browser or opening the same page in a different window will not remove
the data. 

To see the notes being saved in ***Local Storage*** 
- press `[F12]` to open Developer Tools in the browser, while app (or `index.html`) is open
- Click `Application` tab
- On the left panel go to `Storage` > `Local Storage`

*Note*: If you do not want notes to be saved on your browser, try opening the app in "incognito" or "private browsing" so data will be cleared when the last "private" tab is closed

* To assuage any privacy concerns, notes are not saved in any other place other than your own local machine's web browser