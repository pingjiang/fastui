<template>
<canvas class="pixelcanvas" :width="width" :height="height" :style="styles"
  @mousedown="handleDown"></canvas>
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

function drawRect(imageData, x, y, width, height) {
  //
}

export default {
  name: 'PixelCanvas',
  props: {
    size: {
      type: Number,
      default: 10,
    },
    scale: {
      type: Number,
      default: 1,
    },
    width: [Number, String],
    height: [Number, String],
    mode: {
      type: String,
      default: 'brush',
    }, // : 'source-over', eraser: 'destination-out'
    color: {
      type: String,
      default: '#df4b26',
    },
  },
  data() {
    return {
      drawing: false,
    };
  },
  computed: {
    viewWidth() {
      return this.width * this.scale;
    },
    viewHeight() {
      return this.height * this.scale;
    },
    styles() {
      const { viewWidth, viewHeight } = this;
      return {
        width: viewWidth + 'px',
        height: viewHeight + 'px',
      };
    },
  },
  watch: {
    color(val) {
      this.context.fillStyle = val;
    },
  },
  mounted() {
    this.context = this.$el.getContext('2d');
    const ctx = this.context;
    ctx.imageSmoothingEnabled = false;

    ctx.fillStyle = this.color;
    ctx.fillRect(1, 1, 1, 1);
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
      const x = clamp(e.pageX - bbox.left, 0, this.viewWidth);
      const y = clamp(e.pageY - bbox.top, 0, this.viewHeight);
      console.log('xy', x, y);
      return { x, y };
    },
    storeLastPoint(pos) {
      this._lastXY = pos;
    },
    saveSnapshot() {
      this._snapshot = this.context.getImageData(0, 0, this.width, this.height);
    },
    restoreSnapshot() {
      this.context.putImageData(this._snapshot, 0, 0);
    },
    drawStart(e) {
      this.drawing = true;
      const ctx = this.context;
      ctx.fillStyle = this.color;
      ctx.globalCompositeOperation = this.mode === 'brush' ? 'source-over' : 'destination-out';
      this.saveSnapshot();

      this.storeLastPoint(this.getDownPoint(e));
    },
    draw(e) {
      const ctx = this.context;
      const xy = this.getDownPoint(e);

      this.restoreSnapshot();
      this.fillRect(ctx, this._lastXY, xy);
      // this.fill(ctx, xy, this.size);
    },
    drawEnd(e) {
      this.drawing = false;
      const xy = this.getDownPoint(e);
      this.storeLastPoint(xy);
    },

    fill(ctx, xy, size) {
      ctx.fillRect(xy.x, xy.y, size, size);
    },

    line(ctx, lastXY, xy, size) {
      //
    },

    // this._lastXY
    fillRect(ctx, lastXY, xy) {
      const x = Math.min(lastXY.x, xy.x);
      const y = Math.min(lastXY.y, xy.y);
      const width = Math.abs(xy.x - lastXY.x);
      const height = Math.abs(xy.y - lastXY.y);
      ctx.fillRect(x, y, width, height);
    },
  },
};
</script>

<style lang="less">
.pixelcanvas {
  image-rendering: pixelated;
}
</style>
