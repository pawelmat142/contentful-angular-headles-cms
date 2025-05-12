import { Component, OnInit } from '@angular/core';
import { ViewWrapperComponent } from '../view-wrapper/view-wrapper.component';
import { ContentService } from '../../../services/content.service';
import { map, Observable } from 'rxjs';
import { ContentfulField, ContentfulRespone } from '../../../model/contentful.interface';
import { CommonModule } from '@angular/common';
import { ContentUtil } from '../../../utils/content.util';

interface ContactViewContent {
  id: string,
  date: Date,
  title: string,
  details: string[]
  openingHours: string[]
}

@Component({
    selector: 'app-contact',
    imports: [
        CommonModule,
        ViewWrapperComponent,
    ],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {

  constructor(
    private readonly content: ContentService,
  ) {}

  content$?: Observable<ContactViewContent>

  ngOnInit(): void {
    this.content$ = this.content.getEntries$({ contentType: 'contact' }).pipe(
      map(response => this.convertResponse(response)),
    )
  }

  private convertResponse(response: ContentfulRespone): ContactViewContent {
    const item = response.items[response.items.length -1]
    const details = ContentUtil.getParagraphs(item.fields['details'] as ContentfulField)
    const openingHours = ContentUtil.getParagraphs(item.fields['openingHours'] as ContentfulField)
    const title: string = item.fields['title'] as string
    return {
      date: item.sys.updatedAt ? new Date(item.sys.updatedAt) : new Date(item.sys.createdAt),
      id: item.sys.space.sys.id,
      title: title,
      details: ContentUtil.prepareParagraph(details),
      openingHours: ContentUtil.prepareParagraph(openingHours) 
    }
  }
}
