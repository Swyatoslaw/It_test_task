import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Note} from '../models/note';
import {ListNote} from '../models/listNote';

export const defaultNameForNewNote = 'untitled';

@Injectable({providedIn: 'root'})
export class NoteService {
  constructor(private http: HttpClient) {
  }

  getAllNotes() {
    return this.http.get<any>(environment.serverUrl + 'note' + '/notes');
  }

  getNoteCurrentUserById(noteId: number) {
    return this.http.get<any>(environment.serverUrl + 'note' + '/currentUser/' + noteId);
  }

  updateNoteCurrentUserById(note: Note) {
    return this.http.put<any>(environment.serverUrl + 'note', note);
  }

  addNoteCurrentUserById(note: Note) {
    return this.http.post<any>(environment.serverUrl + 'note', note);
  }

  removeNote(note: ListNote) {
    return this.http.delete<any>(environment.serverUrl + 'note' + '/' + note.id);
  }

  createByName(name: string) {
    return this.http.post<any>(environment.serverUrl + 'note' + '/create-new', name);
  }

  createEmptyNote(): Note {
    let note = new Note();
    note.name = defaultNameForNewNote;
    note.text = '';
    return note;
  }

  createEmptyNoteByName(name: string): Note {
    let note = this.createEmptyNote();
    note.name = name;
    return note;
  }


}
