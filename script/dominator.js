'use strict'

var dominator = {

assemble_row: function (row_index, col_count, row_count, arg) {
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
},

assemble_table: function (wrapper,row_count,col_count,bool) {
  for (var i = 0; i < row_count; i++) {
    var row = this.assemble_row(i,col_count,row_count,bool)
    wrapper.appendChild(row)
  }
  return wrapper
},

assemble_trace : function (table) {
  var self = this
  table.forEach( function (row) {
    self.show_cell_path(row[0],row[1],row[2])
  })
},

show_cell_path: function (row,col,dir) {
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
},

open_connector_modal: function (target_el) {
  document.querySelector('#connector-modal').style.display = 'block'
},

close_connector_modal: function (target_el) {
  document.querySelector('#connector-modal').style.display = 'none'
},

mark_cell :function (cell_el) {
  var arr = cell_el.getAttribute('data-toggle').split(',')
  var active = cell_el.getAttribute('active')
  var open = ( active || arr[0]==='grey'  ) ? true : false
  if (!active) {
    cell_el.style.backgroundColor = arr[0]
    cell_el.innerHTML = (open) ? cell_el.innerHTML : ''
    cell_el.setAttribute('data-toggle',arr.reverse().join(','))
  }
  return open
},

label_cell : function (cell_el) {
  var active = cell_el.getAttribute('active')
  if (!active) {
    cell_el.innerHTML = tracer.count.toString()
  }
},

assimilate_cells : function (node_arr,id_arr) {
  for (var i = 0; i < node_arr.length; i++) {
    if (!node_arr[i].getAttribute('active')) {
      node_arr[i].setAttribute('active',id_arr[i].toString())
    }
  }
}

} // end dominator object
