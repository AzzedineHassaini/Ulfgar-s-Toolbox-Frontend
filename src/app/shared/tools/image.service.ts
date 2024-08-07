import {environment} from "../../../environments/environment";

export class ImageService {

  hasImage(image: any){
    return image !== null && image !== '' && image !== undefined;
  }

  getImage(image: any) {
    return environment.apiUrl+'/file/images/'+image;
  }
}
