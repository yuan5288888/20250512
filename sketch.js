let facemesh;
let video;
let predictions = [];
const pointsToConnect = [
  409, 270, 269, 267, 0, 37, 39, 40, 185, 61, 146, 91, 181, 84, 17, 314, 405, 321, 
  375, 291, 76, 77, 90, 180, 85, 16, 315, 404, 320, 307, 306, 408, 304, 303, 302, 
  11, 72, 73, 74, 184
];

if (typeof ml5 === "undefined") {
  console.error("ml5.js 未正確加載，請檢查 index.html 中的引用路徑。");
} else {
  console.log("ml5.js 已成功加載！");
}

function setup() {
  createCanvas(400, 400);

  // 檢查 ml5 是否已加載
  if (typeof ml5 === "undefined") {
    console.error("ml5.js 未正確加載，請檢查 index.html 中的引用路徑。");
    return;
  }

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

    beginShape();
    for (let i = 0; i < pointsToConnect.length; i++) {
      const index = pointsToConnect[i];
      const [x, y] = keypoints[index];
      vertex(x, y);
    }
    endShape(CLOSE);
  }
}
