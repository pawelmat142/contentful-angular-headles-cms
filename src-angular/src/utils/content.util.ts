import { ContentfulField, ContentfulRespone, ContentImage } from "../model/contentful.interface"

export abstract class ContentUtil {

    public static getParagraphs(field: ContentfulField): ContentfulField[] {
        if (!field.content) {
            throw new Error('Missing content')
        }
        if (field.nodeType === 'paragraph') {
            return [field]
        }
        if (field.nodeType === 'document') {
            return field.content.filter(c => c.nodeType === 'paragraph')
        }
        throw new Error('paragraph not found')
    }

    public static prepareParagraph(paragraphs: ContentfulField[]): string[] {
        return paragraphs.filter(p => p.nodeType === 'paragraph').map(p => {
            return p.content!.filter(c => c.nodeType === 'text').map(c => {
                if (!c.value) {
                    return `<br />`
                }
                const marks = c.marks?.map(mark => mark.type) || []
                let cssClass = marks.join(' ')
                const line = c.value as string || ' '
                if (cssClass) {
                    return `<span class="${cssClass}">${line}</span>`
                }
                return `<span>${line}</span>`
            }).join('')
        })
    } 

    public static prepareImages(response: ContentfulRespone, imageIds: string[]): ContentImage[] {
        return imageIds.map(imageId => this.prepareImage(response, imageId))
    }

    public static prepareImage (response: ContentfulRespone, imageId: string): ContentImage {
        const asset = response.includes.Asset.find(asset => imageId === asset.sys.id)
        if (!asset) {
            throw new Error('Asset not found')
        }
        return {
            id: asset.sys.id,
            title: asset.fields.title,
            url: asset.fields.file.url
        }
    }

}