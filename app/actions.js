/* actions */

module.exports = {
 
  setBoard: ({rows, columns}) => {
    return {
      type: 'SETBOARD',
      rows: rows,
      columns: columns
    }
  },
  
  viewCard: (elem) => {
    return {
      type: 'VIEWCARD',
      el: elem
    }
  },
  
  startTimer: (time) => {
    return {
      type: 'STARTTIMER',
      time: time
    }
  }
  
}
