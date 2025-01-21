const fs = require("fs");
const path = require("path");

// 맵핑할 자식 폴더가 들어있는 부모 폴더 경로
const targetPath = path.join(__dirname, "../../public/images/photobook");
// 결과 Json 파일이 저장될 경로
const outputPath = path.join(__dirname, "../data/photobookData.json");

const generateImageMap = () => {
  let result = {};

  const fileList = fs.readdirSync(targetPath, { withFileTypes: true });

  const folderNameList = fileList
    .filter((item) => item.isDirectory())
    .map((folder) => folder.name);

  folderNameList.forEach((photobookPath) => {
    const imageDir = path.join(
      __dirname,
      `../../public/images/photobook/${photobookPath}`
    );
    const files = fs.readdirSync(imageDir);
    const data = files
      .filter((item) => !item.includes(".DS_Store"))
      .map((file) => {
        return {
          imageFileName: `${file}`,
          ref: getReference(file),
        };
      });

    const thumbnailSort = [
      ...data.filter((item) => item.imageFileName.includes("thumbnail")),
      ...data.filter((item) => !item.imageFileName.includes("thumbnail")),
    ];

    result[photobookPath] = thumbnailSort;
  });

  // json ㅅ앵성
  fs.writeFileSync(outputPath, JSON.stringify(result, null, 2));
};

generateImageMap();

// 파일명에서 이미지 제공자 추출
function getReference(fileName) {
  let ref = null;

  if (fileName.includes("ref")) {
    const splitRef = fileName.split("ref-");

    const splitNumbering = splitRef[1].split("-");
    ref = splitNumbering[0];
  }

  return ref;
}
