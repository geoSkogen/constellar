'use strict'

var canvas = document.getElementById('gameboard');
var grid = document.getElementById('matrix');


function assemble_row(row_index, col_count) {
  var wrapper = document.createElement('section')
  for (var i = 0; i < col_count; i++){
    var cell = document.createElement('div')
    cell.id = '_' + row_index.toString() + '_' + i.toString()
    cell.className = 'cell'
    cell.setAttribute('data-toggle','grey,gainsboro')
    wrapper.appendChild(cell)
  }
  wrapper.id = '_' + row_index.toString()
  wrapper.className = 'row flex-row flex-center'
  return wrapper
}

function assemble_table(wrapper,row_count) {
  for (var i = 0; i < row_count; i++) {
    var row = assemble_row(i,24)
    wrapper.appendChild(row)
  }
  return wrapper
}

function assemble_gridline(row_index, col_count) {
  var wrapper = document.createElement('section')
  for (var i = 0; i < col_count; i++){
    var cell = document.createElement('div')
    cell.id = 'grid_' + row_index.toString() + '_' + i.toString()
    cell.className = 'gridspace'
    wrapper.appendChild(cell)
  }
  wrapper.id = 'grid_' + row_index.toString()
  wrapper.className = 'row flex-row flex-center'
  return wrapper
}

function assemble_grid(wrapper,row_count) {
  for (var i = 0; i < row_count; i++) {
    var row = assemble_gridline(i,23)
    wrapper.appendChild(row)
  }
  return wrapper
}

assemble_table(canvas,24)
assemble_grid(grid,23)

 document.querySelectorAll('.cell').forEach( function (cell) {

   cell.addEventListener('click', function (event) {

     var arr = this.getAttribute('data-toggle').split(',')
     this.style.backgroundColor = arr[0]
     this.setAttribute('data-toggle',arr.reverse().join(','))
   })
 })
