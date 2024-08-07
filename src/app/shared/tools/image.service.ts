export class ImageService {

  hasImage(image: any){
    return image !== null && image !== '' && image !== undefined;
  }

  getImage(image: any) {
    return 'api/v1/file/images/'+image;
  }
}
