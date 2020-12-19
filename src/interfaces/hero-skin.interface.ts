export interface HeroSkinInterface {
    heroId: string
    skinList: SkinInterface[]
}

export interface SkinInterface {
    name: string
    mainImg: string
    [props: string]: string
}
