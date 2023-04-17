function switchColors(newPrimaryColor, newPrimaryColor2, newFavicon) {
    const root = document.documentElement.style;

    // Convert new colors from hex to RGB
    const primaryColorRGB = hexToRgb(newPrimaryColor);
    const primaryColor2RGB = hexToRgb(newPrimaryColor2);

    // Set the new color values as CSS variables
    root.setProperty('--primary-color', newPrimaryColor);
    root.setProperty('--primary-color-2', newPrimaryColor2);
    root.setProperty('--primary-color-rgb', primaryColorRGB);
    root.setProperty('--primary-color-2-rgb', primaryColor2RGB);

    // Change the favicon
    changeFavicon(newFavicon);

    // Save the chosen colors to local storage
    saveColorChoice(newPrimaryColor, newPrimaryColor2, newFavicon);
}

function hexToRgb(hex) {
    // Remove '#' from the beginning of the hex code
    hex = hex.replace('#', '');

    // Convert hex to RGB
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `${r}, ${g}, ${b}`;
}

function saveColorChoice(primaryColor, primaryColor2, newFavicon) {
    const colors = {
        primaryColor: primaryColor,
        primaryColor2: primaryColor2
    };

    // Save the chosen colors and favicon to local storage
    localStorage.setItem('colors', JSON.stringify(colors));
    localStorage.setItem('favicon', newFavicon);
}

function changeFavicon(newFavicon) {
    // Create a new link element for the favicon
    const link = document.createElement('link');
    link.rel = 'icon';
    link.type = 'image/x-icon';
    link.href = newFavicon;

    // Replace the old favicon with the new one
    const oldLink = document.querySelector('link[rel="icon"]');
    if (oldLink) {
        document.head.removeChild(oldLink);
    }
    document.head.appendChild(link);
}

function applySavedColors() {
    const savedColors = localStorage.getItem('colors');
    const savedFavicon = localStorage.getItem('favicon');

    if (!savedColors) {
        switchColors('#f5df4e', '#F2D61E', './../img/favicons/favicon-yellow.png');
    }

    if (savedColors) {
        const colors = JSON.parse(savedColors);

        switchColors(colors.primaryColor, colors.primaryColor2, savedFavicon);
    }
}


// Apply saved colors on page load
applySavedColors();

