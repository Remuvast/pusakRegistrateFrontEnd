import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IRegister } from '../../models/register.model';
import { first, Subscription } from 'rxjs';
import { CONSTANTS } from 'src/app/common/const';
import { passwordMatchValidator } from 'src/app/validators/password-mismatch.validator';
import { QuestionService } from '../../services/question.service';
import { Questions } from '../../models/questions.model';
import { matchFields } from 'src/app/validators/match-fields.validator';
import { distinctQuestionsValidator } from 'src/app/validators/distinct-questions.validator';

@Component({
  selector: 'app-password-security',
  templateUrl: './password-security.component.html',
  styleUrl: './password-security.component.scss'
})
export class PasswordSecurityComponent implements OnInit {

  @Input('updateParentModel') updateParentModel: (
      part: Partial<IRegister>,
      isFormValid: boolean
  ) => void;
  form: FormGroup;
  @Input() defaultValues: Partial<IRegister>;
  private unsubscribe: Subscription[] = [];
  showPassword = {
    password: false,
    confirmPassword: false,
  };
  questions: Questions[] = [];
  protected readonly labels = CONSTANTS.register.passwordSecurity;

  get f() {
    return this.form.controls;
  }

  constructor(
    private fb: FormBuilder,
    private questionService: QuestionService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.updateParentModel({}, false);
    this.getQuestions()
    this.questionService.questions$.subscribe((questions: Questions[]) => {
      if(questions && questions.length > 0 && this.questions.length === 0) {
        this.questions = questions;
      }
      this.cdr.detectChanges();
    })
  }

  togglePassword(key: 'password' | 'confirmPassword'): void {
    this.showPassword[key] = !this.showPassword[key];
  }

  getQuestions() {
    this.questionService.getQuestions().subscribe();
  }

  initForm(): void {
    this.form = this.fb.group({
        password: [
          this.defaultValues.password, 
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(20),
            // eslint-disable-next-line no-useless-escape
            Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%]).+$/)
          ]
        ],
        confirmPassword: [
          this.defaultValues.confirmPassword, 
          [
            Validators.required,
            matchFields('password'),
          ],
        ],
        securityQuestionOne: [
          this.defaultValues.securityQuestionOne, 
          [
            Validators.required,
          ],
        ],
        securityAnswerOne: [
          this.defaultValues.securityAnswerOne, 
          [
            Validators.required,
            Validators.maxLength(20),
          ]
        ],
        securityQuestionTwo: [
          this.defaultValues.securityQuestionTwo, 
          [
            Validators.required,
          ],
        ],
        securityAnswerTwo: [
          this.defaultValues.securityAnswerTwo, 
          [
            Validators.required,
            Validators.maxLength(20),
          ],
        ],
        securityQuestionThree: [
          this.defaultValues.securityQuestionThree, 
          [
            Validators.required,
          ],
        ],
        securityAnswerThree: [
          this.defaultValues.securityAnswerThree, 
          [
            Validators.required,
            Validators.maxLength(20),
          ],
        ],
      },
      {
        validators: distinctQuestionsValidator('securityQuestionOne', 'securityQuestionTwo', 'securityQuestionThree')
      }
    );
    const formChangesSubscr = this.form.valueChanges.subscribe((val) => {
      this.updateParentModel(val, this.form.valid);
    });
    this.unsubscribe.push(formChangesSubscr);
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  /*passwordSecurityForm: FormGroup;
  @Output() complete = new EventEmitter<void>();

  completeStep() {
    if (this.passwordSecurityForm.valid) {
      this.complete.emit();
    }
  }*/
}
