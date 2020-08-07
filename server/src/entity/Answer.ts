import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToOne,
  JoinColumn,
  BaseEntity,
} from "typeorm";
import { Question } from "./Question";

@Entity()
export class Answer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  questionId: number;
  @ManyToOne(() => Question, (question) => question.answers)
  @JoinColumn({ name: "questionId" })
  question: Question;
}
