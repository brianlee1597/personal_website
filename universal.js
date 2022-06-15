const select = (tag) => document.querySelector(tag);
const win_listen = (act, cb) => window.addEventListener(act, cb);
const doc_listen = (act, cb) => document.addEventListener(act, cb);

(() => new class Cursor {
  constructor () {
    this.cursor = select('.cursor');
    this.cursor_inner = select('.cursor2');

    doc_listen('mousemove', (e) => {
      const x = e.clientX;
      const y = e.clientY;
      this.cursor_inner.style.left = x + 'px';
      this.cursor_inner.style.top = y + 'px';
      this.cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`;
    });
    
    doc_listen('mousedown', () => {
      this.cursor.classList.add('click');
      this.cursor_inner.classList.add('cursorinnerhover');
    });
    
    doc_listen('mouseup', () => {
      this.cursor.classList.remove('click');
      this.cursor_inner.classList.remove('cursorinnerhover');
    });
  }
})();