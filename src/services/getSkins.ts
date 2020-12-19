import got, {Response} from "got";
import {
  IMG_JS_PREFIX_V2,
  IMG_JS_SUFFIX,
  IMG_PREFIX,
  IMG_SUFFIX,
} from "../Constant";
import {
  SkinInterface,
} from "../interfaces/hero-skin.interface";
import { LOGGER } from "../index";
import { HeroInterface } from "../interfaces/hero.interface";

export async function getSkins(
  heroInterface: HeroInterface
): Promise<SkinInterface[]> {
  LOGGER.info(`😘正在获取${heroInterface.title}的皮肤列表`);
  const uri = IMG_JS_PREFIX_V2 + heroInterface.alias + IMG_JS_SUFFIX;
  let res!: Response<string>;
  try {
    res = await got(uri);
  } catch (e) {
    LOGGER.error(e);
    LOGGER.error(uri);
    return []
  }
  let text = res.body;
  let skinsText = text.match(/"skins"[^\]]+]/)?.[0];
  let skins;
  if (typeof skinsText === "string") {
    skins = JSON.parse("{" + skinsText + "}")?.skins;
  }
  let result = (skins as any[]).map((o) => ({
    mainImg: IMG_PREFIX + o.id + IMG_SUFFIX,
    name: o.name,
  }));
  LOGGER.info("😘获取皮肤列表完毕");
  return result;
}
