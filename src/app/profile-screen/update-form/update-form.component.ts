import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ProfileService } from '../../services';
import { User } from '../../models';
import { UserService } from '../../services';

@Component({
  selector: 'app-update-form',
  templateUrl: './update-form.component.html',
  styleUrls: ['./update-form.component.css'],
})
export class UpdateFormComponent implements OnInit {
  user$ = this.userService.returnUser();

  updateForm!: FormGroup;
  error = false;

  @Output() updatedEvent = new EventEmitter<boolean>();
  updated = false;

  user_id!: any;
  user_name!: string;
  user_email!: string;
  user_full_name!: string;

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      user_id: [null],
      user_name: [null, [Validators.required, Validators.minLength(5)]],
      user_email: [null, [Validators.required, Validators.email]],
      user_full_name: [null, Validators.required],
    });
  }

  update() {
    if (this.updateForm.valid) {
      const user = this.updateForm.getRawValue() as User;
      this.profileService.updateData(user).subscribe(
        () => {
          this.updated = true;
          this.updatedEvent.emit(this.updated);
          this.error = false;
        },
        (error) => {
          this.error = true;
        }
      );
    }
  }
}
