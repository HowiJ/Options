( function(global) {
    H = function(id) {
        var elements = [],
            element, type;
        //o: ø
        //p: π

        if (id[0] == '#') {
            var identifier = id.slice(1);
            element = document.getElementById(identifier);
                elements.push(element);
        } else if (id[0] == '.') {
            var identifier = id.slice(1);
            element = document.getElementsByClassName(identifier);
            for (var i = 0; i < element.length; i++) {
                elements.push(element[i]);
            }

        } else {
            element = document.getElementsByTagName(id);
            for (var i = 0; i < element.length; i++) {
                elements.push(element[i]);
            }
        }
        // var element = document.getElementById(id);

        //Object for H
        function H () {
            this.element = elements;
            // this.initialized = true;
        }

        /////////////////////////////////////////////////
        /////////////////////////////////////////////////
        //SELECTION
        H.prototype.select = function(str) {
            var selected = [];
            if (str[0] == '#') {
                elements = [];
                var identifier = id.slice(1);
                element = document.getElementById(identifier);
                elements.push(element);
            } else if (str[0] == '.' ) {
                var tag = str.slice(1);
                for (var ele in elements) {
                    element = elements[ele].getElementsByClassName(tag);
                    for (var i = 0; i < element.length; i++) {
                        selected.push(element[i]);
                    }
                }
                elements = selected;
            } else {
                for (var ele in elements) {
                    element = elements[ele].getElementsByTagName(str);
                    for (var i = 0; i < element.length; i++) {
                        selected.push(element[i]);
                    }
                }
                elements = selected;
            }
            return new H();
        }
        H.prototype.first = function(str) {
            if (str[0] == '#') {
                elements = [];
                var identifier = id.slice(1);
                element = document.getElementById(identifier);
                elements.push(element);
            } else if (str[0] == '.' ) {
            var identifier = id.slice(1);
                element = elements[0].getElementsByClassName(identifier)[0];
                elements = [element];
            } else {
                element = elements[0].getElementsByClassName(str)[0];
                elements = [element];
                elements = selected;
            }
        }


        /////////////////////////////////////////////////
        /////////////////////////////////////////////////
        //SCROLLING
        H.prototype.popTo = function(identifier) {
            var scroll = 0,
                iden,
                scrollToThis;

            if (identifier[0] == "#") {
                iden = identifier.slice(1);
                scrollToThis = document.getElementById(iden);

                scroll = scrollToThis.offsetTop;
                window.scrollTo(0,scroll);
            } else if (identifier[0] == ".") {
                iden = identifier.slice(1);
                scrollToThis = document.getElementsByClassName(iden)[0];

                scroll = scrollToThis.offsetTop;
                window.scrollTo(0,scroll);
            } else {
                iden = identifier;
                scrollToThis = document.getElementsByTagName(iden)[0];

                scroll = scrollToThis.offsetTop;
                window.scrollTo(0,scroll);
            }

            return this;
        }
        H.prototype.scrollTo = function(identifier, duration) {
            var start       = global.pageYOffset,
                to          = 0,
                distance    = 0,
                dpt         = 100,
                current     = global.pageYOffset,
                toElement;

                if (identifier[0] == "#") {
                    sliced = identifier.slice(1);
                    toElement = document.getElementById('first');
                    to = toElement.offsetTop;
                    distance = to - start;
                    dpt = distance/duration;
                    if (dpt < 0) {
                        dpt = Math.floor(dpt);
                    } else {
                        dpt = Math.ceil(dpt);
                    }
                } else if (identifier[0] == '.') {
                    sliced = identifier.slice(1);
                    toElement = document.getElementsByClassName(sliced)[0];
                    console.log(toElement);
                    to = toElement.offsetTop;
                    distance = to - start;
                    dpt = distance/duration;
                    if (dpt < 0) {
                        dpt = Math.floor(dpt);
                    } else {
                        dpt = Math.ceil(dpt);
                    }
                } else {
                    toElement = document.getElementsByTagName(identifier)[0];
                    to = toElement.offsetTop;
                    distance = to - start;
                    dpt = distance/duration;
                    if (dpt < 0) {
                        dpt = Math.floor(dpt);
                    } else {
                        dpt = Math.ceil(dpt);
                    }
                }
                var counter = 0;
                var previous = global.pageYOffset;
                var loop = setInterval(function() {
                    if (counter > duration || (previous == current && counter != 0) ) {
                        clearInterval(loop);
                        counter = 0;
                    }
                    previous = global.pageYOffset;
                    counter++;

                    window.scrollTo(0, current+dpt);
                    current = global.pageYOffset;
                }, 1)

            console.log(start);
            return this;
        }

        /////////////////////////////////////////////////
        /////////////////////////////////////////////////
        //EVENT LISTENERS
        H.prototype.click = function(callback) {
            for (ele in elements) {
                elements[ele].addEventListener("click", function() {
                    callback();
                })
            }

            return this;
        }
        H.prototype.hover = function(hovIn, hovOut) {
            for (ele in elements) {
                elements[ele].addEventListener("mouseover", function() {
                    hovIn();
                })
                elements[ele].addEventListener("mouseout", function() {
                    hovOut();
                })
            }

            return this;
        }

        /////////////////////////////////////////////////
        /////////////////////////////////////////////////
        //CSS PROPERTIES, GET AND SET
        H.prototype.width = function(width) {
            for (ele in elements) {
                if (width) {
                    if (typeof width === 'number') {
                        width += 'px';
                    }
                    elements[ele].style.width = width;
                } else {
                    console.log('Width:', elements[ele].offsetWidth);
                }
            }

            return this;
        }
        H.prototype.height = function(height) {
            for (ele in elements) {
                if (height) {
                    if (typeof height === 'number') {
                        height += 'px';
                    }
                    elements[ele].style.height = height;
                } else {
                    console.log('Height:', elements[ele].offsetHeight);
                }
            }
            // console.log(elements[ele].offsetHeight);
            return this;
        }
        H.prototype.attr = function(attr, value) {
            for (ele in elements) {
                if (value && typeof attr == 'string') {
                    elements[ele].style[attr] = value;
                } else {
                    console.log(elements[ele].style[attr]);
                }
            }

            return this;
        }
        H.prototype.background = function(background) {
            for (ele in elements) {
                if (background) {
                    elements[ele].style.background = background;
                } else {
                    console.log('Background:', elements[ele].style.background);
                }
            }

            return this;
        }

        /////////////////////////////////////////////////
        /////////////////////////////////////////////////
        return new H();
    }
} (window) )
