// MY
export interface ContentfulRequest {
    contentType?: 'contact' | 'item',
    language?: string
}

export interface ContentImage {
    id: string
    url: string
    title: string
}

// API
export interface ContentfulRespone {
    sys: { type: string },
    total: number,
    skip: number
    limit: number
    items: ContentfulItem[]
    includes: { Asset: Asset[] }
}

interface Asset {
    fields: AssetFields
    sys: Sys,
    metadata: Metadata,
}

interface AssetFields {
    description: string
    file: AssetFile
    title: string
}

export interface ContentfulItem {
    metadata: Metadata,
    sys: Sys,
    fields: { [key: string]: ContentfulField | string }
}

export interface ContentfulField {
    nodeType?: NodeType,
    data?: any,
    marks?: { type: 'bold' | 'italic' }[]
    content?: ContentfulField[],
    value?: any,
    sys?: Link
}

type NodeType = 'document' | 'paragraph' | 'text'

interface Metadata {
    tabs: any[]
    concepts: any[]
}

interface AssetFile {
    contentType: string
    details: {
        image: { width: number, height: number },
        size: number
    },
    fileName: string
    url: string
}

export interface Link {
    type: string;
    linkType: string;
    id: string;
}

interface Sys {
    type: string;
    space: { sys: Link };
    id: string;
    createdAt: string;
    updatedAt: string;
    environment: { sys: Link };
    publishedVersion: number;
    revision: number;
    contentType: { sys: Link };
    locale: string;
}