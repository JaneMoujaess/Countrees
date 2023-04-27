import { Component, Input, SimpleChanges } from '@angular/core';
import axios from 'axios';
import { AdminService } from 'src/app/Services/admin-service.service';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss'],
})
export class GalleryComponent {
  photoUrls: string[] = [];
  edit: boolean = false;
  @Input() country: string = '';

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadPictures();
    this.adminService.edit.subscribe((edit) => (this.edit = edit));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['country']) {
      this.loadPictures();
    }
  }

  private loadPictures() {
    axios
      .get(
        `https://api.unsplash.com/search/photos?query=${this.country}&orientation=landscape&client_id=rhUa8khMFfNN8q2Fwu4SnFQ7XZx1xY_UFTSm4XztX-o`
      )
      .then((response) => {
        this.photoUrls = response.data.results.map(
          (photo: any) => photo.urls.regular
        );
      });
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const imagePath = reader.result as string;
      this.photoUrls.push(imagePath);
    };
  }
}
