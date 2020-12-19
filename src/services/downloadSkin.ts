import got from "got";
import * as fs from "fs";
import * as node_path from "path";
import { SkinInterface } from "../interfaces/hero-skin.interface";
import { pipeline } from "../utils/pipeline.util";
import { LOGGER } from "../index";

export async function downloadSkin(path: string, skinInterface: SkinInterface) {
  LOGGER.info(`正在下载'${skinInterface.name}'`);
  if (skinInterface.mainImg === "") {
    LOGGER.error(`${skinInterface.name}不存在，无法爬取`);
    return;
  }
  let downloadPath = node_path.resolve(
    path,
    skinInterface.name.replace(/\//g, "").replace(/ +/g, "-") + ".jpg"
);
  if (fs.existsSync(downloadPath)) {
    LOGGER.warn(`${skinInterface.name}已经存在，已被跳过`)
    return
  }
  try {
    await pipeline(
      got.stream(skinInterface.mainImg),
      fs.createWriteStream(downloadPath)
    );
  } catch (e) {
    LOGGER.error(e);
    LOGGER.error(skinInterface.name);
    LOGGER.error(skinInterface.mainImg);
    return;
  }
  LOGGER.info(`'${skinInterface.name}'下载完毕`);
}
