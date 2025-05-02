// MY
export interface ContentfulRequest {
    contentType?: 'contact',
    language?: string
}

// API
export interface ContentfulRespone {
    sys: { type: string },
    total: number,
    skip: number
    limit: number
    items: ContentfulItem[]
}

export interface ContentfulItem {
    metadata: {
        tabs: any[]
        concepts: any[]
    },
    sys: { 
        space: { sys: Link },
        createdAt: string,
        updatedAt: string,
        locale: string
    }
    fields: { [key: string]: ContentfulField | string }
}

export interface ContentfulField {
    nodeType: NodeType,
    data: any,
    content?: ContentfulField[],
    value?: any,
}

type NodeType = 'document' | 'paragraph' | 'text'

interface Link {
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