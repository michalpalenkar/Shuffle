const computedSize = () => {
    if ( typeof document !== 'undefined' ) {
        const element = document.body || document.documentElement;
        const e = document.createElement('div');
        e.style.cssText = 'width:10px;padding:2px;box-sizing:border-box;';
        element.appendChild(e);
        const { width } = window.getComputedStyle(e, null);
        element.removeChild(e);
        return width === '10px';
    } else {
        return false
    }
}

export default ret = computedSize();
