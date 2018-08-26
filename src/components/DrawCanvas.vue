<template>
<canvas class="drawcanvas" :width="width" :height="height" @mousedown="handleDown"></canvas>
</template>

<script>

function bindDraggable(e, opts) {
  if (opts.onDragStart && opts.onDragStart(e) === false) {
    return;
  }

  const beforeX = e.pageX;
  const beforeY = e.pageY;

  const moveHandler = (evt) => {
    const deltaX = evt.pageX - beforeX;
    const deltaY = evt.pageY - beforeY;
    
    opts && opts.onDragging(evt, deltaX, deltaY);
  };

  const upHandler = (evt) => {
    const deltaX = evt.pageX - beforeX;
    const deltaY = evt.pageY - beforeY;

    opts && opts.onDragEnd(evt, deltaX, deltaY);

    document.removeEventListener('mousemove', moveHandler, false);
    document.removeEventListener('mouseup', upHandler, false);
  };

  document.addEventListener('mousemove', moveHandler, false);
  document.addEventListener('mouseup', upHandler, false);
}

function clamp(v, a, b) {
  return v < a ? a : (v > b ? b : v);
}

export default {
  name: 'DrawCanvas',
  props: {
    width: [Number, String],
    height: [Number, String],
    mode: {
      type: String,
      default: 'brush',
    }, // : 'source-over', eraser: 'destination-out'
    strokeStyle: {
      type: String,
      default: '#df4b26',
    },
    lineJoin: {
      type: String,
      default: 'round',
    },
    lineWidth: {
      type: [Number, String],
      default: 10,
    },
    scale: Number,
  },
  data() {
    return {
      drawing: false,
    };
  },
  watch: {
    strokeStyle(val) {
      this.context.strokeStyle = val;
    },
    lineJoin(val) {
      this.context.lineJoin = val;
    },
    lineWidth(val) {
      this.context.lineWidth = val;
    },
  },
  mounted() {
    this.context = this.$el.getContext('2d');

    this.context.strokeStyle = this.strokeStyle;
    this.context.lineJoin = this.lineJoin;
    this.context.lineWidth = this.lineWidth;
  },
  methods: {
    handleDown(e) {
      this.drawing = true;

      bindDraggable(e, {
        // canDrag:
        onDragStart: evt => this.drawStart(evt),
        onDragging: evt => this.draw(evt),
        onDragEnd: evt => this.drawEnd(evt),
      });
    },
    getDownPoint(e) {
      const bbox = this.$el.getBoundingClientRect();
      const x = clamp(e.pageX - bbox.left, 0, this.$el.clientWidth);
      const y = clamp(e.pageY - bbox.top, 0, this.$el.clientHeight);
      return { x, y };
    },
    storeLastPoint(pos) {
      this._lastXY = pos;
    },
    drawStart(e) {
      this.drawing = true;
      this.storeLastPoint(this.getDownPoint(e));
      this.context.globalCompositeOperation = this.mode === 'brush' ? 'source-over' : 'destination-out';
    },
    draw(e) {
      const ctx = this.context;
      const xy = this.getDownPoint(e);

      ctx.beginPath();
      ctx.moveTo(this._lastXY.x, this._lastXY.y);
      ctx.lineTo(xy.x, xy.y);
      ctx.closePath();
      ctx.stroke();

      this.storeLastPoint(xy);
    },
    drawEnd(e) {
      this.drawing = false;
      // layer.batchDraw();
    },
  },
};
</script>

<style lang="less">
// 
</style>
