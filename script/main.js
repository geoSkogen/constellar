// render DOM elements
var canvas = document.getElementById('gameboard');
var grid = document.getElementById('matrix');

dominator.assemble_table(canvas,24,24,true)
dominator.assemble_table(grid,23,23,false)

// register DOM events
document.querySelectorAll('.cell').forEach( function (cell) {

  cell.addEventListener('click', function (event) {

    var open = dominator.mark_cell(this)
    // if the selected item is being activated . . .
    if (open) {
      // show the menu
      dominator.open_connector_modal(this)
      // add the selected item to queue
      tracer.update_state(this)
      // show its index number
      dominator.label_cell(this)
      /*
      console.log('is processing pair?')
      console.log(tracer.active_pair.length)
      console.log(this.id)
      console.log(tracer.active_nodes)
      */
      // if selected item is added to an existing queue and not IN the queue already
      if ( tracer.active_pair.length && this.id!=tracer.active_nodes[0].id ) {

        //console.log(tracer.active_pair)

        // draw a line -
        // load up the tracer object with the coordinate path between queued items
        tracer.join_points()
        // use the list of coordinate points to draw the lines
        dominator.assemble_trace(tracer.data_trace)
        // record the data
        tracer.update_record()
        // add text attribute to html element, signifying it's activated
        dominator.assimilate_cells(tracer.active_nodes,tracer.active_pair)
        // empty the queue
        tracer.nullify_state()
        // hide the menu
        dominator.close_connector_modal()

      }
      //
    } else {
      // the selected item is being deactivated - hide the menu
      dominator.close_connector_modal(this)
      tracer.nullify_state()
    }
  })
})

document.querySelector('#close-connector-modal').
  addEventListener('click', function (event) {
  // X button
  dominator.close_connector_modal()
})

dominator.select.addEventListener('change', function (event) {
  //
  var target_el = document.querySelector( '#' + tracer.el_ids[this.value] )
  console.log(target_el)
  target_el.click()
})
