import { Component, OnInit } from '@angular/core';
import { ViewWrapperComponent } from '../view-wrapper/view-wrapper.component';
import { ContentService } from '../../services/content.service';
import { map, Observable } from 'rxjs';
import { ContentfulField, ContentfulRespone } from '../../model/contentful.interface';
import { CommonModule } from '@angular/common';

interface ContactViewContent {
  id: string,
  date: Date,
  title: string,
  details: string[]
  openingHours: string[]
}

type Paragraph = { lines: string[] }

@Component({
  selector: 'app-contact',
  standalone: true,
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
    const details: ContentfulField = item.fields['details'] as ContentfulField
    const openingHours: ContentfulField = item.fields['openingHours'] as ContentfulField
    const title: string = item.fields['title'] as string
    return {
      date: item.sys.updatedAt ? new Date(item.sys.updatedAt) : new Date(item.sys.createdAt),
      id: item.sys.space.sys.id,
      title: title,
      details: this.prepareParagraphs(details),
      openingHours: this.prepareParagraphs(openingHours)
    }
  }

  prepareParagraphs(field: ContentfulField): string[] {
    if (field.nodeType !== 'document') {
      throw new Error('field.nodeType !== document')
    }
    const paragraphFields = field.content?.filter(c => c.nodeType === 'paragraph')
    if (!paragraphFields) {
      throw new Error('!field')
    }
    return paragraphFields.flatMap(paragraphField => paragraphField?.content)
      ?.filter(c => !!c)
      .filter(c => c?.nodeType === 'text' && !!c?.value)
      .filter(c => !!c && !!c.value)
      .flatMap(c => (c?.value as string).split('\n'))
  } 
}
