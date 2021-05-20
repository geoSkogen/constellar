'use strict'

var canvas = document.getElementById('gameboard');
var grid = document.getElementById('matrix');


function assemble_row(row_index, col_count, arg) {
  var wrapper = document.createElement('section')
  var pre_str = arg ? '' : 'grid'
  var name_str = arg ? 'cell' : 'gridspace'
  var data_str = arg ? 'gray,gainsboro' : 'brickred,cornflowerblue'
  for (var i = 0; i < col_count; i++){
    var cell = document.createElement('div')
    cell.id = pre_str + '_' + row_index.toString() + '_' + i.toString()
    cell.className = name_str
    cell.setAttribute('data-toggle',data_str)
    wrapper.appendChild(cell)
  }
  wrapper.id = pre_str + '_' + row_index.toString()
  wrapper.className = 'row flex-row flex-center'
  return wrapper
}

function assemble_table(wrapper,row_count,col_count,bool) {
  for (var i = 0; i < row_count; i++) {
    var row = assemble_row(i,col_count,bool)
    wrapper.appendChild(row)
  }
  return wrapper
}

function show_cell_path(row,col,dir) {
  var el = {}
  var axis = true
  switch (dir) {
    case 0 :
      row--
      break
    case 1 :
      axis = false
      break
    case 2 :
      break
    case 3 :
      col--
      axis = false
      break
    default :

  }

  el = document.querySelector(
    '#grid_' + row.toString() + '_' + col.toString()
  )

  if (axis) {
    el.style.borderLeft = '2px solid black'
  } else {
    el.style.borderTop = '2px solid black'
  }
}

// DOM render elements

assemble_table(canvas,24,24,true)
assemble_table(grid,23,23,false)

// DOM register events

document.querySelectorAll('.cell').forEach( function (cell) {

  cell.addEventListener('click', function (event) {

    var arr = this.getAttribute('data-toggle').split(',')
    this.style.backgroundColor = arr[0]
    this.setAttribute('data-toggle',arr.reverse().join(','))
   })
})
