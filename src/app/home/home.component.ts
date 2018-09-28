import {Component, Inject, OnInit} from '@angular/core';
import {defaultNameForNewNote, NoteService} from '../services/note.service';
import {Note} from '../models/note';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {ListNote} from '../models/listNote';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public notes: ListNote[];
  public currentNote: Note;
  public currentListNote: ListNote;
  public noteId: number;
  public noteNameControl = new FormControl('', [Validators.required]);

  tempName: string;
  isNewNote: boolean;

  newNoteName: string;

  //
  public editorContent = 'hello world';
  public sidenavOpened = false;
  // public sidenavOpened = true;

//

  constructor(private noteService: NoteService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit() {

    this.initialize();
    // this.noteNameControl
  }

  initialize() {
    this.noteService.getAllNotes().subscribe(notes => {
      this.notes = notes;
      this.defineRouteParams();
      // console.log(this.notes);
    }, error1 => {
      console.log(error1);
    });
  }

  reinitialize() {
    this.noteService.getAllNotes().subscribe(notes => {
      this.notes = notes;
      console.log(this.notes);
      this.noteId = undefined;
      this.loadOrCreateCurrentNote();
    }, error1 => {
      console.log(error1);
    });
  }

  defineRouteParams() {
    this.route.params.subscribe(params => {
      this.noteId = +params['id'];
      this.loadOrCreateCurrentNote();
    });
  }

  loadOrCreateCurrentNote() {
    // console.log(this.noteId);
    if (this.noteId) {
      this.isNewNote = false;
      this.loadNote();
    } else {
      this.isNewNote = true;
      this.createNote();
    }
  }

  loadNote() {
    this.noteService.getNoteCurrentUserById(this.noteId).subscribe(note => {
      this.currentNote = note;
      this.initCurrentListNote(note);
      // console.log(this.currentNote);
    }, error1 => {
      console.log(error1);
    });
  }

  initCurrentListNote(note: Note) {
    this.currentListNote = this.notes.find(function (element) {
      return element.id === note.id;
    });
    // console.log('listnote '+this.currentListNote.name);

  }

  createNote() {
    this.currentNote = this.noteService.createEmptyNote();
    this.currentListNote = this.currentNote;
    this.notes = this.notes.concat([this.currentNote]);
  }

  // test() {
  //   console.log(this.editorContent);
  // }

  changeCurrentNoteName(value) {
    this.currentNote.name = value;
    this.currentListNote.name = value;
    // console.log(value + ' | ' + this.currentNote.name);
  }


  saveCurrentNoteName(value) {
    this.tempName = value;
  }

  restoreCurrentNoteName() {
    this.currentNote.name = this.tempName;
    this.currentListNote.name = this.tempName;
  }

  updateNote() {
    this.noteService.updateNoteCurrentUserById(this.currentNote).subscribe(ok => {
      // console.log(ok);

    }, error1 => {
      console.log(error1);

    });
  }

  addNote() {
    this.noteService.addNoteCurrentUserById(this.currentNote).subscribe(ok => {
      // console.log(ok);

    }, error1 => {
      console.log(error1);

    });
  }

  checkNewNoteAndAdd() {
    if (this.checkChangesNewNote()) {
      this.addNote();
    }
  }

  saveAndNavigate(noteId: number) {
    if (noteId) {
      this.saveNote();

      this.initialize();
      this.navigateById(noteId);
    }
  }

  saveNote() {
    if (this.isNewNote) {
      this.checkNewNoteAndAdd();
    } else {
      this.updateNote();
    }
  }

  removeCurrentNote() {
    this.removeNote(this.currentNote);
  }

  removeNote(note: ListNote) {
    this.noteService.removeNote(note).subscribe(ok => {
      // console.log(ok);

      if (note.id === this.currentNote.id || this.currentNote === undefined || this.currentNote.id===undefined) {
        this.reinitialize();
        // this.reinitializeAndNavigate(['/home']);
      } else {
        if (this.currentNote && this.currentNote.id) {
          this.initialize();
          // this.navigateById(this.currentNote.id);
        }

      }

    }, error1 => {
      console.log(error1);

    });


  }


  checkChangesNewNote() {
    // console.log('|' + this.currentNote.text);
    // console.log('|' + this.currentNote.name.localeCompare(defaultNameForNewNote));

    return this.currentNote.name.localeCompare(defaultNameForNewNote) !== 0 ||
      this.currentNote.text.length > 0;
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(HomeDialogComponent, {
      width: '250px',
      data: {newNoteName: this.newNoteName}
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log('The dialog was closed');
      this.newNoteName = result;

      if (result) {
        this.noteService.createByName(result).subscribe(id => {
          this.navigateById(id);
        });
      }

    });
  }

  navigateById(id: number) {
    this.navigate(['/home', id]);
  }

  navigate(navigateParams: any[]) {
    this.initialize();
    this.router.navigate(navigateParams);
  }

  reinitializeAndNavigate(navigateParams: any[]) {
    this.reinitialize();
    this.router.navigate(navigateParams);
  }


  test() {
    console.log('t enter');
  }

}

export interface DialogData {
  newNoteName: string;
}

@Component({
  selector: 'app-home-dialog',
  templateUrl: './home-dialog.html',
})
export class HomeDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<HomeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
