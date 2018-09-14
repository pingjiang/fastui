<template>
<canvas class="drawcanvas pixelated" :width="width" :height="height" @mousedown="handleDown"></canvas>
</template>

<script>
function setupCanvas(canvas) {
  // Get the device pixel ratio, falling back to 1.
  var dpr = window.devicePixelRatio || 1;
  // Get the size of the canvas in CSS pixels.
  var rect = canvas.getBoundingClientRect();
  // Give the canvas pixel dimensions of their CSS
  // size * the device pixel ratio.
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  var ctx = canvas.getContext('2d');
  // Scale all drawing operations by the dpr, so you
  // don't have to worry about the difference.
  ctx.scale(dpr, dpr);
  return ctx;
}

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
    lineCap: {
      type: String,
      default: 'round',
    },
    lineWidth: {
      type: [Number, String],
      default: 30,
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
    const ctx = this.context = this.$el.getContext('2d');
    ctx.translate(0.5, 0.5); //make lines sharp

    ctx.imageSmoothingEnabled = false;       /* standard */
    ctx.mozImageSmoothingEnabled = false;    /* Firefox */
    ctx.oImageSmoothingEnabled = false;      /* Opera */
    ctx.webkitImageSmoothingEnabled = false; /* Safari */
    ctx.msImageSmoothingEnabled = false;     /* IE */
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
      const ctx = this.context;

      ctx.strokeStyle = this.strokeStyle;
      ctx.lineJoin = this.lineJoin;
      ctx.lineCap = this.lineCap;
      ctx.lineWidth = this.lineWidth;

      this.storeLastPoint(this.getDownPoint(e));
      this.context.globalCompositeOperation = this.mode === 'brush' ? 'source-over' : 'destination-out';
    },
    draw(e) {
      const ctx = this.context;
      const xy = this.getDownPoint(e);

      // ctx.beginPath();
      // ctx.strokeStyle = '#000000';
      // ctx.moveTo(this._lastXY.x, this._lastXY.y);
      // ctx.lineTo(xy.x, xy.y);
      // ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = this.strokeStyle;
      ctx.moveTo(this._lastXY.x, this._lastXY.y);
      ctx.lineTo(xy.x, xy.y);
      ctx.stroke();
      ctx.closePath();

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
.pixelated {
  image-rendering: pixelated;
  // image-rendering:optimizeSpeed;             /* Legal fallback */
  // image-rendering:-moz-crisp-edges;          /* Firefox        */
  // image-rendering:-o-crisp-edges;            /* Opera          */
  // image-rendering:-webkit-optimize-contrast; /* Safari         */
  // image-rendering:optimize-contrast;         /* CSS3 Proposed  */
  // image-rendering:crisp-edges;               /* CSS4 Proposed  */
  // image-rendering:pixelated;                 /* CSS4 Proposed  */
  // -ms-interpolation-mode:nearest-neighbor;   /* IE8+           */
}
</style>
