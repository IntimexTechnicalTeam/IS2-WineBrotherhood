var storage = {
  set (key, value) {
    localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value));
  },
  get (key) {
    var v = localStorage.getItem(key);
    if (v != null) {
      try {
        return JSON.parse(v);
      } catch (e) {
        return v;
      }
    } else {
      return null;
    }
  },
  remove (key) {
    localStorage.removeItem(key);
  }
};
export default storage;
