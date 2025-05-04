import { HttpClient } from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { Questions, QuestionsResponse } from "../models/questions.model";

@Injectable({
    providedIn: 'root'
})
export class QuestionService {
    questionSubject: BehaviorSubject<Questions[]>;
    questions$: Observable<Questions[]>;

    private API_URL = `${environment.apiUrl}/preguntas`;

    constructor(private http: HttpClient) {
        this.questionSubject = new BehaviorSubject<Questions[]>([]);
        this.questions$ = this.questionSubject.asObservable();
    }

    getQuestions(): Observable<Questions[]> {
        return this.http.get<QuestionsResponse[]>(`${this.API_URL}`).pipe(
            map((data: QuestionsResponse[]) => this.mapQuestions(data)),
            tap((questions: Questions[]) => {
                this.questionSubject.next(questions);
            })
        );
    }

    mapQuestions(data: QuestionsResponse[]): Questions[] {
        return data.map((x: QuestionsResponse) => {
            return {
                id: x.id,
                question: x.pregunta,
            }
        })
    }
}