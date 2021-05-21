'use strict'

var canvas = document.getElementById('gameboard');
var grid = document.getElementById('matrix');


function assemble_row(row_index, col_count, row_count, arg) {
  var wrapper = document.createElement('section')
  var pre_str = arg ? '' : 'grid'
  var name_str = arg ? 'cell' : 'gridspace'
  var bound_str = ( !arg && row_index===row_count-1 ) ? ' gridbound_bottom' : ''
  var data_str = arg ? 'grey,gainsboro' : 'brickred,cornflowerblue'
  for (var i = 0; i < col_count; i++){
    var cell = document.createElement('div')
    bound_str += (i===col_count-1 && !arg) ? ' gridbound_right' : ''
    cell.id = pre_str + '_' + row_index.toString() + '_' + i.toString()
    cell.className = name_str + bound_str
    cell.setAttribute('data-toggle',data_str)
    wrapper.appendChild(cell)
  }
  wrapper.id = pre_str + '_' + row_index.toString()
  wrapper.className = 'row flex-row flex-center'
  return wrapper
}

function assemble_table(wrapper,row_count,col_count,bool) {
  for (var i = 0; i < row_count; i++) {
    var row = assemble_row(i,col_count,row_count,bool)
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
    el.style.borderLeft = '4px solid black'
  } else {
    el.style.borderTop = '4px solid black'
  }
}

function open_connector_modal(target_el) {
  document.querySelector('#connector-modal').style.display = 'block'
  tracer.active_nodes[0] = target_el
  tracer.active_pair[0] = tracer.count
}

function close_connector_modal(target_el) {
  document.querySelector('#connector-modal').style.display = 'none'
  tracer.active_nodes = []
  tracer.active_pair = []
}

function mark_cell(cell_el) {
  var arr = cell_el.getAttribute('data-toggle').split(',')
  var open = ( arr[0]==='grey' ) ? true : false
  //
  cell_el.style.backgroundColor = arr[0]
  cell_el.setAttribute('data-toggle',arr.reverse().join(','))
  return open
}

function label_cell(cell_el) {
  cell_el.innerHTML = tracer.count.toString()
}

// DOM render elements

assemble_table(canvas,24,24,true)
assemble_table(grid,23,23,false)

// DOM register events

document.querySelectorAll('.cell').forEach( function (cell) {

  cell.addEventListener('click', function (event) {

    if ( !tracer.active_pair.length || this.id===tracer.active_nodes[0].id ) {

      var open = mark_cell(this)
      //
      if (open) {
        open_connector_modal(this)
        label_cell(this)
      } else {
        close_connector_modal(this)
      }

    } else {

      console.log('tracer.active_pair has length')
    }

  })
})

document.querySelector('#close-connector-modal').
  addEventListener('click', function (event) {

  close_connector_modal()

})
