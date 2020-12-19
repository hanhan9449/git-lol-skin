import { getLogger } from "./utils/getLogger";
import { getHeros } from "./services/getHeros";
import { getSkins } from "./services/getSkins";
import { downloadSkin } from "./services/downloadSkin";
import { SKIN_DOWNLOAD_FOLDER_PATH } from "./Constant";
import * as path from "path";
import * as fs from "fs";

export const LOGGER = getLogger();

async function main() {
  const FOLDER_PATH = SKIN_DOWNLOAD_FOLDER_PATH;
  if (!fs.existsSync(FOLDER_PATH)) {
    fs.mkdirSync(FOLDER_PATH);
  }
  LOGGER.info("程序开始执行");
  let heroList = await getHeros();
  let queue = [];
  for (const hero of heroList) {
    let skinList = await getSkins(hero);
    for (const skin of skinList) {
      const FOLDER_PATH = path.resolve(SKIN_DOWNLOAD_FOLDER_PATH, hero.title);
      if (!fs.existsSync(FOLDER_PATH)) {
        fs.mkdirSync(FOLDER_PATH);
      }
      queue.push(downloadSkin(FOLDER_PATH, skin));
    }
  }
}

let start = Date.now();
main()
  .then(() => {
    LOGGER.info(`程序执行了${Date.now() - start} ms`);
  })
  .catch((e) => {
    LOGGER.error(e);
  });
