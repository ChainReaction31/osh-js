OSH.Utils = function() {}

OSH.Utils.randomUUID = function() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
    return v.toString(16);
  });
};

OSH.Utils.isOpera = function() {
  return (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
};

OSH.Utils.isFirefox = function() {
  return typeof InstallTrigger !== 'undefined';
};

OSH.Utils.isSafari = function() {
  return Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
};

OSH.Utils.isIE = function() {
  return /*@cc_on!@*/false || !!document.documentMode;
};

OSH.Utils.isChrome = function() {
  return !!window.chrome && !!window.chrome.webstore;
};

OSH.Utils.isBlink = function() {
  return (isChrome || isOpera) && !!window.CSS;
};