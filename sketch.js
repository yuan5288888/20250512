let facemesh;
let video;
let predictions = [];
const pointsToConnect = [
  409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 
  375, 291, 76, 77, 90, 180, 85, 16, 315, 404, 320, 307, 306, 408, 304, 303, 302, 
  11, 72, 73, 74, 184
];

function setup() {
  createCanvas(400, 400);
  video = createCapture(VIDEO);
  video.size(width, height);
  video.hide();

  facemesh = ml5.facemesh(video, modelReady);
  facemesh.on("predict", results => {
    predictions = results;
  });
}

function modelReady() {
  console.log("Facemesh model loaded!");
}

function draw() {
  image(video, 0, 0, width, height);
  drawFacemesh();
}

function drawFacemesh() {
  if (predictions.length > 0) {
    const keypoints = predictions[0].scaledMesh;

    stroke(255, 0, 0); // 紅色線條
    strokeWeight(5); // 線條粗細為 5
    noFill();

    // 繪製嘴巴外部輪廓
    beginShape();
    for (let i = 0; i < 12; i++) { // 外嘴唇的前 12 個點
      const index = pointsToConnect[i];
      const [x, y] = keypoints[index];
      vertex(x, y);
    }
    endShape(CLOSE);

    // 繪製嘴巴內部輪廓
    beginShape();
    for (let i = 12; i < pointsToConnect.length; i++) { // 內嘴唇的後 12 個點
      const index = pointsToConnect[i];
      const [x, y] = keypoints[index];
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}
