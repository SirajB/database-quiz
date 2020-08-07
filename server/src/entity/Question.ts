import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  ManyToOne,
  JoinColumn,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Quiz } from "./Quiz";
import { Answer } from "./Answer";

@Entity()
export class Question extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  quizId: number;
  @ManyToOne(() => Quiz, (quiz) => quiz.questions)
  @JoinColumn({ name: "quizId" })
  quiz: Quiz;

  @OneToMany(() => Answer, (answer) => answer.question)
  answers: Answer[];
}
