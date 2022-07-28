import {
  Model,
  Column,
  Table,
  PrimaryKey,
  AutoIncrement,
  DataType,
  Scopes,
} from 'sequelize-typescript';
import { Role } from 'src/common/enum/role.enum';

@Scopes(() => {
  return {
    basic: {
      attributes: {
        exclude: ['password', 'createdAt', 'updatedAt', 'deletedAt'],
      },
    },
    login: {
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'deletedAt'],
      },
    },
  };
})
@Table({
  tableName: 'Users',
  underscored: true,
  paranoid: true,
  timestamps: true,
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

  @Column(DataType.ENUM(Role.Admin, Role.Client, Role.Deliverer))
  role: string;

  @Column(DataType.DATE)
  createdAt: Date;

  @Column(DataType.DATE)
  updatedAt: Date;

  @Column(DataType.INTEGER)
  deletedBy: number;

  @Column(DataType.INTEGER)
  updatedBy: number;

  @Column(DataType.DATE)
  deletedAt: Date;
}
