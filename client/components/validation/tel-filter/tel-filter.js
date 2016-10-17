export default (tel) => {
    // Format for Belarus
    if (!tel || tel.length !== 9) {
        return '+375 (xx) xxx-xx-xx';
    }

    return `+375 (${tel.slice(0, 2)}) ${tel.slice(2, 5)}-${tel.slice(5, 7)}-${tel.slice(7, 9)}`;
};
