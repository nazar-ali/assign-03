import { Component, OnInit } from '@angular/core';
import { BbcService } from './bbc.end.point.service';
import { NgForOf, NgIf } from '@angular/common';

interface HeadlineData {
  headline: string;
  description: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [NgIf, NgForOf],
})
export class AppComponent implements OnInit {
  headlines: HeadlineData[] = [];

  constructor(private bbcWebCrawlerService: BbcService) {}

  ngOnInit(): void {
    this.bbcWebCrawlerService.fetchBbcHeadlines().subscribe({
      next: (data: HeadlineData[]) => {
        this.headlines = data;
      },
      error: (error: unknown) => {
        if (error instanceof Error) {
          console.error('Error fetching headlines:', error.message);
        } else {
          console.error('Unknown error:', error);
        }
      },
    });
  }
}
