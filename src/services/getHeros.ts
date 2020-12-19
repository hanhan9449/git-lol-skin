import got from "got";
import {HERO_LIST} from "../Constant";
import {HeroInterface} from "../interfaces/hero.interface";
import {LOGGER} from "../index";

export async function getHeros(): Promise<HeroInterface[]> {
    LOGGER.info('💗正在获取Hero列表')
    let res = await got(HERO_LIST).json() as {hero: HeroInterface[]};
    let heroList = res.hero
    LOGGER.info('💗获取Hero列表完毕')
    return heroList
}
