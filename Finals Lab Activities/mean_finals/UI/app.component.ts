import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'The Great Archive';
  readonly APIUrl = "http://localhost:5038/api/books/";

  books: any[] = [];
  filteredBooks: any[] = []; // FEATURE 1: For searching

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.refreshBooks();
  }

  // FEATURE 1: Search Filter
  filterArchive(searchTerm: string) {
    this.filteredBooks = this.books.filter(book =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // FEATURE 2: Collection Value (Computed Property)
  get totalValue(): number {
    return this.books.reduce((sum, book) => sum + (Number(book.price) || 0), 0);
  }

  refreshBooks() {
    this.http.get<any[]>(this.APIUrl + 'GetBooks').subscribe({
      next: (data) => {
        this.books = data;
        this.filteredBooks = data; // Sync filtered list on load
      }
    });
  }

  deleteBook(id: any) {
    this.http.delete(`${this.APIUrl}DeleteBook?id=${id}`).subscribe({
      next: (res) => {
        alert(res);
        this.refreshBooks();
      },
      error: (err) => console.error("Could not remove scroll:", err)
    });
  }

addBook(title: string, desc: string, price: string) {
  // 1. Create the JSON payload
  const bookPayload = {
    title: title,
    description: desc,
    price: price
  };

  // 2. Send it as a JSON object (not FormData)
  this.http.post(this.APIUrl + 'AddBook', bookPayload).subscribe({
    next: (res) => {
      console.log("Response from server:", res);
      this.refreshBooks(); // Update the UI list
      alert("Inscribed into MongoDB!");
    },
    error: (err) => console.error("Transmission failed", err)
  });
}

importBooks() {
  const externalCollection = [
    { title: "The Alchemist", description: "A journey of destiny", price: 25 },
    { title: "The Great Gatsby", description: "A tale of the jazz age", price: 15 },
    { title: "1984", description: "A dystopian future", price: 20 }
  ];

  this.http.post(this.APIUrl + 'ImportBooks', externalCollection).subscribe({
    next: (res: any) => {
      alert(res);
      this.refreshBooks(); // Reload the shelf to see the new books
    },
    error: (err) => alert("Import failed: " + err.message)
  });
}
onFileSelected(event: any) {
  const file: File = event.target.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      try {
        const bookData = JSON.parse(e.target.result);
        this.executeBulkImport(bookData);
      } catch (error) {
        alert("The scroll is corrupted (Invalid JSON)!");
      }
    };
    reader.readAsText(file);
  }
}

private executeBulkImport(data: any[]) {
  this.http.post(this.APIUrl + 'ImportBooks', data).subscribe({
    next: (res: any) => {
      alert(res);
      this.refreshBooks();
    },
    error: (err) => alert("The Archive rejected these scrolls: " + err.message)
  });
}
}


