// Draw the points
//

export const drawMesh = (predictions, ctx) => {
  if (predictions.length > 0) {
    predictions.forEach((prediction) => {
      const keypoints = prediction.scaledMesh;
      // Draw Points
      for (let i = 0; i < keypoints.length; i++) {
        const x = keypoints[i][0];
        const y = keypoints[i][1];
        ctx.beginPath();
        ctx.arc(x, y, 1, 0, 3 * Math.PI);
        ctx.fillStyle = "aqua";
        ctx.fill();
      }
    });
  }
};
