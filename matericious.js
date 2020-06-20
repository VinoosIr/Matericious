/**
 * Matericious v0.10.1 (https://matericious.com/)
 * Copyright 2019 Matericious Authors
 * Licensed under MIT (https://github.com/Matericious/Matericious/blob/master/LICENSE)
 */

"use strict";

function ready(callback) {
  if (document.readyState != "loading") callback();else if (document.addEventListener) 
    document.addEventListener("DOMContentLoaded", callback);else 
    document.attachEvent("onreadystatechange", function () {
      if (document.readyState == "complete") callback();
    });
}

function call($class, $event, $func) {
  var elems = document.querySelectorAll($class);
  elems.forEach(function (elem) {
    addEvent(elem, $event, $func);
  });
}

function $handle(callback) {
  try {
    callback();
  } catch (err) {}
}

function $getChild(parent, child, n) {
  return document.querySelectorAll("".concat(parent, " ").concat(child))[n];
}

function $get(e) {
  return document.querySelector(e);
}

function $all(e) {
  return document.querySelectorAll(e);
}

function hexToRgb(hex) {
  var bigint = parseInt(hex, 16);
  var r = bigint >> 16 & 255;
  var g = bigint >> 8 & 255;
  var b = bigint & 255;
  return "".concat(r, ",").concat(g, ",").concat(b);
}

function hasClass(el, className) {
  $handle(function () {
    if (el.classList) return el.classList.contains(className);else return !!el.className.match(new RegExp("(\\s|^)".concat(className, "(\\s|$)")));
  });
}

function $addClass(el, className) {
  if (el.classList) el.classList.add(className);else if (!hasClass(el, className)) el.className += " ".concat(className);
}

function $removeClass(el, className) {
  if (el.classList) el.classList.remove(className);else if (hasClass(el, className)) {
    var reg = new RegExp("(\\s|^)".concat(className, "(\\s|$)"));
    el.className = el.className.replace(reg, " ");
  }
}

function addEvent(object, type, callback) {
  if (object == null || typeof object == 'undefined') return;

  if (object.addEventListener) {
    object.addEventListener(type, callback, false);
  } else if (object.attachEvent) {
    object.attachEvent("on" + type, callback);
  } else {
    object["on" + type] = callback;
  }
}

function is_string(data) {
  if (typeof data === "string" || data instanceof String) {
    return true;
  } else {
    return false;
  }
}

Element.prototype.remove = function () {
  this.parentElement.removeChild(this);
};

NodeList.prototype.remove = HTMLCollection.prototype.remove = function () {
  for (var i = this.length - 1; i >= 0; i--) {
    if (this[i] && this[i].parentElement) {
      this[i].parentElement.removeChild(this[i]);
    }
  }
}; 


function nesting() {
  var large_screen = 992,
      medium_screen = 768,
      small_screen = 500;

  function checkNesting() {
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    var num_to_nest;
    var nest_menu = $get("#nesting");
    var nest_menu_btn = $get('[open-menu="nesting"]');
    var nest_btns = $all(".appbar .nest");

    if (w < large_screen) {
      num_to_nest = 1;

      if (w <= medium_screen && w >= small_screen) {
        num_to_nest = 2;
      } else if (w <= small_screen) {
        num_to_nest = nest_btns.length;
      }
    }

    nest_btns.forEach(function (nest_btn) {
      nest_btn.style.display = "block";
    });
    nest_menu.innerHTML = "";
    nest_menu_btn.style.display = "none";
    nest_btns.forEach(function (nest_btn) {
      console.log("running");
      var icon_btn_title = nest_btn.getAttribute("title");
      var icon_title;

      if (icon_btn_title != null) {
        icon_title = " ".concat(icon_btn_title);
      } else {
        icon_title = "";
      }

      nest_menu_btn.style.display = "inline-block";
      nest_btn.style.display = "none";
      nest_menu.innerHTML += "<li><a href=\"#\">".concat(nest_btn.innerHTML + icon_title, "</a></li>");
    });
  }

  checkNesting();
  addEvent(window, "resize", function () {
    checkNesting();
  });
}

