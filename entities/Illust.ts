import api from "../API"
import {PixivBookmarkDetail, PixivBookmarkRanges, PixivBookmarkSearch, PixivCommentSearch, PixivCommentSearchV2, PixivIllust,
PixivIllustDetail, PixivIllustSearch, PixivParams, PixivTrendTags} from "../types"

export class Illust {
    constructor(protected readonly api: api) {}

    /**
     * Gets an illust by either URL or ID.
     */
    public get = async (illustResolvable: string | number) => {
        const illustId = String(illustResolvable).match(/\d{8,}/)
        if (!illustId) return Promise.reject("Invalid id or url provided.")
        const response = await this.detail({illust_id: Number(illustId[0])})
        return response
    }

    /**
     * Gets the details for an illust.
     */
    public detail = async (params: PixivParams & {illust_id: number}) => {
        const response = await this.api.get(`/v1/illust/detail`, params)
        if (response.illust.type !== "illust" && response.illust.type !== "ugoira") return Promise.reject(`This is not an illust, it is a ${response.illust.type}`)
        return response as Promise<PixivIllustDetail>
    }

    /**
     * Gets the URLS of all the pages for an illust.
     */
    public getPages = async (illust: PixivIllust, size?: string) => {
        if (!size) size = "medium"
        const urls: string[] = []
        if (!illust.meta_pages[0]) {
            urls.push(illust.image_urls[size])
        } else {
            for (let i = 0; i < illust.meta_pages.length; i++) {
                urls.push(illust.meta_pages[i].image_urls[size])
            }
        }
        return urls
    }

    /**
     * Gets new illusts.
     */
    public new = async (params?: PixivParams) => {
        if (!params) params = {}
        params.content_type = "illust"
        const response = await this.api.get(`/v1/illust/new`, params)
        return response as Promise<PixivIllustSearch>
    }

    /**
     * Gets illusts from users you follow.
     */
    public follow = async (params: PixivParams & {user_id: number}) => {
        if (!params.restrict) params.restrict = "all"
        const response = await this.api.get(`/v2/illust/follow`, params)
        return response as Promise<PixivIllustSearch>
    }

    /**
     * Fetches the comments on an illust.
     */
    public comments = async (params: PixivParams & {illust_id: number}) => {
        const response = await this.api.get(`/v1/illust/comments`, params)
        return response as Promise<PixivCommentSearch>
    }

    /**
     * The difference from the V1 API is that parent_comment was replaced with
     * has_replies.
     */
    public commentsV2 = async (params: PixivParams & {illust_id: number}) => {
        const response = await this.api.get(`/v2/illust/comments`, params)
        return response as Promise<PixivCommentSearchV2>
    }

    /**
     * Gets recommended illusts.
     */
    public recommended = async (params?: PixivParams) => {
        const response = await this.api.get(`/v1/illust/recommended`, params)
        return response as Promise<PixivIllustSearch>
    }

    /**
     * Gets walkthrough illusts.
     */
    public walkthrough = async (params?: PixivParams) => {
        const response = await this.api.get(`/v1/walkthrough/illusts`, params)
        return response as Promise<PixivIllustSearch>
    }

    /**
     * Gets illusts from the ranking. Defaults to daily ranking
     */
    public ranking = async (params?: PixivParams) => {
        if (!params) params = {}
        if (!params.mode) params.mode = "day"
        const response = await this.api.get(`/v1/illust/ranking`, params)
        return response as Promise<PixivIllustSearch>
    }

    /**
     * Searches illusts in the popular previews.
     */
    public popularPreview = async (params: PixivParams & {word: string}) => {
        const response = await this.api.get(`/v1/search/popular-preview/illust`, params)
        return response as Promise<PixivIllustSearch>
    }

    /**
     * Gets trending tags.
     */
    public trendingTags = async (params?: PixivParams) => {
        const response = await this.api.get(`/v1/trending-tags/illust`, params)
        return response as Promise<PixivTrendTags>
    }

    /**
     * Gets the details for a bookmark.
     */
    public bookmarkDetail = async (params: PixivParams & {illust_id: number}) => {
        const response = await this.api.get(`/v2/illust/bookmark/detail`, params)
        return response as Promise<PixivBookmarkDetail>
    }

    /**
     * Gets the tags for a bookmark.
     */
    public bookmarkTags = async (params?: PixivParams) => {
        if (!params) params = {}
        if (!params.restrict) params.restrict = "public"
        const response = await this.api.get(`/v1/user/bookmark-tags/illust`, params)
        return response as Promise<PixivBookmarkSearch>
    }

    /**
     * Gets the bookmark ranges.
     */
    public bookmarkRanges = async (params: PixivParams & {word: string}) => {
        const response = await this.api.get(`/v1/search/bookmark-ranges/illust`, params)
        return response as Promise<PixivBookmarkRanges>
    }
}
