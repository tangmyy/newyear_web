export class PuBu{
    constructor(options){
        this.$options = options
        this.miniHeight = []
        this.__init()
        
    }

    __init() {
        this.items = document.querySelector(this.$options.el).children
        this.column = this.$options.column
        this.gap = this.$options.gap
        this.itemWidth = (document.querySelector(this.$options.el).offsetWidth - this.gap * 3) / this.column
        this.__render()
    }

    __render() {
        [...this.items].forEach((value, index) => {
            value.style.width = this.itemWidth + "px"
            if (index < this.column) {
            value.style.top = "0px"
            value.style.left = (this.itemWidth + this.gap) * index + "px"
            this.miniHeight.push(value.offsetHeight)
            } else {
                this.miniIndex = this.__getMiniIndex()
                value.style.top = this.miniHeight[this.miniIndex] + this.gap + "px"
                value.style.left = (this.itemWidth + this.gap) * this.miniIndex + "px"
                this.miniHeight[this.miniIndex] = this.miniHeight[this.miniIndex] +value.offsetHeight + this.gap
           }
        })
    }
    __getMiniIndex() {
        return  this.miniHeight.indexOf(Math.min(...this.miniHeight))
    }
}