function collapse() {
  var $curr_scr_pos = window.pageYOffset;

  if ($get('.dense')) {
    $get('.dense').style.top = $pre_Scr_Pos > $curr_scr_pos ? "0" : "-65px";
    $pre_Scr_Pos = $curr_scr_pos;
  }

  if ($get('.collapse')) {
    $get('.collapse .title').style.display = $curr_scr_pos < 5 ? "inline-block" : "none";
    $get('.collapse').style.width = $curr_scr_pos < 5 ? "100%" : "115px";
    $get('.collapse').style.borderRadius = $curr_scr_pos < 5 ? "0" : "0px 0px 30px 0px";
  }
}

var $pre_Scr_Pos = window.pageYOffset;

window.onscroll = function () {
  collapse();
}; 


function BottomNavigation() {
  call(".bottomNav > [nav-id]", "click", function () {
    var target = this.getAttribute("nav-id"),
        btn = $get("[nav-id='" + target + "']");
        targetContent = $get("[nav-content='" + target + "']");
    var divs = $all(".bottomNav > [nav-id]");
    var contents = $all("[nav-content]");
    [].forEach.call(divs, function (el) {
      $removeClass(el, 'active');
    });
    [].forEach.call(contents, function (el) {
      $removeClass(el, 'active');
    });
    $addClass(btn, 'active');
    $addClass(targetContent, 'active');
  });
} 


