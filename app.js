function makeEmptyChar(rows, cols) {
  return new Array(rows)
    .fill(null)
    .map(() => new Array(cols).fill(0))
}

function copyChar(charArray) {
  const newChar = []

  for (let r=0; r<charArray.length; r++)
    newChar.push(charArray[r].slice(0))

  return newChar
}

function row2num(row) {
  let n = 0

  for (let c=0; c<row.length; c++)
    n += row[row.length - c - 1] * Math.pow(2, c)

  return n
}

const ROWS = 8
const COLS = 5

const sharedData = {
  characters: [makeEmptyChar(ROWS, COLS)],
  charIndex: 0
}

Vue.component('char-editor', {
  template: '#char-editor-tpl',
  data() {
    return {
      shared: sharedData,
    }
  },
  methods: {
    clear() {
      for (let r=0; r<ROWS; r++)
        this.$set(this.shared.characters[this.shared.charIndex], r, new Array(COLS).fill(0))
    },

    fill() {
      for (let r=0; r<ROWS; r++)
        this.$set(this.shared.characters[this.shared.charIndex], r, new Array(COLS).fill(1))
    }
  },

  computed: {
    sourceCode() {
      const numArray = new Array(ROWS).fill(0)
      for (let r=0; r<ROWS; r++)
        numArray[r] = row2num(this.shared.characters[this.shared.charIndex][r])

      const hexArray = numArray.map(n => `0x${n.toString(16)}`)
      return `const uint8_t charBitmap[] = { ${hexArray.join(', ')} };`
    }
  }
})

Vue.component('char-details', {
  template: '#char-details-tpl',
  props: {
    active: Boolean,
    charIndex: Number
  },
  data() {
    return {
      shared: sharedData,
    }
  },
  methods: {
    activate() {
      this.$emit('activate')
    }
  }
})

Vue.component('lcd-grid', {
  template: '#lcd-grid-tpl',
  props: {
    small: Boolean,
    editable: Boolean,
    charIndex: Number
  },
  data() {
    return {
      shared: sharedData,
      rows: ROWS,
      cols: COLS
    }
  },
  methods: {
    pixelStyles(i) {
      const rc = this.i2rc(i)

      return {'grid-row': rc.r + 1, 'grid-column': rc.c + 1}
    },

    clicked(i) {
      if (!this.editable) return

      const rc = this.i2rc(i)
      const newRow = this.shared.characters[this.charIndex][rc.r].slice(0)
      newRow[rc.c] = Math.abs(newRow[rc.c] - 1)

      this.$set(this.shared.characters[this.charIndex], rc.r, newRow)
    },

    status(i) {
      const rc = this.i2rc(i)
      return this.shared.characters[this.charIndex][rc.r][rc.c] === 1
    },

    i2rc(i) {
      const r = parseInt(i / this.cols)
      const c = i - r*this.cols

      return {r, c}
    }
  }
})

var app = new Vue({
  el: '#app',
  data: {
    shared: sharedData
  },

  methods: {
    newChar() {
      this.shared.characters.push(makeEmptyChar(8, 5))
    },

    delChar() {
      if (this.shared.characters.length === 1)
        this.newChar()

      const oldIndex = this.shared.charIndex

      // set new charIndex if needed
      if (oldIndex >= this.shared.characters.length - 1)
        this.shared.charIndex = this.shared.characters.length - 2

      this.$delete(this.shared.characters, oldIndex)
    },

    duplChar() {
      const newChar = copyChar(this.shared.characters[this.shared.charIndex])
      this.shared.characters.push(newChar)
    },

    setCharIndex(i) {
      this.shared.charIndex = i;
    }
  }
})