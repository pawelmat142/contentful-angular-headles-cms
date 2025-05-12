// MY
export interface ContentfulRequest {
    contentType?: 'contact' | 'item' | 'schedule',
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

// ASSET UPLOAD

export interface ContentfulUploadResponse {
    sys: {
        id: string;
        createdAt: Date;
        expiresAt: Date;
        createdBy: {
            sys: {
                type: 'Link';
                linkType: 'User';
                id: string;
            };
        };
        type: 'Upload';
        space: {
            sys: {
                type: 'Link';
                linkType: 'Space';
                id: string;
            };
        };
        environment: {
            sys: {
                type: 'Link';
                linkType: 'Environment';
                id: string;
            };
        };
    };
}

export interface ContentfulAssetResponse {
    metadata: {
        tags: any[];        
        concepts: any[];   
    };
    sys: {
        space: {
            sys: {
                type: 'Link';
                linkType: 'Space';
                id: string;
            };
        };
        id: string;
        type: 'Asset';
        createdAt: Date;
        updatedAt: Date;
        environment: {
            sys: {
                id: string;
                type: 'Link';
                linkType: 'Environment';
            };
        };
        createdBy: {
            sys: {
                type: 'Link';
                linkType: 'User';
                id: string;
            };
        };
        updatedBy: {
            sys: {
                type: 'Link';
                linkType: 'User';
                id: string;
            };
        };
        publishedCounter: number;
        version: number;
        fieldStatus: {
            [field: string]: {
                [locale: string]: string;  // e.g., "en-US": "draft"
            };
        }
    }
}


export interface ContentfulAssetPublishResponse {
    metadata: {
        tags: any[];
        concepts: any[];
    };
    sys: {
        space: {
            sys: Link;
        };
        id: string;
        type: 'Asset';
        createdAt: string;
        updatedAt: string;
        environment: {
            sys: Link;
        };
        publishedVersion: number;
        publishedAt: string;
        firstPublishedAt: string;
        createdBy: {
            sys: Link;
        };
        updatedBy: {
            sys: Link;
        };
        publishedCounter: number;
        version: number;
        publishedBy: {
            sys: Link;
        };
        fieldStatus: {
            [field: string]: {
                [locale: string]: 'published' | string;
            };
        };
        urn: string;
    };
    fields: {
        title: {
            [locale: string]: string;
        };
        file: {
            [locale: string]: {
                url: string;
                details: {
                    size: number;
                    image?: {
                        width: number;
                        height: number;
                    };
                };
                fileName: string;
                contentType: string;
            };
        };
    };
}
  
  
