export function filterNullObject(object) {
  const result = [object].map(el => {

    return Object.keys(el).reduce((newObj, key) => {
      const value = el[key];
      if (value !== null) {
        newObj[key] = value;
      }
      return newObj;
    }, {});
  });
  return result[0]
}

export function buildHttpRequest(object) {

  const string = '?' + Object.keys(object).reduce(function (a, k) {
    a.push(k + '=' + encodeURIComponent(object[k]));
    return a;
  }, []).join('&');
  return string;
}

export function isEmptyObject(obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      return false;
    }
  }
  return JSON.stringify(obj) === JSON.stringify({});
}

export function toLowerCase(string) {
  return string.toLowerCase();
}

export function toUpperCase(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

export function sizeOfObject(obj) {
  var size = 0,
    key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};