function dialog(data) {
  var _this = this;

  data = !data ? '' : data;
  this.id = is_string(data) ? data : data.target;
  this.data = data;

  this.$timer = function (time, callback) {
    var id = _this.id;
    var timer;

    if (time != null) {
      timer = setInterval(function () {
        clearInterval(timer);
        callback(id);
      }, time);
    }
  };

  this.build = function () {};

  this.close = function (id) {
    alert(id);
    close(id);
  };

  function close(id) {
    var dialog_ID = $get(id),
        _doc = $get('body'),
        _loader = $get("".concat(id, " .loader")),
        _created_overlay = $get(".".concat(id.replace(/#/g, ""), ".dialog_overlay")),
        modal_class = dialog_ID.className;

    $removeClass(_doc, "dialog-open");

    if (_loader != null) {
      _created_overlay = $get("".concat(id, " .loader_overlay"));
    } else {
      if (modal_class.includes("full") || modal_class.includes("sheet")) {
        $removeClass(dialog_ID, "active");
      } else {
        $removeClass(dialog_ID, "expandUp");
      }
    }

    $handle(function () {
      _created_overlay.remove();
    });
    return;
  }

  this.open = function (time) {
    var id = _this.id;

    var modal_ID = $get(id),
        _doc = $get("body"),
        modal_class = modal_ID.className;

    if (modal_class.includes("overlay")) {
      var overlay_div = document.createElement("div");

      _doc.appendChild(overlay_div);

      $addClass(overlay_div, "dialog_overlay");
      $addClass(overlay_div, id.replace(/#/g, ""));
    }

    $addClass(_doc, "dialog-open");

    if (modal_class.includes("full") || modal_class.includes("sheet")) {
      $addClass(modal_ID, "active");
    } else {
      $addClass(modal_ID, "expandUp");
    }

    _this.$timer(time, close);

    call("".concat(id, " .close"), "click", function () {
      close(id);
    });
    call(".dialog_overlay", "click", function () {
      close(id);
    });
  };
} 


function drawer() {
  var _drawer = $get(".drawer"),
      _doc = $get("body");

  if (_drawer.className.includes("active")) {
    _drawer.style.left = 0 + "px";
    _doc.style.marginLeft = _drawer.offsetWidth + "px";
  }

  if (_drawer.className.includes("permanent")) {
    $addClass(_drawer, "notrans");
    $addClass(_doc, "notrans");
    _drawer.style.left = 0 + "px";
    _doc.style.marginLeft = _drawer.offsetWidth + "px";
    return;
  } else {
    call("[drawer]", "click", function () {
      var _navType = this.getAttribute("drawer");

      var clickTimes = 0;

      var _drawer = $get(".drawer"),
          _doc = $get("body");

      if (_drawer.style.left != 0 + "px") {
        if (_navType == "overlay") {
          _drawer.style.left = 0 + "px";
          $addClass(_doc, "overlay");
          $addClass(_doc, "fadeIn");
          document.addEventListener("click", clickOutSide, true);
        } else if (_navType == "push") {
          _drawer.style.left = 0 + "px";
          _doc.style.marginLeft = _drawer.offsetWidth + "px";
        }
      } else {
        close();
      }

      function clickOutSide() {
        clickTimes++;
        close();
      }

      function close() {
        _drawer.style.left = "-" + 100 + "%";
        $addClass(_doc, "fadeOut");
        $removeClass(_doc, "fadeIn");
        $removeClass(_doc, "fadeOut");
        $removeClass(_doc, "overlay");
        _doc.style.marginLeft = 0 + "px";
        document.removeEventListener("click", clickOutSide, true);
        return;
      }
    });
    call("[drop]", "click", function () {
      var target = this.getAttribute("drop");
      var targetID = $get("#" + target);
      var nav = $get("#" + target + "> nav").offsetHeight;
      var cur_h = targetID.style.height;

      if (targetID.className.includes("active")) {
        targetID.style.height = 0;
        $removeClass(targetID, 'active');
      } else {
        targetID.style.height = nav + 'px';
        $addClass(targetID, 'active');
      }
    });
  }
}

; 

function ExpansionPanel() {
  call(".panel > [expan]", "click", function () {
    var target = this.getAttribute("expan"),
        details = $get("#" + target),
        summary = $get(".panel > [expan=" + target + "]"),
        contentHeight = $get("#" + target + " > .content").offsetHeight,
        icon = $get("[expan=" + target + "] > i"),
        cusIcon = !icon.getAttribute("cus-icon") ? 'keyboard_arrow_up' : icon.getAttribute("cus-icon");
    var icons = ['keyboard_arrow_down', cusIcon];

    if (summary.className.includes("active")) {
      icon.innerHTML = icons[0]; 

      details.style.height = 0 + "px";
      $removeClass(summary, 'active');
    } else {
      icon.innerHTML = icons[1]; 

      details.style.height = contentHeight + "px";
      $addClass(summary, 'active');
    }
  });
} 


var Colors = {
  red: {
    base: '#F44336',
    light: {
      1: '#EF5350',
      2: '#E57373',
      3: '#EF9A9A',
      4: '#FFCDD2',
      5: '#FFEBEE'
    },
    dark: {
      1: '#E53935',
      2: '#D32F2F',
      3: '#C62828',
      4: '#B71C1C'
    }
  },
  pink: {
    base: '#E91E63',
    light: {
      1: '#EC407A',
      2: '#F06292',
      3: '#F48FB1',
      4: '#F8BBD0',
      5: '#FCE4EC'
    },
    dark: {
      1: '#D81B60',
      2: '#C2185B',
      3: '#AD1457',
      4: '#880E4F'
    }
  },
  purple: {
    base: '#9C27B0',
    light: {
      1: '#AB47BC',
      2: '#BA68C8',
      3: '#CE93D8',
      4: '#E1BEE7',
      5: '#F3E5F5'
    },
    dark: {
      1: '#8E24AA',
      2: '#7B1FA2',
      3: '#6A1B9A',
      4: '#4A148C'
    }
  },
  deepPurple: {
    base: '#673AB7',
    light: {
      1: '#7E57C2',
      2: '#9575CD',
      3: '#B39DDB',
      4: '#D1C4E9',
      5: '#EDE7F6'
    },
    dark: {
      1: '#5E35B1',
      2: '#512DA8',
      3: '#4527A0',
      4: '#311B92'
    }
  },
  indigo: {
    base: '#3F51B5',
    light: {
      1: '#5C6BC0',
      2: '#7986CB',
      3: '#9FA8DA',
      4: '#C5CAE9',
      5: '#E8EAF6'
    },
    dark: {
      1: '#3949AB',
      2: '#303F9F',
      3: '#283593',
      4: '#1A237E'
    }
  },
  blue: {
    base: '#2196F3',
    light: {
      1: '#42A5F5',
      2: '#64B5F6',
      3: '#90CAF9',
      4: '#BBDEFB',
      5: '#E3F2FD'
    },
    dark: {
      1: '#1E88E5',
      2: '#1976D2',
      3: '#1565C0',
      4: '#0D47A1'
    }
  },
  lightBlue: {
    base: '#03A9F4',
    light: {
      1: '#29B6F6',
      2: '#4FC3F7',
      3: '#81D4FA',
      4: '#B3E5FC',
      5: '#E1F5FE'
    },
    dark: {
      1: '#039BE5',
      2: '#0288D1',
      3: '#0277BD',
      4: '#01579B'
    }
  },
  cyan: {
    base: '#00BCD4',
    light: {
      1: '#26C6DA',
      2: '#4DD0E1',
      3: '#80DEEA',
      4: '#B2EBF2',
      5: '#E0F7FA'
    },
    dark: {
      1: '#00ACC1',
      2: '#0097A7',
      3: '#00838F',
      4: '#006064'
    }
  },
  teal: {
    base: '#009688',
    light: {
      1: '#26A69A',
      2: '#4DB6AC',
      3: '#80CBC4',
      4: '#B2DFDB',
      5: '#E0F2F1'
    },
    dark: {
      1: '#00897B',
      2: '#00796B',
      3: '#00695C',
      4: '#004D40'
    }
  },
  green: {
    base: '#4CAF50',
    light: {
      1: '#66BB6A',
      2: '#81C784',
      3: '#A5D6A7',
      4: '#C8E6C9',
      5: '#E8F5E9'
    },
    dark: {
      1: '#43A047',
      2: '#388E3C',
      3: '#2E7D32',
      4: '#1B5E20'
    }
  },
  lightGreen: {
    base: '#8BC34A',
    light: {
      1: '#9CCC65',
      2: '#AED581',
      3: '#C5E1A5',
      4: '#DCEDC8',
      5: '#F1F8E9'
    },
    dark: {
      1: '#7CB342',
      2: '#689F38',
      3: '#558B2F',
      4: '#33691E'
    }
  },
  lime: {
    base: '#CDDC39',
    light: {
      1: '#D4E157',
      2: '#DCE775',
      3: '#E6EE9C',
      4: '#F0F4C3',
      5: '#F9FBE7'
    },
    dark: {
      1: '#C0CA33',
      2: '#AFB42B',
      3: '#9E9D24',
      4: '#827717'
    }
  },
  yellow: {
    base: '#FFEB3B',
    light: {
      1: '#FFEE58',
      2: '#FFF176',
      3: '#FFF59D',
      4: '#FFF9C4',
      5: '#FFFDE7'
    },
    dark: {
      1: '#FDD835',
      2: '#FBC02D',
      3: '#F9A825',
      4: '#F57F17'
    }
  },
  amber: {
    base: '#FFC107',
    light: {
      1: '#FFCA28',
      2: '#FFD54F',
      3: '#FFE082',
      4: '#FFECB3',
      5: '#FFF8E1'
    },
    dark: {
      1: '#FFB300',
      2: '#FFA000',
      3: '#FF8F00',
      4: '#FF6F00'
    }
  },
  orange: {
    base: '#FF9800',
    light: {
      1: '#FFA726',
      2: '#FFB74D',
      3: '#FFCC80',
      4: '#FFE0B2',
      5: '#FFF3E0'
    },
    dark: {
      1: '#FB8C00',
      2: '#F57C00',
      3: '#EF6C00',
      4: '#E65100'
    }
  },
  deepOrange: {
    base: '#FF5722',
    light: {
      1: '#FF7043',
      2: '#FF8A65',
      3: '#FFAB91',
      4: '#FFCCBC',
      5: '#FBE9E7'
    },
    dark: {
      1: '#F4511E',
      2: '#E64A19',
      3: '#D84315',
      4: '#BF360C'
    }
  },
  brown: {
    base: '#795548',
    light: {
      1: '#8D6E63',
      2: '#A1887F',
      3: '#BCAAA4',
      4: '#D7CCC8',
      5: '#EFEBE9'
    },
    dark: {
      1: '#6D4C41',
      2: '#5D4037',
      3: '#4E342E',
      4: '#3E2723'
    }
  },
  grey: {
    base: '#9E9E9E',
    light: {
      1: '#BDBDBD',
      2: '#E0E0E0',
      3: '#EEEEEE',
      4: '#F5F5F5',
      5: '#FAFAFA'
    },
    dark: {
      1: '#757575',
      2: '#616161',
      3: '#424242',
      4: '#212121'
    }
  },
  blueGrey: {
    base: '#607D8B',
    light: {
      1: '#78909C',
      2: '#90A4AE',
      3: '#B0BEC5',
      4: '#CFD8DC',
      5: '#ECEFF1'
    },
    dark: {
      1: '#546E7A',
      2: '#455A64',
      3: '#37474F',
      4: '#263238'
    }
  },
  black: {
    base: '#000000'
  },
  white: {
    base: '#FFFFFF'
  }
};

function gradient() {
  $all("[gradient]").forEach(function (elem) {
    var gradientType = !elem.getAttribute("gradient-type") ? 'linear, to right' : elem.getAttribute("gradient-type"),
        gradient_type = gradientType.split(",")[0] ? gradientType.split(",")[0] : '',
        gradient_pos = gradientType.split(",")[1] ? gradientType.split(",")[1] + ", " : '';
    var gradient = "".concat(gradient_type, "-gradient(").concat(gradient_pos);
    var data_colors = elem.getAttribute("gradient").split(" ");

    for (var color in data_colors) {
      if (data_colors[color].startsWith("#", 0)) {
        data_colors[color] = data_colors[color].replace(/#/g, "");
      } else {
        var color_array = data_colors[color].split("-");

        try {
          data_colors[color] = getColor(color_array[0], color_array[1] != null ? color_array[1] : null, color_array[2] != null ? color_array[2] : null).replace(/#/g, "");
        } catch (err) {}
      }
    }

    data_colors.forEach(function (color) {
      gradient += "rgba(".concat(hexToRgb(color), ", 1), ");
    });
    gradient = gradient.slice(0, gradient.length - 2);
    gradient += ")";
    elem.style.background = gradient;
  });
}

function getColor(color, rang, shade) {
  return shade != null ? Colors[color][rang][shade] : Colors[color].base;
} 


function input_controls() {
  $all('.indeterminate > input').forEach(function (item) {
    return item.indeterminate = true;
  });
}

function loader(data) {
  var _this2 = this;

  data = !data ? '' : data;
  this.id = is_string(data) ? data : data.target;
  this.data = data;

  this.$timer = function (time, callback) {
    var id = _this2.id;
    var timer;

    if (time != null) {
      timer = setInterval(function () {
        clearInterval(timer);
        callback(id);
      }, time);
    }
  };

  this.close = function () {
    var id = $get(_this2.id);
    $removeClass(id, 'slideDownIn');
    $removeClass($get("body"), 'overlay');
  };

  this.is = function (che, def) {
    return !che ? def : che;
  };

  this.open = function (time) {
    _this2.id = (_this2.id.charAt(0) == '#' ? '' : '#') + _this2.id;
    var id = $get(_this2.id);
    if (data.overlay) $addClass($get("body"), 'overlay');
    $addClass(id, 'slideDownIn');

    _this2.$timer(time, _this2.close);
  };

  this.build = function (time) {
    var name = _this2.id = 'sys_gen_loader_id',
        size = _this2.is(_this2.data.size, 'small'),
        type = _this2.is(_this2.data.type, 'circular'),
        pos = [_this2.is(_this2.data.pos.vertical, ''), _this2.is(_this2.data.pos.horizontal, '')],
        title = size != 'small' ? _this2.is(_this2.data.title, 'Please wait') : '',
        subtext = size == 'large' && type == 'circular' ? _this2.is(_this2.data.subtext, 'This page is loading') : '',
        theme = _this2.is(_this2.data.theme, ''),
        _class = pos[0] + ' ' + pos[1] + ' ' + (type == 'linear' ? 'lin' : '') + ' ' + theme;

    var small_template = '<div id="' + name + '" class="loader small ' + _class + '"><progress class="' + type + '"/></div>',
        large_template = '<div id="' + name + '" class="loader large ' + _class + '"><label class="title">' + title + '</label><span class="subtext">' + subtext + '</span> <progress class="' + type + '"/></div>',
        base_template = '<div id="' + name + '" class="loader base ' + _class + '"><label class="title">' + title + '</label><progress class="circular"/></div>',
        template = size == 'small' ? small_template : size == 'base' ? base_template : large_template;
    $get('body').innerHTML += template;

    _this2.open(time);
  };
} 


function menu() {
  call("[open-menu]", "mousedown", openMenu);
}

function openMenu() {
  var id = this.getAttribute("open-menu");
  var clickTimes = 0,
      targetBtn = $get("[open-menu=".concat(id, "]")),
      targetMenu = $get("#".concat(id)),
      default_class = targetMenu.className;
  if (default_class.includes("pullDown")) close();
  $addClass(targetMenu, "pullDown");
  setPosition();

  function setPosition() {
    var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth,
        h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight,
        pos = [targetBtn.offsetTop, targetBtn.offsetLeft],
        size = [targetBtn.offsetWidth, targetBtn.offsetHeight],
        menu_size = [targetMenu.offsetWidth, targetMenu.offsetHeight];

    if (!default_class.includes("right") && pos[1] + menu_size[0] > w) {
      $addClass(targetMenu, "right");
    } else if (pos[1] - menu_size[0] > w) {
    }

    targetMenu.style.top = "".concat(size[1] / 2 + pos[0], "px");

    if (default_class.includes("right")) {
      targetMenu.style.right = "".concat(w - pos[1] - size[0], "px");
    } else {
      targetMenu.style.left = "".concat(pos[1], "px");
    }
  }

  document.addEventListener("click", clickOutSide, true);

  addEvent(window, "resize", function () {
    setPosition();
  });

  function clickOutSide(event) {
    clickTimes++;

    if (clickTimes > 1) {
      clickTimes = 0;
      close(targetMenu);
    }
  }

  function close(targetMenu) {
    $addClass(targetMenu, "pullUp");
    $removeClass(targetMenu, "pullDown");
    $removeClass(targetMenu, "pullUp");
    document.removeEventListener("click", clickOutSide, true);
    return;
  }
} 


function ripple() {
  call(".ripple", "mousedown", rippleEffect);
}

function rippleEffect(event) {
  var $self = this,
      elemPos = $self.style.position = "relative",
      rippleDiv = document.createElement('div'),
      pos = [event.pageY - this.offsetTop, event.pageX - this.offsetLeft],
      diameter = Math.min(this.offsetHeight, this.offsetWidth, 100);
  rippleDiv.setAttribute("class", "rippleWave");
  var ripple = $get(".rippleWave");
  if (!elemPos || elemPos === "static") $self.style.position = "relative";
  var rippleDivStyle = "width: ".concat(diameter, "px; \n  height: ").concat(diameter, "px; \n  left: ").concat(pos[1] - diameter / 2, "px;\n  top: ").concat(pos[0] - diameter / 2, "px;");
  rippleDiv.style = rippleDivStyle;
  $self.appendChild(rippleDiv);
  window.setTimeout(function () {
    rippleDiv.parentNode.removeChild(rippleDiv);
  }, 1500);
} 


function select() {
  input_select();
  call(".select-field", "change", input_select);
}

function input_select() {
  $all(".select-field").forEach(function (elem) {
    var select = elem.getElementsByTagName('select')[0];

    if (select.value != " ") {
      $addClass(select, "has-value");
    } else {
      $removeClass(select, "has-value");
    }
  });
} 

function Snackbar(data, callback) {
  var openAni = "slideUpBottom",
      closeAni = "slideDownBottom";

  if (!data.pos) {
    data["pos"] = {
      vertical: "bottom",
      horizontal: "center"
    };
  }

  if (!data.font) data.font = "";
  if (!data.theme) data.theme = "dark";
  if (!data.actionButton) data.actionButton = "";
  if (!data.direction) data.direction = "ltr";
  if (typeof data.showClose === 'undefined') data.showClose = true;

  if (data.pos.vertical == "top") {
    closeAni = "slideDownTop";
    openAni = "slideUpTop";
  }

  var snackbarElem = $get("snackbar");
  snackbarElem.innerHTML = snackbarElem.className = "";
  var snackbarClass = "".concat(data.type, " ").concat(data.pos.vertical, " ").concat(data.pos.horizontal, " ").concat(data.theme);
  snackbarElem.className += snackbarClass;
  
  if (data.direction === "rtl") {
    snackbarElem.className += " rtl";
  }
  
  var style = "";
  
  if (data.font !== "") {
    style = 'style="font-family: ' + data.font + '"';
  }
  
  var snackbarHTML = "<div class=\"snackbar\">\n      <text class=\"text\" " + style + ">" + data.text + "</text>";
  
  if (data.showClose) {
    snackbarHTML += "\n      <button class=\"wave SnackClose\"><i class=\"material-icons\">close</i></button>";
  }
  if (data.actionButton !== "") {
    snackbarHTML += "\n      <button class=\"wave SnackAction\" " + style + ">" + data.actionButton + "</button>";
  }
  snackbarHTML += "\n    </div>";
  
  snackbarElem.innerHTML = snackbarHTML;
  
  if (data.showClose) {
    $get(".SnackClose").addEventListener("click", function () {
      callback(false);
      close();
    });
  }
  if (data.actionButton !== "") {
    $get(".SnackAction").addEventListener("click", function () {
      callback(true);
      close();
    });
  }
  $get(".snackbar").className += " " + openAni;

  function timer(time) {
    var timer;

    if (time != null) {
      timer = setInterval(function () {
        clearInterval(timer);
        close();
      }, time);
    }
  }

  function close() {
    $get(".snackbar").className += " ".concat(closeAni);
  }

  timer(data.time);
} 


function tabs(event) {
  var activePos = $get(".tabs-header .active"),
      border = $get(".border"),
      tab = $get(".tab.active");

  function changePos() {
    var activePos = $get(".tabs-header .active");
    var pos = [activePos.offsetTop, activePos.offsetLeft],
        size = [activePos.offsetWidth, activePos.offsetHeight];
    border.style = "left: ".concat(pos[1], "px; width: ").concat(size[0], "px");
    var scrollH = $get('.tabs-header');
    scrollH.scrollLeft = pos[1];
  }

  changePos();
  var tabHeight = tab.offsetHeight;

  function changeTab(tabID) {
    var tab = $get('.tabs-content .active');
    var newTab = $get(".tabs-content [tab-id=\"".concat(tabID, "\"]"));
    var tabs = $all(".tabs-content .tab");
    tabs.forEach(function (tab) {
      $removeClass(tab, "active");
    });
    $addClass(newTab, 'active');
  }

  function tabClick(event) {
    var tabID = this.getAttribute("tab-id");
    var tabs = $all(".tabs-header a");
    tabs.forEach(function (tab) {
      $removeClass(tab, "active");
    });
    $addClass(this, "active");
    changePos();
    changeTab(tabID);
  }

  call(".tabs-header a", "mousedown", tabClick);
}
//# sourceMappingURL=matericious.js.map


/**
 * jquery-circle-progress - jQuery Plugin to draw animated circular progress bars:
 * {@link http://kottenator.github.io/jquery-circle-progress/}
 *
 * @author Rostyslav Bryzgunov <kottenator@gmail.com>
 * @version 1.2.2
 * @licence MIT
 * @preserve
 */
!function(i){if("function"==typeof define&&define.amd)define(["jquery"],i);else if("object"==typeof module&&module.exports){var t=require("jquery");i(t),module.exports=t}else i(jQuery)}(function(i){function t(i){this.init(i)}t.prototype={value:0,size:100,startAngle:-Math.PI,thickness:"auto",fill:{gradient:["#3aeabb","#fdd250"]},emptyFill:"rgba(0, 0, 0, .1)",animation:{duration:1200,easing:"circleProgressEasing"},animationStartValue:0,reverse:!1,lineCap:"butt",insertMode:"prepend",constructor:t,el:null,canvas:null,ctx:null,radius:0,arcFill:null,lastFrameValue:0,init:function(t){i.extend(this,t),this.radius=this.size/2,this.initWidget(),this.initFill(),this.draw(),this.el.trigger("circle-inited")},initWidget:function(){this.canvas||(this.canvas=i("<canvas>")["prepend"==this.insertMode?"prependTo":"appendTo"](this.el)[0]);var t=this.canvas;if(t.width=this.size,t.height=this.size,this.ctx=t.getContext("2d"),window.devicePixelRatio>1){var e=window.devicePixelRatio;t.style.width=t.style.height=this.size+"px",t.width=t.height=this.size*e,this.ctx.scale(e,e)}},initFill:function(){function t(){var t=i("<canvas>")[0];t.width=e.size,t.height=e.size,t.getContext("2d").drawImage(g,0,0,r,r),e.arcFill=e.ctx.createPattern(t,"no-repeat"),e.drawFrame(e.lastFrameValue)}var e=this,a=this.fill,n=this.ctx,r=this.size;if(!a)throw Error("The fill is not specified!");if("string"==typeof a&&(a={color:a}),a.color&&(this.arcFill=a.color),a.gradient){var s=a.gradient;if(1==s.length)this.arcFill=s[0];else if(s.length>1){for(var l=a.gradientAngle||0,o=a.gradientDirection||[r/2*(1-Math.cos(l)),r/2*(1+Math.sin(l)),r/2*(1+Math.cos(l)),r/2*(1-Math.sin(l))],h=n.createLinearGradient.apply(n,o),c=0;c<s.length;c++){var d=s[c],u=c/(s.length-1);i.isArray(d)&&(u=d[1],d=d[0]),h.addColorStop(u,d)}this.arcFill=h}}if(a.image){var g;a.image instanceof Image?g=a.image:(g=new Image,g.src=a.image),g.complete?t():g.onload=t}},draw:function(){this.animation?this.drawAnimated(this.value):this.drawFrame(this.value)},drawFrame:function(i){this.lastFrameValue=i,this.ctx.clearRect(0,0,this.size,this.size),this.drawEmptyArc(i),this.drawArc(i)},drawArc:function(i){if(0!==i){var t=this.ctx,e=this.radius,a=this.getThickness(),n=this.startAngle;t.save(),t.beginPath(),this.reverse?t.arc(e,e,e-a/2,n-2*Math.PI*i,n):t.arc(e,e,e-a/2,n,n+2*Math.PI*i),t.lineWidth=a,t.lineCap=this.lineCap,t.strokeStyle=this.arcFill,t.stroke(),t.restore()}},drawEmptyArc:function(i){var t=this.ctx,e=this.radius,a=this.getThickness(),n=this.startAngle;i<1&&(t.save(),t.beginPath(),i<=0?t.arc(e,e,e-a/2,0,2*Math.PI):this.reverse?t.arc(e,e,e-a/2,n,n-2*Math.PI*i):t.arc(e,e,e-a/2,n+2*Math.PI*i,n),t.lineWidth=a,t.strokeStyle=this.emptyFill,t.stroke(),t.restore())},drawAnimated:function(t){var e=this,a=this.el,n=i(this.canvas);n.stop(!0,!1),a.trigger("circle-animation-start"),n.css({animationProgress:0}).animate({animationProgress:1},i.extend({},this.animation,{step:function(i){var n=e.animationStartValue*(1-i)+t*i;e.drawFrame(n),a.trigger("circle-animation-progress",[i,n])}})).promise().always(function(){a.trigger("circle-animation-end")})},getThickness:function(){return i.isNumeric(this.thickness)?this.thickness:this.size/14},getValue:function(){return this.value},setValue:function(i){this.animation&&(this.animationStartValue=this.lastFrameValue),this.value=i,this.draw()}},i.circleProgress={defaults:t.prototype},i.easing.circleProgressEasing=function(i){return i<.5?(i=2*i,.5*i*i*i):(i=2-2*i,1-.5*i*i*i)},i.fn.circleProgress=function(e,a){var n="circle-progress",r=this.data(n);if("widget"==e){if(!r)throw Error('Calling "widget" method on not initialized instance is forbidden');return r.canvas}if("value"==e){if(!r)throw Error('Calling "value" method on not initialized instance is forbidden');if("undefined"==typeof a)return r.getValue();var s=arguments[1];return this.each(function(){i(this).data(n).setValue(s)})}return this.each(function(){var a=i(this),r=a.data(n),s=i.isPlainObject(e)?e:{};if(r)r.init(s);else{var l=i.extend({},a.data());"string"==typeof l.fill&&(l.fill=JSON.parse(l.fill)),"string"==typeof l.animation&&(l.animation=JSON.parse(l.animation)),s=i.extend(l,s),s.el=a,r=new t(s),a.data(n,r)}})}});