'use strict'
var tracer = {
  join_points: function () {

    var dir = null

    var start = this.active_nodes[0].id.slice(
      1,this.active_nodes[0].id.length).
        split('_')

    var end = this.active_nodes[1].id.slice(
      1,this.active_nodes[1].id.length).
        split('_')

    for (var i = 0; i < start.length; i++) {
      start[i] = Number(start[i])
      end[i] = Number(end[i])
    }
    console.log(start)
    console.log(end)
    var vert = end[0]-start[0]
    var horiz = end[1]-start[1]

    if ( vert > 0 ) {
      console.log('positive vert')
      // decrement row index from end to start - line goes up
      // use column start point as x value
      this.link_points( end[0], start[0], start[1], 'north' )
    } else if (vert < 0) {
      console.log('negative vert')
      // decrement row index from start to end - line goes down
      // use column start point as x value
      this.link_points( start[0], end[0], start[1], 'south' )
    } else {
      console.log('no vert')
    }

    if ( horiz > 0 ) {
      console.log('positive horiz')
      this.link_points( end[1],start[1],end[0], 'west' )
    } else if (horiz < 0) {
      console.log('negative horiz')
      this.link_points( start[1], end[1],end[0], 'east' )
    } else {
      console.log('no horiz')
    }
    //console.log(start)
    //console.log(end)
    this.data_points.push([
      this.active_pair[0],
      this.active_pair[1],
      'x'
    ])

  },
  link_points : function (a,b,axis,dir) {
    var dirs = ['north','east','south','west']
    // for travel along the y axis, keep column constant
    // for travel along the x axis, keep row constant
    var axis_index = (!dirs.indexOf(dir)%2) ? 1 : 0
    var var_index = (axis_index) ? 0 : 1

    for (var i = a; i > b; i--) {
      var trace_row = []
      trace_row[axis_index] = axis
      trace_row[var_index] = i

      trace_row[2] = dirs.indexOf(dir)
      console.log('i value is:')
      console.log(i)
      console.log('var index is ')
      console.log(var_index)
      console.log('element ' + (var_index+1).toString() + ' of the following row should be ' + i.toString())
      console.log(trace_row)
      this.data_trace.push(trace_row)
      console.log('rolling data trace')
      console.log(
        this.data_trace[this.data_trace.length-1][0].toString() + '-' +
        this.data_trace[this.data_trace.length-1][1].toString() + '-' +
        this.data_trace[this.data_trace.length-1][2].toString() + '-'
      )
    }
    console.log('summary data trace')
    console.log(this.data_trace)
  },
  update_state : function (target_el) {
    this.active_nodes.push(target_el)
    this.active_pair.push(this.count)
    this.count++
  },
  nullify_state : function () {
    this.active_pair = []
    this.active_nodes = []
  },
  count : 0,
  data_points : [],
  active_pair: [],
  active_nodes : [],
  data_trace : []

}
