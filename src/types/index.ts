export interface GalleryItemDoc {
  id?: string;
  title: string;
  tags: string[];
  url: string;
  isGif: boolean;
  uploaderId: string;
  storageFileName: string;
  uploadAt: number;
}
