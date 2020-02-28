class FrameworkMenuDropDown {
    constructor() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        this.isClickBuild = false;
        this.classMenu = 'menu-drop-down';
        this.classArrow = 'bt-arrow';
        this.classMenuText = this.classMenu + '-text';
        this.classShowMobile = 'mobile-show';

        this.$menu = document.querySelectorAll('.' + this.classMenu + ' , ' + '.' + this.classMenuText);
        this.$menuDropDownUl = document.querySelectorAll('.' + this.classMenu + ' ul' + ' , ' + '.' + this.classMenuText + ' ul');
        this.$menuDropDownLi = document.querySelectorAll('.' + this.classMenu + ' ul li' + ' , ' + '.' + this.classMenuText + ' ul li');
        this.$icon = '<span class="' + this.classArrow + '">&nbsp;&nbsp;<span class="fa fa-caret-down" aria-hidden="true"></span></span>';
    }

    build() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        if (this.$menu.length < 1) {
            return;
        }

        this.buildIcon();

        if (!this.isClickBuild) {
            this.isClickBuild = true;
            this.buildClick();
        }

        this.buildClickOut();
    }

    buildIcon() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;
        let $arr = document.querySelectorAll('.' + this.classMenu + ' ul > li > ul' + ' , .' + this.classMenuText + ' ul > li > ul');

        Array.prototype.forEach.call($arr, function (item) {
            if (!document.body.contains(item.parentNode.querySelector('.bt .' + self.classArrow + ' , .link .' + self.classArrow))) {
                item.parentNode.querySelector('.bt , .link').insertAdjacentHTML('beforeend', self.$icon);
            }
        });
    }

    buildClick() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        Array.prototype.forEach.call(this.$menu, function (item) {
            let $bt = item.querySelectorAll('li > .bt , li > .link');
            let $btSubMenu = item.querySelectorAll('ul > li > ul > li > .bt , ul > li > ul > li > .link');

            Array.prototype.forEach.call($bt, function (item) {
                item.addEventListener('click', function () {
                    self.buildClickAction(item);
                });
            });

            Array.prototype.forEach.call($btSubMenu, function (item) {
                item.addEventListener('click', function () {
                    item.parentNode.parentNode.classList.remove(self.classShowMobile);
                });
            });
        });
    }

    buildClickAction(item) {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let $menuChild = item.parentNode.querySelector('ul');

        if (!document.body.contains($menuChild)) {
            return;
        }

        let $menuDropDown = $menuChild.parentNode.parentNode.parentNode;
        let $menuDropDownUl = $menuDropDown.querySelector('ul > li > ul');

        if ($menuDropDownUl.classList.contains(this.classShowMobile)) {
            $menuDropDownUl.classList.remove(this.classShowMobile);
        }

        if ($menuChild.classList.contains(this.classShowMobile)) {
            $menuChild.classList.remove(this.classShowMobile);
        } else {
            $menuChild.classList.add(this.classShowMobile);
        }

        $menuChild.classList.remove(self.classShowMobile);
        $menuChild.style.opacity = 1;
    }

    buildClickOut() {
        /*removeIf(production)*/ objFrameworkDebug.debugMethod(this, objFrameworkDebug.getMethodName()); /*endRemoveIf(production)*/
        let self = this;

        document.addEventListener('click', (event) => {
            if (event.toElement.classList.contains('bt') || event.toElement.classList.contains('link')) {
                return;
            }

            Array.prototype.forEach.call(document.querySelectorAll('.mobile-show'), function (item) {
                item.classList.remove(self.classShowMobile);
            });
        });
    }
}