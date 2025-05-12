import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ContentService } from '../../../services/content.service';
import { ViewWrapperComponent } from '../view-wrapper/view-wrapper.component';
import { map, Observable } from 'rxjs';
import { ContentfulField, ContentfulRespone, ContentImage, Link } from '../../../model/contentful.interface';
import { CarouselModule } from 'primeng/carousel';
import { ItemWrapperComponent } from './item-wrapper/item-wrapper.component';
import { TranslateModule } from '@ngx-translate/core';
import { ContentUtil } from '../../../utils/content.util';

export interface ItemContent {
  id: string,
  date: Date,
  title: string
  description: string[]
  mainImage: ContentImage
  images: ContentImage[]
}

@Component({
    selector: 'app-items',
    imports: [
        CommonModule,
        TranslateModule,
        CarouselModule,
        ViewWrapperComponent,
        ItemWrapperComponent
    ],
    templateUrl: './items.component.html',
    styleUrl: './items.component.scss'
})
export class ItemsComponent implements OnInit {

  constructor(
    private readonly content: ContentService,
  ) {}

  items$?: Observable<ItemContent[]>

  ngOnInit(): void {
    this.items$ = this.content.getEntries$({ contentType: 'item' }).pipe(
      map(respnose => this.convertResponse(respnose)),
    )
  }

  private convertResponse(response: ContentfulRespone): ItemContent[] {
    const items = response.items || []
    return items.map(item =>  {
      const description = ContentUtil.getParagraphs(item.fields['description'] as ContentfulField)
      const imageIds = (item.fields['images'] as { sys: Link }[]).map(i => i.sys.id)
      const mainImageId = (item.fields['mainImage'] as { sys: Link }).sys.id
      return {
        id: item.sys.space.sys.id,
        date: item.sys.updatedAt ? new Date(item.sys.updatedAt) : new Date(item.sys.createdAt),
        title: item.fields['title'] as string,
        description: ContentUtil.prepareParagraph(description),
        mainImage: ContentUtil.prepareImage(response, mainImageId),
        images: ContentUtil.prepareImages(response, imageIds)
      }
    })
  }

  responsiveOptions = [
    {
      breakpoint: '1400px',
      numVisible: 1,
      numScroll: 1
    },
  ]
}
