import api from "../API"
import {PixivBookmarkDetail, PixivBookmarkRanges, PixivCommentSearch, PixivCommentSearchV2,
PixivNovelDetail, PixivNovelSearch, PixivNovelText, PixivParams, PixivTrendTags} from "../types"

export class Novel {
    constructor(private readonly api: api) {}

    /**
     * Gets a novel by URL or ID.
     */
    public get = async (novelResolvable: string | number) => {
        const novelId = String(novelResolvable).match(/\d{8,}/)
        if (!novelId) return Promise.reject("Invalid id or url provided.")
        const response = await this.detail({novel_id: Number(novelId[0])})
        return response
    }

    /**
     * Gets the details for a novel.
     */
    public detail = async (params: PixivParams & {novel_id: number}) => {
        const response = await this.api.get(`/v2/novel/detail`, params)
        return response as Promise<PixivNovelDetail>
    }

    /**
     * Gets the text for a novel.
     */
    public text = async (params: PixivParams & {novel_id: number}) => {
        const response = await this.api.get(`/v1/novel/text`, params)
        return response as Promise<PixivNovelText>
    }

    /**
     * Gets new novels.
     */
    public new = async (params?: PixivParams) => {
        const response = await this.api.get(`/v1/novel/new`, params)
        return response as Promise<PixivNovelSearch>
    }

    /**
     * Gets novels from users you follow.
     */
    public follow = async (params?: PixivParams) => {
        if (!params) params = {}
        if (!params.restrict) params.restrict = "all"
        const response = await this.api.get(`/v1/novel/follow`, params)
        return response as Promise<PixivNovelSearch>
    }

    /**
     * Gets recommended novels.
     */
    public recommended = async (params?: PixivParams) => {
        const response = await this.api.get(`/v1/novel/recommended`, params)
        return response as Promise<PixivNovelSearch>
    }

    /**
     * Fetches novels from the popular preview.
     */
    public popularPreview = async (params: PixivParams & {word: string}) => {
        const response = await this.api.get(`/v1/search/popular-preview/novel`, params)
        return response as Promise<PixivNovelSearch>
    }

    /**
     * Gets novel bookmark ranges.
     */
    public bookmarkRanges = async (params: PixivParams & {word: string}) => {
        const response = await this.api.get(`/v1/search/bookmark-ranges/novel`, params)
        return response as Promise<PixivBookmarkRanges>
    }

    /**
     * Gets novel trending tags.
     */
    public trendingTags = async (params?: PixivParams) => {
        const response = await this.api.get(`/v1/trending-tags/novel`, params)
        return response as Promise<PixivTrendTags>
    }

    /**
     * Gets the comments on a novel.
     */
    public comments = async (params: PixivParams & {novel_id: number}) => {
        const response = await this.api.get(`/v1/novel/comments`, params)
        return response as Promise<PixivCommentSearch>
    }

    /**
     * CommentsV2 replaces parent_comment with has_replies.
     */
    public commentsV2 = async (params: PixivParams & {novel_id: number}) => {
        const response = await this.api.get(`/v2/novel/comments`, params)
        return response as Promise<PixivCommentSearchV2>
    }

    /**
     * Gets all the novels in the series.
     */
    public series = async (params: PixivParams & {series_id: number}) => {
        const response = await this.api.get(`/v1/novel/series`, params)
        return response as Promise<PixivNovelSearch>
    }

    /**
     * Gets novel rankings. Defaults to daily rankings.
     */
    public ranking = async (params?: PixivParams) => {
        if (!params) params = {}
        if (!params.mode) params.mode = "day"
        const response = await this.api.get(`/v1/novel/ranking`, params)
        return response as Promise<PixivNovelSearch>
    }

    /**
     * Gets the details of a novel bookmark.
     */
    public bookmarkDetail = async (params: PixivParams & {novel_id: number}) => {
        const response = await this.api.get(`/v2/novel/bookmark/detail`, params)
        return response as Promise<PixivBookmarkDetail>
    }
}
