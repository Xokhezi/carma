import { Injectable } from '@angular/core';
import { ApiClientService } from './api-client.service';
export interface Favourite {
  id: number;
  name: string;
  from: string;
  to: string;
  distance: number;
  userEmail: string;
}
@Injectable({
  providedIn: 'root',
})
export class FavouritesService {
  constructor(private apiClient: ApiClientService) {}
  getFavourites(email?: string) {
    return this.apiClient.getAll<Favourite[]>('favourites?email=' + email);
  }
  getSingleFavourite(id: number) {
    return this.apiClient.getSingle<Favourite>('favourites' + '/' + id);
  }
  createFavourite(favourite: Favourite) {
    return this.apiClient.create<Favourite>(favourite, 'favourites');
  }
  updateFavourite(favourite: Favourite, id: number) {
    return this.apiClient.update<Favourite>(favourite, 'favourites' + '/' + id);
  }
  deleteFavourite(id: Number) {
    return this.apiClient.delete('favourites' + '/' + id);
  }
}
