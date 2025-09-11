import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LucideAngularModule } from 'lucide-angular';
import { AiService } from '../../services/ai'; // Adjust path as needed

@Component({
  selector: 'app-ai-search',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule],
  templateUrl: './ai-search.html',
  styleUrls: ['./ai-search.scss']
})
export class AiSearchComponent {
  searchQuery: string = '';
  isSearching: boolean = false;
  searchResults: any[] = [];

  constructor(private aiService: AiService) { }

  onSearch(): void {
    const query = this.searchQuery.trim();
    if (!query) return;

    this.isSearching = true;
    this.searchResults = [];

    this.aiService.askQuestion(query).subscribe({
      next: (data) => {
        try {
          const parsedResponse = JSON.parse(data.response);
          const rawText = parsedResponse?.candidates?.[0]?.content?.parts?.[0]?.text;



          if (rawText) {
              // Replace markdown-like **bold** with <strong> tags
          const formattedText = rawText
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')  // **bold** → <strong>bold</strong>
            .replace(/\n/g, '<br/>');                          // \n → line break

            
            this.searchResults = [
              {
                title: 'AI Response',
                description: formattedText,
                relevance: 100
              }
            ];
            ;
          } else {
            this.searchResults = [];
          }
        } catch (e) {
          console.error('Parsing error:', e);
          this.searchResults = [];
        } finally {
          this.isSearching = false;
        }
      },
      error: (err) => {
        console.error('API error:', err);
        this.isSearching = false;
        this.searchResults = [];
      }
    });
  }

  clearSearch(): void {
    this.searchQuery = '';
    this.searchResults = [];
  }
}
