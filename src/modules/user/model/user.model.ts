import {
  Model,
  Column,
  Table,
  PrimaryKey,
  AutoIncrement,
  DataType,
} from 'sequelize-typescript';

@Table({
  tableName: 'Users',
  underscored: true,
})
export class Users extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  username: string;

  @Column(DataType.STRING)
  password: string;

  @Column(DataType.STRING)
  firstName: string;

  @Column(DataType.STRING)
  middleName: string;

  @Column(DataType.STRING)
  lastName: string;

  @Column(DataType.ENUM('ADMIN', 'CLIENT', 'DELIVERER'))
  role: string;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;
}
