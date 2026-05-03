const canvas = document.querySelector("[data-signal-canvas]");

if (canvas) {
  const context = canvas.getContext("2d");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let width = 0;
  let height = 0;
  let points = [];
  let animationFrame = null;

  function resize() {
    const ratio = window.devicePixelRatio || 1;
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.floor(width * ratio);
    canvas.height = Math.floor(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);

    const count = Math.max(28, Math.floor((width * height) / 22000));
    points = Array.from({ length: count }, (_, index) => ({
      x: (index * 97) % Math.max(width, 1),
      y: (index * 53) % Math.max(height, 1),
      vx: ((index % 7) - 3) * 0.12,
      vy: (((index + 3) % 5) - 2) * 0.1,
      phase: index * 0.37
    }));
  }

  function drawGrid() {
    context.strokeStyle = "rgba(36, 48, 64, 0.12)";
    context.lineWidth = 1;

    for (let x = 0; x < width; x += 64) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, height);
      context.stroke();
    }

    for (let y = 0; y < height; y += 64) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(width, y);
      context.stroke();
    }
  }

  function draw(time = 0) {
    context.clearRect(0, 0, width, height);
    drawGrid();

    points.forEach((point) => {
      if (!prefersReducedMotion.matches) {
        point.x += point.vx;
        point.y += point.vy;
      }

      if (point.x < -20) point.x = width + 20;
      if (point.x > width + 20) point.x = -20;
      if (point.y < -20) point.y = height + 20;
      if (point.y > height + 20) point.y = -20;
    });

    points.forEach((point, index) => {
      for (let otherIndex = index + 1; otherIndex < points.length; otherIndex += 1) {
        const other = points[otherIndex];
        const distance = Math.hypot(point.x - other.x, point.y - other.y);

        if (distance < 155) {
          const alpha = (1 - distance / 155) * 0.34;
          context.strokeStyle = `rgba(25, 112, 117, ${alpha})`;
          context.lineWidth = 1;
          context.beginPath();
          context.moveTo(point.x, point.y);
          context.lineTo(other.x, other.y);
          context.stroke();
        }
      }
    });

    points.forEach((point, index) => {
      const pulse = 0.5 + Math.sin(time / 700 + point.phase) * 0.5;
      context.fillStyle = index % 5 === 0
        ? `rgba(226, 176, 83, ${0.48 + pulse * 0.22})`
        : `rgba(15, 105, 112, ${0.44 + pulse * 0.18})`;
      context.beginPath();
      context.arc(point.x, point.y, index % 5 === 0 ? 2.6 : 2.1, 0, Math.PI * 2);
      context.fill();
    });

    if (!prefersReducedMotion.matches) {
      animationFrame = requestAnimationFrame(draw);
    }
  }

  resize();
  draw();
  window.addEventListener("resize", () => {
    cancelAnimationFrame(animationFrame);
    resize();
    draw();
  });
}
