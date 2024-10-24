import { Injectable } from '@angular/core';
import { env } from '../app.config';
import SupabaseClient from '../../../node_modules/@supabase/supabase-js/dist/module/SupabaseClient';
import { createClient } from '../../../node_modules/@supabase/supabase-js/dist/module/index';
import { catchError, from, Observable, of, tap } from 'rxjs';


export const ITEM = "items"


@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;
  private supaKey = env.key;
  private supaUrl = env.supabaseUrl;

  constructor() {
    this.supabase = createClient(this.supaUrl, this.supaKey);
  }


  getToken(): string {
    return localStorage.getItem('token') || '';  // Retrieve token from localStorage
  }

  // Add other methods for interacting with localStorage, like setToken, removeToken, etc.
  setToken(token: string): void {
    localStorage.setItem('token', token);  // Set token in localStorage
  }
  // lat: number, long: number
  // getNearbyStores() {

  //   // const { data, error } = await this.supabase.rpc('items', {
  //   // lat,
  //   // long,
  //   // })
  //   return this.supabase
  //     .from('items')
  //     .select()

  // }


  // getAllItems(): Observable<any[]> {

  //   return new Observable((observer) => {
  //     this.supabase
  //       .from('items')
  //       .select('*')
  //       .then(({ data, error }) => {
  //         if (error) {
  //           console.error('Error fetching items:', error.message);
  //           observer.error(error); // Emit an error if there was a problem
  //         } else {
  //           observer.next(data); // Emit the data
  //           observer.complete(); // Complete the observable
  //         }
  //       })
  //       .catch((error) => {
  //         console.error('Unexpected error:', error);
  //         observer.error(error); // Emit error in case of an unexpected error
  //       });
  //   }).pipe(
  //     catchError(err => {
  //       console.error('Caught error:', err);
  //       return of([]); // Return an empty array if there’s an error
  //     })
  //   );
  // }
  //   async submitContactForm(formData: any) {
  //   try {
  //     const { data, error } = await this.supabase
  //       .from('contact_forms')
  //       .insert([formData]);

  //     if (error) {
  //       throw error;
  //     }

  //     return data;
  //   } catch (error) {
  //     throw error;
  //   }
  // }
}
