const { ipcRenderer } = require('electron');

const onMouseup = () => {
    const selectedString = window.getSelection().toString();

    selectedString.length > 0 && ipcRenderer.send('selection', selectedString);
    document.removeEventListener('mouseup', onMouseup);
}

window.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('selectstart', () => {
        document.addEventListener('mouseup', onMouseup);
    });
});